import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  AnimationDefinition,
} from "framer-motion";
import { useDrag } from "@use-gesture/react";
import React, { useRef, useState } from "react";
import InfoCard from "./cards/info-card";
import SettingsCard from "./cards/settings-card";
import DataCard from "./cards/data-card";
import HelpCard from "./cards/help-card";
import { cn } from "@/lib/ui/utils";

interface CardDeckProps {
  userInfo: {
    legalName: string;
    preferredName?: string;
    phone: string;
    email: string;
    bio?: string;
    selectedIcon: string;
    emergency: {
      name: string;
      relationship: string;
      phone: string;
    };
    achievements: {
      sevenDayStreak: boolean;
      thirtyDayStreak: boolean;
      sixMonthStreak: boolean;
    };
  };
  notificationSettings: {
    master: boolean;
    scheduleReminders: boolean;
    payrollAlerts: boolean;
    announcements: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  preferredContact: "email" | "sms" | "push";
  syncEnabled: boolean;
  syncStatus: "synced" | "syncing" | "error";
  lastSyncTime?: string;
  workStatus: Array<{
    date: string;
    status: "full" | "half" | "off" | "none";
  }>;
  appInfo: {
    version: string;
    buildNumber: string;
  };
  onUpdateUserInfo: (info: Partial<CardDeckProps["userInfo"]>) => void;
  onUpdateNotifications: (
    key: keyof CardDeckProps["notificationSettings"],
    value: boolean
  ) => void;
  onUpdateQuietHours: (quietHours: CardDeckProps["quietHours"]) => void;
  onUpdatePreferredContact: (method: CardDeckProps["preferredContact"]) => void;
  onToggleSync: (enabled: boolean) => void;
  onExportData: (startDate: string, endDate: string) => void;
  onStartTutorial: () => void;
  onSubmitFeedback: (feedback: { type: string; description: string }) => void;
}

export const CardDeck: React.FC<CardDeckProps> = ({
  userInfo,
  notificationSettings,
  quietHours,
  preferredContact,
  syncEnabled,
  syncStatus,
  lastSyncTime,
  workStatus,
  appInfo,
  onUpdateUserInfo,
  onUpdateNotifications,
  onUpdateQuietHours,
  onUpdatePreferredContact,
  onToggleSync,
  onExportData,
  onStartTutorial,
  onSubmitFeedback,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);

  const scale = useTransform(y, [-100, 0, 100], [0.9, 1, 0.9]);
  const rotateX = useTransform(y, [-100, 0, 100], [15, 0, -15]);
  const opacity = useTransform(y, [-100, 0, 100], [0.5, 1, 0.5]);

  const bind = useDrag(
    ({
      movement: [x, yValue],
      down,
      velocity: [vx, vyValue],
      direction: [dx, dyValue],
    }) => {
      // Scale movement based on viewport height for consistent feel
      const scaledY = (yValue / window.innerHeight) * 100;
      y.set(down ? scaledY : 0);

      if (!down && Math.abs(vyValue) > 0.3) {
        const nextIndex = activeIndex + (dyValue > 0 ? 1 : -1);
        if (nextIndex >= 0 && nextIndex < 4) {
          setActiveIndex(nextIndex);
        }
      }
    },
    {
      axis: "y",
      bounds: { top: -100, bottom: 100 },
      rubberband: true,
      from: [0, 0],
    }
  );

  const handleAnimationStart = (definition: AnimationDefinition) => {
    // Handle the animation definition here
  };

  const cards = [
    <InfoCard
      key="info"
      isActive={activeIndex === 0}
      {...userInfo}
      onUpdate={onUpdateUserInfo}
    />,
    <SettingsCard
      key="settings"
      isActive={activeIndex === 1}
      notifications={notificationSettings}
      quietHours={quietHours}
      preferredContact={preferredContact}
      onUpdateNotifications={onUpdateNotifications}
      onUpdateQuietHours={onUpdateQuietHours}
      onUpdatePreferredContact={onUpdatePreferredContact}
    />,
    <DataCard
      key="data"
      isActive={activeIndex === 2}
      syncEnabled={syncEnabled}
      syncStatus={syncStatus}
      lastSyncTime={lastSyncTime}
      workData={workStatus}
      onToggleSync={onToggleSync}
      onExportData={onExportData}
    />,
    <HelpCard
      key="help"
      isActive={activeIndex === 3}
      version={appInfo.version}
      buildNumber={appInfo.buildNumber}
      onStartTutorial={onStartTutorial}
      onSubmitFeedback={onSubmitFeedback}
    />,
  ];

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative w-full h-full",
        "flex items-center justify-center",
        "overflow-hidden",
        "[perspective:1200px]",
        "[transform-style:preserve-3d]",
        "max-w-md mx-auto"
      )}
      onAnimationStart={handleAnimationStart}
      {...bind()}
    >
      <div className="w-full relative py-4">
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={cn(
                "absolute inset-0",
                "flex justify-center items-center",
                "[transform-style:preserve-3d]"
              )}
              style={{
                zIndex: cards.length - index,
                scale: index === activeIndex ? scale : 0.9,
                rotateX: index === activeIndex ? rotateX : 15,
                opacity: index === activeIndex ? opacity : 0.5,
                y: index * 20,
              }}
              animate={{
                y: index * 20 + (index === activeIndex ? 0 : 20),
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {card}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CardDeck;
