import { FC, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { JobFilters } from './components/jobs/JobFilters'
import { IStaticMethods } from 'flyonui/flyonui'
import 'preline/preline'

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods
  }
}

const App: FC = () => {
  const [darkMode] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  const location = useLocation()

  useEffect(() => {
    const loadFlyonui = async () => {
      await import('flyonui/flyonui')
      window.HSStaticMethods.autoInit()
    }
    loadFlyonui()
  }, [location.pathname])

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark', 'bg-body-dark', 'text-white')
      document.body.classList.remove('bg-body-light', 'text-dark')
    } else {
      document.body.classList.add('bg-body-light', 'text-dark')
      document.body.classList.remove('dark', 'bg-body-dark', 'text-white')
    }
  }, [true])

  return (
    <div className="min-h-screen flex flex-row ml-10 mt-10 gap-10">
      <JobFilters />
    </div>
  )
}

/*
return (
    <div className="min-h-screen flex flex-row ml-10 mt-10 gap-10">
      <div className="flex flex-col">
        <SearchResult />
        <Paginator currentPage={5} totalPages={199} />
      </div>
      <JobDescription />
    </div>
  )
*/

export default App
