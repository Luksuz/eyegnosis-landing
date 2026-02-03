'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { User } from '@supabase/supabase-js'

type BillingInterval = 'monthly' | 'yearly'

const plans = [
  {
    id: 'free',
    name: 'Free',
    credits: 1,
    pricePerScan: 0,
    pricePerMonth: 0,
    pricePerYear: 0,
    description: 'Get started with basic features',
    features: [
      '1 scan per month',
      'Basic AI analysis (50 markers)',
      'Limited recommendations',
    ],
    monthlyPriceId: null,
    yearlyPriceId: null,
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    credits: 30,
    pricePerScan: 0.33,
    pricePerMonth: 9.99,
    pricePerYear: 79.99,
    description: 'Comprehensive health tracking',
    features: [
      '30 scans per month',
      'Full AI analysis (200+ markers)',
      'Personalized recommendations',
      'Complete scan history',
      'Export reports',
      'Priority support',
    ],
    monthlyPriceId: 'MONTHLY',
    yearlyPriceId: 'YEARLY',
    popular: true,
  },
  {
    id: 'practitioner',
    name: 'Practitioner',
    credits: 200,
    pricePerScan: 0.25,
    pricePerMonth: 49.99,
    pricePerYear: 399.99,
    description: 'For health professionals',
    features: [
      '200 scans per month',
      'Everything in Pro',
      'Client management',
      'White-label reports',
      'API access',
      'Dedicated support',
    ],
    monthlyPriceId: 'PRACTITIONER_MONTHLY',
    yearlyPriceId: 'PRACTITIONER_YEARLY',
    popular: false,
  },
]

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('monthly')
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setCheckingAuth(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSubscribe = async (plan: typeof plans[0]) => {
    const priceId = billingInterval === 'yearly' ? plan.yearlyPriceId : plan.monthlyPriceId

    if (!priceId) {
      // Free plan - redirect to signup or account
      if (user) {
        router.push('/account')
      } else {
        router.push('/signup')
      }
      return
    }

    // Require login for paid plans
    if (!user) {
      router.push(`/login?redirect=/pricing`)
      return
    }

    setLoading(priceId)
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          userId: user.id,
          email: user.email,
        }),
      })

      const { url, error } = await response.json()

      if (error) {
        alert(error)
        return
      }

      window.location.href = url
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const getDisplayPrice = (plan: typeof plans[0]) => {
    if (billingInterval === 'yearly') {
      return (plan.pricePerYear / 12).toFixed(2)
    }
    return plan.pricePerMonth.toFixed(2)
  }

  const getSavingsPercent = (plan: typeof plans[0]) => {
    if (plan.pricePerMonth === 0) return 0
    const yearlyMonthly = plan.pricePerYear / 12
    return Math.round((1 - yearlyMonthly / plan.pricePerMonth) * 100)
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Simple Pricing</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-4">Choose Your Path to Better Health</h1>
            <p className="text-gray-400 mt-4 text-lg">Start free, upgrade when you&apos;re ready</p>

            {!checkingAuth && !user && (
              <p className="text-gray-500 mt-2">
                <Link href="/login?redirect=/pricing" className="text-primary hover:underline">
                  Sign in
                </Link>
                {' '}to subscribe to a paid plan
              </p>
            )}

            {user && (
              <p className="text-gray-500 mt-2">
                Signed in as <span className="text-white">{user.email}</span>
              </p>
            )}
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-dark-card rounded-full p-1 flex">
              <button
                onClick={() => setBillingInterval('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingInterval === 'monthly'
                    ? 'bg-primary text-dark-bg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingInterval('yearly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  billingInterval === 'yearly'
                    ? 'bg-primary text-dark-bg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Yearly
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">
                  Save 33%
                </span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-dark-card rounded-3xl p-8 text-center relative border-2 transition-all hover:-translate-y-2 ${
                  plan.popular ? 'border-primary' : 'border-transparent'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-bg text-dark-bg px-5 py-1 rounded-full text-xs font-bold uppercase">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                {/* Price per scan - BIG */}
                <div className="mb-2">
                  <span className="text-6xl font-black text-white">
                    ${plan.pricePerScan > 0 ? plan.pricePerScan.toFixed(2) : '0'}
                  </span>
                  <span className="text-gray-400 text-xl">/scan</span>
                </div>

                {/* Credits info */}
                <div className="text-primary font-semibold mb-4">
                  {plan.credits} {plan.credits === 1 ? 'scan' : 'scans'} per month
                </div>

                {/* Monthly/Yearly price - smaller */}
                <div className="text-gray-500 text-sm mb-6">
                  {plan.pricePerMonth > 0 ? (
                    <>
                      ${getDisplayPrice(plan)}/month
                      {billingInterval === 'yearly' && getSavingsPercent(plan) > 0 && (
                        <span className="text-green-400 ml-2">
                          (Save {getSavingsPercent(plan)}%)
                        </span>
                      )}
                      {billingInterval === 'yearly' && (
                        <div className="text-xs mt-1">
                          Billed ${plan.pricePerYear}/year
                        </div>
                      )}
                    </>
                  ) : (
                    'Free forever'
                  )}
                </div>

                <ul className="text-left space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-primary flex-shrink-0">
                        <path d="M5 13l4 4L19 7"/>
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan)}
                  disabled={loading !== null || checkingAuth}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${
                    plan.popular
                      ? 'gradient-bg text-dark-bg hover:shadow-lg hover:shadow-primary/30'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  } disabled:opacity-50`}
                >
                  {loading === (billingInterval === 'yearly' ? plan.yearlyPriceId : plan.monthlyPriceId)
                    ? 'Loading...'
                    : !user && plan.monthlyPriceId
                    ? 'Sign in to Subscribe'
                    : plan.monthlyPriceId
                    ? `Get ${plan.name}`
                    : 'Start Free'}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 text-gray-400">
            <p>14-day money-back guarantee &bull; Cancel anytime &bull; Secure payment via Stripe</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
