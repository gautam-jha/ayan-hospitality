import type { Metadata } from 'next';
import { getAllTestimonials } from '@/lib/repository';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Star, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Testimonials — What Families & Planners Say',
  description: 'Real client testimonials from families, wedding planners, and event directors who have worked with Ayan Hospitality across India.',
};

export default async function TestimonialsPage() {
  const testimonials = await getAllTestimonials();
  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-b from-cream-200 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            eyebrow="Testimonials"
            title="Words from the families we've served"
            subtitle="Every testimonial here is from a real client. We don't edit the language — the emotion is theirs."
            centered
          />
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="card-warm p-7 flex flex-col">
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <blockquote className="text-charcoal-soft text-sm leading-relaxed flex-1 mb-6 italic">
                  "{t.quote}"
                </blockquote>
                <div className="border-t border-cream-200 pt-5">
                  <p className="font-semibold text-charcoal">{t.clientName}</p>
                  <p className="text-charcoal-muted text-sm mt-0.5">{t.eventDescription}</p>
                  {t.venue && (
                    <p className="text-gold-500 text-xs mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {t.venue}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Ayan Hospitality',
            review: testimonials.map((t) => ({
              '@type': 'Review',
              author: { '@type': 'Person', name: t.clientName },
              reviewBody: t.quote,
              reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
            })),
          }),
        }}
      />
    </div>
  );
}
