"use client";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/google-analytics";
export function PrivacyAnalytics({ measurementId }: { measurementId?: string }) {
  const pathname = usePathname();
  // Confirmation and capability-bearing pages never mount public analytics.
  if (pathname?.startsWith("/nil-power-playbook/download") || pathname?.startsWith("/nil-power-playbook/success")) return null;
  return <><Analytics beforeSend={event => event.url.includes("/nil-power-playbook/download") || event.url.includes("/nil-power-playbook/success") ? null : event} />{measurementId ? <GoogleAnalytics measurementId={measurementId} /> : null}</>;
}
