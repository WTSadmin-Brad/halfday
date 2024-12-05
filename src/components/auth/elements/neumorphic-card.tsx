import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface NeumorphicCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof neumorphicCardVariants> {
  asChild?: boolean;
}

const neumorphicCardVariants = cva(
  // Base styles - using our neumorphic design system
  "relative bg-[#edf0f4] rounded-2xl transition-all duration-300",
  {
    variants: {
      variant: {
        default: "shadow-[6px_6px_12px_rgba(174,174,192,0.2),-6px_-6px_12px_rgba(255,255,255,0.6)]",
        pressed: "shadow-[inset_2px_2px_5px_rgba(174,174,192,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.7)]",
        elevated: "shadow-[8px_8px_16px_rgba(174,174,192,0.2),-8px_-8px_16px_rgba(255,255,255,0.6)] hover:shadow-[6px_6px_12px_rgba(174,174,192,0.2),-6px_-6px_12px_rgba(255,255,255,0.6)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * A neumorphic-styled card component that extends shadcn's Card component.
 * Provides a soft, elevated container with smooth transitions and various states.
 *
 * @component
 * @example
 * ```tsx
 * <NeumorphicCard>
 *   <CardHeader>
 *     <h2>Welcome Back</h2>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Please sign in to continue</p>
 *   </CardContent>
 * </NeumorphicCard>
 * ```
 */
const NeumorphicCard = React.forwardRef<HTMLDivElement, NeumorphicCardProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : Card;
    return (
      <Comp
        ref={ref}
        className={cn(neumorphicCardVariants({ variant, className }))}
        {...props}
      />
    );
  }
);
NeumorphicCard.displayName = "NeumorphicCard";

export { 
  NeumorphicCard,
  CardHeader,
  CardContent,
  CardFooter,
};
