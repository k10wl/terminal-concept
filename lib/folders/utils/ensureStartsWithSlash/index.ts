/**
 * Ensures that a string starts with "/".
 *
 * @param {string} str - The input string.
 * @returns {string} The modified string with "/" at the beginning.
 */
export const ensureStartsWithSlash = (str: string): string => {
  if (!str.startsWith("/")) {
    return `/${str}`;
  }
  return str;
};
