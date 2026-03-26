'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, HeartPulse, Trophy, Target } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-brand-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="w-full p-6 flex justify-between items-center max-w-7xl mx-auto absolute top-0 left-0 right-0 z-50">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <HeartPulse className="text-accent-400" />
          <span>Impact<span className="text-brand-500">Drive</span></span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-5 py-2 hover:text-accent-400 transition-colors">Log In</Link>
          <Link href="/signup" className="px-5 py-2 bg-brand-500 hover:bg-brand-600 rounded-full font-medium transition-colors">Join the Movement</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Turn Your Best Scores into <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-brand-500">Real World Impact</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            A subscription platform where your performance fuels monthly prize pools 
            and supports the charities you care about most. Play with purpose.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup" className="px-8 py-4 bg-accent-500 hover:bg-accent-400 text-dark-900 font-bold rounded-full text-lg transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transform hover:-translate-y-1">
              Start Making an Impact <ArrowRight size={20} />
            </Link>
            <Link href="#how-it-works" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-lg font-medium transition-colors">
              See How It Works
            </Link>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      </main>

      {/* Features Section */}
      <section id="how-it-works" className="py-24 bg-dark-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">The Subscription that Gives Back</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Track your last 5 scores. Enter the monthly draw. Support a charity of your choice. It's that simple.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Target size={40} className="text-brand-500" />}
              title="Track Performance"
              desc="Log your Stableford scores (1-45). We keep your latest 5 rounds to calculate your draw eligibility."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Trophy size={40} className="text-accent-400" />}
              title="Win Monthly Prizes"
              desc="Match 3, 4, or 5 numbers in our monthly draws. The 5-match jackpot rolls over if unclaimed!"
              delay={0.2}
            />
            <FeatureCard 
              icon={<HeartPulse size={40} className="text-red-400" />}
              title="Support Charity"
              desc="A guaranteed minimum of 10% of your subscription goes directly to a verified charity of your choice."
              delay={0.3}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center"
    >
      <div className="w-20 h-20 rounded-full bg-dark-800 flex items-center justify-center mb-6 shadow-lg">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  )
}
