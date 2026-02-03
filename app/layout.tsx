import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zero Blind - AI-Powered Iris Health Analysis',
  description: 'Discover hidden health insights through AI-powered iris analysis. Get instant, personalized health recommendations based on the ancient science of iridology.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
