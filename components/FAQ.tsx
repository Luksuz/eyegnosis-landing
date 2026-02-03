'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'Is this actually legit, or is it like those horoscope apps?',
    answer: 'Fair question. Iridology has been practiced by physicians and naturopaths for over 150 years. Our AI is trained on clinical iridology charts and validated patterns—not vague interpretations. We show you exactly what markers we detected and why. Plus, 94% of users report findings that matched what they already knew about their health. Try it free and see for yourself.'
  },
  {
    question: 'Will this replace my doctor?',
    answer: 'No, and it shouldn\'t. Zero Blind is a complementary tool—like a fitness tracker for deeper health patterns. It gives you insights and questions to bring TO your healthcare provider. Many doctors and naturopaths actually recommend it because patients come in more informed and engaged.'
  },
  {
    question: 'What if my scan shows something scary?',
    answer: 'First: iris signs show tendencies and stress patterns, not diagnoses. A "liver stress" indicator doesn\'t mean liver disease—it might mean you\'ve been drinking more coffee lately or your body is processing something. We explain what each finding typically means and suggest practical next steps, including when to consult a professional.'
  },
  {
    question: 'I\'m not tech-savvy. Can I actually do this?',
    answer: 'If you can take a selfie, you can do this. The app literally guides your phone position with on-screen arrows until it\'s perfect, then auto-captures. Our oldest user is 84. Our youngest is 16 (with parental consent). Average time from download to results: 3 minutes.'
  },
  {
    question: 'What happens to my eye photos?',
    answer: 'They\'re encrypted, analyzed, then it\'s your choice. Keep them in your secure history for progress tracking, or delete with one tap. We never sell data. Never share with insurers. Never use for ads. You can export or delete everything anytime. We make money from subscriptions, not your data.'
  },
  {
    question: 'What if it doesn\'t work for me?',
    answer: '14-day money-back guarantee. If you don\'t find value in your first two weeks, email us and we\'ll refund you completely—no hoops, no "retention specialists," no questions. We\'ve had less than 2% refund requests because most people find something useful immediately.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 bg-dark-surface">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Still Thinking It Over?</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-4">Questions We Get Asked (A Lot)</h2>
          <p className="text-gray-400 mt-4">Healthy skepticism is good. Here are honest answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-dark-card rounded-xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold pr-4">{faq.question}</span>
                <svg 
                  width="20" 
                  height="20" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                  className={`text-primary transition-transform flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}
                >
                  <path d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Final nudge */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a href="mailto:support@zeroblind.com" className="text-primary hover:underline">
            Email us at support@zeroblind.com
          </a>
          <p className="text-gray-500 text-sm mt-2">We typically respond within 2 hours</p>
        </div>
      </div>
    </section>
  )
}
