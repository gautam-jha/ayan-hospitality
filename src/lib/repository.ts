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
  heroCtaLabel: string;
  heroCtaWhatsApp: string;
  pillarHospitalityTitle: string;
  pillarHospitalityDescription: string;
  pillarHospitalityCta: string;
  pillarLogisticsTitle: string;
  pillarLogisticsDescription: string;
  pillarLogisticsCta: string;
  processCta: string;
  featuredWorkEyebrow: string;
  featuredWorkTitle: string;
  caseStudyTag: string;
  caseStudyChallengeLabel: string;
  caseStudyOutcomeLabel: string;
  caseStudyCta: string;
  caseStudyViewAllCta: string;
  testimonialsEyebrow: string;
  testimonialsTitle: string;
  testimonialsViewAllCta: string;
  plannersEyebrow: string;
  plannersTitleLine1: string;
  plannersTitleLine2: string;
  plannersDescription: string;
  plannersFeature1: string;
  plannersFeature2: string;
  plannersFeature3: string;
  plannersPrimaryCta: string;
  plannersSecondaryCta: string;
  plannersStat1Value: string;
  plannersStat1Label: string;
  plannersStat2Value: string;
  plannersStat2Label: string;
  plannersStat3Value: string;
  plannersStat3Label: string;
  plannersStat4Value: string;
  plannersStat4Label: string;
  founderEyebrow: string;
  founderCta: string;
  blogEyebrow: string;
  blogTitle: string;
  blogReadMoreCta: string;
  blogViewAllCta: string;
  finalCtaEyebrow: string;
  finalCtaTitle: string;
  finalCtaSubtitle: string;
  formNamePlaceholder: string;
  formPhonePlaceholder: string;
  formCityPlaceholder: string;
  formGuestPlaceholder: string;
  formSubmitLabel: string;
  formSuccessText: string;
  formErrorText: string;
  formSendingText: string;
  formSendAnotherLabel: string;
  formOrCallText: string;
}

