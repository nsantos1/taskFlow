import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { logout } from '../../login/actions'

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-[22px] font-semibold text-ink-900">Dashboard</h1>
      <p className="mt-1 text-[14px] text-ink-500">
        Visão geral das suas tarefas.
      </p>
      <div className="mt-8 text-[14px] text-ink-400">
        Em breve: métricas e gráficos.
      </div>
    </div>
  )
}
