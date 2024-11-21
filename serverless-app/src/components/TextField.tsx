import React from 'react'

// Export the type for reuse
type TextFieldProps = {
  id: string
  label: string
  placeholder: string
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  autoComplete?: string
  required?: boolean
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange = () => {},
  type = 'text',
  autoComplete,
  required = false
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={label} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  )
}

export { TextFieldProps, TextField }
