export default function HowItWorks() {
  const steps = [
    {
      icon: '📸',
      number: 1,
      title: 'Capture',
      description: 'Take a clear photo of your iris using your phone camera. Our guide ensures perfect positioning every time.'
    },
    {
      icon: '🧠',
      number: 2,
      title: 'Analyze',
      description: 'Our GPT-4 Vision AI analyzes 200+ iris markers, constitutional patterns, and health indicators in seconds.'
    },
    {
      icon: '💡',
      number: 3,
      title: 'Discover',
      description: 'Receive personalized insights, recommendations, and questions to discuss with your healthcare provider.'
    }
  ]

  return (
    <section id="how-it-works" className="py-24 bg-dark-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-4">3 Steps to Understand Your Health</h2>
          <p className="text-gray-400 mt-4">Get actionable health insights in under a minute</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="bg-dark-card rounded-2xl p-8 text-center relative group hover:-translate-y-2 transition-transform">
              <div className="text-5xl mb-6">{step.icon}</div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-dark-bg font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
