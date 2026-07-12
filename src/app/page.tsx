import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getHospitalityServices,
  getLogisticsServices,
  getSiteStats,
  getAllTestimonials,
  getRecentBlogPosts,
  getFeaturedCaseStudy,
} from "@/lib/repository";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl, formatDate } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Star,
  Shield,
  Users,
  FileText,
  Download,
  Calendar,
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ayan Hospitality — Wedding Hospitality & Logistics India | Be Our Guest",
  description:
    "India's trusted wedding hospitality and logistics company. 800+ weddings delivered, 1,00,000+ guests welcomed, 30+ cities. RSVP management, guest help desk, transfers, and the full range of on-ground services.",
};

const PARTNER_LOGOS = [
  "Taj Hotels",
  "ITC Hotels",
  "Leela Palaces",
  "Oberoi Hotels",
  "Hyatt India",
  "Marriott India",
  "Rambagh Palace",
  "Umaid Bhawan",
  "Four Seasons",
  "W Hotels",
  "JW Marriott",
  "The Lalit",
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Consultation",
    description:
      "A call with our team to understand your wedding — guest count, cities, events, and what matters most. No obligation.",
    icon: "💬",
  },
  {
    step: "02",
    title: "Custom Plan",
    description:
      "We build a detailed hospitality & logistics plan, assign your team, and share a timeline — weeks before the first guest arrives.",
    icon: "📋",
  },
  {
    step: "03",
    title: "On-Ground Execution",
    description:
      "Our team is on the ground from Day 1 — managing every transfer, query, ceremony, and surprise without bothering the family.",
    icon: "🎯",
  },
  {
    step: "04",
    title: "Post-Event Wrap",
    description:
      "Departure management, luggage dispatch, vendor returns, and a post-event report. We close every loop before we leave.",
    icon: "✅",
  },
];

