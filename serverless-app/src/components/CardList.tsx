import { FC } from 'react'
import { Card, CardProps } from './Card'

type CardListProps = {
  cards: CardProps[]
}

const CardList: FC<CardListProps> = ({ cards }) => {
  return (
    <div className="flex flex-col">
      {cards.map((card, index) => (
        <Card key={index} title={card.title} description={card.description} />
      ))}
    </div>
  )
}

export default CardList
