require('dotenv').config({ path: '.env.local' });
const { createClient } = require('next-sanity');
const client = createClient({
  projectId: "8ha3u08p",
  dataset: "production",
  apiVersion: "2026-05-19",
  useCdn: false
});

async function run() {
  const slug = 'artist-coordination';
  const data = await client.fetch(`*[_type == "service" && slug.current == $slug][0]`, { slug });
  console.log(data);
}
run().catch(console.error);
