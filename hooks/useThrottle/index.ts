import { throttle } from "lodash";
import { useMemo } from "react";

export const useThrottle = (...args: Parameters<typeof throttle>) =>
  useMemo(() => throttle(...args), [args]);