export async function getPageHome(): Promise<PageHome | null> {
  const raw = await sanityFetch<any | null>(`*[_type == "pageHome"][0]`);
  if (!raw) return null;
  return {
    pillarsEyebrow: raw.pillarsEyebrow ?? "",
    pillarsTitle: raw.pillarsTitle ?? "",
    pillarsSubtitle: raw.pillarsSubtitle ?? "",
    processEyebrow: raw.processEyebrow ?? "",
    processTitle: raw.processTitle ?? "",
    processSubtitle: raw.processSubtitle ?? "",
    heroCtaLabel: raw.heroCtaLabel ?? "",
    heroCtaWhatsApp: raw.heroCtaWhatsApp ?? "",
    pillarHospitalityTitle: raw.pillarHospitalityTitle ?? "",
    pillarHospitalityDescription: raw.pillarHospitalityDescription ?? "",
    pillarHospitalityCta: raw.pillarHospitalityCta ?? "",
    pillarLogisticsTitle: raw.pillarLogisticsTitle ?? "",
    pillarLogisticsDescription: raw.pillarLogisticsDescription ?? "",
    pillarLogisticsCta: raw.pillarLogisticsCta ?? "",
    processCta: raw.processCta ?? "",
    featuredWorkEyebrow: raw.featuredWorkEyebrow ?? "",
    featuredWorkTitle: raw.featuredWorkTitle ?? "",
    caseStudyTag: raw.caseStudyTag ?? "",
    caseStudyChallengeLabel: raw.caseStudyChallengeLabel ?? "",
    caseStudyOutcomeLabel: raw.caseStudyOutcomeLabel ?? "",
    caseStudyCta: raw.caseStudyCta ?? "",
    caseStudyViewAllCta: raw.caseStudyViewAllCta ?? "",
    testimonialsEyebrow: raw.testimonialsEyebrow ?? "",
    testimonialsTitle: raw.testimonialsTitle ?? "",
    testimonialsViewAllCta: raw.testimonialsViewAllCta ?? "",
    plannersEyebrow: raw.plannersEyebrow ?? "",
    plannersTitleLine1: raw.plannersTitleLine1 ?? "",
    plannersTitleLine2: raw.plannersTitleLine2 ?? "",
    plannersDescription: raw.plannersDescription ?? "",
    plannersFeature1: raw.plannersFeature1 ?? "",
    plannersFeature2: raw.plannersFeature2 ?? "",
    plannersFeature3: raw.plannersFeature3 ?? "",
    plannersPrimaryCta: raw.plannersPrimaryCta ?? "",
    plannersSecondaryCta: raw.plannersSecondaryCta ?? "",
    plannersStat1Value: raw.plannersStat1Value ?? "",
    plannersStat1Label: raw.plannersStat1Label ?? "",
    plannersStat2Value: raw.plannersStat2Value ?? "",
    plannersStat2Label: raw.plannersStat2Label ?? "",
    plannersStat3Value: raw.plannersStat3Value ?? "",
    plannersStat3Label: raw.plannersStat3Label ?? "",
    plannersStat4Value: raw.plannersStat4Value ?? "",
    plannersStat4Label: raw.plannersStat4Label ?? "",
    founderEyebrow: raw.founderEyebrow ?? "",
    founderCta: raw.founderCta ?? "",
    blogEyebrow: raw.blogEyebrow ?? "",
    blogTitle: raw.blogTitle ?? "",
    blogReadMoreCta: raw.blogReadMoreCta ?? "",
    blogViewAllCta: raw.blogViewAllCta ?? "",
    finalCtaEyebrow: raw.finalCtaEyebrow ?? "",
    finalCtaTitle: raw.finalCtaTitle ?? "",
    finalCtaSubtitle: raw.finalCtaSubtitle ?? "",
    formNamePlaceholder: raw.formNamePlaceholder ?? "",
    formPhonePlaceholder: raw.formPhonePlaceholder ?? "",
    formCityPlaceholder: raw.formCityPlaceholder ?? "",
    formGuestPlaceholder: raw.formGuestPlaceholder ?? "",
    formSubmitLabel: raw.formSubmitLabel ?? "",
    formSuccessText: raw.formSuccessText ?? "",
    formErrorText: raw.formErrorText ?? "",
    formSendingText: raw.formSendingText ?? "",
    formSendAnotherLabel: raw.formSendAnotherLabel ?? "",
    formOrCallText: raw.formOrCallText ?? "",
  };
}

export interface PageAbout {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  founderStoryEyebrow: string;
  founderStoryTitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  founderStoryText: any;
  leadershipEyebrow: string;
  leadershipTitle: string;
  crewEyebrow: string;
  crewTitle: string;
  crewSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonLabel: string;
}

export async function getPageAbout(): Promise<PageAbout | null> {
  const raw = await sanityFetch<any | null>(`*[_type == "pageAbout"][0]`);
  if (!raw) return null;
  return {
    heroEyebrow: raw.heroEyebrow ?? "",
    heroTitle: raw.heroTitle ?? "",
    heroSubtitle: raw.heroSubtitle ?? "",
    founderStoryEyebrow: raw.founderStoryEyebrow ?? "",
    founderStoryTitle: raw.founderStoryTitle ?? "",
    founderStoryText: raw.founderStoryText ?? null,
    leadershipEyebrow: raw.leadershipEyebrow ?? "",
    leadershipTitle: raw.leadershipTitle ?? "",
    crewEyebrow: raw.crewEyebrow ?? "",
    crewTitle: raw.crewTitle ?? "",
    crewSubtitle: raw.crewSubtitle ?? "",
    ctaTitle: raw.ctaTitle ?? "",
    ctaSubtitle: raw.ctaSubtitle ?? "",
    ctaButtonLabel: raw.ctaButtonLabel ?? "",
  };
}

export interface PageServices {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  pillarHospitalityTitle: string;
  pillarHospitalityDescription: string;
  pillarLogisticsTitle: string;
  pillarLogisticsDescription: string;
  pillarCtaLabel: string;
  serviceCardCta: string;
  getQuoteCta: string;
  buildPackageCta: string;
}

