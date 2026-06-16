import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ToastProvider from "./components/ToastProvider";

const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RuralSys",
  description: "Sistema de gerenciamento para agricultores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={manrope.className}>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}