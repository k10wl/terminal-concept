import { getRandomArrayElement } from "./index";

describe("getRandomArrayElement", () => {
  it("returns a random element from the array", () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    jest.spyOn(global.Math, "random").mockReturnValue(0.5);
    expect(getRandomArrayElement(array)).toBe(5); // Since the random index will be 5

    jest.spyOn(global.Math, "random").mockReturnValue(0.1);
    expect(getRandomArrayElement(array)).toBe(1); // Since the random index will be 1

    jest.spyOn(global.Math, "random").mockReturnValue(0.9);
    expect(getRandomArrayElement(array)).toBe(9); // Since the random index will be 9

    // Clean up the mock after the test
    jest.spyOn(global.Math, "random").mockRestore();
  });
});
