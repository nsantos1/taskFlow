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
        <p className="text-[15px] font-semibold text-text-primary">
          Nenhuma tarefa por aqui ainda.
        </p>
        <p className="mt-1 text-[13px] text-text-muted">
          Clique em “+ Nova tarefa” para criar a primeira.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* ===== TABELA — desktop (lg pra cima) ===== */}
      <div className="hidden lg:block mt-6 bg-elevated border border-border-base rounded-xl2 overflow-hidden">
        <div className="grid grid-cols-[1fr_120px_100px_120px_90px] gap-4 px-5 h-10 items-center border-b border-border-base text-[11px] font-semibold tracking-wider text-text-muted uppercase">
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
            className="w-full text-left grid grid-cols-[1fr_120px_100px_120px_90px] gap-4 px-5 py-3 items-center border-b border-border-base last:border-b-0 hover:bg-surface-2 transition-colors"
          >
            <div className="min-w-0">
              <div className="text-[14px] font-medium text-text-primary truncate">
                {task.title}
              </div>
              {task.description && (
                <div className="text-[12.5px] text-text-muted truncate">
                  {task.description}
                </div>
              )}
            </div>
            <span className="text-[12.5px] text-text-secondary truncate">
              {task.category ?? '—'}
            </span>
            <PriorityBadge priority={task.priority} />
            <StatusBadge status={task.status} />
            <span className="text-[12.5px] text-text-secondary">
              {formatDate(task.due_date)}
            </span>
          </button>
        ))}
      </div>

      {/* ===== CARTÕES — celular (abaixo de lg) ===== */}
      <div className="lg:hidden mt-4 flex flex-col gap-2.5">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => setSelected(task)}
            className="w-full text-left bg-elevated border border-border-base rounded-xl2 p-4 hover:bg-surface-2 transition-colors"
          >
            <div className="text-[14px] font-medium text-text-primary">
              {task.title}
            </div>
            {task.description && (
              <div className="mt-0.5 text-[12.5px] text-text-muted line-clamp-2">
                {task.description}
              </div>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StatusBadge status={task.status} />
              <PriorityBadge priority={task.priority} />
              {task.category && (
                <span className="text-[11.5px] text-text-secondary">
                  {task.category}
                </span>
              )}
              <span className="text-[11.5px] text-text-muted ml-auto">
                {formatDate(task.due_date)}
              </span>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <TaskDetail task={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
