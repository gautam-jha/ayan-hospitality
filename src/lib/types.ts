// ─── CMS-ready TypeScript interfaces ─────────────────────────────────────────
// These interfaces define the data model for all content types.
// Swap the repository implementations (src/lib/repository.ts) for Sanity/
// Contentful clients without changing anything in the components or pages.

export interface Service {
  slug: string;
  pillar: "hospitality" | "logistics";
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string; // lucide icon name
  included: string[];
  timelineNote: string; // "How it fits your event timeline"
  whatsappMessage: string; // Pre-filled WhatsApp message
  testimonialId?: string; // ID of a related testimonial
  metaTitle: string;
  metaDescription: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  eventDescription: string; // e.g. "Wedding, Udaipur, 2024"
  venue?: string;
  serviceIds?: string[];
  avatarUrl?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  location: string;
  guestCount: number;
  serviceTypes: string[];
  heroImageUrl: string;
  galleryImageUrls?: string[];
  challenge: string;
  whatWeDid: string;
  outcome: string;
  testimonialId?: string;
  date: string; // ISO date
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  avatarUrl: string;
  isLeadership?: boolean;
}

export interface Destination {
  id: string;
  city: string;
  region: string;
  country: string;
  isInternational: boolean;
  tier?: "metro" | "leisure" | "destination";
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "general" | "hospitality" | "logistics" | "planners" | "pricing";
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  date: string;
  readTime: number; // minutes
  category: string;
}

export interface SiteStat {
  label: string;
  value: string;
  suffix?: string;
}