export async function getPageServices(): Promise<PageServices | null> {
  const raw = await sanityFetch<any | null>(`*[_type == "pageServices"][0]`);
  if (!raw) return null;
  return {
    heroEyebrow: raw.heroEyebrow ?? "",
    heroTitle: raw.heroTitle ?? "",
    heroSubtitle: raw.heroSubtitle ?? "",
    ctaTitle: raw.ctaTitle ?? "",
    ctaSubtitle: raw.ctaSubtitle ?? "",
    pillarHospitalityTitle: raw.pillarHospitalityTitle ?? "",
    pillarHospitalityDescription: raw.pillarHospitalityDescription ?? "",
    pillarLogisticsTitle: raw.pillarLogisticsTitle ?? "",
    pillarLogisticsDescription: raw.pillarLogisticsDescription ?? "",
    pillarCtaLabel: raw.pillarCtaLabel ?? "",
    serviceCardCta: raw.serviceCardCta ?? "",
    getQuoteCta: raw.getQuoteCta ?? "",
    buildPackageCta: raw.buildPackageCta ?? "",
  };
}

export interface PageContact {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  reachHeading: string;
  infoBoxHeading: string;
  infoBoxText: string;
  formNameLabel: string;
  formNamePlaceholder: string;
  formPhoneLabel: string;
  formPhonePlaceholder: string;
  formEmailLabel: string;
  formEmailPlaceholder: string;
  formDateLabel: string;
  formCityLabel: string;
  formCityPlaceholder: string;
  formGuestLabel: string;
  formGuestPlaceholder: string;
  formServicesLabel: string;
  formMessageLabel: string;
  formMessagePlaceholder: string;
  formSubmitLabel: string;
  formSendingLabel: string;
  formSuccessTitle: string;
  formSuccessText: string;
  formErrorText: string;
  formSendAnotherLabel: string;
  formChatWhatsAppLabel: string;
  formServicesSelectedLabel: string;
}

export async function getPageContact(): Promise<PageContact | null> {
  const raw = await sanityFetch<any | null>(`*[_type == "pageContact"][0]`);
  if (!raw) return null;
  return {
    heroEyebrow: raw.heroEyebrow ?? "",
    heroTitle: raw.heroTitle ?? "",
    heroSubtitle: raw.heroSubtitle ?? "",
    reachHeading: raw.reachHeading ?? "",
    infoBoxHeading: raw.infoBoxHeading ?? "",
    infoBoxText: raw.infoBoxText ?? "",
    formNameLabel: raw.formNameLabel ?? "",
    formNamePlaceholder: raw.formNamePlaceholder ?? "",
    formPhoneLabel: raw.formPhoneLabel ?? "",
    formPhonePlaceholder: raw.formPhonePlaceholder ?? "",
    formEmailLabel: raw.formEmailLabel ?? "",
    formEmailPlaceholder: raw.formEmailPlaceholder ?? "",
    formDateLabel: raw.formDateLabel ?? "",
    formCityLabel: raw.formCityLabel ?? "",
    formCityPlaceholder: raw.formCityPlaceholder ?? "",
    formGuestLabel: raw.formGuestLabel ?? "",
    formGuestPlaceholder: raw.formGuestPlaceholder ?? "",
    formServicesLabel: raw.formServicesLabel ?? "",
    formMessageLabel: raw.formMessageLabel ?? "",
    formMessagePlaceholder: raw.formMessagePlaceholder ?? "",
    formSubmitLabel: raw.formSubmitLabel ?? "",
    formSendingLabel: raw.formSendingLabel ?? "",
    formSuccessTitle: raw.formSuccessTitle ?? "",
    formSuccessText: raw.formSuccessText ?? "",
    formErrorText: raw.formErrorText ?? "",
    formSendAnotherLabel: raw.formSendAnotherLabel ?? "",
    formChatWhatsAppLabel: raw.formChatWhatsAppLabel ?? "",
    formServicesSelectedLabel: raw.formServicesSelectedLabel ?? "",
  };
}

export interface PageDestinations {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  metrosHeading: string;
  weddingHeading: string;
  leisureHeading: string;
  internationalHeading: string;
  internationalDescription: string;
  ctaHeading: string;
  ctaText: string;
  ctaLinkLabel: string;
}

