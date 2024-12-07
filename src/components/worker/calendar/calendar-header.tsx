'use client';

import { cn } from "@/lib/ui/utils";
import { UserCircle2, Cloud } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CalendarHeaderProps {
  syncStatus?: 'synced' | 'syncing' | 'error';
  onProfileClick?: () => void;
}

export function CalendarHeader({ syncStatus = 'synced', onProfileClick }: CalendarHeaderProps) {
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50",
      "h-16 px-4",
      "bg-white/[0.03] backdrop-blur-md",
      "border-b border-white/[0.05]",
      "shadow-sm shadow-black/5"
    )}>
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between relative">
        {/* Left: Sync Status */}
        <motion.div
          animate={{
            scale: syncStatus === 'syncing' ? [1, 1.1, 1] : 1,
          }}
          transition={{
            repeat: syncStatus === 'syncing' ? Infinity : 0,
            duration: 2,
          }}
        >
          <Cloud className={cn(
            "w-8 h-8 mt-0.5 transition-colors duration-300",
            syncStatus === 'synced' && "text-emerald-400",
            syncStatus === 'syncing' && "text-amber-400",
            syncStatus === 'error' && "text-rose-400"
          )} />
        </motion.div>

        {/* Left Divider */}
        <div className="absolute left-24 top-1/2 -translate-y-1/2 h-10 w-px bg-white/20 z-10" />

        {/* Center: Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-1">
          <Image
            src="/logo/logo-text-lav.svg"
            alt="Half Day"
            width={140}
            height={47}
            className="h-9 w-auto"
            priority
          />
        </div>

        {/* Right Divider */}
        <div className="absolute right-24 top-1/2 -translate-y-1/2 h-10 w-px bg-white/20 z-10" />

        {/* Right: Profile */}
        <motion.button
          onClick={onProfileClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full hover:bg-white/5 transition-colors"
        >
          <UserCircle2 className="w-9 h-9 mt-0.5 text-gray-200" />
        </motion.button>
      </div>
    </header>
  );
}
