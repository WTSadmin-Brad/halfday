"use client";

import * as React from "react";
import { cn } from "@/lib/ui/utils";
import { VariantProps, cva } from "class-variance-authority";

const glassTextareaVariants = cva(
  "w-full text-sm placeholder:text-white/50 disabled:cursor-not-allowed disabled:opacity-50 font-outfit text-white/90",
  {
    variants: {
      variant: {
        default: [
          "rounded-md border bg-glass/5 px-3 py-2",
          "border-glass-border",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-pink/20",
        ],
        minimal: [
          "bg-transparent pb-2 px-3",
          "border-b border-white/30",
          "focus-visible:outline-none focus-visible:border-white/50",
          "group-hover:border-white/40",
          "relative",
          "rounded-none",
        ],
      },
      withGradient: {
        true: [
          "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0",
          "after:bg-gradient-to-r after:from-aurora-pink after:to-royal-blue",
          "focus:after:w-full after:transition-all after:duration-300",
        ],
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      withGradient: false,
    },
  }
);

export interface GlassTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof glassTextareaVariants> {
  error?: boolean;
}

export const GlassTextarea = React.forwardRef<
  HTMLTextAreaElement,
  GlassTextareaProps
>(({ className, variant, withGradient, error, ...props }, ref) => {
  const textareaStyles = cn(
    glassTextareaVariants({ variant, withGradient }),
    error && "border-aurora-pink/50 focus-visible:ring-aurora-pink/50",
    className
  );

  return (
    <div className="relative group">
      <textarea className={textareaStyles} ref={ref} {...props} />
    </div>
  );
});

GlassTextarea.displayName = "GlassTextarea";
