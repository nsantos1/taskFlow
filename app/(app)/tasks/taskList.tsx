'use client'

import { useState } from 'react'
import { StatusBadge, PriorityBadge } from '@/components/taskBadges'
import { TaskDetail } from './taskDetail'

type Task = {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  category: string | null
  due_date: string | null
}

function formatDate(date: string | null): string {
  if (!date) return '—'
  return new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  })
}

export function TaskList({ tasks }: { tasks: Task[] }) {
  const [selected, setSelected] = useState<Task | null>(null)

  if (tasks.length === 0) {
    return (
      <div className="mt-12 text-center">
        <p className="text-[15px] font-semibold text-ink-900">
          Nenhuma tarefa por aqui ainda.
        </p>
        <p className="mt-1 text-[13px] text-ink-500">
          Clique em “+ Nova tarefa” para criar a primeira.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="mt-6 bg-white border border-ink-200 rounded-xl2 overflow-hidden">
        <div className="grid grid-cols-[1fr_120px_100px_120px_90px] gap-4 px-5 h-10 items-center border-b border-ink-100 text-[11px] font-semibold tracking-wider text-ink-400 uppercase">
          <span>Tarefa</span>
          <span>Categoria</span>
          <span>Prioridade</span>
          <span>Status</span>
          <span>Prazo</span>
        </div>

        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => setSelected(task)}
            className="w-full text-left grid grid-cols-[1fr_120px_100px_120px_90px] gap-4 px-5 py-3 items-center border-b border-ink-100 last:border-b-0 hover:bg-ink-50 transition-colors"
          >
            <div className="min-w-0">
              <div className="text-[14px] font-medium text-ink-900 truncate">
                {task.title}
              </div>
              {task.description && (
                <div className="text-[12.5px] text-ink-500 truncate">
                  {task.description}
                </div>
              )}
            </div>
            <span className="text-[12.5px] text-ink-600 truncate">
              {task.category ?? '—'}
            </span>
            <PriorityBadge priority={task.priority} />
            <StatusBadge status={task.status} />
            <span className="text-[12.5px] text-ink-600">
              {formatDate(task.due_date)}
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <TaskDetail task={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
