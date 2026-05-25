'use client'

import { useState, useEffect } from 'react'
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core'
import { BoardColumn } from './boardColumn'
import { SortableTaskCard } from './sortableTaskCard'
import { TaskDetail } from './taskDetail'
import { moveTask } from './actions'

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

function sortTasks(list: Task[]): Task[] {
  return list.slice().sort((a, b) => {
    const pa = PRIORITY_WEIGHT[a.priority] ?? 1
    const pb = PRIORITY_WEIGHT[b.priority] ?? 1
    if (pa !== pb) return pa - pb
    return a.position - b.position
  })
}

/**
 * Calcula a nova position de uma tarefa dentro da coluna de destino,
 * respeitando a faixa de prioridade (regra da Saída B).
 * `index` é a posição visual onde o cartão foi solto.
 */
function computeNewPosition(
  dragged: Task,
  destColumnTasks: Task[],
  index: number
): number {
  // Só os vizinhos da MESMA faixa de prioridade contam.
  const sameBand = destColumnTasks.filter(
    (t) => t.priority === dragged.priority && t.id !== dragged.id
  )

  if (sameBand.length === 0) {
    // Faixa vazia — primeira tarefa daquela prioridade.
    return Date.now() % 100000
  }

  // Ordena a faixa e descobre entre quais vizinhos o cartão caiu.
  const band = sameBand.slice().sort((a, b) => a.position - b.position)

  // Quantas tarefas da MESMA faixa estão acima do ponto de soltura.
  const tasksAboveDrop = destColumnTasks
    .slice(0, index)
    .filter((t) => t.priority === dragged.priority && t.id !== dragged.id)
  const bandIndex = tasksAboveDrop.length

  const before = band[bandIndex - 1]
  const after = band[bandIndex]

  if (!before && after) return after.position - 1          // topo da faixa
  if (before && !after) return before.position + 1         // fim da faixa
  if (before && after) return (before.position + after.position) / 2 // meio
  return Date.now() % 100000
}

export function TaskBoard({ tasks }: { tasks: Task[] }) {
  const [items, setItems] = useState<Task[]>(tasks)
  const [selected, setSelected] = useState<Task | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  useEffect(() => {
    setItems(tasks)
  }, [tasks])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  )

  function handleDragStart(event: DragStartEvent) {
    const task = items.find((t) => t.id === event.active.id)
    setActiveTask(task ?? null)
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null)
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const dragged = items.find((t) => t.id === activeId)
    if (!dragged) return

    // 1. Descobrir a coluna de destino
    let destStatus = over.id as string
    const overTask = items.find((t) => t.id === over.id)
    if (overTask) destStatus = overTask.status

    // Tarefas que estarão na coluna de destino (sem o cartão arrastado)
    const destTasks = sortTasks(
      items.filter((t) => t.status === destStatus && t.id !== activeId)
    )

    // 2. Em que índice visual o cartão foi solto
    let dropIndex = destTasks.length
    if (overTask) {
      const idx = destTasks.findIndex((t) => t.id === overTask.id)
      if (idx !== -1) dropIndex = idx
    }

    // 3. Calcular a nova position (já respeitando a faixa de prioridade)
    const newPosition = computeNewPosition(dragged, destTasks, dropIndex)

    // Atualiza a tela na hora
    setItems((prev) =>
      prev.map((t) =>
        t.id === activeId
          ? { ...t, status: destStatus, position: newPosition }
          : t
      )
    )

    // Persiste no banco
    await moveTask(activeId, destStatus, newPosition)
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          {COLUMNS.map((col) => {
            const colTasks = sortTasks(
              items.filter((t) => t.status === col.status)
            )
            return (
              <BoardColumn
                key={col.status}
                status={col.status}
                label={col.label}
                dot={col.dot}
                tasks={colTasks}
                onOpen={setSelected}
              />
            )
          })}
        </div>

        <DragOverlay>
          {activeTask ? (
            <SortableTaskCard task={activeTask} onOpen={() => {}} />
          ) : null}
        </DragOverlay>
      </DndContext>

      {selected && (
        <TaskDetail task={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
