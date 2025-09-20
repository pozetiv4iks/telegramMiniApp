import React from 'react'
import { Dropdown as PrimeDropdown } from 'primereact/dropdown'

interface DropdownOption {
  label: string
  value: any
  disabled?: boolean
}

interface DropdownProps {
  value?: any
  onChange?: (e: { value: any }) => void
  options: DropdownOption[]
  placeholder?: string
  className?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  invalid?: boolean
  filter?: boolean
  filterBy?: string
  filterPlaceholder?: string
  showClear?: boolean
  emptyMessage?: string
  emptyFilterMessage?: string
  optionLabel?: string
  optionValue?: string
  optionDisabled?: string
  size?: number
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  placeholder,
  className = '',
  disabled = false,
  readOnly = false,
  required = false,
  invalid = false,
  filter = false,
  filterBy = 'label',
  filterPlaceholder = 'Поиск...',
  showClear = false,
  emptyMessage = 'Нет данных',
  emptyFilterMessage = 'Ничего не найдено',
  optionLabel = 'label',
  optionValue = 'value',
  optionDisabled = 'disabled',
  size,
  onFocus,
  onBlur
}) => {
  return (
    <PrimeDropdown
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      invalid={invalid}
      filter={filter}
      filterBy={filterBy}
      filterPlaceholder={filterPlaceholder}
      showClear={showClear}
      emptyMessage={emptyMessage}
      emptyFilterMessage={emptyFilterMessage}
      optionLabel={optionLabel}
      optionValue={optionValue}
      optionDisabled={optionDisabled}
      size={size}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default Dropdown
