'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Container, Grid, Card, Badge, Tabs, Button } from '@photomagic/ui';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, MapPin } from 'lucide-react';

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const stories = [
    {
      id: 'p1',
      title: 'Grand Palace Celebration',
      category: 'weddings',
      location: 'City Palace • Udaipur, India',
      desc: '3-Day Royal Destination Wedding capturing heritage courtyard vows, sunset fireworks, and intricate bridal heirloom detailing.',
      image:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'p2',
      title: 'Monaco Yacht Sunset',
      category: 'weddings',
      location: 'Port Hercule • Monte Carlo, Monaco',
      desc: 'Intimate Mediterranean yacht celebration with anamorphic cinematic highlight film scoring and sunset portraiture.',
      image:
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'p3',
      title: 'Haute Couture Editorial',
      category: 'editorial',
      location: 'Hôtel de Crillon • Paris, France',
      desc: 'High-fashion editorial session featuring custom silk gowns, dynamic Rembrandt studio lighting, and Vogue Paris styling.',
      image:
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'p4',
      title: 'Studio Fine Art Portrait',
      category: 'portraits',
      location: 'Private Atelier • Beverly Hills',
      desc: 'Fine art portrait session with master skin retouching, museum-grade canvas printing, and Italian velvet binding.',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const filteredStories =
    activeCategory === 'all' ? stories : stories.filter((s) => s.category === activeCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % filteredStories.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) =>
          prev !== null ? (prev - 1 + filteredStories.length) % filteredStories.length : 0,
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredStories.length]);

  return (
    <div className="min-h-screen bg-canvas text-text-primary flex flex-col">
      <Navbar />

      <main className="flex-1 py-28">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="gold" className="uppercase tracking-widest text-[10px]">
              Cinematic Visual Portfolio
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mt-2">
              Curated Masterpiece Stories
            </h1>
            <p className="text-sm text-text-secondary mt-2 font-light">
              Click any chapter story to enter the full-screen immersive gallery inspection.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <Tabs
              tabs={[
                { id: 'all', label: 'All Stories' },
                { id: 'weddings', label: 'Royal Weddings' },
                { id: 'portraits', label: 'Fine Art Portraits' },
                { id: 'editorial', label: 'Haute Couture' },
              ]}
              activeTab={activeCategory}
              onChange={(cat) => {
                setActiveCategory(cat);
                setSelectedImageIndex(null);
              }}
            />
          </div>

          <Grid cols={2}>
            {filteredStories.map((story, idx) => (
              <Card
                key={story.id}
                variant="glass"
                onClick={() => setSelectedImageIndex(idx)}
                className="p-0 overflow-hidden group cursor-pointer border-border-subtle hover:border-gold-500/50 hover:shadow-gold transition-all duration-500"
              >
                <div className="relative h-88 w-full overflow-hidden bg-surface-base">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-xs font-semibold text-gold-500 flex items-center gap-1.5 bg-canvas/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-gold-500/30">
                      <Maximize2 size={14} /> Fullscreen Inspection
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-canvas/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold text-gold-500 border border-gold-500/20">
                    {story.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-1.5">
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-gold-500 transition-colors">
                    {story.title}
                  </h3>
                  <span className="text-xs text-gold-500 font-mono flex items-center gap-1">
                    <MapPin size={12} /> {story.location}
                  </span>
                  <p className="text-xs text-text-secondary font-light leading-relaxed pt-1">
                    {story.desc}
                  </p>
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </main>

      {/* Fullscreen Immersive Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-canvas/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          {/* Top Controls */}
          <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
            <span className="text-xs text-text-tertiary font-mono">
              {selectedImageIndex + 1} of {filteredStories.length} (Use ← → Arrow Keys)
            </span>
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="p-2.5 rounded-full bg-surface-elevated text-text-secondary hover:text-gold-500 border border-border-subtle transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() =>
              setSelectedImageIndex(
                (selectedImageIndex - 1 + filteredStories.length) % filteredStories.length,
              )
            }
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-surface-elevated/80 backdrop-blur-md text-text-secondary hover:text-gold-500 border border-border-subtle transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => setSelectedImageIndex((selectedImageIndex + 1) % filteredStories.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-surface-elevated/80 backdrop-blur-md text-text-secondary hover:text-gold-500 border border-border-subtle transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          {/* Lightbox Content */}
          <div className="max-w-5xl w-full flex flex-col items-center gap-4">
            <div className="relative max-h-[75vh] overflow-hidden rounded-2xl border border-gold-500/30 shadow-2xl">
              <img
                src={filteredStories[selectedImageIndex].image}
                alt={filteredStories[selectedImageIndex].title}
                className="max-h-[75vh] w-auto object-contain rounded-2xl"
              />
            </div>

            <div className="text-center max-w-xl">
              <h2 className="text-2xl font-bold text-text-primary">
                {filteredStories[selectedImageIndex].title}
              </h2>
              <p className="text-xs text-gold-500 font-mono mt-1">
                {filteredStories[selectedImageIndex].location}
              </p>
              <p className="text-xs text-text-secondary font-light mt-2">
                {filteredStories[selectedImageIndex].desc}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
