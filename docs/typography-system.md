# Typography System for Half Day App

## Core Configuration

### 1. Font Family Hierarchy

- **Primary UI Font**: Outfit

  - Used for main interface elements
  - Modern, slightly wide proportions
  - Excellent readability at all sizes

- **System Font**: Inter

  - Used as secondary font
  - Clean and professional
  - Great for dense information

- **Monospace**: JetBrains Mono
  - Used for code blocks and technical content
  - Enhanced readability for code

### 2. Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  theme: {
    extend: {
      fontFamily: {
        outfit: ["var(--font-outfit)", ...fontFamily.sans],
        inter: ["var(--font-inter)", ...fontFamily.sans],
        mono: ["var(--font-jetbrains-mono)", ...fontFamily.mono],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
      },
    },
  },
} satisfies Config;
```

### 3. Next.js Font Configuration

```typescript
// app/layout.tsx
import { Inter, JetBrains_Mono, Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
```

## Usage Guidelines

### 1. Component-Specific Typography

- **Auth Forms**: Outfit font

  ```tsx
  <form className="font-outfit">
    <input className="text-lg" />
    <button className="text-lg font-medium">
  </form>
  ```

- **Data Display**: Inter font

  ```tsx
  <div className="font-inter">
    <table className="text-sm">
    <div className="text-base">
  </div>
  ```

- **Code Blocks**: JetBrains Mono
  ```tsx
  <pre className="font-mono text-sm">
  ```

### 2. Font Weight Usage

- Light (300): Subtle text, captions
- Regular (400): Body text, inputs
- Medium (500): Buttons, interactive elements
- Semibold (600): Section headers
- Bold (700): Main headers, emphasis

### 3. Responsive Typography

Default responsive scales for common elements:

- Headers: text-2xl -> text-4xl
- Subheaders: text-xl -> text-2xl
- Body: text-base -> text-lg
- Small text: text-sm -> text-base

## Best Practices

1. Use `font-outfit` for:

   - Main UI components
   - Buttons and interactive elements
   - Headers and prominent text

2. Use `font-inter` for:

   - Dense information displays
   - Data tables
   - Secondary UI elements

3. Use `font-mono` for:

   - Code snippets
   - Technical information
   - Monospaced number displays

4. Typography Combinations:
   ```tsx
   // Example of combining fonts
   <div className="font-outfit text-2xl">
     <h1>Main Header</h1>
     <div className="font-inter text-base">Supporting content in Inter</div>
   </div>
   ```

## Typography Components

### 1. Base Typography Provider

```typescript
// lib/typography/types.ts
export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "large"
  | "base"
  | "small"
  | "muted"
  | "lead";

// components/ui/typography/provider.tsx
import { createContext, useContext } from "react";
import type { TextVariant } from "@/lib/typography/types";

interface TypographyContextValue {
  variant?: TextVariant;
}

const TypographyContext = createContext<TypographyContextValue>({});

export const useTypography = () => useContext(TypographyContext);
```

### 2. Modern Heading Component

```typescript
// components/ui/typography/heading.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("scroll-m-20", {
  variants: {
    level: {
      1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
      2: "text-3xl font-semibold tracking-tight",
      3: "text-2xl font-semibold tracking-tight",
      4: "text-xl font-semibold tracking-tight",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    level: 1,
    align: "left",
  },
});

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  level: 1 | 2 | 3 | 4;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, align, ...props }, ref) => {
    const Tag = `h${level}` as const;

    return (
      <Tag
        ref={ref}
        className={cn(headingVariants({ level, align }), className)}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";
```

### 3. Enhanced Text Component

```typescript
// components/ui/typography/text.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      default: "leading-7",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "default",
    align: "left",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: React.ElementType;
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, align, as: Component = "p", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ variant, align }), className)}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";
```

### 4. Modern Link Component

```typescript
// components/ui/typography/link.tsx
import * as React from "react";
import NextLink from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const linkVariants = cva(
  "inline-flex items-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "text-primary hover:text-primary/80",
        destructive: "text-destructive hover:text-destructive/80",
        muted: "text-muted-foreground hover:text-muted-foreground/80",
      },
      underline: {
        true: "underline-offset-4 hover:underline",
        false: "no-underline",
      },
    },
    defaultVariants: {
      variant: "default",
      underline: true,
    },
  }
);

interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  href: string;
  external?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, underline, href, external, ...props }, ref) => {
    if (external) {
      return (
        <a
          ref={ref}
          href={href}
          className={cn(linkVariants({ variant, underline }), className)}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      );
    }

    return (
      <NextLink
        ref={ref}
        href={href}
        className={cn(linkVariants({ variant, underline }), className)}
        {...props}
      />
    );
  }
);
Link.displayName = "Link";
```

## Usage with shadcn/ui Components

```typescript
// components/calendar/day-cell.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/typography/text";

