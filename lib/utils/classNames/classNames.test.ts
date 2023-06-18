import { classNames } from "./index";

describe("classNames", () => {
  it("ignores falsy conditional classes", () => {
    const result = classNames(
      "foo",
      { bar: true },
      { baz: false },
      { qux: 0 },
      { quux: null },
      { corge: undefined },
      [true && "baz", false, null, undefined, 0],
      true && "quaz",
      false,
      0,
    );

    expect(result).toBe("foo bar baz quaz");
  });

  it("handles empty arguments and returns an empty string", () => {
    const result = classNames();

    expect(result).toBe("");
  });
});
