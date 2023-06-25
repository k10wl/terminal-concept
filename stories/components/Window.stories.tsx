import type { Meta, StoryObj } from "@storybook/react";

import { Window } from "@/components";

const meta: Meta<typeof Window> = {
  component: Window,
};

export default meta;

export const Component: StoryObj = {
  args: {
    title: {
      name: "Window title",
      description: "description",
      children: <h1>test</h1>,
    },
  },
  render: () => (
    <Window title={{ name: "Title", description: "description" }}>
      <h1>child element</h1>
    </Window>
  ),
};
