'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

const SERVICES_LIST = [
  { id: 'rsvp', label: 'RSVP & Invitation Management', pillar: 'Hospitality' },
  { id: 'help-desk', label: 'Guest Help Desk', pillar: 'Hospitality' },
  { id: 'vip', label: 'VIP Guest Handling', pillar: 'Hospitality' },
  { id: 'ritual', label: 'Ritual Coordination', pillar: 'Hospitality' },
  { id: 'artist', label: 'Artist Coordination', pillar: 'Hospitality' },
  { id: 'production', label: 'Production Management', pillar: 'Hospitality' },
  { id: 'fb', label: 'F&B / Bar Management', pillar: 'Hospitality' },
  { id: 'hampers', label: 'Guest Giveaways & Hampers', pillar: 'Hospitality' },
  { id: 'stationery', label: 'Stationery & Collaterals', pillar: 'Hospitality' },
  { id: 'first-aid', label: 'First Aid & Essentials Kit', pillar: 'Hospitality' },
  { id: 'airport', label: 'Airport / Railway Transfers', pillar: 'Logistics' },
  { id: 'vehicles', label: 'Luxury Vehicle Coordination', pillar: 'Logistics' },
  { id: 'luggage', label: 'Luggage Tagging & Handling', pillar: 'Logistics' },
  { id: 'multicity', label: 'Multi-city Logistics', pillar: 'Logistics' },
  { id: 'supervisors', label: 'Event Supervisors', pillar: 'Logistics' },
  { id: 'shadows', label: 'Shadows (Guest Support)', pillar: 'Logistics' },
  { id: 'runners', label: 'Runners', pillar: 'Logistics' },
  { id: 'porters', label: 'Porter Services', pillar: 'Logistics' },
  { id: 'inventory', label: 'Inventory Management', pillar: 'Logistics' },
];

type GuestBand = 'under-100' | '100-300' | '300-600' | '600+';
type CityCount = '1' | '2' | '3+';
type Duration = '1-day' | '2-3-days' | '4-5-days' | '6+';

const GUEST_OPTIONS: { value: GuestBand; label: string }[] = [
  { value: 'under-100', label: 'Under 100 guests' },
  { value: '100-300', label: '100 – 300 guests' },
  { value: '300-600', label: '300 – 600 guests' },
  { value: '600+', label: '600+ guests' },
];

const CITY_OPTIONS: { value: CityCount; label: string }[] = [
  { value: '1', label: 'Single city' },
  { value: '2', label: '2 cities' },
  { value: '3+', label: '3 or more cities' },
];

const DURATION_OPTIONS: { value: Duration; label: string }[] = [
  { value: '1-day', label: '1 day' },
  { value: '2-3-days', label: '2 – 3 days' },
  { value: '4-5-days', label: '4 – 5 days' },
  { value: '6+', label: '6+ days' },
];

function getEstimate(guests: GuestBand, cities: CityCount, services: string[]): string {
  const svcCount = services.length;
  if (svcCount === 0) return 'Select at least one service';
  const baseMap: Record<GuestBand, number> = { 'under-100': 1.5, '100-300': 3, '300-600': 6, '600+': 10 };
  const cityMult: Record<CityCount, number> = { '1': 1, '2': 1.5, '3+': 2 };
  const base = baseMap[guests] * cityMult[cities] * (0.5 + svcCount * 0.25);
  const low = Math.round(base * 0.9);
  const high = Math.round(base * 1.3);
  return `₹${low}–${high} lakh (indicative)`;
}

