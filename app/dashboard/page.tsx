import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { logout } from '../login/actions'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-ink-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-[22px] font-semibold text-ink-900">
          Login funcionou! 🎉
        </h1>
        <p className="mt-2 text-[14px] text-ink-500">
          Logado como: {user.email}
        </p>
        <form action={logout}>
          <button
            type="submit"
            className="mt-6 h-9 px-4 rounded-lg border border-ink-200 bg-white text-[13px] font-medium text-ink-700 hover:bg-ink-100 transition-colors"
          >
            Sair
          </button>
        </form>
      </div>
    </div>
  )
}
