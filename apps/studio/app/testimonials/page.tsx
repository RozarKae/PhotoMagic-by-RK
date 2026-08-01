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
      client: 'Lady Victoria & Sir Richard Sterling',
      event: 'Destination Wedding — Lake Como, Italy',
      quote:
        'PhotoMagic Studio delivered sheer perfection. Every frame captured the romance, drama, and intimate joy of our celebration with cinematic elegance. Looking through our heirloom album brought us to tears.',
      image:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    },
    {
      client: 'Elena & Marcus Vance',
      event: 'Luxury Editorial Portrait Collection — Paris',
      quote:
        'Working with the PhotoMagic team was effortless. They made us feel comfortable instantly, and the resulting art pieces now grace our private gallery in Geneva. Incomparable artistry.',
      image:
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    },
    {
      client: 'Alexander Wright',
      event: 'Executive Legacy & Brand Commission — New York',
      quote:
        'The attention to detail and lighting control is unparalleled. They captured the true essence of our brand identity with magazine-cover caliber artistry.',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
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
