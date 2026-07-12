/**
 * Repository layer — CMS-ready abstraction.
 *
 * All data access goes through these functions. To migrate to Sanity or
 * Contentful, replace the implementations here with CMS client calls —
 * no component or page code changes needed.
 */

import { HOSPITALITY_SERVICES, LOGISTICS_SERVICES, ALL_SERVICES } from "@/data/services";
import { TESTIMONIALS } from "@/data/testimonials";
import { TEAM, FAQS, DESTINATIONS, SITE_STATS, BLOG_POSTS, CASE_STUDIES } from "@/data/content";
import type { Service, Testimonial, TeamMember, FAQ, Destination, SiteStat, BlogPost, CaseStudy } from "@/lib/types";

// ─── Services ─────────────────────────────────────────────────────────────────

export async function getAllServices(): Promise<Service[]> {
  return ALL_SERVICES;
}

export async function getHospitalityServices(): Promise<Service[]> {
  return HOSPITALITY_SERVICES;
}

export async function getLogisticsServices(): Promise<Service[]> {
  return LOGISTICS_SERVICES;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return ALL_SERVICES.find((s) => s.slug === slug) ?? null;
}

export async function getServicesByPillar(pillar: "hospitality" | "logistics"): Promise<Service[]> {
  return ALL_SERVICES.filter((s) => s.pillar === pillar);
}

// ─── Testimonials ──────────────────────────────────────────────────────────────

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return TESTIMONIALS;
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  return TESTIMONIALS.find((t) => t.id === id) ?? null;
}

export async function getFeaturedTestimonials(count = 6): Promise<Testimonial[]> {
  return TESTIMONIALS.slice(0, count);
}

// ─── Team ──────────────────────────────────────────────────────────────────────

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  return TEAM;
}

export async function getLeadership(): Promise<TeamMember[]> {
  return TEAM.filter((m) => m.isLeadership);
}

// ─── FAQs ──────────────────────────────────────────────────────────────────────

export async function getAllFAQs(): Promise<FAQ[]> {
  return FAQS;
}

export async function getFAQsByCategory(
  category: FAQ["category"]
): Promise<FAQ[]> {
  return FAQS.filter((f) => f.category === category);
}

// ─── Destinations ──────────────────────────────────────────────────────────────

export async function getAllDestinations(): Promise<Destination[]> {
  return DESTINATIONS;
}

export async function getIndianDestinations(): Promise<Destination[]> {
  return DESTINATIONS.filter((d) => !d.isInternational);
}

export async function getInternationalDestinations(): Promise<Destination[]> {
  return DESTINATIONS.filter((d) => d.isInternational);
}

// ─── Stats ─────────────────────────────────────────────────────────────────────

export async function getSiteStats(): Promise<SiteStat[]> {
  return SITE_STATS;
}

// ─── Blog ──────────────────────────────────────────────────────────────────────

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return BLOG_POSTS.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

export async function getRecentBlogPosts(count = 3): Promise<BlogPost[]> {
  const sorted = await getAllBlogPosts();
  return sorted.slice(0, count);
}

// ─── Case Studies ──────────────────────────────────────────────────────────────

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  return CASE_STUDIES;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  return CASE_STUDIES.find((c) => c.slug === slug) ?? null;
}

export async function getFeaturedCaseStudy(): Promise<CaseStudy | null> {
  return CASE_STUDIES[0] ?? null;
}
