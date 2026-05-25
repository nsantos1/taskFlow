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
      <header className="h-14 px-8 flex items-center border-b border-border-base bg-elevated">
        <h1 className="text-[15px] font-semibold text-text-primary">Dashboard</h1>
      </header>

      <div className="p-8">
        {/* Cartões de métrica */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-elevated border border-border-base rounded-xl2 p-5">
            <div className="text-[11px] font-semibold tracking-wider text-text-muted uppercase">
              Total de tarefas
            </div>
            <div className="mt-2 text-[28px] font-semibold text-text-primary">
              {total}
            </div>
          </div>

          <div className="bg-elevated border border-border-base rounded-xl2 p-5">
            <div className="text-[11px] font-semibold tracking-wider text-text-muted uppercase">
              Concluídas
            </div>
            <div className="mt-2 text-[28px] font-semibold text-text-primary">
              {done}
            </div>
            <div className="mt-1 text-[12px] text-text-muted">
              {rate}% do total
            </div>
          </div>

          <div className="bg-elevated border border-border-base rounded-xl2 p-5">
            <div className="text-[11px] font-semibold tracking-wider text-text-muted uppercase">
              Pendentes
            </div>
            <div className="mt-2 text-[28px] font-semibold text-text-primary">
              {pending}
            </div>
            <div className="mt-1 text-[12px] text-text-muted">
              {todo} a fazer · {doing} em andamento
            </div>
          </div>
        </div>

        {/* Gráfico */}
        <div className="mt-4 bg-elevated border border-border-base rounded-xl2 p-5">
          <div className="text-[13px] font-semibold text-text-primary">
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
