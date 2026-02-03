'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold gradient-text">
          Zero Blind
        </Link>
        <ul className="hidden md:flex gap-8">
          <li>
            <Link href="/#how-it-works" className="text-gray-400 hover:text-primary transition-colors">
              How It Works
            </Link>
          </li>
          <li>
            <Link href="/#features" className="text-gray-400 hover:text-primary transition-colors">
              Features
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="text-gray-400 hover:text-primary transition-colors">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/#faq" className="text-gray-400 hover:text-primary transition-colors">
              FAQ
            </Link>
          </li>
        </ul>
        
        <div className="flex items-center gap-4">
          {loading ? (
            <div className="w-24 h-10 bg-white/10 rounded-lg animate-pulse" />
          ) : user ? (
            <Link 
              href="/account" 
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-dark-bg font-bold text-sm">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline">Account</span>
            </Link>
          ) : (
            <>
              <Link 
                href="/login" 
                className="text-gray-400 hover:text-white transition-colors hidden sm:inline"
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="gradient-bg text-dark-bg px-6 py-2.5 rounded-lg font-bold hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
