/**
 * Normalizes slashes in a filesystem path, replacing consecutive ones with a single slash.
 *
 * @param {string} path - The input path string.
 * @return {string} The path string with normalized slashes.
 */
export const normalizePathSlashes = (path: string) =>
  path.replace(/\/+\//g, "/");
