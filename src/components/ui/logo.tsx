import Image from "next/image";
import { cn } from "@/lib//ui/utils";

const LOGO_SIZES = {
  sm: 40, // Small: navbar, footer
  md: 64, // Medium: small headers
  lg: 96, // Large: main headers
  xl: 128, // Extra large: hero sections
  "2xl": 192, // Double extra large: splash pages
} as const;

type LogoSize = keyof typeof LOGO_SIZES | number;

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the logo to display
   * - 'circle': Just the circle logo
   * - 'text': Just the text
   * - 'full': Circle logo with text
   */
  variant?: "circle" | "text" | "full";
  /**
   * The size of the logo
   * Can be a preset size ('sm' | 'md' | 'lg' | 'xl' | '2xl')
   * or a custom number in pixels
   * @default 'md'
   */
  size?: LogoSize;
  /**
   * The color variant of the logo
   * @default 'default'
   */
  color?: "default" | "gray";
  /**
   * Whether to show the logo in dark mode
   */
  dark?: boolean;
}

export function Logo({
  variant = "full",
  size = "md",
  color = "default",
  dark = false,
  className,
  ...props
}: LogoProps) {
  // Convert size to pixels if it's a preset
  const sizeInPx = typeof size === "string" ? LOGO_SIZES[size] : size;

  const logoSrc = `/logo/${
    variant === "circle"
      ? "logo"
      : variant === "text"
      ? "logo-text"
      : "logo-full"
  }${dark ? "-dark" : ""}.svg`;

  return (
    <div className={cn("relative inline-block", className)} {...props}>
      <Image
        src={logoSrc}
        alt="Halfday Logo"
        width={sizeInPx}
        height={sizeInPx}
        className={cn("object-contain h-[inherit]", className)}
        priority
      />
    </div>
  );
}
