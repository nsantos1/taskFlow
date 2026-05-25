'use client'

import { useState } from 'react'
import { PriorityBadge } from '@/components/taskBadges'
import { TaskDetail } from './taskDetail'

type Task = {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  category: string | null
  due_date: string | null
  position: number
}

const COLUMNS = [
  { status: 'todo', label: 'A fazer', dot: '#3B82F6' },
  { status: 'doing', label: 'Em andamento', dot: '#F59E0B' },
  { status: 'done', label: 'Concluído', dot: '#10B981' },
]

const PRIORITY_WEIGHT: Record<string, number> = {
  high: 0,
  medium: 1,
  low: 2,
}

function formatDate(date: string | null): string {
  if (!date) return ''
  return new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  })
}

export function TaskBoard({ tasks }: { tasks: Task[] }) {
  const [selected, setSelected] = useState<Task | null>(null)

  return (
    <>
      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((col) => {
          const colTasks = tasks
            .filter((t) => t.status === col.status)
            .sort((a, b) => {
              const pa = PRIORITY_WEIGHT[a.priority] ?? 1
              const pb = PRIORITY_WEIGHT[b.priority] ?? 1
              if (pa !== pb) return pa - pb
              return a.position - b.position
            })

          return (
            <div
              key={col.status}
              className="bg-surface-2 border border-border-base rounded-xl2 p-3"
            >
              {/* Cabeçalho da coluna */}
              <div className="flex items-center gap-2 px-1 pb-3">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: col.dot }}
                />
                <span className="text-[12.5px] font-semibold text-text-primary">
                  {col.label}
                </span>
                <span className="text-[11.5px] text-text-muted">
                  {colTasks.length}
                </span>
              </div>

              {/* Cartões da coluna */}
              <div className="flex flex-col gap-2">
                {colTasks.length === 0 ? (
                  <div className="text-[12px] text-text-muted text-center py-6">
                    Nenhuma tarefa
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => setSelected(task)}
                      className="w-full text-left bg-elevated border border-border-base rounded-lg p-3 hover:border-text-muted transition-colors"
                    >
                      <div className="text-[13px] font-medium text-text-primary">
                        {task.title}
                      </div>
                      {task.description && (
                        <div className="mt-0.5 text-[11.5px] text-text-muted line-clamp-2">
                          {task.description}
                        </div>
                      )}
                      <div className="mt-2.5 flex flex-wrap items-center gap-2">
                        <PriorityBadge priority={task.priority} />
                        {task.category && (
                          <span className="text-[11px] text-text-secondary">
                            {task.category}
                          </span>
                        )}
                        {task.due_date && (
                          <span className="text-[11px] text-text-muted ml-auto">
                            {formatDate(task.due_date)}
                          </span>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>

      {selected && (
        <TaskDetail task={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
