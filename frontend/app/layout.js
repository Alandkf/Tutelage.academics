import { Toaster } from "sonner";
import "./globals.css";
import { AuthProvider } from "@/components/AuthContext";
import RefreshTokenProvider from "@/components/AuthHook";
import Navbar from "@/components/Navbar";
import NavbarWrapper from "@/components/NavbarWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import ThemeProvider from "@/components/ThemeProvider";
import { Footer } from "@/components/Footer";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Suspense } from "react";

export const metadata = {
  title: "Tutelage | Online English Learning Platform in Kurdistan",
  description: "Tutelage is Kurdistan's innovative online English learning platform offering comprehensive courses for kids, teens, and adults. Master English with expert-led courses, free ESL resources (videos, audios, blogs, stories), CEFR-leveled practice (A1-C1), IELTS/TOEFL/PTE preparation, and English proficiency testing. Founded in 2022, providing structured learning, interactive exercises, and personalized support to help you achieve fluency.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="mt-0 pt-0">
      <head>
        <link
          rel="icon"
          href="/only-logo-black-border-yellow-bg.svg"
          type="image/svg+xml"
        />
      </head>
      <body className="relative">
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-RM0EWLJGN8`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RM0EWLJGN8', {
                page_path: window.location.pathname,
                send_page_view: false
              });
            `,
          }}
        />
        <ThemeProvider>
          <RefreshTokenProvider>
            <AuthProvider>
              <Suspense fallback={null}>
                <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
              </Suspense>
              <NavbarWrapper>
                <Suspense fallback={null}>
                  <Navbar />
                </Suspense>
              </NavbarWrapper>
              <Suspense fallback={null}>
                <div className="relative z-10">{children}</div>
              </Suspense>
              <FooterWrapper>
                <Footer />
              </FooterWrapper>
              <Toaster />
            </AuthProvider>
          </RefreshTokenProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
