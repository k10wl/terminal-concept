"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

export function Theme({ children }: PropsWithChildren) {
  return (
    <ThemeProvider enableSystem attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  );
}
