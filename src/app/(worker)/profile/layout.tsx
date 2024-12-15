"use client";

import { cn } from "@/lib/ui/utils";

const typography = {
  heading: {
    h1: "font-display text-4xl font-bold tracking-tight",
    h2: "font-display text-3xl font-semibold tracking-tight",
    h3: "font-display text-2xl font-semibold tracking-tight",
    h4: "font-display text-xl font-semibold tracking-tight",
  },
  body: {
    large: "font-sans text-lg leading-relaxed",
    base: "font-sans text-base leading-relaxed",
    small: "font-sans text-sm leading-relaxed",
    tiny: "font-sans text-xs leading-relaxed",
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "min-h-screen w-full",
        "bg-gradient-to-b from-[#020212] to-[#0F0F1F]",
        "text-white/90",
        typography.body.base
      )}
    >
      <div className="max-w-2xl mx-auto px-4 py-6">{children}</div>
    </div>
  );
}
