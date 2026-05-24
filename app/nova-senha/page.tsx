'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updatePassword } from '../recuperar-senha/actions'

export default function NovaSenhaPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(formData: FormData) {
    setBusy(true)
    setError('')
    const result = await updatePassword(formData)
    setBusy(false)
    if (result?.error) {
      setError(result.error)
    } else {
      setDone(true)
      setTimeout(() => router.push('/dashboard'), 1500)
    }
  }

  return (
    <div className="min-h-screen bg-ink-50 flex items-center justify-center px-6">
      <div className="w-full max-w-[380px]">
        <h1 className="text-[22px] font-semibold tracking-tight text-ink-900">
          Criar nova senha
        </h1>

        {done ? (
          <div className="mt-4 text-[13.5px] text-ink-600">
            Senha atualizada! Redirecionando para o app...
          </div>
        ) : (
          <>
            <p className="text-[13.5px] text-ink-500 mt-1.5">
              Defina a nova senha para sua conta.
            </p>

            {error && (
              <div className="mt-4 text-[13px] text-status-high bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <form action={handleSubmit} className="mt-5 flex flex-col gap-4">
              <div>
                <label className="text-[12.5px] font-medium text-ink-700">
                  Nova senha
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="mt-1.5 w-full h-10 px-3 rounded-lg border border-ink-200 bg-white text-[14px] text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-ink-900"
                />
              </div>
              <button
                type="submit"
                disabled={busy}
                className="h-10 rounded-lg bg-ink-900 text-white text-[14px] font-medium hover:bg-ink-800 transition-colors disabled:opacity-50"
              >
                {busy ? 'Salvando...' : 'Salvar nova senha'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
