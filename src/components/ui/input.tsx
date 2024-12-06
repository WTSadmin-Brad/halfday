import * as React from "react";
import { cn } from "@/lib/ui/utils";
import { useThemeAwareTypography } from "@/lib/typography/hooks/use-theme-aware-typography";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
    const typography = useThemeAwareTypography();
    
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          typography.form.inputText,
          `placeholder:${typography.form.inputPlaceholder}`,
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          disabled && [typography.form.inputDisabled, "cursor-not-allowed opacity-50"],
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
