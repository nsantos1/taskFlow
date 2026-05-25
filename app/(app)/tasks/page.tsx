import { createClient } from '@/utils/supabase/server'
import { TaskForm } from './taskForm'
import { TasksView } from './tasksView'

const PRIORITY_WEIGHT: Record<string, number> = {
  high: 0,
  medium: 1,
  low: 2,
}

export default async function TasksPage() {
  const supabase = await createClient()

  const { data: tasks } = await supabase
    .from('tasks')
    .select('id, title, description, status, priority, category, due_date, position')
    .order('priority')
    .order('position')

  const sorted = (tasks ?? []).slice().sort((a, b) => {
    const pa = PRIORITY_WEIGHT[a.priority] ?? 1
    const pb = PRIORITY_WEIGHT[b.priority] ?? 1
    if (pa !== pb) return pa - pb
    return a.position - b.position
  })

  return (
    <div>
      <header className="h-14 px-8 flex items-center justify-between border-b border-border-base bg-elevated">
        <div>
          <h1 className="text-[15px] font-semibold text-text-primary">Tarefas</h1>
          <p className="text-[12px] text-text-muted">
            {sorted.length} tarefa(s)
          </p>
        </div>
        <TaskForm />
      </header>

      <div className="p-4 lg:p-8">
        <TasksView tasks={sorted} />
      </div>
    </div>
  )
}
