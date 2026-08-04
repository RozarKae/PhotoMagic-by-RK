import React from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const metadata = {
  title: 'Testimonials & Client Stories | PhotoMagic Studio',
  description:
    'Read glowing testimonials and press stories from our discerning wedding, portrait, and luxury event clients worldwide.',
};

export default function TestimonialsPage() {
  const stories = [
    {
      client: 'Anitha & Karthik',
      event: 'Traditional Wedding — Madurai, Tamil Nadu',
      quote:
        'PhotoMagic Studio delivered sheer perfection. Every frame captured the romance, tradition, and candid joy of our Chettinad wedding with natural color science. Looking through our 24K gold foil album brought our family to tears.',
      image: '/images/hindu_wedding_ceremony.png',
    },
    {
      client: 'Rahul & Meera',
      event: 'Pre-Wedding & Cinematography — Kochi, Kerala',
      quote:
        'Working with the PhotoMagic team in Alleppey and Kochi was completely effortless. They made us feel natural instantly, and the resulting pre-wedding photos and 4K film feel like a luxury magazine shoot.',
      image: '/images/prewedding_backwaters.png',
    },
    {
      client: 'Dr. Vignesh Kumar',
      event: 'Corporate Summit & Commercial Portfolio — Chennai, Tamil Nadu',
      quote:
        'The attention to detail, lighting control, and rapid delivery of 1,200+ event photos was unprecedented. They captured our Chennai IT summit with corporate elegance.',
      image: '/images/corporate_conference_summit.png',
    },
  ];

  return (
    <main className="min-h-screen bg-[#070709] text-white selection:bg-amber-400 selection:text-black">
      <Navbar />

      <section className="relative pt-36 pb-16 px-6 max-w-7xl mx-auto text-center">
        <span className="font-nav text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
          Love Letters & Praise
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-wide text-white mt-4 max-w-3xl mx-auto leading-tight">
          Client Stories & Testimonials
        </h1>
        <p className="font-sans text-gray-400 text-lg font-light max-w-xl mx-auto mt-6">
          Read reflections from those who have entrusted us with their most cherished milestones.
        </p>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto space-y-20">
        {stories.map((item, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-16 ${
              idx !== stories.length - 1 ? 'border-b border-white/10' : ''
            }`}
          >
            <div className={`space-y-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <span className="font-nav text-[10px] uppercase tracking-[0.25em] text-amber-400">
                {item.event}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white leading-relaxed">
                "{item.quote}"
              </h3>
              <p className="font-serif text-amber-200 text-lg italic">— {item.client}</p>
            </div>
            <div
              className={`relative aspect-[4/3] overflow-hidden border border-white/10 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}
            >
              <img
                src={item.image}
                alt={item.client}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#0B0B0E] border-t border-white/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
            Ready to Begin Your Story?
          </h2>
          <p className="text-gray-400 font-light">
            Commission your private photography collection with PhotoMagic Studio.
          </p>
          <div className="pt-4">
            <Link
              href="/book"
              className="inline-block font-nav text-xs uppercase tracking-[0.25em] bg-gradient-to-r from-amber-400 via-[#F8F3E6] to-amber-300 text-black px-10 py-4 font-semibold hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
            >
              Book a Commission
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
