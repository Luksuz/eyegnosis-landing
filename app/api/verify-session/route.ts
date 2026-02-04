import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'subscription.items.data.price.product'],
    })

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 })
    }

    // Extract plan info from metadata or subscription
    const planId = session.metadata?.plan_id || 'pro'
    const planName = planId === 'practitioner' ? 'Practitioner' : 'Pro'

    // Get billing interval from the price
    let billingInterval = 'monthly'
    if (session.subscription && typeof session.subscription !== 'string') {
      const subscription = session.subscription
      if (subscription.items?.data?.[0]?.price?.recurring?.interval === 'year') {
        billingInterval = 'yearly'
      }
    }

    // Get credits based on plan
    const credits = planId === 'practitioner' ? 200 : 30

    return NextResponse.json({
      success: true,
      planId,
      planName,
      billingInterval,
      credits,
      customerEmail: session.customer_details?.email,
    })
  } catch (error) {
    console.error('Error verifying session:', error)
    return NextResponse.json({ error: 'Failed to verify session' }, { status: 500 })
  }
}
