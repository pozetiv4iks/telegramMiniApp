import React from 'react'
import { Button as PrimeButton } from 'primereact/button'

interface ButtonProps {
  label?: string
  icon?: string
  iconPos?: 'left' | 'right' | 'top' | 'bottom'
  onClick?: () => void
  className?: string
  disabled?: boolean
  loading?: boolean
  severity?: 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger' | 'contrast'
  size?: 'small' | 'large'
  text?: boolean
  outlined?: boolean
  children?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  iconPos = 'left',
  onClick,
  className = '',
  disabled = false,
  loading = false,
  severity = 'primary',
  size,
  text = false,
  outlined = false,
  children
}) => {
  return (
    <PrimeButton
      label={label}
      icon={icon}
      iconPos={iconPos}
      onClick={onClick}
      className={className}
      disabled={disabled}
      loading={loading}
      severity={severity as any}
      size={size}
      text={text}
      outlined={outlined}
    >
      {children}
    </PrimeButton>
  )
}

export default Button
