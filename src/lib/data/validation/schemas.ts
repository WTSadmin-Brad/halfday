import { z } from "zod";
import { Timestamp } from "firebase/firestore";

const timestampSchema = z.instanceof(Timestamp);

// Base Schemas
const domainSchema = z.object({
  id: z.string(),
  version: z.number().int().positive(),
  syncStatus: z.enum(["PENDING", "SYNCED", "CONFLICT"]),
  created: timestampSchema,
  updated: timestampSchema,
});

// Profile Schemas
export const personalInfoSchema = z.object({
  name: z.string().min(1).max(100),
  phone: z
    .string()
    .regex(/^\+?[\d\s-()]{10,}$/)
    .optional(),
  email: z.string().email(),
});

export const profileAchievementsSchema = z.object({
  sevenDayStreak: z.boolean(),
  thirtyDayStreak: z.boolean(),
  sixMonthStreak: z.boolean(),
});

export const notificationPreferencesSchema = z.object({
  masterToggle: z.boolean(),
  scheduleReminders: z.boolean(),
  payrollAlerts: z.boolean(),
  announcements: z.boolean(),
  quietHours: z.object({
    enabled: z.boolean(),
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  }),
  preferredContact: z.enum(["sms", "email", "push"]),
});

export const profileSyncSchema = z.object({
  autoSync: z.boolean(),
  lastSyncTime: z.date().optional(),
  syncStatus: z.enum(["idle", "syncing", "error"]),
});

export const profileSchema = domainSchema.extend({
  userId: z.string(),
  personalInfo: personalInfoSchema,
  emergencyContact: z.string(),
  achievements: profileAchievementsSchema,
  notifications: notificationPreferencesSchema,
  sync: profileSyncSchema,
  meta: z.object({
    version: z.string(),
    buildNumber: z.string(),
  }),
});

// WorkDay Schemas
export const workLocationSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  active: z.boolean(),
});

export const truckSchema = z.object({
  id: z.string(),
  number: z.string().min(1).max(20),
  active: z.boolean(),
});

export const workDaySchema = domainSchema.extend({
  userId: z.string(),
  date: z.date(),
  status: z.enum(["FULL", "HALF", "OFF"]),
  locationId: z.string().optional(),
  truckId: z.string().optional(),
  notes: z.string().max(500).optional(),
  locked: z.boolean(),
  payPeriodId: z.string().optional(),
});

export const payPeriodSchema = domainSchema.extend({
  startDate: z.date(),
  endDate: z.date(),
  status: z.enum(["OPEN", "LOCKED", "PROCESSED"]),
  lockedAt: z.date().optional(),
  lockedBy: z.string().optional(),
});