export default async function HomePage() {
  const [hospitalityServices, logisticsServices, stats, testimonials, blogPosts, featuredCase] =
    await Promise.all([
      getHospitalityServices(),
      getLogisticsServices(),
      getSiteStats(),
      getAllTestimonials(),
      getRecentBlogPosts(3),
      getFeaturedCaseStudy(),
    ]);

  const waUrl = buildWhatsAppUrl(
    "Hi Ayan Hospitality, I'd like to discuss hospitality and logistics for my upcoming wedding."
  );

  return (
    <>
      {/* ─── 1. Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-maroon-900/70 via-maroon-900/40 to-maroon-900/80 z-10" />
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/hero-wedding.jpg')",
              backgroundColor: "#3D0D16",
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32 pt-40">
          <p className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-6 animate-fade-in">
            ✦ Be Our Guest ✦
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white leading-[1.05] mb-6">
            400 guests.
            <br />
            <span className="text-gradient-gold">3 cities.</span>
            <br />
            Zero chaos.
          </h1>
          <p className="text-cream-200/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Ayan Hospitality handles the complete hospitality and logistics of your
            wedding — so your family is free to celebrate, not manage.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" size="lg" variant="primary" id="hero-cta-quote">
              Get a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-cta-whatsapp"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-whatsapp text-white text-base font-medium hover:brightness-110 active:scale-95 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>

          {/* Trust indicators below hero */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {stats.slice(0, 3).map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold text-white">
                  {stat.value}
                  <span className="text-gold-400">{stat.suffix}</span>
                </div>
                <div className="text-cream-200/70 text-xs tracking-wide uppercase mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ─── 2. Trust Bar — Partner logos ────────────────────────────────── */}
      <section className="bg-white border-y border-cream-300 py-6 overflow-hidden" aria-label="Hotel and venue partners">
        <div className="relative">
          <div className="marquee-track">
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-10 shrink-0"
              >
                <span className="font-display text-charcoal-subtle text-base font-medium tracking-wide whitespace-nowrap hover:text-maroon-700 transition-colors cursor-default">
                  {logo}
                </span>
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ─── 3. Two Pillars ──────────────────────────────────────────────── */}
      <section className="section-padding bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Do"
            title="Two pillars. One seamless wedding."
            subtitle="We've built our work around the two things that determine whether a wedding runs beautifully or falls apart — Hospitality and Logistics."
            centered
          />

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hospitality Pillar */}
            <div className="group relative bg-white rounded-3xl overflow-hidden border border-cream-300 hover:shadow-warm-lg transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-maroon-700 to-gold-500" />
              <div className="p-8 lg:p-10">
                <div className="w-12 h-12 rounded-2xl bg-maroon-700/10 flex items-center justify-center mb-6">
                  <span className="text-2xl">🌸</span>
                </div>
                <h3 className="font-display text-3xl text-maroon-700 font-semibold mb-3">
                  Wedding Hospitality
                </h3>
                <p className="text-charcoal-muted leading-relaxed mb-6">
                  Every interaction a guest has — from the moment they RSVP to the moment they leave — is a reflection of your family. We make sure it's flawless.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {hospitalityServices.slice(0, 5).map((s) => (
                    <span
                      key={s.slug}
                      className="px-3 py-1 rounded-full bg-cream-200 text-maroon-700 text-xs font-medium"
                    >
                      {s.title}
                    </span>
                  ))}
                  <Link
                    href="/services/hospitality"
                    className="px-3 py-1 rounded-full border border-maroon-700/20 text-maroon-700 text-xs font-medium hover:bg-maroon-700 hover:text-white transition-colors"
                  >
                    +{hospitalityServices.length - 5} more →
                  </Link>
                </div>
                <Link
                  href="/services/hospitality"
                  className="inline-flex items-center gap-2 text-maroon-700 font-medium text-sm hover:gap-3 transition-all"
                >
                  Explore Hospitality Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Logistics Pillar */}
            <div className="group relative bg-white rounded-3xl overflow-hidden border border-cream-300 hover:shadow-warm-lg transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 to-maroon-700" />
              <div className="p-8 lg:p-10">
                <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-6">
                  <span className="text-2xl">🚁</span>
                </div>
                <h3 className="font-display text-3xl text-maroon-700 font-semibold mb-3">
                  Logistics & On-Ground Crew
                </h3>
                <p className="text-charcoal-muted leading-relaxed mb-6">
                  Transfers, luggage, multi-city movement, on-ground staff — the operational backbone of your wedding, run by a team that's done this hundreds of times.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {logisticsServices.slice(0, 5).map((s) => (
                    <span
                      key={s.slug}
                      className="px-3 py-1 rounded-full bg-gold-50 text-gold-700 text-xs font-medium"
                    >
                      {s.title}
                    </span>
                  ))}
                  <Link
                    href="/services/logistics"
                    className="px-3 py-1 rounded-full border border-gold-500/30 text-gold-600 text-xs font-medium hover:bg-gold-500 hover:text-white transition-colors"
                  >
                    +{logisticsServices.length - 5} more →
                  </Link>
                </div>
                <Link
                  href="/services/logistics"
                  className="inline-flex items-center gap-2 text-gold-600 font-medium text-sm hover:gap-3 transition-all"
                >
                  Explore Logistics Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. How It Works ─────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Process"
            title="From first call to final farewell"
            subtitle="Four steps that take you from overwhelmed to confident — and keep you there through every event."
            centered
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((step, index) => (
              <div key={step.step} className="relative">
                {index < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-gold-300 to-transparent -translate-y-1/2 z-0" />
                )}
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-cream-100 border border-cream-300 flex items-center justify-center mx-auto mb-4 text-3xl">
                    {step.icon}
                  </div>
                  <div className="text-gold-500 font-display text-sm font-semibold mb-2">
                    Step {step.step}
                  </div>
                  <h3 className="font-display text-xl text-maroon-700 font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-charcoal-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/contact" variant="primary" size="lg" id="how-it-works-cta">
              Start with a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── 5. Stats ────────────────────────────────────────────────────── */}
      <section className="section-padding bg-maroon-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                light
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Featured Case Study ──────────────────────────────────────── */}
      {featuredCase && (
        <section className="section-padding bg-cream-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Featured Work"
              title="What a seamless wedding looks like"
              centered
            />
            <div className="mt-10 bg-white rounded-4xl overflow-hidden border border-cream-300 shadow-warm-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-[4/3] lg:aspect-auto min-h-[300px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${featuredCase.heroImageUrl}')`,
                      backgroundColor: "#5E1522",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                      {featuredCase.location}
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                      {featuredCase.guestCount.toLocaleString("en-IN")} guests
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <p className="text-gold-500 text-xs font-semibold tracking-widest uppercase mb-4">
                    Case Study
                  </p>
                  <h3 className="font-display text-3xl lg:text-4xl text-maroon-700 font-semibold mb-6">
                    {featuredCase.title}
                  </h3>
                  <div className="space-y-4 mb-8">
                    <div>
                      <p className="text-xs font-semibold text-charcoal-muted uppercase tracking-wide mb-1">The Challenge</p>
                      <p className="text-charcoal-soft text-sm leading-relaxed">{featuredCase.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-charcoal-muted uppercase tracking-wide mb-1">The Outcome</p>
                      <p className="text-charcoal-soft text-sm leading-relaxed">{featuredCase.outcome}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button href={`/our-work/${featuredCase.slug}`} variant="primary" id="case-study-read">
                      Read the full story <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button href="/our-work" variant="ghost" id="case-study-all">
                      All case studies
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── 7. Testimonials ─────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What Families Say"
            title="Words that mean more than ours"
            centered
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((t) => (
              <div
                key={t.id}
                className="card-warm p-6 flex flex-col"
              >
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <blockquote className="text-charcoal-soft text-sm leading-relaxed flex-1 mb-6">
                  "{t.quote}"
                </blockquote>
                <div className="border-t border-cream-200 pt-4">
                  <p className="font-semibold text-charcoal text-sm">{t.clientName}</p>
                  <p className="text-charcoal-muted text-xs mt-0.5">{t.eventDescription}</p>
                  {t.venue && (
                    <p className="text-gold-500 text-xs mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {t.venue}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/testimonials" variant="ghost" id="testimonials-view-all">
              Read all testimonials <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── 8. For Planners Teaser ──────────────────────────────────────── */}
      <section className="section-padding bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-maroon-700 to-maroon-900 rounded-4xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-14 flex flex-col justify-center">
                <p className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  For Wedding Planners & Venues
                </p>
                <h2 className="font-display text-4xl lg:text-5xl text-white font-semibold mb-6 leading-tight">
                  A hospitality partner<br />
                  <span className="text-gold-400">you can trust with your name</span>
                </h2>
                <p className="text-cream-200/80 leading-relaxed mb-8">
                  We work with India's leading wedding planners and luxury hotels as a white-label or sub-contracted hospitality and logistics partner. Full SOPs, trained staff, and a track record of 800+ events.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { icon: <Shield className="w-5 h-5" />, label: "SOPs & Protocols" },
                    { icon: <Users className="w-5 h-5" />, label: "Trained Staff" },
                    { icon: <FileText className="w-5 h-5" />, label: "White-label Terms" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-cream-200/90 text-sm">
                      <span className="text-gold-400">{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button href="/for-planners" variant="secondary" size="lg" id="planners-cta">
                    Partner with us <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    href="/for-planners#capability-deck"
                    variant="outline"
                    size="lg"
                    id="planners-deck"
                  >
                    <Download className="w-4 h-4" /> Capability Deck
                  </Button>
                </div>
              </div>
              <div className="hidden lg:flex items-center justify-center p-14">
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  {[
                    { value: "800+", label: "Events managed" },
                    { value: "30+", label: "Cities" },
                    { value: "15+", label: "Years experience" },
                    { value: "100%", label: "Repeat referrals" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/10"
                    >
                      <div className="font-display text-3xl font-bold text-gold-400">
                        {item.value}
                      </div>
                      <div className="text-cream-200/70 text-xs mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. Founder Strip ────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Founder photo placeholder */}
            <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-cream-300 shadow-warm-lg shrink-0">
              <div
                className="w-full h-full bg-cover bg-center bg-maroon-700"
                style={{ backgroundImage: "url('/images/team/ayan-shah.jpg')" }}
              />
            </div>
            <div className="text-center lg:text-left max-w-2xl">
              <p className="text-gold-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                Founder-Led · 15+ Years
              </p>
              <blockquote className="font-display text-3xl lg:text-4xl text-maroon-700 font-semibold leading-tight mb-6">
                "I started this company because I saw, again and again, that the most important moments of a family's life were being left to chance."
              </blockquote>
              <p className="text-charcoal-muted leading-relaxed mb-6">
                Ayan Shah has spent 15 years in the wedding industry. He built Ayan Hospitality to be the team he always wished existed — one that takes the weight of operations completely off the host family's shoulders.
              </p>
              <div className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
                <div className="font-semibold text-charcoal">Ayan Shah</div>
                <div className="text-charcoal-muted text-sm">· Founder & Managing Director</div>
              </div>
              <Button href="/about" variant="ghost" id="founder-read-story">
                Read our story <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 10. Blog Preview ────────────────────────────────────────────── */}
      <section className="section-padding bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="From Our Journal"
            title="Insights from 800 weddings"
            centered
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group card-warm overflow-hidden block"
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105 bg-maroon-700"
                    style={{ backgroundImage: `url('${post.coverImageUrl}')` }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-gold-500 text-xs font-semibold">{post.category}</span>
                    <span className="text-charcoal-subtle text-xs">·</span>
                    <span className="text-charcoal-subtle text-xs">{post.readTime} min read</span>
                  </div>
                  <h3 className="font-display text-xl text-maroon-700 font-semibold leading-snug group-hover:text-gold-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-charcoal-muted text-sm mt-3 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-maroon-700 text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/blog" variant="ghost" id="blog-view-all">
              All articles <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── 11. Final CTA / Inline Contact Form ─────────────────────────── */}
      <section className="section-padding bg-gradient-to-br from-maroon-700 via-maroon-800 to-maroon-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            ✦ Be Our Guest ✦
          </p>
          <h2 className="font-display text-4xl lg:text-5xl text-white font-semibold mb-4">
            Planning a wedding?<br />Let's talk.
          </h2>
          <p className="text-cream-200/80 mb-10 text-lg">
            Tell us a little about your event and we'll get back to you within 24 hours.
          </p>

          <form
            action="/api/contact"
            method="POST"
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 lg:p-10"
            id="homepage-contact-form"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone / WhatsApp number"
                required
                className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
              />
              <input
                type="text"
                name="city"
                placeholder="Wedding city / venue"
                className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
              />
              <input
                type="text"
                name="guestCount"
                placeholder="Approx. guest count"
                className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
              />
            </div>
            <input
              type="date"
              name="eventDate"
              className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm mb-4"
            />
            <button
              type="submit"
              id="homepage-form-submit"
              className="w-full py-4 rounded-xl bg-gold-500 text-white font-semibold text-base hover:bg-gold-400 active:scale-[0.99] transition-all"
            >
              Request a Free Consultation
            </button>
            <p className="text-cream-200/50 text-xs mt-4 text-center">
              Or call us directly:{" "}
              <a href="tel:+918826104232" className="text-gold-400 hover:underline">
                +91 88261 04232
              </a>{" "}
              · We respond within 24 hours.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
