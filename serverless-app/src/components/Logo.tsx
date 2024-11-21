import React from 'react'

// Define props type for the Logo component
type LogoProps = {
  src: string
  alt: string
  height?: string // Optional prop for height
  width?: string // Optional prop for width
}

const Logo: React.FC<LogoProps> = ({
  src,
  alt,
  height = '40',
  width = 'auto',
}) => {
  return (
    <img alt={alt} src={src} className={`mx-auto h-${height} w-${width}`} />
  )
}

export { Logo, LogoProps }
