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
    <div className="min-h-screen bg-canvas text-text-primary flex flex-col">
      <StructuredData />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gold-500/10 rounded-full blur-[170px] pointer-events-none" />

        <Container className="relative z-10 text-center flex flex-col items-center">
          <FadeIn>
            <Badge variant="gold" className="mb-4 uppercase tracking-widest text-[10px]">
              Architects of Timeless Luxury Photography
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-text-primary max-w-4xl leading-[1.1] mb-6">
              Capturing Moments of <span className="text-gold-500">Uncompromising Elegance</span>
            </h1>
            <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              We specialize in royal wedding celebrations, high-fashion cinema, and fine art studio
              portraiture for discerning clients across Udaipur, Paris, Beverly Hills, and London.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={ROUTES.PUBLIC.BOOKING}>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto font-bold tracking-wide"
                >
                  Request Concierge Consultation
                </Button>
              </Link>
              <Link href={ROUTES.PUBLIC.PORTFOLIO}>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto tracking-wide">
                  Discover Curated Portfolio
                </Button>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Storytelling Heritage Block */}
      <section className="py-16 bg-surface-base/60 border-y border-border-subtle">
        <Container className="max-w-4xl text-center">
          <Badge variant="gold" className="mb-3 uppercase tracking-widest text-[10px]">
            Our Legacy & Philosophy
          </Badge>
          <h2 className="text-3xl font-extrabold text-text-primary mb-4">
            Where Emotion Meets Fine Art
          </h2>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed font-light italic">
            "Founded on the philosophy that true luxury lies in emotion, light, and timeless
            permanence, PhotoMagic Studio brings a cinematic, fine-art perspective to life's
            grandest celebrations. Every frame is handcrafted to endure for generations."
          </p>
        </Container>
      </section>

      {/* Featured Stories Section */}
      <section className="py-24">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <Badge variant="gold" className="uppercase tracking-widest text-[10px]">
                Curated Stories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-2">
                Featured Portfolio Chapters
              </h2>
            </div>
            <Link href={ROUTES.PUBLIC.PORTFOLIO}>
              <Button variant="ghost" size="sm" className="text-gold-500">
                View Complete Portfolio →
              </Button>
            </Link>
          </div>

          <Grid cols={3}>
            {featuredStories.map((story) => (
              <Card
                key={story.id}
                variant="glass"
                className="p-0 overflow-hidden group cursor-pointer border-border-subtle hover:border-gold-500/40 transition-all duration-300"
              >
                <div className="relative h-80 w-full overflow-hidden bg-surface-base">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-canvas/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold text-gold-500 border border-gold-500/20">
                    {story.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-gold-500 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-xs text-text-tertiary mt-1 font-mono">{story.subtitle}</p>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-surface-base/40 border-y border-border-subtle">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="gold" className="uppercase tracking-widest text-[10px]">
              Craftsmanship & Artistry
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-2">
              Bespoke Concierge Offerings
            </h2>
            <p className="text-sm text-text-secondary mt-2 font-light">
              Tailored multi-crew collections engineered for world-class celebrations and
              high-fashion portraiture.
            </p>
          </div>

          <Grid cols={2}>
            {services.map((srv, idx) => {
              const IconComponent = srv.icon;
              return (
                <Card
                  key={idx}
                  variant="glass"
                  className="p-8 flex flex-col justify-between hover:border-gold-500/30 transition-all"
                >
                  <div>
                    <div className="rounded-full bg-gold-500/10 w-14 h-14 flex items-center justify-center text-gold-500 mb-6 border border-gold-500/20">
                      <IconComponent size={26} />
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary mb-3">{srv.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed font-light">
                      {srv.desc}
                    </p>
                  </div>
                </Card>
              );
            })}
          </Grid>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="gold" className="uppercase tracking-widest text-[10px]">
              Client Acclaim
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-2">
              Praise From Distinguishing Clients
            </h2>
          </div>

          <Grid cols={2}>
            {testimonials.map((item, idx) => (
              <Card
                key={idx}
                variant="glass"
                className="p-8 flex flex-col justify-between border-border-subtle"
              >
                <div>
                  <div className="flex gap-1 text-gold-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm md:text-base text-text-secondary italic mb-6 leading-relaxed font-light">
                    "{item.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-border-subtle">
                  <h4 className="text-sm font-bold text-text-primary">{item.client}</h4>
                  <span className="text-xs text-gold-500 font-mono">{item.event}</span>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Contact & Inquiry Section */}
      <section id="inquiry" className="py-24 bg-surface-base/40 border-t border-border-subtle">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="gold" className="uppercase tracking-widest text-[10px]">
                Private Consultation
              </Badge>
              <h2 className="text-4xl font-extrabold text-text-primary mt-2 mb-4">
                Initiate Your Studio Consultation
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-8 font-light">
                Share your upcoming wedding date, celebration venue, or editorial project details.
                Our Studio Director personally responds within 24 hours to confirm date availability
                and provide a tailored collection proposal.
              </p>
              <div className="flex flex-col gap-4 text-xs text-text-secondary">
                <div className="flex items-center gap-3">
                  <Award className="text-gold-500 flex-shrink-0" size={22} />
                  <span>Award-winning studio with ateliers in Udaipur, Beverly Hills & London</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-gold-500 flex-shrink-0" size={22} />
                  <span>
                    Private client web proofing, 3D pin comments & Italian flush-mount album
                    co-design
                  </span>
                </div>
              </div>
            </div>

            <Card variant="glass" className="p-8 border-gold-500/30">
              <InquiryForm />
            </Card>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
