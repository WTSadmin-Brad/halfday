import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/ui/utils";
import { useThemeAwareTypography } from "@/lib/typography/hooks/use-theme-aware-typography";

export interface NeumorphicInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof neumorphicInputVariants> {
  label?: string;
  error?: string;
  description?: string;
}

const neumorphicInputVariants = cva(
  // Base styles - only include neumorphic-specific styles here
  "bg-anti-flash-white border-none shadow-neumorphic-input transition-all duration-200",
  {
    variants: {
      variant: {
        default: "",
        error:
          "shadow-[inset_2px_2px_5px_rgba(239,68,68,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] focus:shadow-[inset_3px_3px_6px_rgba(239,68,68,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.7)]",
        success:
          "shadow-[inset_2px_2px_5px_rgba(34,197,94,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] focus:shadow-[inset_3px_3px_6px_rgba(34,197,94,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.7)]",
      },
      size: {
        default: "h-12 px-4 py-2 text-base text-gunmetal placeholder:text-light-gray",
        sm: "h-10 px-3 py-1.5 text-sm text-gunmetal placeholder:text-light-gray",
        lg: "h-14 px-6 py-3 text-lg text-gunmetal placeholder:text-light-gray",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * A neumorphic-styled input component that extends shadcn's Input component.
 * Features smooth transitions, error states, and optional label.
 *
 * @component
 * @example
 * ```tsx
 * <NeumorphicInput
 *   label="Email"
 *   placeholder="Enter your email"
 *   type="email"
 *   error={errors.email?.message}
 * />
 * ```
 */
const NeumorphicInput = React.forwardRef<HTMLInputElement, NeumorphicInputProps>(
  ({ 
    className, 
    variant, 
    size, 
    label, 
    error,
    description,
    id,
    ...props 
  }, ref) => {
    const inputId = id || React.useId();
    const errorId = `${inputId}-error`;
    const descriptionId = `${inputId}-description`;
    const typography = useThemeAwareTypography();
  
    return (
      <div className="space-y-2">
        {label && (
          <Label 
            htmlFor={inputId} 
            className={cn(
              typography.form.inputText,
              "block text-sm font-medium text-foreground"
            )}
          >
            {label}
          </Label>
        )}
        
        <Input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={cn(
            description ? descriptionId : undefined,
            error ? errorId : undefined
          )}
          className={cn(
            neumorphicInputVariants({ variant: error ? "error" : variant, size }),
            className,
            "focus:shadow-[inset_3px_3px_6px_rgba(174,174,192,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.7)]"
          )}
          {...props}
        />
        
        {description && !error && (
          <p
            id={descriptionId}
            className={cn(
              typography.mutedColor,
              "text-xs text-muted-foreground"
            )}
          >
            {description}
          </p>
        )}
        
        {error && (
          <p
            id={errorId}
            className={cn(
              typography.form.inputError,
              "text-xs font-medium text-destructive"
            )}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
NeumorphicInput.displayName = "NeumorphicInput";

export { NeumorphicInput };
