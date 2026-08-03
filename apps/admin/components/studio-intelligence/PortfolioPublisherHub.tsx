'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import {
  Globe,
  UploadCloud,
  Eye,
  EyeOff,
  Sparkles,
  Star,
  Search,
  CheckCircle2,
  ExternalLink,
  Tag,
  Share2,
} from 'lucide-react';
import { PortfolioPublicationV10 } from '@photomagic/config';

const MOCK_PUBLICATIONS: PortfolioPublicationV10[] = [
  {
    id: 'pub-101',
    projectId: 'proj-udr-901',
    title: 'Vikram & Ananya — Royal Palace Udaipur Wedding',
    category: 'wedding',
    coverImageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    gallerySlug: 'vikram-ananya-royal-palace',
    isFeatured: true,
    isHomepageHighlight: true,
    publicationStatus: 'published',
    seoMetaTitle: 'Royal Wedding Photography City Palace Udaipur | PhotoMagic Studio',
    seoMetaDescription:
      'Spatial luxury wedding photography at City Palace Udaipur featuring 68-pt AI face enhancement and 8K master films.',
    totalViews: 14200,
    publishedAt: '2026-07-28',
  },
  {
    id: 'pub-102',
    projectId: 'proj-udr-902',
    title: 'Rahul & Priya — Lake Palace Sunset Pre-Wedding',
    category: 'pre_wedding',
    coverImageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    gallerySlug: 'rahul-priya-lake-palace-prewedding',
    isFeatured: true,
    isHomepageHighlight: false,
    publicationStatus: 'published',
    seoMetaTitle: 'Lake Palace Sunset Pre-Wedding Session Udaipur | PhotoMagic',
    seoMetaDescription:
      'Romantic sunset pre-wedding portraiture captured on Lake Pichola, Udaipur.',
    totalViews: 8900,
    publishedAt: '2026-07-29',
  },
  {
    id: 'pub-103',
    projectId: 'proj-udr-903',
    title: 'Vogue India — High Fashion Heritage Editorial',
    category: 'fashion',
    coverImageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
    gallerySlug: 'vogue-india-heritage-editorial',
    isFeatured: false,
    isHomepageHighlight: true,
    publicationStatus: 'published',
    seoMetaTitle: 'Vogue India High Fashion Editorial | PhotoMagic Studio',
    seoMetaDescription: 'Royal Rajasthani heritage fashion editorial shoot.',
    totalViews: 19500,
    publishedAt: '2026-07-30',
  },
  {
    id: 'pub-104',
    projectId: 'proj-udr-904',
    title: 'Devansh & Ishita — Taj Fateh Prakash Reception',
    category: 'wedding',
    coverImageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    gallerySlug: 'devansh-ishita-fateh-prakash',
    isFeatured: false,
    isHomepageHighlight: false,
    publicationStatus: 'hidden',
    seoMetaTitle: 'Destination Wedding Reception Udaipur',
    seoMetaDescription: 'Intimate night reception photography at Fateh Prakash Palace.',
    totalViews: 1200,
    publishedAt: '2026-07-31',
  },
];

