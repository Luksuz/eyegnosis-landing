export default function HowItWorks() {
  const steps = [
    {
      icon: '📱',
      number: 1,
      title: 'Open. Point. Snap.',
      description: 'Open the app, follow the on-screen guide, and take a photo of your iris. Takes less time than unlocking your phone.',
      time: '10 seconds'
    },
    {
      icon: '🔬',
      number: 2,
      title: 'AI Does the Heavy Lifting',
      description: 'Our trained AI scans 200+ health markers in your iris—constitutional patterns, stress indicators, organ reflexes—while you wait.',
      time: '45 seconds'
    },
    {
      icon: '📋',
      number: 3,
      title: 'Get Your Health Map',
      description: 'Receive a personalized report: what your iris reveals, what it means for you, and specific next steps tailored to your findings.',
      time: 'Instant'
    }
  ]

  return (
    <section id="how-it-works" className="py-24 bg-dark-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">So Simple It Feels Like Cheating</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-4">From &quot;I Wonder&quot; to &quot;Now I Know&quot; in Under a Minute</h2>
          <p className="text-gray-400 mt-4">No equipment. No appointments. No waiting rooms. Just answers.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < 2 && (
                <div className="hidden md:block absolute top-1/4 -right-4 w-8 border-t-2 border-dashed border-primary/30" />
              )}
              <div className="bg-dark-card rounded-2xl p-8 text-center relative group hover:-translate-y-2 transition-transform h-full">
                <div className="text-5xl mb-6">{step.icon}</div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-dark-bg font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 mb-4">{step.description}</p>
                <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium">
                  {step.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison callout */}
        <div className="mt-16 bg-dark-card rounded-2xl p-8 border border-white/10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Compare That To Traditional Health Screening</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Schedule appointment (2-4 weeks wait)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Travel to clinic, wait in lobby</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Blood draw, urine sample, maybe fasting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Wait 1-2 weeks for results</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Schedule follow-up to discuss findings</span>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="text-6xl font-extrabold gradient-text">60</div>
              <div className="text-xl text-gray-400">seconds with Zero Blind</div>
              <p className="text-sm text-gray-500 mt-2">(And you can do it in your pajamas)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
