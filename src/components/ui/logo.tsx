import Image from "next/image";
import { cn } from "@/lib/utils";

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the logo to display
   * - 'circle': Just the circle logo
   * - 'text': Just the text
   * - 'full': Circle logo with text
   */
  variant?: "circle" | "text" | "full";
  /**
   * The size of the logo in pixels
   * For 'circle' variant, this is the diameter
   * For 'text' and 'full' variants, this is the height
   */
  size?: number;
  /**
   * Whether to show the logo in dark mode
   */
  dark?: boolean;
}

export function Logo({
  variant = "full",
  size = 40,
  dark = false,
  className,
  ...props
}: LogoProps) {
  // Calculate width for text and full variants (maintain aspect ratio)
  const getWidth = () => {
    switch (variant) {
      case "circle":
        return size;
      case "text":
        return size * 3.5; // Approximate aspect ratio for text
      case "full":
        return size * 4; // Approximate aspect ratio for full logo
      default:
        return size;
    }
  };

  const width = getWidth();
  const logoSrc = `/logo/${variant === "circle" ? "logo" : variant === "text" ? "logo-text" : "logo-full"}.svg`;

  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ width, height: size }}
      {...props}
    >
      <Image
        src={logoSrc}
        alt="Halfday Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
