import { maskSimilar } from "./index";

describe("maskSimilar", () => {
  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  it("should replace special characters", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0);

    const string = "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.";

    const maskedString = maskSimilar(string);

    expect(typeof maskedString).toBe("string");
    expect(maskedString).not.toBe(string);

    expect(maskSimilar("A")).toMatch(/4/); // 'A' should be replaced with '4'
    expect(maskSimilar("E")).toMatch(/3/); // 'E' should be replaced with '3'
    expect(maskSimilar("O")).toMatch(/[0*#]/); // 'O' should be replaced with one of '[0*#]'
    expect(maskSimilar("S")).toMatch(/[$]/); // 'S' should be replaced with '$'
    expect(maskSimilar("I")).toMatch(/[1|!]/); // 'I' should be replaced with one of '[1|!]'
  });

  it("should take chance of replacement as options argument", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);

    const maskedString1 = maskSimilar("A", { replacementChance: 0.49 });
    expect(maskedString1).not.toMatch(/4/); // With 0.49 replacement chance, 'A' should not be replaced with '4'

    const maskedString2 = maskSimilar("A", { replacementChance: 0.51 });
    expect(maskedString2).toMatch(/4/); // With 0.51 replacement chance, 'A' should be replaced with '4'
  });
});
