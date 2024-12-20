// import "@/styles/globals/blueGlobals.css";
import "@/styles/globals/orangeGlobals.css";

import RootLayoutWrapper from "@/components/RootLayoutWrapper";

import { cn } from "@/lib/cn";
import { Inter, Playfair_Display } from "next/font/google";

import type { Metadata } from "next";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Cogniba",
  description: "The only proven way to increase your intelligence.",
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>

      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontSerif.variable,
        )}
      >
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}
