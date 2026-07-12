import type { TeamMember, FAQ, Destination, SiteStat, BlogPost, CaseStudy } from "@/lib/types";

export const TEAM: TeamMember[] = [
  {
    id: "ayan-shah",
    name: "Ayan Shah",
    role: "Founder & Managing Director",
    bio: "With over 15 years of experience in the wedding industry, Ayan founded Ayan Hospitality after noticing that hospitality and logistics were often treated as afterthoughts. They were frequently outsourced last minute, under-staffed, and under-planned. He built the company to solve this exact problem.",
    avatarUrl: "/images/team/ayan-shah.jpg",
    isLeadership: true,
  },
  {
    id: "preethi-nair",
    name: "Preethi Nair",
    role: "Head of Guest Experience",
    bio: "10 years in luxury hotel operations before joining Ayan Hospitality. Preethi leads our help desk and VIP handling teams.",
    avatarUrl: "/images/team/preethi-nair.jpg",
    isLeadership: true,
  },
  {
    id: "kabir-verma",
    name: "Kabir Verma",
    role: "Head of Logistics",
    bio: "Former logistics lead for a national events company. Kabir now runs all transport, luggage, and multi-city operations for Ayan Hospitality.",
    avatarUrl: "/images/team/kabir-verma.jpg",
    isLeadership: true,
  },
  {
    id: "sneha-joshi",
    name: "Sneha Joshi",
    role: "RSVP & Coordination Lead",
    avatarUrl: "/images/team/sneha-joshi.jpg",
  },
  {
    id: "aryan-mehta",
    name: "Aryan Mehta",
    role: "Senior Event Supervisor",
    avatarUrl: "/images/team/aryan-mehta.jpg",
  },
  {
    id: "lakshmi-krishnan",
    name: "Lakshmi Krishnan",
    role: "VIP Relations Manager",
    avatarUrl: "/images/team/lakshmi.jpg",
  },
];

export const FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "Do you handle weddings outside India?",
    answer:
      "Yes. We have managed destination weddings in Dubai, Sri Lanka, and select Southeast Asian destinations. We bring our full on-ground team for international events and coordinate with local logistics partners. Contact us with your destination and we'll confirm availability.",
    category: "general",
  },
  {
    id: "faq-2",
    question: "How far in advance should we book?",
    answer:
      "For large weddings (over 300 guests) or peak season dates between October and February, we recommend booking 4 to 6 months in advance. We can sometimes accommodate shorter timelines, so please contact us to check availability for your dates.",
    category: "general",
  },
  {
    id: "faq-3",
    question: "Can we hire just one or two services, or is everything packaged?",
    answer:
      "We can work either way. Many clients take a bundled hospitality + logistics package; others need just transfer coordination or a guest help desk for a single event. Use our 'Build Your Package' tool to get a sense of scope and pricing, or call us to discuss.",
    category: "general",
  },
  {
    id: "faq-4",
    question: "How does the RSVP management process work?",
    answer:
      "We set up a tracking system (digital RSVP form + a coordination dashboard shared with your family) within 48 hours of briefing. We then manage outreach, follow-ups, and data collection to deliver a clean, accurate guest list with all preferences noted 5 days before the event.",
    category: "hospitality",
  },
  {
    id: "faq-5",
    question: "What is a 'Shadow' and do we need them?",
    answer:
      "Shadows are dedicated staff members assigned one-to-one to specific guests. This service is typically chosen for VIPs, elderly family members, guests with mobility needs, or out-of-town guests who require a consistent point of contact. For weddings with senior family members or special guests, we strongly recommend them.",
    category: "hospitality",
  },
  {
    id: "faq-6",
    question: "How do you handle flight delays for airport transfers?",
    answer:
      "We monitor all incoming flights in real time through the event period. If a flight is delayed, we automatically update the driver assignment and notify the guest via WhatsApp. There is no extra charge for delay management as it is fully included in our transfer service.",
    category: "logistics",
  },
  {
    id: "faq-7",
    question: "Do you work with wedding planners on a sub-contract basis?",
    answer:
      "Yes, and it is a key part of our business. We have a formal 'For Planners & Venues' partnership model with NDAs, white-label terms, and a dedicated capability deck. Visit our Planners & Venues page or contact us directly to discuss.",
    category: "planners",
  },
  {
    id: "faq-8",
    question: "What cities do you cover?",
    answer:
      "We operate across all major metros (Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad) and all major wedding destinations (Udaipur, Jaipur, Jodhpur, Goa, Coorg, Shimla, Mussoorie, Amritsar, Rishikesh, and more). See our Destinations page for the full list.",
    category: "general",
  },
  {
    id: "faq-9",
    question: "How is pricing structured?",
    answer:
      "Pricing is based on guest count, event duration, number of cities, and services selected. We don't publish flat rates because every wedding is unique. Our 'Build Your Package' tool gives you an indicative range; the team follows up with a detailed quote within 24 hours.",
    category: "pricing",
  },
  {
    id: "faq-10",
    question: "Are your staff trained and background-verified?",
    answer:
      "All on-ground staff go through an internal training programme covering hospitality standards, communication protocols, emergency procedures, and cultural sensitivity. For planners and hotel partners, we can share our training documentation and staff vetting process on request.",
    category: "planners",
  },
];

