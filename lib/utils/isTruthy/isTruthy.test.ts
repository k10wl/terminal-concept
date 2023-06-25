import { isTruthy } from "./index"; // Replace "yourFile" with the actual file path

describe("isTruthy", () => {
  it("returns true if value is truthy", () => {
    expect(isTruthy(5)).toBe(true);
    expect(isTruthy("hello")).toBe(true);
    expect(isTruthy({})).toBe(true);
    expect(isTruthy([])).toBe(true);
    expect(isTruthy(true)).toBe(true);
  });

  it("returns false if value is falsy", () => {
    expect(isTruthy(undefined)).toBe(false);
    expect(isTruthy(null)).toBe(false);
    expect(isTruthy(false)).toBe(false);
    expect(isTruthy(0)).toBe(false);
    expect(isTruthy("")).toBe(false);
  });
});