export function BuildPackageWizard() {
  const [step, setStep] = useState(0);
  const [guests, setGuests] = useState<GuestBand | null>(null);
  const [cities, setCities] = useState<CityCount | null>(null);
  const [duration, setDuration] = useState<Duration | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const steps = [
    { title: 'Guest count', subtitle: 'Approximately how many guests are you expecting?' },
    { title: 'Number of cities', subtitle: 'How many cities will the wedding span?' },
    { title: 'Event duration', subtitle: 'How many days will the wedding events run?' },
    { title: 'Services needed', subtitle: 'Which services are you interested in? (Select all that apply)' },
    { title: 'Get your estimate', subtitle: 'Tell us who to send the custom quote to.' },
  ];

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const canProceed = () => {
    if (step === 0) return guests !== null;
    if (step === 1) return cities !== null;
    if (step === 2) return duration !== null;
    if (step === 3) return selectedServices.length > 0;
    return name.trim() !== '' && phone.trim() !== '';
  };

  const handleRadioKeyDown = <T extends string>(
    e: React.KeyboardEvent,
    currentValue: T | null,
    options: { value: T; label: string }[],
    setValue: (val: T) => void
  ) => {
    const currentIndex = options.findIndex((opt) => opt.value === currentValue);
    let nextIndex = currentIndex;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = currentIndex === options.length - 1 ? 0 : currentIndex + 1;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (currentIndex === -1) nextIndex = 0;
    } else {
      return;
    }

    if (nextIndex !== currentIndex && nextIndex >= 0 && nextIndex < options.length) {
      setValue(options[nextIndex].value);
      setTimeout(() => {
        const el = document.getElementById(`radio-${options[nextIndex].value}`);
        el?.focus();
      }, 0);
    }
  };

  const handleCheckboxKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleService(id);
    }
  };

  const waMsg = encodeURIComponent(
    `Hi Ayan Hospitality, I used the package builder. Details:\n- Guests: ${guests}\n- Cities: ${cities}\n- Duration: ${duration}\n- Services: ${selectedServices.map(id => SERVICES_LIST.find(s => s.id === id)?.label || id).join(', ')}\n\nMy name is ${name}, please get back to me.`
  );

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl border border-cream-300 shadow-warm-lg p-8 lg:p-12 text-center transition-all duration-500 animate-fade-up">
        <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-gold-500" />
        </div>
        <h2 className="font-display text-3xl text-maroon-700 font-semibold mb-3">Package request sent!</h2>
        <p className="text-charcoal-muted mb-6">We&apos;ll reach out to <strong>{name}</strong> within 24 hours with a detailed quote.</p>
        <div className="bg-cream-100 rounded-2xl p-6 border border-cream-300 text-left mb-8 shadow-inner border-l-4 border-l-gold-500">
          <p className="text-sm font-semibold text-charcoal mb-2">Your indicative estimate</p>
          <p className="font-display text-3xl text-maroon-700 font-semibold">
            {guests && cities ? getEstimate(guests, cities, selectedServices) : ''}
          </p>
          <p className="text-charcoal-muted text-xs mt-2 border-t border-cream-300/60 pt-2">
            Based on your selections: {selectedServices.length} services chosen. Final quote may vary depending on specifications.
          </p>
        </div>
        <a
          href={`https://wa.me/918826104232?text=${waMsg}`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-whatsapp text-white font-medium hover:brightness-110 active:scale-95 transition-all shadow-md hover:shadow-lg"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Also send via WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-cream-300 shadow-warm-lg overflow-hidden animate-fade-up">
      {/* Progress bar */}
      <div className="h-1.5 bg-cream-200">
        <div
          className="h-full bg-gradient-to-r from-maroon-700 to-gold-500 transition-all duration-500"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>

      <div className="p-8 lg:p-10">
        {/* Step header */}
        <div className="mb-8">
          <p className="text-gold-500 text-xs font-semibold tracking-widest uppercase mb-2">Step {step + 1} of {steps.length}</p>
          <h2 className="font-display text-3xl text-maroon-700 font-semibold">{steps[step].title}</h2>
          <p className="text-charcoal-muted mt-2">{steps[step].subtitle}</p>
        </div>

        {/* Step content */}
        {step === 0 && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            role="radiogroup"
            aria-label="Guest count"
          >
            {GUEST_OPTIONS.map((opt, index) => {
              const isSelected = guests === opt.value;
              const isFocusable = isSelected || (guests === null && index === 0);
              return (
                <button
                  key={opt.value}
                  id={`radio-${opt.value}`}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={isFocusable ? 0 : -1}
                  onKeyDown={(e) => handleRadioKeyDown(e, guests, GUEST_OPTIONS, setGuests)}
                  onClick={() => setGuests(opt.value)}
                  className={`p-5 rounded-2xl border-2 text-left transition-all hover:scale-[1.01] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:outline-none ${
                    isSelected
                      ? 'border-maroon-700 bg-maroon-700/5 text-maroon-700 shadow-sm'
                      : 'border-cream-300 hover:border-maroon-700/40 text-charcoal-soft'
                  }`}
                >
                  <span className="font-medium">{opt.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {step === 1 && (
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            role="radiogroup"
            aria-label="Number of cities"
          >
            {CITY_OPTIONS.map((opt, index) => {
              const isSelected = cities === opt.value;
              const isFocusable = isSelected || (cities === null && index === 0);
              return (
                <button
                  key={opt.value}
                  id={`radio-${opt.value}`}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={isFocusable ? 0 : -1}
                  onKeyDown={(e) => handleRadioKeyDown(e, cities, CITY_OPTIONS, setCities)}
                  onClick={() => setCities(opt.value)}
                  className={`p-5 rounded-2xl border-2 text-left transition-all hover:scale-[1.01] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:outline-none ${
                    isSelected
                      ? 'border-maroon-700 bg-maroon-700/5 text-maroon-700 shadow-sm'
                      : 'border-cream-300 hover:border-maroon-700/40 text-charcoal-soft'
                  }`}
                >
                  <span className="font-medium">{opt.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {step === 2 && (
          <div
            className="grid grid-cols-2 gap-3"
            role="radiogroup"
            aria-label="Event duration"
          >
            {DURATION_OPTIONS.map((opt, index) => {
              const isSelected = duration === opt.value;
              const isFocusable = isSelected || (duration === null && index === 0);
              return (
                <button
                  key={opt.value}
                  id={`radio-${opt.value}`}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={isFocusable ? 0 : -1}
                  onKeyDown={(e) => handleRadioKeyDown(e, duration, DURATION_OPTIONS, setDuration)}
                  onClick={() => setDuration(opt.value)}
                  className={`p-5 rounded-2xl border-2 text-left transition-all hover:scale-[1.01] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:outline-none ${
                    isSelected
                      ? 'border-maroon-700 bg-maroon-700/5 text-maroon-700 shadow-sm'
                      : 'border-cream-300 hover:border-maroon-700/40 text-charcoal-soft'
                  }`}
                >
                  <span className="font-medium">{opt.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {step === 3 && (
          <div>
            {['Hospitality', 'Logistics'].map((pillar) => (
              <div key={pillar} className="mb-6">
                <h3 className="text-xs font-semibold tracking-widest uppercase text-charcoal-muted mb-3">{pillar} Services</h3>
                <div className="flex flex-wrap gap-2">
                  {SERVICES_LIST.filter((s) => s.pillar === pillar).map((s) => {
                    const isChecked = selectedServices.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        role="checkbox"
                        aria-checked={isChecked}
                        tabIndex={0}
                        onKeyDown={(e) => handleCheckboxKeyDown(e, s.id)}
                        onClick={() => toggleService(s.id)}
                        className={`px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:outline-none flex items-center gap-1.5 ${
                          isChecked
                            ? 'border-maroon-700 bg-maroon-700 text-white shadow-sm'
                            : 'border-cream-300 text-charcoal-soft hover:border-maroon-700/40'
                        }`}
                      >
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-charcoal-muted/30 inline-block shrink-0 bg-white" />
                        )}
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {selectedServices.length > 0 && (
              <div className="mt-6 p-5 bg-cream-100 rounded-2xl border border-cream-300/80 border-l-4 border-l-gold-500 shadow-sm animate-fade-up">
                <p className="text-sm text-charcoal-muted">Indicative estimate range:</p>
                <p className="font-display text-3xl text-maroon-700 font-semibold mt-1">
                  {guests && cities ? getEstimate(guests, cities, selectedServices) : '—'}
                </p>
                <p className="text-charcoal-muted text-xs mt-1">
                  Based on {selectedServices.length} selected service{selectedServices.length > 1 ? 's' : ''}.
                </p>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5 animate-fade-up">
            <div className="bg-cream-100 rounded-2xl p-6 border border-cream-300/80 shadow-sm border-l-4 border-l-gold-500 mb-6">
              <p className="text-sm font-semibold text-charcoal mb-1">Your indicative estimate</p>
              <p className="font-display text-3xl text-maroon-700 font-semibold">
                {guests && cities ? getEstimate(guests, cities, selectedServices) : '—'}
              </p>
              <p className="text-charcoal-muted text-xs mt-1.5 border-t border-cream-300/60 pt-1.5">
                {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} · {GUEST_OPTIONS.find(o => o.value === guests)?.label} · {CITY_OPTIONS.find(o => o.value === cities)?.label}
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="wizard-name" className="block text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-2">
                  Your name *
                </label>
                <input
                  id="wizard-name"
                  type="text"
                  placeholder="e.g. Priya Mehta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-5 py-3.5 rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-maroon-700/30 focus:border-maroon-700 text-charcoal text-sm transition-all"
                />
              </div>

              <div>
                <label htmlFor="wizard-phone" className="block text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-2">
                  Phone / WhatsApp number *
                </label>
                <input
                  id="wizard-phone"
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-5 py-3.5 rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-maroon-700/30 focus:border-maroon-700 text-charcoal text-sm transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-cream-200">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 text-charcoal-muted hover:text-maroon-700 transition-colors font-medium focus-visible:ring-2 focus-visible:ring-gold-500 rounded px-2 py-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}

          {step < steps.length - 1 ? (
            <button
              onClick={() => { if (canProceed()) setStep(step + 1); }}
              disabled={!canProceed()}
              id={`wizard-step-${step}-next`}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-maroon-700 text-white font-medium hover:bg-maroon-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => { if (canProceed()) setSubmitted(true); }}
              disabled={!canProceed()}
              id="wizard-submit"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gold-500 text-white font-medium hover:bg-gold-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
            >
              Get My Quote <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
