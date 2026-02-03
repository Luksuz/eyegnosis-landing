import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-16 bg-dark-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="text-2xl font-extrabold gradient-text mb-4">Zero Blind</div>
            <p className="text-gray-400 max-w-xs">
              AI-powered iris analysis for personalized health insights. Discover what your eyes reveal about your well-being.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-gray-400 hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="#how-it-works" className="text-gray-400 hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link href="#faq" className="text-gray-400 hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="text-gray-400 hover:text-primary transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Zero Blind. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs max-w-xl text-center md:text-right">
            Disclaimer: Zero Blind is for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease. 
            Always consult with a qualified healthcare provider for medical advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
