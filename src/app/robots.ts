import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/guest-help-desk'],
    },
    sitemap: 'https://ayanhospitality.com/sitemap.xml',
  };
}
