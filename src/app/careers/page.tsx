import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers — Join the Ayan Hospitality Team',
  description: 'Join India\'s trusted wedding hospitality and logistics team. We\'re always looking for passionate, professional people — full-time, part-time, and event-day gig work available.',
};

const ROLES = [
  { title: 'Event Supervisor', type: 'Full-time / Per event', location: 'Pan India', desc: 'Senior on-ground lead managing a team across a full event. Requires 3+ years of events experience.' },
  { title: 'Guest Relations Executive', type: 'Full-time', location: 'Delhi NCR / Mumbai / Bangalore', desc: 'Part of our help desk and guest experience team. Hotel or luxury hospitality background preferred.' },
  { title: 'Logistics Coordinator', type: 'Full-time', location: 'Delhi NCR', desc: 'Managing transfers, drivers, and multi-city logistics for events. Strong on operations and communication.' },
  { title: 'Shadow (Guest Support)', type: 'Per event (Gig)', location: 'Pan India', desc: 'Dedicated one-to-one guest support for specific guests. Ideal for hospitality students and part-time professionals.' },
  { title: 'Runner', type: 'Per event (Gig)', location: 'Pan India', desc: 'On-ground support across event zones. Physical, fast-paced, and great for people new to event work.' },
  { title: 'Porter Team Lead', type: 'Per event (Gig)', location: 'Pan India', desc: 'Managing a small porter team at hotel arrivals and departures. Experience with luggage handling preferred.' },
];

export default function CareersPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-b from-maroon-900 to-maroon-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-6">Join Our Team</p>
            <h1 className="font-display text-5xl lg:text-6xl text-white font-semibold mb-6 leading-tight">
              The people who make it happen
            </h1>
            <p className="text-cream-200/80 text-lg leading-relaxed mb-8">
              Ayan Hospitality is built on the people on the ground — the supervisors, shadows, coordinators, and runners who make 400-guest weddings feel personal. If that's the kind of work you love, we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Open Positions" title="Current openings" centered />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {ROLES.map((role) => (
              <div key={role.title} className="card-warm p-7">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-display text-xl text-maroon-700 font-semibold">{role.title}</h3>
                  <span className="text-xs bg-cream-200 text-charcoal-muted px-3 py-1 rounded-full shrink-0 ml-3">{role.type}</span>
                </div>
                <p className="text-gold-500 text-xs font-medium mb-3">📍 {role.location}</p>
                <p className="text-charcoal-muted text-sm leading-relaxed mb-5">{role.desc}</p>
                <a
                  href={`mailto:careers@ayanhospitality.com?subject=Application: ${role.title}`}
                  className="inline-flex items-center gap-1 text-maroon-700 text-sm font-medium hover:gap-2 transition-all"
                >
                  Apply for this role <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-maroon-700 rounded-3xl p-10 text-center">
            <h3 className="font-display text-3xl text-white font-semibold mb-3">Don't see your role?</h3>
            <p className="text-cream-200/80 mb-6">We're always growing. Send us your CV and tell us how you'd like to contribute.</p>
            <a
              href="mailto:careers@ayanhospitality.com"
              id="careers-general-apply"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-500 text-white font-semibold hover:bg-gold-400 active:scale-95 transition-all"
            >
              Send us your CV
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
