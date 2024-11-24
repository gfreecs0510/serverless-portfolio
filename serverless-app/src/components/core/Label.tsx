import { FC } from 'react'
import { CoreComponent } from '../../types/CoreComponent.type'

type LabelProps = CoreComponent & {
  text: string
}

const Label: FC<LabelProps> = (props: LabelProps) => {
  const className = `${props.additionalClassNames} label`
  return (
    <div className={className}>
      <span className="label-text">{props.text}</span>
    </div>
  )
}

export { Label, LabelProps }
