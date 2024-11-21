import React from 'react'

// Define props type for the Heading component
type HeadingProps = {
  text: string
}

const Heading: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
      {text}
    </h2>
  )
}

export { Heading, HeadingProps }
