import type { Metadata } from 'next';
import { getAllDestinations } from '@/lib/repository';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MapPin, Building2, Castle, Mountain, Plane } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Destinations | Cities & Regions We Cover',
  description: 'Ayan Hospitality covers 30+ cities across India, including metros, leisure destinations, and select international destinations. View the full list.',
};

export default async function DestinationsPage() {
  const destinations = await getAllDestinations();
  const indian = destinations.filter((d) => !d.isInternational);
  const international = destinations.filter((d) => d.isInternational);

  const metros = indian.filter((d) => d.tier === 'metro');
  const weddingDests = indian.filter((d) => d.tier === 'destination');
  const leisure = indian.filter((d) => d.tier === 'leisure');

  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-b from-cream-200 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            eyebrow="Where We Work"
            title="30+ cities. One team."
            subtitle="From metro cities to palace destinations, hill retreats to international venues, our on-ground team has you covered."
            centered
          />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Metros */}
          <div>
            <h2 className="font-display text-3xl text-maroon-700 font-semibold mb-8 flex items-center gap-3">
              <Building2 className="w-8 h-8 text-maroon-700" /> Metro Cities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {metros.map((d) => (
                <div key={d.id} className="card-warm p-5 flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-charcoal">{d.city}</p>
                    <p className="text-charcoal-muted text-xs">{d.region}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wedding destinations */}
          <div>
            <h2 className="font-display text-3xl text-maroon-700 font-semibold mb-8 flex items-center gap-3">
              <Castle className="w-8 h-8 text-maroon-700" /> Destination Weddings
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {weddingDests.map((d) => (
                <div key={d.id} className="card-warm p-5 flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-charcoal">{d.city}</p>
                    <p className="text-charcoal-muted text-xs">{d.region}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leisure */}
          {leisure.length > 0 && (
            <div>
              <h2 className="font-display text-3xl text-maroon-700 font-semibold mb-8 flex items-center gap-3">
                <Mountain className="w-8 h-8 text-maroon-700" /> Leisure Destinations
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {leisure.map((d) => (
                  <div key={d.id} className="card-warm p-5 flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                    <div>
                      <p className="font-semibold text-charcoal">{d.city}</p>
                      <p className="text-charcoal-muted text-xs">{d.region}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* International */}
          <div>
            <h2 className="font-display text-3xl text-maroon-700 font-semibold mb-3 flex items-center gap-3">
              <Plane className="w-8 h-8 text-maroon-700" /> International Destinations
            </h2>
            <p className="text-charcoal-muted mb-8">We manage destination weddings internationally, bringing our full team and coordinating with trusted local logistics partners.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {international.map((d) => (
                <div key={d.id} className="card-warm p-5 flex items-center gap-3 border-gold-200">
                  <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-charcoal">{d.city}</p>
                    <p className="text-charcoal-muted text-xs">{d.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-maroon-700/5 border border-maroon-700/10 rounded-3xl p-8 text-center">
            <p className="font-display text-2xl text-maroon-700 font-semibold mb-3">Don&apos;t see your city?</p>
            <p className="text-charcoal-muted mb-6">We may still be able to cover your event. Get in touch and we&apos;ll tell you what&apos;s possible.</p>
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-maroon-700 text-white font-medium hover:bg-maroon-800 transition-colors">
              Ask about your destination
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
