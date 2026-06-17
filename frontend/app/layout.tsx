import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ToastProvider from "./components/ToastProvider";

const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RuralSys",
  description: "Sistema de gestão rural",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <link rel="shortcut icon" href="/RS-icon.png" type="image/x-icon" />
      <body className={manrope.className}>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}