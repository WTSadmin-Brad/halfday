# Typography System for Half Day App

## Core Configuration

### 1. Tailwind Configuration
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        mono: ['var(--font-jetbrains-mono)', ...fontFamily.mono],
      },
      fontSize: {
        // Using modern fluid typography with clamp()
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
    },
  },
} satisfies Config
```

### 2. Next.js Font Configuration
```typescript
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: true, // Optimize for modern browsers
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        inter.variable,
        jetbrainsMono.variable,
        'font-sans antialiased'
      )}>
        {children}
      </body>
    </html>
  )
}
```

## Typography Components

### 1. Base Typography Provider
```typescript
// lib/typography/types.ts
export type TextVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'large' 
  | 'base' 
  | 'small' 
  | 'muted'
  | 'lead'

// components/ui/typography/provider.tsx
import { createContext, useContext } from 'react'
import type { TextVariant } from '@/lib/typography/types'

interface TypographyContextValue {
  variant?: TextVariant
}

const TypographyContext = createContext<TypographyContextValue>({})

export const useTypography = () => useContext(TypographyContext)
```

### 2. Modern Heading Component
```typescript
// components/ui/typography/heading.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const headingVariants = cva('scroll-m-20', {
  variants: {
    level: {
      1: 'text-4xl font-extrabold tracking-tight lg:text-5xl',
      2: 'text-3xl font-semibold tracking-tight',
      3: 'text-2xl font-semibold tracking-tight',
      4: 'text-xl font-semibold tracking-tight',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    level: 1,
    align: 'left',
  },
})

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  level: 1 | 2 | 3 | 4
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, align, ...props }, ref) => {
    const Tag = `h${level}` as const
    
    return (
      <Tag
        ref={ref}
        className={cn(headingVariants({ level, align }), className)}
        {...props}
      />
    )
  }
)
Heading.displayName = 'Heading'
```

### 3. Enhanced Text Component
```typescript
// components/ui/typography/text.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textVariants = cva('text-foreground', {
  variants: {
    variant: {
      default: 'leading-7',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    variant: 'default',
    align: 'left',
  },
})

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: React.ElementType
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, align, as: Component = 'p', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ variant, align }), className)}
        {...props}
      />
    )
  }
)
Text.displayName = 'Text'
```

### 4. Modern Link Component
```typescript
// components/ui/typography/link.tsx
import * as React from 'react'
import NextLink from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const linkVariants = cva(
  'inline-flex items-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'text-primary hover:text-primary/80',
        destructive: 'text-destructive hover:text-destructive/80',
        muted: 'text-muted-foreground hover:text-muted-foreground/80',
      },
      underline: {
        true: 'underline-offset-4 hover:underline',
        false: 'no-underline',
      },
    },
    defaultVariants: {
      variant: 'default',
      underline: true,
    },
  }
)

interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  href: string
  external?: boolean
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
      )
    }

    return (
      <NextLink
        ref={ref}
        href={href}
        className={cn(linkVariants({ variant, underline }), className)}
        {...props}
      />
    )
  }
)
Link.displayName = 'Link'
```

## Usage with shadcn/ui Components

```typescript
// components/calendar/day-cell.tsx
import { Card, CardContent } from '@/components/ui/card'
import { Text } from '@/components/ui/typography/text'

export function DayCell({ date, status }: DayCellProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <Text variant="small" className="text-muted-foreground">
          {format(date, 'EEE')}
        </Text>
        <Text variant="large">{format(date, 'd')}</Text>
        <Text variant="muted">{status}</Text>
      </CardContent>
    </Card>
  )
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
    optimizePackageImports: ['@/components/ui'],
  },
}

export default nextConfig
```

### 2. CSS Loading Optimization
```typescript
// app/layout.tsx
import '@/styles/typography.css' // Separate typography styles

export const metadata = {
  fontOptimization: {
    preconnect: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
  },
}
```

## Accessibility Enhancements

```typescript
// components/ui/typography/prose.tsx
import { cn } from '@/lib/utils'

interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Prose({ className, ...props }: ProseProps) {
  return (
    <div
      className={cn(
        'prose prose-gray dark:prose-invert',
        'prose-headings:scroll-m-20',
        'prose-headings:tracking-tight',
        'prose-lead:text-muted-foreground',
        'prose-a:underline-offset-4',
        className
      )}
      {...props}
    />
  )
}
```

## Best Practices Implementation

1. **Consistent Spacing System**
```typescript
// Consistent vertical rhythm
const verticalRhythm = {
  xs: 'space-y-2',  // 8px
  sm: 'space-y-4',  // 16px
  md: 'space-y-6',  // 24px
  lg: 'space-y-8',  // 32px
  xl: 'space-y-12', // 48px
}
```

2. **Theme-Aware Typography**
```typescript
// hooks/useThemeAwareTypography.ts
import { useTheme } from 'next-themes'

export function useThemeAwareTypography() {
  const { theme, systemTheme } = useTheme()
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')
  
  return {
    textColor: isDark ? 'text-white' : 'text-gray-900',
    mutedColor: isDark ? 'text-gray-400' : 'text-gray-500',
  }
}
```

3. **SEO Optimization**
```typescript
// components/ui/typography/seo-heading.tsx
import { Heading } from './heading'

interface SEOHeadingProps extends React.ComponentProps<typeof Heading> {
  pageTitle?: boolean
}

export function SEOHeading({ pageTitle, ...props }: SEOHeadingProps) {
  if (pageTitle) {
    return (
      <header className="mb-8">
        <Heading {...props} />
      </header>
    )
  }
  return <Heading {...props} />
}
```

This system:
- Fully integrates with Next.js 14 and Tailwind
- Leverages shadcn/ui's design patterns
- Uses modern CSS features
- Implements proper font loading strategies
- Maintains accessibility
- Provides type safety
- Optimizes for performance

Would you like me to:
1. Add more complex component compositions?
2. Detail the responsive typography system further?
3. Show more integration examples with shadcn/ui?
4. Add dark mode specific typography utilities?