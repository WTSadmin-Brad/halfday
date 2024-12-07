'use client'

import * as React from 'react'
import { cn } from '@/lib/ui/utils'
import { VariantProps, cva } from 'class-variance-authority'

const glassInputVariants = cva(
  'flex w-full text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/50 disabled:cursor-not-allowed disabled:opacity-50 font-outfit text-white/90',
  {
    variants: {
      variant: {
        default: [
          'flex h-10 rounded-md border bg-glass/5 px-3 py-2',
          'border-glass-border',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-pink/20',
        ],
        minimal: [
          'bg-transparent pb-2 px-3',
          'border-b border-white/30',
          'focus-visible:outline-none focus-visible:border-white/50',
          'group-hover:border-white/40',
          'relative',
          'rounded-none',
        ],
      },
      withGradient: {
        true: [
          'after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0',
          'after:bg-gradient-to-r after:from-aurora-pink after:to-royal-blue',
          'focus:after:w-full after:transition-all after:duration-300',
        ],
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      withGradient: false,
    },
  }
)

export interface GlassInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof glassInputVariants> {
  error?: boolean
  icon?: React.ReactNode
  iconClassName?: string
}

export const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ 
    className, 
    variant, 
    withGradient,
    error,
    icon,
    iconClassName,
    type,
    ...props 
  }, ref) => {
    const inputStyles = cn(
      glassInputVariants({ variant, withGradient }),
      error && 'border-aurora-pink/50 focus-visible:ring-aurora-pink/50',
      icon && 'pr-10',
      className
    )

    return (
      <div className="relative group">
        <input
          type={type}
          className={inputStyles}
          ref={ref}
          {...props}
        />
        {icon && (
          <div 
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2',
              'text-white/40 group-hover:text-white/60 transition-colors',
              variant === 'minimal' && 'top-[52%]',
              iconClassName
            )}
          >
            {icon}
          </div>
        )}
      </div>
    )
  }
)

GlassInput.displayName = 'GlassInput'
