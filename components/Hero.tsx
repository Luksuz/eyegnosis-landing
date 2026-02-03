import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute w-[600px] h-[600px] bg-primary/15 rounded-full blur-3xl -top-24 -right-24 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Your Eyes Reveal What Your Body{' '}
              <span className="gradient-text">Won&apos;t Tell You</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              AI-powered iris analysis gives you instant health insights that traditional checkups miss. 
              Join 10,000+ health-conscious individuals discovering their body&apos;s hidden signals.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link 
                href="/pricing" 
                className="gradient-bg text-dark-bg px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Get Your Free Iris Scan
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link 
                href="#how-it-works" 
                className="border border-white/10 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/5 transition-all"
              >
                See How It Works
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7"/>
                </svg>
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-primary">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                256-bit Encryption
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-primary">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                GDPR Compliant
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-primary">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Powered by GPT-4 Vision
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-dark-card to-dark-bg rounded-3xl p-10 text-center">
              <div className="w-48 h-48 mx-auto mb-6 bg-gradient-radial from-primary to-transparent rounded-full flex items-center justify-center">
                <svg width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-dark-bg">
                  <circle cx="12" cy="12" r="3"/>
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
                </svg>
              </div>
              <p className="text-gray-400">AI-Powered Iris Analysis</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-dark-card rounded-xl p-4 border border-white/10 hidden md:block">
              <h4 className="text-primary font-bold text-sm">Analysis Time</h4>
              <p className="text-2xl font-extrabold">&lt; 60 seconds</p>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-dark-card rounded-xl p-4 border border-white/10 hidden md:block">
              <h4 className="text-primary font-bold text-sm">Markers Analyzed</h4>
              <p className="text-2xl font-extrabold">200+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
