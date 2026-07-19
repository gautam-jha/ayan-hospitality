'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function HomepageContactForm({ labels, phone }: {
  labels: {
    formNamePlaceholder: string; formPhonePlaceholder: string; formCityPlaceholder: string; formGuestPlaceholder: string;
    formSubmitLabel: string; formSuccessText: string; formErrorText: string;
    formSendingText: string; formSendAnotherLabel: string; formOrCallText: string;
  } | null;
  phone: string;
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');

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

  if (status === 'success') {
    return (
      <div 
        className="bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl p-8 lg:p-12 text-center text-white animate-fade-up shadow-warm-lg"
        role="alert"
      >
        <div className="w-16 h-16 rounded-full bg-gold-400/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-gold-400" />
        </div>
        <h3 className="font-display text-3xl font-semibold text-white mb-3">
          Thank you, {name || 'there'}!
        </h3>
        <p className="text-cream-200/90 text-base max-w-md mx-auto leading-relaxed">
          {labels?.formSuccessText
            ? labels.formSuccessText.replace('{city}', city)
            : `We have received your enquiry${city ? ` for ${city}` : ''}.`}
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setName('');
            setCity('');
          }}
          className="mt-8 px-6 py-2.5 rounded-full border border-white/40 text-sm font-medium hover:bg-white/10 active:scale-95 transition-all"
        >
          {labels?.formSendAnotherLabel ?? "Send another message"}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 lg:p-10 text-left relative"
      id="homepage-contact-form"
    >
      <input type="hidden" name="type" value="wedding" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="hp-name" className="sr-only">{labels?.formNamePlaceholder ?? "Your name *"}</label>
          <input
            id="hp-name"
            type="text"
            name="name"
            placeholder={labels?.formNamePlaceholder ?? "Your name *"}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === 'loading'}
            aria-required="true"
            className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm disabled:opacity-50"
          />
        </div>
        <div>
          <label htmlFor="hp-phone" className="sr-only">{labels?.formPhonePlaceholder ?? "Phone / WhatsApp number *"}</label>
          <input
            id="hp-phone"
            type="tel"
            name="phone"
            placeholder={labels?.formPhonePlaceholder ?? "Phone / WhatsApp number *"}
            required
            disabled={status === 'loading'}
            aria-required="true"
            className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm disabled:opacity-50"
          />
        </div>
        <div>
          <label htmlFor="hp-city" className="sr-only">{labels?.formCityPlaceholder ?? "Wedding city / venue"}</label>
          <input
            id="hp-city"
            type="text"
            name="city"
            placeholder={labels?.formCityPlaceholder ?? "Wedding city / venue"}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={status === 'loading'}
            className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm disabled:opacity-50"
          />
        </div>
        <div>
          <label htmlFor="hp-guests" className="sr-only">{labels?.formGuestPlaceholder ?? "Approx. guest count"}</label>
          <input
            id="hp-guests"
            type="text"
            name="guestCount"
            placeholder={labels?.formGuestPlaceholder ?? "Approx. guest count"}
            disabled={status === 'loading'}
            className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm disabled:opacity-50"
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="hp-date" className="sr-only">Event date</label>
        <input
          id="hp-date"
          type="date"
          name="eventDate"
          disabled={status === 'loading'}
          className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm mb-0 disabled:opacity-50"
        />
      </div>
      
      {status === 'error' && (
        <div className="mb-4 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-xs flex items-center gap-2 animate-fade-up">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{labels?.formErrorText ?? "Something went wrong. Please check your connection and try again."}</span>
        </div>
      )}

      <button
        type="submit"
        id="homepage-form-submit"
        disabled={status === 'loading'}
        className="w-full py-4 rounded-xl bg-gold-500 text-white font-semibold text-base hover:bg-gold-400 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>{labels?.formSendingText ?? "Sending..."}</span>
          </>
        ) : (
          <span>{labels?.formSubmitLabel ?? "Request a Free Consultation"}</span>
        )}
      </button>
      <p className="text-cream-200/50 text-xs mt-4 text-center">
        {labels?.formOrCallText ?? "Or call us directly:"}{' '}
        <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="text-gold-400 hover:underline">
          {phone}
        </a>{' '}
        · We respond within 24 hours.
      </p>
    </form>
  );
}
