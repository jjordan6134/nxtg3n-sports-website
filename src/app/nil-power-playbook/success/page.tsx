import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Checkout update", robots: { index: false, follow: false }, referrer: "no-referrer" };
export default function CheckoutSuccess() {
  return <div className="mx-auto max-w-2xl px-6 py-24"><p className="text-sm uppercase tracking-widest text-[#e5c58b]">NXTG3N Digital Library</p><h1 className="mt-4 text-4xl font-black">Check your inbox for confirmation.</h1><p className="mt-6 leading-8 text-[#c7ccd6]">Your payment provider will confirm the result of checkout. Once payment is confirmed, we’ll email your private download link. Some payments take longer to confirm. This page does not confirm payment or grant access.</p><p className="mt-5 text-sm">Missing an email? Check spam, then contact <a className="underline" href="mailto:nxtgnsportstalentagencyllc@gmail.com">NXTG3N support</a> with your payment receipt. Never send card details.</p><Link className="mt-8 inline-block text-[#e5c58b]" href="/resources">Explore free resources →</Link></div>;
}
