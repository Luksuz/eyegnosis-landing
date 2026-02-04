import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute w-[600px] h-[600px] bg-primary/15 rounded-full blur-3xl -top-24 -right-24 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            {/* Social proof above headline */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex -space-x-2">
                {['MS', 'JC', 'TR', 'AK'].map((initials) => (
                  <div key={initials} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center text-xs font-bold text-dark-bg border-2 border-dark-bg">
                    {initials}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-400">
                <span className="text-white font-semibold">10,247 people</span> discovered hidden health signals this week
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              What If Your Eyes Could Warn You{' '}
              <span className="gradient-text">Before Symptoms Appear?</span>
            </h1>
            <p className="text-lg text-gray-400 mb-4">
              Your iris contains over 200 markers that reveal what&apos;s happening inside your body—stress on your liver, 
              inflammation patterns, vitamin deficiencies—signals your annual checkup never catches.
            </p>
            <p className="text-lg text-white font-medium mb-8">
              Get your personalized health map in 60 seconds. No blood draws. No appointments. Just your phone.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link 
                href="/pricing" 
                className="gradient-bg text-dark-bg px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Scan My Iris Free
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link 
                href="#how-it-works" 
                className="border border-white/10 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/5 transition-all"
              >
                See a Sample Report
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7"/>
                </svg>
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-green-400">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Free first scan
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-green-400">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                No credit card required
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-green-400">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Results in 60 seconds
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Hero Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
              <Image
                src="/images/hero.png"
                alt="AI-Powered Iris Analysis - Phone scanning an eye with health data visualization"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
              {/* Subtle overlay gradient for better text contrast if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/20 to-transparent pointer-events-none" />
            </div>
            {/* Floating stats cards */}
            <div className="absolute -top-4 -right-4 bg-dark-card/90 backdrop-blur-sm rounded-xl p-4 border border-white/10 hidden md:block shadow-lg">
              <h4 className="text-primary font-bold text-sm">Analysis Time</h4>
              <p className="text-2xl font-extrabold">&lt; 60 sec</p>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-dark-card/90 backdrop-blur-sm rounded-xl p-4 border border-white/10 hidden md:block shadow-lg">
              <h4 className="text-primary font-bold text-sm">Health Markers</h4>
              <p className="text-2xl font-extrabold">200+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
