export async function onRequest(context) {
  const url = new URL(context.request.url);
  const slug = url.searchParams.get('slug') || url.searchParams.get('redirect') || url.searchParams.get('url') || '/';

  let redirectPath = '/';
  if (slug.startsWith('/')) {
    redirectPath = slug;
  } else {
    try {
      const parsedSlug = new URL(slug);
      if (parsedSlug.origin === url.origin) {
        redirectPath = parsedSlug.pathname + parsedSlug.search + parsedSlug.hash;
      }
    } catch {
      const trimmed = slug.trim();
      if (trimmed.startsWith('/')) {
        redirectPath = trimmed;
      }
    }
  }

  const redirectUrl = new URL(redirectPath, url.origin);
  const headers = new Headers();
  headers.set('Location', redirectUrl.toString());
  headers.set(
    'Set-Cookie',
    `__sanity_preview_perspective=drafts; Path=/; SameSite=None; Secure; HttpOnly; Max-Age=3600`
  );

  return new Response(null, {
    status: 307,
    headers: headers,
  });
}