import { useCallback, useState } from "react";

/**
 * Custom hook that returns a forceUpdate function to force a re-render of the component.
 *
 * @returns {Function} The triggerRerender function.
 */
export const useTriggerRerender = () => {
  const [, setValue] = useState(0);
  return useCallback(() => setValue((value) => value + 1), []);
};
