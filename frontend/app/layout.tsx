import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PerformanceMonitor } from "@/components/performance-monitor";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RavenSales - AI-Powered Sales Automation Platform",
  description: "Global B2B sales automation platform with LinkedIn, Email, and multi-channel outreach at ravensales.ai",
  icons: {
    icon: [
      { url: "/ravensales-logo.jpeg" },
      { url: "/favicon.jpeg" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <PerformanceMonitor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
