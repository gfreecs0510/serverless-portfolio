import { FC } from 'react'

type CardProps = {
  title: string
  description: string
}

const Card: FC<CardProps> = ({ title, description }) => {
  return (
    <div className="card border rounded-none shadow-md p-4">
      {' '}
      <div className="card-body">
        <h5 className="card-title mb-2.5 text-lg font-bold">{title}</h5>
        <p className="mb-4 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}

export { Card, CardProps }
