"use client";

import { PropsWithChildren } from "react";

import { Intro } from "@/components/Intro";
import { IntroAnimation } from "@/components/Providers/IntroAnimation";
import { Theme } from "@/components/Providers/Theme";

export function Providers({ children }: PropsWithChildren) {
  return (
    <Theme>
      <IntroAnimation animationSequence={[Intro]}>{children}</IntroAnimation>
    </Theme>
  );
}
