import type { Metadata } from 'next';
import { getLeadership, getAllTeamMembers, getSiteSettings, getTimeline, getPageAbout } from '@/lib/repository';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { PortableText } from '@portabletext/react';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const founderName = settings?.founderName ?? "";
  return {
    title: 'About Us | Our Story & Team',
    description: `Founded by ${founderName} after 15+ years in the wedding industry, Ayan Hospitality was built to take the chaos of operations completely off the host family's shoulders. Meet our team.`,
  };
}

export default async function AboutPage() {
  const [leadership, allTeam, settings, fetchedTimeline, page] = await Promise.all([
    getLeadership(),
    getAllTeamMembers(),
    getSiteSettings(),
    getTimeline(),
    getPageAbout(),
  ]);
  const crew = allTeam.filter((m) => !m.isLeadership);
  const timelineData = fetchedTimeline || [];
  const founderName = settings?.founderName ?? "";

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-maroon-900 to-maroon-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-6">{page?.heroEyebrow}</p>
          <h1 className="font-display text-5xl lg:text-6xl text-white font-semibold mb-6 leading-tight">
            {page?.heroTitle?.split('\n').map((line, i, arr) => (
              <span key={i}>
                {i === 0 ? <em>&ldquo;{line}&rdquo;</em> : <>{line}</>}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="text-cream-200/80 text-lg leading-relaxed max-w-2xl mx-auto">
            {page?.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Founder story */}
      <section className="section-padding bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading eyebrow={page?.founderStoryEyebrow ?? ""} title={page?.founderStoryTitle ?? ""} />
              <div className="mt-6 space-y-5 text-charcoal-soft leading-relaxed">
                {page?.founderStoryText && (
                  <div className="prose prose-sm md:prose-base prose-p:text-charcoal-soft prose-p:leading-relaxed max-w-none">
                    <PortableText value={page.founderStoryText} />
                  </div>
                )}
                <p>&ldquo;{settings?.founderQuote}&rdquo;</p>
              </div>
            </div>
            {/* Timeline */}
            <div className="space-y-6">
              {timelineData.map((item, idx) => (
                <div key={item.year} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">{item.year.slice(2)}</span>
                    </div>
                    {idx < timelineData.length - 1 && <div className="w-px flex-1 bg-gold-200 mt-2" />}
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
          <SectionHeading eyebrow={page?.leadershipEyebrow ?? ""} title={page?.leadershipTitle ?? ""} centered />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member) => (
              <div key={member.id} className="text-center card-warm p-8">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-5 border-4 border-cream-200">
                  {member.avatarUrl ? (
                    <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-maroon-700 flex items-center justify-center">
                      <span className="font-display text-3xl text-gold-400 font-bold">{member.name.charAt(0)}</span>
                    </div>
                  )}
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
          <SectionHeading eyebrow={page?.crewEyebrow ?? ""} title={page?.crewTitle ?? ""} subtitle={page?.crewSubtitle ?? ""} centered />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {crew.map((member) => (
              <div key={member.id} className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-cream-300">
                  {member.avatarUrl ? (
                    <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-maroon-700 flex items-center justify-center">
                      <span className="font-display text-2xl text-gold-400 font-bold">{member.name.charAt(0)}</span>
                    </div>
                  )}
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
          <h2 className="font-display text-4xl text-white font-semibold mb-4">{page?.ctaTitle ?? ""}</h2>
          <p className="text-cream-200/80 mb-8">{page?.ctaSubtitle ?? ""}</p>
          <Button href="/contact" variant="secondary" size="lg" id="about-cta">{page?.ctaButtonLabel ?? ""} <ArrowRight className="w-4 h-4" /></Button>
        </div>
      </section>
    </div>
  );
}
