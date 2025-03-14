import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string
}

const CustomSelect = React.forwardRef<HTMLSelectElement, CustomSelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500 pointer-events-none" />
      </div>
    )
  }
)
CustomSelect.displayName = 'CustomSelect'

export { CustomSelect } 