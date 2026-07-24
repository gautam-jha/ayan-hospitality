import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "8ha3u08p";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2026-05-19";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  stega: {
    enabled: true,
    studioUrl: "https://ayan-hospitality.sanity.studio",
    filter: (props) => {
      // Prevent encoding ANY field attached to slugs!
      if (props.sourcePath.some(path => path === 'slug' || path === 'current')) {
        return false;
      }
      // Extremely strict check: if a value looks exactly like a slug (only lowercase alphanumeric + dashes),
      // do not inject stega encoded characters to prevent 404s on dynamic Next.js routes.
      if (typeof props.value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(props.value)) {
        return false;
      }
      return props.filterDefault(props);
    }
  },
});

// Image URL builder
const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper for type-safe GROQ fetches
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  return client.fetch<T>(query, params);
}
