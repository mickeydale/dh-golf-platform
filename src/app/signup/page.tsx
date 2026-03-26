import Link from 'next/link'
import { HeartPulse } from 'lucide-react'
import { signup } from './actions'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/" className="text-3xl font-bold tracking-tighter flex items-center gap-2">
            <HeartPulse className="text-accent-400" size={32} />
            <span>Impact<span className="text-brand-500">Drive</span></span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Join the Movement
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-brand-500 hover:text-brand-400">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-dark-800 py-8 px-4 shadow-xl shadow-accent-500/10 sm:rounded-2xl sm:px-10 border border-white/5">
          <form className="space-y-6" action={signup}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-700 bg-dark-900 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-accent-500 focus:border-accent-500 sm:text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-700 bg-dark-900 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-accent-500 focus:border-accent-500 sm:text-sm text-white"
                />
              </div>
            </div>

            <div className="text-sm text-gray-400 text-center mb-4">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-dark-900 bg-accent-500 hover:bg-accent-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 transition-colors"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
