# Half Day App - Project Overview

## Project Purpose and Goals

The Half Day App is a Progressive Web App designed to streamline work schedule tracking for a company with 30-50 workers. The system serves two distinct user groups with different needs:

Workers need a simple, mobile-friendly interface to record their daily work status (Full Day, Half Day, or Off Day), along with associated information like truck numbers and locations. The interface must work offline and sync when connectivity is restored.

Administrators (primarily the owner's wife) need a comprehensive dashboard to manage worker schedules, generate reports, and process payroll information. The admin interface is optimized for desktop use and provides powerful data management tools.

## Core Architecture Requirements

### Progressive Web App (PWA) Implementation

The application must function as a true PWA, with:

- Complete offline functionality through service workers
- Local data storage with background synchronization
- "Install" capability for home screen access
- Automatic updates without requiring app store submissions

### Technical Stack

- Frontend: Next.js 14 with App Router
- Authentication: Firebase Authentication
- Database: Firestore
- Hosting: Firebase Hosting
- UI Components: shadcn/ui with Tailwind CSS

### Offline-First Architecture

All user interactions must work offline by default:

- Local storage of calendar data using IndexedDB
- Background sync queue for status changes
- Clear sync status indicators (synced, pending, failed)
- Conflict resolution with server timestamp

## Essential Features

### Worker Interface

The worker experience prioritizes simplicity and speed through a streamlined calendar interface:

The main calendar view presents a full-screen month view with a clean, minimal design using glass morphism effects. Users can select a day, and instead of switching views, a bottom drawer smoothly peeks up from the bottom of the screen. This (peek view) drawer has a button at the top middle that will quickly change the day's status. After the status is selected, the screen goes dark except to focus on a new button (location). They will click that floating action button to reveal a list of locations to choose from. The bottom drawer can be slid up and contains the selected day's detailed information while compressing the calendar to only that row of days. The drawer includes:

- Status selection (Full Day - Green, Half Day - Yellow, Off Day - Red)
- Required fields for truck number and location
- Optional notes field
- Clear sync status indicators

This interaction pattern maintains context while providing detailed access to daily information, all while supporting complete offline functionality. The design is consistent across devices, though the drawer position may adapt for desktop layouts.

### Admin Interface

The admin dashboard emphasizes comprehensive oversight and data management:

- Complete view of all worker schedules
- Excel export functionality with custom date ranges
- Payroll processing and locking capabilities
- Worker, truck, and location management
- Simple analytics and attendance patterns

## Development Guidelines

### Project Structure

Follow the established directory structure:

- /app - Next.js app router and page components
- /components - Reusable UI components
- /features - Core feature logic
- /lib - Utilities and configurations
- /types - TypeScript definitions

### Code Organization Rules

1. Keep components focused and single-purpose
2. Implement proper TypeScript typing
3. Maintain clear separation between UI and business logic
4. Follow the offline-first approach in all features

### Critical Design Requirements

The interface must implement:

- Glass morphism and Neumorphism effects for modern aesthetics
- Smooth animations for user interactions
- Responsive design that works on all devices
- Clear visual feedback for all actions

### State Management Requirements

- Local state for UI interactions
- Global state for user authentication
- Offline state management with sync queue
- Clear status indicators for data synchronization

## Security and Data Integrity

### Authentication and Authorization

- Email/password authentication using Firebase
- Role-based access control (Worker vs Admin)
- Secure session management
- Automatic lockout after payroll processing

### Data Protection

- Historical data becomes view-only after processing
- Audit trail for all changes
- Secure data synchronization
- Firebase Security Rules implementation

## Performance Requirements

### Critical Metrics

- Initial load under 3 seconds
- Offline functionality immediate after first load
- Smooth animations (60 fps)
- Instant status updates even offline

### Data Management

- Efficient local storage management
- Background sync optimization
- Batch updates for efficiency
- Clear error handling and recovery

## Development Priorities

### Phase 1 (MVP)

1. Core authentication system
2. Basic calendar functionality
3. Status change capabilities
4. Simple admin view
5. Essential export features

### Subsequent Phases

1. Enhanced offline capabilities
2. Advanced admin features
3. Detailed analytics
4. Push notifications
5. Performance optimizations

## AI IDE Guidelines

When assisting with development:

1. Always verify offline functionality in new features
2. Ensure proper TypeScript typing
3. Follow established project structure
4. Implement error handling for network issues
5. Maintain clear documentation
6. Consider both worker and admin perspectives
7. Prioritize performance and user experience
8. Follow glassmorphism design patterns in Calendar and Neumorphism elsewhere

The AI IDE should focus on creating maintainable, performant code that follows these established patterns and requirements. Each new feature or component should be evaluated against these core requirements, particularly regarding offline functionality and sync capabilities.

## Conclusion

This project requires careful attention to offline capabilities, sync status, and user experience. The AI IDE should maintain a balance between the simplicity needed for workers and the comprehensive functionality required by administrators. All features must be developed with the offline-first approach as a fundamental requirement.

Updates to this overview should be made as the project evolves and new requirements are established. Technical specifications and detailed design requirements will be provided in separate documents as needed.