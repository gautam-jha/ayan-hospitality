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
      // Very strict filter. Do not stega encode it at all if the value matches a slug pattern.
      if (typeof props.value === 'string' && /^[a-z0-9-]+$/.test(props.value)) {
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
