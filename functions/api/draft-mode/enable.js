export async function onRequest(context) {
  const url = new URL(context.request.url);
  const redirectUrl = new URL('/', url.origin);
  redirectUrl.searchParams.set('sanity-preview-perspective', 'drafts');

  const response = Response.redirect(redirectUrl.toString(), 302);

  response.headers.append(
    'Set-Cookie',
    `__sanity_preview_perspective=drafts; Path=/; SameSite=None; Secure; HttpOnly; Max-Age=3600`
  );

  return response;
}
