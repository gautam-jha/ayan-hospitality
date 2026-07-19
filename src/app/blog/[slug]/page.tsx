import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/repository';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.coverImageUrl] },
  };
}

/** Portable Text component overrides for consistent styling */
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="leading-relaxed mb-4">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-display text-2xl text-maroon-700 font-semibold mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-display text-xl text-maroon-700 font-semibold mt-6 mb-2">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gold-500 pl-5 italic text-charcoal-muted my-6">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-maroon-700">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }: { value?: { href: string; blank?: boolean }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-maroon-600 underline hover:text-gold-600 transition-colors"
      >
        {children}
      </a>
    ),
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Ayan Hospitality' },
    publisher: { '@type': 'Organization', name: 'Ayan Hospitality', url: 'https://ayanhospitality.com' },
  };

  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero */}
      <div className="relative h-[45vh] min-h-[320px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-maroon-800"
          style={{ backgroundImage: `url('${post.coverImageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 to-maroon-900/20" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gold-500/80 text-white text-xs rounded-full font-medium">{post.category}</span>
              <span className="text-cream-200/70 text-sm">{formatDate(post.date)}</span>
              <span className="text-cream-200/70 text-sm">· {post.readTime} min read</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl text-white font-semibold leading-tight">{post.title}</h1>
          </div>
        </div>
      </div>

      {/* Article body */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <article className="lg:col-span-2">
              <p className="text-lg text-charcoal-soft leading-relaxed font-semibold mb-8 border-l-4 border-gold-500 pl-5">
                {post.excerpt}
              </p>
              {post.body && post.body.length > 0 ? (
                <div className="prose prose-lg max-w-none text-charcoal-soft">
                  <PortableText value={post.body} components={portableTextComponents} />
                </div>
              ) : (
                <p className="text-charcoal-muted italic">Full article content coming soon.</p>
              )}

              <div className="mt-12 border-t border-cream-200 pt-8">
                <Button href="/blog" variant="ghost" id="blog-back">
                  <ArrowLeft className="w-4 h-4" /> Back to all articles
                </Button>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="bg-maroon-700 rounded-2xl p-6 text-center sticky top-24">
                <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">Planning a wedding?</p>
                <p className="text-cream-200/80 text-sm mb-5 leading-relaxed">Our team has managed 800+ weddings. We&apos;d love to help with yours.</p>
                <Button href="/contact" variant="secondary" className="w-full justify-center" id="blog-post-cta">
                  Get a Free Consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
