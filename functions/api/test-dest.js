export async function onRequestGet(context) {
  const projectId = context.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8ha3u08p';
  const dataset = context.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const query = encodeURIComponent(`*[_type == "destination"] | order(city asc) { "id": _id, city, region, country, isInternational, tier }`);

  const url = `https://${projectId}.api.sanity.io/v2026-05-19/data/query/${dataset}?query=${query}`;

  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch destinations' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { result: dests } = await res.json();

    return new Response(JSON.stringify({
      total: dests.length,
      indian: dests.filter(d => !d.isInternational).length,
      intl: dests.filter(d => d.isInternational).length,
      dests,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
