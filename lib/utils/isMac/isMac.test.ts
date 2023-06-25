import { isMac } from "./index";

describe("isMac", () => {
  beforeEach(() => {
    Object.defineProperty(window.navigator, "userAgentData", {
      value: undefined,
      configurable: true,
    });
  });

  it("should return true when the platform is macOS", () => {
    Object.defineProperty(window.navigator, "userAgentData", {
      value: {
        platform: "MacIntel",
      },
      configurable: true,
    });

    const result = isMac();

    expect(result).toBe(true);
  });
  it("should return true when the platform is macOS", () => {
    Object.defineProperty(window.navigator, "platform", {
      value: "MacIntel",
      configurable: true,
    });

    const result = isMac();

    expect(result).toBe(true);
  });

  it("should return false when the platform is Windows", () => {
    Object.defineProperty(window.navigator, "platform", {
      value: "Win32",
      configurable: true,
    });

    const result = isMac();

    expect(result).toBe(false);
  });

  it("should return false when the platform is Linux", () => {
    Object.defineProperty(window.navigator, "platform", {
      value: "Linux x86_64",
      configurable: true,
    });

    const result = isMac();

    expect(result).toBe(false);
  });

  it("should return false when the platform is iOS", () => {
    Object.defineProperty(window.navigator, "userAgentData", {
      value: {
        platform: "iPhone",
      },
      configurable: true,
    });

    const result = isMac();

    expect(result).toBe(false);
  });

  it("should return false when the platform is Android", () => {
    Object.defineProperty(window.navigator, "userAgentData", {
      value: {
        platform: "Linux armv8l",
      },
      configurable: true,
    });

    const result = isMac();

    expect(result).toBe(false);
  });
});
