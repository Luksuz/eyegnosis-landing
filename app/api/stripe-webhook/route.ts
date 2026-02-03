import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

// Supabase admin client (uses service role key)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Map price IDs to plan IDs
const PRICE_TO_PLAN: Record<string, string> = {
  // Pro plans
  [process.env.STRIPE_MONTHLY_PRICE_ID!]: 'pro',
  [process.env.STRIPE_YEARLY_PRICE_ID!]: 'pro',
  // Practitioner plans
  [process.env.STRIPE_PRACTITIONER_MONTHLY_PRICE_ID!]: 'practitioner',
  [process.env.STRIPE_PRACTITIONER_YEARLY_PRICE_ID!]: 'practitioner',
}

// Helper function to allocate credits for a user
async function allocateCredits(userId: string, planId: string, cycleEndAt: Date) {
  try {
    // Get plan credits from database
    const { data: plan, error: planError } = await supabaseAdmin
      .from('plans')
      .select('monthly_credits, name')
      .eq('id', planId)
      .single()

    if (planError || !plan) {
      console.error(`Failed to find plan ${planId}:`, planError)
      return false
    }

    const monthlyCredits = plan.monthly_credits

    // Upsert user credits (reset to full allocation - no rollover)
    const { error: creditsError } = await supabaseAdmin
      .from('user_credits')
      .upsert({
        user_id: userId,
        credits_remaining: monthlyCredits,
        credits_total: monthlyCredits,
        plan_id: planId,
        cycle_start_at: new Date().toISOString(),
        cycle_end_at: cycleEndAt.toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })

    if (creditsError) {
      console.error(`Failed to allocate credits for user ${userId}:`, creditsError)
      return false
    }

    // Log the credit transaction
    await supabaseAdmin
      .from('credit_transactions')
      .insert({
        user_id: userId,
        transaction_type: 'allocation',
        amount: monthlyCredits,
        balance_after: monthlyCredits,
        description: `Monthly credit allocation for ${plan.name} plan`
      })

    // Update profile plan_id
    await supabaseAdmin
      .from('profiles')
      .update({ plan_id: planId, updated_at: new Date().toISOString() })
      .eq('id', userId)

    console.log(`Allocated ${monthlyCredits} credits for user ${userId} on ${plan.name} plan`)
    return true
  } catch (err) {
    console.error(`Error allocating credits for user ${userId}:`, err)
    return false
  }
}

// Helper function to reset user to free tier
async function resetToFreeTier(userId: string) {
  try {
    const cycleEndAt = new Date()
    cycleEndAt.setDate(cycleEndAt.getDate() + 30)

    // Reset to free tier (1 credit)
    const { error: creditsError } = await supabaseAdmin
      .from('user_credits')
      .upsert({
        user_id: userId,
        credits_remaining: 1,
        credits_total: 1,
        plan_id: 'free',
        cycle_start_at: new Date().toISOString(),
        cycle_end_at: cycleEndAt.toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })

    if (creditsError) {
      console.error(`Failed to reset credits for user ${userId}:`, creditsError)
      return false
    }

    // Log the credit transaction
    await supabaseAdmin
      .from('credit_transactions')
      .insert({
        user_id: userId,
        transaction_type: 'allocation',
        amount: 1,
        balance_after: 1,
        description: 'Reset to free tier after subscription cancellation'
      })

    // Update profile plan_id
    await supabaseAdmin
      .from('profiles')
      .update({ plan_id: 'free', updated_at: new Date().toISOString() })
      .eq('id', userId)

    console.log(`Reset user ${userId} to free tier with 1 credit`)
    return true
  } catch (err) {
    console.error(`Error resetting user ${userId} to free tier:`, err)
    return false
  }
}

