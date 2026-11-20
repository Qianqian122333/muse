import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./muse.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muse Prototype",
  description: "Save from the web, arrange on an infinite canvas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable} data-theme="light">
      <body>{children}</body>
    </html>
  );
}
