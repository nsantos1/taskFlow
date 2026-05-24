import { createClient } from '@/utils/supabase/server'
import { TaskForm } from './taskForm'
import { TaskList } from './taskList'

export default async function TasksPage() {
  const supabase = await createClient()

  const { data: tasks } = await supabase
    .from('tasks')
    .select('id, title, description, status, priority, category, due_date')
    .order('created_at', { ascending: false })

  return (
    <div>
      <header className="h-14 px-8 flex items-center justify-between border-b border-ink-200 bg-white">
        <div>
          <h1 className="text-[15px] font-semibold text-ink-900">Tarefas</h1>
          <p className="text-[12px] text-ink-500">
            {tasks?.length ?? 0} tarefa(s)
          </p>
        </div>
        <TaskForm />
      </header>

      <div className="p-8">
        <TaskList tasks={tasks ?? []} />
      </div>
    </div>
  )
}
