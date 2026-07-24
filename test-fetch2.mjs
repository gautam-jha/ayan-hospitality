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
      // Prevent encoding slugs, paths, or anything that breaks URLs
      if (props.sourcePath.some(path => path === 'slug' || path === 'current')) {
        return false;
      }
      return props.filterDefault(props);
    }
  }
});
async function run() {
  const result = await client.fetch(`*[_type == "service" && pillar == "hospitality"] | order(title asc) { "slug": slug.current }`);
  console.log(JSON.stringify(result, null, 2));
}
run().catch(console.error);
