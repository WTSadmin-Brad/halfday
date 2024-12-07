# Halfday Color System - Aurora Theme

## Brand Colors

Our new color palette is inspired by the aurora borealis, featuring deep night blues, soft pinks, and ethereal periwinkles that create a stunning, modern interface.

### Primary Colors

| Color Name     | Hex Code | RGB           | HSL                 | Usage                                        |
|---------------|----------|---------------|---------------------|----------------------------------------------|
| Night Blue    | #020212  | rgb(2,2,18)   | hsl(240,80%,4%)    | Primary background, dark elements            |
| Royal Blue    | #2D3BAC  | rgb(45,59,172)| hsl(234,59%,43%)   | Primary button backgrounds                   |
| Crystal White | #FFFCF7  | rgb(255,252,247)| hsl(40,100%,98%)  | Text, borders, glass effects                |
| Crystal Lavender | #E8C1FF | rgb(232,193,255)| hsl(285,100%,88%) | Interactive highlights, gradients           |
| Aurora Pink   | #F9C8CA  | rgb(249,200,202)| hsl(357,82%,88%)  | Gradient accents, focus states              |
| Periwinkle    | #95A4DE  | rgb(149,164,222)| hsl(228,52%,73%)  | Secondary elements, gradient transitions     |

## Semantic Usage

### Glass Elements
- **Glass Container**:
  - Background: `bg-white/7` (7% white opacity)
  - Border: `border-white/10` (10% white opacity)
  - Top Border: `border-t-white/30` (30% white opacity)
  - Bottom Border: `border-b-black/30` (30% black opacity)
  - Ring: `ring-white/20` (20% white opacity)
  - Blur: `backdrop-blur-[3px]`

- **Glass Button Variants**:
  - Default: `bg-royal-blue/80` with `text-crystal-white`
  - Outline: `bg-glass/10` with `border-glass-border`
  - Ghost: Transparent with `text-crystal-white`
  - Gradient: Custom gradient from Aurora Pink to Royal Blue
  - Link: `text-aurora-pink` with underline animation

- **Glass Input**:
  - Default: `bg-glass/5` with `border-glass-border`
  - Minimal: Transparent with bottom border `border-white/30`
  - Focus: Ring color `ring-aurora-pink/20`
  - Placeholder: `text-white/50` (50% white opacity)
  - Text: `text-white/90` (90% white opacity)

### Interactive States
- **Button Hover States**:
  - Default: `bg-royal-blue/90` (90% opacity)
  - Outline: `bg-glass/20` (20% opacity)
  - Ghost: `bg-glass/10` (10% opacity)
  - Gradient: Custom hover animation with opacity change

- **Input Focus States**:
  - Ring: `ring-aurora-pink/20` (20% opacity)
  - Border: Gradient from Aurora Pink to Royal Blue
  - Minimal: `border-white/50` (50% opacity)

### Text Colors
- **Primary Text**: `text-crystal-white` (90-100% opacity)
- **Secondary Text**: `text-white/50` (50% opacity)
- **Interactive Text**: `text-aurora-pink` for links
- **Error Text**: `text-aurora-pink` for error states

## Glass Morphism Implementation

```css
/* Glass Container Base */
.glass-container {
  @apply bg-white/7
         backdrop-blur-[3px]
         border border-white/10
         ring-1 ring-white/20
         shadow-[inset_0_0_1px_rgba(255,255,255,0.15)];
}

/* Glass Button Base */
.glass-button {
  @apply bg-royal-blue/80
         backdrop-blur-glass
         text-crystal-white
         hover:bg-royal-blue/90;
}

/* Glass Input Base */
.glass-input {
  @apply bg-glass/5
         border-glass-border
         text-white/90
         placeholder:text-white/50;
}
```

## Aurora Effect Implementation

Our aurora background combines:
- Night Blue base: `#020212`
- Gradient overlays using:
  - Royal Blue: `#2D3BAC`
  - Aurora Pink: `#F9C8CA`
  - Crystal Lavender: `#E8C1FF`
  - Periwinkle: `#95A4DE`

## CSS Variables

```css
:root {
  /* Base Colors */
  --color-night-blue: 240 80% 4%;
  --color-royal-blue: 234 59% 43%;
  --color-crystal-white: 40 100% 98%;
  --color-crystal-lavender: 285 100% 88%;
  --color-aurora-pink: 357 82% 88%;
  --color-periwinkle: 228 52% 73%;
  
  /* Glass Effects */
  --glass-background: rgba(255, 255, 255, 0.07);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-hover: rgba(255, 255, 255, 0.2);
  --glass-blur: 3px;
}
```

## Version History

- v2.1.0 (Current) - Crystal Lavender adoption and Aurora Pink deprecation
- v2.0.0 (Deprecated) - Aurora theme implementation
- v1.0.0 (Deprecated) - Initial neumorphic color system
