import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PerformanceMonitor } from "@/components/performance-monitor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SaleSync India - Sales Automation Platform",
  description: "WhatsApp-first sales automation platform for Indian B2B market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <PerformanceMonitor />
        {children}
      </body>
    </html>
  );
}
