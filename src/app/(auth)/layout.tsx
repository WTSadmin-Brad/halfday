"use client";

import { cn } from "@/lib/ui/utils";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuroraBackground>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-md bg-white/10 dark:bg-navy-blue/10 rounded-xl shadow-xl border border-white/20 p-6">
            {children}
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
