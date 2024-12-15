import React from "react";
import { motion } from "framer-motion";
import GlassCard from "../glass-card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/ui/utils";

interface WorkDay {
  date: string; // ISO date string
  status: "full" | "half" | "off" | "none";
}

interface DataCardProps {
  isActive?: boolean;
  syncEnabled: boolean;
  syncStatus: "synced" | "syncing" | "error";
  lastSyncTime?: string;
  workData: WorkDay[];
  onToggleSync: (enabled: boolean) => void;
  onExportData: (startDate: string, endDate: string) => void;
}

const DataCard: React.FC<DataCardProps> = ({
  isActive = false,
  syncEnabled,
  syncStatus,
  lastSyncTime,
  workData,
  onToggleSync,
  onExportData,
}) => {
  const getSyncStatusColor = (status: DataCardProps["syncStatus"]) => {
    switch (status) {
      case "synced":
        return "bg-green-500";
      case "syncing":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-white/30";
    }
  };

  const [exportStartDate, setExportStartDate] = React.useState("");
  const [exportEndDate, setExportEndDate] = React.useState("");

  // Get last 12 weeks of data
  const last12Weeks = React.useMemo(() => {
    const today = new Date();
    const weeks: WorkDay[][] = Array(12)
      .fill(null)
      .map(() => []);

    workData.forEach((day) => {
      const date = new Date(day.date);
      const diffTime = Math.abs(today.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 84) {
        // 12 weeks * 7 days
        const weekIndex = Math.floor(diffDays / 7);
        if (weekIndex < 12) {
          weeks[weekIndex].push(day);
        }
      }
    });

    return weeks;
  }, [workData]);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <GlassCard isActive={isActive}>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-4">
          <h3 className="font-outfit text-base font-medium text-white/80 m-0">
            Sync Status
          </h3>

          <div className="flex justify-between items-center bg-white/[0.03] rounded-xl p-3 px-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 font-outfit text-sm text-white/70">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    getSyncStatusColor(syncStatus)
                  )}
                />
                {syncStatus === "synced" && "Synced"}
                {syncStatus === "syncing" && "Syncing..."}
                {syncStatus === "error" && "Sync Error"}
              </div>
              {lastSyncTime && (
                <span className="text-sm text-white/50">
                  Last sync: {lastSyncTime}
                </span>
              )}
            </div>
            <Switch
              checked={syncEnabled}
              onCheckedChange={onToggleSync}
              className="data-[state=checked]:bg-white/20"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-outfit text-base font-medium text-white/80 m-0">
            Work Status (Last 12 Weeks)
          </h3>

          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => (
              <span key={day} className="text-sm text-white/40 text-center">
                {day}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {last12Weeks.flatMap((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={cn(
                    "w-full aspect-square rounded-lg",
                    day.status === "full" && "bg-green-500/30",
                    day.status === "half" && "bg-yellow-500/30",
                    day.status === "off" && "bg-red-500/30",
                    day.status === "none" && "bg-white/[0.03]"
                  )}
                />
              ))
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-outfit text-base font-medium text-white/80 m-0">
            Export Data
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              value={exportStartDate}
              onChange={(e) => setExportStartDate(e.target.value)}
              className="bg-white/[0.03] rounded-xl p-2 text-white/70"
            />
            <input
              type="date"
              value={exportEndDate}
              onChange={(e) => setExportEndDate(e.target.value)}
              className="bg-white/[0.03] rounded-xl p-2 text-white/70"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center px-4 py-2 bg-white/[0.03] rounded-xl text-white/70 hover:text-white/90 hover:bg-white/[0.05] transition-colors"
            onClick={() => onExportData(exportStartDate, exportEndDate)}
            disabled={!exportStartDate || !exportEndDate}
          >
            Export Selected Period
          </motion.button>
        </div>
      </div>
    </GlassCard>
  );
};

export default DataCard;
