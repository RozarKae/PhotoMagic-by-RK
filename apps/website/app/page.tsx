'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StructuredData } from '../components/StructuredData';
import { InquiryForm } from '../components/InquiryForm';
import { Button, Card, Badge, Container, Grid, Stack, FadeIn } from '@photomagic/ui';
import {
  Camera,
  Star,
  Award,
  ShieldCheck,
  Heart,
  Crown,
  Sparkles,
  Gem,
  Compass,
} from 'lucide-react';
import { ROUTES } from '@photomagic/config';

export default function HomePage() {
  const featuredStories = [
    {
      id: 'story-1',
      title: 'Royal Palace Celebration',
      subtitle: 'City Palace • Udaipur, India',
      category: 'Royal Weddings',
      image:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'story-2',
      title: 'Editorial Haute Couture',
      subtitle: 'Hôtel de Crillon • Paris, France',
      category: 'Haute Couture',
      image:
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'story-3',
      title: 'Fine Art Master Portraiture',
      subtitle: 'Private Atelier • Beverly Hills',
      category: 'Fine Art',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const services = [
    {
      icon: Crown,
      title: 'Royal Heritage Wedding Photography',
      desc: 'Multi-day, multi-crew coverage capturing grand architectural splendor, intimate emotional nuances, and royal heritage celebrations worldwide.',
    },
    {
      icon: Sparkles,
      title: '8K Anamorphic Cinema & Sound Design',
      desc: 'Hollywood-grade 8K cinema recording on RED/ARRI systems, aerial drone choreography, and bespoke orchestral musical scoring.',
    },
    {
      icon: Gem,
      title: 'Haute Couture & Fine Art Atelier',
      desc: 'Private studio portraiture guided by master colorists, dynamic Rembrandt lighting setups, and handcrafted Italian canvas framing.',
    },
    {
      icon: Compass,
      title: 'Destination & High-Society Editorial',
      desc: 'Comprehensive coverage for high-net-worth galas, Vogue-style fashion editorials, and exclusive private estate celebrations.',
    },
  ];

  const testimonials = [
    {
      quote:
        'PhotoMagic captured our Udaipur palace wedding with breathtaking artistic grace. The digital album co-design experience was pure perfection.',
      client: 'Eleanor Vance & Julian Montgomery',
      event: 'Royal Palace Wedding • City Palace, Udaipur',
    },
    {
      quote:
        'The tonal richness and editorial precision of their work is unmatched. They preserved our family legacy with incredible sophistication.',
      client: 'Lady Sarah Sterling',
      event: 'Private Estate Gala • Beverly Hills',
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-ivory flex flex-col selection:bg-gold-500 selection:text-canvas">
      <StructuredData />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Ambient Emerald & Gold Museum Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

        <Container className="relative z-10 text-center flex flex-col items-center">
          <FadeIn>
            <Badge variant="gold" className="mb-6 uppercase tracking-widest">
              Digital Headquarters • International Fine Art House
            </Badge>

            <h1 className="font-hero text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-ivory max-w-5xl leading-[1.08] mb-6">
              Documenting{' '}
              <span className="text-gold-500 italic font-heading font-normal">Legacy</span> Across
              Generations
            </h1>

            <p className="text-base md:text-xl text-silver max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Fine art photography, 8K anamorphic cinema, and private atelier portraiture for royal
              houses, luxury estates, and international celebrations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={ROUTES.PUBLIC.BOOKING}>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto font-bold tracking-widest shadow-watch"
                >
                  Request Private Concierge Consultation
                </Button>
              </Link>
              <Link href={ROUTES.PUBLIC.PORTFOLIO}>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto font-semibold">
                  View Curated Exhibition
                </Button>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Section 01: Featured Exhibition */}
      <section className="py-24 border-t border-gold-500/20 relative">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="font-mono text-xs text-gold-500 uppercase tracking-widest block mb-2">
                01 / CURATED EXHIBITION
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-semibold text-ivory">
                Masterpiece Portfolio Archives
              </h2>
            </div>
            <Link href={ROUTES.PUBLIC.PORTFOLIO}>
              <Button variant="ghost" size="sm" className="text-gold-400">
                View Full Archive →
              </Button>
            </Link>
          </div>

          <Grid cols={3} className="gap-8">
            {featuredStories.map((story) => (
              <Card
                key={story.id}
                variant="glass"
                className="p-0 group overflow-hidden border-gold-500/20 hover:border-gold-500/50"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase text-gold-500 tracking-widest">
                      {story.category}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-ivory">{story.title}</h3>
                    <p className="text-xs text-silver font-light">{story.subtitle}</p>
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Section 02: Royal Heritage Services */}
      <section className="py-24 border-t border-gold-500/20 bg-surface-base/40 relative">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs text-gold-500 uppercase tracking-widest block mb-2">
              02 / ROYAL HERITAGE SERVICES
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-ivory">
              Bespoke Photography & Cinema Atelier
            </h2>
          </div>

          <Grid cols={2} className="gap-8">
            {services.map((service, idx) => {
              const IconComp = service.icon;
              return (
                <Card
                  key={idx}
                  variant="glass"
                  className="p-8 flex flex-col gap-4 border-gold-500/20 hover:border-gold-500/50"
                >
                  <div className="p-3 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20 w-fit">
                    <IconComp size={24} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-ivory">{service.title}</h3>
                  <p className="text-sm text-silver font-light leading-relaxed">{service.desc}</p>
                </Card>
              );
            })}
          </Grid>
        </Container>
      </section>

      {/* Section 03: Testimonials */}
      <section className="py-24 border-t border-gold-500/20 relative">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs text-gold-500 uppercase tracking-widest block mb-2">
              03 / LEGACY RECOGNITION
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-ivory">
              Patrons of Distinction
            </h2>
          </div>

          <Grid cols={2} className="gap-8">
            {testimonials.map((t, idx) => (
              <Card key={idx} variant="glass" className="p-8 flex flex-col justify-between gap-6">
                <p className="font-heading text-xl italic text-ivory leading-relaxed">
                  "{t.quote}"
                </p>
                <div>
                  <h4 className="font-bold text-sm text-gold-500">{t.client}</h4>
                  <span className="text-xs text-silver font-mono">{t.event}</span>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Section 04: Concierge Inquiry */}
      <section className="py-24 border-t border-gold-500/20 bg-surface-base/60 relative">
        <Container className="max-w-3xl">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-gold-500 uppercase tracking-widest block mb-2">
              04 / PRIVATE CONCIERGE
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-ivory mb-4">
              Commence Your Legacy Commission
            </h2>
            <p className="text-sm text-silver font-light">
              Inquire regarding availability for royal wedding commissions, private studio ateliers,
              or international editorial assignments.
            </p>
          </div>

          <Card variant="glass" className="p-8">
            <InquiryForm />
          </Card>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
