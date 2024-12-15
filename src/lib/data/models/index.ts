import { DomainModel } from "./common";
import { Timestamp } from "firebase/firestore";

// Profile types
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
    startTime: string;
    endTime: string;
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

// WorkDay types
export type WorkStatus = "FULL" | "HALF" | "OFF";

export interface WorkLocation {
  id: string;
  name: string;
  active: boolean;
}

export interface Truck {
  id: string;
  number: string;
  active: boolean;
}

export interface WorkDay extends DomainModel {
  userId: string;
  date: Date;
  status: WorkStatus;
  locationId?: string;
  truckId?: string;
  notes?: string;
  locked: boolean;
  payPeriodId?: string;
}

export interface PayPeriod extends DomainModel {
  startDate: Date;
  endDate: Date;
  status: "OPEN" | "LOCKED" | "PROCESSED";
  lockedAt?: Date;
  lockedBy?: string;
}
