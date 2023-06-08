import classNames from "classnames";
import { Roboto_Mono as RobotoMono } from "next/font/google";

import { Display } from "./Display";
import { Input } from "./Input";

const robotoMono = RobotoMono({ subsets: ["latin"] });

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