export async function getPageDestinations(): Promise<PageDestinations | null> {
  const raw = await sanityFetch<any | null>(`*[_type == "pageDestinations"][0]`);
  if (!raw) return null;
  return {
    heroEyebrow: raw.heroEyebrow ?? "",
    heroTitle: raw.heroTitle ?? "",
    heroSubtitle: raw.heroSubtitle ?? "",
    metrosHeading: raw.metrosHeading ?? "",
    weddingHeading: raw.weddingHeading ?? "",
    leisureHeading: raw.leisureHeading ?? "",
    internationalHeading: raw.internationalHeading ?? "",
    internationalDescription: raw.internationalDescription ?? "",
    ctaHeading: raw.ctaHeading ?? "",
    ctaText: raw.ctaText ?? "",
    ctaLinkLabel: raw.ctaLinkLabel ?? "",
  };
}

export interface PageFAQ {
  heroEyebrow: string;
  heroTitle: string;
  ctaHeading: string;
  ctaText: string;
  ctaButtonLabel: string;
  ctaWhatsAppLabel: string;
}

export async function getPageFAQ(): Promise<PageFAQ | null> {
  const raw = await sanityFetch<any | null>(`*[_type == "pageFAQ"][0]`);
  if (!raw) return null;
  return {
    heroEyebrow: raw.heroEyebrow ?? "",
    heroTitle: raw.heroTitle ?? "",
    ctaHeading: raw.ctaHeading ?? "",
    ctaText: raw.ctaText ?? "",
    ctaButtonLabel: raw.ctaButtonLabel ?? "",
    ctaWhatsAppLabel: raw.ctaWhatsAppLabel ?? "",
  };
}

export interface PageBlog {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  cardCta: string;
  sidebarHeading: string;
  sidebarText: string;
  sidebarCta: string;
  backLinkLabel: string;
}

export async function getPageBlog(): Promise<PageBlog | null> {
  const raw = await sanityFetch<any | null>(`*[_type == "pageBlog"][0]`);
  if (!raw) return null;
  return {
    heroEyebrow: raw.heroEyebrow ?? "",
    heroTitle: raw.heroTitle ?? "",
    heroSubtitle: raw.heroSubtitle ?? "",
    cardCta: raw.cardCta ?? "",
    sidebarHeading: raw.sidebarHeading ?? "",
    sidebarText: raw.sidebarText ?? "",
    sidebarCta: raw.sidebarCta ?? "",
    backLinkLabel: raw.backLinkLabel ?? "",
  };
}

export interface PageOurWork {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  cardCta: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
  ctaButtonLabel: string;
  detailChallengeLabel: string;
  detailWhatWeDidLabel: string;
  detailOutcomeLabel: string;
  detailSidebarHeading: string;
  detailSidebarCta: string;
}

export async function getPageOurWork(): Promise<PageOurWork | null> {
  const raw = await sanityFetch<any | null>(`*[_type == "pageOurWork"][0]`);
  if (!raw) return null;
  return {
    heroEyebrow: raw.heroEyebrow ?? "",
    heroTitle: raw.heroTitle ?? "",
    heroSubtitle: raw.heroSubtitle ?? "",
    cardCta: raw.cardCta ?? "",
    ctaEyebrow: raw.ctaEyebrow ?? "",
    ctaTitle: raw.ctaTitle ?? "",
    ctaText: raw.ctaText ?? "",
    ctaButtonLabel: raw.ctaButtonLabel ?? "",
    detailChallengeLabel: raw.detailChallengeLabel ?? "",
    detailWhatWeDidLabel: raw.detailWhatWeDidLabel ?? "",
    detailOutcomeLabel: raw.detailOutcomeLabel ?? "",
    detailSidebarHeading: raw.detailSidebarHeading ?? "",
    detailSidebarCta: raw.detailSidebarCta ?? "",
  };
}

export interface PageCareers {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  listingsEyebrow: string;
  listingsTitle: string;
  applyCta: string;
  noRoleHeading: string;
  noRoleText: string;
  noRoleCta: string;
}

