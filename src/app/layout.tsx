import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { BreakingNewsTicker } from "@/components/breaking-news-ticker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { GoogleAnalytics } from "@/components/google-analytics";
import { GoogleAdsenseVerification } from "@/components/google-adsense";
import { brand } from "@/data/site";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID;
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nxtgnsports.com"),
  title: {
    default: "NXTG3N Sports | The Neural Athlete",
    template: "%s | NXTG3N Sports",
  },
  description:
    "NXTG3N Sports Talent Agency helps athletes build NIL opportunities, personal brands, AI education, financial literacy, and career pathways beyond the game.",
  keywords: [
    "NXTG3N Sports",
    "athlete agency",
    "NIL",
    "branding",
    "sports agency",
    "athlete development",
  ],
  openGraph: {
    title: "NXTG3N Sports | The Neural Athlete",
    description:
      "A premium sports talent agency experience built for athlete development, NIL strategy, and long-term career planning.",
    url: "https://nxtgnsports.com",
    siteName: "NXTG3N Sports",
    locale: "en_US",
    type: "website",
    images: [{ url: "/nxtg3n-logo.png", width: 1200, height: 630, alt: "NXTG3N Sports logo" }],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "NXTG3N Sports | The Neural Athlete",
    description:
      "NXTG3N Sports Talent Agency helps athletes build NIL opportunities, personal brands, AI education, financial literacy, and career pathways beyond the game.",
  },
  other: {
    "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0E11",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-[#0B0E11] text-white">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <BreakingNewsTicker />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <Analytics />
          {gaMeasurementId && <GoogleAnalytics measurementId={gaMeasurementId} />}
          {adsenseClient && <GoogleAdsenseVerification client={adsenseClient} />}
          <JsonLd data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: brand.name,
            legalName: brand.legalName,
            url: brand.siteUrl,
            logo: `${brand.siteUrl}${brand.logoPath}`,
            email: brand.email,
          }} />
          <JsonLd data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: brand.name,
            url: brand.siteUrl,
          }} />
        </div>
      </body>
    </html>
  );
}
