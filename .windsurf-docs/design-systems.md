# Halfday App Design Systems

## Glassmorphic Design

Used in authentication pages and calendar interface.

### Key Characteristics

- Transparent backgrounds with blur effects
- Subtle borders
- Light shadow effects
- Clean, modern aesthetic

### Base Classes

```tsx
const glassBase = "bg-white/[0.03] backdrop-blur-md border-white/[0.05]";
const glassCard = "rounded-lg shadow-lg shadow-black/5";
```

## Neumorphic Design

Used in profile and admin interfaces.

### Key Characteristics

- Soft, extruded appearance
- Light and shadow play
- Subtle gradients
- Clean, minimal interface

### Base Classes

```tsx
const neumorphicBase =
  "bg-[#E0E5EC] shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff]";
const neumorphicCard = "rounded-xl";
```

## Usage Guidelines

### Glassmorphic Pages

- Authentication (/app/(auth)/\*)
- Calendar (/app/(worker)/calendar)

### Neumorphic Pages

- Profile & Settings (/app/(worker)/profile)
  - Single page with both profile info and settings sections
  - Uses neumorphic design for all components
- Admin Dashboard (/app/(admin)/\*)

## Component Templates

See `.windsurf-templates/` for component templates following each design system.
