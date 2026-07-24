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
      // Additionally filter everything under a field literally named 'slug'
      if (props.sourcePath.some(path => path === 'slug' || path === 'current')) {
        return false;
      }
      return props.filterDefault(props);
    }
  }
});
async function run() {
  const params = { slug: "guest-giveaways-hampers" };
  const query = `*[_type == "service" && slug.current == $slug][0] { 
      "slug": slug.current,
      pillar
   }`;
  const result = await client.fetch(query, params);
  console.log(JSON.stringify(result, null, 2));
}
run().catch(console.error);
