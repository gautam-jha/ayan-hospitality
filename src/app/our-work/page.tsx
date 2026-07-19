import type { Metadata } from 'next';
import { getAllCaseStudies, getPageOurWork } from '@/lib/repository';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight, MapPin, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Work | Wedding Case Studies',
  description: 'Real wedding case studies from Ayan Hospitality. Learn about the challenges, what we did, and the outcomes across 800+ weddings in India.',
};

export default async function OurWorkPage() {
  const [caseStudies, page] = await Promise.all([
    getAllCaseStudies(),
    getPageOurWork(),
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/our-work/${cs.slug}`}
                className="group card-warm overflow-hidden block"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105 bg-maroon-800"
                    style={{ backgroundImage: `url('${cs.heroImageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {cs.location}
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full flex items-center gap-1">
                      <Users className="w-3 h-3" /> {cs.guestCount.toLocaleString('en-IN')} guests
                    </span>
                  </div>
                </div>
                <div className="p-7">
                  <h2 className="font-display text-2xl text-maroon-700 font-semibold mb-3 group-hover:text-gold-600 transition-colors">
                    {cs.title}
                  </h2>
                  <p className="text-charcoal-muted text-sm leading-relaxed line-clamp-2 mb-4">
                    {cs.challenge}
                  </p>
                  <span className="inline-flex items-center gap-1 text-maroon-700 text-sm font-medium group-hover:gap-2 transition-all">
                    {page?.cardCta ?? ""} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 bg-cream-100 rounded-3xl p-10 text-center border border-cream-200">
            <p className="text-gold-500 text-xs font-semibold tracking-widest uppercase mb-3">{page?.ctaEyebrow ?? ""}</p>
            <h3 className="font-display text-3xl text-maroon-700 font-semibold mb-4">
              {page?.ctaTitle ?? ""}
            </h3>
            <p className="text-charcoal-muted mb-6 max-w-xl mx-auto">
              {page?.ctaText ?? ""}
            </p>
            <Button href="/contact" variant="primary" id="our-work-contact">
              {page?.ctaButtonLabel ?? ""} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