export const DESTINATIONS: Destination[] = [
  // Metros
  { id: "delhi", city: "Delhi NCR", region: "North India", country: "India", isInternational: false, tier: "metro" },
  { id: "mumbai", city: "Mumbai", region: "West India", country: "India", isInternational: false, tier: "metro" },
  { id: "bangalore", city: "Bangalore", region: "South India", country: "India", isInternational: false, tier: "metro" },
  { id: "chennai", city: "Chennai", region: "South India", country: "India", isInternational: false, tier: "metro" },
  { id: "kolkata", city: "Kolkata", region: "East India", country: "India", isInternational: false, tier: "metro" },
  { id: "hyderabad", city: "Hyderabad", region: "South India", country: "India", isInternational: false, tier: "metro" },
  { id: "pune", city: "Pune", region: "West India", country: "India", isInternational: false, tier: "metro" },
  { id: "ahmedabad", city: "Ahmedabad", region: "West India", country: "India", isInternational: false, tier: "metro" },
  // Destination weddings
  { id: "udaipur", city: "Udaipur", region: "Rajasthan", country: "India", isInternational: false, tier: "destination" },
  { id: "jaipur", city: "Jaipur", region: "Rajasthan", country: "India", isInternational: false, tier: "destination" },
  { id: "jodhpur", city: "Jodhpur", region: "Rajasthan", country: "India", isInternational: false, tier: "destination" },
  { id: "goa", city: "Goa", region: "Goa", country: "India", isInternational: false, tier: "destination" },
  { id: "coorg", city: "Coorg", region: "Karnataka", country: "India", isInternational: false, tier: "destination" },
  { id: "shimla", city: "Shimla", region: "Himachal Pradesh", country: "India", isInternational: false, tier: "destination" },
  { id: "mussoorie", city: "Mussoorie", region: "Uttarakhand", country: "India", isInternational: false, tier: "destination" },
  { id: "rishikesh", city: "Rishikesh", region: "Uttarakhand", country: "India", isInternational: false, tier: "destination" },
  { id: "amritsar", city: "Amritsar", region: "Punjab", country: "India", isInternational: false, tier: "destination" },
  { id: "varanasi", city: "Varanasi", region: "Uttar Pradesh", country: "India", isInternational: false, tier: "destination" },
  { id: "mahabalipuram", city: "Mahabalipuram", region: "Tamil Nadu", country: "India", isInternational: false, tier: "destination" },
  { id: "alibaug", city: "Alibaug", region: "Maharashtra", country: "India", isInternational: false, tier: "leisure" },
  { id: "lonavala", city: "Lonavala", region: "Maharashtra", country: "India", isInternational: false, tier: "leisure" },
  // International
  { id: "dubai", city: "Dubai", region: "UAE", country: "UAE", isInternational: true },
  { id: "srilanka", city: "Colombo & Galle", region: "Sri Lanka", country: "Sri Lanka", isInternational: true },
  { id: "bali", city: "Bali", region: "Indonesia", country: "Indonesia", isInternational: true },
  { id: "thailand", city: "Bangkok & Phuket", region: "Thailand", country: "Thailand", isInternational: true },
];

