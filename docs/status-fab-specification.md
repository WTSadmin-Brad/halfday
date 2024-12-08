# StatusFAB Specification

## Core Requirements

### 1. Positions and Transitions

#### Location 1 (Status Mode)
- Active during phases: 'none', 'status', 'charging'
- Position: Centered horizontally in the viewport, overlapping the top edge of the drawer by 50%
- Sticky behavior: Should move up with the drawer when expanded
- Distance from drawer: Overlapping the top edge of the drawer by 50%
- Z-index: Should appear above everything, including the drawer

#### Location 2 (Location Selection Mode)
- Active during phases: 'location', 'selecting'
- Position: Left edge of the calendar, vertically centered in viewport
- Distance from calendar: 40px from the left edge
- Should maintain position when window resizes

### 2. Animations

#### Status Selection Animation
- Smooth color transition based on selected status
- Subtle scale animation on hover
- Glassmorphic effect maintained throughout

#### Location Transition Animation
1. Shrink effect (pinpoint)
2. Movement to new position
3. Expand back to normal size
4. Icon swap animation

## Phase-Based Positioning

#### Status Mode (Location 1)
- Uses drawer as position reference ONLY during status-related phases
- Position calculated relative to drawer's top edge
- Maintains 50% overlap with drawer
- Moves with drawer when expanded/collapsed
- Phases: 'none', 'status', 'charging'

#### Location Selection Mode (Location 2)
- Completely disconnects from drawer positioning
- Uses calendar container as sole position reference
- Position calculated from calendar's left edge
- Vertically centered relative to viewport
- Phases: 'location', 'selecting'

## Technical Implementation

### 1. Positioning Strategy

```tsx
interface PositionState {
  // Location 1: Status Mode positioning
  statusMode: {
    bottom: number;
    left: '50%';
    transform: 'translateX(-50%)';
  };
  
  // Location 2: Location Selection Mode positioning
  locationMode: {
    top: '50%';
    left: number;
    transform: 'translateY(-50%)';
  };
}

// Component implementation
const StatusFAB = ({ drawerRef, calendarRef, isDrawerExpanded }) => {
  // Track which positioning system to use based on phase
  const [currentMode, setCurrentMode] = useState<'status' | 'location'>('status');
  
  // Position calculations are completely separate
  const statusPosition = useCallback(() => {
    if (phase === 'location' || phase === 'selecting') return null;
    const drawerRect = drawerRef.current?.getBoundingClientRect();
    return drawerRect ? {
      bottom: window.innerHeight - drawerRect.top + 40, // 40px for 50% overlap
      left: '50%',
      transform: 'translateX(-50%)'
    } : null;
  }, [phase]);

  const locationPosition = useCallback(() => {
    if (phase !== 'location' && phase !== 'selecting') return null;
    const calendarRect = calendarRef.current?.getBoundingClientRect();
    return calendarRect ? {
      top: '50%',
      left: calendarRect.left + 40, // 40px from left edge
      transform: 'translateY(-50%)'
    } : null;
  }, [phase]);

  // Phase change handler
  useEffect(() => {
    setCurrentMode(
      phase === 'location' || phase === 'selecting' ? 'location' : 'status'
    );
  }, [phase]);

  return (
    <motion.div
      layout
      style={{
        position: 'fixed',
        zIndex: 9999,
        ...(currentMode === 'status' ? statusPosition() : locationPosition())
      }}
      animate={{
        scale: isPinpoint ? 0.2 : 1,
        opacity: isMoving ? 0.8 : 1
      }}
      transition={{
        layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        scale: { duration: 0.3, ease: "easeInOut" }
      }}
    >
      {/* FAB content */}
    </motion.div>
  );
};
```

### 2. Position Update Strategy

1. **Status Mode Updates (Location 1)**
   - Only calculate drawer-relative position during status-related phases
   - Use ResizeObserver to track drawer movement
   - Ignore drawer movements when in location selection mode

2. **Location Selection Mode Updates (Location 2)**
   - Only calculate calendar-relative position during location-related phases
   - Use window resize events to maintain calendar edge position
   - Completely ignore drawer position

3. **Mode Transitions**
   - Clear previous position calculations when switching modes
   - Calculate new position before animation begins
   - Use Framer Motion's layout animation for smooth transition

## Implementation Steps

1. **Reset Current Implementation**
   - Remove all mixed positioning methods
   - Clear out conflicting animation systems

2. **Build Foundation**
   - Implement base container with fixed positioning
   - Add explicit dimensions and z-index

3. **Add Location 1 Positioning**
   - Implement drawer-relative positioning
   - Add sticky behavior with drawer expansion

4. **Add Location 2 Positioning**
   - Implement calendar-relative positioning
   - Add viewport centering

5. **Implement Animations**
   - Add Framer Motion layout animations
   - Implement status transitions
   - Add pinpoint effect

## Testing Criteria

1. **Position Tests**
   - FAB stays centered above drawer in Location 1
   - FAB moves correctly with drawer expansion
   - FAB positions correctly at calendar edge in Location 2
   - Positions maintain correctness after window resize

2. **Animation Tests**
   - Smooth transition between locations
   - Correct timing of pinpoint effect
   - Proper icon swap animation
   - No position flickering during transitions

3. **Style Tests**
   - Glassmorphic effect maintains quality
   - No style conflicts during animations
   - Proper z-index layering
