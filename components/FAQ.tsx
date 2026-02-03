'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'What is iridology?',
    answer: 'Iridology is the study of the iris (the colored part of the eye) to identify potential health imbalances. Practitioners have used this technique for over 150 years to gain insights into constitutional strengths and weaknesses.'
  },
  {
    question: 'How accurate is Zero Blind?',
    answer: 'Zero Blind uses GPT-4 Vision AI to analyze over 200 iris markers. While our technology provides valuable insights, it should be used as a complementary tool alongside professional medical advice, not as a replacement.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. We use 256-bit encryption for all data transmission and storage. Your iris images and health data are never shared or sold. We are fully GDPR compliant and you can delete your data at any time.'
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. You will continue to have access until the end of your billing period. No questions asked, no hidden fees.'
  },
  {
    question: 'Do I need special equipment?',
    answer: 'No special equipment is needed. Any modern smartphone with a decent camera can capture iris images. Our app guides you through the process to ensure optimal image quality.'
  },
  {
    question: 'Is there a money-back guarantee?',
    answer: 'Yes! We offer a 14-day money-back guarantee. If you are not satisfied with Zero Blind Pro, contact us for a full refund within 14 days of purchase.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 bg-dark-surface">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-4">Frequently Asked Questions</h2>
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
                  className={`text-primary transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
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
      </div>
    </section>
  )
}
