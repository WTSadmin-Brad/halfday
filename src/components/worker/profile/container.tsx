"use client";

import { useState } from "react";
import { ProfileContainerProps } from "./types";

interface DataManagementState {
  autoSync: {
    enabled: boolean;
    lastSyncTime: Date;
  };
  syncStatus: "idle" | "syncing" | "error";
  syncProgress?: number;
}

export function ProfileContainer({ initialData }: ProfileContainerProps) {
  // State for form inputs
  const [personalInfo, setPersonalInfo] = useState({
    name: initialData?.profileInfo.personalInfo.name || "",
    phone: initialData?.profileInfo.personalInfo.phone || "",
    email: initialData?.profileInfo.personalInfo.email || "",
    emergencyContact: initialData?.profileInfo.emergencyContact || "",
    profileIcon: initialData?.profileInfo.profileIcon?.selected || "user",
  });

  const [achievements, setAchievements] = useState({
    sevenDayStreak: initialData?.profileInfo.achievements.sevenDayStreak || false,
    thirtyDayStreak: initialData?.profileInfo.achievements.thirtyDayStreak || false,
    sixMonthStreak: initialData?.profileInfo.achievements.sixMonthStreak || false,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    masterToggle: initialData?.notificationSettings.masterToggle || false,
    notifications: {
      scheduleReminders:
        initialData?.notificationSettings.notifications.scheduleReminders ||
        false,
      payrollAlerts:
        initialData?.notificationSettings.notifications.payrollAlerts || false,
      announcements:
        initialData?.notificationSettings.notifications.announcements || false,
    },
    quietHours: {
      enabled: initialData?.notificationSettings.quietHours.enabled || false,
      startTime:
        initialData?.notificationSettings.quietHours.startTime || "22:00",
      endTime: initialData?.notificationSettings.quietHours.endTime || "07:00",
    },
    preferredContact:
      initialData?.notificationSettings.preferredContact || "push",
  });

  const [dataManagement, setDataManagement] = useState<DataManagementState>({
    autoSync: {
      enabled: initialData?.dataManagement.autoSync.enabled ?? true,
      lastSyncTime:
        initialData?.dataManagement.autoSync.lastSyncTime || new Date(),
    },
    syncStatus: initialData?.dataManagement.syncStatus || "idle",
    syncProgress: 0,
  });

  return (
    <div className="flex-1 overflow-hidden px-6 pb-6">
      <div className="max-w-4xl mx-auto h-full">
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
          {/* Profile Information Section */}
          <section
            className="mb-6 bg-white/[0.03] rounded-xl p-6 backdrop-blur-md border border-white/[0.05] shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.05),inset_2px_2px_5px_rgba(0,0,0,0.1)]"
          >
            <h2 className="text-xl font-medium text-white/90 mb-6 text-center">
              Profile Information
            </h2>
            <div className="space-y-6">
              {/* Profile Icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white/90 transition-colors cursor-pointer border border-white/20">
                    {/* Dynamically import icon based on selection */}
                    <span className="text-4xl">{personalInfo.profileIcon}</span>
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white/70 hover:text-white/90 transition-colors">
                    <span className="text-xl">✏️</span>
                  </button>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm font-medium text-white/70">
                    Full Name
                  </span>
                  <input
                    type="text"
                    value={personalInfo.name}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full rounded-md bg-white/[0.03] border border-white/10 
                      focus:border-white/20 focus:ring-0 text-white/90 text-sm
                      shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.05),inset_1px_1px_3px_rgba(0,0,0,0.1)]"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-white/70">
                    Phone Number
                  </span>
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full rounded-md bg-white/[0.03] border border-white/10 
                      focus:border-white/20 focus:ring-0 text-white/90 text-sm
                      shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.05),inset_1px_1px_3px_rgba(0,0,0,0.1)]"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-white/70">
                    Email Address
                  </span>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full rounded-md bg-white/[0.03] border border-white/10 
                      focus:border-white/20 focus:ring-0 text-white/90 text-sm
                      shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.05),inset_1px_1px_3px_rgba(0,0,0,0.1)]"
                  />
                </label>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <label className="block">
                  <span className="text-sm font-medium text-white/70">
                    Emergency Contact
                  </span>
                  <input
                    type="text"
                    value={personalInfo.emergencyContact}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        emergencyContact: e.target.value,
                      }))
                    }
                    placeholder="Name and phone number"
                    className="mt-1 block w-full rounded-md bg-white/[0.03] border border-white/10 
                      focus:border-white/20 focus:ring-0 text-white/90 text-sm
                      shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.05),inset_1px_1px_3px_rgba(0,0,0,0.1)]"
                  />
                </label>
              </div>

              {/* Achievements */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <h3 className="text-sm font-medium text-white/70">Achievements</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      achievements.sevenDayStreak
                        ? "bg-emerald-500/20 text-emerald-200"
                        : "bg-white/5 text-white/40"
                    } text-center`}
                  >
                    <span className="text-2xl">🌱</span>
                    <p className="text-xs mt-1">7 Day Streak</p>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      achievements.thirtyDayStreak
                        ? "bg-emerald-500/20 text-emerald-200"
                        : "bg-white/5 text-white/40"
                    } text-center`}
                  >
                    <span className="text-2xl">🌿</span>
                    <p className="text-xs mt-1">30 Day Streak</p>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      achievements.sixMonthStreak
                        ? "bg-emerald-500/20 text-emerald-200"
                        : "bg-white/5 text-white/40"
                    } text-center`}
                  >
                    <span className="text-2xl">🌳</span>
                    <p className="text-xs mt-1">6 Month Streak</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Notification Settings Section */}
          <section
            className="mb-6 bg-white/[0.03] rounded-xl p-6 backdrop-blur-md border border-white/[0.05] shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.05),inset_2px_2px_5px_rgba(0,0,0,0.1)]"
          >
            <h2 className="text-xl font-medium text-white/90 mb-6 text-center">
              Notification Settings
            </h2>
            <div className="space-y-6">
              {/* Master Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white/70">
                  Enable All Notifications
                </span>
                <button
                  onClick={() =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      masterToggle: !prev.masterToggle,
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full
                    transition-colors duration-200 ease-in-out
                    ${
                      notificationSettings.masterToggle
                        ? "bg-white/20"
                        : "bg-white/5"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full
                      bg-white transition-transform duration-200 ease-in-out
                      ${
                        notificationSettings.masterToggle
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                  />
                </button>
              </div>

              {/* Individual Notification Settings */}
              {notificationSettings.masterToggle && (
                <div className="space-y-4 pl-4 border-l border-white/10">
                  {/* Schedule Reminders */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white/70">
                      Schedule Reminders
                    </span>
                    <button
                      onClick={() =>
                        setNotificationSettings((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            scheduleReminders:
                              !prev.notifications.scheduleReminders,
                          },
                        }))
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full
                        transition-colors duration-200 ease-in-out
                        ${
                          notificationSettings.notifications.scheduleReminders
                            ? "bg-white/20"
                            : "bg-white/5"
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full
                          bg-white transition-transform duration-200 ease-in-out
                          ${
                            notificationSettings.notifications.scheduleReminders
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                      />
                    </button>
                  </div>

                  {/* Payroll Alerts */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white/70">
                      Payroll Alerts
                    </span>
                    <button
                      onClick={() =>
                        setNotificationSettings((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            payrollAlerts: !prev.notifications.payrollAlerts,
                          },
                        }))
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full
                        transition-colors duration-200 ease-in-out
                        ${
                          notificationSettings.notifications.payrollAlerts
                            ? "bg-white/20"
                            : "bg-white/5"
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full
                          bg-white transition-transform duration-200 ease-in-out
                          ${
                            notificationSettings.notifications.payrollAlerts
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                      />
                    </button>
                  </div>

                  {/* Announcements */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white/70">
                      Announcements
                    </span>
                    <button
                      onClick={() =>
                        setNotificationSettings((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            announcements: !prev.notifications.announcements,
                          },
                        }))
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full
                        transition-colors duration-200 ease-in-out
                        ${
                          notificationSettings.notifications.announcements
                            ? "bg-white/20"
                            : "bg-white/5"
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full
                          bg-white transition-transform duration-200 ease-in-out
                          ${
                            notificationSettings.notifications.announcements
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                      />
                    </button>
                  </div>

                  {/* Quiet Hours */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white/70">
                        Quiet Hours
                      </span>
                      <button
                        onClick={() =>
                          setNotificationSettings((prev) => ({
                            ...prev,
                            quietHours: {
                              ...prev.quietHours,
                              enabled: !prev.quietHours.enabled,
                            },
                          }))
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full
                          transition-colors duration-200 ease-in-out
                          ${
                            notificationSettings.quietHours.enabled
                              ? "bg-white/20"
                              : "bg-white/5"
                          }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full
                            bg-white transition-transform duration-200 ease-in-out
                            ${
                              notificationSettings.quietHours.enabled
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                        />
                      </button>
                    </div>

                    {notificationSettings.quietHours.enabled && (
                      <div className="flex gap-4 pl-4">
                        <label className="block flex-1">
                          <span className="text-sm font-medium text-white/70">
                            Start Time
                          </span>
                          <input
                            type="time"
                            value={notificationSettings.quietHours.startTime}
                            onChange={(e) =>
                              setNotificationSettings((prev) => ({
                                ...prev,
                                quietHours: {
                                  ...prev.quietHours,
                                  startTime: e.target.value,
                                },
                              }))
                            }
                            className="mt-1 block w-full rounded-md bg-white/[0.03] border border-white/10 
                              focus:border-white/20 focus:ring-0 text-white/90 text-sm
                              shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.05),inset_1px_1px_3px_rgba(0,0,0,0.1)]"
                          />
                        </label>
                        <label className="block flex-1">
                          <span className="text-sm font-medium text-white/70">
                            End Time
                          </span>
                          <input
                            type="time"
                            value={notificationSettings.quietHours.endTime}
                            onChange={(e) =>
                              setNotificationSettings((prev) => ({
                                ...prev,
                                quietHours: {
                                  ...prev.quietHours,
                                  endTime: e.target.value,
                                },
                              }))
                            }
                            className="mt-1 block w-full rounded-md bg-white/[0.03] border border-white/10 
                              focus:border-white/20 focus:ring-0 text-white/90 text-sm
                              shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.05),inset_1px_1px_3px_rgba(0,0,0,0.1)]"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Data Management Section */}
          <section
            className="mb-6 bg-white/[0.03] rounded-xl p-6 backdrop-blur-md border border-white/[0.05] shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.05),inset_2px_2px_5px_rgba(0,0,0,0.1)]"
          >
            <h2 className="text-xl font-medium text-white/90 mb-6 text-center">
              Data Management
            </h2>
            <div className="space-y-6">
              {/* Auto Sync Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-white/70 block">
                    Auto-Sync Data
                  </span>
                  <span className="text-xs text-white/50">
                    Last synced:{" "}
                    {dataManagement.autoSync.lastSyncTime.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() =>
                    setDataManagement((prev) => ({
                      ...prev,
                      autoSync: {
                        ...prev.autoSync,
                        enabled: !prev.autoSync.enabled,
                      },
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full
                    transition-colors duration-200 ease-in-out
                    ${
                      dataManagement.autoSync.enabled
                        ? "bg-white/20"
                        : "bg-white/5"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full
                      bg-white transition-transform duration-200 ease-in-out
                      ${
                        dataManagement.autoSync.enabled
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                  />
                </button>
              </div>

              {/* Sync Status and Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/70">
                    Sync Status
                  </span>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full
                    ${
                      dataManagement.syncStatus === "idle"
                        ? "bg-white/10 text-white/70"
                        : dataManagement.syncStatus === "syncing"
                        ? "bg-blue-500/20 text-blue-200"
                        : "bg-red-500/20 text-red-200"
                    }`}
                  >
                    {dataManagement.syncStatus.charAt(0).toUpperCase() +
                      dataManagement.syncStatus.slice(1)}
                  </span>
                </div>
                {dataManagement.syncStatus === "syncing" && (
                  <div className="space-y-2">
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500/50 transition-all duration-300 ease-out"
                        style={{ width: `${dataManagement.syncProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-white/50">
                      <span>Progress</span>
                      <span>{dataManagement.syncProgress}%</span>
                    </div>
                  </div>
                )}
                {dataManagement.syncStatus === "error" && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3">
                    <p className="text-sm text-red-200">
                      Sync failed. Please try again or contact support if the
                      problem persists.
                    </p>
                  </div>
                )}
              </div>

              {/* Manual Sync Button */}
              <button
                onClick={() => {
                  setDataManagement((prev) => ({
                    ...prev,
                    syncStatus: "syncing",
                    syncProgress: 0,
                  }));
                  // Simulate sync with progress
                  const interval = setInterval(() => {
                    setDataManagement((prev) => {
                      const newProgress = (prev.syncProgress || 0) + 10;
                      if (newProgress >= 100) {
                        clearInterval(interval);
                        return {
                          ...prev,
                          syncStatus: "idle",
                          syncProgress: 0,
                          autoSync: {
                            ...prev.autoSync,
                            lastSyncTime: new Date(),
                          },
                        };
                      }
                      return {
                        ...prev,
                        syncProgress: newProgress,
                      };
                    });
                  }, 300);
                }}
                disabled={dataManagement.syncStatus === "syncing"}
                className="w-full py-2 rounded-md bg-white/10 text-white/90 hover:bg-white/15 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {dataManagement.syncStatus === "syncing" ? "Syncing..." : "Manual Sync"}
              </button>
            </div>
          </section>

          {/* Support & Information Section */}
          <section
            className="mb-6 bg-white/[0.03] rounded-xl p-6 backdrop-blur-md border border-white/[0.05] shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.05),inset_2px_2px_5px_rgba(0,0,0,0.1)]"
          >
            <h2 className="text-xl font-medium text-white/90 mb-6 text-center">
              Support & Information
            </h2>
            <div className="space-y-6">
              {/* Version Info */}
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-sm font-medium text-white/70">
                  Version
                </span>
                <span className="text-sm text-white/50">
                  {initialData?.supportInfo.version || "1.0.0"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-sm font-medium text-white/70">
                  Build Number
                </span>
                <span className="text-sm text-white/50">
                  {initialData?.supportInfo.buildNumber || "2023.12.1"}
                </span>
              </div>

              {/* Support Links */}
              <div className="space-y-3">
                <button
                  className="w-full py-2 rounded-md bg-white/10 text-white/90 hover:bg-white/15 transition-colors"
                >
                  View Tutorial
                </button>
                <button
                  className="w-full py-2 rounded-md bg-white/10 text-white/90 hover:bg-white/15 transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
