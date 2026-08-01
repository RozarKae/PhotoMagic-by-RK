'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Container, Grid, Card, Badge } from '@photomagic/ui';

export default function BlogPage() {
  const articles = [
    {
      title: 'Planning a Royal Palace Wedding in Rajasthan',
      date: 'July 15, 2026',
      excerpt:
        'Key lighting, venue logistics, and timeline recommendations for historic palace celebrations.',
      category: 'Guides',
    },
    {
      title: 'The Art of Anamorphic Film Scoring in Wedding Cinema',
      date: 'June 28, 2026',
      excerpt:
        'Why 4K anamorphic lenses and custom orchestral scoring elevate event cinematography.',
      category: 'Cinema',
    },
    {
      title: 'Preserving Your Heirloom Flush-Mount Album',
      date: 'May 14, 2026',
      excerpt: 'Care guidelines for Italian leather and velvet flush-mount photo albums.',
      category: 'Albums',
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-text-primary flex flex-col">
      <Navbar />

      <main className="flex-1 py-28">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="gold">Journal & Insights</Badge>
            <h1 className="text-4xl font-extrabold text-text-primary mt-2">Studio Journal</h1>
            <p className="text-sm text-text-secondary mt-2">
              Insights, luxury wedding guides, and behind-the-scenes photography stories.
            </p>
          </div>

          <Grid cols={3}>
            {articles.map((item, idx) => (
              <Card
                key={idx}
                variant="glass"
                className="p-6 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <Badge variant="gold" className="mb-3">
                    {item.category}
                  </Badge>
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-gold-500 transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-4">{item.excerpt}</p>
                </div>
                <span className="text-xs text-text-tertiary">{item.date}</span>
              </Card>
            ))}
          </Grid>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
