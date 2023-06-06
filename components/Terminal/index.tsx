import { Display } from "./Display";
import { Input } from "./Input";

export function Terminal() {
  return (
    <div className="flex h-full flex-col justify-between gap-2 border border-opacity-50 p-5 pb-2 pt-0">
      <Display />
      <Input />
    </div>
  );
}
