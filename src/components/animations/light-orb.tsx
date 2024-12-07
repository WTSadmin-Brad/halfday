'use client'

import React from 'react'
import { cn } from '@/lib/ui/utils'
import styles from './light-orb.module.css'

interface LightOrbProps {
  className?: string
}

export const LightOrb: React.FC<LightOrbProps> = ({ className }) => {
  return (
    <div 
      className={cn(
        styles.lightOrb,
        styles.animateLightBeam,
        className
      )} 
      aria-hidden="true" 
    />
  )
}
