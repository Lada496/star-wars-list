import React from 'react'
import { Select } from '@chakra-ui/react'

type SelectorProps = {
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  options: string[]
  label: string
}

const Selector = ({ placeholder, value, onChange, options, label }: SelectorProps) => {
  return (
    <Select placeholder={placeholder} value={value} onChange={onChange} aria-label={label}>
      {options.map((option) => (
        <option key={option} value={option} style={{ textTransform: 'capitalize' }}>
          {option}
        </option>
      ))}
    </Select>
  )
}

export default Selector
