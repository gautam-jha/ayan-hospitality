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
      // Because `slug.current` comes back as a string, if we ask for `slug: slug.current`, the path Sanity records might not be EXACTLY `['slug']`. Let's log it to check!
      if (props.sourcePath.some(path => path === 'slug' || path === 'current')) {
        return false;
      }
      return props.filterDefault(props);
    }
  }
});
async function run() {
  const result = await client.fetch(`*[_type == "service" && slug.current == "guest-giveaways-hampers"][0]{ "myslug": slug.current }`);
  console.log(JSON.stringify(result, null, 2));
}
run().catch(console.error);
