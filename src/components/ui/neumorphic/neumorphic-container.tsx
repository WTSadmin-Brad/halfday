import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/ui/utils";

const containerVariants = cva(
  "rounded-2xl bg-[#dde1e7] transition-all duration-300",
  {
    variants: {
      variant: {
        raised: "shadow-[-5px_-5px_9px_rgba(255,255,255,0.45),5px_5px_9px_rgba(94,104,121,0.3)]",
        inset: "shadow-[inset_-5px_-5px_9px_rgba(255,255,255,0.45),inset_5px_5px_9px_rgba(94,104,121,0.3)]",
        flat: "border border-[#dde1e7]"
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8"
      },
      hover: {
        true: "hover:scale-[1.02] hover:shadow-[-6px_-6px_12px_rgba(255,255,255,0.45),6px_6px_12px_rgba(94,104,121,0.3)]",
        false: ""
      }
    },
    defaultVariants: {
      variant: "raised",
      size: "default",
      hover: false
    }
  }
);

export interface NeumorphicContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: "div" | "section" | "article" | "main";
  animate?: boolean;
  headerSlot?: React.ReactNode;
}

const NeumorphicContainer = React.forwardRef<HTMLDivElement, NeumorphicContainerProps>(
  ({ 
    className,
    variant,
    size,
    hover,
    as: Component = "div",
    animate = true,
    children,
    headerSlot,
    ...props 
  }, ref) => {
    const Wrapper = animate ? motion.div : Component;
    
    return (
      <Wrapper
        ref={ref}
        className={cn("w-full", className)}
        {...(animate && {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
          }
        })}
        {...props}
      >
        {headerSlot && (
          <div className="mb-6">
            {headerSlot}
          </div>
        )}
        <div 
          className={cn(
            containerVariants({ variant, size, hover })
          )}
        >
          {children}
        </div>
      </Wrapper>
    );
  }
);

NeumorphicContainer.displayName = "NeumorphicContainer";

// Example Header Component to use with the container
const ContainerHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl bg-[#dde1e7] p-4",
      "shadow-[-3px_-3px_7px_rgba(255,255,255,0.45),3px_3px_7px_rgba(94,104,121,0.3)]",
      className
    )}
    {...props}
  >
    {children}
  </div>
));

ContainerHeader.displayName = "ContainerHeader";

// Example usage
const ExampleUsage = () => {
  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      {/* Header Container */}
      <NeumorphicContainer 
        variant="raised" 
        size="default"
        hover={true}
        className="mb-6"
      >
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.45),inset_2px_2px_5px_rgba(94,104,121,0.3)]">
            😊
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
            <p className="text-gray-600">"Johnny"</p>
          </div>
        </div>
      </NeumorphicContainer>

      {/* Main Content Container */}
      <NeumorphicContainer 
        variant="raised"
        size="lg"
        className="min-h-[400px]"
        headerSlot={
          <ContainerHeader>
            <h2 className="text-xl font-semibold text-gray-800 text-center">Profile Settings</h2>
          </ContainerHeader>
        }
      >
        <div className="space-y-6">
          {/* Content goes here */}
          <div className="h-32 rounded-lg bg-[#dde1e7] shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.45),inset_2px_2px_5px_rgba(94,104,121,0.3)]" />
        </div>
      </NeumorphicContainer>
    </div>
  );
};

export { NeumorphicContainer, ContainerHeader, containerVariants };