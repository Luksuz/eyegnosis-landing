export default function Features() {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Analysis',
      description: 'Advanced GPT-4 Vision technology analyzes 200+ iris markers with professional-grade accuracy.'
    },
    {
      icon: '⚡',
      title: 'Instant Results',
      description: 'Get comprehensive health insights in under 60 seconds. No waiting, no appointments needed.'
    },
    {
      icon: '🎯',
      title: 'Personalized Recommendations',
      description: 'Receive actionable advice tailored to your unique constitutional type and findings.'
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Monitor changes over time with unlimited scan history and trend analysis.'
    },
    {
      icon: '📚',
      title: 'Educational Content',
      description: 'Learn the science of iridology with our comprehensive guide library.'
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Your health data stays secure. We never share or sell your information. GDPR compliant.'
    }
  ]

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Powerful Features</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-4">Everything You Need for Health Insights</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="bg-dark-surface rounded-2xl p-8 border border-transparent hover:border-primary hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-3xl mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
