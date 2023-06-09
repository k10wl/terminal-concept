const ABORT_MESSAGE = "Delay aborted.";

/**
 * Creates a synthetic delay that resolves after the specified time interval or aborts if aborted.
 *
 * @param {number} delay - The time interval in milliseconds.
 * @param {AbortSignal} [signal] - Optional AbortSignal to abort the delay.
 * @returns {Promise<void>} A promise that resolves after the specified delay or aborts if aborted.
 */
export const createDelay = (delay: number, signal?: AbortSignal) =>
  new Promise((resolve, reject) => {
    const timeoutId = setTimeout(resolve, delay);

    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timeoutId);
        reject(new Error(signal.reason || "Delay aborted."));
      });
    }
  });

/**
 * The message used to indicate that a delay was aborted.
 *
 * @type {string}
 */
createDelay.abortMessage = ABORT_MESSAGE;
