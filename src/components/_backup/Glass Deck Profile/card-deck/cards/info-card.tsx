import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/ui/utils";
import GlassCard from "../glass-card";

interface InfoCardProps {
  isActive?: boolean;
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
  onUpdate: (
    info: Partial<{
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
    }>
  ) => void;
}

const InfoCard: React.FC<InfoCardProps> = ({
  isActive = false,
  legalName,
  preferredName,
  phone,
  email,
  bio,
  selectedIcon,
  emergency,
  achievements,
  onUpdate,
}) => {
  return (
    <GlassCard isActive={isActive}>
      <div className="flex flex-col gap-5 w-full">
        <section className="flex flex-col gap-3">
          <div className="grid grid-cols-[1fr,auto] gap-4 items-start">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <h2 className="font-outfit text-2xl font-medium text-white/90 md:text-xl">
                  {legalName}
                </h2>
                {preferredName && (
                  <span className="font-outfit text-base text-white/70">
                    Preferred: {preferredName}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-outfit text-sm text-white/60">
                  {phone}
                </span>
                <span className="font-outfit text-sm text-white/60">
                  {email}
                </span>
              </div>
              {bio && (
                <p className="font-outfit text-sm text-white/70 line-clamp-2 m-0">
                  {bio}
                </p>
              )}
            </div>
            <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10">
              <img
                src={selectedIcon}
                alt="Profile Icon"
                width={32}
                height={32}
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h3 className="font-outfit text-base font-medium text-white/70">
            Emergency Contact
          </h3>
          <div className="flex flex-col gap-2 p-3 bg-white/[0.03] rounded-xl">
            <span className="font-outfit text-sm text-white/60">
              {emergency.name}
            </span>
            <span className="font-outfit text-sm text-white/60">
              {emergency.relationship}
            </span>
            <span className="font-outfit text-sm text-white/60">
              {emergency.phone}
            </span>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h3 className="font-outfit text-base font-medium text-white/70">
            Achievements
          </h3>
          <div className="flex gap-3">
            <motion.div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                "border transition-colors",
                achievements.sevenDayStreak
                  ? "bg-white/10 border-white/20 opacity-100"
                  : "bg-white/[0.03] border-white/5 opacity-50"
              )}
              whileHover={achievements.sevenDayStreak ? { scale: 1.1 } : {}}
              title="7-Day Streak"
            >
              7d
            </motion.div>
            <motion.div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                "border transition-colors",
                achievements.thirtyDayStreak
                  ? "bg-white/10 border-white/20 opacity-100"
                  : "bg-white/[0.03] border-white/5 opacity-50"
              )}
              whileHover={achievements.thirtyDayStreak ? { scale: 1.1 } : {}}
              title="30-Day Streak"
            >
              30d
            </motion.div>
            <motion.div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                "border transition-colors",
                achievements.sixMonthStreak
                  ? "bg-white/10 border-white/20 opacity-100"
                  : "bg-white/[0.03] border-white/5 opacity-50"
              )}
              whileHover={achievements.sixMonthStreak ? { scale: 1.1 } : {}}
              title="6-Month Streak"
            >
              6m
            </motion.div>
          </div>
        </section>
      </div>
    </GlassCard>
  );
};

export default InfoCard;
