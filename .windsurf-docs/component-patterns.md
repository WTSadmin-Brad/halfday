# Component Patterns

## Page Components

### Basic Structure

```tsx
import { Metadata } from "next";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page Title | Halfday",
  description: "Page description",
};

export default function PageName() {
  return (
    // Design system container (glassmorphic or neumorphic)
    <main className={designSystem.container}>{/* Page content */}</main>
  );
}
```

## Profile Page Structure

### Combined Profile & Settings Page

```tsx
export default function ProfilePage() {
  return (
    <main className={neumorphicStyles.container}>
      {/* Profile Info Section */}
      <section className={neumorphicStyles.section}>
        <ProfileInfoSection />
      </section>

      {/* Settings Section */}
      <section className={neumorphicStyles.section}>
        <SettingsSection />
      </section>
    </main>
  );
}
```

## Feature Components

### Container Components

- Handle data fetching and state management
- Provide context to child components
- Manage offline synchronization

### Presentation Components

- Focus on UI rendering
- Accept props for data and callbacks
- Implement appropriate design system

## Design System Integration

### Glassmorphic Components

Used in auth and calendar features:

```tsx
<div className="bg-white/[0.03] backdrop-blur-md border-white/[0.05] rounded-lg shadow-lg shadow-black/5">
  {/* Component content */}
</div>
```

### Neumorphic Components

Used in profile and admin features:

```tsx
<div className="bg-[#E0E5EC] shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] rounded-xl">
  {/* Component content */}
</div>
```
