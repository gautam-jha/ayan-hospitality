export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (pathname === '/api/contact' && request.method === 'POST') {
      return handleContact(request, env);
    }

    if (pathname === '/api/test-dest' && request.method === 'GET') {
      return handleTestDest(env);
    }

    if (request.method === 'GET' || request.method === 'HEAD') {
      let response = await env.ASSETS.fetch(request);
      if (response.status !== 404) return response;

      const htmlUrl = new URL(request.url);
      if (htmlUrl.pathname.endsWith('/')) {
        htmlUrl.pathname += 'index.html';
      } else {
        htmlUrl.pathname += '.html';
      }
      response = await env.ASSETS.fetch(new Request(htmlUrl, request));
      if (response.status !== 404) return response;

      return env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
    }

    return new Response('Not Found', { status: 404 });
  },
};

async function handleContact(request, env) {
  try {
    const formData = await request.formData();
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

    const emailBody = [
      `New ${type === 'b2b' ? 'Partnership' : 'Wedding'} Enquiry | Ayan Hospitality`,
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : '',
      company ? `Company: ${company}` : '',
      eventDate ? `Event Date: ${eventDate}` : '',
      city ? `City / Venue: ${city}` : '',
      guestCount ? `Guest Count: ${guestCount}` : '',
      services.length > 0 ? `Services Interested In:\n${services.map((s) => `  - ${s}`).join('\n')}` : '',
      message ? `\nMessage:\n${message}` : '',
      '',
      `---`,
      `Submitted via ayanhospitality.com at ${new Date().toISOString()}`,
    ].filter(Boolean).join('\n');

    const resendKey = env.RESEND_API_KEY;
    const toEmail = env.CONTACT_EMAIL || 'hello@ayanhospitality.com';

    if (resendKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Ayan Hospitality Website <noreply@ayanhospitality.com>',
          to: [toEmail],
          reply_to: email || undefined,
          subject: `New Enquiry from ${name} | ${type === 'b2b' ? 'Partnership' : 'Wedding'}`,
          text: emailBody,
        }),
      });

      if (!res.ok) {
        console.error('Resend error:', await res.text());
      }
    }

    const accept = request.headers.get('accept') || '';
    const isAjax = accept.includes('application/json');

    if (isAjax) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return Response.redirect(`${url.origin}/contact?success=1`, 302);
  } catch (error) {
    console.error('Contact form error:', error);
    const accept = request.headers.get('accept') || '';
    const isAjax = accept.includes('application/json');
    if (isAjax) {
      return new Response(JSON.stringify({ success: false, error: 'Failed to send message' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const url = new URL(request.url);
    return Response.redirect(`${url.origin}/contact?error=1`, 302);
  }
}

async function handleTestDest(env) {
  const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8ha3u08p';
  const dataset = env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const query = encodeURIComponent(
    `*[_type == "destination"] | order(city asc) { "id": _id, city, region, country, isInternational, tier }`,
  );

  try {
    const res = await fetch(
      `https://${projectId}.api.sanity.io/v2026-05-19/data/query/${dataset}?query=${query}`,
      { headers: { 'Content-Type': 'application/json' } },
    );

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch destinations' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { result: dests } = await res.json();

    return new Response(
      JSON.stringify({
        total: dests.length,
        indian: dests.filter((d) => !d.isInternational).length,
        intl: dests.filter((d) => d.isInternational).length,
        dests,
      }),
      { headers: { 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
