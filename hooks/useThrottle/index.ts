import throttle from "lodash/throttle";
import { useMemo } from "react";

export const useThrottle = (...args: Parameters<typeof throttle>) =>
  useMemo(() => throttle(...args), [args]);
