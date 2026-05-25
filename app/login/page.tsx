import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { login, signup } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; mode?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    redirect('/dashboard')
  }

  const params = await searchParams
  const isSignup = params.mode === 'signup'

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Lado esquerdo — formulário */}
      <div className="flex-1 flex flex-col">
        <div className="px-8 pt-6 flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-ink-900" />
          <span className="text-[14.5px] font-semibold tracking-tight text-text-primary">
            TaskFlow
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-[380px]">
            <h1 className="text-[24px] font-semibold tracking-tight text-text-primary">
              {isSignup ? 'Crie sua conta.' : 'Bem-vindo de volta.'}
            </h1>
            <p className="text-[13.5px] text-text-muted mt-1.5">
              {isSignup
                ? 'Comece a organizar suas tarefas agora.'
                : 'Entre para continuar gerenciando suas tarefas.'}
            </p>

            {params.error && (
              <div className="mt-4 text-[13px] text-status-high bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {params.error}
              </div>
            )}

            <form className="mt-6 flex flex-col gap-4">
              {isSignup && (
                <div>
                  <label className="text-[12.5px] font-medium text-text-secondary">
                    Nome
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    required
                    placeholder="Seu nome"
                    className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border-base bg-elevated text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-text-primary"
                  />
                </div>
              )}

              <div>
                <label className="text-[12.5px] font-medium text-text-secondary">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="voce@email.com"
                  className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border-base bg-elevated text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-text-primary"
                />
              </div>

              <div>
                <label className="text-[12.5px] font-medium text-text-secondary">
                  Senha
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border-base bg-elevated text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-text-primary"
                />
              </div>

              <button
                formAction={isSignup ? signup : login}
                className="mt-1 h-10 rounded-lg bg-ink-900 text-white text-[14px] font-medium hover:bg-ink-800 transition-colors"
              >
                {isSignup ? 'Criar conta' : 'Entrar'}
              </button>
            </form>

            {!isSignup && (
              <p className="mt-3 text-center text-[12.5px]">
                <Link
                  href="/recuperar-senha"
                  className="text-text-muted hover:text-text-primary hover:underline"
                >
                  Esqueceu sua senha?
                </Link>
              </p>
            )}

            <p className="mt-5 text-center text-[13px] text-text-muted">
              {isSignup ? 'Já tem conta? ' : 'Não tem conta? '}
              <Link
                href={isSignup ? '/login' : '/login?mode=signup'}
                className="font-semibold text-text-primary hover:underline"
              >
                {isSignup ? 'Entrar' : 'Criar uma agora'}
              </Link>
            </p>
          </div>
        </div>

        <div className="px-8 pb-6 text-[11px] text-text-muted">
          © 2026 TaskFlow · MVP para uso pessoal
        </div>
      </div>

      {/* Lado direito — painel escuro */}
      <div className="hidden lg:flex flex-1 bg-ink-900 flex-col justify-center px-16">
        <div className="text-[11px] font-semibold tracking-wider text-ink-500 uppercase">
          Manifesto
        </div>
        <h2 className="mt-4 text-[32px] leading-tight font-bold text-white">
          Pare de espalhar tarefas entre Notion, Discord e notas.
          Uma lista. Um foco.
        </h2>
        <p className="mt-6 text-[13px] text-ink-400">
          → Construído com Next.js + Tailwind. Pronto pra portfólio.
        </p>
      </div>
    </div>
  )
}
