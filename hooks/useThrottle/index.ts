import throttle from "lodash/throttle";
import { useMemo } from "react";

/**
 * Custom hook that returns a throttled version of the provided function.
 *
 * @param {...Parameters<typeof throttle>} args - Arguments to be passed to the throttle function.
 * @returns {Function} Throttled function.
 */
export const useThrottle = (...args: Parameters<typeof throttle>) =>
  useMemo(() => throttle(...args), [args]);
