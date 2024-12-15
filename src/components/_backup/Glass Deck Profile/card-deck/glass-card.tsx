import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/ui/utils";
import React from "react";

export interface GlassCardProps
  extends Omit<HTMLMotionProps<"div">, "className" | "children"> {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, isActive = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          // Base layout
          "relative w-full h-full p-6",
          "rounded-2xl isolate",

          // Glass effect base
          "bg-white/[0.02]",
          "backdrop-blur-[12px]",
          "border border-white/[0.05]",

          // Gradient overlay
          "before:absolute before:inset-0",
          "before:rounded-2xl",
          "before:bg-gradient-to-br",
          "before:from-white/[0.08]",
          "before:to-transparent",
          "before:pointer-events-none",
          "before:transition-opacity before:duration-200",
          "hover:before:opacity-[0.12]",

          // Active state
          isActive && [
            "before:opacity-[0.1]",
            "hover:before:opacity-[0.15]",
            "border-white/[0.08]",
            "shadow-lg shadow-black/5",
            "backdrop-blur-[16px]",
            "bg-white/[0.03]",
          ],

          // 3D transform
          "transform-gpu",
          "preserve-3d",
          "will-change-transform",
          "transition-transform duration-200 ease-out",

          // Custom classes
          className
        )}
        initial={false}
        style={{
          position: "absolute",
          left: "50%",
          transformStyle: "preserve-3d",
          transformOrigin: `center center ${isActive ? "-40px" : "-20px"}`,
          ...props.style,
        }}
        whileHover={{
          scale: isActive ? 1.02 : 1,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 25,
          },
        }}
        whileTap={{
          scale: isActive ? 0.98 : 1,
          transition: {
            type: "spring",
            stiffness: 500,
            damping: 35,
          },
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;
