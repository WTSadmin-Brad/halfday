import { ReactNode } from "react";
import { Camera, User } from "lucide-react";
import { cn } from "@/lib/ui/utils";
import { profileStyles } from "../../../styles/design-system";
import { Container, GlassCard, NeumorphicCard } from "../../ui/containers";

interface ProfileHeaderProps {
  isCollapsed?: boolean;
  userName: string;
  userInitials: string;
  avatarUrl?: string;
}

export function ProfileHeader({
  isCollapsed = false,
  userName,
  userInitials,
  avatarUrl,
}: ProfileHeaderProps) {
  return (
    <div
      className={cn(
        "w-full transition-all duration-300",
        isCollapsed
          ? profileStyles.header.collapsed
          : profileStyles.header.expanded
      )}
    >
      <div className="container mx-auto px-4 py-2 flex items-center gap-4">
        <ProfileAvatar
          size={isCollapsed ? "sm" : "lg"}
          userInitials={userInitials}
          avatarUrl={avatarUrl}
        />
        <div className="flex flex-col">
          <h2
            className={cn(
              "font-semibold transition-all duration-300",
              isCollapsed ? "text-base" : "text-xl"
            )}
          >
            {userName}
          </h2>
        </div>
      </div>
    </div>
  );
}

interface ProfileAvatarProps {
  size?: "sm" | "lg";
  userInitials: string;
  avatarUrl?: string;
  editable?: boolean;
  onEdit?: () => void;
}

export function ProfileAvatar({
  size = "lg",
  userInitials,
  avatarUrl,
  editable = false,
  onEdit,
}: ProfileAvatarProps) {
  const dimensions = size === "lg" ? "w-24 h-24" : "w-10 h-10";
  const initialsSize = size === "lg" ? "text-2xl" : "text-sm";

  return (
    <div className={cn(profileStyles.avatar.container, dimensions, "relative")}>
      <div
        className={cn(
          profileStyles.avatar.placeholder,
          dimensions,
          "text-neutral-600 dark:text-neutral-300"
        )}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className={initialsSize}>{userInitials}</span>
        )}
      </div>
      {editable && (
        <button
          onClick={onEdit}
          className={cn(
            profileStyles.button.icon,
            "absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4"
          )}
        >
          <Camera className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

interface ProfileSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ProfileSection({
  title,
  children,
  className,
}: ProfileSectionProps) {
  return (
    <NeumorphicCard elevation="surface" className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-3">{children}</div>
    </NeumorphicCard>
  );
}

interface ProfileFieldProps {
  label: string;
  value: string;
  icon?: ReactNode;
  editable?: boolean;
  onEdit?: () => void;
}

export function ProfileField({
  label,
  value,
  icon,
  editable = false,
  onEdit,
}: ProfileFieldProps) {
  return (
    <GlassCard
      elevation="surface"
      className="flex items-center gap-3 p-3"
      interactive={editable}
      onClick={editable ? onEdit : undefined}
    >
      {icon}
      <div className="flex-1">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {label}
        </p>
        <p className="text-neutral-900 dark:text-neutral-100">{value}</p>
      </div>
    </GlassCard>
  );
}
