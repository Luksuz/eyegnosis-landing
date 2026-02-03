export default function SocialProof() {
  const stats = [
    { number: '10,000+', label: 'Active Users' },
    { number: '50,000+', label: 'Scans Completed' },
    { number: '4.8/5', label: 'App Rating' },
    { number: '97%', label: 'Would Recommend' },
  ]

  const testimonials = [
    {
      stars: 5,
      text: "I discovered a vitamin B12 deficiency I'd had for years. My doctor confirmed what Zero Blind detected. I wish I'd found this sooner.",
      author: 'Maria S.',
      role: 'Health Coach',
      initials: 'MS'
    },
    {
      stars: 5,
      text: 'Finally, a health tool that makes sense. I recommend Zero Blind to all my patients as a complementary diagnostic tool.',
      author: 'Dr. James Chen',
      role: 'Naturopath',
      initials: 'JC'
    },
    {
      stars: 5,
      text: "It's like having a health consultant in your pocket. I track my progress monthly. The insights help me optimize my nutrition.",
      author: 'Thomas R.',
      role: 'Fitness Enthusiast',
      initials: 'TR'
    }
  ]

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Trusted Worldwide</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-4">Join 10,000+ People Taking Control</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-5xl font-extrabold gradient-text">{stat.number}</div>
              <div className="text-gray-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="bg-dark-card rounded-2xl p-8 border border-white/10">
              <div className="text-yellow-400 mb-4">{'★'.repeat(testimonial.stars)}</div>
              <p className="text-lg italic mb-6">&ldquo;{testimonial.text}&rdquo;</p>
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
      </div>
    </section>
  )
}
