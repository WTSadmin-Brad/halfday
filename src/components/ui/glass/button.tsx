'use client'

import * as React from 'react'
import { cn } from '@/lib/ui/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'

const glassButtonVariants = cva(
  'relative inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-outfit',
  {
    variants: {
      variant: {
        default: [
          'bg-royal-blue/80 text-crystal-white backdrop-blur-glass',
          'hover:bg-royal-blue/90',
          'group relative overflow-hidden',
        ],
        outline: [
          'border border-glass-border bg-glass/10 text-crystal-white backdrop-blur-glass',
          'hover:bg-glass/20',
          'group relative overflow-hidden',
        ],
        ghost: [
          'text-crystal-white backdrop-blur-glass',
          'hover:bg-glass/10',
          'group relative overflow-hidden',
        ],
        gradient: [
          'text-crystal-white backdrop-blur-glass',
          'before:absolute before:inset-0 before:rounded-md',
          'before:bg-gradient-to-b before:from-aurora-pink/90 before:via-[#8B66DE]/90 before:to-royal-blue/90',
          'after:absolute after:inset-0 after:rounded-md after:opacity-0',
          'after:bg-[linear-gradient(180deg,rgba(249,200,202,0.4)_0%,rgba(45,59,172,0.4)_100%)]',
          'after:transition-opacity after:duration-300',
          'hover:after:opacity-100',
          'group relative overflow-hidden',
          'transition-all duration-300',
          'hover:shadow-[0_0_20px_rgba(249,200,202,0.3)]',
          'hover:before:scale-105',
          'before:transition-transform before:duration-300',
        ],
        link: [
          'text-aurora-pink',
          'transition-all duration-300',
          'hover:scale-105',
          'relative',
          'after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px]',
          'after:bg-aurora-pink after:transition-all after:duration-300',
          'hover:after:w-full',
        ],
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
      withGlow: {
        true: [
          'after:absolute after:-inset-1 after:bg-gradient-to-r after:from-aurora-pink/20 after:to-[#020212]/20 after:rounded-md after:blur after:opacity-0 after:transition-opacity',
          'hover:after:opacity-100',
        ],
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      withGlow: false,
    }
  }
)

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  iconPosition?: 'start' | 'end'
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    withGlow,
    asChild = false,
    icon,
    iconPosition = 'end',
    children,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : 'button'
    const content = (
      <>
        {icon && iconPosition === 'start' && (
          <span className="mr-2 relative z-10">
            {icon}
          </span>
        )}
        <span className="relative z-10">{children}</span>
        {icon && iconPosition === 'end' && (
          <span className="ml-2 relative z-10">
            {icon}
          </span>
        )}
      </>
    )

    return (
      <Comp
        className={cn(glassButtonVariants({ variant, size, withGlow }), className)}
        ref={ref}
        {...props}
      >
        {content}
      </Comp>
    )
  }
)

GlassButton.displayName = 'GlassButton'
