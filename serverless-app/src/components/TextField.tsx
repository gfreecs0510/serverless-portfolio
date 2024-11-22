import { FC } from 'react'

type TextFieldProps = {
  label: string
  placeholder: string
  minLength: number
  maxLength: number
}

const TextField: FC<TextFieldProps> = (props: TextFieldProps) => {
  return (
    <>
      <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
        {props.label}
      </label>
      <input
        type="text"
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        minLength={props.minLength}
        className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
      />
    </>
  )
}

export { TextField, TextFieldProps }
