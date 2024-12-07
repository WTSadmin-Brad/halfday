'use client'

import * as React from 'react'
import { cn } from '@/lib/ui/utils'
import { VariantProps, cva } from 'class-variance-authority'

const glassContainerVariants = cva(
  'relative rounded-lg transition-all duration-200 backdrop-blur-[3px] overflow-hidden ring-1 ring-white/20 shadow-[inset_0_0_1px_rgba(255,255,255,0.15)]',
  {
    variants: {
      variant: {
        default: [
          'bg-white/7',
          'border border-white/10',
          'shadow-lg shadow-black/5',
          'before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/15 before:to-transparent',
          'after:absolute after:inset-0 after:bg-gradient-to-b after:from-[#020212]/40 after:to-transparent after:to-60%',
          'border-t-[0.5px] border-t-white/30',
          'border-b-[0.5px] border-b-black/30',
        ],
        solid: [
          'relative overflow-hidden z-10',
          'bg-white/[0.02] backdrop-blur-2xl',
          'rounded-xl border border-white/[0.05]',
          'shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]',
          '[&>.shimmer-orb]:absolute [&>.shimmer-orb]:w-[500px] [&>.shimmer-orb]:h-[500px]',
          '[&>.shimmer-orb]:opacity-[0.03]',
          '[&>.shimmer-orb]:blur-2xl',
          '[&>.shimmer-orb]:pointer-events-none',
          'animate-container-fade-in',
        ],
        subtle: [
          'bg-white/5 border-white/15',
          'before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/12 before:to-transparent',
          'after:absolute after:inset-0 after:bg-gradient-to-b after:from-[#020212]/30 after:to-transparent after:to-60%',
          'border-t-[0.5px] border-t-white/20',
          'border-b-[0.5px] border-b-black/20',
        ],
      },
      size: {
        default: 'p-6',
        sm: 'p-4',
        lg: 'p-8',
      },
      hover: {
        default: [
          'hover:bg-white/10',
          'hover:before:from-white/18',
          'hover:after:from-[#020212]/35',
          'hover:ring-white/30',
          'hover:border-t-white/40',
          'hover:border-b-black/40',
        ],
        none: '',
        glow: [
          'hover:bg-white/10',
          'hover:before:from-white/18',
          'hover:after:from-[#020212]/35',
          'hover:ring-white/30',
          'hover:border-t-white/40',
          'hover:border-b-black/40',
          'hover:shadow-[0_0_15px_rgba(255,252,247,0.1)]'
        ],
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      hover: 'none',
    }
  }
)

export interface GlassContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassContainerVariants> {
  asChild?: boolean
}

export const GlassContainer = React.forwardRef<HTMLDivElement, GlassContainerProps>(
  ({ className, variant, size, hover, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(glassContainerVariants({ variant, size, hover }), className)}
        {...props}
      >
        <div 
          className="shimmer-orb bg-gradient-to-r from-aurora-pink via-aurora-pink/50 to-transparent animate-orb1"
          aria-hidden="true"
        />
        <div 
          className="shimmer-orb bg-gradient-to-r from-royal-blue via-royal-blue/50 to-transparent animate-orb2"
          style={{ animationDelay: '-10s' }}
          aria-hidden="true"
        />
        {children}
      </div>
    )
  }
)

GlassContainer.displayName = 'GlassContainer'
