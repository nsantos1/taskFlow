import { createClient } from '@/utils/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-ink-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-[22px] font-semibold text-ink-900">
          Login funcionou! 🎉
        </h1>
        <p className="mt-2 text-[14px] text-ink-500">
          Logado como: {user?.email ?? 'desconhecido'}
        </p>
      </div>
    </div>
  )
}
