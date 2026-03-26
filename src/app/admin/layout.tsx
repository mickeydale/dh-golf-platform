import Link from 'next/link'
import { HeartPulse, LayoutDashboard, Users, Trophy, Heart, Settings, LogOut, BarChart } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-900 flex text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-800 border-r border-white/5 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <HeartPulse className="text-brand-500" size={24} />
            <span>Impact<span className="text-accent-400">Admin</span></span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-brand-500/10 text-brand-400 font-medium transition-colors">
            <LayoutDashboard size={20} /> Overview
          </Link>
          <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Management</div>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <Users size={20} /> Users & Subs
          </Link>
          <Link href="/admin/draws" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <Trophy size={20} /> Draw Engine
          </Link>
          <Link href="/admin/charities" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <Heart size={20} /> Charities
          </Link>
          <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">System</div>
          <Link href="/admin/reports" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <BarChart size={20} /> Analytics
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <Settings size={20} /> Settings
          </Link>
        </nav>
        
        <div className="p-4 border-t border-white/5">
          <form action="/auth/signout" method="post">
            <button className="flex w-full items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors">
              <LogOut size={20} /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
