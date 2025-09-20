import React from 'react'
import { InputNumber as PrimeInputNumber } from 'primereact/inputnumber'

interface InputNumberProps {
  value?: number
  onChange?: (e: { value: number | null }) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  invalid?: boolean
  size?: number
  min?: number
  max?: number
  step?: number
  minFractionDigits?: number
  maxFractionDigits?: number
  currency?: string
  locale?: string
  mode?: 'decimal' | 'currency'
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const InputNumber: React.FC<InputNumberProps> = ({
  value,
  onChange,
  placeholder,
  className = '',
  disabled = false,
  readOnly = false,
  required = false,
  invalid = false,
  size,
  min,
  max,
  step = 1,
  minFractionDigits = 0,
  maxFractionDigits = 2,
  currency = 'USD',
  locale = 'en-US',
  mode = 'decimal',
  onFocus,
  onBlur
}) => {
  return (
    <PrimeInputNumber
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      invalid={invalid}
      size={size}
      min={min}
      max={max}
      step={step}
      minFractionDigits={minFractionDigits}
      maxFractionDigits={maxFractionDigits}
      currency={currency}
      locale={locale}
      mode={mode}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default InputNumber
