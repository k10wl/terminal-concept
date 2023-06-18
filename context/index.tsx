"use client";

import { PropsWithChildren } from "react";

import { Intro } from "@/components/Intro";
import { IntroAnimation } from "@/context/IntroAnimation";
import { Theme } from "@/context/Theme";

export function ContextProviders({ children }: PropsWithChildren) {
  return (
    <Theme>
      <IntroAnimation animationSequence={[Intro]}>{children}</IntroAnimation>
    </Theme>
  );
}
