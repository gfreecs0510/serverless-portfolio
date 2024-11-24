import { FC } from 'react'
import { CoreComponent } from '../../types/CoreComponent.type'

type HeaderProps = CoreComponent & {
  text: string
}

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const className = `${props.additionalClassNames} label`
  return (
    <div className={className}>
      <h5 className="text-3xl label-text">{props.text}</h5>
    </div>
  )
}

export { Header, HeaderProps }
