import { getSequentialArrayElement } from "./index";

describe("getSequentialArrayElement", () => {
  it("generates sequential elements from the array in an infinite loop", () => {
    const array = ["a", "b", "c"];
    const generator = getSequentialArrayElement(array);

    expect(generator.next().value).toBe("a");
    expect(generator.next().value).toBe("b");
    expect(generator.next().value).toBe("c");

    // Loops back to the first element
    expect(generator.next().value).toBe("a");
    expect(generator.next().value).toBe("b");
    expect(generator.next().value).toBe("c");

    // Further calls that should lead to array.at(-2)
    for (let i = 0; i < array.length * 2 - 1; i += 1) {
      generator.next();
    }

    // Verify the generated values are still sequential
    expect(generator.next().value).toBe("c");
    expect(generator.next().value).toBe("a");
    expect(generator.next().value).toBe("b");
  });
});
