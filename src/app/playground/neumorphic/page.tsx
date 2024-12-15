"use client";

import { PlaygroundContainer } from "../components/playground-container";
import { PlaygroundSection } from "../components/playground-section";
import { useState } from "react";
import { cn } from "@/lib/ui/utils";

export default function NeumorphicPlayground() {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Metallic Background Base */}
      <div className="fixed inset-0 bg-[#0f0f13] bg-gradient-to-br from-[#141419] via-[#0f0f13] to-[#12121a]" />

      {/* Noise Texture Overlay */}
      <div
        className="fixed inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          filter: "contrast(320%) brightness(90%)",
        }}
      />

      {/* Metallic Grain Pattern */}
      <div
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 0.5%),
             radial-gradient(circle at 0% 100%, rgba(255,255,255,0.08) 0%, transparent 0.5%),
             linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%)`,
          backgroundSize: "4px 4px, 4px 4px, 100% 100%",
        }}
      />

      {/* Subtle Light Reflection */}
      <div className="fixed inset-0 bg-gradient-to-br from-transparent via-white/[0.01] to-transparent opacity-40" />

      {/* Content Container */}
      <div className="relative z-10 p-8">
        <h1 className="text-4xl font-bold text-white/90 mb-8">
          Neumorphic Design
        </h1>

        <PlaygroundSection
          title="Basic Containers"
          description="Different variations of neumorphic containers"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PlaygroundContainer title="Default Container">
              <p className="text-white/70">
                Basic neumorphic container with default shadow and texture
                effects.
              </p>
            </PlaygroundContainer>

            <PlaygroundContainer
              title="Interactive Container"
              className={cn(
                "transition-all duration-200 cursor-pointer",
                isPressed
                  ? "shadow-[inset_8px_8px_16px_rgba(0,0,0,0.4),inset_-8px_-8px_16px_rgba(255,255,255,0.03)] translate-y-[1px]"
                  : "shadow-[8px_8px_16px_rgba(0,0,0,0.4),-8px_-8px_16px_rgba(255,255,255,0.03)] hover:translate-y-[-2px]"
              )}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              onMouseLeave={() => setIsPressed(false)}
            >
              <p className="text-white/70">
                Click or tap this container to see the pressed state effect.
              </p>
            </PlaygroundContainer>
          </div>
        </PlaygroundSection>

        <PlaygroundSection
          title="Form Elements"
          description="Neumorphic form controls and inputs"
        >
          <PlaygroundContainer>
            <div className="space-y-6">
              {/* Neumorphic Button */}
              <button
                className={cn(
                  "px-6 py-3 rounded-xl text-white/90 font-medium",
                  "bg-[#141428]",
                  "shadow-[4px_4px_8px_rgba(0,0,0,0.4),-4px_-4px_8px_rgba(255,255,255,0.03)]",
                  "border border-white/[0.02]",
                  "transition-all duration-200",
                  "hover:translate-y-[-2px]",
                  "active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.03)]",
                  "active:translate-y-[1px]"
                )}
              >
                Neumorphic Button
              </button>

              {/* Neumorphic Input */}
              <div
                className={cn(
                  "p-[1px] rounded-xl",
                  "bg-gradient-to-b from-white/[0.02] to-transparent"
                )}
              >
                <input
                  type="text"
                  placeholder="Neumorphic Input"
                  className={cn(
                    "w-full px-4 py-3 rounded-xl",
                    "bg-[#141428]",
                    "shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4),inset_-2px_-2px_4px_rgba(255,255,255,0.03)]",
                    "text-white/90 placeholder-white/30",
                    "border border-white/[0.02]",
                    "focus:outline-none focus:ring-2 focus:ring-white/10"
                  )}
                />
              </div>
            </div>
          </PlaygroundContainer>
        </PlaygroundSection>
      </div>
    </div>
  );
}
