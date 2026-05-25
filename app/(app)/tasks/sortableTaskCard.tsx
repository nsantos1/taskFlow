'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { PriorityBadge } from '@/components/taskBadges'

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

function formatDate(date: string | null): string {
  if (!date) return ''
  return new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  })
}

export function SortableTaskCard({
  task,
  onOpen,
}: {
  task: Task
  onOpen: (task: Task) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onOpen(task)}
      className="cursor-grab active:cursor-grabbing bg-elevated border border-border-base rounded-lg p-3 hover:border-text-muted transition-colors"
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
    </div>
  )
}
