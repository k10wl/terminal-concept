import {
  faFileCode,
  faFilePdf,
  faFolder,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link, { LinkProps } from "next/link";
import { extname } from "path";

import * as folders from "@/lib/folders";
import { normalizePathSlashes } from "@/lib/folders";

const iconStrategy = {
  ".pdf": <FontAwesomeIcon icon={faFilePdf} />,
  ".html": <FontAwesomeIcon icon={faFileCode} />,
  directory: <FontAwesomeIcon icon={faFolder} />,
  parent: <FontAwesomeIcon icon={faFolderOpen} />,
};

function FolderLink({
  href,
  name,
  type = "directory",
}: LinkProps & { name: string; type?: string }) {
  return (
    <Link
      href={href}
      className="interactive flex items-center gap-2 rounded px-2"
    >
      {type in iconStrategy
        ? iconStrategy[type as keyof typeof iconStrategy]
        : iconStrategy.directory}
      <p>{name}</p>
    </Link>
  );
}

function NotFound() {
  return (
    <div>
      <FolderLink href="?path=/" name="root" type="parent" />
    </div>
  );
}

export async function Folders({ searchParams = {} }: PropsWithParams) {
  let path = "";

  if (
    "path" in searchParams &&
    typeof searchParams.path === "string" &&
    searchParams.path.trim()
  ) {
    path = searchParams.path;
  }

  const folder = folders.read(path || "/");

  if (!folder) {
    return <NotFound />;
  }

  const contents = folder.directories.concat(folder.files).sort();

  return (
    <div>
      <ul>
        {folder.name !== folder.parent && (
          <li>
            <FolderLink
              href={`?path=${folder.parent}`}
              name=".."
              type="parent"
            />
          </li>
        )}
        {contents.map((childName) => {
          const childPath = normalizePathSlashes(`${path}/${childName}`);
          const type = extname(childName) || "directory";

          return (
            <li key={childPath}>
              <FolderLink
                href={`?path=${childPath}`}
                name={childName}
                type={type}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
