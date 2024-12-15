export interface ProfileHeaderProps {
  userName: string;
  role: string;
  avatarUrl?: string;
}

export interface ProfileInfo {
  personalInfo: {
    name: string;
    phone: string;
    email: string;
  };
  emergencyContact: string;
  achievements: {
    sevenDayStreak: boolean;
    thirtyDayStreak: boolean;
    sixMonthStreak: boolean;
  };
}

export interface NotificationSettings {
  masterToggle: boolean;
  notifications: {
    scheduleReminders: boolean;
    payrollAlerts: boolean;
    announcements: boolean;
  };
  quietHours: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
  preferredContact: "sms" | "email" | "push";
}

export interface DataManagement {
  autoSync: {
    enabled: boolean;
    lastSyncTime?: Date;
  };
  syncStatus: "idle" | "syncing" | "error";
}

export interface SupportInfo {
  version: string;
  buildNumber: string;
}

export interface ProfileContainerProps {
  initialData?: {
    profileInfo: ProfileInfo;
    notificationSettings: NotificationSettings;
    dataManagement: DataManagement;
    supportInfo: SupportInfo;
  };
}
