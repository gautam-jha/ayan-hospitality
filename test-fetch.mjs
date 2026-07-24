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
      if (props.sourcePath.some(path => path === 'slug' || path === 'current')) {
        return false;
      }
      return props.filterDefault(props);
    }
  }
});
async function run() {
  const result = await client.fetch(`*[_type == "service" && slug.current == "guest-giveaways-hampers"][0]`);
  console.log(result ? "Found!" : "Not found!");
  if(result) console.log(JSON.stringify(result.slug));
}
run().catch(console.error);
