/**
 * ProfileHeader Component
 *
 * A transforming header that responds to scroll position.
 * Features a glass-morphism effect and smooth transitions.
 *
 * Features:
 * - Scroll-based transformation
 * - Mini profile fade-in
 * - Backdrop blur effects
 * - Smooth transitions
 */

import React from "react";
import { Camera } from "lucide-react";
import useHeaderTransform from "./animations/useHeaderTransform";

interface ProfileHeaderProps {
  userName: string;
  userInitials: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userName,
  userInitials,
}) => {
  const { isCompact, showMiniProfile, headerStyles } = useHeaderTransform();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={headerStyles}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Mini Profile - Appears on Scroll */}
        <div
          className={`
          flex items-center space-x-3 transition-opacity duration-300
          ${showMiniProfile ? "opacity-100" : "opacity-0"}
        `}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-sm text-white">{userInitials}</span>
          </div>
          <span className="text-white font-medium">{userName}</span>
        </div>

        {/* Calendar Button */}
        <button
          className={`
          p-4 rounded-full transition-all duration-300
          ${
            isCompact
              ? "bg-white bg-opacity-20 backdrop-blur-lg"
              : "bg-white bg-opacity-10"
          }
        `}
        >
          <Camera className="h-6 w-6 text-white" />
        </button>
      </div>
    </header>
  );
};

export default ProfileHeader;
