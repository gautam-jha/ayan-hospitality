import type { Metadata } from 'next';
import { getLeadership, getAllTeamMembers } from '@/lib/repository';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Our Story & Team',
  description: 'Founded by Ayan Shah after 15+ years in the wedding industry, Ayan Hospitality was built to take the chaos of operations completely off the host family\'s shoulders. Meet our team.',
};

const TIMELINE = [
  { year: '2009', event: 'First steps in the industry', detail: 'Ayan begins working in wedding operations, learning the industry from the ground up, event by event.' },
  { year: '2014', event: 'Seeing the gap', detail: 'After managing hundreds of events, a pattern becomes clear: logistics and hospitality are consistently the most under-planned, most impactful parts of a wedding. No dedicated company exists to fix this.' },
  { year: '2018', event: 'The founding insight', detail: '"Every family I worked with spent their wedding managing things instead of celebrating it. I wanted to change that." - Ayan Shah' },
  { year: '2020', event: 'Ayan Hospitality is founded', detail: 'Launched with a small team and a clear mission: be the company that takes the full weight of hospitality and logistics off the host family.' },
  { year: '2024', event: '800+ weddings later', detail: 'A team of 50+ trained professionals, presence in 30+ cities, and a reputation built entirely on referrals and repeat clients.' },
];

export default async function AboutPage() {
  const [leadership, allTeam] = await Promise.all([getLeadership(), getAllTeamMembers()]);
  const crew = allTeam.filter((m) => !m.isLeadership);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-maroon-900 to-maroon-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-6">Our Story</p>
          <h1 className="font-display text-5xl lg:text-6xl text-white font-semibold mb-6 leading-tight">
            <em>&ldquo;Be Our Guest&rdquo;</em><br />A philosophy, not a tagline
          </h1>
          <p className="text-cream-200/80 text-lg leading-relaxed max-w-2xl mx-auto">
            In Indian culture, a guest is akin to God. Ayan Hospitality was built around one question: what does it look like to honour that belief at scale for hundreds of guests across a multi-day celebration?
          </p>
        </div>
      </section>

      {/* Founder story */}
      <section className="section-padding bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading eyebrow="Founder's Story" title="15 years. 800+ weddings. One mission." />
              <div className="mt-6 space-y-5 text-charcoal-soft leading-relaxed">
                <p>Ayan Shah spent his first decade in the wedding industry watching the same story repeat itself: a family would plan every detail of their wedding, including the decor, food, and music, and then hand the guest experience to a fragmented collection of vendors who had never worked together before.</p>
                <p>The result was always some version of the same chaos: guests who couldn&apos;t find their driver, luggage that arrived at the wrong room, elderly relatives who needed help but didn&apos;t know who to call, a help desk that was really just a harried family member&apos;s phone number.</p>
                <p>&ldquo;Every family I worked with spent their wedding managing things instead of celebrating it. I wanted to change that.&rdquo;</p>
                <p>He founded Ayan Hospitality to be the company he always wished existed: one that doesn&apos;t just describe hospitality as a service, but actually delivers it as an experience.</p>
              </div>
            </div>
            {/* Timeline */}
            <div className="space-y-6">
              {TIMELINE.map((item, idx) => (
                <div key={item.year} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">{item.year.slice(2)}</span>
                    </div>
                    {idx < TIMELINE.length - 1 && <div className="w-px flex-1 bg-gold-200 mt-2" />}
                  </div>
                  <div className="pb-6">
                    <div className="text-gold-600 text-xs font-semibold mb-1">{item.year}</div>
                    <h3 className="font-display text-lg text-maroon-700 font-semibold">{item.event}</h3>
                    <p className="text-charcoal-muted text-sm leading-relaxed mt-1">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership team */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Leadership" title="The team behind every wedding" centered />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member) => (
              <div key={member.id} className="text-center card-warm p-8">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-5 border-4 border-cream-200">
                  <div className="w-full h-full bg-maroon-700 flex items-center justify-center">
                    <span className="font-display text-3xl text-gold-400 font-bold">{member.name.charAt(0)}</span>
                  </div>
                </div>
                <h3 className="font-display text-xl text-maroon-700 font-semibold">{member.name}</h3>
                <p className="text-gold-500 text-sm font-medium mt-1 mb-4">{member.role}</p>
                {member.bio && <p className="text-charcoal-muted text-sm leading-relaxed">{member.bio}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* On-ground crew */}
      <section className="section-padding bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="On-Ground Crew" title="Named roles, trained people" subtitle="We believe trust starts with knowing who is actually managing your wedding. Every role has a face and a name." centered />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {crew.map((member) => (
              <div key={member.id} className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-cream-300 bg-maroon-700 flex items-center justify-center">
                  <span className="font-display text-2xl text-gold-400 font-bold">{member.name.charAt(0)}</span>
                </div>
                <p className="font-semibold text-charcoal text-sm">{member.name}</p>
                <p className="text-charcoal-muted text-xs mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-maroon-700">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl text-white font-semibold mb-4">Ready to plan your wedding with us?</h2>
          <p className="text-cream-200/80 mb-8">One conversation is all it takes to understand what Ayan Hospitality can do for your family.</p>
          <Button href="/contact" variant="secondary" size="lg" id="about-cta">Get a Free Consultation <ArrowRight className="w-4 h-4" /></Button>
        </div>
      </section>
    </div>
  );
}
