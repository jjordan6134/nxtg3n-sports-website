import { NextResponse } from "next/server";
import { escapeHtml, getClientIp, isRateLimited, sendFormEmail, syncNewsletterContact } from "@/lib/email";
import { isHoneypotTriggered, validateNewsletterForm, type NewsletterFormValues } from "@/lib/form-validation";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (isHoneypotTriggered(payload.honeypot)) return NextResponse.json({ message: "Thanks for subscribing to NXTG3N updates." });
    if (isRateLimited(getClientIp(request))) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

    const validation = validateNewsletterForm(payload);
    if (!validation.ok) return NextResponse.json({ error: "Please provide a valid email address.", details: validation.errors }, { status: 400 });

    const values = validation.values as NewsletterFormValues;
    const sync = await syncNewsletterContact(values.email, values.firstName);
    if (!sync.ok) return sync.response;

    if (sync.isNew) {
      const greeting = values.firstName ? `Hi ${escapeHtml(values.firstName)},` : "Hello,";
      const welcome = await sendFormEmail({
        to: [values.email],
        subject: "Welcome to NXTG3N Sports updates",
        operation: "send_newsletter_welcome_email",
        html: `<h1>Welcome to NXTG3N Sports</h1><p>${greeting}</p><p>Thanks for joining the NXTG3N newsletter. We will share thoughtful athlete news, NIL education, development insights, and brand partnership updates.</p><p>You can unsubscribe at any time by contacting us at nxtgnsportstalentagencyllc@gmail.com.</p>`,
        text: `Welcome to NXTG3N Sports\n\n${values.firstName ? `Hi ${values.firstName},` : "Hello,"}\n\nThanks for joining the NXTG3N newsletter. We will share thoughtful athlete news, NIL education, development insights, and brand partnership updates.\n\nYou can unsubscribe at any time by contacting us at nxtgnsportstalentagencyllc@gmail.com.`,
        successMessage: "Thanks for subscribing to NXTG3N updates.",
      });
      if (!welcome.ok) return NextResponse.json({ error: "Your subscription was saved, but the welcome email could not be sent." }, { status: 502 });
    }

    return NextResponse.json({ message: "Thanks for subscribing to NXTG3N updates." });
  } catch {
    return NextResponse.json({ error: "The newsletter subscription could not be processed. Please try again later." }, { status: 500 });
  }
}