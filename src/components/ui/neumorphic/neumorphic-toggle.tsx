import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/ui/utils";

const toggleVariants = cva(
  "relative rounded-full transition-all duration-300 bg-[#dde1e7]",
  {
    variants: {
      size: {
        default: "w-14 h-7",
        sm: "w-12 h-6",
        lg: "w-16 h-8",
      },
      state: {
        checked: "shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(70,70,70,0.12)]",
        unchecked: "shadow-[-2px_-2px_5px_rgba(255,255,255,0.7),2px_2px_5px_rgba(70,70,70,0.12)]",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      size: "default",
      state: "unchecked",
      disabled: false,
    },
  }
);

const knobVariants = cva(
  "absolute rounded-full bg-[#dde1e7] transition-all duration-300",
  {
    variants: {
      size: {
        default: "w-5 h-5 top-1",
        sm: "w-4 h-4 top-1",
        lg: "w-6 h-6 top-1",
      },
      state: {
        checked: "shadow-[-2px_-2px_5px_rgba(255,255,255,0.7),2px_2px_5px_rgba(70,70,70,0.12)]",
        unchecked: "shadow-[-1px_-1px_3px_rgba(255,255,255,0.7),1px_1px_3px_rgba(70,70,70,0.12)]",
      },
    },
    defaultVariants: {
      size: "default",
      state: "unchecked",
    },
  }
);

export interface NeumorphicToggleProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof toggleVariants> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "default" | "sm" | "lg";
  label?: string;
}

const NeumorphicToggle = React.forwardRef<HTMLButtonElement, NeumorphicToggleProps>(
  ({ checked, onChange, disabled = false, size = "default", label, className, ...props }, ref) => {
    // Calculate knob movement based on size
    const knobMovement = {
      sm: 24,
      default: 28,
      lg: 32,
    }[size];

    return (
      <div className="flex items-center gap-3">
        <motion.button
          ref={ref}
          type="button"
          className={cn(
            toggleVariants({
              size,
              state: checked ? "checked" : "unchecked",
              disabled,
              className,
            })
          )}
          onClick={() => !disabled && onChange(!checked)}
          whileTap={!disabled ? { scale: 0.95 } : undefined}
          {...props}
        >
          <motion.div
            className={cn(
              knobVariants({
                size,
                state: checked ? "checked" : "unchecked",
              })
            )}
            animate={{
              x: checked ? knobMovement : 4,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 30,
              },
            }}
          />
        </motion.button>
        {label && (
          <span className={cn(
            "text-sm text-gray-700",
            disabled && "opacity-50"
          )}>
            {label}
          </span>
        )}
      </div>
    );
  }
);

NeumorphicToggle.displayName = "NeumorphicToggle";

export { NeumorphicToggle, toggleVariants };