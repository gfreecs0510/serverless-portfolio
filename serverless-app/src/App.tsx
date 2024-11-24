import { FC, useState, useEffect } from 'react'
import CardList from './components/CardList'
import { Paginator } from './components/Paginator'

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
    <div className="min-h-screen flex items-center justify-center">
      <CardList
        cards={[
          { title: 'Software Developer', description: 'Amazon' },
          { title: 'UX Designer', description: 'Facebook' },
          { title: 'Team Leader', description: 'Google' },
          { title: 'Software Developer', description: 'Amazon' },
          { title: 'UX Designer', description: 'Facebook' },
          { title: 'Team Leader', description: 'Google' },
          { title: 'Software Developer', description: 'Amazon' },
          { title: 'UX Designer', description: 'Facebook' },
          { title: 'Team Leader', description: 'Google' },
          { title: 'Software Developer', description: 'Amazon' },
          { title: 'UX Designer', description: 'Facebook' },
          { title: 'Team Leader', description: 'Google' },
          { title: 'Software Developer', description: 'Amazon' },
          { title: 'UX Designer', description: 'Facebook' },
          { title: 'Team Leader', description: 'Google' },
        ]}
      />
      <Paginator pages={[1, 2, 3, 4, 5]} />
    </div>
  )
}

export default App
