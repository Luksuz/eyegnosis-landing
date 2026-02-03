export default function SocialProof() {
  const stats = [
    { number: '10,247', label: 'People scanned this week' },
    { number: '94%', label: 'Found something useful' },
    { number: '4.8', label: 'App Store rating', suffix: '/5' },
    { number: '< 60', label: 'Seconds to results', suffix: 's' },
  ]

  const testimonials = [
    {
      stars: 5,
      text: "For 3 years, I felt exhausted but blood tests were 'normal.' Zero Blind flagged my adrenals in the first scan. My naturopath confirmed it. Finally getting answers after years of 'you're fine.'",
      author: 'Sarah M.',
      role: 'Marketing Director, 38',
      highlight: 'Finally found the cause of 3 years of fatigue',
      initials: 'SM'
    },
    {
      stars: 5,
      text: "I recommend Zero Blind to patients who want to be proactive. It spots patterns—digestive stress, lymphatic congestion—that complement what labs show. It's become part of my intake process.",
      author: 'Dr. James Chen',
      role: 'Naturopathic Physician',
      highlight: 'Now part of clinical intake process',
      initials: 'JC'
    },
    {
      stars: 5,
      text: "Skeptical at first. Then it showed liver stress I knew about but hadn't mentioned. Now I scan monthly to track how my diet changes affect my body. It's like a feedback loop for health decisions.",
      author: 'Michael T.',
      role: 'Software Engineer, 42',
      highlight: 'Monthly tracking transformed his health routine',
      initials: 'MT'
    }
  ]

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Real People, Real Results</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
            What 10,000+ Users Discovered About Their Health
          </h2>
          <p className="text-gray-400 mt-4">
            Most found something their doctor missed. Many wish they&apos;d started sooner.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-5xl font-extrabold gradient-text">
                {stat.number}{stat.suffix || ''}
              </div>
              <div className="text-gray-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="bg-dark-card rounded-2xl p-8 border border-white/10 flex flex-col">
              {/* Highlight tag */}
              <div className="inline-block self-start px-3 py-1 bg-primary/10 rounded-full text-primary text-xs font-medium mb-4">
                {testimonial.highlight}
              </div>
              <div className="text-yellow-400 mb-4">{'★'.repeat(testimonial.stars)}</div>
              <p className="text-lg italic mb-6 flex-grow">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center font-bold text-dark-bg">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 pt-16 border-t border-white/10">
          <div className="text-center mb-8">
            <p className="text-gray-400 text-sm">Trusted by health professionals and backed by</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold">256-bit</div>
              <div className="text-xs text-gray-400">Encryption</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">GDPR</div>
              <div className="text-xs text-gray-400">Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">SOC 2</div>
              <div className="text-xs text-gray-400">Type II</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">GPT-4</div>
              <div className="text-xs text-gray-400">Vision AI</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
