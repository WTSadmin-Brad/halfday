import { cn } from "@/lib/ui/utils";
import { useState, useRef, useEffect } from "react";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

type Status = "full" | "half" | "off" | "none";
type Phase = "status" | "transitioning" | "location";

const LOCATIONS = [
  { id: "office", name: "Office" },
  { id: "remote", name: "Remote" },
  { id: "site-b", name: "Site B" },
  { id: "site-a", name: "Site A" },
  { id: "home", name: "Home" },
] as const;

interface StatusFABProps {
  onStatusChange?: (status: Status) => void;
  onLocationSelect?: (location: { id: string; name: string }) => void;
  isDrawerExpanded?: boolean;
  className?: string;
}

export function StatusFAB({ 
  onStatusChange, 
  onLocationSelect, 
  isDrawerExpanded = false,
  className 
}: StatusFABProps) {
  // Core state
  const [status, setStatus] = useState<Status>("none");
  const [phase, setPhase] = useState<Phase>("status");
  const [showRadial, setShowRadial] = useState(false);
  const locationTimerRef = useRef<NodeJS.Timeout>();

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (locationTimerRef.current) {
        clearTimeout(locationTimerRef.current);
      }
    };
  }, []);

  // Calculate positions based on phase
  const getPosition = () => {
    if (phase === "status") {
      return {
        bottom: isDrawerExpanded ? 'calc(55vh + 60px)' : '60px',
        left: '50%',
        x: '-50%',
        y: '0%',
        top: 'auto'
      };
    }
    
    if (phase === "location") {
      return {
        top: '50%',
        left: '40px',
        x: '0%',
        y: '-50%',
        bottom: 'auto'
      };
    }

    // For transitioning phase, use the current position
    return phase === "status" ? {
      bottom: isDrawerExpanded ? 'calc(55vh + 60px)' : '60px',
      left: '50%',
      x: '-50%',
      y: '0%',
      top: 'auto'
    } : {
      top: '50%',
      left: '40px',
      x: '0%',
      y: '-50%',
      bottom: 'auto'
    };
  };

  // Handle status changes
  const handleClick = () => {
    // Clear any existing timer
    if (locationTimerRef.current) {
      clearTimeout(locationTimerRef.current);
    }

    if (phase === "location") {
      setShowRadial(!showRadial);
      return;
    }

    // Cycle through statuses when in status phase
    const nextStatus = {
      none: "full",
      full: "half",
      half: "off",
      off: "none",
    }[status] as Status;

    setStatus(nextStatus);
    onStatusChange?.(nextStatus);

    // Start the location transition timer if we have a status selected
    if (nextStatus !== "none") {
      // Wait one second before starting transition
      locationTimerRef.current = setTimeout(() => {
        // Start transition
        setPhase("transitioning");
        
        // Move to location after transition
        setTimeout(() => {
          setPhase("location");
        }, 300);
      }, 1000);
    }
  };

  // Calculate radial menu positions
  const getRadialPosition = (index: number) => {
    const total = LOCATIONS.length;
    const angleStep = Math.PI / (total - 1);
    const radius = 140;
    const angle = index * angleStep;
    
    return {
      x: Math.sin(angle) * radius,
      y: -Math.cos(angle) * radius,
    };
  };

  return (
    <motion.div
      className={cn("fixed isolate", className)}
      initial={false}
      animate={{
        ...getPosition(),
        scale: phase === "transitioning" ? 0.2 : 1,
        opacity: 1
      }}
      transition={{ 
        duration: phase === "transitioning" ? 0.2 : 0.3,
        ease: "easeInOut",
        delay: phase === "location" ? 0.1 : 0
      }}
    >
      {/* Main FAB Button */}
      <motion.button
        onClick={handleClick}
        className={cn(
          "relative",
          "w-20 h-20",
          "rounded-full",
          "before:absolute before:inset-0",
          "before:rounded-full",
          "before:p-[2px]",
          "before:bg-gradient-to-r",
          "after:absolute after:inset-0",
          "after:rounded-full",
          "after:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]",
          "backdrop-blur-xl",
          phase === "transitioning" ? [
            "bg-white",
            "shadow-[0_0_20px_rgba(255,255,255,0.5)]",
          ] : phase === "status" ? [
            status === "full" && [
              "before:from-teal-400/40 before:via-teal-500/30 before:to-teal-600/20",
              "after:shadow-[0_0_15px_rgba(45,212,191,0.3)]"
            ],
            status === "half" && [
              "before:from-yellow-400/40 before:via-yellow-500/30 before:to-yellow-600/20",
              "after:shadow-[0_0_15px_rgba(234,179,8,0.3)]"
            ],
            status === "off" && [
              "before:from-red-400/40 before:via-red-500/30 before:to-red-600/20",
              "after:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
            ],
            status === "none" && [
              "before:from-[#95A4DE]/30 before:via-[#95A4DE]/20 before:to-[#95A4DE]/10",
              "after:shadow-[0_0_15px_rgba(149,164,222,0.3)]"
            ]
          ] : [
            "before:from-[#95A4DE]/30 before:via-[#95A4DE]/20 before:to-[#95A4DE]/10",
            "after:shadow-[0_0_15px_rgba(149,164,222,0.3)]"
          ]
        )}
      >
        <motion.span 
          className="relative z-[61] flex items-center justify-center w-full h-full"
          animate={{
            scale: phase === "transitioning" ? 0.3 : 1
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut"
          }}
        >
          <motion.div
            initial={false}
            animate={{
              opacity: phase === "transitioning" || phase === "location" ? 0 : 1,
              scale: phase === "transitioning" ? 0.5 : 1
            }}
            transition={{
              duration: 0.1,
              delay: 0
            }}
          >
            {phase === "status" && (
              <div
                className={cn(
                  "w-10 h-10 rounded-full",
                  status === "full" && "bg-teal-500/40",
                  status === "half" && "bg-yellow-500/40",
                  status === "off" && "bg-red-500/40",
                  status === "none" && "bg-[#95A4DE]/30"
                )}
              />
            )}
          </motion.div>
          {phase === "transitioning" && (
            <motion.div
              className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
          <motion.div
            initial={false}
            animate={{
              opacity: phase === "location" ? 1 : 0,
              scale: phase === "location" ? 1 : 0.5
            }}
            transition={{
              duration: 0.2,
              delay: phase === "location" ? 0.2 : 0
            }}
          >
            {phase === "location" && (
              <MapPin className={cn(
                "w-10 h-10",
                status === "full" && "text-teal-500",
                status === "half" && "text-yellow-500",
                status === "off" && "text-red-500",
                status === "none" && "text-white/60"
              )} />
            )}
          </motion.div>
        </motion.span>
      </motion.button>

      {/* Radial Menu */}
      {phase === "location" && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {LOCATIONS.map((location, index) => {
            const { x, y } = getRadialPosition(index);
            return (
              <motion.button
                key={location.id}
                onClick={() => {
                  onLocationSelect?.(location);
                  setShowRadial(false);
                  // Reset to status mode after location selection
                  setPhase("transitioning");
                  setTimeout(() => {
                    setPhase("status");
                  }, 300);
                }}
                className={cn(
                  "absolute",
                  "w-16 h-16",
                  "rounded-full",
                  "flex items-center justify-center",
                  "bg-white/10",
                  "backdrop-blur-[8px]",
                  "border border-white/20",
                  "text-sm font-medium text-white/90",
                  "shadow-lg"
                )}
                initial={{ opacity: 0, scale: 0 }}
                animate={showRadial ? {
                  opacity: 1,
                  scale: 1,
                  x,
                  y,
                } : {
                  opacity: 0,
                  scale: 0,
                  x: 0,
                  y: 0,
                }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.05,
                }}
              >
                {location.name}
              </motion.button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
