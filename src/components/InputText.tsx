import React from 'react'
import { InputText as PrimeInputText } from 'primereact/inputtext'

interface InputTextProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  invalid?: boolean
  size?: 'small' | 'large'
  keyfilter?: string
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const InputText: React.FC<InputTextProps> = ({
  value,
  onChange,
  placeholder,
  className = '',
  disabled = false,
  readOnly = false,
  required = false,
  invalid = false,
  size,
  keyfilter,
  onKeyDown,
  onFocus,
  onBlur
}) => {
  return (
    <PrimeInputText
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      invalid={invalid}
      size={size}
      keyfilter={keyfilter as any}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default InputText
