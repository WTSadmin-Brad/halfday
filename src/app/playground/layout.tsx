"use client";

import { cn } from "@/lib/ui/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/playground", label: "Home" },
    { href: "/playground/neumorphic", label: "Neumorphic" },
    { href: "/playground/designs", label: "Designs" },
  ];

  return (
    // Remove overflow-auto from the main container
    <div className="flex flex-col min-h-screen touch-auto overscroll-none bg-gradient-to-b from-[#020212] to-[#0F0F1F]">
      {/* Navigation - ensure it stays above background */}
      <nav className="sticky top-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16 space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium",
                  "text-white/70 hover:text-white transition-colors",
                  pathname === item.href && "text-white bg-white/10"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main content - simplify the structure */}
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 py-20">
          {children}
        </div>
      </main>
    </div>
  );
}