import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Urgency/FOMO element */}
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-sm text-primary font-medium">247 people scanned in the last hour</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
          Your Body Has Been Sending Signals.<br/>
          <span className="gradient-text">Are You Ready to Listen?</span>
        </h2>
        <p className="text-xl text-gray-400 mb-4 max-w-2xl mx-auto">
          Every day you wait is another day of guessing. Another day of &quot;I&apos;m probably fine.&quot; 
          Another day a small issue could be quietly growing.
        </p>
        <p className="text-lg text-white font-medium mb-10 max-w-2xl mx-auto">
          Your first scan is free. Takes 60 seconds. No credit card. What do you have to lose?
        </p>
        <Link 
          href="/pricing" 
          className="inline-block gradient-bg text-dark-bg px-12 py-5 rounded-xl font-bold text-xl hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all"
        >
          Get My Free Iris Scan Now
        </Link>
        
        {/* Risk reversal */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-green-400">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Free first scan
          </div>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-green-400">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            14-day money-back guarantee
          </div>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-green-400">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Cancel anytime
          </div>
        </div>

        {/* Social proof reminder */}
        <p className="text-gray-500 mt-8 text-sm">
          Join 10,247 others who stopped guessing and started knowing
        </p>
      </div>
    </section>
  )
}
