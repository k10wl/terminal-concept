import { robotoMono } from "@/lib/fonts";

import { Display } from "./Display";
import { Input } from "./Input";

export function Terminal() {
  return (
    <div
      className={`${robotoMono.className} flex h-full flex-col justify-between gap-2`}
    >
      <Display />
      <Input />
    </div>
  );
}
