import { Timestamp } from "firebase/firestore";
import {
  Profile,
  PersonalInfo,
  NotificationPreferences,
  ProfileSync,
  WorkDay,
  WorkLocation,
  Truck,
  PayPeriod,
  WorkStatus,
} from "../models/index";
import { DomainModel } from "../models/common";

// Base type guards
export function isTimestamp(value: unknown): value is Timestamp {
  return value instanceof Timestamp;
}

export function isDomainModel(value: unknown): value is DomainModel {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "version" in value &&
    "syncStatus" in value &&
    isTimestamp((value as any).created) &&
    isTimestamp((value as any).updated)
  );
}

// Profile type guards
export function isPersonalInfo(value: unknown): value is PersonalInfo {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "phone" in value &&
    "email" in value &&
    typeof (value as PersonalInfo).name === "string" &&
    typeof (value as PersonalInfo).phone === "string" &&
    typeof (value as PersonalInfo).email === "string"
  );
}

export function isNotificationPreferences(
  value: unknown
): value is NotificationPreferences {
  if (typeof value !== "object" || value === null) return false;

  const v = value as NotificationPreferences;
  return (
    typeof v.masterToggle === "boolean" &&
    typeof v.scheduleReminders === "boolean" &&
    typeof v.payrollAlerts === "boolean" &&
    typeof v.announcements === "boolean" &&
    typeof v.quietHours === "object" &&
    v.quietHours !== null &&
    typeof v.quietHours.enabled === "boolean" &&
    typeof v.quietHours.startTime === "string" &&
    typeof v.quietHours.endTime === "string" &&
    ["sms", "email", "push"].includes(v.preferredContact)
  );
}

export function isProfileSync(value: unknown): value is ProfileSync {
  if (typeof value !== "object" || value === null) return false;

  const v = value as ProfileSync;
  return (
    typeof v.autoSync === "boolean" &&
    (v.lastSyncTime === undefined || v.lastSyncTime instanceof Date) &&
    ["idle", "syncing", "error"].includes(v.syncStatus)
  );
}

export function isProfile(value: unknown): value is Profile {
  if (!isDomainModel(value)) return false;

  const v = value as Profile;
  return (
    typeof v.userId === "string" &&
    isPersonalInfo(v.personalInfo) &&
    typeof v.emergencyContact === "string" &&
    typeof v.achievements === "object" &&
    v.achievements !== null &&
    isNotificationPreferences(v.notifications) &&
    isProfileSync(v.sync) &&
    typeof v.meta === "object" &&
    v.meta !== null &&
    typeof v.meta.version === "string" &&
    typeof v.meta.buildNumber === "string"
  );
}

// WorkDay type guards
export function isWorkLocation(value: unknown): value is WorkLocation {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as WorkLocation).id === "string" &&
    typeof (value as WorkLocation).name === "string" &&
    typeof (value as WorkLocation).active === "boolean"
  );
}

export function isTruck(value: unknown): value is Truck {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Truck).id === "string" &&
    typeof (value as Truck).number === "string" &&
    typeof (value as Truck).active === "boolean"
  );
}

export function isWorkStatus(value: unknown): value is WorkStatus {
  return (
    typeof value === "string" &&
    ["FULL", "HALF", "OFF"].includes(value as string)
  );
}

export function isWorkDay(value: unknown): value is WorkDay {
  if (!isDomainModel(value)) return false;

  const v = value as WorkDay;
  return (
    typeof v.userId === "string" &&
    v.date instanceof Date &&
    isWorkStatus(v.status) &&
    (v.locationId === undefined || typeof v.locationId === "string") &&
    (v.truckId === undefined || typeof v.truckId === "string") &&
    (v.notes === undefined || typeof v.notes === "string") &&
    typeof v.locked === "boolean" &&
    (v.payPeriodId === undefined || typeof v.payPeriodId === "string")
  );
}

export function isPayPeriod(value: unknown): value is PayPeriod {
  if (!isDomainModel(value)) return false;

  const v = value as PayPeriod;
  return (
    v.startDate instanceof Date &&
    v.endDate instanceof Date &&
    ["OPEN", "LOCKED", "PROCESSED"].includes(v.status) &&
    (v.lockedAt === undefined || v.lockedAt instanceof Date) &&
    (v.lockedBy === undefined || typeof v.lockedBy === "string")
  );
}
