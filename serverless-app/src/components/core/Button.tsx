import { FC } from 'react'
import { CoreComponent } from '../../types/CoreComponent.type'

type ButtonProps = CoreComponent & {
  label: string
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  return <button className="btn btn-primary self-start">{props.label}</button>
}

export { Button }
