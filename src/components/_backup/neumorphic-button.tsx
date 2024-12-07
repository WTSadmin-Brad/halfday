import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/ui/utils";

export interface NeumorphicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neumorphicButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const neumorphicButtonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-anti-flash-white text-gunmetal shadow-neumorphic-flat hover:shadow-neumorphic-pressed active:shadow-neumorphic-pressed",
        pressed: "bg-anti-flash-white text-gunmetal shadow-neumorphic-pressed",
        ghost: "bg-transparent hover:bg-orange hover:text-white",
        destructive: "bg-orange text-white hover:bg-orange/90 shadow-neumorphic-destructive",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2",
        lg: "h-14 px-8 py-4",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * A neumorphic-styled button component that extends shadcn's Button component.
 * Features smooth transitions, loading states, and various visual variants.
 *
 * @component
 * @example
 * ```tsx
 * <NeumorphicButton
 *   variant="default"
 *   loading={isLoading}
 *   onClick={handleClick}
 * >
 *   Sign In
 * </NeumorphicButton>
 * ```
 */
const NeumorphicButton = React.forwardRef<HTMLButtonElement, NeumorphicButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false,
    loading = false,
    disabled,
    children,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(neumorphicButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
NeumorphicButton.displayName = "NeumorphicButton";

export { NeumorphicButton };
