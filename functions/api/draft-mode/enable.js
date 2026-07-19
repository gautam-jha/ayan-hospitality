export async function onRequest(context) {
  const url = new URL(context.request.url);
  const redirectUrl = new URL('/', url.origin);

  // Set the required Sanity draft mode cookie
  const response = Response.redirect(redirectUrl.toString(), 302);

  response.headers.append(
    'Set-Cookie',
    `__sanity_preview_perspective=drafts; Path=/; SameSite=None; Secure; HttpOnly; Max-Age=3600`
  );

  return response;
}