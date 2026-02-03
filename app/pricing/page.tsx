'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { User } from '@supabase/supabase-js'

const plans = [
  {
    name: 'Free',
    price: 0,
    interval: 'month',
    description: 'Get started with basic features',
    features: [
      '1 iris scan per month',
      'Basic health insights',
      'Limited recommendations',
    ],
    cta: 'Start Free',
    popular: false,
    priceId: null,
  },
  {
    name: 'Pro',
    price: 9.99,
    originalPrice: 29.99,
    interval: 'month',
    description: 'Everything you need for comprehensive health tracking',
    features: [
      'Unlimited iris scans',
      'Full AI analysis (200+ markers)',
      'Personalized recommendations',
      'Complete scan history',
      'Priority support',
      'Export reports',
    ],
    cta: 'Get Pro Monthly',
    popular: true,
    priceId: 'MONTHLY',
  },
  {
    name: 'Pro Yearly',
    price: 79.99,
    originalPrice: 119.99,
    interval: 'year',
    description: 'Best value - Save 33%',
    features: [
      'Everything in Pro',
      '2 months free',
      'Early access to new features',
      'Annual health summary report',
    ],
    cta: 'Get Pro Yearly',
    popular: false,
    priceId: 'YEARLY',
  },
]

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
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

  const handleSubscribe = async (priceId: string | null) => {
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

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
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

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div 
                key={plan.name}
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
                
                <div className="mb-6">
                  {plan.originalPrice && (
                    <span className="text-gray-500 line-through text-xl block">
                      ${plan.originalPrice}
                    </span>
                  )}
                  <span className="text-5xl font-extrabold">${plan.price}</span>
                  <span className="text-gray-400">/{plan.interval}</span>
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
                  onClick={() => handleSubscribe(plan.priceId)}
                  disabled={loading === plan.priceId || checkingAuth}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${
                    plan.popular
                      ? 'gradient-bg text-dark-bg hover:shadow-lg hover:shadow-primary/30'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  } disabled:opacity-50`}
                >
                  {loading === plan.priceId ? 'Loading...' : 
                   !user && plan.priceId ? 'Sign in to Subscribe' : 
                   plan.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 text-gray-400">
            <p>14-day money-back guarantee • Cancel anytime • Secure payment via Stripe</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
