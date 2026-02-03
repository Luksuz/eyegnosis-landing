import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { SignOutButton } from './SignOutButton'

export default async function AccountPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Get profile with subscription info
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const subscriptionStatus = profile?.subscription_status || 'inactive'
  const subscriptionPlan = profile?.subscription_plan
  const expiresAt = profile?.subscription_expires_at

  const isActive = subscriptionStatus === 'active'
  const isCancelled = subscriptionStatus === 'cancelled'
  const isPro = isActive || isCancelled

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getPlanName = (plan: string | null) => {
    if (plan === 'stripe_monthly') return 'Pro Monthly'
    if (plan === 'stripe_yearly') return 'Pro Yearly'
    return 'Free'
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="text-3xl font-extrabold mb-8">Your Account</h1>

          {/* Profile Section */}
          <div className="bg-dark-card rounded-2xl p-6 border border-white/10 mb-6">
            <h2 className="text-lg font-bold mb-4">Profile</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Email</span>
                <span>{user.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Account ID</span>
                <span className="text-sm text-gray-500 font-mono">{user.id.slice(0, 8)}...</span>
              </div>
            </div>
          </div>

          {/* Subscription Section */}
          <div className="bg-dark-card rounded-2xl p-6 border border-white/10 mb-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-bold">Subscription</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                isPro 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {isPro ? 'PRO' : 'FREE'}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Plan</span>
                <span>{getPlanName(subscriptionPlan)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status</span>
                <span className={
                  isActive ? 'text-green-400' : 
                  isCancelled ? 'text-yellow-400' : 
                  'text-gray-400'
                }>
                  {isActive ? 'Active' : isCancelled ? 'Cancelled (access until expiry)' : 'Inactive'}
                </span>
              </div>
              {expiresAt && isPro && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">
                    {isCancelled ? 'Access until' : 'Renews on'}
                  </span>
                  <span>{formatDate(expiresAt)}</span>
                </div>
              )}
            </div>

            {!isPro && (
              <Link
                href="/pricing"
                className="mt-6 block w-full py-3 gradient-bg text-dark-bg font-bold rounded-xl text-center hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Upgrade to Pro
              </Link>
            )}

            {isPro && !isCancelled && (
              <p className="mt-4 text-sm text-gray-500">
                To cancel your subscription, please contact support.
              </p>
            )}
          </div>

          {/* Pro Features */}
          {isPro && (
            <div className="bg-dark-card rounded-2xl p-6 border border-white/10 mb-6">
              <h2 className="text-lg font-bold mb-4">Your Pro Features</h2>
              <ul className="space-y-3">
                {[
                  'Unlimited iris scans',
                  'Full AI analysis (200+ markers)',
                  'Personalized recommendations',
                  'Complete scan history',
                  'Priority support',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-primary">
                      <path d="M5 13l4 4L19 7"/>
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Download App */}
          <div className="bg-dark-card rounded-2xl p-6 border border-white/10 mb-6">
            <h2 className="text-lg font-bold mb-4">Get the App</h2>
            <p className="text-gray-400 mb-4">
              Download Zero Blind on your phone to start scanning.
            </p>
            <div className="flex gap-4">
              <Link 
                href="https://apps.apple.com" 
                className="flex-1 py-3 bg-white/10 text-white font-semibold rounded-xl text-center hover:bg-white/20 transition-all"
              >
                iOS App
              </Link>
              <Link 
                href="https://play.google.com" 
                className="flex-1 py-3 bg-white/10 text-white font-semibold rounded-xl text-center hover:bg-white/20 transition-all"
              >
                Android App
              </Link>
            </div>
          </div>

          {/* Sign Out */}
          <SignOutButton />
        </div>
      </section>

      <Footer />
    </main>
  )
}
