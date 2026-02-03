export default function Features() {
  const features = [
    {
      icon: '⚡',
      title: 'Know in 60 Seconds, Not 60 Days',
      description: 'Skip the 6-week wait for lab results. Get actionable health insights before you finish your morning coffee.'
    },
    {
      icon: '🎯',
      title: 'Spot Problems Before They Become Problems',
      description: 'Your iris reveals stress patterns, inflammation, and deficiencies months before symptoms appear. Early awareness means easier fixes.'
    },
    {
      icon: '🧬',
      title: 'Your Unique Health Blueprint',
      description: 'Discover your constitutional type—are you a quick metabolizer or slow detoxifier? Get recommendations that work for YOUR body, not generic advice.'
    },
    {
      icon: '📈',
      title: 'Watch Your Progress, Not Just Numbers',
      description: 'See how your lifestyle changes actually affect your body. Monthly scans show real improvement—motivation that keeps you going.'
    },
    {
      icon: '🧠',
      title: 'Finally Understand What Your Body Is Telling You',
      description: 'Tired for no reason? Skin issues that won\'t clear? Your iris often holds the answer when blood tests come back "normal."'
    },
    {
      icon: '🔐',
      title: 'Your Eyes. Your Data. Period.',
      description: 'Military-grade encryption. Zero data selling. Delete everything with one tap. You own your health information—we just help you understand it.'
    }
  ]

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why People Switch to Zero Blind</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-4">Stop Guessing. Start Knowing.</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Traditional health checkups miss what iridology reveals. Here&apos;s what you gain with Zero Blind.
          </p>
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
