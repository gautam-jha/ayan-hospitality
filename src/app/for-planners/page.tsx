import type { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Shield, Users, FileText, Download, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Wedding Planners & Venues | Partner with Ayan Hospitality',
  description: 'White-label and sub-contract wedding hospitality & logistics services for wedding planners, hotels, and event companies. SOPs, trained staff, full capability deck available.',
};

const CREDIBILITY_POINTS = [
  { icon: Shield, title: 'SOPs & Protocols', desc: 'Documented Standard Operating Procedures for every service, shareable with your team and your client.' },
  { icon: Users, title: 'Trained, Verified Staff', desc: 'All on-ground staff complete our internal training programme. Vetting documentation is available on request.' },
  { icon: FileText, title: 'White-label Terms', desc: 'We operate fully under your brand if required, with NDAs available and no direct contact with your client without your consent.' },
  { icon: CheckCircle2, title: 'Seamless Integration', desc: 'We align with your existing vendor structure, attend your pre-event briefings, and report directly to your project lead.' },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Initial Briefing', desc: 'Share your event brief with us. We ask the right questions and come back with a scoped proposal within 48 hours.' },
  { step: '02', title: 'Proposal & Agreement', desc: 'We confirm scope, team size, and pricing. NDAs and white-label agreements are signed if required.' },
  { step: '03', title: 'Pre-event Integration', desc: 'We join your pre-event calls, align with your team, and share our deployment plan for your review.' },
  { step: '04', title: 'On-ground Execution', desc: 'Our team operates as part of your event, reporting to your lead, maintaining your standards, and remaining invisible to the client if you prefer.' },
];

export default function ForPlannersPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-maroon-900 to-maroon-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-6">For Wedding Planners & Venues</p>
            <h1 className="font-display text-5xl lg:text-6xl text-white font-semibold mb-6 leading-tight">
              A hospitality partner you can trust with your reputation
            </h1>
            <p className="text-cream-200/80 text-lg leading-relaxed mb-8">
              We work with India&apos;s leading wedding planners and luxury hotels as a white-label or sub-contracted hospitality and logistics partner. We bring 800+ events of experience, detailed SOPs, and a professional team that seamlessly integrates with yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="#b2b-contact" variant="secondary" size="lg" id="planners-hero-cta">Partner with us <ArrowRight className="w-4 h-4" /></Button>
              <Button href="#capability-deck" variant="outline" size="lg" id="planners-deck">
                <Download className="w-4 h-4" /> Download Capability Deck
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility */}
      <section className="section-padding bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Why Planners Choose Us" title="The rigour your clients expect" centered />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CREDIBILITY_POINTS.map((point) => (
              <div key={point.title} className="card-warm p-7 text-center">
                <div className="w-12 h-12 rounded-2xl bg-maroon-700/10 flex items-center justify-center mx-auto mb-4">
                  <point.icon className="w-6 h-6 text-maroon-700" />
                </div>
                <h3 className="font-display text-lg text-maroon-700 font-semibold mb-3">{point.title}</h3>
                <p className="text-charcoal-muted text-sm leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How We Work Together" title="From brief to execution" centered />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gold-500 text-white font-bold flex items-center justify-center mx-auto mb-4 font-display text-lg">{step.step}</div>
                <h3 className="font-display text-lg text-maroon-700 font-semibold mb-2">{step.title}</h3>
                <p className="text-charcoal-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capability deck */}
      <section id="capability-deck" className="section-padding bg-cream-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading eyebrow="Capability Deck" title="Everything you need to evaluate us" centered />
          <p className="text-charcoal-muted mt-4 mb-8 leading-relaxed">Our capability deck covers services, team structure, staff training protocols, past event highlights, and pricing structure. Downloadable as PDF.</p>
          <Button href="/downloads/ayan-hospitality-capability-deck.pdf" variant="primary" size="lg" external id="capability-deck-download">
            <Download className="w-5 h-5" /> Download Capability Deck (PDF)
          </Button>
        </div>
      </section>

      {/* B2B contact */}
      <section id="b2b-contact" className="section-padding bg-maroon-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <SectionHeading eyebrow="Partner With Us" title="Start a conversation" light centered />
          </div>
          <form action="/api/contact" method="POST" id="b2b-contact-form" className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 space-y-5">
            <input type="hidden" name="type" value="b2b" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input type="text" name="name" required placeholder="Your name" className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm" />
              <input type="text" name="company" placeholder="Company / Firm name" className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm" />
              <input type="tel" name="phone" required placeholder="Phone / WhatsApp" className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm" />
              <input type="email" name="email" placeholder="Email address" className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm" />
            </div>
            <textarea name="message" rows={4} placeholder="Tell us about the type of events you work on and what you're looking for in a hospitality partner…" className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm resize-none" />
            <button type="submit" id="b2b-form-submit" className="w-full py-4 rounded-xl bg-gold-500 text-white font-semibold text-base hover:bg-gold-400 active:scale-[0.99] transition-all">Send Partnership Enquiry</button>
          </form>
        </div>
      </section>
    </div>
  );
}
