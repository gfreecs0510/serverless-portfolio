import { FC } from 'react'

type ButtonProps = {
  label: string
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button className="btn btn-primary max-sm:btn-sm lg:btn-lg">
      {props.label}
    </button>
  )
}

export { Button }
