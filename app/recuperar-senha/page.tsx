'use client'

import { useState } from 'react'
import Link from 'next/link'
import { requestReset } from './actions'

export default function RecuperarSenhaPage() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(formData: FormData) {
    setBusy(true)
    setError('')
    const result = await requestReset(formData)
    setBusy(false)
    if (result?.error) {
      setError(result.error)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen bg-ink-50 flex items-center justify-center px-6">
      <div className="w-full max-w-[380px]">
        <h1 className="text-[22px] font-semibold tracking-tight text-ink-900">
          Recuperar senha
        </h1>

        {sent ? (
          <div className="mt-4 text-[13.5px] text-ink-600 leading-relaxed">
            Se houver uma conta com esse email, enviamos um link para você
            redefinir a senha. Confira sua caixa de entrada (e o spam).
          </div>
        ) : (
          <>
            <p className="text-[13.5px] text-ink-500 mt-1.5">
              Digite seu email e enviaremos um link para criar uma nova senha.
            </p>

            {error && (
              <div className="mt-4 text-[13px] text-status-high bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <form action={handleSubmit} className="mt-5 flex flex-col gap-4">
              <div>
                <label className="text-[12.5px] font-medium text-ink-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="voce@email.com"
                  className="mt-1.5 w-full h-10 px-3 rounded-lg border border-ink-200 bg-white text-[14px] text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-ink-900"
                />
              </div>
              <button
                type="submit"
                disabled={busy}
                className="h-10 rounded-lg bg-ink-900 text-white text-[14px] font-medium hover:bg-ink-800 transition-colors disabled:opacity-50"
              >
                {busy ? 'Enviando...' : 'Enviar link'}
              </button>
            </form>
          </>
        )}

        <p className="mt-5 text-center text-[13px] text-ink-500">
          <Link href="/login" className="font-semibold text-ink-900 hover:underline">
            Voltar para o login
          </Link>
        </p>
      </div>
    </div>
  )
}
