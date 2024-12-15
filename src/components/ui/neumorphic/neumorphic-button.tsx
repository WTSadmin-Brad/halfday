import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/ui/utils";

/**
 * Button variants defining the visual styles for different states and types
 */
const neumorphicButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "rounded-lg text-sm font-medium",
    "transition-all duration-200",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-95",
    "bg-[#dde1e7]",
    "font-outfit",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "text-gray-800",
          // Normal state shadow
          "shadow-[-5px_-5px_9px_rgba(255,255,255,0.45),5px_5px_9px_rgba(94,104,121,0.3)]",
          // Hover state shadow
          "hover:shadow-[-6px_-6px_12px_rgba(255,255,255,0.45),6px_6px_12px_rgba(94,104,121,0.3)]",
          // Active/Pressed state shadow
          "active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.45),inset_2px_2px_5px_rgba(94,104,121,0.3)]",
          // Toggle ON state shadow
          "data-[state=on]:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.45),inset_2px_2px_5px_rgba(94,104,121,0.3)]",
        ],
        outline: [
          "text-gray-800",
          "border-2 border-[#dde1e7]",
          // Normal state shadow (more subtle)
          "shadow-[-3px_-3px_7px_rgba(255,255,255,0.45),3px_3px_7px_rgba(94,104,121,0.3)]",
          // Hover state shadow
          "hover:shadow-[-4px_-4px_8px_rgba(255,255,255,0.45),4px_4px_8px_rgba(94,104,121,0.3)]",
          // Active state shadow
          "active:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.45),inset_1px_1px_3px_rgba(94,104,121,0.3)]",
        ],
        ghost: [
          "text-gray-800",
          "bg-transparent",
          "hover:bg-[#dde1e7]/10",
          "active:bg-[#dde1e7]/20",
          // Subtle shadow on hover
          "hover:shadow-[-2px_-2px_5px_rgba(255,255,255,0.3),2px_2px_5px_rgba(94,104,121,0.2)]",
        ],
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-6 text-base",
        icon: "h-10 w-10 p-2",
      },
      withIcon: {
        true: "gap-2",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      withIcon: false,
    },
  }
);

/**
 * Props for the NeumorphicButton component
 * @interface NeumorphicButtonProps
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 * @extends VariantProps<typeof neumorphicButtonVariants>
 */
export interface NeumorphicButtonProps
  extends Omit<
      HTMLMotionProps<"button">,
      keyof VariantProps<typeof neumorphicButtonVariants>
    >,
    VariantProps<typeof neumorphicButtonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  animate?: boolean;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  children?: React.ReactNode;
}

/**
 * A neumorphic-styled button component that can function as a toggle
 *
 * @example
 * ```tsx
 * <NeumorphicButton
 *   variant="default"
 *   size="default"
 *   pressed={isOn}
 *   onPressedChange={setIsOn}
 * >
 *   Toggle Me
 * </NeumorphicButton>
 * ```
 */
const NeumorphicButton = React.forwardRef<
  HTMLButtonElement,
  NeumorphicButtonProps
>(
  (
    {
      className,
      variant,
      size,
      withIcon,
      asChild = false,
      icon,
      animate = true,
      pressed,
      onPressedChange,
      type = "button",
      children,
      onClick,
      style,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onPressedChange) {
        onPressedChange(!pressed);
      }
      onClick?.(e);
    };

    const MotionButton = (
      <motion.button
        className={cn(
          neumorphicButtonVariants({ variant, size, withIcon, className })
        )}
        ref={ref}
        type={type}
        role={onPressedChange ? "switch" : undefined}
        aria-pressed={onPressedChange ? pressed : undefined}
        data-state={pressed ? "on" : "off"}
        whileTap={animate ? { scale: 0.95 } : undefined}
        onClick={handleClick}
        style={style}
        {...props}
      >
        {icon}
        {children}
      </motion.button>
    );

    if (asChild) {
      return <Slot>{MotionButton}</Slot>;
    }

    return MotionButton;
  }
);

NeumorphicButton.displayName = "NeumorphicButton";

export { NeumorphicButton, neumorphicButtonVariants };
