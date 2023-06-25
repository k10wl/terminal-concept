/**
 * Checks if a value is truthy (not undefined, null, or false).
 * Provides falsy type filtering compared to using `.filter(Boolean)`.
 *
 * @template T - The type of the value.
 * @param {T | undefined | null | false} value - The value to check.
 * @returns {value is T} Returns true if the value is truthy, false otherwise.
 */
export const isTruthy = <T>(value?: T | undefined | null | false): value is T =>
  !!value;
