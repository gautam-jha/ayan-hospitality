/**
 * Repository layer — Sanity CMS implementation.
 *
 * All data access goes through these async functions. The return types match
 * the TypeScript interfaces in src/lib/types.ts so that all pages and
 * components continue to work without changes.
 */

import { sanityFetch as liveFetch } from "@/sanity/live";
import { urlFor } from "@/sanity/client";

// Wrapper helper to keep the original signature while using Live Content API
async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  const { data } = await liveFetch({ query, params });
  return data as T;
}
import type {
  Service,
  Testimonial,
  TeamMember,
  FAQ,
  Destination,
  SiteStat,
  BlogPost,
  CaseStudy,
} from "@/lib/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Convert a Sanity image field to a URL string, with a fallback. */
function imageUrl(imageField: unknown, fallback = ""): string {
  if (!imageField) return fallback;
  try {
    return urlFor(imageField as Parameters<typeof urlFor>[0]).url();
  } catch {
    return fallback;
  }
}

// ─── Services ─────────────────────────────────────────────────────────────────

const SERVICE_FIELDS = `
  "slug": slug.current,
  pillar,
  title,
  shortDescription,
  longDescription,
  icon,
  included,
  timelineNote,
  whatsappMessage,
  "testimonialId": testimonial->_id,
  metaTitle,
  metaDescription
`;

export async function getAllServices(): Promise<Service[]> {
  return sanityFetch<Service[]>(
    `*[_type == "service"] | order(pillar asc, title asc) { ${SERVICE_FIELDS} }`
  );
}

export async function getHospitalityServices(): Promise<Service[]> {
  return sanityFetch<Service[]>(
    `*[_type == "service" && pillar == "hospitality"] | order(title asc) { ${SERVICE_FIELDS} }`
  );
}

export async function getLogisticsServices(): Promise<Service[]> {
  return sanityFetch<Service[]>(
    `*[_type == "service" && pillar == "logistics"] | order(title asc) { ${SERVICE_FIELDS} }`
  );
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return sanityFetch<Service | null>(
    `*[_type == "service" && slug.current == $slug][0] { ${SERVICE_FIELDS} }`,
    { slug }
  );
}

export async function getServicesByPillar(
  pillar: "hospitality" | "logistics"
): Promise<Service[]> {
  return sanityFetch<Service[]>(
    `*[_type == "service" && pillar == $pillar] | order(title asc) { ${SERVICE_FIELDS} }`,
    { pillar }
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTestimonial(raw: any): Testimonial {
  return {
    id: raw._id,
    quote: raw.quote,
    clientName: raw.clientName,
    eventDescription: raw.eventDescription,
    venue: raw.venue,
    serviceIds: (raw.services ?? []).map((s: { slug: string }) => s.slug),
    avatarUrl: imageUrl(raw.avatar),
  };
}

const TESTIMONIAL_FIELDS = `
  _id,
  quote,
  clientName,
  eventDescription,
  venue,
  "services": services[]->{ "slug": slug.current },
  avatar
`;

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const raw = await sanityFetch<unknown[]>(
    `*[_type == "testimonial"] { ${TESTIMONIAL_FIELDS} }`
  );
  return raw.map(mapTestimonial);
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  const raw = await sanityFetch<unknown | null>(
    `*[_type == "testimonial" && _id == $id][0] { ${TESTIMONIAL_FIELDS} }`,
    { id }
  );
  return raw ? mapTestimonial(raw) : null;
}

export async function getFeaturedTestimonials(count = 6): Promise<Testimonial[]> {
  const raw = await sanityFetch<unknown[]>(
    `*[_type == "testimonial"][0...$count] { ${TESTIMONIAL_FIELDS} }`,
    { count }
  );
  return raw.map(mapTestimonial);
}

// ─── Team ──────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTeamMember(raw: any): TeamMember {
  return {
    id: raw._id,
    name: raw.name,
    role: raw.role,
    bio: raw.bio,
    avatarUrl: imageUrl(raw.avatar),
    isLeadership: raw.isLeadership ?? false,
  };
}

