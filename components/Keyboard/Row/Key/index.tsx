import { classNames } from "@/lib/utils";

interface Props {
  name: string;
  pressed: boolean;
  grow: boolean;
  border: boolean;
}

export function Key({ name, pressed, grow, border }: Props) {
  return (
    <li
      className={classNames(
        "m-1 inline-block shrink-0 rounded text-center first:text-left last:text-end [&>span]:first:pl-2 [&>span]:last:pr-2",
        grow && "flex-1",
      )}
    >
      <button
        type="button"
        className={classNames(
          "interactive active:contrast-bg relative inline-block aspect-square h-10 w-full truncate rounded-md align-middle text-xs uppercase leading-10",
          border && "border border-gray-950/25 dark:border-gray-50/25",
          pressed && "contrast-bg",
        )}
      >
        {name}
      </button>
    </li>
  );
}
