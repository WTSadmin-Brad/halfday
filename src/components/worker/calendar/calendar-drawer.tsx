'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/ui/utils';
import { DrawerTab } from './drawer-tab';

interface CalendarDrawerProps {
  children?: React.ReactNode;
  onExpandedChange?: (expanded: boolean) => void;
}

const MIN_HEIGHT = 80;
const MAX_HEIGHT_VH = 55;

export function CalendarDrawer({ children, onExpandedChange }: CalendarDrawerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxHeightPx = typeof window !== 'undefined' ? window.innerHeight * (MAX_HEIGHT_VH / 100) : 0;

  const handleClick = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onExpandedChange?.(newExpanded);
  };

  return (
    <>
      <DrawerTab 
        isExpanded={isExpanded} 
        onClick={handleClick} 
        maxHeight={maxHeightPx}
      />
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <motion.div
          className={cn(
            "w-full",
            "bg-white/[0.03] backdrop-blur-md",
            "border-t border-white/[0.05]",
            "shadow-lg shadow-black/5",
            "rounded-t-2xl",
            "flex flex-col"
          )}
          animate={{ 
            height: isExpanded ? maxHeightPx : MIN_HEIGHT 
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30
          }}
        >
          <div className="flex-1 overflow-y-auto pt-2">
            {children}
          </div>
        </motion.div>
      </div>
    </>
  );
}
