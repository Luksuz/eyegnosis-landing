'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface PlanDetails {
  planId: string
  planName: string
  billingInterval: string
  credits: number
  customerEmail?: string
}

export default function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [planDetails, setPlanDetails] = useState<PlanDetails | null>(null)

  useEffect(() => {
    async function verifySession() {
      if (!sessionId) {
        setStatus('error')
        return
      }

      // Refresh the Supabase session to ensure auth is synced after Stripe redirect
      const supabase = createClient()
      await supabase.auth.getSession()

      try {
        const response = await fetch(`/api/verify-session?session_id=${sessionId}`)
        const data = await response.json()

        if (data.success) {
          setPlanDetails(data)
          setStatus('success')
        } else {
          setStatus('error')
        }
      } catch (error) {
        console.error('Error verifying session:', error)
        setStatus('error')
      }
    }

    verifySession()
  }, [sessionId])

  if (status === 'loading') {
    return (
      <section className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="animate-pulse">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-dark-card" />
            <div className="h-8 bg-dark-card rounded mb-4" />
            <div className="h-4 bg-dark-card rounded w-2/3 mx-auto" />
          </div>
          <p className="text-gray-400 mt-4">Verifying your payment...</p>
        </div>
      </section>
    )
  }

  if (status === 'error') {
    return (
      <section className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-24 h-24 mx-auto mb-8 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" className="text-red-500">
              <path d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>

          <h1 className="text-4xl font-extrabold mb-4">Something went wrong</h1>
          <p className="text-xl text-gray-400 mb-8">
            We couldn&apos;t verify your payment. Please contact support if you were charged.
          </p>

          <Link
            href="/pricing"
            className="inline-block gradient-bg text-dark-bg px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            Try Again
          </Link>
        </div>
      </section>
    )
  }

  const planTitle = planDetails?.planName || 'Pro'
  const credits = planDetails?.credits || 30
  const billingText = planDetails?.billingInterval === 'yearly' ? 'yearly' : 'monthly'

  return (
    <section className="pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="w-24 h-24 mx-auto mb-8 gradient-bg rounded-full flex items-center justify-center">
          <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" className="text-dark-bg">
            <path d="M5 13l4 4L19 7"/>
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold mb-4">Welcome to Zero Blind {planTitle}!</h1>
        <p className="text-xl text-gray-400 mb-2">
          Your {billingText} subscription is now active.
        </p>
        <p className="text-lg text-primary font-semibold mb-8">
          You now have {credits} scans per month!
        </p>

        <div className="bg-dark-card rounded-2xl p-8 mb-8 text-left">
          <h3 className="font-bold text-lg mb-4">What&apos;s next?</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 gradient-bg rounded-full flex items-center justify-center text-dark-bg font-bold text-sm flex-shrink-0">1</span>
              <div>
                <p className="font-semibold">View your account</p>
                <p className="text-gray-400 text-sm">Check your subscription status and credits</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 gradient-bg rounded-full flex items-center justify-center text-dark-bg font-bold text-sm flex-shrink-0">2</span>
              <div>
                <p className="font-semibold">Download the app</p>
                <p className="text-gray-400 text-sm">Get Zero Blind on iOS or Android</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 gradient-bg rounded-full flex items-center justify-center text-dark-bg font-bold text-sm flex-shrink-0">3</span>
              <div>
                <p className="font-semibold">Start scanning</p>
                <p className="text-gray-400 text-sm">Sign in with the same account and take your first iris scan</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/account"
            className="gradient-bg text-dark-bg px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            Go to My Account
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <Link
            href="https://apps.apple.com"
            className="bg-white/10 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Download for iOS
          </Link>
          <Link
            href="https://play.google.com"
            className="bg-white/10 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/>
            </svg>
            Download for Android
          </Link>
        </div>

        <p className="text-gray-500 mt-8 text-sm">
          A confirmation email has been sent to your inbox.
        </p>
      </div>
    </section>
  )
}
