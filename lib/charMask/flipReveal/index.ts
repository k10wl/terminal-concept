import { ALPHABET } from "@/lib/charMask/constants";
import { getSequentialArrayElement } from "@/lib/utils";

const FLIP_DURATION = 33;

/**
 * Performs a flip reveal animation on a string by replacing each character sequentially over a specified duration.
 *
 * @param {string} string - The input string to animate.
 * @param {(str: string) => void} onChange - The callback function to be called on each animation frame with the updated string.
 * @param {number} duration - The duration of the animation in milliseconds.
 * @returns {void}
 */
export const flipReveal = (
  string: string,
  onChange: (str: string) => void,
  duration: number,
): void => {
  let iterations = Math.floor(duration / FLIP_DURATION);
  const char = getSequentialArrayElement([...ALPHABET].reverse());

  const interval = setInterval(() => {
    iterations -= 1;

    if (!iterations) {
      clearInterval(interval);
      onChange(string);
      return;
    }

    onChange(string.replace(/./gi, char.next().value));
  }, FLIP_DURATION);
};
