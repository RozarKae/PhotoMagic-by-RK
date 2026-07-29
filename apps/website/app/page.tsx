'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StructuredData } from '../components/StructuredData';
import { InquiryForm } from '../components/InquiryForm';
import { Button, Card, Badge, Container, Grid, Stack, FadeIn } from '@photomagic/ui';
import { Camera, Star, Award, ShieldCheck, Heart } from 'lucide-react';
import { ROUTES } from '@photomagic/config';

export default function HomePage() {
  const featuredStories = [
    {
      id: 'story-1',
      title: 'Royal Palace Wedding',
      subtitle: 'Udaipur, Rajasthan',
      category: 'Weddings',
      image:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'story-2',
      title: 'Editorial Haute Couture',
      subtitle: 'Paris Fashion Week',
      category: 'Fashion',
      image:
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'story-3',
      title: 'Luxury Studio Portraiture',
      subtitle: 'Beverly Hills Studio',
      category: 'Portraits',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const services = [
    {
      title: 'Royal Wedding Photography',
      desc: 'Full-day multi-crew coverage capturing emotional nuances, heritage venues, and royal celebrations.',
    },
    {
      title: 'Cinematic Wedding Films',
      desc: '4K anamorphic cinema recording, aerial drone choreography, and orchestral sound design.',
    },
    {
      title: 'Studio & Fine Art Portraits',
      desc: 'Haute couture portrait sessions with master colorists, dynamic studio lighting, and flush-mount albums.',
    },
    {
      title: 'Commercial & Editorial',
      desc: 'High-volume fashion campaigns, luxury brand storytelling, and magazine editorial photography.',
    },
  ];

  const testimonials = [
    {
      quote:
        'PhotoMagic captured our wedding with unmatched artistic grace. The album approval workflow was seamless!',
      client: 'Eleanor Vance & Julian',
      event: 'Royal Palace Wedding',
    },
    {
      quote:
        'The visual clarity and tone of their work is comparable to high-end Leica fashion photography.',
      client: 'Sarah Montgomery',
      event: 'Vogue Editorial Session',
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-text-primary flex flex-col">
      <StructuredData />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-500/10 rounded-full blur-[160px] pointer-events-none" />

        <Container className="relative z-10 text-center flex flex-col items-center">
          <FadeIn>
            <Badge variant="gold" className="mb-4">
              Timeless Luxury Photography
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-text-primary max-w-4xl leading-tight mb-6">
              Capturing Moments of <span className="text-gold-500">Uncompromising Elegance</span>
            </h1>
            <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              We specialize in royal wedding celebrations, high-fashion cinema, and fine art studio
              portraiture for clients who value timeless visual art.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={ROUTES.PUBLIC.BOOKING}>
                <Button variant="primary" size="lg">
                  Inquire Concierge Consultation
                </Button>
              </Link>
              <Link href={ROUTES.PUBLIC.PORTFOLIO}>
                <Button variant="secondary" size="lg">
                  Explore Curated Portfolio
                </Button>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Featured Stories Section */}
      <section className="py-20 bg-surface-base/40 border-y border-border-subtle">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <Badge variant="gold">Curated Stories</Badge>
              <h2 className="text-3xl font-bold text-text-primary mt-2">
                Featured Portfolio Stories
              </h2>
            </div>
            <Link href={ROUTES.PUBLIC.PORTFOLIO}>
              <Button variant="ghost" size="sm">
                View All Stories →
              </Button>
            </Link>
          </div>

          <Grid cols={3}>
            {featuredStories.map((story) => (
              <Card
                key={story.id}
                variant="glass"
                className="p-0 overflow-hidden group cursor-pointer"
              >
                <div className="relative h-72 w-full overflow-hidden bg-surface-base">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-canvas/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-gold-500">
                    {story.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-gold-500 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-xs text-text-tertiary mt-1">{story.subtitle}</p>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="gold">Craftsmanship</Badge>
            <h2 className="text-3xl font-bold text-text-primary mt-2">Our Concierge Services</h2>
            <p className="text-sm text-text-secondary mt-2">
              Every package is tailored to match the unique aesthetic and scale of your event.
            </p>
          </div>

          <Grid cols={2}>
            {services.map((srv, idx) => (
              <Card key={idx} variant="glass" className="p-8">
                <div className="rounded-full bg-gold-500/10 w-12 h-12 flex items-center justify-center text-gold-500 mb-4 border border-gold-500/20">
                  <Camera size={24} />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{srv.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{srv.desc}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-surface-base/40 border-y border-border-subtle">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="gold">Testimonials</Badge>
            <h2 className="text-3xl font-bold text-text-primary mt-2">Client Praise</h2>
          </div>

          <Grid cols={2}>
            {testimonials.map((item, idx) => (
              <Card key={idx} variant="glass" className="p-8 flex flex-col justify-between">
                <div className="flex gap-1 text-gold-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-text-secondary italic mb-6">"{item.quote}"</p>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">{item.client}</h4>
                  <span className="text-xs text-text-tertiary">{item.event}</span>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Contact & Inquiry Section */}
      <section id="inquiry" className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="gold">Get In Touch</Badge>
              <h2 className="text-4xl font-extrabold text-text-primary mt-2 mb-4">
                Schedule Your Private Consultation
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Tell us about your upcoming celebration or editorial shoot. Our studio director will
                prepare a customized proposal and availability calendar.
              </p>
              <div className="flex flex-col gap-4 text-xs text-text-secondary">
                <div className="flex items-center gap-3">
                  <Award className="text-gold-500" size={20} />
                  <span>Award-winning luxury photography studio in Beverly Hills & Worldwide</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-gold-500" size={20} />
                  <span>Private client web proofing & flush-mount album co-design</span>
                </div>
              </div>
            </div>

            <Card variant="glass" className="p-8">
              <InquiryForm />
            </Card>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
