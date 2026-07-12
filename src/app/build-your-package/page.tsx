import type { Metadata } from 'next';
import { BuildPackageWizard } from '@/components/BuildPackageWizard';

export const metadata: Metadata = {
  title: 'Build Your Package | Get an Estimate',
  description: 'Use our guided package builder to select services, get an indicative estimate, and request a custom quote from Ayan Hospitality in under 2 minutes.',
};

export default function BuildYourPackagePage() {
  return (
    <div className="pt-20 min-h-screen bg-cream-100">
      <section className="section-padding">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold-500 text-xs font-semibold tracking-[0.3em] uppercase mb-4">Package Builder</p>
            <h1 className="font-display text-5xl text-maroon-700 font-semibold mb-4">Build Your Package</h1>
            <p className="text-charcoal-muted text-lg">Answer 4 quick questions to get an indicative estimate in under 2 minutes.</p>
          </div>
          <BuildPackageWizard />
        </div>
      </section>
    </div>
  );
}
