"use client";

import { ProfileContainer } from "@/components/worker/profile/container";
import { ProfileHeader } from "@/components/worker/profile/header";
import { NetworkBackground } from "@/components/ui/network-background";

const initialData = {
  profileInfo: {
    personalInfo: {
      name: "John Smith",
      phone: "(555) 123-4567",
      email: "john.smith@example.com",
    },
    emergencyContact: "Jane Smith (555) 987-6543",
    achievements: {
      sevenDayStreak: true,
      thirtyDayStreak: true,
      sixMonthStreak: false,
    },
  },
  notificationSettings: {
    masterToggle: true,
    notifications: {
      scheduleReminders: true,
      payrollAlerts: true,
      announcements: false,
    },
    quietHours: {
      enabled: true,
      startTime: "22:00",
      endTime: "07:00",
    },
    preferredContact: "push" as const,
  },
  dataManagement: {
    autoSync: {
      enabled: true,
      lastSyncTime: new Date(),
    },
    syncStatus: "idle" as const,
  },
  supportInfo: {
    version: "1.0.0",
    buildNumber: "2023.12.1",
  },
};

export default function ProfilePage() {
  return (
    <main className="relative flex h-screen w-screen flex-col">
      <NetworkBackground />
      <div className="relative z-10 flex flex-col h-full">
        <ProfileHeader
          userName={initialData.profileInfo.personalInfo.name}
          role="Senior Developer"
        />
        <ProfileContainer initialData={initialData} />
      </div>
    </main>
  );
}