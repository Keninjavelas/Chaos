// src/layout.tsx (updated to use archive fonts)
import type { Metadata } from "next";
import { Special_Elite, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import ArchiveProvider from "@/components/providers/ArchiveProvider";
import { ArchiveDebugPanel } from "@/components/debug/ArchiveDebugPanel";

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-primary",
});

const cormorant = Cormorant_Garamond({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-secondary",
});

export const metadata: Metadata = {
  title: "Project Archive AK-27",
  description: "Interactive psychological archive portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${specialElite.variable} ${cormorant.variable} h-full antialiased`}> 
      <body className="min-h-full flex flex-col bg-background text-foreground font-primary" suppressHydrationWarning>
    <ArchiveProvider>
      {children}
    </ArchiveProvider>
    {process.env.NODE_ENV === "development" && <ArchiveDebugPanel />}
      </body>
    </html>
  );
}
