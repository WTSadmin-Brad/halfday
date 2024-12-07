'use client'

import React from 'react';
import { cn } from '@/lib/ui/utils';
import { StarField } from './star-field';
import Image from 'next/image';

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
      {/* Background Image */}
      <Image
        src="/images/background.webp"
        alt="Aurora Background"
        fill
        priority
        className="object-cover md:object-contain md:top-auto"
        sizes="100vw"
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
