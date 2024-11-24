import { FC } from 'react'

type TextFieldProps = {
  id: string
  label: string
  placeholder: string
  minLength: number
  maxLength: number
}

const TextField: FC<TextFieldProps> = (props: TextFieldProps) => {
  return (
    <>
      <label className="form-control">
        <div className="label">
          <span className="label-text">{props.label}</span>
        </div>
        <input
          type="text"
          placeholder={props.placeholder}
          className="input"
          maxLength={props.maxLength}
          minLength={props.minLength}
        />
      </label>
    </>
  )
}

export { TextField, TextFieldProps }