export async function getPageCareers(): Promise<PageCareers | null> {
  const raw = await sanityFetch<any | null>(`*[_type == "pageCareers"][0]`);
  if (!raw) return null;
  return {
    heroEyebrow: raw.heroEyebrow ?? "",
    heroTitle: raw.heroTitle ?? "",
    heroSubtitle: raw.heroSubtitle ?? "",
    listingsEyebrow: raw.listingsEyebrow ?? "",
    listingsTitle: raw.listingsTitle ?? "",
    applyCta: raw.applyCta ?? "",
    noRoleHeading: raw.noRoleHeading ?? "",
    noRoleText: raw.noRoleText ?? "",
    noRoleCta: raw.noRoleCta ?? "",
  };
}

export interface PageForPlanners {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  credibilityEyebrow: string;
  credibilityTitle: string;
  processEyebrow: string;
  processTitle: string;
  deckEyebrow: string;
  deckTitle: string;
  deckDescription: string;
  deckButtonLabel: string;
  contactEyebrow: string;
  contactTitle: string;
  formNamePlaceholder: string;
  formCompanyPlaceholder: string;
  formPhonePlaceholder: string;
  formEmailPlaceholder: string;
  formMessagePlaceholder: string;
  formSubmitLabel: string;
}

export async function getPageForPlanners(): Promise<PageForPlanners | null> {
  const raw = await sanityFetch<any | null>(`*[_type == "pageForPlanners"][0]`);
  if (!raw) return null;
  return {
    heroEyebrow: raw.heroEyebrow ?? "",
    heroTitle: raw.heroTitle ?? "",
    heroSubtitle: raw.heroSubtitle ?? "",
    heroPrimaryCta: raw.heroPrimaryCta ?? "",
    heroSecondaryCta: raw.heroSecondaryCta ?? "",
    credibilityEyebrow: raw.credibilityEyebrow ?? "",
    credibilityTitle: raw.credibilityTitle ?? "",
    processEyebrow: raw.processEyebrow ?? "",
    processTitle: raw.processTitle ?? "",
    deckEyebrow: raw.deckEyebrow ?? "",
    deckTitle: raw.deckTitle ?? "",
    deckDescription: raw.deckDescription ?? "",
    deckButtonLabel: raw.deckButtonLabel ?? "",
    contactEyebrow: raw.contactEyebrow ?? "",
    contactTitle: raw.contactTitle ?? "",
    formNamePlaceholder: raw.formNamePlaceholder ?? "",
    formCompanyPlaceholder: raw.formCompanyPlaceholder ?? "",
    formPhonePlaceholder: raw.formPhonePlaceholder ?? "",
    formEmailPlaceholder: raw.formEmailPlaceholder ?? "",
    formMessagePlaceholder: raw.formMessagePlaceholder ?? "",
    formSubmitLabel: raw.formSubmitLabel ?? "",
  };
}

export interface PageGuestHelpDesk {
  heroEyebrow: string;
  helpDeskHeading: string;
  helpDeskAvailability: string;
  callButtonLabel: string;
  whatsappButtonLabel: string;
  venueHeading: string;
  venueDescription: string;
  venueMapButton: string;
  transferHeading: string;
  transferDescription: string;
  transferButtonLabel: string;
  faqHeading: string;
  footerText: string;
}

export async function getPageGuestHelpDesk(): Promise<PageGuestHelpDesk | null> {
  const raw = await sanityFetch<any | null>(`*[_type == "pageGuestHelpDesk"][0]`);
  if (!raw) return null;
  return {
    heroEyebrow: raw.heroEyebrow ?? "",
    helpDeskHeading: raw.helpDeskHeading ?? "",
    helpDeskAvailability: raw.helpDeskAvailability ?? "",
    callButtonLabel: raw.callButtonLabel ?? "",
    whatsappButtonLabel: raw.whatsappButtonLabel ?? "",
    venueHeading: raw.venueHeading ?? "",
    venueDescription: raw.venueDescription ?? "",
    venueMapButton: raw.venueMapButton ?? "",
    transferHeading: raw.transferHeading ?? "",
    transferDescription: raw.transferDescription ?? "",
    transferButtonLabel: raw.transferButtonLabel ?? "",
    faqHeading: raw.faqHeading ?? "",
    footerText: raw.footerText ?? "",
  };
}

