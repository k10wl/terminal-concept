import { ensureStartsWithSlash } from "./index";

describe("ensureStartsWithSlash", () => {
  it("should add a slash to the beginning of a string without a slash", () => {
    const result = ensureStartsWithSlash("example");
    expect(result).toBe("/example");
  });

  it("should not modify a string that already starts with a slash", () => {
    const result = ensureStartsWithSlash("/example");
    expect(result).toBe("/example");
  });

  it("should add a slash to the beginning of an empty string", () => {
    const result = ensureStartsWithSlash("");
    expect(result).toBe("/");
  });

  it("should not modify a string that consists only of a slash", () => {
    const result = ensureStartsWithSlash("/");
    expect(result).toBe("/");
  });
});
