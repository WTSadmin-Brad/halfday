# Halfday Color System - Aurora Theme

## Brand Colors

Our new color palette is inspired by the aurora borealis, featuring deep night blues, soft pinks, and ethereal periwinkles that create a stunning, modern interface.

### Primary Colors

| Color Name     | Hex Code | RGB           | HSL                 | Usage                                        |
|---------------|----------|---------------|---------------------|----------------------------------------------|
| Night Blue    | #020212  | rgb(2,2,18)   | hsl(240,80%,4%)    | Primary background, dark elements            |
| Aurora Pink   | #F9C8CA  | rgb(249,200,202)| hsl(357,82%,88%)  | Accent elements, highlights                  |
| Royal Blue    | #2D3BAC  | rgb(45,59,172)| hsl(234,59%,43%)   | Primary interactive elements                 |
| Periwinkle    | #95A4DE  | rgb(149,164,222)| hsl(228,52%,73%)  | Secondary elements, subtle accents           |
| Crystal White | #FFFCF7  | rgb(255,252,247)| hsl(40,100%,98%)  | Text, glass card backgrounds                |

## Semantic Usage

### Text Colors
- **Headers & Body**: Crystal White (#FFFCF7) on glass cards
- **Placeholder Text**: Periwinkle (#95A4DE)
- **Links**: Aurora Pink (#F9C8CA)
- **Error Text**: Aurora Pink (#F9C8CA)

### Interactive Elements
- **Primary Buttons**: Royal Blue (#2D3BAC) with glass morphism
- **Secondary Buttons**: Periwinkle (#95A4DE) with glass morphism
- **Disabled States**: Night Blue (#020212) with reduced opacity

### Backgrounds
- **Main Background**: Night Blue (#020212) with aurora effect
- **Card Background**: Crystal White (#FFFCF7) with glass morphism
- **Glass Elements**: Crystal White with varying opacity and blur

## Glass Morphism

Our glass morphism implementation uses these values:
- Background: rgba(255, 252, 247, 0.1)
- Backdrop Filter: blur(16px)
- Border: 1px solid rgba(255, 252, 247, 0.2)

## Accessibility

All color combinations meet WCAG 2.1 Level AA standards:
- Normal text on glass cards (4.5:1)
- Large text (3:1)
- Interactive elements (3:1)

## Implementation

### CSS Variables
```css
:root {
  /* Primary Colors */
  --color-night-blue: 240 80% 4%;
  --color-aurora-pink: 357 82% 88%;
  --color-royal-blue: 234 59% 43%;
  --color-periwinkle: 228 52% 73%;
  --color-crystal-white: 40 100% 98%;
  
  /* Semantic Colors */
  --color-text: var(--color-crystal-white);
  --color-text-muted: var(--color-periwinkle);
  --color-primary: var(--color-royal-blue);
  --color-secondary: var(--color-aurora-pink);
  --color-background: var(--color-night-blue);
}
```

### Tailwind Classes
```typescript
// Example usage in Tailwind classes
text-crystal-white
bg-aurora-pink
text-royal-blue
bg-periwinkle
bg-night-blue
```

## Aurora Effect Colors

The aurora background effect uses combinations of:
- Night Blue (#020212) as the base
- Royal Blue (#2D3BAC) for depth
- Aurora Pink (#F9C8CA) for ethereal highlights
- Periwinkle (#95A4DE) for subtle variations

## Notes

1. **Glass Morphism**: Our glass elements use Crystal White as a base color with careful opacity and blur settings to maintain readability while creating depth.

2. **Gradients**: Aurora effects use carefully orchestrated gradients of our primary colors with varying opacity levels.

3. **Animation Considerations**: 
   - Aurora animations should be subtle and smooth
   - Color transitions should be gentle
   - Reduced motion alternatives available

## Version History

- v2.0.0 (Current) - Aurora theme implementation
- v1.0.0 (Deprecated) - Initial neumorphic color system
