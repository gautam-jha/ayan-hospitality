import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getHospitalityServices, getTestimonialById } from '@/lib/repository';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { buildWhatsAppUrl } from '@/lib/utils';
import { CheckCircle2, Clock, Star, ArrowRight, MapPin } from 'lucide-react';

export async function generateStaticParams() {
  const services = await getHospitalityServices();
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service: slug } = await params;
  const s = await getServiceBySlug(slug);
  if (!s) return {};
  return { title: s.metaTitle, description: s.metaDescription };
}

export default async function HospitalityServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service || service.pillar !== 'hospitality') notFound();
  const testimonial = service.testimonialId ? await getTestimonialById(service.testimonialId) : null;
  const waUrl = buildWhatsAppUrl(service.whatsappMessage);
  const hospitalityServices = await getHospitalityServices();
  const related = hospitalityServices.filter((s) => s.slug !== slug).slice(0, 3);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.longDescription,
    provider: { '@type': 'LocalBusiness', name: 'Ayan Hospitality' },
    areaServed: 'India',
  };

  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-cream-200 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold-500 text-xs font-semibold tracking-widest uppercase mb-4">Hospitality Services</p>
            <h1 className="font-display text-5xl lg:text-6xl text-maroon-700 font-semibold mb-4">{service.title}</h1>
            <p className="text-2xl text-charcoal-soft font-display italic mb-6">"{service.shortDescription}"</p>
            <p className="text-charcoal-muted leading-relaxed text-lg mb-8">{service.longDescription}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button href="/contact" variant="primary" size="lg" id={`${slug}-get-quote`}>Get a Quote <ArrowRight className="w-4 h-4" /></Button>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" id={`${slug}-whatsapp`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-whatsapp text-white font-medium hover:brightness-110 active:scale-95 transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Details grid */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* What's included */}
          <div>
            <h2 className="font-display text-3xl text-maroon-700 font-semibold mb-6">What's included</h2>
            <ul className="space-y-3">
              {service.included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  <span className="text-charcoal-soft">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Timeline note + testimonial */}
          <div className="space-y-8">
            <div className="bg-cream-100 rounded-2xl p-6 border border-cream-300">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-gold-500" />
                <h3 className="font-semibold text-charcoal text-sm uppercase tracking-wide">How it fits your event timeline</h3>
              </div>
              <p className="text-charcoal-soft leading-relaxed">{service.timelineNote}</p>
            </div>
            {testimonial && (
              <div className="bg-maroon-700/5 rounded-2xl p-6 border border-maroon-700/10">
                <div className="flex mb-3">{Array.from({length:5}).map((_,i)=><Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />)}</div>
                <blockquote className="text-charcoal-soft italic leading-relaxed mb-4">"{testimonial.quote}"</blockquote>
                <p className="font-semibold text-charcoal text-sm">{testimonial.clientName}</p>
                <p className="text-charcoal-muted text-xs">{testimonial.eventDescription}</p>
                {testimonial.venue && <p className="text-gold-500 text-xs mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" />{testimonial.venue}</p>}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section-padding bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-maroon-700 font-semibold mb-8">Other hospitality services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((s) => (
              <a key={s.slug} href={`/services/hospitality/${s.slug}`} className="card-warm p-6 block group">
                <h3 className="font-display text-lg text-maroon-700 font-semibold mb-2 group-hover:text-gold-600 transition-colors">{s.title}</h3>
                <p className="text-charcoal-muted text-sm">{s.shortDescription}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
