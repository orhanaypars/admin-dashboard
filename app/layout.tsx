import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "İnternet Prog. Final Projesi",
  description: "İnternet Programcılığı Final Projesi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
