import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts, getPageBlog } from '@/lib/repository';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { formatDate } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | Wedding Planning Insights from 800+ Weddings',
  description: 'Practical insights on wedding hospitality, logistics, RSVP management, and destination weddings from the team at Ayan Hospitality.',
};

export default async function BlogPage() {
  const [posts, page] = await Promise.all([
    getAllBlogPosts(),
    getPageBlog(),
  ]);

  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-b from-cream-200 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            eyebrow={page?.heroEyebrow ?? ""}
            title={page?.heroTitle ?? ""}
            subtitle={page?.heroSubtitle ?? ""}
            centered
          />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group card-warm overflow-hidden block">
                <div className="aspect-[16/9] overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105 bg-maroon-700"
                    style={{ backgroundImage: `url('${post.coverImageUrl}')` }}
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-gold-500 text-xs font-semibold">{post.category}</span>
                    <span className="text-charcoal-subtle text-xs">·</span>
                    <span className="text-charcoal-subtle text-xs">{post.readTime} min read</span>
                    <span className="text-charcoal-subtle text-xs">·</span>
                    <span className="text-charcoal-subtle text-xs">{formatDate(post.date)}</span>
                  </div>
                  <h2 className="font-display text-xl text-maroon-700 font-semibold leading-snug mb-3 group-hover:text-gold-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-charcoal-muted text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-maroon-700 text-sm font-medium group-hover:gap-2 transition-all">
                    {page?.cardCta ?? ""} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
