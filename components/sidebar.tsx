import Link from 'next/link'
import { Logo } from './logo'
import { logout } from '@/app/login/actions'
import { ThemeToggle } from './themeToggle'

type SidebarProps = {
  userName: string
  userEmail: string
}

export function Sidebar({ userName, userEmail }: SidebarProps) {
  const initials = userName
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase()

  return (
    <aside className="w-[232px] shrink-0 h-screen border-r border-border-base bg-elevated flex flex-col">
      {/* Marca */}
      <div className="h-14 px-4 flex items-center gap-2 border-b border-border-base">
        <Logo size={22} />
        <span className="text-[14.5px] font-semibold tracking-tight text-text-primary">
          TaskFlow
        </span>
        <span className="ml-auto text-[10px] font-medium text-text-muted bg-surface-2 px-1.5 py-0.5 rounded">
          MVP
        </span>
      </div>

      {/* Navegação */}
      <div className="px-4 pt-4 pb-1.5">
        <span className="text-[10.5px] font-semibold tracking-wider text-text-muted uppercase">
          Workspace
        </span>
      </div>
      <nav className="px-2.5 flex flex-col gap-0.5">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 h-8 px-2.5 rounded-md text-[13px] font-medium text-text-secondary hover:bg-surface-2 hover:text-text-primary transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/tasks"
          className="flex items-center gap-2.5 h-8 px-2.5 rounded-md text-[13px] font-medium text-text-secondary hover:bg-surface-2 hover:text-text-primary transition-colors"
        >
          Tarefas
        </Link>
      </nav>

      {/* Empurra o perfil pro rodapé */}
      <div className="flex-1" />

      <div className="mx-2.5 mb-2">
        <ThemeToggle />
      </div>

      {/* Perfil + sair */}
      <div className="mx-2.5 mb-3 flex items-center gap-2.5 px-2 py-2 rounded-lg">
        <div className="w-7 h-7 rounded-full bg-ink-900 text-white flex items-center justify-center text-[11px] font-semibold shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12.5px] font-semibold text-text-primary truncate leading-tight">
            {userName}
          </div>
          <div className="text-[11px] text-text-muted truncate">
            {userEmail}
          </div>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="text-[11px] text-text-muted hover:text-text-secondary transition-colors"
            title="Sair"
          >
            Sair
          </button>
        </form>
      </div>
    </aside>
  )
}
