import { ReactNode } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/ui/utils";
import { glass, neumorphic, transition } from "../../styles/design-system";

const containerVariants = cva("rounded-lg transition-all duration-300", {
  variants: {
    variant: {
      glass: glass.base,
      neumorphic: neumorphic.base,
    },
    elevation: {
      raised: "",
      surface: "",
      sunken: "",
    },
    padding: {
      none: "",
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
    },
    interactive: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "glass",
      elevation: "raised",
      className: glass.raised,
    },
    {
      variant: "glass",
      elevation: "sunken",
      className: glass.pressed,
    },
    {
      variant: "neumorphic",
      elevation: "raised",
      className: neumorphic.raised,
    },
    {
      variant: "neumorphic",
      elevation: "sunken",
      className: neumorphic.pressed,
    },
    {
      variant: "glass",
      interactive: true,
      className: glass.interactive,
    },
    {
      variant: "neumorphic",
      interactive: true,
      className: neumorphic.interactive,
    },
  ],
  defaultVariants: {
    variant: "neumorphic",
    elevation: "surface",
    padding: "md",
    interactive: false,
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  children: ReactNode;
}

export function Container({
  className,
  variant,
  elevation,
  padding,
  interactive,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        containerVariants({ variant, elevation, padding, interactive }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function GlassCard({
  className,
  elevation = "raised",
  ...props
}: Omit<ContainerProps, "variant">) {
  return (
    <Container
      variant="glass"
      elevation={elevation}
      className={cn("overflow-hidden", className)}
      {...props}
    />
  );
}

export function NeumorphicCard({
  className,
  elevation = "raised",
  ...props
}: Omit<ContainerProps, "variant">) {
  return (
    <Container
      variant="neumorphic"
      elevation={elevation}
      className={cn("overflow-hidden", className)}
      {...props}
    />
  );
}

export function ProfileSection({
  className,
  title,
  children,
  ...props
}: ContainerProps & { title: string }) {
  return (
    <NeumorphicCard
      elevation="surface"
      className={cn("space-y-4", className)}
      {...props}
    >
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
        {title}
      </h3>
      {children}
    </NeumorphicCard>
  );
}
