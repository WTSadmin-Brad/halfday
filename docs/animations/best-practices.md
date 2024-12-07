# Animation Best Practices

## General Guidelines

### 1. Performance First

- Keep animations simple and purposeful
- Use `will-change` sparingly
- Prefer opacity and transform properties
- Avoid animating layout properties when possible

### 2. Accessibility

```tsx
// ✅ Good: Respects user preferences
const MyComponent = () => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <AnimateIn
      overrides={{
        duration: prefersReducedMotion ? 0 : 0.3,
      }}
    >
      Content
    </AnimateIn>
  );
};

// ❌ Bad: Forces animation regardless of preferences
const MyComponent = () => (
  <AnimateIn overrides={{ duration: 0.3 }}>Content</AnimateIn>
);
```

### 3. Debugging

```tsx
// Development mode with debug info
<AnimateStagger
  debug={process.env.NODE_ENV === "development"}
  overrides={{
    pattern: {
      type: "wave",
      baseDelay: 0.1,
    },
  }}
>
  {items}
</AnimateStagger>
```

## Common Patterns

### 1. List Animations

```tsx
// ✅ Good: Efficient list animation
<AnimateStagger>
  {items.slice(0, 10).map(item => (
    <AnimateIn key={item.id}>
      {item.content}
    </AnimateIn>
  ))}
</AnimateStagger>

// ❌ Bad: Too many animated items
<AnimateStagger>
  {items.map(item => ( // items could be hundreds
    <AnimateIn key={item.id}>
      {item.content}
    </AnimateIn>
  ))}
</AnimateStagger>
```

### 2. Modal/Dialog Animations

```tsx
// ✅ Good: Smooth entry and exit
<AnimatePresence>
  {isOpen && (
    <AnimateIn variants={fadeInUp} exit={{ opacity: 0, y: 20 }}>
      <Dialog>{content}</Dialog>
    </AnimateIn>
  )}
</AnimatePresence>
```

### 3. Page Transitions

```tsx
// ✅ Good: Simple, effective page transition
const PageWrapper = ({ children }) => (
  <AnimateIn variants={fadeIn} exit={{ opacity: 0 }}>
    {children}
  </AnimateIn>
);
```

## Performance Tips

1. **Batch Animations**

   - Group related animations
   - Use stagger patterns for multiple items
   - Consider lazy loading for long lists

2. **Memory Management**

   - Clean up animation subscriptions
   - Remove listeners when components unmount
   - Use `useCallback` for animation handlers

3. **Testing**
   - Test with reduced motion enabled
   - Verify exit animations work
   - Check performance with React DevTools
