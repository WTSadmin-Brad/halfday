# Calendar Page Design

## Overview
The calendar page serves as the primary interface for workers to manage their daily work status. The design emphasizes simplicity, beauty, and ease of use while maintaining full offline functionality.

## Core Components

### 1. Main Calendar View
- Full-screen month view with glass morphism effects
- Clean, minimal design focusing on readability
- Each day cell displays:
  - Date number
  - Status overlay (color-coded hue covering the entire cell):
    - Full Day - Green overlay
    - Half Day - Yellow overlay
    - Off Day - Red overlay
- Sync status indicator integrated subtly above calendar

### 2. Bottom Drawer & Status Button
- Drawer Behavior:
  - Default state: Peek view at bottom of screen
  - Expandable up to 75% of screen height
  - Handle positioned on far right side for drag interaction
  - Smooth elevation animation when expanding
  - Contains when expanded:
    - Detailed day information
    - Truck number input
    - Optional notes field
- Floating Action Button (FAB):
  - Always centered horizontally at drawer's top edge
  - Maintains 50% overlap with drawer edge during drawer movement
  - Follows drawer position during drag/slide
  - Glass morphism effect with subtle elevation
  - Status cycling functionality

### 3. Calendar View Adaptation
- Responds to drawer expansion:
  - Full month view when drawer is minimized
  - Smoothly transitions to single-week view as drawer expands
  - Current week row remains visible
  - Other weeks fade/slide out of view
  - Maintains context while focusing on relevant dates

### 4. Status Selection System
- Status FAB Visual Design:
  - Circular glass morphism button
  - Matches exact color scheme of day cells:
    - Full Day - Same green hue as calendar cell
    - Half Day - Same yellow hue as calendar cell
    - Off Day - Same red hue as calendar cell
  - Smooth color transitions between states
  - Frosted glass effect maintains consistency across colors
  - Subtle elevation shadow that follows color changes
- Status FAB behavior (Phase 1):
  - Maintains centered position relative to drawer
  - Tap to cycle through statuses (Green → Yellow → Red)
  - Each status has distinct haptic feedback
  - Visual indicator shows current selection
  - 1.5s pause on any status triggers confirmation
  - Smooth color transition animations between states

### 5. Location Selection Interface
- Triggered after status confirmation
- Status FAB Transformation (Phase 2):
  - Morphs from drawer-centered position
  - Slides and transforms to middle-left screen position
  - Smooth transition from status colors to location icon
- Radial Menu Design:
  - Spans right half of screen in semi-circle (0° to 180°)
  - Central axis at middle-left of screen (where FAB moved to)
  - Each location appears as a glass bubble
  - Locations distributed evenly across the arc
  - Maximum 5-6 location options with comfortable spacing
- Completion Animation:
  - Selected location bubble highlights
  - Other options fade out
  - Radial menu collapses back into FAB
  - FAB smoothly transitions back to drawer-centered position
  - Success ripple effect:
    - Emanates from FAB to selected calendar cell
    - Matches status color with ethereal, translucent quality
    - Subtle wave-like motion that connects the action to the result
    - Gentle fade out as it reaches the cell
  - Returns to status selection mode for next interaction
- Visual Effects:
  - Glass morphism on location bubbles
  - Subtle glow effects on hover/focus
  - Dynamic shadows following bubble positions
  - Backdrop blur behind active menu

## Interaction Flow

1. **Initial Day Selection**
   - User taps a day on the calendar
   - Bottom drawer appears in peek view
   - FAB centered at drawer's top edge

2. **Drawer Interaction**
   - User can drag drawer up to 75% of screen
   - Calendar smoothly transitions to week view
   - FAB maintains position relative to drawer
   - Content scales/adjusts appropriately

3. **Status Selection**
   - User taps FAB to cycle through statuses
   - FAB remains centered on drawer while cycling
   - After 1.5s pause on desired status:
     - Status is confirmed
     - FAB begins transformation

4. **Location Selection**
   - FAB morphs and slides to middle-left screen position
   - Radial menu fans out across right side
   - Drawer remains in current position
   - Selection completes the update flow

5. **Detailed View**
   - User can swipe up drawer for full view
   - Calendar compresses to show only current week
   - All day details and inputs become accessible

## Animation Considerations

1. **Status Cycling**
   - Smooth color transitions between states
   - Subtle scaling effect on button tap
   - Gradual screen dim after confirmation
   - Haptic feedback patterns for each state

2. **Button Morphing**
   - Fluid motion from center to middle-left
   - Smooth icon transition
   - Shape transformation effects
   - Maintains user focus during transition

3. **Location Selection**
   - Radial menu expansion from left anchor point
   - Staggered appearance of location bubbles
   - Glass bubble hover/selection effects
   - Position-based animations for menu items
   - Smooth collapse animation on selection

4. **Drawer Animations**
   - Smooth spring physics for drawer movement
   - Gesture-based interactions for natural feel
   - Subtle parallax effect between calendar and drawer

## Technical Implementation Notes

1. **State Management**
   - Local state for UI interactions
   - Offline-first data management
   - Background sync queue

2. **Component Organization**
   - Separate animation logic into dedicated files
   - Keep UI components modular and reusable
   - Implement proper TypeScript typing

3. **Performance Considerations**
   - Optimize animations for smooth 60fps
   - Efficient DOM updates for calendar rendering
   - Proper handling of gesture interactions

## Accessibility & UX

- Clear visual feedback for all interactions
- Proper contrast ratios for status colors
- Touch targets sized appropriately for mobile
- Keyboard navigation support for desktop use
- Haptic feedback patterns for different actions
- Adequate timeout durations for status selection

## Future Considerations

### Header Bar
- Fixed position at top of screen
- Potential components:
  - Sync status indicator
  - Profile/Settings navigation button
- Note: Implementation pending space evaluation and UX testing of core features

## Open Questions

1. Exact animation timing and curves
2. Specific glass morphism implementation details
3. Error state handling and visual feedback
4. Haptic feedback patterns for different devices
