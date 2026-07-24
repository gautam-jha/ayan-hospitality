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
      if (typeof props.value === 'string' && /^[a-z0-9-]+$/.test(props.value)) {
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
