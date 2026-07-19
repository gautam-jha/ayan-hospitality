import type { Metadata } from 'next';
import Link from 'next/link';
import { getHospitalityServices, getLogisticsServices, getPageServices } from '@/lib/repository';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ConciergeBell, Luggage } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wedding Hospitality & Logistics Services',
  description: 'Full range of wedding hospitality and logistics services: RSVP management, guest help desk, VIP handling, airport transfers, luggage handling, and more. Covering 30+ cities across India.',
};

export default async function ServicesPage() {
  const [hospitality, logistics, page] = await Promise.all([
    getHospitalityServices(),
    getLogisticsServices(),
    getPageServices(),
  ]);

  const pillars = [
    {
      id: 'hospitality',
      title: page?.pillarHospitalityTitle ?? "",
      description: page?.pillarHospitalityDescription ?? "",
      icon: <ConciergeBell className="w-7 h-7" />,
      color: 'maroon',
      href: '/services/hospitality',
      services: hospitality,
    },
    {
      id: 'logistics',
      title: page?.pillarLogisticsTitle ?? "",
      description: page?.pillarLogisticsDescription ?? "",
      icon: <Luggage className="w-7 h-7" />,
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
            eyebrow={page?.heroEyebrow ?? ""}
            title={page?.heroTitle ?? ""}
            subtitle={page?.heroSubtitle ?? ""}
            centered
          />
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button href="/contact" variant="primary" id="services-get-quote">{page?.getQuoteCta ?? ""} <ArrowRight className="w-4 h-4" /></Button>
            <Button href="/build-your-package" variant="ghost" id="services-build-package">{page?.buildPackageCta ?? ""}</Button>
          </div>
        </div>
      </section>

      {/* Service pillars */}
      {pillars.map((pillar) => (
        <section key={pillar.id} className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-maroon-700/10 flex items-center justify-center mb-3 text-maroon-700">
                  {pillar.icon}
                </div>
                <h2 className="font-display text-4xl text-maroon-700 font-semibold">{pillar.title}</h2>
                <p className="text-charcoal-muted mt-2 max-w-xl">{pillar.description}</p>
              </div>
              <Link href={pillar.href} className="inline-flex items-center gap-2 text-maroon-700 font-medium hover:gap-3 transition-all shrink-0">
                {page?.pillarCtaLabel?.replace('{title}', pillar.title) ?? ""} <ArrowRight className="w-4 h-4" />
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
                    {page?.serviceCardCta ?? ""} <ArrowRight className="w-3 h-3" />
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
          <h2 className="font-display text-4xl text-white font-semibold mb-4">{page?.ctaTitle}</h2>
          <p className="text-cream-200/80 mb-8">{page?.ctaSubtitle}</p>
          <Button href="/build-your-package" variant="secondary" size="lg" id="services-build-package-bottom">
            {page?.buildPackageCta ?? ""} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
