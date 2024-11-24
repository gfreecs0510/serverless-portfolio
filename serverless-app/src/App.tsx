import { FC, useState, useEffect } from 'react'
import { SearchResult } from './components/jobs/SearchResult'
const App: FC = () => {
  const [darkMode] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  )

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
    <div className="min-h-screen flex flex-row ml-10 mt-10">
      <SearchResult />
    </div>
  )
}

export default App
