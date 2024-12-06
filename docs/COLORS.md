# Halfday Color System

## Brand Colors

Our color palette is designed to create a professional, modern, and accessible interface that reflects our brand values.

### Primary Colors

| Color Name     | Hex Code | RGB           | HSL                 | Usage                                        |
|---------------|----------|---------------|---------------------|----------------------------------------------|
| Gunmetal      | #232C33  | rgb(35,44,51) | hsl(206,19%,17%)   | Primary text, headings, logo                 |
| Sage Green    | #638475  | rgb(99,132,117)| hsl(153,14%,45%)   | Accent elements, success states              |
| Orange Web    | #FCA311  | rgb(252,163,17)| hsl(37,97%,53%)    | Call-to-action buttons, important highlights |

### Neutral Colors

| Color Name     | Hex Code | RGB           | HSL                 | Usage                                        |
|---------------|----------|---------------|---------------------|----------------------------------------------|
| Light Gray    | #D8DBE2  | rgb(216,219,226)| hsl(225,13%,87%)  | Input placeholders, disabled states          |
| Anti-flash White| #EFF1F3 | rgb(239,241,243)| hsl(220,13%,95%)  | Background, neumorphic surfaces             |

## Semantic Usage

### Text Colors
- **Headers & Body**: Gunmetal (#232C33)
- **Placeholder Text**: Light Gray (#D8DBE2)
- **Links**: Orange Web (#FCA311)
- **Error Text**: Orange Web (#FCA311)

### Interactive Elements
- **Primary Buttons**: Anti-flash White (#EFF1F3) with neumorphic styling
- **Secondary Buttons**: Anti-flash White (#EFF1F3) with neumorphic styling
- **Disabled States**: Light Gray (#D8DBE2)

### Backgrounds
- **Main Background**: Anti-flash White (#EFF1F3)
- **Card Background**: Anti-flash White (#EFF1F3)
- **Neumorphic Elements**: Anti-flash White (#EFF1F3) with shadow manipulation

## Accessibility

All color combinations in our system meet WCAG 2.1 Level AA standards for contrast ratios:
- Normal text (4.5:1)
- Large text (3:1)
- Interactive elements (3:1)

## Implementation

### CSS Variables
```css
:root {
  /* Primary Colors */
  --color-gunmetal: 206 19% 17%;
  --color-sage: 153 14% 45%;
  --color-orange: 37 97% 53%;
  
  /* Neutral Colors */
  --color-light-gray: 225 13% 87%;
  --color-white: 220 13% 95%;
  
  /* Semantic Colors */
  --color-text: var(--color-gunmetal);
  --color-text-muted: var(--color-light-gray);
  --color-primary: var(--color-orange);
  --color-secondary: var(--color-sage);
  --color-background: var(--color-white);
}
```

### Tailwind Classes
```typescript
// Example usage in Tailwind classes
text-gunmetal
bg-orange
text-sage
bg-light-gray
bg-white
```

## Dark Mode Considerations

Dark mode color mappings will be defined in a future update. The current focus is on establishing and implementing the light theme.

## Notes

1. **Neumorphic Design**: Our neumorphic elements use the Anti-flash White (#EFF1F3) as a base color, with shadows created using light and dark variations of this color.

2. **Gradients**: When gradients are needed, they should be created using variations of our primary colors, maintaining the same hue but adjusting saturation and lightness.

3. **Future Considerations**: 
   - Define dark mode color palette
   - Add success/warning/error state colors
   - Consider adding tertiary colors for data visualization

## Version History

- v1.0.0 (Current) - Initial color system implementation
