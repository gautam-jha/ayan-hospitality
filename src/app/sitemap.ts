import { getAllServices, getAllCaseStudies, getAllBlogPosts } from '@/lib/repository';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, caseStudies, blogPosts] = await Promise.all([
    getAllServices(),
    getAllCaseStudies(),
    getAllBlogPosts(),
  ]);

  const base = 'https://ayanhospitality.com';

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/hospitality`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/services/logistics`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/our-work`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/for-planners`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/destinations`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/testimonials`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/faq`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/careers`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/build-your-package`, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.pillar}/${s.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${base}/our-work/${cs.slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
    lastModified: new Date(p.date),
  }));

  return [...staticPages, ...servicePages, ...caseStudyPages, ...blogPages];
}
