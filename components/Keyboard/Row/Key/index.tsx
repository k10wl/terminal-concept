import classNames from "classnames";

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
      <span
        className={classNames(
          "relative inline-block aspect-square h-10 w-full truncate rounded align-middle text-xs uppercase leading-10 before:absolute before:inset-0 before:rounded before:bg-gray-950 before:opacity-0 before:transition-opacity hover:before:opacity-10 active:before:opacity-100 dark:before:bg-gray-50",
          border && "border border-gray-950/25 dark:border-gray-50/25",
          pressed && "before:opacity-100",
        )}
      >
        {name}
      </span>
    </li>
  );
}
