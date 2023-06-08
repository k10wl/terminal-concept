import classNames from "classnames";

import { robotoMono } from "@/lib/fonts";

import { Display } from "./Display";
import { Input } from "./Input";

export function Terminal() {
  return (
    <div
      className={classNames(
        robotoMono.className,
        "flex h-full flex-col justify-between gap-2",
      )}
    >
      <Display />
      <Input />
    </div>
  );
}
