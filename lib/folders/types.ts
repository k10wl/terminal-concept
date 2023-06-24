export interface Folder {
  directories: Folder["name"][];
  files: string[];
  name: string;
  parent: string;
}

export type FolderMap = Record<string, Folder>;
