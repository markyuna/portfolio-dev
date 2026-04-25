import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marcos Suarez — Web Developer",
  description: "Premium portfolio of Marcos Suarez, web developer based in Paris.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}