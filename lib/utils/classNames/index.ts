import clsx, { ClassValue } from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";

export const classNames = (...args: (ClassNameValue | ClassValue)[]) =>
  twMerge(clsx(args).split(" "));
