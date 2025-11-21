import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import * as Tooltip from '@radix-ui/react-tooltip';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Application Metadata
 *
 * This metadata is used for SEO (Search Engine Optimization) and social media sharing.
 * It improves how the application appears in search results and when shared on social platforms.
 *
 * Benefits:
 * - Better SEO - Helps search engines understand and rank your content
 * - Social Sharing - Provides rich previews when links are shared
 * - Branding - Consistent title and description across the application
 * - Accessibility - Helps screen readers and assistive technologies
 *
 * The metadata includes:
 * - title: Appears in browser tabs and search results
 * - description: Shows in search results and social previews
 * - keywords: Helps search engines categorize the content
 * - authors: Credits the creators
 * - openGraph: Controls how links appear on Facebook, LinkedIn, etc.
 * - twitter: Controls how links appear on Twitter/X
 */
export const metadata: Metadata = {
  title: {
    default: "GrowthPoint - Employee Directory",
    template: "%s | GrowthPoint", // For page-specific titles
  },
  description: "Comprehensive employee directory management system for GrowthPoint. Search, filter, and manage employee information efficiently.",
  keywords: ["employee directory", "staff management", "employee database", "team directory", "employee profiles"],
  authors: [{ name: "GrowthPoint Team" }],
  creator: "GrowthPoint",

  // Open Graph metadata for social media sharing (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://growthpoint.com",
    title: "GrowthPoint - Employee Directory",
    description: "Comprehensive employee directory management system for GrowthPoint",
    siteName: "GrowthPoint",
  },

  // Twitter Card metadata for Twitter/X sharing
  twitter: {
    card: "summary_large_image",
    title: "GrowthPoint - Employee Directory",
    description: "Comprehensive employee directory management system",
    creator: "@growthpoint",
  },

  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Tooltip.Provider>
            {children}
          </Tooltip.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
