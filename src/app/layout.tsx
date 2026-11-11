import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Lalezar } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileBar } from "@/components/MobileBar";
import { Motion } from "@/components/Motion";
import { ServiceStrip } from "@/components/ServiceStrip";
import { Tags } from "@/components/Tags";
import { site, siteUrl } from "@/content/site";
import "./globals.css";

// Self-hosted at build time by next/font (constitution III). Lalezar for display type (round 3, user pick
// 2026-11-12: heavy signboard letters that read from far), IBM Plex Sans Arabic for text. Lalezar has one
// weight, so base.css turns weight synthesis off.
const display = Lalezar({ subsets: ["arabic", "latin"], weight: "400", variable: "--font-display", display: "swap" });
const text = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-text", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: site.name,
  formatDetection: { telephone: false },
  icons: { icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/icon-512.png", type: "image/png", sizes: "512x512" }], apple: "/apple-touch-icon.png" },
  verification: { google: undefined },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${display.variable} ${text.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          تخطَّ إلى المحتوى
        </a>
        <Header />
        <main id="main">
          {/* The owner's four promises first on every page, under the header. */}
          <ServiceStrip />
          {children}
        </main>
        <Footer />
        <MobileBar />
        <Motion />
        <Tags />
      </body>
    </html>
  );
}
