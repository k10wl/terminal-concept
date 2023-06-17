"use client";

import { useAnimate } from "framer-motion";
import { useEffect } from "react";

import { robotoMono } from "@/lib/fonts";
import { createDelay } from "@/lib/utils";

interface Props {
  onContinue: () => void;
}

export function Intro({ onContinue }: Props) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const enterAnimation = async (signal: AbortSignal) => {
      await createDelay(200, signal);

      animate(scope.current, { opacity: 1 }, { duration: 0 });
      animate(scope.current, { opacity: "transparent" }, { duration: 0 });
      animate(
        "h1",
        {
          padding: "1rem",
          borderLeftColor: "transparent",
          borderTopColor: "transparent",
          borderRightColor: "transparent",
        },
        { duration: 0 },
      );

      await createDelay(500, signal);

      animate(scope.current, { color: "unset" }, { duration: 0 });
      animate("h1", { padding: "unset" });

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
      <div
        ref={scope}
        className="absolute inset-0 grid place-items-center opacity-0"
      >
        <div aria-label="dots" className="bg-dots absolute inset-0" />

        <main className="text-center">
          <h1 className="relative box-content border-2 text-6xl sm:text-8xl">
            <span className="px-3 py-1">k10wl</span>
            <div
              aria-label="mask"
              className="invisible absolute inset-0 bg-gray-950 dark:bg-gray-50"
            />
          </h1>
          <p className="invisible animate-pulse">Press any key to continue</p>
        </main>
      </div>
    </div>
  );
}