export function DayCell({ date, status }: DayCellProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <Text variant="small" className="text-muted-foreground">
          {format(date, "EEE")}
        </Text>
        <Text variant="large">{format(date, "d")}</Text>
        <Text variant="muted">{status}</Text>
      </CardContent>
    </Card>
  );
}
```

## Performance Optimizations

### 1. Font Loading Strategy

```typescript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  experimental: {
    optimizePackageImports: ["@/components/ui"],
  },
};

export default nextConfig;
```

### 2. CSS Loading Optimization

```typescript
// app/layout.tsx
import "@/styles/typography.css"; // Separate typography styles

export const metadata = {
  fontOptimization: {
    preconnect: ["https://fonts.googleapis.com", "https://fonts.gstatic.com"],
  },
};
```

## Accessibility Enhancements

```typescript
// components/ui/typography/prose.tsx
import { cn } from "@/lib/utils";

interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Prose({ className, ...props }: ProseProps) {
  return (
    <div
      className={cn(
        "prose prose-gray dark:prose-invert",
        "prose-headings:scroll-m-20",
        "prose-headings:tracking-tight",
        "prose-lead:text-muted-foreground",
        "prose-a:underline-offset-4",
        className
      )}
      {...props}
    />
  );
}
```

## Best Practices Implementation

1. **Consistent Spacing System**

```typescript
// Consistent vertical rhythm
const verticalRhythm = {
  xs: "space-y-2", // 8px
  sm: "space-y-4", // 16px
  md: "space-y-6", // 24px
  lg: "space-y-8", // 32px
  xl: "space-y-12", // 48px
};
```

2. **Theme-Aware Typography**

```typescript
// hooks/useThemeAwareTypography.ts
import { useTheme } from "next-themes";

export function useThemeAwareTypography() {
  const { theme, systemTheme } = useTheme();
  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  return {
    textColor: isDark ? "text-white" : "text-gray-900",
    mutedColor: isDark ? "text-gray-400" : "text-gray-500",
  };
}
```

3. **SEO Optimization**

```typescript
// components/ui/typography/seo-heading.tsx
import { Heading } from "./heading";

interface SEOHeadingProps extends React.ComponentProps<typeof Heading> {
  pageTitle?: boolean;
}

export function SEOHeading({ pageTitle, ...props }: SEOHeadingProps) {
  if (pageTitle) {
    return (
      <header className="mb-8">
        <Heading {...props} />
      </header>
    );
  }
  return <Heading {...props} />;
}
```

## Typography System

Our typography system is designed to provide consistent text styling across the application, with built-in support for dark/light themes and various UI components.

### Core Components

#### 1. Theme-Aware Typography

The system uses `next-themes` for theme detection and provides consistent colors through the `useThemeAwareTypography` hook. This ensures all text elements adapt to the user's preferred theme.

#### 2. Typography Constants

We maintain a centralized set of typography constants in `src/lib/typography/hooks/use-theme-aware-typography.ts`:

```typescript
typographyThemeConstants = {
  dark: {
    textColor: "text-gray-50",
    // ... other dark theme colors
    form: {
      inputText: "text-gray-100",
      inputPlaceholder: "text-gray-400",
      // ... other form colors
    },
  },
  light: {
    // Light theme equivalents
  },
};
```

#### 3. Typography Hook

The `useThemeAwareTypography` hook provides access to theme-aware typography styles:

```typescript
const Component = () => {
  const typography = useThemeAwareTypography();
  return <div className={typography.textColor}>...</div>;
};
```

## Component Integration

### Base Components

Base components like `Input` automatically integrate with the typography system:

```typescript
// src/components/ui/input.tsx
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const typography = useThemeAwareTypography();
    return (
      <input
        className={cn(
          typography.form.inputText,
          `placeholder:${typography.form.inputPlaceholder}`
          // ... other styles
        )}
        {...props}
      />
    );
  }
);
```

### Extended Components

Components that extend base components (like NeumorphicInput) inherit typography styles and can add their own:

```typescript
export function NeumorphicInput({ className, ...props }: NeumorphicInputProps) {
  const typography = useThemeAwareTypography();
  return (
    <Input
      className={cn(
        neumorphicInputVariants(),
        // Base styles are inherited from Input
        className
      )}
      {...props}
    />
  );
}
```

## Best Practices

### 1. Use the Typography Hook

❌ Don't hardcode colors:

```typescript
<div className="text-gray-900">...</div>
```

✅ Do use the typography hook:

```typescript
const typography = useThemeAwareTypography();
<div className={typography.textColor}>...</div>;
```

### 2. Extend Base Components

❌ Don't recreate existing typography logic:

```typescript
<input className="text-gray-900 dark:text-gray-100" />
```

✅ Do extend base components:

```typescript
<Input className={customStyles} />
```

### 3. Component-Specific Typography

When creating new component categories:

1. Add types to `ThemeAwareTypography`
2. Add constants to `typographyThemeConstants`
3. Create a base component that uses these styles
4. Document the new typography patterns

## Common Patterns

### Form Fields

```typescript
// Label
<Label className={typography.form.inputText}>

