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
          const plan = session.metadata?.plan || 'unknown'

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
            const { error } = await supabaseAdmin.from('profiles').update({
              subscription_status: 'active',
              subscription_plan: plan === 'MONTHLY' ? 'stripe_monthly' : 'stripe_yearly',
              subscription_expires_at: new Date(subscription.current_period_end * 1000).toISOString(),
              stripe_customer_id: session.customer as string,
              updated_at: new Date().toISOString(),
            }).eq('id', userId)

            if (error) {
              console.error('Database update error:', error)
            } else {
              console.log(`Updated subscription for user: ${userId}`)
            }
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

          await supabaseAdmin.from('profiles').update({
            subscription_status: status,
            subscription_expires_at: new Date(subscription.current_period_end * 1000).toISOString(),
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
            updated_at: new Date().toISOString(),
          }).eq('id', profile.id)

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
        // Handle subscription renewal
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
            await supabaseAdmin.from('profiles').update({
              subscription_status: 'active',
              subscription_expires_at: new Date(subscription.current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            }).eq('id', profile.id)

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
