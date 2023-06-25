import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";

import { ContextProviders } from "@/context";
import * as folders from "@/lib/folders";
import { inter } from "@/lib/fonts";

config.autoAddCss = false;
folders.init("public/__folders");

export const metadata = {
  title: "Terminal",
  description: "Terminal website",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-dots selection:contrast-bg bg-gray-50 text-gray-950 selection:text-gray-50 dark:bg-gray-950 dark:text-gray-50 dark:selection:text-gray-950`}
      >
        <ContextProviders>{children}</ContextProviders>
      </body>
    </html>
  );
}
