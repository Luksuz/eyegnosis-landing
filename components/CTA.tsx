import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
          Start Understanding Your Health Today
        </h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Join thousands of people who have discovered hidden health insights through AI-powered iris analysis.
        </p>
        <Link 
          href="/pricing" 
          className="inline-block gradient-bg text-dark-bg px-12 py-5 rounded-xl font-bold text-xl hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all"
        >
          Get Your Free Iris Scan
        </Link>
        <p className="text-gray-500 mt-6 text-sm">
          14-day money-back guarantee • Cancel anytime • No credit card required for free plan
        </p>
      </div>
    </section>
  )
}
