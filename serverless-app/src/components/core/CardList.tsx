import { FC } from 'react'
import { Card, CardProps } from './Card'
import { CoreComponent } from '../../types/CoreComponent.type'

type CardListProps = CoreComponent & {
  cards: CardProps[]
}

const CardList: FC<CardListProps> = ({ cards }) => {
  return (
    <div className="flex flex-col items-stretch">
      {cards.map((card, index) => (
        <Card key={index} title={card.title} description={card.description} />
      ))}
    </div>
  )
}

export default CardList
