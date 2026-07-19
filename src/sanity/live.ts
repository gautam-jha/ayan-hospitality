import { client } from "./client";

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<{ data: T }> {
  const data = await client.fetch<T>(query, params);
  return { data };
}

export function SanityLive() {
  return null;
}
