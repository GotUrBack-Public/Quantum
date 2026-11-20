import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quantum",
  description: "Private communication, designed around you.",
  referrer: "no-referrer",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
