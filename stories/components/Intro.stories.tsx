import type { Meta, StoryObj } from "@storybook/react";

import { Intro } from "@/components/Intro";

const meta: Meta<typeof Intro> = {
  component: Intro,
};

export default meta;

export const Component: StoryObj = {
  render: () => <Intro onContinue={() => console.log("continue")} />,
};
