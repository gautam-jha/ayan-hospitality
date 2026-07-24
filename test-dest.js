const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '8ha3u08p',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

client.fetch('*[_type == "destination"]').then(data => {
  console.log('Total:', data.length);
  const indian = data.filter(d => !d.isInternational);
  const intl = data.filter(d => d.isInternational);
  console.log('Indian:', indian.length);
  console.log('Intl:', intl.length);
  const metros = indian.filter(d => d.tier === 'metro');
  const weddingDests = indian.filter(d => d.tier === 'destination');
  const leisure = indian.filter(d => d.tier === 'leisure');
  console.log('Metros:', metros.length, 'Wedding:', weddingDests.length, 'Leisure:', leisure.length);
}).catch(console.error);