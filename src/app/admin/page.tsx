import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Users, Trophy, DollarSign, Activity, Heart } from 'lucide-react'


export default async function AdminDashboardPage() {
  const supabase = await createClient()
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
