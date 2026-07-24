import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET(request: NextRequest) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug") || url.searchParams.get("redirect") || url.searchParams.get("url") || "/";

  let redirectPath = "/";
  if (slug.startsWith("/")) {
    redirectPath = slug;
  } else {
    try {
      const parsedSlug = new URL(slug);
      if (parsedSlug.origin === url.origin) {
        redirectPath = parsedSlug.pathname + parsedSlug.search + parsedSlug.hash;
      }
    } catch {
      const trimmed = slug.trim();
      if (trimmed.startsWith("/")) {
        redirectPath = trimmed;
      }
    }
  }

  return NextResponse.redirect(new URL(redirectPath, url.origin), 307);
}
