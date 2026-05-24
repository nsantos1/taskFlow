import { TaskForm } from './taskForm'

export default function TasksPage() {
  return (
    <div>
      <header className="h-14 px-8 flex items-center justify-between border-b border-ink-200 bg-white">
        <div>
          <h1 className="text-[15px] font-semibold text-ink-900">Tarefas</h1>
        </div>
        <TaskForm />
      </header>

      <div className="p-8">
        <p className="text-[14px] text-ink-400">
          A lista de tarefas aparece aqui (próximo bloco).
        </p>
      </div>
    </div>
  )
}
