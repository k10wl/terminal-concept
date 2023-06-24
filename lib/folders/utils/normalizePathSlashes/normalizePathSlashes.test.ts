import { normalizePathSlashes } from "./index";

describe("normalizePathSlashes", () => {
  test("it should replace multiple consecutive slashes with a single one", () => {
    expect(normalizePathSlashes("/foo////bar")).toBe("/foo/bar");
    expect(normalizePathSlashes("foo")).toBe("foo");
    expect(normalizePathSlashes("////")).toBe("/");
  });
});
