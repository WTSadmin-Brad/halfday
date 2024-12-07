import { cn } from "@/lib/ui/utils";
import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { RadialMenu } from "./radial-menu";

type Status = "full" | "half" | "off" | "none";
type Phase = "status" | "shrinking" | "moving" | "location" | "selecting";

const SAMPLE_LOCATIONS = [
  { id: "office", name: "Office" },
  { id: "remote", name: "Remote" },
  { id: "site-b", name: "Site B" },
  { id: "site-a", name: "Site A" },
  { id: "home", name: "Home" },
] as const;

interface StatusFABProps {
  onStatusChange?: (status: Status) => void;
  onLocationSelect?: (location: { id: string; name: string }) => void;
  className?: string;
}

export function StatusFAB({ onStatusChange, onLocationSelect, className }: StatusFABProps) {
  const [status, setStatus] = useState<Status>("none");
  const [phase, setPhase] = useState<Phase>("status");
  const [lastStatus, setLastStatus] = useState<Status>("none");

  // Reset animation sequence
  const resetToStatus = () => {
    setPhase("status");
    setStatus("none");
    setLastStatus("none");
  };

  // Handle status selection
  const handleClick = () => {
    if (phase === "location") {
      setPhase("selecting");
      return;
    }
    
    if (phase === "selecting") {
      return; // Don't do anything while selecting location
    }
    
    if (phase !== "status") {
      setPhase("status");
      return;
    }

    // Cycle through statuses
    const nextStatus = {
      none: "full",
      full: "half",
      half: "off",
      off: "none",
    }[status] as Status;

    setStatus(nextStatus);
    onStatusChange?.(nextStatus);

    // If we've selected a status (not none), start the transition to location
    if (nextStatus !== "none") {
      setLastStatus(nextStatus);
      // Wait for user to see the status change before moving to location
      setTimeout(() => {
        setPhase("location");
      }, 1500);
    }
  };

  const handleLocationSelect = (location: { id: string; name: string }) => {
    setPhase("status");
    onLocationSelect?.(location);
  };

  // Get the active color based on status
  const getStatusColor = () => {
    switch (lastStatus) {
      case "full": return "teal-700";
      case "half": return "yellow-600";
      case "off": return "red-700";
      default: return "slate-400";
    }
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "relative",
          "transition-all duration-300 ease-in-out",
          // Status phase - centered at bottom (default position)
          phase === "status" && "translate-y-0 translate-x-0",
          // Location and selecting phase - middle-left of screen
          (phase === "location" || phase === "selecting") && "-translate-y-[40vh] -translate-x-[30vw]",
        )}
      >
        <button
          onClick={handleClick}
          className={cn(
            // Base positioning and size
            "relative",
            "transition-all duration-300",
            "z-[100]",
            // Default size
            "w-20 h-20",
            "rounded-full",
            // Outer ring with gradient
            "before:absolute before:inset-0",
            "before:rounded-full",
            "before:p-[2px]",
            "before:bg-gradient-to-r",
            phase === "status" && [
              status === "full" && "before:from-teal-700/30 before:to-teal-600/20",
              status === "half" && "before:from-yellow-600/30 before:to-yellow-500/20",
              status === "off" && "before:from-red-700/30 before:to-red-600/20",
              status === "none" && "before:from-[#95A4DE]/30 before:to-[#E8C1FF]/20",
            ],
            (phase === "location" || phase === "selecting") && [
              lastStatus === "full" && "before:from-teal-700/30 before:to-teal-600/20",
              lastStatus === "half" && "before:from-yellow-600/30 before:to-yellow-500/20",
              lastStatus === "off" && "before:from-red-700/30 before:to-red-600/20",
            ],
            // Inner button styling
            "after:absolute",
            "after:inset-[2px]",
            "after:rounded-full",
            "after:bg-white/10",
            "after:backdrop-blur-[8px]",
            "after:border",
            "after:border-white/20",
            // Shadow effects
            "shadow-lg",
            phase === "status" ? [
              status === "full" && "shadow-teal-700/10",
              status === "half" && "shadow-yellow-600/10",
              status === "off" && "shadow-red-700/10",
              status === "none" && "shadow-[#95A4DE]/10",
            ] : [
              lastStatus === "full" && "shadow-teal-700/10",
              lastStatus === "half" && "shadow-yellow-600/10",
              lastStatus === "off" && "shadow-red-700/10",
            ],
            // Dark ring for contrast
            "ring-1",
            "ring-black/10",
            // Hover effects
            phase === "status" && [
              "hover:scale-105",
              "active:scale-95",
            ],
            className
          )}
        >
          <span className="relative z-[61] flex items-center justify-center w-full h-full">
            {phase === "status" ? (
              <div className={cn(
                "w-10 h-10 rounded-full transition-colors duration-300",
                status === "full" && "bg-teal-700/40",
                status === "half" && "bg-yellow-600/40",
                status === "off" && "bg-red-700/40",
                status === "none" && "bg-[#95A4DE]/30",
              )} />
            ) : (
              <MapPin className={cn(
                "w-10 h-10 transition-all duration-300",
                lastStatus === "full" && "text-teal-700/60",
                lastStatus === "half" && "text-yellow-600/60",
                lastStatus === "off" && "text-red-700/60",
              )} />
            )}
          </span>
        </button>

        {/* Radial Menu */}
        <div className={cn(
          "absolute",
          "top-1/2 left-1/2",
          "transition-all duration-300 ease-in-out",
        )}>
          <RadialMenu
            isOpen={phase === "selecting"}
            locations={SAMPLE_LOCATIONS}
            onSelect={handleLocationSelect}
            activeColor={getStatusColor()}
          />
        </div>
      </div>
    </div>
  );
}
