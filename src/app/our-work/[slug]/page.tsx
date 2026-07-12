import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCaseStudyBySlug, getAllCaseStudies, getTestimonialById } from '@/lib/repository';
import { Button } from '@/components/ui/Button';
import { MapPin, Users, Calendar, Star, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export async function generateStaticParams() {
  const cases = await getAllCaseStudies();
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: `${cs.challenge.slice(0, 150)}...`,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();
  const testimonial = cs.testimonialId ? await getTestimonialById(cs.testimonialId) : null;

  return (
    <div className="pt-20">
      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-maroon-900"
          style={{ backgroundImage: `url('${cs.heroImageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 via-maroon-900/30 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> {cs.location}
              </span>
              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> {cs.guestCount.toLocaleString('en-IN')} guests
              </span>
              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {formatDate(cs.date)}
              </span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl text-white font-semibold">{cs.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-display text-2xl text-maroon-700 font-semibold mb-4">The Challenge</h2>
                <p className="text-charcoal-soft leading-relaxed text-lg">{cs.challenge}</p>
              </div>
              <div>
                <h2 className="font-display text-2xl text-maroon-700 font-semibold mb-4">What We Did</h2>
                <p className="text-charcoal-soft leading-relaxed text-lg">{cs.whatWeDid}</p>
              </div>
              <div className="bg-gold-500/10 border border-gold-500/20 rounded-2xl p-6">
                <h2 className="font-display text-xl text-maroon-700 font-semibold mb-3">The Outcome</h2>
                <p className="text-charcoal-soft leading-relaxed">{cs.outcome}</p>
              </div>
            </div>

            <div className="space-y-6">
              {testimonial && (
                <div className="bg-cream-100 rounded-2xl p-6 border border-cream-200">
                  <div className="flex mb-3">{Array.from({length:5}).map((_,i)=><Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />)}</div>
                  <blockquote className="text-charcoal-soft italic text-sm leading-relaxed mb-4">"{testimonial.quote}"</blockquote>
                  <p className="font-semibold text-charcoal text-sm">{testimonial.clientName}</p>
                  <p className="text-charcoal-muted text-xs">{testimonial.eventDescription}</p>
                </div>
              )}
              <div className="bg-maroon-700 rounded-2xl p-6 text-center">
                <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">Plan your wedding with us</p>
                <Button href="/contact" variant="secondary" className="w-full justify-center" id="case-study-contact">
                  Get a Free Consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
