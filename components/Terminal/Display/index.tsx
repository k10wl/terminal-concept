"use client";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import React, { useRef, useState } from "react";

import { useThrottle } from "@/hooks";

const revealAnimation: MotionProps = {
  variants: {
    visible: { opacity: 100, translate: "0 0%" },
    hidden: { opacity: 0, translate: "0 100%" },
  },
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
};

export function Display() {
  const [hasScrolled, setHasScrolled] = useState(false);

  const logsRef = useRef<HTMLElement>(null);

  const handleScroll = useThrottle(
    (scrollEvent: React.UIEvent<HTMLElement>) => {
      if (scrollEvent.target instanceof HTMLElement) {
        setHasScrolled(!!scrollEvent.target.scrollTop);
      }
    },
    50,
  );

  const handleScrollDownClick = () => {
    logsRef.current?.scrollTo({ behavior: "smooth", top: 0 });
  };

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <article
        className="relative flex flex-1 flex-col-reverse overflow-auto"
        onScroll={handleScroll}
        ref={logsRef}
      >
        <div />
      </article>

      <AnimatePresence>
        {hasScrolled && (
          <>
            <motion.button
              type="button"
              initial={revealAnimation.initial}
              animate={revealAnimation.animate}
              exit={revealAnimation.exit}
              variants={revealAnimation.variants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-2 right-5 grid h-9 w-9 origin-center place-items-center rounded-full border border-gray-950 p-2 dark:border-gray-50"
              onClick={handleScrollDownClick}
            >
              <FontAwesomeIcon icon={faAngleDown} />
            </motion.button>

            <motion.div
              initial={revealAnimation.initial}
              animate={revealAnimation.animate}
              exit={revealAnimation.exit}
              variants={revealAnimation.variants}
              className={classNames(
                "absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-950 to-transparent dark:via-gray-50",
              )}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
