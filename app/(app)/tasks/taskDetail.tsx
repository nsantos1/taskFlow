'use client'

import { useState } from 'react'
import { StatusBadge, PriorityBadge } from '@/components/taskBadges'
import { updateTask, updateTaskStatus, deleteTask } from './actions'

type Task = {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  category: string | null
  due_date: string | null
}

const STATUS_OPTIONS = [
  { value: 'todo', label: 'A fazer' },
  { value: 'doing', label: 'Em andamento' },
  { value: 'done', label: 'Concluído' },
]

export function TaskDetail({
  task,
  onClose,
}: {
  task: Task
  onClose: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleSave(formData: FormData) {
    setBusy(true)
    setError('')
    const result = await updateTask(task.id, formData)
    setBusy(false)
    if (result?.error) {
      setError(result.error)
    } else {
      setEditing(false)
      onClose()
    }
  }

  async function handleStatus(status: string) {
    setBusy(true)
    await updateTaskStatus(task.id, status)
    setBusy(false)
    onClose()
  }

  async function handleDelete() {
    if (!confirm('Excluir esta tarefa? Esta ação não pode ser desfeita.')) {
      return
    }
    setBusy(true)
    await deleteTask(task.id)
    setBusy(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="w-full sm:max-w-[420px] h-full bg-elevated shadow-pop flex flex-col">
        {/* Cabeçalho */}
        <div className="h-14 px-5 flex items-center justify-between border-b border-border-base">
          <span className="text-[13px] font-medium text-text-muted">
            Detalhe da tarefa
          </span>
          <div className="flex items-center gap-2">
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="h-8 px-3 rounded-lg border border-border-base text-[12.5px] font-medium text-text-secondary hover:bg-surface-2 transition-colors"
              >
                Editar
              </button>
            )}
            <button
              onClick={handleDelete}
              disabled={busy}
              className="h-8 px-3 rounded-lg border border-danger-border text-[12.5px] font-medium text-danger-text hover:bg-danger-bg transition-colors disabled:opacity-50"
            >
              Excluir
            </button>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary text-[18px] leading-none ml-1"
            >
              ×
            </button>
          </div>
        </div>

        {error && (
          <div className="mx-5 mt-4 text-[13px] text-danger-text bg-danger-bg border border-danger-border rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-5">
          {!editing ? (
            /* ----- MODO VISUALIZAÇÃO ----- */
            <div>
              <div className="flex items-center gap-2">
                <StatusBadge status={task.status} />
                <PriorityBadge priority={task.priority} />
              </div>

              <h2 className="mt-3 text-[19px] font-semibold text-text-primary leading-snug">
                {task.title}
              </h2>

              {task.description && (
                <p className="mt-2 text-[13.5px] text-text-secondary leading-relaxed">
                  {task.description}
                </p>
              )}

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] font-semibold tracking-wider text-text-muted uppercase">
                    Categoria
                  </div>
                  <div className="mt-0.5 text-[13.5px] text-text-secondary">
                    {task.category ?? '—'}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold tracking-wider text-text-muted uppercase">
                    Prazo
                  </div>
                  <div className="mt-0.5 text-[13.5px] text-text-secondary">
                    {task.due_date ?? '—'}
                  </div>
                </div>
              </div>

              {/* Mudar status — um clique */}
              <div className="mt-6">
                <div className="text-[11px] font-semibold tracking-wider text-text-muted uppercase">
                  Mudar status
                </div>
                <div className="mt-2 flex gap-2">
                  {STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleStatus(opt.value)}
                      disabled={busy || task.status === opt.value}
                      className={`h-8 px-3 rounded-lg text-[12.5px] font-medium border transition-colors disabled:opacity-50 ${
                        task.status === opt.value
                          ? 'bg-ink-900 text-white border-ink-900'
                          : 'border-border-base text-text-secondary hover:bg-surface-2'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ----- MODO EDIÇÃO ----- */
            <form action={handleSave} className="flex flex-col gap-3.5">
              <div>
                <label className="text-[12.5px] font-medium text-text-secondary">
                  Título
                </label>
                <input
                  name="title"
                  type="text"
                  required
                  defaultValue={task.title}
                  className="mt-1 w-full h-9 px-3 rounded-lg border border-border-base bg-elevated text-[14px] text-text-primary focus:outline-none focus:border-text-primary"
                />
              </div>

              <div>
                <label className="text-[12.5px] font-medium text-text-secondary">
                  Descrição
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={task.description ?? ''}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-border-base bg-elevated text-[14px] text-text-primary focus:outline-none focus:border-text-primary resize-none"
                />
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-[12.5px] font-medium text-text-secondary">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={task.status}
                    className="mt-1 w-full h-9 px-2.5 rounded-lg border border-border-base bg-elevated text-[14px] text-text-primary focus:outline-none focus:border-text-primary"
                  >
                    <option value="todo">A fazer</option>
                    <option value="doing">Em andamento</option>
                    <option value="done">Concluído</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-[12.5px] font-medium text-text-secondary">
                    Prioridade
                  </label>
                  <select
                    name="priority"
                    defaultValue={task.priority}
                    className="mt-1 w-full h-9 px-2.5 rounded-lg border border-border-base bg-elevated text-[14px] text-text-primary focus:outline-none focus:border-text-primary"
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-[12.5px] font-medium text-text-secondary">
                    Categoria
                  </label>
                  <input
                    name="category"
                    type="text"
                    defaultValue={task.category ?? ''}
                    className="mt-1 w-full h-9 px-3 rounded-lg border border-border-base bg-elevated text-[14px] text-text-primary focus:outline-none focus:border-text-primary"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[12.5px] font-medium text-text-secondary">
                    Prazo
                  </label>
                  <input
                    name="due_date"
                    type="date"
                    defaultValue={task.due_date ?? ''}
                    className="mt-1 w-full h-9 px-3 rounded-lg border border-border-base bg-elevated text-[14px] text-text-primary focus:outline-none focus:border-text-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="h-9 px-4 rounded-lg border border-border-base text-[13px] font-medium text-text-secondary hover:bg-surface-2 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={busy}
                  className="h-9 px-4 rounded-lg bg-ink-900 text-white text-[13px] font-medium hover:bg-ink-800 transition-colors disabled:opacity-50"
                >
                  {busy ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
