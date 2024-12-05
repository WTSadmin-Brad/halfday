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
  "relative bg-neumorphic-base transition-all duration-200",
  {
    variants: {
      variant: {
        default: "shadow-neumorphic-flat",
        pressed: "shadow-neumorphic-pressed",
        elevated: "shadow-neumorphic-flat hover:shadow-[12px_12px_24px_rgba(174,174,192,0.4),-12px_-12px_24px_rgba(255,255,255,0.7)]",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : Card;
    return (
      <Comp
        ref={ref}
        className={cn(neumorphicCardVariants({ variant, size, className }))}
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
