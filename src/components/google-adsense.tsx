import Script from "next/script";

export function GoogleAdsenseVerification({ client }: { client: string }) {
  return (
    <Script
      id="adsense-verification"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
