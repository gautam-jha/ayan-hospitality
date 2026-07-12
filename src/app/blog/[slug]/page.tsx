import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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

const BLOG_CONTENT: Record<string, string> = {
  'rsvp-management-mistakes': `
RSVP management sounds simple until you're two weeks out and still don't have a final headcount for a 400-person wedding.

After managing 800+ weddings across India, here are the five mistakes we see families make — and how to avoid each one.

**1. Assuming guests will respond on time**

They won't. Especially for destination weddings where travel planning is involved, guests procrastinate. Build a follow-up schedule: a reminder at 3 weeks, 2 weeks, and 1 week before the deadline. Don't rely on a single invitation.

**2. Collecting RSVPs across multiple channels**

Phone calls to aunties, WhatsApp messages to cousins, email to international guests — and nobody keeping a single master list. Use one system (even a shared Google Sheet is better than nothing), or delegate this entirely to a professional.

**3. Not collecting preferences with the RSVP**

Dietary needs, mobility requirements, room preferences, airport arrival times — if you collect these after the RSVP, you're making twice the calls. Collect everything in one go.

**4. Finalising headcount too late**

Hotels and caterers need final numbers 5-7 days out. Families who lock headcount 2 days before create last-minute chaos for every vendor. Build your RSVP deadline at 10 days before the event.

**5. Not having a single point of contact for queries**

If the bride's mother is handling one set of RSVPs and the groom's sister is handling another, data gets lost. Designate one person (or one team) who owns this entirely.

If you'd rather not manage any of this yourself, our RSVP & Invitation Management service handles the full lifecycle — from digital outreach to final headcount reports.
  `,
  'destination-wedding-logistics-checklist': `
Moving 300 guests from Mumbai to Udaipur across three days is a logistics operation most families underestimate until something goes wrong.

Here's the checklist we use internally for every destination wedding we manage.

**Pre-arrival (6-8 weeks out)**
- Collect all guest arrival/departure dates and flight/train details
- Book and confirm charter or scheduled transport for inter-city movement
- Confirm vehicle inventory at destination (airport pickups, hotel-to-venue transfers, baraat vehicles)
- Share logistics plan with hotel for coordination

**Guest communication (2 weeks out)**
- Send every guest their driver details, pickup times, and hotel check-in info
- Communicate luggage tagging process (bags are tagged at airport/station, delivered to rooms)
- Share emergency contact (help desk number active throughout event)

**Airport/station day-of**
- Position coordinators at arrivals with name boards
- Activate flight/train delay monitoring
- Confirm driver manifest matches guest manifest

**Hotel arrival**
- Luggage team ready at hotel entrance
- Luggage tagged and delivered to rooms within 90 minutes of arrival
- Help desk active and briefed on all known guest queries

**Inter-city movement**
- Daily transport briefings for all drivers
- Guest-wise manifest for every vehicle movement
- Contingency vehicles on standby

**Departure**
- Luggage collection from rooms 3 hours before checkout
- Driver assignments confirmed 24 hours before departure
- Last guest checked out before team demobilises

If this list feels overwhelming, that's exactly why professional logistics management exists for weddings of this scale.
  `,
  'vip-guest-management-guide': `
VIP handling at Indian weddings is a delicate balance. Do it too visibly and other guests feel overlooked. Do it too quietly and the VIP doesn't feel valued. Here's how we approach it.

**Define who your VIPs actually are**

Not everyone who the family thinks is important needs dedicated handling. True VIPs — the ones who need assigned support — are usually: senior or elderly guests (75+), guests with mobility or health needs, out-of-town guests unfamiliar with the city or venue, and specific high-profile individuals the family wants to honour.

**Assign a Shadow, not a Greeter**

A shadow is different from a welcome coordinator. A shadow stays with the guest through the event — anticipating needs, not waiting to be asked. If your grandmother uses a wheelchair, her shadow makes sure every transition (hotel room → lobby → bus → venue → seating) is smooth and dignified, without her having to ask for help.

**Coordinate with the hotel early**

Room preferences, dietary needs, early check-in — most of this can be pre-arranged if you brief the hotel two weeks out. We do this for every VIP guest on our list.

**Keep it discreet**

VIP handling that draws attention defeats its purpose. Our shadow staff dress like guests, carry themselves discreetly, and operate on the principle that nobody should be able to tell who's on the team.

**Have one escalation path**

If a VIP guest has a problem, there should be one number that solves it immediately. That's our help desk — one call, and the issue is either resolved or escalated to whoever can fix it.
  `,
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const content = BLOG_CONTENT[slug] || post.excerpt;

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
              <div className="prose prose-lg max-w-none text-charcoal-soft leading-relaxed space-y-5">
                {content.trim().split('\n\n').map((para, i) => {
                  if (para.startsWith('**') && para.endsWith('**') === false && para.includes('**')) {
                    const parts = para.split('**');
                    return (
                      <p key={i}>
                        {parts.map((part, j) =>
                          j % 2 === 1 ? <strong key={j} className="text-maroon-700">{part}</strong> : part
                        )}
                      </p>
                    );
                  }
                  return <p key={i} className="leading-relaxed">{para}</p>;
                })}
              </div>

              <div className="mt-12 border-t border-cream-200 pt-8">
                <Button href="/blog" variant="ghost" id="blog-back">
                  <ArrowLeft className="w-4 h-4" /> Back to all articles
                </Button>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="bg-maroon-700 rounded-2xl p-6 text-center sticky top-24">
                <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">Planning a wedding?</p>
                <p className="text-cream-200/80 text-sm mb-5 leading-relaxed">Our team has managed 800+ weddings. We'd love to help with yours.</p>
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
