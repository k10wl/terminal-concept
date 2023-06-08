/**
 * Creates a synthetic delay that resolves after the specified time interval.
 *
 * @param {number} delay - The time interval in milliseconds.
 * @returns {Promise<null>} A promise that resolves after the specified delay.
 */
export const createDelay = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, delay);
  });
