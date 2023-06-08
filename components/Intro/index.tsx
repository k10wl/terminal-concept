"use client";

import { useEffect, useRef } from "react";

import { robotoMono } from "@/lib/fonts";
import { createDelay } from "@/utils";

const STEP_DURATION = 100;

interface Props {
  onContinue: () => void;
}

export function Intro({ onContinue }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const enterAnimation = async () => {
      if (!logoRef.current || !containerRef.current) {
        return;
      }

      const initialScopeClassname = containerRef.current.className;
      const initialLogoClassName = logoRef.current.className;

      // Show initial empty screen
      await createDelay(STEP_DURATION * 5);

      // Show underline and dotted background
      containerRef.current.className = `${initialScopeClassname} bg-dots`;
      logoRef.current.className = `${initialLogoClassName} before:absolute before:left-1/2 before:top-full before:h-1 before:w-[120%] before:-translate-x-1/2 before:translate-y-10 before:bg-gray-950 before:dark:bg-gray-50`;
      await createDelay(STEP_DURATION * 0.5);

      // Display intro text
      logoRef.current.className = `${initialLogoClassName} border-b-4 border-gray-950 dark:border-gray-50 !text-inherit`;
      await createDelay(STEP_DURATION * 2);

      // Hide bg-dots
      containerRef.current.className = initialScopeClassname;
      await createDelay(STEP_DURATION * 2);

      // Show bg-dots and filled rectangle
      containerRef.current.className = `${containerRef.current.className} before:absolute before:left-1/2 before:top-1/2 before:bg-gray-950 before:dark:bg-gray-50 before:w-1/2 before:h-1/2 before:opacity-[0.02] before:-translate-x-[70%] before:-translate-y-[70%]`;
      logoRef.current.className = `${initialLogoClassName} bg-gray-950 dark:bg-gray-50`;
      await createDelay(STEP_DURATION * 2);

      // Show bg-dots
      containerRef.current.className = `${initialScopeClassname} bg-dots`;
      await createDelay(STEP_DURATION * 1.5);

      // Show text with border behind and show "continue" text
      logoRef.current.className = `${initialLogoClassName} border-4 border-gray-950 dark:border-gray-50 !text-inherit`;
      if (logoRef.current.lastElementChild) {
        logoRef.current.lastElementChild.setAttribute("aria-hidden", "false");
      }
    };

    enterAnimation();

    window.addEventListener("keydown", onContinue, { once: true });
    window.addEventListener("click", onContinue, { once: true });

    return () => {
      window.removeEventListener("keydown", onContinue);
      window.removeEventListener("click", onContinue);
    };
  }, [onContinue]);

  return (
    <div
      className={`${robotoMono.className} fixed inset-0 cursor-default select-none bg-gray-50 dark:bg-gray-950`}
    >
      <div ref={containerRef} className="absolute inset-0">
        <div
          ref={logoRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-10 py-2 text-transparent"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl">k10wl</h1>
          <p
            aria-hidden
            className="absolute left-1/2 top-full w-full -translate-x-1/2 translate-y-1/2 animate-pulse text-center uppercase aria-hidden:hidden"
          >
            Press any key to continue
          </p>
        </div>
      </div>
    </div>
  );
}
