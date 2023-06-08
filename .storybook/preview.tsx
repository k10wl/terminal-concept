import type { Preview } from "@storybook/react";

import "@/app/globals.css";
import { withThemeByClassName } from "@storybook/addon-styling";
import { inter } from "../lib/fonts";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = [
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "dark",
  }),
  (Story) => (
    <div
      className={`${inter.className} bg-dots fixed inset-0 bg-gray-50 text-gray-950 dark:bg-gray-950 dark:text-gray-50`}
    >
      <Story />
    </div>
  ),
];

export default preview;