export const SITE_STATS: SiteStat[] = [
  { label: "Weddings Delivered", value: "800", suffix: "+" },
  { label: "Guests Assisted", value: "1,00,000", suffix: "+" },
  { label: "Cities Covered", value: "30", suffix: "+" },
  { label: "Years of Experience", value: "15", suffix: "+" },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "rsvp-management-mistakes",
    title: "The 5 RSVP Mistakes That Derail Indian Weddings (And How to Avoid Them)",
    excerpt:
      "Most families underestimate how complex RSVP management is until they're 2 weeks out and still don't have a final headcount. Here's what we've learned from 800+ weddings.",
    coverImageUrl: "/images/blog/rsvp-mistakes.jpg",
    date: "2025-11-15",
    readTime: 6,
    category: "Planning Tips",
  },
  {
    slug: "destination-wedding-logistics-checklist",
    title: "The Destination Wedding Logistics Checklist Every Family Needs",
    excerpt:
      "Moving 300 guests from Mumbai to Udaipur across 3 days requires a logistics plan most wedding planners don't build. This is the checklist we use internally.",
    coverImageUrl: "/images/blog/destination-logistics.jpg",
    date: "2025-10-20",
    readTime: 8,
    category: "Logistics",
  },
  {
    slug: "vip-guest-management-guide",
    title: "How to Handle VIP Guests at an Indian Wedding Without Making Other Guests Feel Less",
    excerpt:
      "VIP handling is a delicate balance. Too obvious and other guests feel overlooked; too quiet and the VIP doesn't feel valued. Here's how we get it right.",
    coverImageUrl: "/images/blog/vip-guests.jpg",
    date: "2025-09-05",
    readTime: 5,
    category: "Guest Experience",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "udaipur-600-guest-wedding",
    title: "600 Guests, 4 Days, 2 Cities: Zero Complaints",
    location: "Udaipur & Mumbai",
    guestCount: 600,
    serviceTypes: ["hospitality", "logistics"],
    heroImageUrl: "/images/case-studies/udaipur-hero.jpg",
    challenge:
      "The family had guests arriving from the UK, Singapore, and across India over 3 days. 4 separate events across 2 cities, with a charter flight movement between them. Every transfer, meal seating, and ceremony needed to run on time without the host family managing a single detail.",
    whatWeDid:
      "We deployed a 32-person team across both cities. RSVP and guest preference data was collected 6 weeks out. A 48-page logistics plan was shared with the hotel teams. Two senior supervisors led each city. A dedicated help desk handled 400+ guest queries over 4 days. Luggage was tagged, tracked, and delivered to every room.",
    outcome:
      "The family received not a single operational complaint across 4 days. The hotel GM wrote to the family personally to commend the professionalism of the Ayan Hospitality team. Three wedding planners present at the event have since become regular partners.",
    testimonialId: "t1",
    date: "2024-02-14",
  },
  {
    slug: "jaipur-200-guests-destination",
    title: "200 Guests, Palace Wedding, One Seamless Weekend",
    location: "Jaipur",
    guestCount: 200,
    serviceTypes: ["hospitality", "logistics"],
    heroImageUrl: "/images/case-studies/jaipur-hero.jpg",
    challenge:
      "A palace wedding with 200 out-of-town guests, including 30 international guests, all checking into the same property. Luggage management at arrival was a critical concern. Having experienced chaos at a previous sibling's wedding, the family wanted this handled flawlessly.",
    whatWeDid:
      "We built a guest-wise luggage manifest from the RSVP data. Pre-printed tags were ready at the airport. A team of 12 porters managed intake at the hotel. Every bag was in the right room within 90 minutes of the first guest checking in. Our help desk handled all guest queries in English and Hindi throughout the 3-day event.",
    outcome:
      "200 bags, 200 rooms, 90-minute window, zero errors. The client's sister booked us for her wedding in Goa 6 months later.",
    testimonialId: "t2",
    date: "2024-01-20",
  },
];
