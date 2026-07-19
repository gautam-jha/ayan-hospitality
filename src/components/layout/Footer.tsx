import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import type { SiteSettings } from '@/lib/repository';

const HOSPITALITY_LINKS = [
  { href: '/services/hospitality/rsvp-invitation-management', label: 'RSVP Management' },
  { href: '/services/hospitality/guest-help-desk', label: 'Guest Help Desk' },
  { href: '/services/hospitality/vip-guest-handling', label: 'VIP Guest Handling' },
  { href: '/services/hospitality/ritual-coordination', label: 'Ritual Coordination' },
  { href: '/services/hospitality/fb-bar-management', label: 'F&B Management' },
];

const LOGISTICS_LINKS = [
  { href: '/services/logistics/airport-railway-transfers', label: 'Airport Transfers' },
  { href: '/services/logistics/luxury-vehicle-coordination', label: 'Luxury Vehicles' },
  { href: '/services/logistics/luggage-tagging-handling', label: 'Luggage Handling' },
  { href: '/services/logistics/multicity-multimodal-logistics', label: 'Multi-city Logistics' },
  { href: '/services/logistics/event-supervisors', label: 'Event Supervisors' },
];

const COMPANY_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/our-work', label: 'Our Work' },
  { href: '/for-planners', label: 'For Planners & Venues' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/careers', label: 'Careers' },
];

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  const displayPhone = settings?.phone ?? '+91 88261 04232';
  const telLink = settings?.phone ? `tel:${settings.phone.replace(/[^+\d]/g, '')}` : 'tel:+918826104232';
  const displayEmail = settings?.email ?? 'hello@ayanhospitality.com';
  const displayAddress = settings?.address ?? 'Delhi NCR · Mumbai · Bangalore\nand 30+ cities across India';
  const displayWhatsApp = settings?.whatsAppNumber ?? '918826104232';

  return (
    <footer className="bg-maroon-900 text-cream-200">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-400 flex items-center justify-center">
                <span className="text-maroon-900 font-display font-bold text-lg">A</span>
              </div>
              <div>
                <span className="font-display font-semibold text-xl text-cream-100 block">Ayan Hospitality</span>
                <span className="text-gold-400 text-xs tracking-widest uppercase">Be Our Guest</span>
              </div>
            </Link>
            <p className="text-cream-300/70 text-sm leading-relaxed mb-6 max-w-xs">
              India&apos;s trusted wedding hospitality & logistics partner. 15+ years, 800+ weddings, 1,00,000+ guests welcomed across 30+ cities.
            </p>
            <div className="space-y-3">
              <a href={telLink} className="flex items-center gap-3 text-cream-300/80 hover:text-gold-400 transition-colors text-sm">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                {displayPhone}
              </a>
              <a href={`mailto:${displayEmail}`} className="flex items-center gap-3 text-cream-300/80 hover:text-gold-400 transition-colors text-sm">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                {displayEmail}
              </a>
              <div className="flex items-start gap-3 text-cream-300/80 text-sm">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span className="whitespace-pre-line">{displayAddress}</span>
              </div>
            </div>
          </div>

          {/* Hospitality services */}
          <div>
            <h3 className="text-gold-400 font-display font-semibold text-base mb-4">Hospitality</h3>
            <ul className="space-y-2">
              {HOSPITALITY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream-300/70 hover:text-cream-100 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logistics services */}
          <div>
            <h3 className="text-gold-400 font-display font-semibold text-base mb-4">Logistics</h3>
            <ul className="space-y-2">
              {LOGISTICS_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream-300/70 hover:text-cream-100 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-gold-400 font-display font-semibold text-base mb-4">Company</h3>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream-300/70 hover:text-cream-100 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream-200/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream-300/50 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Ayan Hospitality. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/ayanhospitality" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-cream-300/50 hover:text-gold-400 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://facebook.com/ayanhospitality" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-cream-300/50 hover:text-gold-400 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://linkedin.com/company/ayanhospitality" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-cream-300/50 hover:text-gold-400 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a
              href={`https://wa.me/${displayWhatsApp}?text=Hi%20Ayan%20Hospitality%2C%20I%27d%20like%20to%20discuss%20my%20wedding.`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-cream-300/50 hover:text-whatsapp transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-cream-300/50 hover:text-cream-200 text-xs transition-colors">Privacy</Link>
            <Link href="/terms" className="text-cream-300/50 hover:text-cream-200 text-xs transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
