# Authentication Components Architecture

## Core Structure

```plaintext
src/
├── components/
│   ├── ui/               # Base shadcn/ui components
│   │   ├── button.tsx    # Base button component
│   │   └── input.tsx     # Base input component
│   │
│   ├── auth/            # Auth-specific components
│   │   ├── styles/      # Shared auth styles
│   │   │   ├── neumorphic.css     # Neumorphic style definitions
│   │   │   └── animations.css      # Shared animations
│   │   │
│   │   ├── elements/    # Reusable auth elements
│   │   │   ├── neumorphic-button.tsx   # Styled button
│   │   │   ├── neumorphic-input.tsx    # Styled input
│   │   │   └── neumorphic-card.tsx     # Container card
│   │   │
│   │   ├── forms/       # Auth form components
│   │   │   ├── login-form.tsx
│   │   │   ├── register-form.tsx
│   │   │   └── reset-password-form.tsx
│   │   │
│   │   └── shared/      # Shared auth components
│   │       ├── auth-header.tsx
│   │       ├── auth-footer.tsx
│   │       └── form-wrapper.tsx
│   │
│   └── shared/          # Global shared components
│       └── loading.tsx  # Loading states

├── app/
│   └── (auth)/          # Auth route group
│       ├── login/
│       │   └── page.tsx      # Uses components from auth/
│       ├── register/
│       │   └── page.tsx
│       └── layout.tsx   # Shared auth layout

└── lib/
    ├── styles/          # Global styles
    │   └── neumorphic.ts   # Reusable style utilities
    │
    └── utils/
        └── animations.ts    # Animation utilities
```

## Component Organization Strategy

1. **Base UI Components** (`components/ui/`)
   - Houses our shadcn/ui base components
   - These are the foundation for our styled components

2. **Auth-Specific Components** (`components/auth/`)
   - Contains all authentication-related components
   - Organized by purpose (elements, forms, shared)
   - Keeps auth styling scoped and maintainable

3. **Shared Styles** (`components/auth/styles/`)
   - Centralized location for neumorphic styling
   - Reusable CSS/utility classes
   - Animation definitions

4. **Implementation Example**

```tsx
// components/auth/elements/neumorphic-button.tsx
import { Button } from "@/components/ui/button"
import styles from "../styles/neumorphic.css"

export const NeumorphicButton = ({
  children,
  ...props
}) => {
  return (
    <Button 
      className={styles.neumorphicButton}
      {...props}
    >
      {children}
    </Button>
  )
}

// components/auth/forms/login-form.tsx
import { NeumorphicButton } from "../elements/neumorphic-button"
import { NeumorphicInput } from "../elements/neumorphic-input"
import { NeumorphicCard } from "../elements/neumorphic-card"

export const LoginForm = () => {
  return (
    <NeumorphicCard>
      <form>
        <NeumorphicInput type="email" />
        <NeumorphicInput type="password" />
        <NeumorphicButton>Sign In</NeumorphicButton>
      </form>
    </NeumorphicCard>
  )
}

// app/(auth)/login/page.tsx
import { LoginForm } from "@/components/auth/forms/login-form"

export default function LoginPage() {
  return (
    <div className="auth-container">
      <LoginForm />
    </div>
  )
}
```

## Benefits of This Structure

1. **Maintainability**
   - Clear separation of concerns
   - Easy to find and update components
   - Scoped styling prevents conflicts

2. **Reusability**
   - Shared elements easily imported
   - Consistent styling across auth pages
   - DRY principle maintained

3. **Scalability**
   - Easy to add new auth features
   - Clear place for new components
   - Maintains clean architecture

4. **Development Workflow**
   - Clear component boundaries
   - Easy to work on isolated features
   - Simple to manage dependencies