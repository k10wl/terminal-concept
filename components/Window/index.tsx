import { ComponentProps, PropsWithChildren } from "react";

import { TitleBar } from "@/components/Window/TitleBar";

type Props = ComponentProps<typeof TitleBar> & PropsWithChildren;

export function Window({ title, children }: Props) {
  return (
    <div className="flex h-full flex-col">
      <TitleBar title={title} />
      <div className="flex-1 p-2">{children}</div>
    </div>
  );
}
