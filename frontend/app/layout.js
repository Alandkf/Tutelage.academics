// Import fonts and global styles
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Configure Geist Sans font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Configure Geist Mono font
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Root layout component that wraps all pages
 * Provides font variables and basic page structure
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <main className="flex-1 container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}

