"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import CardDeck from "@/components/worker/profile/card-deck";

// Mock data for testing
const mockUserInfo = {
  legalName: "John Doe",
  preferredName: "Johnny",
  phone: "+1 (555) 123-4567",
  email: "john.doe@example.com",
  bio: "Software Engineer with a passion for building great products",
  selectedIcon: "👨‍💻",
  emergency: {
    name: "Jane Doe",
    relationship: "Spouse",
    phone: "+1 (555) 987-6543",
  },
  achievements: {
    sevenDayStreak: true,
    thirtyDayStreak: false,
    sixMonthStreak: false,
  },
};

const mockNotificationSettings = {
  master: true,
  scheduleReminders: true,
  payrollAlerts: true,
  announcements: true,
};

const mockQuietHours = {
  enabled: true,
  start: "22:00",
  end: "07:00",
};

export default function ProfilePage() {
  return (
    <>
      <AuroraBackground className="fixed inset-0 -z-10" />
      <CardDeck
        userInfo={mockUserInfo}
        notificationSettings={mockNotificationSettings}
        quietHours={mockQuietHours}
        preferredContact="email"
        syncEnabled={true}
        syncStatus="synced"
        lastSyncTime="2024-12-08T23:39:18-06:00"
        workStatus={[
          { date: "2024-12-08", status: "full" },
          { date: "2024-12-09", status: "full" },
          { date: "2024-12-10", status: "half" },
        ]}
        appInfo={{
          version: "1.0.0",
          buildNumber: "1234",
        }}
        onUpdateUserInfo={(info) => console.log("Update user info:", info)}
        onUpdateNotifications={(key, value) =>
          console.log("Update notification:", key, value)
        }
        onUpdateQuietHours={(hours) =>
          console.log("Update quiet hours:", hours)
        }
        onUpdatePreferredContact={(method) =>
          console.log("Update preferred contact:", method)
        }
        onToggleSync={(enabled) => console.log("Toggle sync:", enabled)}
        onExportData={(start, end) => console.log("Export data:", start, end)}
        onStartTutorial={() => console.log("Start tutorial")}
        onSubmitFeedback={(feedback) =>
          console.log("Submit feedback:", feedback)
        }
      />
    </>
  );
}
