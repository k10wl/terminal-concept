import {
  CHARACTER_REPLACEMENTS,
  REPLACEABLE_CHARACTERS_REG_EX,
} from "@/lib/charMask/constants";
import { getRandomArrayElement } from "@/lib/utils";

/**
 * Replaces characters in a string based on predefined character replacements.
 *
 * @param {string} string - The input string to mask.
 * @param {object} [options] - Optional configuration options.
 * @param {number} [options.replacementChance=1] - The chance of applying a replacement, a number between 0 and 1.
 * @returns {string} The masked string.
 */
export const maskSimilar = (
  string: string,
  options: { replacementChance: number } = { replacementChance: 0.5 },
) =>
  string.replace(REPLACEABLE_CHARACTERS_REG_EX, (char) => {
    if (Math.random() >= options.replacementChance) {
      return char;
    }

    const replacements = CHARACTER_REPLACEMENTS[char];

    if (!replacements) {
      return char;
    }

    return getRandomArrayElement(replacements);
  });