const TEAM_FIELDS = `_id, name, role, bio, avatar, isLeadership, order`;

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const raw = await sanityFetch<unknown[]>(
    `*[_type == "teamMember"] | order(order asc) { ${TEAM_FIELDS} }`
  );
  return raw.map(mapTeamMember);
}

export async function getLeadership(): Promise<TeamMember[]> {
  const raw = await sanityFetch<unknown[]>(
    `*[_type == "teamMember" && isLeadership == true] | order(order asc) { ${TEAM_FIELDS} }`
  );
  return raw.map(mapTeamMember);
}

// ─── FAQs ──────────────────────────────────────────────────────────────────────

export async function getAllFAQs(): Promise<FAQ[]> {
  return sanityFetch<FAQ[]>(
    `*[_type == "faq"] | order(category asc, order asc) {
      "id": _id,
      question,
      answer,
      category
    }`
  );
}

export async function getFAQsByCategory(
  category: FAQ["category"]
): Promise<FAQ[]> {
  return sanityFetch<FAQ[]>(
    `*[_type == "faq" && category == $category] | order(order asc) {
      "id": _id,
      question,
      answer,
      category
    }`,
    { category }
  );
}

// ─── Destinations ──────────────────────────────────────────────────────────────

export async function getAllDestinations(): Promise<Destination[]> {
  return sanityFetch<Destination[]>(
    `*[_type == "destination"] | order(city asc) {
      "id": _id,
      city,
      region,
      country,
      isInternational,
      tier
    }`
  );
}

export async function getIndianDestinations(): Promise<Destination[]> {
  return sanityFetch<Destination[]>(
    `*[_type == "destination" && isInternational == false] | order(city asc) {
      "id": _id,
      city,
      region,
      country,
      isInternational,
      tier
    }`
  );
}

export async function getInternationalDestinations(): Promise<Destination[]> {
  return sanityFetch<Destination[]>(
    `*[_type == "destination" && isInternational == true] | order(city asc) {
      "id": _id,
      city,
      region,
      country,
      isInternational,
      tier
    }`
  );
}

// ─── Stats ─────────────────────────────────────────────────────────────────────

export async function getSiteStats(): Promise<SiteStat[]> {
  const settings = await sanityFetch<{ stats: SiteStat[] } | null>(
    `*[_type == "siteSettings"][0] { stats }`
  );
  return settings?.stats ?? [];
}

// ─── Blog ──────────────────────────────────────────────────────────────────────

const BLOG_LIST_FIELDS = `
  "slug": slug.current,
  title,
  excerpt,
  "coverImageUrl": coverImage,
  date,
  readTime,
  category
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBlogPost(raw: any): BlogPost {
  return {
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    coverImageUrl: imageUrl(raw.coverImageUrl),
    date: raw.date,
    readTime: raw.readTime,
    category: raw.category,
    body: raw.body,
  };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const raw = await sanityFetch<unknown[]>(
    `*[_type == "blogPost"] | order(date desc) { ${BLOG_LIST_FIELDS} }`
  );
  return raw.map(mapBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const raw = await sanityFetch<unknown | null>(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      ${BLOG_LIST_FIELDS},
      body
    }`,
    { slug }
  );
  return raw ? mapBlogPost(raw) : null;
}

export async function getRecentBlogPosts(count = 3): Promise<BlogPost[]> {
  const raw = await sanityFetch<unknown[]>(
    `*[_type == "blogPost"] | order(date desc)[0...$count] { ${BLOG_LIST_FIELDS} }`,
    { count }
  );
  return raw.map(mapBlogPost);
}

// ─── Case Studies ──────────────────────────────────────────────────────────────

