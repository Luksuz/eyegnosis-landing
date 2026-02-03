'use client'

import { Suspense } from 'react'
import SuccessContent from './SuccessContent'
import Navbar from '@/components/Navbar'

export default function SuccessPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Suspense fallback={
        <section className="pt-32 pb-24">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="animate-pulse">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-dark-card" />
              <div className="h-8 bg-dark-card rounded mb-4" />
              <div className="h-4 bg-dark-card rounded w-2/3 mx-auto" />
            </div>
          </div>
        </section>
      }>
        <SuccessContent />
      </Suspense>
    </main>
  )
}
