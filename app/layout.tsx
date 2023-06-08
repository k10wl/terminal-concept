import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";

import { Providers } from "@/components";
import { inter } from "@/lib/fonts";

config.autoAddCss = false;

export const metadata = {
  title: "Terminal",
  description: "Terminal website",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-dots bg-gray-50 text-gray-950 dark:bg-gray-950 dark:text-gray-50`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
