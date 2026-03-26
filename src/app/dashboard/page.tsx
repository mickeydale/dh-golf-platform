import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Target, Trophy, Heart, ArrowUpRight } from 'lucide-react'


export default async function DashboardPage() {
  const supabase = await createClient()
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
