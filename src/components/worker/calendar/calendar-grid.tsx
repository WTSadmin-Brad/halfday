'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
  startOfWeek,
  endOfWeek,
  isWithinInterval
} from 'date-fns';
import { useState } from 'react';
import { cn } from "@/lib/ui/utils";

export type DayStatus = 'full' | 'half' | 'off' | null;

interface CalendarGridProps {
  onDaySelect?: (date: Date) => void;
  dayStatuses?: Record<string, DayStatus>;
  isDrawerExpanded?: boolean;
}

export const CalendarGrid = ({ 
  onDaySelect, 
  dayStatuses = {}, 
  isDrawerExpanded = false 
}: CalendarGridProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // Simulating December 15th, 2024
  const today = new Date(2024, 11, 15); // Note: month is 0-based, so 11 is December
  
  // Generate days for the current month view
  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate current week
  const currentWeekStart = startOfWeek(today);
  const currentWeekEnd = endOfWeek(today);
  const isInCurrentWeek = (date: Date) => 
    isWithinInterval(date, { start: currentWeekStart, end: currentWeekEnd });

  // Calculate the week number (0-based) for the current week
  const currentWeekIdx = Math.floor(days.findIndex(day => isInCurrentWeek(day)) / 7);

  // Constants for grid layout
  const ROW_HEIGHT = 96; // This matches our aspect-square cell height
  const HEADER_HEIGHT = 48; // Height of the month/year header
  const WEEKDAY_HEADER_HEIGHT = 40; // Height of the weekday header
  const BOTTOM_SPACING = 32; // Increased spacing to ensure visibility
  
  // Calculate maximum transform to keep current week visible
  const calculateTransform = () => {
    if (!isDrawerExpanded) return 0;
    
    const desiredTransform = currentWeekIdx * ROW_HEIGHT;
    const maxTransform = desiredTransform - HEADER_HEIGHT - WEEKDAY_HEADER_HEIGHT + BOTTOM_SPACING;
    return Math.max(Math.min(desiredTransform, maxTransform), 0);
  };

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="p-4 space-y-4">
      {/* Month and Year Header */}
      <div 
        className={cn(
          "flex items-center justify-between mb-6 h-12",
          "transition-all duration-300 ease-in-out",
          isDrawerExpanded && "opacity-50 scale-95"
        )}
      >
        <div className="flex items-baseline gap-4">
          <h2 className="text-4xl font-medium text-[#95A4DE] font-outfit">
            {format(firstDayOfMonth, 'MMMM')}
          </h2>
          <span className="text-3xl font-light text-white/50 font-outfit pt-1.5">
            {format(firstDayOfMonth, 'yyyy')}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft className="w-10 h-10 text-[#95A4DE]" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronRight className="w-10 h-10 text-[#95A4DE]" />
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-2 mb-2 bg-[#020212]/80 backdrop-blur-sm h-10">
          {daysOfWeek.map((day, idx) => (
            <div
              key={idx}
              className="text-center text-base font-medium text-white/50 pb-2 border-b border-white/10 font-outfit tracking-wide"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div 
          className="grid grid-cols-7 gap-2 transition-transform duration-300 ease-in-out will-change-transform"
          style={{
            transform: `translateY(-${calculateTransform()}px)`
          }}
        >
          {days.map((day, dayIdx) => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const status = dayStatuses[dateKey];
            const inCurrentWeek = isInCurrentWeek(day);
            
            return (
              <button
                key={day.toString()}
                onClick={() => onDaySelect?.(day)}
                className={cn(
                  "aspect-square p-2 relative group font-outfit",
                  "bg-white/[0.1]",
                  "border border-white/[0.15]",
                  "rounded-lg",
                  "hover:bg-white/[0.15] hover:border-white/[0.2]",
                  "transition-all duration-300 ease-in-out",
                  "transform-gpu", // Use GPU acceleration
                  isSameDay(day, today) && "ring-2 ring-[#E8C1FF] ring-opacity-50",
                  isDrawerExpanded && !inCurrentWeek && "opacity-0 scale-90",
                  isDrawerExpanded && inCurrentWeek && "scale-105 z-10"
                )}
              >
                <time
                  dateTime={format(day, 'yyyy-MM-dd')}
                  className={cn(
                    "flex flex-col items-center justify-center h-full",
                    "text-sm font-medium",
                    !isSameMonth(day, firstDayOfMonth) && "text-white/30",
                    isSameDay(day, today) && "text-[#E8C1FF]",
                    !isSameDay(day, today) && isSameMonth(day, firstDayOfMonth) && "text-white/90",
                  )}
                >
                  <span className="text-xs font-light tracking-wide mb-0.5">
                    {format(day, 'EEE')}
                  </span>
                  <span className={cn(
                    "w-8 h-8 flex items-center justify-center rounded-full",
                    isSameDay(day, today) && "bg-[#E8C1FF]/10"
                  )}>
                    {format(day, 'd')}
                  </span>
                </time>

                {/* Status Overlay */}
                {status && (
                  <div className={cn(
                    "absolute inset-0 rounded-lg -z-0",
                    "transition-opacity duration-200",
                    status === 'full' && "bg-emerald-500/[0.2]",
                    status === 'half' && "bg-amber-500/[0.2]",
                    status === 'off' && "bg-rose-500/[0.2]",
                    "group-hover:opacity-90"
                  )} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};