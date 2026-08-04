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
      title: 'Wedding Photography & Cinematography',
      desc: 'Candid photography, traditional photography, traditional videography, 4K wedding cinematography, Haldi, Mehendi, Sangeet, Engagement, and Reception coverage across Tamil Nadu & Kerala.',
    },
    {
      icon: <Film size={28} />,
      title: 'Pre-Wedding & Post-Wedding Shoots',
      desc: 'Outdoor cinematic pre-wedding shoot sessions, couple portraits in Alleppey backwaters, Chettinad heritage palaces, and scenic Kerala hill stations.',
    },
    {
      icon: <ImageIcon size={28} />,
      title: 'Family & Milestone Celebrations',
      desc: 'Baby shower, maternity photography, newborn portraits, naming ceremonies, and birthday celebrations captured with warmth and emotional authenticity.',
    },
    {
      icon: <Sparkles size={28} />,
      title: 'School & Institutional Events',
      desc: 'School annual day coverage, sports day photography, graduation & convocation ceremonies, and college cultural fests with rapid multi-category photo sorting.',
    },
    {
      icon: <Camera size={28} />,
      title: 'Corporate & Commercial Photography',
      desc: 'Corporate conferences, executive headshots, product photography, fashion shoots, commercial campaigns, interior & architectural documentation.',
    },
    {
      icon: <Film size={28} />,
      title: '4K Live Streaming & Aerial Drone',
      desc: 'High-definition 4K live streaming for relatives worldwide and ultra-smooth 4K aerial drone photography for grand venues.',
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-text-primary flex flex-col">
      <Navbar />

      <main className="flex-1 py-28">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="gold" className="uppercase tracking-widest text-[10px]">
              Services & Coverage
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mt-2">
              Photography & Cinematography Services
            </h1>
            <p className="text-sm text-text-secondary mt-2 font-light">
              Professional photography coverage across Madurai, Chennai, Coimbatore, Trichy, Salem,
              Tirunelveli, Nagercoil, Kochi, Trivandrum, Kozhikode, and all major cities in Tamil
              Nadu & Kerala.
            </p>
          </div>

          <Grid cols={2}>
            {serviceItems.map((item, idx) => (
              <Card
                key={idx}
                variant="glass"
                className="p-8 flex flex-col justify-between border-border-subtle hover:border-gold-500/30 transition-all"
              >
                <div>
                  <div className="rounded-full bg-gold-500/10 w-14 h-14 flex items-center justify-center text-gold-500 mb-6 border border-gold-500/20">
                    {item.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary mb-3">{item.title}</h2>
                  <p className="text-sm text-text-secondary leading-relaxed font-light mb-6">
                    {item.desc}
                  </p>
                </div>
                <Link href="/book">
                  <Button variant="secondary" size="sm" className="w-fit">
                    Book Studio Session
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
