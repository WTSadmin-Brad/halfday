"use client";

import { ProfileHeaderProps } from "./types";
import Image from "next/image";

export function ProfileHeader({
  userName,
  role,
  avatarUrl,
}: ProfileHeaderProps) {
  return (
    <header className="w-full py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-6">
          {/* Avatar Container with Neumorphic Effect */}
          <div
            className="relative w-24 h-24 rounded-full bg-navy-blue/50 
            shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.1),inset_2px_2px_5px_rgba(0,0,0,0.3)]
            flex items-center justify-center"
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={userName}
                width={96}
                height={96}
                className="rounded-full"
              />
            ) : (
              <div
                className="w-full h-full rounded-full bg-gradient-to-br from-white/10 to-white/5 
                flex items-center justify-center text-white/80 text-2xl font-medium"
              >
                {userName.charAt(0)}
              </div>
            )}
          </div>

          {/* User Info with Neumorphic Text Effect */}
          <div className="flex flex-col">
            <h1
              className="text-3xl font-medium text-white/90 
              tracking-wide font-outfit"
              style={{
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              {userName}
            </h1>
            <span
              className="text-lg text-white/60 mt-1 
              tracking-wide font-outfit"
            >
              {role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
