import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Target, Trophy, Heart, ArrowUpRight } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
          <p className="text-gray-400">Current Entry: <span className="text-brand-400">Standard Tier</span></p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-dark-950 font-bold rounded-xl transition-all">
            Upgrade Tier
          </button>
        </div>
      </header>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl">
          <div className="text-gray-400 text-sm mb-1">Your Lucky Numbers</div>
          <div className="text-2xl font-mono font-bold text-white tracking-wider">
            08 • 24 • 31 • 44 • 52
          </div>
        </div>
        <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl">
          <div className="text-gray-400 text-sm mb-1">Next Draw In</div>
          <div className="text-2xl font-bold text-white tracking-tight leading-none pt-1">
            4d 12h 30m
          </div>
        </div>
        <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl">
          <div className="text-gray-400 text-sm mb-1">Impact Contributed</div>
          <div className="text-2xl font-bold text-red-400 tracking-tight leading-none pt-1">
            $12.50
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Giveaways */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="text-accent-500" size={20} />
            Live Competitions
          </h2>
          
          {[1, 2].map((i) => (
            <div key={i} className="bg-dark-800 border border-white/5 rounded-2xl overflow-hidden group">
              <div className="aspect-video w-full bg-gradient-to-br from-dark-700 to-dark-800 relative">
                <div className="absolute top-4 left-4 bg-brand-500 text-dark-950 text-xs font-bold px-3 py-1 rounded-full">
                  ENTERED
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">The Ultimate Golf Getaway</h3>
                    <p className="text-sm text-gray-400">Scottsdale, AZ • 5 Nights</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Cash Alt</div>
                    <div className="font-bold text-white">$15,000</div>
                  </div>
                </div>
                <button className="w-full py-3 border border-white/10 hover:border-brand-500/50 rounded-xl text-gray-300 hover:text-white transition-all text-sm font-medium flex items-center justify-center gap-2">
                  View Entry Details <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Profile */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Heart className="text-red-500" size={20} />
            Your Impact
          </h2>
          <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                <Target size={24} />
              </div>
              <div>
                <div className="text-gray-400 text-sm">Supporting</div>
                <div className="text-white font-bold">First Tee Foundation</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Contribution</span>
                <span className="text-white font-medium">$125.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Impact Score</span>
                <span className="text-white font-medium">Gold Member</span>
              </div>
            </div>

            <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white text-sm font-medium transition-all">
              Change Charity
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
