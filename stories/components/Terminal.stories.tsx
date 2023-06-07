import type { Meta, StoryObj } from "@storybook/react";

import { Terminal } from "@/components/Terminal";

const meta: Meta<typeof Terminal> = {
  component: Terminal,
  argTypes: {
    label: {
      options: ["Normal", "Bold", "Italic"],
      mapping: {
        Bold: <b>Bold</b>,
        Italic: <i>Italic</i>,
      },
    },
  },
};

export default meta;

export const Component: StoryObj = {};
