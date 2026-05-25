'use client'

import { useState, useEffect } from 'react'
import { ViewSwitch } from './viewSwitch'
import { TaskList } from './taskList'
import { TaskBoard } from './taskBoard'

type View = 'list' | 'board'

type Task = {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  category: string | null
  due_date: string | null
}

export function TasksView({ tasks }: { tasks: Task[] }) {
  const [view, setView] = useState<View>('list')

  // Ao carregar, lê a visão salva (se houver)
  useEffect(() => {
    const saved = localStorage.getItem('taskflow-view') as View | null
    if (saved === 'list' || saved === 'board') {
      setView(saved)
    }
  }, [])

  function changeView(v: View) {
    setView(v)
    localStorage.setItem('taskflow-view', v)
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <ViewSwitch view={view} onChange={changeView} />
      </div>

      {view === 'list' ? (
        <TaskList tasks={tasks} />
      ) : (
        <TaskBoard tasks={tasks} />
      )}
    </div>
  )
}
