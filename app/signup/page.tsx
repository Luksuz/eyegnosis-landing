'use client'

import { Suspense } from 'react'
import SignupForm from './SignupForm'
import Navbar from '@/components/Navbar'

export default function SignupPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Suspense fallback={
        <section className="pt-32 pb-24">
          <div className="max-w-md mx-auto px-6">
            <div className="animate-pulse">
              <div className="h-8 bg-dark-card rounded mb-4 w-48 mx-auto" />
              <div className="h-4 bg-dark-card rounded w-32 mx-auto mb-8" />
              <div className="bg-dark-card rounded-2xl p-8 h-96" />
            </div>
          </div>
        </section>
      }>
        <SignupForm />
      </Suspense>
    </main>
  )
}
