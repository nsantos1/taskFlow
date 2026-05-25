'use client'

import { useTheme } from './themeProvider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const options: { value: 'light' | 'dark' | 'system'; label: string }[] = [
    { value: 'light', label: 'Claro' },
    { value: 'dark', label: 'Escuro' },
    { value: 'system', label: 'Auto' },
  ]

  return (
    <div className="flex gap-0.5 p-0.5 rounded-lg bg-surface-2 border border-border-base">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setTheme(opt.value)}
          className={`flex-1 h-6 rounded-md text-[10.5px] font-medium transition-colors ${
            theme === opt.value
              ? 'bg-elevated text-text-primary shadow-sm'
              : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
