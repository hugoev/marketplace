import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  options?: Option[]
  className?: string
}

export function CustomSelect({
  value,
  onChange,
  placeholder = "Select an option",
  options = [],
  className = "",
}: CustomSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const CustomSelectOriginal = React.forwardRef<HTMLSelectElement, CustomSelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={className}
          ref={ref}
          {...props}
        >
          {children}
        </select>
      </div>
    )
  }
)
CustomSelectOriginal.displayName = 'CustomSelect'

export { CustomSelectOriginal } 