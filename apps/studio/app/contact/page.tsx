import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { InquiryForm } from '../../components/InquiryForm';

export const metadata = {
  title: 'Contact Atelier | PhotoMagic Studio',
  description:
    'Inquire about bespoke wedding photography, fine art portraiture, and commercial editorial commissions.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#070709] text-white selection:bg-amber-400 selection:text-black">
      <Navbar />

      <section className="relative pt-36 pb-12 px-6 max-w-7xl mx-auto text-center">
        <span className="font-nav text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
          Direct Atelier Communication
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-wide text-white mt-4 leading-tight">
          Contact PhotoMagic Studio
        </h1>
        <p className="font-sans text-gray-400 text-lg font-light max-w-xl mx-auto mt-4">
          We welcome private inquiries for global commissions, luxury celebrations, and fine art
          portraits.
        </p>
      </section>

      <section className="py-12 px-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="space-y-8 lg:col-span-1 border-r border-white/10 pr-8">
          <div>
            <h3 className="font-nav text-xs uppercase tracking-[0.2em] text-amber-400">
              Main Office
            </h3>
            <p className="text-gray-300 font-light text-sm mt-2">100 Fine Art Way, Suite 400</p>
            <p className="text-gray-300 font-light text-sm">New York, NY 10001</p>
          </div>

          <div>
            <h3 className="font-nav text-xs uppercase tracking-[0.2em] text-amber-400">
              Direct Contact
            </h3>
            <p className="text-gray-300 font-light text-sm mt-2">concierge@photomagicstudio.com</p>
            <p className="text-gray-300 font-light text-sm">+1 (800) 555-PHOTOMAGIC</p>
          </div>

          <div>
            <h3 className="font-nav text-xs uppercase tracking-[0.2em] text-amber-400">
              Studio Hours
            </h3>
            <p className="text-gray-300 font-light text-sm mt-2">
              Monday — Friday: 9:00 AM – 6:00 PM EST
            </p>
            <p className="text-gray-400 font-light text-xs mt-1">
              Private consultations by appointment only.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <InquiryForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
