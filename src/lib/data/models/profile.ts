import { DomainModel } from "./common";

export interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
}

export interface ProfileAchievements {
  sevenDayStreak: boolean;
  thirtyDayStreak: boolean;
  sixMonthStreak: boolean;
}

export interface NotificationPreferences {
  masterToggle: boolean;
  scheduleReminders: boolean;
  payrollAlerts: boolean;
  announcements: boolean;
  quietHours: {
    enabled: boolean;
    startTime: string; // "HH:mm"
    endTime: string; // "HH:mm"
  };
  preferredContact: "sms" | "email" | "push";
}

export interface ProfileSync {
  autoSync: boolean;
  lastSyncTime?: Date;
  syncStatus: "idle" | "syncing" | "error";
}

export interface Profile extends DomainModel {
  userId: string;
  personalInfo: PersonalInfo;
  emergencyContact: string;
  achievements: ProfileAchievements;
  notifications: NotificationPreferences;
  sync: ProfileSync;
  meta: {
    version: string;
    buildNumber: string;
  };
}
