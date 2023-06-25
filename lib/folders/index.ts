import * as fs from "fs";

import { isTruthy } from "@/lib/utils";

import { Folder, FolderMap } from "./types";
import { ensureStartsWithSlash, normalizePathSlashes } from "./utils";

let folderFlatMap: FolderMap = {};

const recursiveHydrateFolders = (path: string, innerPath = "/", depth = 0) => {
  if (depth === 10) {
    throw new Error("Max depth exceeded upon folder hydration");
  }

  const pathArr = innerPath.split(/\//g).filter(isTruthy);

  const name = pathArr.pop() || "/";
  const parent = ensureStartsWithSlash(pathArr.join("/"));

  const directories: string[] = [];
  const files: string[] = [];

  fs.readdirSync(path, { withFileTypes: true }).forEach((dirent) =>
    dirent.isDirectory()
      ? directories.push(dirent.name)
      : files.push(dirent.name),
  );

  folderFlatMap[innerPath] = {
    name,
    parent,
    directories,
    files,
  };

  directories.forEach((directory) =>
    recursiveHydrateFolders(
      `${path}/${directory}`,
      normalizePathSlashes(`${innerPath}/${directory}`),
      depth + 1,
    ),
  );
};

export const init = (path: string) => {
  folderFlatMap = {};
  recursiveHydrateFolders(path);
  return folderFlatMap;
};

export const read = (path: string): Folder | null =>
  folderFlatMap[path] ?? null;

export * from "./types";
export { normalizePathSlashes } from "./utils";
