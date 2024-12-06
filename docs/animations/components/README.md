# Animation Components

## Core Components

### AnimateIn
A versatile component for single-element animations. [Learn more](./AnimateIn.md)

```tsx
<AnimateIn
  as="div"
  variants={fadeInUp}
  overrides={{ duration: 0.5 }}
>
  Content
</AnimateIn>
```

### AnimateStagger
Handles staggered animations for multiple elements. [Learn more](./AnimateStagger.md)

```tsx
<AnimateStagger
  overrides={{
    pattern: {
      type: 'wave',
      baseDelay: 0.1
    }
  }}
>
  {items.map(item => (
    <div key={item.id}>{item.content}</div>
  ))}
</AnimateStagger>
```

## Available Patterns

### Linear
- Even spacing between animations
- Best for simple lists

### Wave
- Sinusoidal pattern
- Great for circular or curved layouts

### Bounce
- Elements appear with spring effect
- Adds playful, dynamic feel

### Exponential
- Increasing or decreasing delays
- Good for emphasizing sequence

### EaseIn/EaseOut
- Smooth acceleration/deceleration
- Natural-feeling sequences

## Best Practices

1. **Performance**
   - Use `AnimatePresence` for exit animations
   - Keep animations simple for large lists
   - Consider lazy loading for long sequences

2. **Accessibility**
   - Always provide static fallbacks
   - Test with reduced motion enabled
   - Avoid excessive animation durations

3. **Debugging**
   - Use the debug prop in development
   - Check animation timing in DevTools
   - Monitor performance impact
