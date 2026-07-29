'use client';

import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Container, Grid, Card, Badge, Tabs } from '@photomagic/ui';

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const stories = [
    {
      id: 'p1',
      title: 'Grand Palace Celebration',
      category: 'weddings',
      location: 'Udaipur, India',
      image:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'p2',
      title: 'Monaco Yacht Sunset',
      category: 'weddings',
      location: 'Monte Carlo, Monaco',
      image:
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'p3',
      title: 'Haute Couture Editorial',
      category: 'editorial',
      location: 'Paris, France',
      image:
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'p4',
      title: 'Studio Fine Art Portrait',
      category: 'portraits',
      location: 'Beverly Hills Studio',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const filteredStories =
    activeCategory === 'all' ? stories : stories.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-canvas text-text-primary flex flex-col">
      <Navbar />

      <main className="flex-1 py-28">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="gold">Visual Portfolio</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mt-2">
              Curated Photography Stories
            </h1>
            <p className="text-sm text-text-secondary mt-2">
              Explore our world-class weddings, fine art portraits, and magazine editorials.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <Tabs
              tabs={[
                { id: 'all', label: 'All Stories' },
                { id: 'weddings', label: 'Weddings' },
                { id: 'portraits', label: 'Portraits' },
                { id: 'editorial', label: 'Editorial' },
              ]}
              activeTab={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          <Grid cols={2}>
            {filteredStories.map((story) => (
              <Card
                key={story.id}
                variant="glass"
                className="p-0 overflow-hidden group cursor-pointer"
              >
                <div className="relative h-80 w-full overflow-hidden bg-surface-base">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-gold-500 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-xs text-text-tertiary mt-1">{story.location}</p>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