// Helper function to get plan ID from subscription
function getPlanIdFromSubscription(subscription: Stripe.Subscription): string {
  // Try to get from subscription metadata first
  if (subscription.metadata?.plan_id) {
    return subscription.metadata.plan_id
  }

  // Try to get from price ID
  const priceId = subscription.items.data[0]?.price?.id
  if (priceId && PRICE_TO_PLAN[priceId]) {
    return PRICE_TO_PLAN[priceId]
  }

  // Default to pro if we can't determine
  return 'pro'
}

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  console.log(`Processing Stripe event: ${event.type}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        if (session.mode === 'subscription' && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          )

          const customerEmail = session.customer_email
          const supabaseUserId = session.metadata?.supabase_user_id
          const planMetadata = session.metadata?.plan || 'MONTHLY'

          console.log(`New subscription for: ${customerEmail}, userId: ${supabaseUserId}`)

          let userId = supabaseUserId

          // Find user by email if no supabase_user_id
          if (!userId && customerEmail) {
            const { data: users } = await supabaseAdmin
              .from('profiles')
              .select('id')
              .eq('email', customerEmail)
              .single()

            if (users) {
              userId = users.id
            }
          }

          if (userId) {
            // Determine plan ID from subscription or metadata
            const planId = getPlanIdFromSubscription(subscription)
            const subscriptionPlanLabel = planMetadata.includes('YEARLY') ? `${planId}_yearly` : `${planId}_monthly`

            // Update profile subscription status
            const { error } = await supabaseAdmin.from('profiles').update({
              subscription_status: 'active',
              subscription_plan: subscriptionPlanLabel,
              subscription_expires_at: new Date(subscription.current_period_end * 1000).toISOString(),
              stripe_customer_id: session.customer as string,
              plan_id: planId,
              updated_at: new Date().toISOString(),
            }).eq('id', userId)

            if (error) {
              console.error('Database update error:', error)
            } else {
              console.log(`Updated subscription for user: ${userId}`)
            }

            // Allocate initial credits for the subscription
            const cycleEndAt = new Date(subscription.current_period_end * 1000)
            await allocateCredits(userId, planId, cycleEndAt)
          } else {
            console.log(`No user found for email: ${customerEmail}`)
          }
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (profile) {
          const status = subscription.status === 'active' ? 'active' :
            subscription.status === 'canceled' ? 'cancelled' :
            subscription.status === 'past_due' ? 'expired' : 'inactive'

          const planId = getPlanIdFromSubscription(subscription)

          await supabaseAdmin.from('profiles').update({
            subscription_status: status,
            subscription_expires_at: new Date(subscription.current_period_end * 1000).toISOString(),
            plan_id: planId,
            updated_at: new Date().toISOString(),
          }).eq('id', profile.id)

          console.log(`Updated subscription status to ${status} for user: ${profile.id}`)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (profile) {
          await supabaseAdmin.from('profiles').update({
            subscription_status: 'expired',
            subscription_plan: null,
            plan_id: 'free',
            updated_at: new Date().toISOString(),
          }).eq('id', profile.id)

          // Reset to free tier with 1 credit
          await resetToFreeTier(profile.id)

          console.log(`Subscription cancelled for user: ${profile.id}`)
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (profile) {
          await supabaseAdmin.from('profiles').update({
            subscription_status: 'expired',
            updated_at: new Date().toISOString(),
          }).eq('id', profile.id)

          console.log(`Payment failed for user: ${profile.id}`)
        }
        break
      }

      case 'invoice.paid': {
        // Handle subscription renewal - RESET CREDITS (no rollover)
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string
        const subscriptionId = invoice.subscription as string

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)

          const { data: profile } = await supabaseAdmin
            .from('profiles')
            .select('id')
            .eq('stripe_customer_id', customerId)
            .single()

          if (profile) {
            // Update subscription status
            await supabaseAdmin.from('profiles').update({
              subscription_status: 'active',
              subscription_expires_at: new Date(subscription.current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            }).eq('id', profile.id)

            // Allocate fresh credits for the new billing cycle (no rollover)
            const planId = getPlanIdFromSubscription(subscription)
            const cycleEndAt = new Date(subscription.current_period_end * 1000)
            await allocateCredits(profile.id, planId, cycleEndAt)

            console.log(`Subscription renewed for user: ${profile.id}`)
          }
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook processing error:', err)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
