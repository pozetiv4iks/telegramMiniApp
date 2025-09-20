import React from 'react'

interface CheckboxProps {
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
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
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        value={value}
        name={name}
        id={id}
        className={`w-5 h-5 text-tg-blue bg-white border-gray-300 rounded focus:ring-tg-blue focus:ring-2 ${
          invalid ? 'border-red-500' : ''
        }`}
      />
      {label && (
        <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  )
}

export default Checkbox
