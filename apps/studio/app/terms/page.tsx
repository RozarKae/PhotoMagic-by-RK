import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const metadata = {
  title: 'Terms of Service | PhotoMagic Studio',
  description: 'Terms of service, commission agreements, and photography booking conditions.',
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#070709] text-white selection:bg-amber-400 selection:text-black">
      <Navbar />

      <section className="relative pt-36 pb-16 px-6 max-w-4xl mx-auto">
        <span className="font-nav text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
          Legal Agreement
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-wide text-white mt-4 leading-tight">
          Terms of Service
        </h1>
        <p className="text-gray-400 font-light text-sm mt-4">Last Updated: August 1, 2026</p>

        <div className="mt-12 space-y-8 text-gray-300 font-light leading-relaxed border-t border-white/10 pt-8">
          <div>
            <h2 className="font-serif text-xl text-white mb-3">
              1. Commission & Retainer Agreements
            </h2>
            <p>
              All photography sessions, event coverage, and fine art commissions require a signed
              contract and non-refundable retainer to reserve event dates on our atelier calendar.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-white mb-3">2. Copyright & Usage Rights</h2>
            <p>
              PhotoMagic Studio retains master copyright for all captured images. Clients receive
              personal print and digital reproduction rights as defined in their individual
              commission agreements.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-white mb-3">3. Delivery Timelines & Archival</h2>
            <p>
              Curated client galleries are delivered via PhotoMagic OS within 4–6 weeks post-event.
              High-resolution files are stored in our secure archival vault for up to 12 months
              following initial delivery.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
