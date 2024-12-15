export const neumorphic = {
  base: "bg-neutral-100 dark:bg-neutral-900 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]",
  raised:
    "shadow-[6px_6px_12px_rgba(0,0,0,0.15),_-6px_-6px_12px_rgba(255,255,255,0.25)] dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),_-6px_-6px_12px_rgba(255,255,255,0.05)]",
  pressed:
    "shadow-[inset_6px_6px_12px_rgba(0,0,0,0.15),_inset_-6px_-6px_12px_rgba(255,255,255,0.25)] dark:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.3),_inset_-6px_-6px_12px_rgba(255,255,255,0.05)]",
  interactive:
    "hover:shadow-[4px_4px_8px_rgba(0,0,0,0.15),_-4px_-4px_8px_rgba(255,255,255,0.25)] dark:hover:shadow-[4px_4px_8px_rgba(0,0,0,0.3),_-4px_-4px_8px_rgba(255,255,255,0.05)] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.15),_inset_-4px_-4px_8px_rgba(255,255,255,0.25)] dark:active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),_inset_-4px_-4px_8px_rgba(255,255,255,0.05)]",
} as const;

export const glass = {
  base: "bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10",
  raised:
    "shadow-lg bg-white/15 dark:bg-black/15 backdrop-blur-lg border border-white/30 dark:border-white/15",
  pressed:
    "shadow-inner bg-black/5 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/5",
  interactive:
    "hover:bg-white/20 dark:hover:bg-black/20 active:bg-black/5 dark:active:bg-white/5 transition-all duration-200",
} as const;

export const depth = {
  surface: "bg-neutral-50 dark:bg-neutral-900",
  raised: "bg-white dark:bg-neutral-800",
  sunken: "bg-neutral-100 dark:bg-neutral-950",
  overlay: "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm",
} as const;

export const animation = {
  fadeIn: "animate-fadeIn",
  slideUp: "animate-slideUp",
  slideDown: "animate-slideDown",
  scaleUp: "animate-scaleUp",
  bounce: "animate-bounce",
} as const;

export const transition = {
  fast: "transition-all duration-200 ease-in-out",
  normal: "transition-all duration-300 ease-in-out",
  slow: "transition-all duration-500 ease-in-out",
} as const;

// Compound styles for specific components
export const profileStyles = {
  container: {
    outer: `${depth.surface} rounded-3xl p-6 ${transition.normal}`,
    inner: `${glass.base} rounded-2xl p-4 ${transition.normal}`,
    section: `${neumorphic.base} rounded-xl p-4 ${transition.normal}`,
  },
  header: {
    collapsed: `${glass.base} backdrop-blur-lg sticky top-0 z-10 ${transition.normal}`,
    expanded: `bg-transparent ${transition.normal}`,
  },
  avatar: {
    container: `${neumorphic.raised} rounded-full p-1 ${transition.normal}`,
    placeholder: `${glass.base} rounded-full flex items-center justify-center ${transition.normal}`,
  },
  button: {
    primary: `${neumorphic.base} ${neumorphic.interactive} rounded-lg px-4 py-2 ${transition.fast}`,
    secondary: `${glass.base} ${glass.interactive} rounded-lg px-4 py-2 ${transition.fast}`,
    icon: `${neumorphic.base} ${neumorphic.interactive} rounded-full p-2 ${transition.fast}`,
  },
} as const;
