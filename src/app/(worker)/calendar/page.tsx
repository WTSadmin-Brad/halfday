'use client';

import { CalendarGrid } from "@/components/worker/calendar/calendar-grid";
import { CalendarHeader } from "@/components/worker/calendar/calendar-header";
import { CalendarDrawer } from "@/components/worker/calendar/calendar-drawer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { cn } from "@/lib/ui/utils";
import { useState } from "react";

export default function CalendarPage() {
  const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);
  
  // Sample data for testing the status overlays
  const sampleStatuses = {
    '2024-12-15': 'full',
    '2024-12-16': 'full',
    '2024-12-17': 'half',
    '2024-12-18': 'full',
    '2024-12-19': 'off',
    '2024-12-20': 'full',
    '2024-12-21': 'half',
  } as const;

  const handleDaySelect = (date: Date) => {
    console.log('Selected date:', date);
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  return (
    <AuroraBackground>
      <CalendarHeader 
        syncStatus="synced"
        onProfileClick={handleProfileClick}
      />
      <main className="min-h-screen pt-24 px-4 pb-4 overflow-x-hidden">
        {/* Calendar Section */}
        <div className="max-w-4xl mx-auto">
          <div className={cn(
            "w-full rounded-lg overflow-hidden",
            "bg-white/18",
            "border border-white/15",
            "shadow-lg shadow-black/5",
            "relative",
            "backdrop-blur-[3px]",
            "ring-1 ring-white/25",
            "before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/[0.02] before:to-[#020212]/[0.02]"
          )}>
            <CalendarGrid 
              onDaySelect={handleDaySelect}
              dayStatuses={sampleStatuses}
              isDrawerExpanded={isDrawerExpanded}
            />
          </div>
        </div>

        {/* Calendar Drawer */}
        <CalendarDrawer onExpandedChange={setIsDrawerExpanded}>
          <div className="p-4">
            <h3 className="text-lg font-medium text-white/90">Drawer Content</h3>
            <p className="text-white/60">This is where the drawer content will go.</p>
          </div>
        </CalendarDrawer>
      </main>
    </AuroraBackground>
  );
}