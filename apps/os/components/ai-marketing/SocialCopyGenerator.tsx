'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Select } from '@photomagic/ui';
import { Sparkles, Copy, Share2, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

export const SocialCopyGenerator: React.FC = () => {
  const [platform, setPlatform] = useState('instagram');
  const [tone, setTone] = useState('luxury');
  const [generatedCaption, setGeneratedCaption] = useState(
    '✨ Capturing timeless elegance & royal moments. Every frame is a tribute to heritage and romance. Limited booking slots open for 2026-2027 Destination Weddings. 🏰💍\n\n#PhotoMagicStudio #RoyalWedding #LuxuryWeddingPhotographer #UdaipurWeddings #DestinationBride #CinematicPhotography',
  );

  const handleGenerateCopy = () => {
    setGeneratedCaption(
      '✨ Unveiling our latest Royal Wedding Collection. Crafted with precision, fine-art lighting, and timeless storytelling. Inquire now to secure your dates. 👑✨\n\n#FineArtWedding #VogueWeddings #PhotoMagicByRK #BrideAndGroom #BridalCouture',
    );
  };

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            AI Social Media Copywriter & Caption Synthesizer
          </h3>
        </div>
        <Badge variant="gold">Multi-Platform Optimized</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-text-secondary">Target Platform</label>
          <Select
            value={platform}
            onChange={(val: string) => setPlatform(val)}
            options={[
              { value: 'instagram', label: 'Instagram (Reels & Feed Captions)' },
              { value: 'facebook', label: 'Facebook Business Page' },
              { value: 'twitter', label: 'X (Twitter) Short Form' },
              { value: 'linkedin', label: 'LinkedIn Editorial' },
            ]}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-text-secondary">Brand Voice & Tone</label>
          <Select
            value={tone}
            onChange={(val: string) => setTone(val)}
            options={[
              { value: 'luxury', label: 'Luxury & High-End Regal' },
              { value: 'editorial', label: 'Vogue Magazine Editorial' },
              { value: 'emotional', label: 'Warm & Emotional Storyteller' },
              { value: 'promotional', label: 'Offer & Booking Urgency' },
            ]}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 text-xs">
        <label className="font-semibold text-text-primary">Generated AI Caption & Hashtags</label>
        <textarea
          rows={5}
          value={generatedCaption}
          onChange={(e) => setGeneratedCaption(e.target.value)}
          className="w-full p-3 rounded-xl bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none focus:ring-1 focus:ring-gold-500 leading-relaxed"
        />
      </div>

      <div className="flex justify-between items-center pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigator.clipboard.writeText(generatedCaption)}
          className="flex items-center gap-1"
        >
          <Copy size={14} /> Copy Caption
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleGenerateCopy}
          className="flex items-center gap-1.5"
        >
          <Sparkles size={14} /> Generate Fresh Variation
        </Button>
      </div>
    </Card>
  );
};