// Input
<Input className={typography.form.inputText} />

// Error Message
<p className={typography.form.inputError}>

// Helper Text
<p className={typography.mutedColor}>
```

### Text Content

```typescript
// Regular Text
<p className={typography.textColor}>

// Muted Text
<p className={typography.mutedColor}>

// Links
<a className={typography.linkColor}>
```

## Extending the System

1. Identify the new typography need
2. Add appropriate types to `ThemeAwareTypography`
3. Add theme-specific styles to `typographyThemeConstants`
4. Create or update components to use the new styles
5. Document the new additions

## Migration Guide

When migrating existing components to use the typography system:

1. Import the `useThemeAwareTypography` hook
2. Replace hardcoded colors with typography constants
3. Extend base components where possible
4. Test in both light and dark modes
5. Update component documentation

## Typography System Documentation

### Overview

Our typography system is built on three core principles:

1. Theme awareness (light/dark mode support)
2. Component-specific typography
3. Consistent, maintainable styling

### Architecture

#### 1. Core Types (`src/lib/typography/types.ts`)

```typescript
export interface ThemeAwareTypography {
  // Base text styles
  textColor: string;
  mutedColor: string;
  headingColor: string;

  // Interactive elements
  linkColor: string;
  linkHoverColor: string;

  // Form-specific typography
  form: {
    inputText: string;
    inputPlaceholder: string;
    inputDisabled: string;
    inputError: string;
  };
}
```

#### 2. Theme Constants (`src/lib/typography/hooks/use-theme-aware-typography.ts`)

```typescript
export const typographyThemeConstants = {
  dark: {
    textColor: "text-gray-50",
    // ... other dark theme colors
    form: {
      inputText: "text-gray-100",
      inputPlaceholder: "text-gray-400",
      // ... other form colors
    },
  },
  light: {
    // Light theme equivalents
  },
};
```

#### 3. Typography Hook

The `useThemeAwareTypography` hook provides access to theme-aware typography styles:

```typescript
const Component = () => {
  const typography = useThemeAwareTypography();
  return <div className={typography.textColor}>...</div>;
};
```

## Component Integration

### Base Components

Base components like `Input` automatically integrate with the typography system:

```typescript
// src/components/ui/input.tsx
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const typography = useThemeAwareTypography();
    return (
      <input
        className={cn(
          typography.form.inputText,
          `placeholder:${typography.form.inputPlaceholder}`
          // ... other styles
        )}
        {...props}
      />
    );
  }
);
```

### Extended Components

Components that extend base components (like NeumorphicInput) inherit typography styles and can add their own:

```typescript
export function NeumorphicInput({ className, ...props }: NeumorphicInputProps) {
  const typography = useThemeAwareTypography();
  return (
    <Input
      className={cn(
        neumorphicInputVariants(),
        // Base styles are inherited from Input
        className
      )}
      {...props}
    />
  );
}
```

## Best Practices

### 1. Use the Typography Hook

❌ Don't hardcode colors:

```typescript
<div className="text-gray-900">...</div>
```

✅ Do use the typography hook:

```typescript
const typography = useThemeAwareTypography();
<div className={typography.textColor}>...</div>;
```

### 2. Extend Base Components

❌ Don't recreate existing typography logic:

```typescript
<input className="text-gray-900 dark:text-gray-100" />
```

✅ Do extend base components:

```typescript
<Input className={customStyles} />
```

### 3. Component-Specific Typography

When creating new component categories:

1. Add types to `ThemeAwareTypography`
2. Add constants to `typographyThemeConstants`
3. Create a base component that uses these styles
4. Document the new typography patterns

## Common Patterns

### Form Fields

```typescript
// Label
<Label className={typography.form.inputText}>

// Input
<Input className={typography.form.inputText} />

// Error Message
<p className={typography.form.inputError}>

// Helper Text
<p className={typography.mutedColor}>
```

### Text Content

```typescript
// Regular Text
<p className={typography.textColor}>

// Muted Text
<p className={typography.mutedColor}>

// Links
<a className={typography.linkColor}>
```

## Extending the System

1. Identify the new typography need
2. Add appropriate types to `ThemeAwareTypography`
3. Add theme-specific styles to `typographyThemeConstants`
4. Create or update components to use the new styles
5. Document the new additions

## Migration Guide

When migrating existing components to use the typography system:

1. Import the `useThemeAwareTypography` hook
2. Replace hardcoded colors with typography constants
3. Extend base components where possible
4. Test in both light and dark modes
5. Update component documentation
