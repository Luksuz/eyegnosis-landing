import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import SocialProof from '@/components/SocialProof'
import Features from '@/components/Features'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <SocialProof />
      <Features />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
