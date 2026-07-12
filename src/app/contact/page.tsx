import type { Metadata } from 'next';
import { Phone, Mail, MapPin } from 'lucide-react';
import { ContactPageForm } from '@/components/ContactPageForm';

export const metadata: Metadata = {
  title: 'Contact Us — Get a Free Consultation',
  description: 'Get in touch with Ayan Hospitality for a free wedding consultation. Call, WhatsApp, or fill the form — we respond within 24 hours.',
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-b from-cream-200 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-gold-500 text-xs font-semibold tracking-widest uppercase mb-4">Get in Touch</p>
            <h1 className="font-display text-5xl text-maroon-700 font-semibold mb-4">Let's plan your wedding together</h1>
            <p className="text-charcoal-muted text-lg leading-relaxed">Fill the form or reach us directly — we respond to every enquiry within 24 hours.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl text-maroon-700 font-semibold mb-6">Reach us directly</h2>
              <div className="space-y-4">
                <a href="tel:+918826104232" id="contact-phone" className="flex items-center gap-4 p-4 rounded-2xl bg-cream-100 border border-cream-300 hover:border-maroon-700/30 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-maroon-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-charcoal-muted uppercase tracking-wide">Phone</p>
                    <p className="font-semibold text-charcoal group-hover:text-maroon-700 transition-colors">+91 88261 04232</p>
                  </div>
                </a>
                <a
                  href="https://wa.me/918826104232?text=Hi%20Ayan%20Hospitality%2C%20I%27d%20like%20to%20discuss%20my%20wedding."
                  target="_blank" rel="noopener noreferrer" id="contact-whatsapp"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-whatsapp flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <p className="text-xs text-charcoal-muted uppercase tracking-wide">WhatsApp</p>
                    <p className="font-semibold text-charcoal group-hover:text-whatsapp transition-colors">+91 88261 04232</p>
                  </div>
                </a>
                <a href="mailto:hello@ayanhospitality.com" id="contact-email" className="flex items-center gap-4 p-4 rounded-2xl bg-cream-100 border border-cream-300 hover:border-maroon-700/30 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-maroon-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-charcoal-muted uppercase tracking-wide">Email</p>
                    <p className="font-semibold text-charcoal group-hover:text-maroon-700 transition-colors">hello@ayanhospitality.com</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="bg-cream-100 rounded-2xl p-6 border border-cream-300">
              <p className="font-semibold text-charcoal mb-2">We respond within 24 hours</p>
              <p className="text-charcoal-muted text-sm leading-relaxed">For urgent queries, WhatsApp is the fastest way to reach us. For detailed event briefs, the form works well.</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <ContactPageForm />
          </div>
        </div>
      </section>
    </div>
  );
}
