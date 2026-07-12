import type { Metadata } from 'next';
import Link from 'next/link';
import { getHospitalityServices, getLogisticsServices } from '@/lib/repository';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wedding Hospitality & Logistics Services',
  description: 'Full range of wedding hospitality and logistics services: RSVP management, guest help desk, VIP handling, airport transfers, luggage handling, and more. Covering 30+ cities across India.',
};

export default async function ServicesPage() {
  const [hospitality, logistics] = await Promise.all([
    getHospitalityServices(),
    getLogisticsServices(),
  ]);

  const pillars = [
    {
      id: 'hospitality',
      title: 'Wedding Hospitality',
      description: 'Everything that touches your guest experience — from the first RSVP to the final farewell.',
      emoji: '🌸',
      color: 'maroon',
      href: '/services/hospitality',
      services: hospitality,
    },
    {
      id: 'logistics',
      title: 'Logistics & On-Ground Crew',
      description: 'Every vehicle, bag, movement, and on-ground team member — coordinated with precision.',
      emoji: '🚁',
      color: 'gold',
      href: '/services/logistics',
      services: logistics,
    },
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="section-padding bg-gradient-to-b from-cream-200 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            eyebrow="Our Services"
            title="Hospitality & Logistics for Indian Weddings"
            subtitle="19 distinct services across two pillars. Every service can be booked standalone or as part of a full-event package."
            centered
          />
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button href="/contact" variant="primary" id="services-get-quote">Get a Quote <ArrowRight className="w-4 h-4" /></Button>
            <Button href="/build-your-package" variant="ghost" id="services-build-package">Build Your Package</Button>
          </div>
        </div>
      </section>

      {/* Service pillars */}
      {pillars.map((pillar) => (
        <section key={pillar.id} className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div>
                <div className="text-3xl mb-3">{pillar.emoji}</div>
                <h2 className="font-display text-4xl text-maroon-700 font-semibold">{pillar.title}</h2>
                <p className="text-charcoal-muted mt-2 max-w-xl">{pillar.description}</p>
              </div>
              <Link href={pillar.href} className="inline-flex items-center gap-2 text-maroon-700 font-medium hover:gap-3 transition-all shrink-0">
                View all {pillar.title} services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {pillar.services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.pillar}/${service.slug}`}
                  className="card-warm p-6 group block"
                >
                  <h3 className="font-display text-lg text-maroon-700 font-semibold mb-2 group-hover:text-gold-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-charcoal-muted text-sm leading-relaxed mb-4">{service.shortDescription}</p>
                  <div className="flex items-center gap-1 text-maroon-700 text-xs font-medium group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Build Your Package CTA */}
      <section className="section-padding bg-maroon-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl text-white font-semibold mb-4">Not sure what you need?</h2>
          <p className="text-cream-200/80 mb-8">Use our guided package selector — answer 4 quick questions and get an indicative estimate in under 2 minutes.</p>
          <Button href="/build-your-package" variant="secondary" size="lg" id="services-build-package-bottom">
            Build Your Package <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
