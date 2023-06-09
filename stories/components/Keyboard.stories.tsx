import type { Meta, StoryObj } from "@storybook/react";

import { Keyboard } from "@/components";

const meta: Meta<typeof Keyboard> = {
  component: Keyboard,
};

export default meta;

export const Component: StoryObj = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
