'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import type { PageContact } from '@/lib/repository';

export function ContactPageForm({ services, labels }: {
  services: { slug: string; title: string }[];
  labels: PageContact | null;
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleServiceChange = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, service: string) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleServiceChange(service);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  const waMsg = encodeURIComponent(
    `Hi Ayan Hospitality, I submitted an enquiry. Details:\n- Name: ${name}\n- Phone: ${phone}\n- Services: ${selectedServices.join(', ')}`
  );

  if (status === 'success') {
    return (
      <div 
        className="card-warm p-8 lg:p-12 text-center bg-white border border-cream-300 shadow-warm-lg rounded-3xl animate-fade-up border-l-4 border-l-gold-500"
        role="alert"
      >
        <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-gold-500" />
        </div>
        <h2 className="font-display text-3xl text-maroon-700 font-semibold mb-3">{labels?.formSuccessTitle ?? "Enquiry Sent Successfully!"}</h2>
        <p className="text-charcoal-muted mb-6 max-w-lg mx-auto">
          {labels?.formSuccessText
            ? labels.formSuccessText.replace('{name}', name).replace('{phone}', phone)
            : `Thank you, ${name}. We have received your request.`}
        </p>

        {selectedServices.length > 0 && (
          <div className="bg-cream-100/60 rounded-2xl p-5 border border-cream-200 text-left mb-8 max-w-md mx-auto">
            <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-2">{labels?.formServicesSelectedLabel ?? "Services Selected:"}</p>
            <div className="flex flex-wrap gap-1.5">
              {selectedServices.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-full bg-cream-200 text-maroon-700 text-xs font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/918826104232?text=${waMsg}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-whatsapp text-white font-medium hover:brightness-110 active:scale-95 transition-all shadow-sm w-full sm:w-auto"
          >
            {labels?.formChatWhatsAppLabel ?? "Chat on WhatsApp"}
          </a>
          <button
            onClick={() => {
              setStatus('idle');
              setName('');
              setPhone('');
              setSelectedServices([]);
            }}
            className="px-6 py-3 rounded-full border border-maroon-700/20 text-maroon-700 hover:bg-cream-100 font-medium active:scale-95 transition-all w-full sm:w-auto text-sm"
          >
            {labels?.formSendAnotherLabel ?? "Fill another form"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} id="contact-form" className="space-y-5 animate-fade-up">
      <input type="hidden" name="type" value="wedding" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-charcoal mb-2">{labels?.formNameLabel ?? "Your name *"}</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            placeholder={labels?.formNamePlaceholder ?? "Priya Mehta"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === 'loading'}
            className="w-full px-4 py-3.5 rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-maroon-700/30 text-charcoal text-sm disabled:opacity-50 transition-all"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-charcoal mb-2">{labels?.formPhoneLabel ?? "Phone / WhatsApp *"}</label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            required
            placeholder={labels?.formPhonePlaceholder ?? "+91 98765 43210"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={status === 'loading'}
            className="w-full px-4 py-3.5 rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-maroon-700/30 text-charcoal text-sm disabled:opacity-50 transition-all"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-charcoal mb-2">{labels?.formEmailLabel ?? "Email"}</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder={labels?.formEmailPlaceholder ?? "priya@example.com"}
            disabled={status === 'loading'}
            className="w-full px-4 py-3.5 rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-maroon-700/30 text-charcoal text-sm disabled:opacity-50 transition-all"
          />
        </div>
        <div>
          <label htmlFor="contact-date" className="block text-sm font-medium text-charcoal mb-2">{labels?.formDateLabel ?? "Event date"}</label>
          <input
            id="contact-date"
            type="date"
            name="eventDate"
            disabled={status === 'loading'}
            className="w-full px-4 py-3.5 rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-maroon-700/30 text-charcoal text-sm disabled:opacity-50 transition-all"
          />
        </div>
        <div>
          <label htmlFor="contact-city" className="block text-sm font-medium text-charcoal mb-2">{labels?.formCityLabel ?? "City / Venue"}</label>
          <input
            id="contact-city"
            type="text"
            name="city"
            placeholder={labels?.formCityPlaceholder ?? "Udaipur, Jaipur…"}
            disabled={status === 'loading'}
            className="w-full px-4 py-3.5 rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-maroon-700/30 text-charcoal text-sm disabled:opacity-50 transition-all"
          />
        </div>
        <div>
          <label htmlFor="contact-guests" className="block text-sm font-medium text-charcoal mb-2">{labels?.formGuestLabel ?? "Guest count (approx.)"}</label>
          <input
            id="contact-guests"
            type="number"
            name="guestCount"
            placeholder={labels?.formGuestPlaceholder ?? "300"}
            disabled={status === 'loading'}
            className="w-full px-4 py-3.5 rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-maroon-700/30 text-charcoal text-sm disabled:opacity-50 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-3">{labels?.formServicesLabel ?? "Services interested in"}</label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Services selection">
          {services.map((s) => {
            const isChecked = selectedServices.includes(s.slug);
            return (
              <button
                key={s.slug}
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, s.slug)}
                onClick={() => handleServiceChange(s.slug)}
                className={`px-3.5 py-2 rounded-full border text-xs font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:outline-none ${
                  isChecked
                    ? 'bg-maroon-700 text-white border-maroon-700 shadow-sm'
                    : 'border-cream-300 bg-cream-50 text-charcoal-soft hover:border-maroon-700/40'
                }`}
              >
                {/* Hidden input checkbox to ensure form submission works if serialized */}
                <input type="checkbox" name="services" value={s.slug} checked={isChecked} readOnly className="sr-only" />
                {s.title}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-charcoal mb-2">{labels?.formMessageLabel ?? "Anything else you'd like us to know"}</label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          disabled={status === 'loading'}
          placeholder={labels?.formMessagePlaceholder ?? "Tell us about your event, any specific concerns, or how you heard about us…"}
          className="w-full px-4 py-3.5 rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-maroon-700/30 text-charcoal text-sm resize-none disabled:opacity-50 transition-all"
        />
      </div>

      {status === 'error' && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-sm flex items-center gap-2 animate-fade-up">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
          <span>{labels?.formErrorText ?? "Failed to submit enquiry. Please verify your details or reach us via WhatsApp."}</span>
        </div>
      )}

      <button
        type="submit"
        id="contact-form-submit"
        disabled={status === 'loading'}
        className="w-full py-4 rounded-xl bg-maroon-700 text-white font-semibold text-base hover:bg-maroon-800 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>{labels?.formSendingLabel ?? "Sending Enquiry..."}</span>
          </>
        ) : (
          <span>{labels?.formSubmitLabel ?? "Send Enquiry"}</span>
        )}
      </button>
    </form>
  );
}