const CASE_STUDY_FIELDS = `
  "slug": slug.current,
  title,
  location,
  guestCount,
  serviceTypes,
  "heroImageUrl": heroImage,
  "galleryImageUrls": galleryImages,
  challenge,
  whatWeDid,
  outcome,
  "testimonialId": testimonial->_id,
  date
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCaseStudy(raw: any): CaseStudy {
  return {
    slug: raw.slug,
    title: raw.title,
    location: raw.location,
    guestCount: raw.guestCount,
    serviceTypes: raw.serviceTypes ?? [],
    heroImageUrl: imageUrl(raw.heroImageUrl),
    galleryImageUrls: (raw.galleryImageUrls ?? []).map(imageUrl),
    challenge: raw.challenge,
    whatWeDid: raw.whatWeDid,
    outcome: raw.outcome,
    testimonialId: raw.testimonialId,
    date: raw.date,
  };
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const raw = await sanityFetch<unknown[]>(
    `*[_type == "caseStudy"] | order(date desc) { ${CASE_STUDY_FIELDS} }`
  );
  return raw.map(mapCaseStudy);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const raw = await sanityFetch<unknown | null>(
    `*[_type == "caseStudy" && slug.current == $slug][0] { ${CASE_STUDY_FIELDS} }`,
    { slug }
  );
  return raw ? mapCaseStudy(raw) : null;
}

export async function getFeaturedCaseStudy(): Promise<CaseStudy | null> {
  const raw = await sanityFetch<unknown | null>(
    `*[_type == "caseStudy" && featured == true] | order(date desc)[0] { ${CASE_STUDY_FIELDS} }`
  );
  // Fallback: first case study if none flagged as featured
  if (!raw) {
    const fallback = await sanityFetch<unknown | null>(
      `*[_type == "caseStudy"] | order(date desc)[0] { ${CASE_STUDY_FIELDS} }`
    );
    return fallback ? mapCaseStudy(fallback) : null;
  }
  return mapCaseStudy(raw);
}

// ─── Secondary page content ────────────────────────────────────────────────────

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export async function getHowItWorksSteps(): Promise<HowItWorksStep[]> {
  return sanityFetch<HowItWorksStep[]>(
    `*[_type == "howItWorksStep"] | order(order asc) { step, title, description, icon }`
  );
}

export interface TimelineEvent {
  year: string;
  event: string;
  detail: string;
}

export async function getTimeline(): Promise<TimelineEvent[]> {
  return sanityFetch<TimelineEvent[]>(
    `*[_type == "timelineEvent"] | order(order asc) { year, event, detail }`
  );
}

export interface CredibilityPoint {
  title: string;
  description: string;
  icon: string;
}

export async function getCredibilityPoints(): Promise<CredibilityPoint[]> {
  return sanityFetch<CredibilityPoint[]>(
    `*[_type == "credibilityPoint"] | order(order asc) { title, description, icon }`
  );
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export async function getB2BProcessSteps(): Promise<ProcessStep[]> {
  return sanityFetch<ProcessStep[]>(
    `*[_type == "processStep"] | order(order asc) { step, title, description, icon }`
  );
}

export interface JobListing {
  title: string;
  type: string;
  location: string;
  description: string;
}

export async function getActiveJobListings(): Promise<JobListing[]> {
  return sanityFetch<JobListing[]>(
    `*[_type == "jobListing" && isActive == true] | order(order asc) { title, type, location, description }`
  );
}

export interface GuestFAQ {
  question: string;
  answer: string;
}

export async function getGuestFAQs(): Promise<GuestFAQ[]> {
  return sanityFetch<GuestFAQ[]>(
    `*[_type == "guestFaq"] | order(order asc) { question, answer }`
  );
}

// ─── Singletons for Pages ───────────────────────────────────────────────────

export interface PageHome {
  pillarsEyebrow: string;
  pillarsTitle: string;
  pillarsSubtitle: string;
  processEyebrow: string;
  processTitle: string;
  processSubtitle: string;
}

export async function getPageHome(): Promise<PageHome | null> {
  const raw = await sanityFetch<any | null>(`*[_type == "pageHome"][0]`);
  return raw ? {
    pillarsEyebrow: raw.pillarsEyebrow ?? "",
    pillarsTitle: raw.pillarsTitle ?? "",
    pillarsSubtitle: raw.pillarsSubtitle ?? "",
    processEyebrow: raw.processEyebrow ?? "",
    processTitle: raw.processTitle ?? "",
    processSubtitle: raw.processSubtitle ?? "",
  } : null;
}

export interface PageAbout {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  founderStoryEyebrow: string;
  founderStoryTitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  founderStoryText: any;
}

export async function getPageAbout(): Promise<PageAbout | null> {
  const raw = await sanityFetch<any | null>(`*[_type == "pageAbout"][0]`);
  return raw ? {
    heroEyebrow: raw.heroEyebrow ?? "",
    heroTitle: raw.heroTitle ?? "",
    heroSubtitle: raw.heroSubtitle ?? "",
    founderStoryEyebrow: raw.founderStoryEyebrow ?? "",
    founderStoryTitle: raw.founderStoryTitle ?? "",
    founderStoryText: raw.founderStoryText ?? null,
  } : null;
}

export interface PageServices {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
}

export async function getPageServices(): Promise<PageServices | null> {
  const raw = await sanityFetch<any | null>(`*[_type == "pageServices"][0]`);
  return raw ? {
    heroEyebrow: raw.heroEyebrow ?? "",
    heroTitle: raw.heroTitle ?? "",
    heroSubtitle: raw.heroSubtitle ?? "",
    ctaTitle: raw.ctaTitle ?? "",
    ctaSubtitle: raw.ctaSubtitle ?? "",
  } : null;
}

export interface PageContact {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
}

export async function getPageContact(): Promise<PageContact | null> {
  const raw = await sanityFetch<any | null>(`*[_type == "pageContact"][0]`);
  return raw ? {
    heroEyebrow: raw.heroEyebrow ?? "",
    heroTitle: raw.heroTitle ?? "",
    heroSubtitle: raw.heroSubtitle ?? "",
  } : null;
}

export interface SiteSettings {
  whatsAppNumber: string;
  phone: string;
  email: string;
  address: string;
  founderName: string;
  founderTitle: string;
  founderBio: string;
  founderQuote: string;
  founderImageUrl: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  partnerLogos: { name: string; logoUrl: string }[];
}

export async function getAreaServed(): Promise<string[]> {
  const indianCountries = ["India"];
  const intl = await getInternationalDestinations();
  const intlCountries = [...new Set(intl.map(d => d.country))].sort();
  return [...indianCountries, ...intlCountries];
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = await sanityFetch<any | null>(
    `*[_type == "siteSettings"][0] {
      whatsAppNumber,
      phone,
      email,
      address,
      founderName,
      founderTitle,
      founderBio,
      founderQuote,
      founderImage,
      heroEyebrow,
      heroTitle,
      heroSubtitle,
      heroImage,
      partnerLogos[] { name, logo }
    }`
  );
  if (!raw) return null;
  return {
    whatsAppNumber: raw.whatsAppNumber ?? "",
    phone: raw.phone ?? "",
    email: raw.email ?? "",
    address: raw.address ?? "",
    founderName: raw.founderName ?? "",
    founderTitle: raw.founderTitle ?? "",
    founderBio: raw.founderBio ?? "",
    founderQuote: raw.founderQuote ?? "",
    founderImageUrl: imageUrl(raw.founderImage),
    heroEyebrow: raw.heroEyebrow ?? "",
    heroTitle: raw.heroTitle ?? "",
    heroSubtitle: raw.heroSubtitle ?? "",
    heroImageUrl: imageUrl(raw.heroImage),
    partnerLogos: (raw.partnerLogos ?? []).map((p: { name: string; logo: unknown }) => ({
      name: p.name,
      logoUrl: imageUrl(p.logo),
    })),
  };
}
