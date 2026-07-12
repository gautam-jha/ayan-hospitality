import type { Metadata } from 'next';
import Link from 'next/link';
import { getHospitalityServices } from '@/lib/repository';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wedding Hospitality Management Services',
  description: 'RSVP management, guest help desk, VIP handling, ritual coordination, F&B management, and more — complete wedding hospitality services across India.',
};

export default async function HospitalityServicesPage() {
  const services = await getHospitalityServices();
  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-b from-cream-200 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Hospitality Services"
            title="Every guest experience, taken care of"
            subtitle="From the first RSVP to the final farewell — we manage every human touchpoint so your guests feel genuinely welcomed."
          />
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/hospitality/${s.slug}`} className="card-warm p-7 group block">
              <h3 className="font-display text-xl text-maroon-700 font-semibold mb-2 group-hover:text-gold-600 transition-colors">{s.title}</h3>
              <p className="text-charcoal-muted text-sm leading-relaxed mb-5">{s.shortDescription}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {s.included.slice(0, 3).map((item) => (
                  <span key={item} className="text-xs bg-cream-100 text-charcoal-soft px-2 py-1 rounded-full">{item}</span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-maroon-700 text-sm font-medium group-hover:gap-2 transition-all">
                View service details <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
