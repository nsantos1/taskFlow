'use client'

import { useDroppable } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableTaskCard } from './sortableTaskCard'

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

export function BoardColumn({
  status,
  label,
  dot,
  tasks,
  onOpen,
}: {
  status: string
  label: string
  dot: string
  tasks: Task[]
  onOpen: (task: Task) => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status })

  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl2 p-3 border transition-colors ${
        isOver
          ? 'bg-surface-2 border-text-muted'
          : 'bg-surface-2 border-border-base'
      }`}
    >
      {/* Cabeçalho da coluna */}
      <div className="flex items-center gap-2 px-1 pb-3">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: dot }}
        />
        <span className="text-[12.5px] font-semibold text-text-primary">
          {label}
        </span>
        <span className="text-[11.5px] text-text-muted">
          {tasks.length}
        </span>
      </div>

      {/* Cartões */}
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2 min-h-[60px]">
          {tasks.length === 0 ? (
            <div className="text-[12px] text-text-muted text-center py-6">
              Nenhuma tarefa
            </div>
          ) : (
            tasks.map((task) => (
              <SortableTaskCard key={task.id} task={task} onOpen={onOpen} />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  )
}
