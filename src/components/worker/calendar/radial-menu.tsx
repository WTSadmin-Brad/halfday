import { cn } from "@/lib/ui/utils";

interface Location {
  id: string;
  name: string;
}

interface RadialMenuProps {
  isOpen: boolean;
  locations: Location[];
  onSelect: (location: Location) => void;
  className?: string;
  activeColor: string;
}

export function RadialMenu({ isOpen, locations, onSelect, className, activeColor }: RadialMenuProps) {
  const getPosition = (index: number, total: number) => {
    const angleStep = Math.PI / (total - 1);
    const radius = 140;
    
    const angle = index * angleStep;
    const x = Math.sin(angle) * radius;
    const y = -Math.cos(angle) * radius;
    
    return { x, y };
  };

  return (
    <div className={cn(
      "absolute",
      "-translate-x-1/2 -translate-y-1/2",
      className
    )}>
      {locations.map((location, index) => {
        const { x, y } = getPosition(index, locations.length);
        return (
          <button
            key={location.id}
            onClick={() => onSelect(location)}
            className={cn(
              "absolute",
              "w-16 h-16",
              "rounded-full",
              "flex items-center justify-center",
              "transition-all duration-300",
              "bg-white/10",
              "backdrop-blur-[8px]",
              "border border-white/20",
              "text-sm font-medium text-white/90",
              "hover:scale-110",
              "shadow-lg",
              `shadow-${activeColor}/10`,
              isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0",
            )}
            style={{
              transform: `translate(${x}px, ${y}px) translate(-50%, -50%) ${isOpen ? 'scale(1)' : 'scale(0)'}`,
              transitionDelay: `${index * 50}ms`,
            }}
          >
            {location.name}
          </button>
        );
      })}
    </div>
  );
}
