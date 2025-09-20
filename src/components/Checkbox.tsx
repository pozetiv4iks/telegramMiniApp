import React from 'react'
import { Checkbox as PrimeCheckbox, CheckboxChangeEvent } from 'primereact/checkbox'

interface CheckboxProps {
  checked?: boolean
  onChange?: (e: CheckboxChangeEvent) => void
  label?: string
  className?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  invalid?: boolean
  value?: any
  name?: string
  id?: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
  className = '',
  disabled = false,
  readOnly = false,
  required = false,
  invalid = false,
  value,
  name,
  id
}) => {
  return (
    <div className={`flex align-items-center ${className}`}>
      <PrimeCheckbox
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        invalid={invalid}
        value={value}
        name={name}
        inputId={id}
      />
      {label && (
        <label htmlFor={id} className="ml-2">
          {label}
        </label>
      )}
    </div>
  )
}

export default Checkbox
