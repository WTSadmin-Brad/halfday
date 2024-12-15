import React from "react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/ui/utils";
import GlassCard from "../glass-card";

interface SettingsCardProps {
  isActive?: boolean;
  notifications: {
    master: boolean;
    scheduleReminders: boolean;
    payrollAlerts: boolean;
    announcements: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string; // 24h format "HH:mm"
    end: string; // 24h format "HH:mm"
  };
  preferredContact: "email" | "sms" | "push";
  onUpdateNotifications: (
    key: keyof SettingsCardProps["notifications"],
    value: boolean
  ) => void;
  onUpdateQuietHours: (quietHours: SettingsCardProps["quietHours"]) => void;
  onUpdatePreferredContact: (
    method: SettingsCardProps["preferredContact"]
  ) => void;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  isActive = false,
  notifications,
  quietHours,
  preferredContact,
  onUpdateNotifications,
  onUpdateQuietHours,
  onUpdatePreferredContact,
}) => {
  return (
    <GlassCard isActive={isActive}>
      <div className="flex flex-col gap-6 w-full">
        <section className="flex flex-col gap-4">
          <h3 className="font-outfit text-base font-medium text-white/80 m-0">
            Notifications
          </h3>
          <div className="flex justify-between items-center gap-3">
            <span className="font-outfit text-sm text-white/70">
              Master Toggle
            </span>
            <Switch
              checked={notifications.master}
              onCheckedChange={(checked) =>
                onUpdateNotifications("master", checked)
              }
              className="bg-white/5 data-[state=checked]:bg-white/20"
            />
          </div>
          {notifications.master && (
            <>
              <div className="flex justify-between items-center gap-3">
                <span className="font-outfit text-sm text-white/70">
                  Schedule Reminders
                </span>
                <Switch
                  checked={notifications.scheduleReminders}
                  onCheckedChange={(checked) =>
                    onUpdateNotifications("scheduleReminders", checked)
                  }
                  className="bg-white/5 data-[state=checked]:bg-white/20"
                />
              </div>
              <div className="flex justify-between items-center gap-3">
                <span className="font-outfit text-sm text-white/70">
                  Payroll Alerts
                </span>
                <Switch
                  checked={notifications.payrollAlerts}
                  onCheckedChange={(checked) =>
                    onUpdateNotifications("payrollAlerts", checked)
                  }
                  className="bg-white/5 data-[state=checked]:bg-white/20"
                />
              </div>
              <div className="flex justify-between items-center gap-3">
                <span className="font-outfit text-sm text-white/70">
                  Important Announcements
                </span>
                <Switch
                  checked={notifications.announcements}
                  onCheckedChange={(checked) =>
                    onUpdateNotifications("announcements", checked)
                  }
                  className="bg-white/5 data-[state=checked]:bg-white/20"
                />
              </div>
            </>
          )}
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="font-outfit text-base font-medium text-white/80 m-0">
            Quiet Hours
          </h3>
          <div className="flex justify-between items-center gap-3">
            <span className="font-outfit text-sm text-white/70">
              Enable Quiet Hours
            </span>
            <Switch
              checked={quietHours.enabled}
              onCheckedChange={(checked) =>
                onUpdateQuietHours({ ...quietHours, enabled: checked })
              }
              className="bg-white/5 data-[state=checked]:bg-white/20"
            />
          </div>
          {quietHours.enabled && (
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Input
                type="time"
                value={quietHours.start}
                onChange={(e) =>
                  onUpdateQuietHours({ ...quietHours, start: e.target.value })
                }
                aria-label="Quiet hours start time"
                className="font-outfit text-sm text-white/90 bg-white/5 border-white/10 focus:border-white/20"
              />
              <Input
                type="time"
                value={quietHours.end}
                onChange={(e) =>
                  onUpdateQuietHours({ ...quietHours, end: e.target.value })
                }
                aria-label="Quiet hours end time"
                className="font-outfit text-sm text-white/90 bg-white/5 border-white/10 focus:border-white/20"
              />
            </div>
          )}
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="font-outfit text-base font-medium text-white/80 m-0">
            Preferred Contact Method
          </h3>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {(["email", "sms", "push"] as const).map((method) => (
              <motion.button
                key={method}
                onClick={() => onUpdatePreferredContact(method)}
                className={cn(
                  "font-outfit text-sm p-2 rounded-lg cursor-pointer transition-colors",
                  "border",
                  preferredContact === method
                    ? "bg-white/10 border-white/20 text-white/90"
                    : "bg-white/[0.03] border-white/10 text-white/60"
                )}
                whileTap={{ scale: 0.95 }}
              >
                {method.toUpperCase()}
              </motion.button>
            ))}
          </div>
        </section>
      </div>
    </GlassCard>
  );
};

export default SettingsCard;
