import { FC } from 'react'
import CardList from '../core/CardList'
import { Card } from '../core/Card'

const SearchResult: FC = () => {
  return (
    <div className="flex flex-col">
      <Card title="100 jobs found" description=""></Card>
      <CardList
        cards={[
          { title: 'Software Developer', description: 'Amazon' },
          { title: 'UX Designer', description: 'Facebook' },
          { title: 'Team Leader', description: 'Google' },
        ]}
      />
    </div>
  )
}

export { SearchResult }
