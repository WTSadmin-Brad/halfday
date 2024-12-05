# Authentication Pages - Neumorphic Design System

## Core Elements & Implementation

### Surface Treatment
- Soft, matte gray base (#F0F0F3)
- Subtle, almost invisible grain texture
- Appears as one piece of molded material
- Gentle ambient light gradient around edges
- Every element feels carved from the same surface

### Input Fields
1. **Text Inputs**
   - Gently pressed into the surface
   - Rounded corners (16px)
   - Inner shadow suggesting depth
   - Subtle highlight on top edge
   - Cyan glow accent when focused
   - Appears as if finger could run along the depression

2. **Implementation Example**
```css
.input-field {
  background: #F0F0F3;
  border-radius: 16px;
  box-shadow: 
    inset 2px 2px 5px rgba(174, 174, 192, 0.4),
    inset -2px -2px 5px rgba(255, 255, 255, 0.7);
  padding: 16px;
  transition: all 0.3s ease;
}

.input-field:focus {
  box-shadow: 
    inset 2px 2px 5px rgba(174, 174, 192, 0.4),
    inset -2px -2px 5px rgba(255, 255, 255, 0.7),
    0 0 10px rgba(0, 240, 255, 0.2);
}
```

### Primary Action Buttons
1. **Design**
   - Significantly raised from surface
   - Clear shadow showing elevation
   - Soft, pillowy appearance
   - Satisfying press animation
   - Cyan accent glow on hover
   - Clear "clickable" affordance

2. **States**
   - Default: Raised with defined shadows
   - Hover: Slight elevation increase, gentle glow
   - Active: Pressed in, reversed shadows
   - Disabled: Flattened, reduced shadows

3. **Example: "Sign In" Button**
```css
.primary-button {
  background: #F0F0F3;
  border-radius: 12px;
  padding: 16px 32px;
  box-shadow: 
    8px 8px 16px rgba(174, 174, 192, 0.4),
    -8px -8px 16px rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
}

.primary-button:hover {
  box-shadow: 
    10px 10px 20px rgba(174, 174, 192, 0.5),
    -10px -10px 20px rgba(255, 255, 255, 0.8);
}

.primary-button:active {
  box-shadow: 
    inset 8px 8px 16px rgba(174, 174, 192, 0.4),
    inset -8px -8px 16px rgba(255, 255, 255, 0.7);
}
```

### Secondary Elements
1. **Links (e.g., "Forgot Password?")**
   - Subtle elevation
   - Smaller shadow depth
   - Gentle hover state
   - Maintains soft appearance
   - Optional small icon integration

2. **Checkboxes ("Remember Me")**
   - Small, raised squares
   - Satisfying press animation
   - Check mark appears with gentle animation
   - Maintains consistent shadow style

### Layout Examples

1. **Login Form**
```tsx
<div className="auth-container">
  <form className="neumorphic-form">
    {/* Raised card containing form */}
    <div className="form-content">
      {/* Title with subtle shadow */}
      <h1>Welcome Back</h1>
      
      {/* Inset input fields */}
      <input type="email" className="input-field" />
      <input type="password" className="input-field" />
      
      {/* Raised checkbox row */}
      <div className="remember-me">
        <input type="checkbox" />
        <label>Remember me</label>
      </div>
      
      {/* Primary action button */}
      <button className="primary-button">
        Sign In
      </button>
      
      {/* Subtle secondary links */}
      <div className="secondary-actions">
        <a href="/forgot-password">Forgot Password?</a>
        <a href="/register">Create Account</a>
      </div>
    </div>
  </form>
</div>
```

2. **Password Reset Form**
- Single, focused input
- Clear instruction text
- Prominent action button
- Back to login link
- Status messages inset into surface

3. **Registration Form**
- Stepped progress indicator
- Grouped form sections
- Validation states with color accents
- Terms acceptance checkbox
- Clear next/back navigation

### Animation Guidelines
1. **Button Interactions**
   - Press: 200ms transition
   - Release: 300ms with spring
   - Hover: 150ms ease
   - Focus: 200ms with slight glow

2. **Form Transitions**
   - Field focus: 200ms ease
   - Error states: 300ms ease
   - Success feedback: 400ms with spring
   - Page transitions: 500ms with fade

### Tips for Implementation
1. **Maintain Consistency**
   - Use same shadow values throughout
   - Keep light source direction consistent
   - Match radius values
   - Use consistent spacing
   - Maintain animation timings

2. **Accessibility**
   - High contrast for text
   - Clear focus states
   - Adequate touch targets
   - Keyboard navigation
   - Screen reader support

3. **Responsive Behavior**
   - Scale shadow values on mobile
   - Adjust padding for touch
   - Maintain proportions
   - Consider thumb zones
   - Optimize for different devices

This design system creates a modern, tactile interface that feels physical and satisfying while maintaining professionalism and clarity for authentication flows.