'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/ui/utils';
import { ChevronUp } from 'lucide-react';
import { StatusFAB } from "./status-fab";

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
    <div className="fixed bottom-0 left-0 right-0 z-40">
      {/* Status FAB Container */}
      <div className={cn(
        "fixed left-1/2 -translate-x-1/2",
        "bottom-8",
        "z-[100]"
      )}>
        <StatusFAB />
      </div>
      
      {/* Drawer Tab */}
      <div 
        className={cn(
          "absolute right-6 -top-9 z-0",
          "w-12 h-10",
          "flex items-center justify-center",
          "bg-[#95A4DE]/20",
          "border border-[#95A4DE]/30",
          "rounded-t-lg",
          "shadow-lg shadow-black/5",
          "cursor-pointer",
          "transition-all duration-200",
          "hover:bg-[#95A4DE]/25",
          "group",
          "touch-none",
          "backdrop-blur-sm"
        )}
        onClick={handleClick}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronUp 
            className={cn(
              "w-6 h-6 text-[#020212]",
              "group-hover:text-[#020212]/80",
              "transition-colors duration-200"
            )} 
          />
        </motion.div>
      </div>

      <motion.div
        className={cn(
          "relative w-full z-10",
          "bg-white/[0.03] backdrop-blur-md",
          "border-t border-white/[0.05]",
          "shadow-lg shadow-black/5",
          "rounded-t-2xl",
          "flex flex-col",
          "pointer-events-auto",
          "touch-none",
          "overscroll-none"
        )}
        style={{ 
          height: isExpanded ? maxHeightPx : MIN_HEIGHT,
        }}
        animate={{ 
          height: isExpanded ? maxHeightPx : MIN_HEIGHT 
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
      >
        <div className="flex-1 overflow-y-auto pt-2 overscroll-none touch-none">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
