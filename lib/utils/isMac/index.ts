"use client";

/**
 * Determines whether the current platform is macOS.
 * @returns {boolean} A boolean indicating if the platform is macOS.
 */
export const isMac = (): boolean => {
  let platform = "";

  if (
    "userAgentData" in navigator &&
    navigator.userAgentData instanceof Object &&
    "platform" in navigator.userAgentData &&
    typeof navigator.userAgentData.platform === "string"
  ) {
    platform = navigator.userAgentData.platform;
  }

  if (!platform && navigator.platform) {
    platform = navigator.platform;
  }

  return /mac/gi.test(platform);
};
