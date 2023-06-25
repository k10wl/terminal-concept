import type { Meta, StoryObj } from "@storybook/react";

import { Keyboard } from "@/components/Keyboard";

const meta: Meta<typeof Keyboard> = {
  component: Keyboard,
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
