'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import {
  Share2,
  Image as ImageIcon,
  Instagram,
  Facebook,
  MessageSquare,
  Twitter,
  Copy,
  CheckCircle2,
  Sparkles,
  Zap,
  ExternalLink,
} from 'lucide-react';
import { SocialSharePreviewV10 } from '@photomagic/config';

const MOCK_SHARE_PREVIEWS: SocialSharePreviewV10[] = [
  {
    id: 'shp-1',
    projectId: 'proj-udr-901',
    platform: 'instagram',
    previewImageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    watermarkStyle: 'gold_monogram',
    shareSlug: 'vikram-ananya-wedding-story',
    totalClicks: 840,
  },
  {
    id: 'shp-2',
    projectId: 'proj-udr-902',
    platform: 'facebook',
    previewImageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    watermarkStyle: 'luxury_border',
    shareSlug: 'rahul-priya-lake-palace',
    totalClicks: 420,
  },
  {
    id: 'shp-3',
    projectId: 'proj-udr-903',
    platform: 'whatsapp',
    previewImageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
    watermarkStyle: 'gold_monogram',
    shareSlug: 'siddharth-meera-reception',
    totalClicks: 1250,
  },
  {
    id: 'shp-4',
    projectId: 'proj-udr-904',
    platform: 'pinterest',
    previewImageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    watermarkStyle: 'minimalist_white',
    shareSlug: 'destination-wedding-inspiration-2026',
    totalClicks: 960,
  },
];

const PLATFORM_CONFIG: Record<string, { label: string; icon: any; color: string }> = {
  instagram: {
    label: 'Instagram Story / Feed',
    icon: Instagram,
    color: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
  facebook: {
    label: 'Facebook Post',
    icon: Facebook,
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  whatsapp: {
    label: 'WhatsApp Status & Chat',
    icon: MessageSquare,
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  x: {
    label: 'X (Twitter) Card',
    icon: Twitter,
    color: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
  },
  pinterest: {
    label: 'Pinterest Pin',
    icon: Share2,
    color: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
  threads: {
    label: 'Threads Post',
    icon: Sparkles,
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
};

export const SocialShareGenerator: React.FC = () => {
  const [previews, setPreviews] = useState<SocialSharePreviewV10[]>(MOCK_SHARE_PREVIEWS);
  const [selectedPlatform, setSelectedPlatform] = useState<any>('instagram');
  const [watermarkStyle, setWatermarkStyle] = useState<any>('gold_monogram');
  const [customSlug, setCustomSlug] = useState<string>('royal-wedding-highlights-2026');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const handleGeneratePreview = () => {
    const newPreview: SocialSharePreviewV10 = {
      id: `shp-${Date.now()}`,
      projectId: `proj-udr-${Math.floor(100 + Math.random() * 900)}`,
      platform: selectedPlatform,
      previewImageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      watermarkStyle: watermarkStyle,
      shareSlug: customSlug || `share-${Date.now()}`,
      totalClicks: 1,
    };

    setPreviews([newPreview, ...previews]);
  };

  const handleCopyLink = (slug: string) => {
    const fullUrl = `https://rkstudio.photomagic.app/s/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 3000);
  };

  return (
    <Card
      variant="elevated"
      className="p-6 border border-border-subtle bg-surface-elevated flex flex-col gap-6"
    >
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Share2 size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-text-primary">
                Phase 10.5 — Branded Social Share Link Generator
              </h2>
              <Badge variant="gold">6 Social Channels</Badge>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Automated branded social share cards for Instagram, Facebook, WhatsApp, X, Pinterest,
              and Threads with gold monogram overlays.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={handleGeneratePreview}
          className="flex items-center gap-2 font-bold text-xs"
        >
          <Sparkles size={16} /> Synthesize Branded Card
        </Button>
      </div>

      {/* Generator Controls */}
      <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="bg-surface-elevated text-text-primary text-xs px-3 py-2 rounded-lg border border-border-subtle focus:outline-none focus:border-gold-500"
          >
            <option value="instagram">Instagram Story / Feed</option>
            <option value="facebook">Facebook Post</option>
            <option value="whatsapp">WhatsApp Status & Chat</option>
            <option value="x">X (Twitter) Card</option>
            <option value="pinterest">Pinterest Pin</option>
            <option value="threads">Threads Post</option>
          </select>

          <select
            value={watermarkStyle}
            onChange={(e) => setWatermarkStyle(e.target.value)}
            className="bg-surface-elevated text-text-primary text-xs px-3 py-2 rounded-lg border border-border-subtle focus:outline-none focus:border-gold-500"
          >
            <option value="gold_monogram">Metallic Gold Monogram Overlay</option>
            <option value="minimalist_white">Minimalist White Typography</option>
            <option value="luxury_border">Luxury Spatial Gold Frame</option>
          </select>

          <Input
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            placeholder="Custom Share Slug"
            className="sm:w-64"
          />
        </div>
      </div>

      {/* Social Previews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {previews.map((item) => {
          const platformMeta = PLATFORM_CONFIG[item.platform] || {
            label: item.platform,
            icon: Share2,
            color: 'bg-surface-base text-text-primary border-border-subtle',
          };
          const Icon = platformMeta.icon;

          return (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-surface-base border border-border-subtle hover:border-gold-500/40 transition-all flex flex-col justify-between gap-3 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold border ${platformMeta.color}`}
                  >
                    <Icon size={12} /> {item.platform.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    {item.totalClicks} Clicks
                  </span>
                </div>

                {/* Simulated Branded Preview Image Card */}
                <div className="relative overflow-hidden rounded-lg border border-border-subtle aspect-video group-hover:scale-[1.02] transition-transform">
                  <img
                    src={item.previewImageUrl}
                    alt="Social Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-between p-3">
                    <span className="text-[10px] font-bold text-gold-400 tracking-widest uppercase">
                      PHOTOMAGIC STUDIO
                    </span>
                    <span className="text-xs font-bold text-white tracking-tight">
                      Royal Palace Highlights
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-border-subtle pt-2 text-xs">
                <span className="font-mono text-text-tertiary truncate text-[11px]">
                  /s/{item.shareSlug}
                </span>
                <button
                  onClick={() => handleCopyLink(item.shareSlug)}
                  className="flex items-center gap-1 text-gold-500 hover:text-gold-400 font-bold transition-colors"
                >
                  {copiedSlug === item.shareSlug ? (
                    <CheckCircle2 size={14} className="text-emerald-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
