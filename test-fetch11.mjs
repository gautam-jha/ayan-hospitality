import { createClient } from "next-sanity";
const client = createClient({
  projectId: "8ha3u08p",
  dataset: "production",
  apiVersion: "2026-05-19",
  useCdn: false,
  stega: {
    enabled: true,
    studioUrl: "https://ayan-hospitality.sanity.studio",
    filter: (props) => {
      // Very strict filter. If a value matches a slug pattern (only letters, numbers, and hyphens), do not stega encode it at all.
      // NOTE: props.sourcePath is often what matters most. For slugs, `slug.current` is typically at path `['slug', 'current']` or `['current']`.
      if (props.sourcePath.some(path => path === 'slug' || path === 'current')) {
        return false;
      }
      return props.filterDefault(props);
    }
  }
});
async function run() {
  const result = await client.fetch(
    `*[_type == "service" && slug.current == "guest-giveaways-hampers"][0]{ "slug": slug.current, title }`
  );
  console.log(JSON.stringify(result, null, 2));
}
run().catch(console.error);
