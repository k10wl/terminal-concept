export const CHARACTER_REPLACEMENTS: Record<string, string[]> = {
  A: ["4"],
  E: ["3"],
  O: ["0", "*", "#"],
  S: ["$"],
  I: ["1", "!"],
};

export const REPLACEABLE_CHARACTERS_REG_EX = new RegExp(
  `[${Object.keys(CHARACTER_REPLACEMENTS).join("")}]`,
  "g",
);

export const ALPHABET = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
