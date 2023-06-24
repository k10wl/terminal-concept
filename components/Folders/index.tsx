import Link from "next/link";

import * as folders from "@/lib/folders";

export async function Folders({ searchParams = {} }: PropsWithParams) {
  let path = "/";

  if (
    "path" in searchParams &&
    typeof searchParams.path === "string" &&
    searchParams.path.trim()
  ) {
    path = searchParams.path;
  }

  const folder = folders.read(path);
  console.log(folder);
  if (!folder) {
    return null;
  }

  return (
    <div>
      <ul>
        {folder.name !== folder.parent && (
          <li>
            <Link href={`?path=${folder.parent}`}>..</Link>
          </li>
        )}
        {folder.directories.map((childName) => {
          const childPath = `?path=${folder.parent}/${folder.name}/${childName}`;
          console.log(folder.parent, folder.name, childName);
          return (
            <li key={childPath}>
              <Link href={childName}>{childName}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
