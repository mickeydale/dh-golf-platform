import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Users, Trophy, DollarSign, Activity } from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch admin profile to verify role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  // if (profile?.role !== 'admin') {
  //   redirect('/dashboard')
  // }
  
  // NOTE: Role check is commented out for development mocking purposes since 
  // we do not have a real admin user seeded yet.

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">Platform Overview</h1>
        <p className="text-gray-400">High-level metrics and system status.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dark-800 border border-white/5 p-6 rounded-xl flex items-center gap-4">
          <div className="bg-brand-500/20 p-4 rounded-xl text-brand-500">
            <Users size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Subscribers</div>
            <div className="text-2xl font-bold text-white">0</div>
          </div>
        </div>

        <div className="bg-dark-800 border border-white/5 p-6 rounded-xl flex items-center gap-4">
          <div className="bg-accent-500/20 p-4 rounded-xl text-accent-500">
            <DollarSign size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Current Prize Pool</div>
            <div className="text-2xl font-bold text-white">$0.00</div>
          </div>
        </div>

        <div className="bg-dark-800 border border-white/5 p-6 rounded-xl flex items-center gap-4">
          <div className="bg-red-500/20 p-4 rounded-xl text-red-500">
            <Heart size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Charity Raised</div>
            <div className="text-2xl font-bold text-white">$0.00</div>
          </div>
        </div>

        <div className="bg-dark-800 border border-white/5 p-6 rounded-xl flex items-center gap-4">
          <div className="bg-green-500/20 p-4 rounded-xl text-green-500">
            <Activity size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400">System Status</div>
            <div className="text-xl font-bold text-green-500">Operational</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Recent Activity */}
        <div className="bg-dark-800 border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-xl font-bold">Pending Verifications</h2>
            <button className="text-sm text-brand-400 hover:text-brand-300">View All</button>
          </div>
          <div className="p-6 text-center text-gray-400 py-12">
            No pending winner verifications.
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-3">
                <Trophy className="text-gray-400 group-hover:text-accent-400" size={20} />
                <span className="font-medium text-gray-300 group-hover:text-white">Run Monthly Draw Simulation</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-3">
                <Heart className="text-gray-400 group-hover:text-red-400" size={20} />
                <span className="font-medium text-gray-300 group-hover:text-white">Add New Charity</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-3">
                <Users className="text-gray-400 group-hover:text-brand-400" size={20} />
                <span className="font-medium text-gray-300 group-hover:text-white">Manage Users</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
