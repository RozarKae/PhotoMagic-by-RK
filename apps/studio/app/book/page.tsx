import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { InquiryForm } from '../../components/InquiryForm';

export const metadata = {
  title: 'Book a Session | PhotoMagic Studio',
  description: 'Reserve your luxury photography session or commission with PhotoMagic Studio.',
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-[#070709] text-white selection:bg-amber-400 selection:text-black">
      <Navbar />

      <section className="relative pt-36 pb-12 px-6 max-w-7xl mx-auto text-center">
        <span className="font-nav text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
          Commission Reservation
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-wide text-white mt-4 leading-tight">
          Book Your Private Session
        </h1>
        <p className="font-sans text-gray-400 text-lg font-light max-w-xl mx-auto mt-4">
          Please provide details regarding your event or editorial request. Our atelier concierge
          will contact you within 24 hours.
        </p>
      </section>

      <section className="py-12 px-6 max-w-3xl mx-auto pb-24">
        <div className="p-8 sm:p-12 border border-white/10 bg-[#0B0B0E]">
          <InquiryForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
