"use client";

import { createContext, PropsWithChildren, useState } from "react";

import { FolderMap } from "@/lib/folders";

const INITIAL_CONTEXT: FolderMap | null = null;
const FoldersContext = createContext<FolderMap | null>(null);

export function Folders({ children }: PropsWithChildren) {
  const [foldersMap] = useState(INITIAL_CONTEXT);

  return (
    <FoldersContext.Provider value={foldersMap}>
      {children}
    </FoldersContext.Provider>
  );
}
