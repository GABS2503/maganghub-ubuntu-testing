import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VirtualBox Deploy Lab",
  description:
    "A Next.js learning project for deploying to Ubuntu Server in VirtualBox.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
