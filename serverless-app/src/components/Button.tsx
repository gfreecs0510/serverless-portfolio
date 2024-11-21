import React from 'react'

type ButtonProps = {
  onClick?: () => void
  className?: string
  type: 'button' | 'submit' | 'reset'
  text: string
}

const Button: React.FC<ButtonProps> = ({ type, onClick, className, text }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${className}`}
    >
      {text}
    </button>
  )
}

export { Button, ButtonProps }
