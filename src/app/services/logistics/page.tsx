import type { Metadata } from 'next';
import Link from 'next/link';
import { getLogisticsServices } from '@/lib/repository';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wedding Logistics & On-Ground Crew Services',
  description: 'Airport transfers, luxury vehicle coordination, luggage handling, multi-city logistics, event supervisors, shadows, runners, and more — across 30+ cities.',
};

export default async function LogisticsServicesPage() {
  const services = await getLogisticsServices();
  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-b from-cream-200 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Logistics Services"
            title="Every vehicle, bag, and person — in the right place"
            subtitle="Multi-city movement, airport transfers, luggage management, and a trained on-ground crew. We handle the operational backbone of your wedding."
          />
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/logistics/${s.slug}`} className="card-warm p-7 group block">
              <h3 className="font-display text-xl text-maroon-700 font-semibold mb-2 group-hover:text-gold-600 transition-colors">{s.title}</h3>
              <p className="text-charcoal-muted text-sm leading-relaxed mb-5">{s.shortDescription}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {s.included.slice(0, 3).map((item) => (
                  <span key={item} className="text-xs bg-gold-50 text-gold-700 px-2 py-1 rounded-full">{item}</span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-gold-600 text-sm font-medium group-hover:gap-2 transition-all">
                View service details <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
