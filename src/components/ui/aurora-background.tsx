'use client'

import React from 'react';
import { cn } from '@/lib/ui/utils';
import { StarField } from './star-field';

interface AuroraBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  className,
  children,
}) => {
  return (
    <div className={cn(
      'relative min-h-screen bg-[#020212] overflow-hidden',
      className
    )}>
      {/* Mobile Background Image */}
      <div 
        className="absolute bottom-0 left-0 right-0 w-full bg-no-repeat bg-bottom min-h-[800px] md:hidden"
        style={{
          backgroundImage: 'url("/images/background.webp")',
          height: '100vh',
          backgroundSize: 'cover',
        }}
      />
      {/* Desktop Background Image */}
      <div 
        className="hidden md:block absolute bottom-0 left-0 right-0 w-full bg-no-repeat bg-bottom h-[60vh]"
        style={{
          backgroundImage: 'url("/images/background.webp")',
          backgroundSize: 'contain',
        }}
      />

      {/* Stars on top of background */}
      <div className="absolute inset-0 z-[1]">
        <StarField />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
};
