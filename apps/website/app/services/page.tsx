'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Container, Grid, Card, Badge, Button } from '@photomagic/ui';
import { Camera, Film, Image as ImageIcon, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const serviceItems = [
    {
      icon: <Camera size={28} />,
      title: 'Royal Wedding Coverage',
      desc: 'Multi-day wedding coverage featuring master lead photographers, secondary associate shooters, and continuous venue lighting teams.',
    },
    {
      icon: <Film size={28} />,
      title: '4K Anamorphic Cinema',
      desc: 'Cinematic wedding films recorded on RED/ARRI cinema cameras with orchestral audio scoring and aerial drone choreography.',
    },
    {
      icon: <ImageIcon size={28} />,
      title: 'Fine Art Studio Portraiture',
      desc: 'Studio portrait sessions featuring bespoke lighting, professional hair & makeup styling, and gallery-grade canvas prints.',
    },
    {
      icon: <Sparkles size={28} />,
      title: 'Flush-Mount Album Co-Design',
      desc: 'Custom leather-bound and velvet flush-mount wedding albums crafted in Italy with 3D digital client review.',
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-text-primary flex flex-col">
      <Navbar />

      <main className="flex-1 py-28">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="gold">Bespoke Offerings</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mt-2">
              Our Concierge Services
            </h1>
            <p className="text-sm text-text-secondary mt-2">
              Uncompromising craftsmanship for life's most extraordinary celebrations.
            </p>
          </div>

          <Grid cols={2}>
            {serviceItems.map((item, idx) => (
              <Card key={idx} variant="glass" className="p-8 flex flex-col justify-between">
                <div>
                  <div className="rounded-full bg-gold-500/10 w-14 h-14 flex items-center justify-center text-gold-500 mb-6 border border-gold-500/20">
                    {item.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary mb-3">{item.title}</h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">{item.desc}</p>
                </div>
                <Link href="/contact">
                  <Button variant="secondary" size="sm">
                    Inquire Pricing & Availability
                  </Button>
                </Link>
              </Card>
            ))}
          </Grid>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
