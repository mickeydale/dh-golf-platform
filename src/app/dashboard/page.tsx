import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Target, Trophy, Heart, ArrowUpRight } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch initial profile data (mocked if not found)
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Mock data for development
  const isSubscribed = profile?.subscription_status === 'active'
  const recentScores = [32, 28, 41, 35, 30] // Mock last 5 scores

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400">Here's your impact overview and game performance.</p>
        </div>
        {!isSubscribed && (
          <div className="bg-dark-800 border border-brand-500/30 p-4 rounded-xl flex items-center gap-4">
            <div className="text-sm text-gray-300">
              <span className="block font-bold text-white">Subscription Inactive</span>
              Subscribe to enter monthly draws and support your charity.
            </div>
            <button className="px-4 py-2 bg-brand-500 hover:bg-brand-600 rounded-lg font-medium transition-colors">
              Subscribe Now
            </button>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score Card */}
        <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Target size={120} />
          </div>
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2 relative z-10"><Target className="text-brand-500" /> Recent Scores</h2>
          <p className="text-sm text-gray-400 mb-6 relative z-10">Last 5 Stableford scores</p>
          
          <div className="flex gap-2 mb-6 relative z-10">
            {recentScores.map((score, i) => (
              <div key={i} className={`flex-1 aspect-square rounded-lg flex items-center justify-center font-bold text-lg
                ${i === 0 ? 'bg-brand-500 text-white' : 'bg-dark-900 text-gray-300 border border-white/5'}`}>
                {score}
              </div>
            ))}
          </div>
          <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors relative z-10">
            Log New Score
          </button>
        </div>

        {/* Winnings Card */}
        <div className="bg-dark-800 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Trophy size={120} />
          </div>
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2 relative z-10"><Trophy className="text-accent-400" /> Winnings</h2>
          <p className="text-sm text-gray-400 mb-6 relative z-10">Total earned from monthly draws</p>
          
          <div className="text-5xl font-bold mb-2 relative z-10 text-white">
            $0<span className="text-lg text-gray-500">.00</span>
          </div>
          <p className="text-sm text-accent-400 mb-6 relative z-10 flex items-center gap-1">
            <ArrowUpRight size={16} /> Next draw in 14 days
          </p>
          
          <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors relative z-10">
            View Draw History
          </button>
        </div>

        {/* Charity Card */}
        <div className="bg-gradient-to-br from-dark-800 to-dark-800 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Heart size={120} />
          </div>
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2 relative z-10"><Heart className="text-red-400 fill-red-400" /> Charity Impact</h2>
          <p className="text-sm text-gray-400 mb-6 relative z-10">Contributing 10% of subscription</p>
          
          <div className="bg-dark-900 rounded-lg p-4 mb-6 border border-white/5 relative z-10">
            <div className="text-sm text-gray-400 mb-1">Current Charity</div>
            <div className="font-bold">Global Golf Foundation</div>
            <div className="w-full bg-dark-800 h-2 mt-3 rounded-full overflow-hidden">
              <div className="bg-red-400 h-full w-[10%]" />
            </div>
          </div>
          
          <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors relative z-10">
            Manage Contribution
          </button>
        </div>
      </div>
    </div>
  )
}
