"use client";

import { PropsWithChildren } from "react";

import { IntroAnimation } from "@/components/Providers/IntroAnimation";
import { Theme } from "@/components/Providers/Theme";

export function Providers({ children }: PropsWithChildren) {
  return (
    <Theme>
      <IntroAnimation>{children}</IntroAnimation>
    </Theme>
  );
}