export const PortfolioPublisherHub: React.FC = () => {
  const [publications, setPublications] = useState<PortfolioPublicationV10[]>(MOCK_PUBLICATIONS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [publishSuccess, setPublishSuccess] = useState<string | null>(null);

  const filteredPubs =
    selectedCategory === 'all'
      ? publications
      : publications.filter((p) => p.category === selectedCategory);

  const handleTogglePublishStatus = (id: string) => {
    setPublications(
      publications.map((p) =>
        p.id === id
          ? {
              ...p,
              publicationStatus: p.publicationStatus === 'published' ? 'hidden' : 'published',
            }
          : p,
      ),
    );
  };

  const handleToggleFeatured = (id: string) => {
    setPublications(
      publications.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p)),
    );
  };

  const handleToggleHomepageHighlight = (id: string) => {
    setPublications(
      publications.map((p) =>
        p.id === id ? { ...p, isHomepageHighlight: !p.isHomepageHighlight } : p,
      ),
    );
  };

  const handleOneClickPublishNew = () => {
    const newPub: PortfolioPublicationV10 = {
      id: `pub-${Date.now()}`,
      projectId: `proj-udr-${Math.floor(100 + Math.random() * 900)}`,
      title: 'Siddharth & Meera — Jagmandir Island Wedding Highlights',
      category: 'wedding',
      coverImageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      gallerySlug: `siddharth-meera-${Date.now().toString().slice(-4)}`,
      isFeatured: true,
      isHomepageHighlight: true,
      publicationStatus: 'published',
      seoMetaTitle: 'Jagmandir Island Royal Wedding | PhotoMagic Studio',
      seoMetaDescription: 'Exclusive island destination wedding photography.',
      totalViews: 1,
      publishedAt: new Date().toISOString().split('T')[0],
    };

    setPublications([newPub, ...publications]);
    setPublishSuccess('1-Click Publish Success! Gallery live on https://photomagic.app/portfolio.');
    setTimeout(() => setPublishSuccess(null), 5000);
  };

  return (
    <Card
      variant="elevated"
      className="p-6 border border-border-subtle bg-surface-elevated flex flex-col gap-6"
    >
      {/* Title & One-Click Publish */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Globe size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-text-primary">
                Phase 10.6 — Website Portfolio Publisher & SEO Engine
              </h2>
              <Badge variant="gold">1-Click Website Sync</Badge>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Publish approved client galleries directly to your luxury website portfolio with
              categories, homepage highlights, and SEO tags.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={handleOneClickPublishNew}
          className="flex items-center gap-2 font-bold text-xs"
        >
          <UploadCloud size={16} /> 1-Click Publish Approved Gallery
        </Button>
      </div>

      {publishSuccess && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} /> {publishSuccess}
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {['all', 'wedding', 'pre_wedding', 'fashion', 'portrait', 'event'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all border ${
              selectedCategory === cat
                ? 'bg-gold-500/20 text-gold-500 border-gold-500/40'
                : 'bg-surface-base text-text-secondary border-border-subtle hover:text-text-primary'
            }`}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Published Portfolio Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPubs.map((pub) => (
          <div
            key={pub.id}
            className="p-4 rounded-xl bg-surface-base border border-border-subtle hover:border-gold-500/40 transition-all flex flex-col justify-between gap-3 group"
          >
            <div>
              <div className="relative overflow-hidden rounded-lg border border-border-subtle aspect-video mb-3">
                <img
                  src={pub.coverImageUrl}
                  alt={pub.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  {pub.isFeatured && (
                    <span className="p-1 rounded bg-gold-500 text-surface-base font-bold title='Featured Gallery'">
                      <Star size={12} fill="currentColor" />
                    </span>
                  )}
                  {pub.isHomepageHighlight && (
                    <span className="p-1 rounded bg-purple-500 text-white font-bold title='Homepage Highlight'">
                      <Sparkles size={12} />
                    </span>
                  )}
                </div>
              </div>

              <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-gold-500/10 text-gold-400 border border-gold-500/20">
                {pub.category.replace('_', ' ')}
              </span>

              <h3 className="text-sm font-bold text-text-primary mt-1 text-ellipsis overflow-hidden line-clamp-1">
                {pub.title}
              </h3>
              <span className="text-[11px] text-text-tertiary font-mono block mt-0.5">
                /portfolio/{pub.gallerySlug}
              </span>
            </div>

            <div className="border-t border-border-subtle pt-3 text-xs flex flex-col gap-2">
              <div className="flex items-center justify-between text-text-tertiary text-[11px]">
                <span>
                  Views:{' '}
                  <strong className="text-text-primary">{pub.totalViews.toLocaleString()}</strong>
                </span>
                <span>Published: {pub.publishedAt}</span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 border-t border-border-subtle/50">
                <button
                  onClick={() => handleTogglePublishStatus(pub.id!)}
                  className={`flex items-center gap-1 font-semibold ${
                    pub.publicationStatus === 'published'
                      ? 'text-emerald-400'
                      : 'text-text-tertiary'
                  }`}
                >
                  {pub.publicationStatus === 'published' ? <Eye size={14} /> : <EyeOff size={14} />}
                  <span className="capitalize">{pub.publicationStatus}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleFeatured(pub.id!)}
                    className={`p-1 rounded border text-[11px] font-bold ${
                      pub.isFeatured
                        ? 'bg-gold-500/20 text-gold-400 border-gold-500/40'
                        : 'bg-surface-elevated border-border-subtle text-text-tertiary'
                    }`}
                    title="Toggle Featured"
                  >
                    Featured
                  </button>

                  <a
                    href={`https://photomagic.app/portfolio/${pub.gallerySlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded bg-surface-elevated border border-border-subtle text-gold-400 hover:text-gold-300"
                    title="View Live Web Gallery"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
