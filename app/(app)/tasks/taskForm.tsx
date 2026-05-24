'use client'

import { useState } from 'react'
import { createTask } from './actions'

export function TaskForm() {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(formData: FormData) {
    setSaving(true)
    setError('')
    const result = await createTask(formData)
    setSaving(false)

    if (result?.error) {
      setError(result.error)
    } else {
      setOpen(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="h-9 px-3.5 rounded-lg bg-ink-900 text-white text-[13px] font-medium hover:bg-ink-800 transition-colors"
      >
        + Nova tarefa
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-[440px] bg-white rounded-xl2 shadow-pop p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-semibold text-ink-900">
                Nova tarefa
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-ink-400 hover:text-ink-700 text-[18px] leading-none"
              >
                ×
              </button>
            </div>

            {error && (
              <div className="mt-3 text-[13px] text-status-high bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <form action={handleSubmit} className="mt-4 flex flex-col gap-3.5">
              <div>
                <label className="text-[12.5px] font-medium text-ink-700">
                  Título
                </label>
                <input
                  name="title"
                  type="text"
                  required
                  placeholder="O que precisa ser feito?"
                  className="mt-1 w-full h-9 px-3 rounded-lg border border-ink-200 text-[14px] text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-ink-900"
                />
              </div>

              <div>
                <label className="text-[12.5px] font-medium text-ink-700">
                  Descrição
                </label>
                <textarea
                  name="description"
                  rows={2}
                  placeholder="Detalhes (opcional)"
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-ink-200 text-[14px] text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-ink-900 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-[12.5px] font-medium text-ink-700">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue="todo"
                    className="mt-1 w-full h-9 px-2.5 rounded-lg border border-ink-200 text-[14px] text-ink-900 focus:outline-none focus:border-ink-900"
                  >
                    <option value="todo">A fazer</option>
                    <option value="doing">Em andamento</option>
                    <option value="done">Concluído</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-[12.5px] font-medium text-ink-700">
                    Prioridade
                  </label>
                  <select
                    name="priority"
                    defaultValue="medium"
                    className="mt-1 w-full h-9 px-2.5 rounded-lg border border-ink-200 text-[14px] text-ink-900 focus:outline-none focus:border-ink-900"
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-[12.5px] font-medium text-ink-700">
                    Categoria
                  </label>
                  <input
                    name="category"
                    type="text"
                    placeholder="Ex: Faculdade"
                    className="mt-1 w-full h-9 px-3 rounded-lg border border-ink-200 text-[14px] text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-ink-900"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[12.5px] font-medium text-ink-700">
                    Prazo
                  </label>
                  <input
                    name="due_date"
                    type="date"
                    className="mt-1 w-full h-9 px-3 rounded-lg border border-ink-200 text-[14px] text-ink-900 focus:outline-none focus:border-ink-900"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-9 px-4 rounded-lg border border-ink-200 text-[13px] font-medium text-ink-700 hover:bg-ink-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="h-9 px-4 rounded-lg bg-ink-900 text-white text-[13px] font-medium hover:bg-ink-800 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Salvando...' : 'Criar tarefa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
