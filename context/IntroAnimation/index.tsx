"use client";

import { PropsWithChildren, ReactNode, useCallback, useState } from "react";

interface Props extends PropsWithChildren {
  animationSequence: ((props: { onContinue: () => void }) => ReactNode)[];
}

export function IntroAnimation({ children, animationSequence }: Props) {
  const [finished, setFinished] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const proceedToNextStep = useCallback(() => {
    setCurrentStep((prevState) => {
      if (prevState + 1 === animationSequence.length) {
        setFinished(true);
        return prevState;
      }

      return prevState + 1;
    });
  }, [animationSequence.length]);

  if (finished) {
    return children;
  }

  const AnimationComponent = animationSequence[currentStep];

  return <AnimationComponent onContinue={proceedToNextStep} />;
}
