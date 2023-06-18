"use client";

import { useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

import { maskSimilar } from "@/lib/charMask";
import { robotoMono } from "@/lib/fonts";
import { createDelay } from "@/lib/utils";

interface Props {
  onContinue: () => void;
}

const PRESS_ANY_KEY_TO_CONTINUE = "PRESS ANY KEY TO CONTINUE";

export function Intro({ onContinue }: Props) {
  const [secondaryText, setSecondaryText] = useState(PRESS_ANY_KEY_TO_CONTINUE);
  const [scope, animate] = useAnimate();

  const handleGlitchSecondaryText = () => {
    let replacements = 5;

    const interval = setInterval(() => {
      replacements -= 1;
      if (!replacements) {
        clearInterval(interval);
        setSecondaryText(PRESS_ANY_KEY_TO_CONTINUE);
        return;
      }

      setSecondaryText(maskSimilar(PRESS_ANY_KEY_TO_CONTINUE));
    }, 100);
  };

  useEffect(() => {
    let intervalGlitchSecondaryText: NodeJS.Timer;
    const enterAnimation = async (signal: AbortSignal) => {
      animate("span", { color: "transparent" }, { duration: 0 });
      await createDelay(200, signal);

      animate(scope.current, { opacity: 1 }, { duration: 0 });
      animate(
        "h1",
        {
          padding: "1rem",
          borderLeftColor: "transparent",
          borderTopColor: "transparent",
          borderRightColor: "transparent",
          color: "inherit",
        },
        { duration: 0 },
      );

      await createDelay(200, signal);

      animate(
        "h1",
        {
          padding: "unset",
        },
        { duration: 0 },
      );
      animate("span", { color: "inherit" }, { duration: 0 });

      await createDelay(200, signal);

      animate('div[aria-label="dots"]', { visibility: "hidden" });
      animate('div[aria-label="mask"]', { visibility: "visible" });

      await createDelay(300, signal);

      animate('div[aria-label="dots"]', { visibility: "visible" });

      await createDelay(200, signal);

      animate('div[aria-label="mask"]', { visibility: "hidden" });

      animate(
        "h1",
        {
          borderColor: "unset",
        },
        { duration: 0 },
      );
      animate("p", { visibility: "visible" });

      intervalGlitchSecondaryText = setInterval(
        handleGlitchSecondaryText,
        5_000,
      );
      handleGlitchSecondaryText();
    };

    const abortController = new AbortController();
    enterAnimation(abortController.signal).catch((e) => {
      if (e instanceof Error && e.message === createDelay.abortMessage) {
        // animation canceled es expected
        return;
      }

      throw e;
    });

    const handleOnContinue = () => {
      clearInterval(intervalGlitchSecondaryText);
      abortController.abort(createDelay.abortMessage);
      onContinue();
      window.removeEventListener("keydown", handleOnContinue);
      window.removeEventListener("click", handleOnContinue);
    };

    window.addEventListener("keydown", handleOnContinue);
    window.addEventListener("click", handleOnContinue);
  }, [animate, onContinue, scope]);

  return (
    <div
      className={`${robotoMono.className} fixed inset-0 cursor-default select-none bg-gray-50 dark:bg-gray-950`}
    >
      <main
        ref={scope}
        className="absolute inset-0 grid place-items-center opacity-0"
      >
        <div aria-label="dots" className="bg-dots absolute inset-0" />

        <section
          onPointerEnter={handleGlitchSecondaryText}
          onPointerLeave={handleGlitchSecondaryText}
          className="text-center"
        >
          <h1 className="relative box-content border-2 text-6xl sm:text-8xl">
            <span className="px-3 py-1">k10wl</span>
            <div
              aria-label="mask"
              className="invisible absolute inset-0 bg-gray-950 dark:bg-gray-50"
            />
          </h1>
          <p className="invisible animate-pulse">{secondaryText}</p>
        </section>
      </main>
    </div>
  );
}
