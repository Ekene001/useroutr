import type { Metadata } from "next";
import "./globals.css";
import { Syne, Newsreader, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  weight: ["300", "400"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Tavvio — Pay anything. Settle everywhere.",
  description:
    "The payment infrastructure built for both sides of finance. Accept any currency from any chain. Settle globally in seconds. Built on Stellar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={cn(
        "dark selection:bg-blue/30 selection:text-white",
        syne.variable,
        newsreader.variable,
        jetbrains.variable
      )} 
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
