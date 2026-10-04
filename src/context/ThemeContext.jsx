import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('ecair-theme') || 'light' } catch { return 'light' }
  })

  useEffect(() => {
    if (!localStorage.getItem('ecair-theme')) {
      try { localStorage.setItem('ecair-theme', 'light') } catch {}
    }
    document.documentElement.className = theme
    try { localStorage.setItem('ecair-theme', theme) } catch {}
  }, [theme])

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
