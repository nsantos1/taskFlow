import { createClient } from '@/utils/supabase/server'
import { StatusChart } from './statusChart'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: tasks } = await supabase
    .from('tasks')
    .select('status')

  const all = tasks ?? []
  const todo = all.filter((t) => t.status === 'todo').length
  const doing = all.filter((t) => t.status === 'doing').length
  const done = all.filter((t) => t.status === 'done').length
  const total = all.length
  const pending = todo + doing

  const rate = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div>
      <header className="h-14 px-8 flex items-center border-b border-ink-200 bg-white">
        <h1 className="text-[15px] font-semibold text-ink-900">Dashboard</h1>
      </header>

      <div className="p-8">
        {/* Cartões de métrica */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-ink-200 rounded-xl2 p-5">
            <div className="text-[11px] font-semibold tracking-wider text-ink-400 uppercase">
              Total de tarefas
            </div>
            <div className="mt-2 text-[28px] font-semibold text-ink-900">
              {total}
            </div>
          </div>

          <div className="bg-white border border-ink-200 rounded-xl2 p-5">
            <div className="text-[11px] font-semibold tracking-wider text-ink-400 uppercase">
              Concluídas
            </div>
            <div className="mt-2 text-[28px] font-semibold text-ink-900">
              {done}
            </div>
            <div className="mt-1 text-[12px] text-ink-500">
              {rate}% do total
            </div>
          </div>

          <div className="bg-white border border-ink-200 rounded-xl2 p-5">
            <div className="text-[11px] font-semibold tracking-wider text-ink-400 uppercase">
              Pendentes
            </div>
            <div className="mt-2 text-[28px] font-semibold text-ink-900">
              {pending}
            </div>
            <div className="mt-1 text-[12px] text-ink-500">
              {todo} a fazer · {doing} em andamento
            </div>
          </div>
        </div>

        {/* Gráfico */}
        <div className="mt-4 bg-white border border-ink-200 rounded-xl2 p-5">
          <div className="text-[13px] font-semibold text-ink-900">
            Distribuição por status
          </div>
          <div className="mt-4">
            <StatusChart data={{ todo, doing, done }} />
          </div>
        </div>
      </div>
    </div>
  )
}
