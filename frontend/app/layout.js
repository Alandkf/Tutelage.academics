import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { LanguageProvider } from "@/components/leo/LanguageProvider";
import LegacyI18nInit from "@/components/leo/LegacyI18nInit";
import LeoNavbar from "@/components/leo/LeoNavbar";
import LeoFooter from "@/components/leo/LeoFooter";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const notoArabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-arabic", display: "swap" });

export const metadata = {
  title: "LEO Institute | پەیمانگای لیۆ",
  description:
    "LEO Institute (پەیمانگای لیۆ): English, Arabic and German courses in the Kurdistan Region, with LEO AI, your personal language tutor. | کورسی زمان لەگەڵ LEO AI.",
  icons: { icon: "/leo/leo-logo.png" },
  other: { "color-scheme": "light" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ckb" dir="rtl" className={`${inter.variable} ${notoArabic.variable}`} suppressHydrationWarning>
      <body className="relative min-h-screen bg-background text-foreground antialiased" suppressHydrationWarning>
        <LegacyI18nInit />
        <LanguageProvider>
          <LeoNavbar />
          <Suspense fallback={null}>
            <main>{children}</main>
          </Suspense>
          <LeoFooter />
          <Toaster richColors position="top-center" />
        </LanguageProvider>
      </body>
    </html>
  );
}
