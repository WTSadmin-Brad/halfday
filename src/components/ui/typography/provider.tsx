import * as React from "react";
import type { TypographyContextValue } from "@/lib/typography/types";

const TypographyContext = React.createContext<TypographyContextValue>({});

export const useTypography = () => {
  const context = React.useContext(TypographyContext);
  if (context === undefined) {
    throw new Error("useTypography must be used within a TypographyProvider");
  }
  return context;
};

interface TypographyProviderProps extends TypographyContextValue {
  children: React.ReactNode;
}

export function TypographyProvider({
  children,
  variant,
  align,
}: TypographyProviderProps) {
  const value = React.useMemo(
    () => ({
      variant,
      align,
    }),
    [variant, align]
  );

  return (
    <TypographyContext.Provider value={value}>
      {children}
    </TypographyContext.Provider>
  );
}
