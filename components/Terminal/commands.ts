"use client";

export const unknownCommand = () => {
  console.log("command not found");
};

export const COMMANDS: Record<string, () => void> = {
  help: () => console.log("help"),
};
const COMMAND_KEYS = Object.keys(COMMANDS);

export const matchingCommand = (prompt: string) =>
  COMMAND_KEYS.find((command) =>
    command.match(new RegExp(`^${prompt || "_"}(?!$).`)),
  ) || "";
