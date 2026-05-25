'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeContextType = {
  theme: Theme
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')

  // Ao carregar, lê a preferência salva (se houver)
  useEffect(() => {
    const saved = localStorage.getItem('taskflow-theme') as Theme | null
    if (saved) {
      setThemeState(saved)
    }
  }, [])

  // Sempre que o tema muda, aplica a classe .dark no <html>
  useEffect(() => {
    const root = document.documentElement

    function apply() {
      const systemDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      const isDark = theme === 'dark' || (theme === 'system' && systemDark)
      root.classList.toggle('dark', isDark)
    }

    apply()

    // Se está em modo "system", reage a mudanças do sistema
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    if (theme === 'system') {
      media.addEventListener('change', apply)
      return () => media.removeEventListener('change', apply)
    }
  }, [theme])

  function setTheme(t: Theme) {
    setThemeState(t)
    localStorage.setItem('taskflow-theme', t)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme precisa estar dentro do ThemeProvider')
  }
  return ctx
}
