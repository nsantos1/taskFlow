import { createClient } from '@/utils/supabase/server'
import { TaskForm } from './taskForm'
import { TaskList } from './taskList'

const PRIORITY_WEIGHT: Record<string, number> = {
  high: 0,
  medium: 1,
  low: 2,
}

export default async function TasksPage() {
  const supabase = await createClient()

  const { data: tasks } = await supabase
    .from('tasks')
    .select('id, title, description, status, priority, category, due_date, created_at')
    .order('created_at', { ascending: false })

  const sorted = (tasks ?? []).slice().sort((a, b) => {
    const pa = PRIORITY_WEIGHT[a.priority] ?? 1
    const pb = PRIORITY_WEIGHT[b.priority] ?? 1
    if (pa !== pb) return pa - pb
    return 0
  })

  return (
    <div>
      <header className="h-14 px-8 flex items-center justify-between border-b border-ink-200 bg-white">
        <div>
          <h1 className="text-[15px] font-semibold text-ink-900">Tarefas</h1>
          <p className="text-[12px] text-ink-500">
            {sorted.length} tarefa(s)
          </p>
        </div>
        <TaskForm />
      </header>

      <div className="p-8">
        <TaskList tasks={sorted} />
      </div>
    </div>
  )
}
