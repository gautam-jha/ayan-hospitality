import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string | null;
    const eventDate = formData.get('eventDate') as string | null;
    const city = formData.get('city') as string | null;
    const guestCount = formData.get('guestCount') as string | null;
    const message = formData.get('message') as string | null;
    const services = formData.getAll('services') as string[];
    const type = formData.get('type') as string | null;
    const company = formData.get('company') as string | null;

    // Build email body
    const emailBody = `
New ${type === 'b2b' ? 'Partnership' : 'Wedding'} Enquiry | Ayan Hospitality

Name: ${name}
Phone: ${phone}
${email ? `Email: ${email}` : ''}
${company ? `Company: ${company}` : ''}
${eventDate ? `Event Date: ${eventDate}` : ''}
${city ? `City / Venue: ${city}` : ''}
${guestCount ? `Guest Count: ${guestCount}` : ''}
${services.length > 0 ? `Services Interested In:\n${services.map((s) => `  - ${s}`).join('\n')}` : ''}
${message ? `\nMessage:\n${message}` : ''}

---
Submitted via ayanhospitality.com at ${new Date().toISOString()}
    `.trim();

    // Send via Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_EMAIL || 'hello@ayanhospitality.com';

    if (RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Ayan Hospitality Website <noreply@ayanhospitality.com>',
          to: [TO_EMAIL],
          reply_to: email || undefined,
          subject: `New Enquiry from ${name} | ${type === 'b2b' ? 'Partnership' : 'Wedding'}`,
          text: emailBody,
        }),
      });

      if (!res.ok) {
        console.error('Resend error:', await res.text());
      }
    } else {
      // Log to console in development
      console.log('[Contact Form Submission]\n', emailBody);
    }

    // Detect if client expects JSON
    const isAjax = request.headers.get('accept')?.includes('application/json');

    if (isAjax) {
      return NextResponse.json({ success: true });
    }

    // Redirect back with success
    return NextResponse.redirect(new URL('/contact?success=1', request.url));
  } catch (error) {
    console.error('Contact form error:', error);
    const isAjax = request.headers.get('accept')?.includes('application/json');
    if (isAjax) {
      return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
    }
    return NextResponse.redirect(new URL('/contact?error=1', request.url));
  }
}
