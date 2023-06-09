"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { Row } from "@/components/Keyboard/Row";
import { useTriggerRerender } from "@/hooks";
import { isMac } from "@/utils";

import { activeKeyCodes, KEYBOARD_LAYOUT } from "./contants";

export function Keyboard() {
  const ref = useRef<HTMLDivElement>(null);
  const triggerRerender = useTriggerRerender();

  useEffect(() => {
    const addKeyCode = (e: KeyboardEvent) => {
      activeKeyCodes.set(e.code, true);
      triggerRerender();
    };
    const removeKeyCode = (e: KeyboardEvent) => {
      activeKeyCodes.delete(e.code);

      if (e.code.match(/^meta/i) && isMac()) {
        activeKeyCodes.clear();
      }

      triggerRerender();
    };

    window.addEventListener("keydown", addKeyCode);
    window.addEventListener("keyup", removeKeyCode);

    return () => {
      window.removeEventListener("keydown", addKeyCode);
      window.removeEventListener("keyup", removeKeyCode);
    };
  }, [triggerRerender]);

  useEffect(() => {
    const handleUpdateKeyboardSize = () => {
      const keyboardParent = ref.current?.parentElement;
      if (!keyboardParent) {
        return;
      }

      const { width, height } = ref.current.getBoundingClientRect();
      keyboardParent.style.setProperty("width", `${width}px`);
      keyboardParent.style.setProperty("height", `${height}px`);
    };

    handleUpdateKeyboardSize();

    window.addEventListener("resize", handleUpdateKeyboardSize);

    return () => {
      window.removeEventListener("resize", handleUpdateKeyboardSize);
    };
  }, []);

  return (
    <div className="@container">
      <div className="relative m-auto">
        <motion.div
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(100% at 50% 50%)" }}
          transition={{ duration: 1, delay: 0.2 }}
          ref={ref}
          className="absolute left-1/2 top-1/2 mx-auto w-[710px] -translate-x-1/2 -translate-y-1/2 scale-[0.4] select-none @xs:scale-[0.45] @sm:scale-50 @md:scale-[0.6] @lg:scale-[0.7] @xl:scale-[0.8] @2xl:scale-[0.9] @3xl:scale-100"
        >
          {KEYBOARD_LAYOUT.map((row) => (
            <Row key={row.id} keys={row.keys} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
