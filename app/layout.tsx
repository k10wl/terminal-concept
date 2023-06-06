import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Terminal",
  description: "Terminal website",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-dots bg-gray-50 text-gray-950 dark:bg-gray-950 dark:text-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
