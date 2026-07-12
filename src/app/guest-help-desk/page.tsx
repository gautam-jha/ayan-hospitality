import type { Metadata } from 'next';
import { Phone, MapPin, Truck, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guest Help Desk | Ayan Hospitality',
  description: 'Wedding guest information page: emergency contact, transfer details, venue address, and FAQ.',
  robots: { index: false },
};

const GUEST_FAQS = [
  { q: 'Where do I collect my luggage?', a: 'Your luggage will be collected and tagged at the airport/station by our team in Ayan Hospitality uniforms. It will be delivered to your room. If you don\'t see it within 30 minutes of check-in, call the number above.' },
  { q: 'Who do I call for room issues?', a: 'For anything urgent, call our Help Desk above. We coordinate with the hotel directly. For non-urgent matters, the hotel front desk can assist.' },
  { q: 'How do I find out about event timings?', a: 'Your wedding welcome folder in the room has the full event schedule. You can also WhatsApp or call our Help Desk for real-time updates.' },
  { q: 'What if my driver doesn\'t arrive?', a: 'Call our Help Desk immediately. We track all vehicles in real time and will send an alternate if needed: no guest should ever be left waiting.' },
  { q: 'Is there a dress code?', a: 'The wedding family will have shared dress code details in your invitation. If you\'re unsure, WhatsApp us and we\'ll find out for you.' },
  { q: 'I need medical assistance', a: 'Call the Help Desk immediately. We have a first-aid team on site and emergency medical contacts for all venues.' },
];

export default function GuestHelpDeskPage() {
  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header - no nav, focused micro-page */}
      <div className="bg-maroon-700 px-4 py-5">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <p className="font-display text-xl text-white font-semibold">Ayan Hospitality</p>
            <p className="text-gold-400 text-xs">Guest Help Desk</p>
          </div>
          <a href="tel:+918826104232" className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-white text-sm font-medium">
            <Phone className="w-4 h-4" /> Call Us
          </a>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        {/* Emergency contact - large tap target */}
        <div className="bg-maroon-700 rounded-3xl p-8 text-center">
          <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">Help Desk Hotline</p>
          <a href="tel:+918826104232" id="guest-helpdesk-call" className="font-display text-4xl text-white font-bold block mb-2 hover:text-gold-400 transition-colors">
            +91 88261 04232
          </a>
          <p className="text-cream-200/70 text-sm">Available 24/7 during the wedding events</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <a href="tel:+918826104232" className="flex items-center justify-center gap-2 bg-white text-maroon-700 rounded-2xl py-3.5 font-semibold text-sm active:scale-95 transition-transform">
              <Phone className="w-4 h-4" /> Call
            </a>
            <a href="https://wa.me/918826104232?text=Hi%2C%20I%27m%20a%20wedding%20guest%20and%20need%20help." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-whatsapp text-white rounded-2xl py-3.5 font-semibold text-sm active:scale-95 transition-transform">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Venue info */}
        <div className="bg-white rounded-3xl p-6 border border-cream-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-maroon-700/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-maroon-700" />
            </div>
            <h2 className="font-display text-xl text-maroon-700 font-semibold">Venue</h2>
          </div>
          <p className="text-charcoal-soft font-medium">Please check your welcome folder for venue details, or contact the Help Desk for directions.</p>
          <a
            href="https://maps.google.com"
            target="_blank" rel="noopener noreferrer"
            className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-cream-100 text-maroon-700 font-medium text-sm w-fit hover:bg-cream-200 transition-colors"
          >
            <MapPin className="w-4 h-4" /> Open in Maps
          </a>
        </div>

        {/* Transfer info */}
        <div className="bg-white rounded-3xl p-6 border border-cream-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-gold-600" />
            </div>
            <h2 className="font-display text-xl text-maroon-700 font-semibold">Your Transfer</h2>
          </div>
          <p className="text-charcoal-soft">Your driver details will be shared via WhatsApp before your arrival. If you haven&apos;t received them, call our Help Desk.</p>
          <a href="https://wa.me/918826104232?text=Hi%2C%20I%20need%20my%20driver%20details%20for%20the%20wedding%20transfer." target="_blank" rel="noopener noreferrer"
            className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-whatsapp/10 text-whatsapp font-medium text-sm w-fit hover:bg-whatsapp/20 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Get Driver Details
          </a>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-3xl p-6 border border-cream-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-charcoal-muted" />
            </div>
            <h2 className="font-display text-xl text-maroon-700 font-semibold">Common Questions</h2>
          </div>
          <div className="space-y-5">
            {GUEST_FAQS.map((faq, i) => (
              <details key={i} className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-medium text-charcoal text-sm">{faq.q}</span>
                  <span className="text-charcoal-muted group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="mt-3 text-charcoal-muted text-sm leading-relaxed pl-0 border-t border-cream-200 pt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        <p className="text-center text-charcoal-subtle text-xs pb-4">
          Powered by Ayan Hospitality · +91 88261 04232
        </p>
      </div>
    </div>
  );
}