export interface PageBuildYourPackage {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  step1Title: string;
  step1Subtitle: string;
  step2Title: string;
  step2Subtitle: string;
  step3Title: string;
  step3Subtitle: string;
  step4Title: string;
  step4Subtitle: string;
  step5Title: string;
  step5Subtitle: string;
  guestOption1: string;
  guestOption2: string;
  guestOption3: string;
  guestOption4: string;
  cityOption1: string;
  cityOption2: string;
  cityOption3: string;
  durationOption1: string;
  durationOption2: string;
  durationOption3: string;
  durationOption4: string;
  estimateFallback: string;
  estimateFormat: string;
  successTitle: string;
  successText: string;
  estimateLabel: string;
  estimateDisclaimer: string;
  sendWhatsAppLabel: string;
  backLabel: string;
  continueLabel: string;
  submitLabel: string;
  progressLabel: string;
  hospitalitySection: string;
  logisticsSection: string;
  estimateRangeLabel: string;
  estimateBasedOn: string;
  formNameLabel: string;
  formNamePlaceholder: string;
  formPhoneLabel: string;
  formPhonePlaceholder: string;
}

export async function getPageBuildYourPackage(): Promise<PageBuildYourPackage | null> {
  const raw = await sanityFetch<any | null>(`*[_type == "pageBuildYourPackage"][0]`);
  if (!raw) return null;
  return {
    heroEyebrow: raw.heroEyebrow ?? "",
    heroTitle: raw.heroTitle ?? "",
    heroSubtitle: raw.heroSubtitle ?? "",
    step1Title: raw.step1Title ?? "",
    step1Subtitle: raw.step1Subtitle ?? "",
    step2Title: raw.step2Title ?? "",
    step2Subtitle: raw.step2Subtitle ?? "",
    step3Title: raw.step3Title ?? "",
    step3Subtitle: raw.step3Subtitle ?? "",
    step4Title: raw.step4Title ?? "",
    step4Subtitle: raw.step4Subtitle ?? "",
    step5Title: raw.step5Title ?? "",
    step5Subtitle: raw.step5Subtitle ?? "",
    guestOption1: raw.guestOption1 ?? "",
    guestOption2: raw.guestOption2 ?? "",
    guestOption3: raw.guestOption3 ?? "",
    guestOption4: raw.guestOption4 ?? "",
    cityOption1: raw.cityOption1 ?? "",
    cityOption2: raw.cityOption2 ?? "",
    cityOption3: raw.cityOption3 ?? "",
    durationOption1: raw.durationOption1 ?? "",
    durationOption2: raw.durationOption2 ?? "",
    durationOption3: raw.durationOption3 ?? "",
    durationOption4: raw.durationOption4 ?? "",
    estimateFallback: raw.estimateFallback ?? "",
    estimateFormat: raw.estimateFormat ?? "",
    successTitle: raw.successTitle ?? "",
    successText: raw.successText ?? "",
    estimateLabel: raw.estimateLabel ?? "",
    estimateDisclaimer: raw.estimateDisclaimer ?? "",
    sendWhatsAppLabel: raw.sendWhatsAppLabel ?? "",
    backLabel: raw.backLabel ?? "",
    continueLabel: raw.continueLabel ?? "",
    submitLabel: raw.submitLabel ?? "",
    progressLabel: raw.progressLabel ?? "",
    hospitalitySection: raw.hospitalitySection ?? "",
    logisticsSection: raw.logisticsSection ?? "",
    estimateRangeLabel: raw.estimateRangeLabel ?? "",
    estimateBasedOn: raw.estimateBasedOn ?? "",
    formNameLabel: raw.formNameLabel ?? "",
    formNamePlaceholder: raw.formNamePlaceholder ?? "",
    formPhoneLabel: raw.formPhoneLabel ?? "",
    formPhonePlaceholder: raw.formPhonePlaceholder ?? "",
  };
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
  schemaName: string;
  schemaDescription: string;
  schemaPriceRange: string;
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
      partnerLogos[] { name, logo },
      schemaName,
      schemaDescription,
      schemaPriceRange
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
    schemaName: raw.schemaName ?? "",
    schemaDescription: raw.schemaDescription ?? "",
    schemaPriceRange: raw.schemaPriceRange ?? "",
  };
}
