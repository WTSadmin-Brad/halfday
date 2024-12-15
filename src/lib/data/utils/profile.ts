import { Profile, NotificationPreferences } from "../models/profile";
import { profileSchema } from "../validation/schemas";
import { serverTimestamp } from "firebase/firestore";

export const profileUtils = {
  createDefaultProfile(userId: string, email: string, name: string): Profile {
    const defaultProfile: Profile = {
      id: userId,
      userId,
      version: 1,
      syncStatus: "SYNCED",
      created: serverTimestamp(),
      updated: serverTimestamp(),
      personalInfo: {
        name: name || "",
        phone: "",
        email: email || "",
      },
      emergencyContact: "",
      achievements: {
        sevenDayStreak: false,
        thirtyDayStreak: false,
        sixMonthStreak: false,
      },
      notifications: {
        masterToggle: true,
        scheduleReminders: true,
        payrollAlerts: true,
        announcements: true,
        quietHours: {
          enabled: false,
          startTime: "22:00",
          endTime: "07:00",
        },
        preferredContact: "push",
      },
      sync: {
        autoSync: true,
        syncStatus: "idle",
      },
      meta: {
        version: "1.0.0",
        buildNumber: "2023.12.1",
      },
    };

    return profileSchema.parse(defaultProfile);
  },

  validateProfile(data: unknown): Profile {
    return profileSchema.parse(data);
  },

  isValidPhoneNumber(phone: string): boolean {
    return /^\+?[\d\s-()]{10,}$/.test(phone);
  },

  isQuietHours(
    preferences: NotificationPreferences,
    now = new Date()
  ): boolean {
    if (!preferences.quietHours.enabled) return false;

    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [startHour, startMinute] = preferences.quietHours.startTime
      .split(":")
      .map(Number);
    const [endHour, endMinute] = preferences.quietHours.endTime
      .split(":")
      .map(Number);

    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    if (startMinutes <= endMinutes) {
      return currentTime >= startMinutes && currentTime <= endMinutes;
    } else {
      return currentTime >= startMinutes || currentTime <= endMinutes;
    }
  },
};
