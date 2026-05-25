'use client'

import { useState } from 'react'
import { Sidebar } from './sidebar'

type AppShellProps = {
  userName: string
  userEmail: string
  children: React.ReactNode
}

export function AppShell({ userName, userEmail, children }: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar desktop — sempre visível a partir de lg */}
      <div className="hidden lg:block">
        <Sidebar userName={userName} userEmail={userEmail} />
      </div>

      {/* Sidebar mobile — desliza por cima quando menuOpen */}
      {menuOpen && (
        <>
          {/* Fundo escurecido — toque fecha */}
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />
          {/* A sidebar em si, por cima do fundo */}
          <div className="lg:hidden fixed inset-y-0 left-0 z-50">
            <Sidebar
              userName={userName}
              userEmail={userEmail}
              onNavigate={() => setMenuOpen(false)}
            />
          </div>
        </>
      )}

      {/* Coluna do conteúdo */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Barra de topo mobile — só aparece abaixo de lg */}
        <div className="lg:hidden h-14 px-4 flex items-center gap-3 border-b border-border-base bg-elevated">
          <button
            onClick={() => setMenuOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-2 transition-colors"
            aria-label="Abrir menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              className="text-text-primary">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="text-[14px] font-semibold text-text-primary">
            TaskFlow
          </span>
        </div>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
