import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
})

// Price IDs - replace with your actual Stripe price IDs
export const PRICES = {
  MONTHLY: process.env.STRIPE_MONTHLY_PRICE_ID || 'price_monthly',
  YEARLY: process.env.STRIPE_YEARLY_PRICE_ID || 'price_yearly',
}
