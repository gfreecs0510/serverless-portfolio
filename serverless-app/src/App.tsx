import { FC, useState, useEffect } from 'react'
import Login from './pages/Login'

const App: FC = () => {
  const [darkMode, setDarkMode] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  // Effect to apply the theme to the body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark', 'bg-body-dark', 'text-white')
      document.body.classList.remove('bg-body-light', 'text-dark')
    } else {
      document.body.classList.add('bg-body-light', 'text-dark')
      document.body.classList.remove('dark', 'bg-body-dark', 'text-white')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-4 bg-primary text-white rounded shadow"
      >
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>
      <Login />
    </div>
  )
}

export default App
