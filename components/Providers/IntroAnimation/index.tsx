"use client";

import { PropsWithChildren, useCallback, useState } from "react";

import { Intro } from "@/components/Intro";

const ANIMATION_SEQUENCE = [Intro] as const;

export function IntroAnimation({ children }: PropsWithChildren) {
  const [finished, setFinished] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const proceedToNextStep = useCallback(() => {
    setCurrentStep((prevState) => {
      if (prevState + 1 === ANIMATION_SEQUENCE.length) {
        setFinished(true);
        return prevState;
      }

      return prevState + 1;
    });
  }, []);

  if (finished) {
    return children;
  }

  const AnimationComponent = ANIMATION_SEQUENCE[currentStep];

  return <AnimationComponent onContinue={proceedToNextStep} />;
}
