/**
 * ProfileContainer Component
 *
 * A reusable container component that implements our neumorphic design system
 * with glass-morphism effects. Supports both elevated and inset states.
 *
 * Props:
 * @param {ReactNode} children - Container content
 * @param {boolean} elevated - Controls elevation state (default: false)
 * @param {string} className - Additional CSS classes
 *
 * Usage:
 * ```tsx
 * <ProfileContainer elevated>
 *   <h2>Section Title</h2>
 *   <p>Content goes here</p>
 * </ProfileContainer>
 * ```
 */

import React from "react";

interface ProfileContainerProps {
  children: React.ReactNode;
  elevated?: boolean;
  className?: string;
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({
  children,
  elevated = false,
  className = "",
}) => {
  // Base styles for consistent container appearance
  const baseStyles = "rounded-2xl transition-all duration-300";

  // Dynamic styles based on elevation state
  const elevationStyles = elevated
    ? "bg-white bg-opacity-10 backdrop-blur-lg shadow-lg" // Elevated state
    : "bg-white bg-opacity-5 backdrop-blur-lg shadow-inner"; // Inset state

  return (
    <div className={`${baseStyles} ${elevationStyles} ${className}`}>
      {children}
    </div>
  );
};

export default ProfileContainer;
