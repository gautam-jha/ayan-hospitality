export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();
    const name = formData.get('name') || '';
    const phone = formData.get('phone') || '';
    const email = formData.get('email');
    const eventDate = formData.get('eventDate');
    const city = formData.get('city');
    const guestCount = formData.get('guestCount');
    const message = formData.get('message');
    const services = formData.getAll('services');
    const type = formData.get('type') || 'wedding';
    const company = formData.get('company');

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

    const RESEND_API_KEY = context.env.RESEND_API_KEY;
    const TO_EMAIL = context.env.CONTACT_EMAIL || 'hello@ayanhospitality.com';

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
    }

    const accept = context.request.headers.get('accept') || '';
    const isAjax = accept.includes('application/json');

    if (isAjax) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(context.request.url);
    return Response.redirect(`${url.origin}/contact?success=1`, 302);
  } catch (error) {
    console.error('Contact form error:', error);
    const accept = context.request.headers.get('accept') || '';
    const isAjax = accept.includes('application/json');
    if (isAjax) {
      return new Response(JSON.stringify({ success: false, error: 'Failed to send message' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const url = new URL(context.request.url);
    return Response.redirect(`${url.origin}/contact?error=1`, 302);
  }
}
