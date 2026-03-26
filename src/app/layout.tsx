import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: 'Impact Drive | Play. Win. Give.',
  description: 'A modern subscription platform blending performance tracking, monthly rewards, and charitable giving.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased bg-dark-900 text-white`}>
        {children}
      </body>
    </html>
  )
}
