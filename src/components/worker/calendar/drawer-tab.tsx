'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/ui/utils';
import { ChevronUp } from 'lucide-react';

interface DrawerTabProps {
  isExpanded: boolean;
  onClick: () => void;
  maxHeight: number;
}

export function DrawerTab({ isExpanded, onClick, maxHeight }: DrawerTabProps) {
  return (
    <motion.div 
      className={cn(
        "fixed right-6",
        "w-12 h-10",
        "flex items-center justify-center",
        "bg-white/[0.03] backdrop-blur-md",
        "border border-white/[0.05]",
        "rounded-t-lg",
        "shadow-lg shadow-black/5",
        "cursor-pointer",
        "z-50",
        "group"
      )}
      initial={false}
      animate={{ 
        bottom: isExpanded ? maxHeight : 80
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30
      }}
      onClick={onClick}
    >
      <motion.div
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
      >
        <ChevronUp 
          className={cn(
            "w-6 h-6 text-[#95A4DE]",
            "group-hover:text-[#95A4DE]/80",
            "transition-colors duration-200"
          )} 
        />
      </motion.div>
    </motion.div>
  );
}
