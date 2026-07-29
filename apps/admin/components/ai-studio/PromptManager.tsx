'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import { Sparkles, Heart, Copy, Trash2, Search, Plus, Tag, BookOpen } from 'lucide-react';

export interface PromptTemplateItem {
  id: string;
  title: string;
  promptText: string;
  category: 'portrait' | 'wedding' | 'cinematic' | 'retouch';
  tags: string[];
  isFavorite: boolean;
  version: number;
}

export const PromptManager: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [prompts, setPrompts] = useState<PromptTemplateItem[]>([
    {
      id: 'p-101',
      title: 'Royal Palace Golden Hour Lighting',
      promptText: 'Ultra-cinematic 8k resolution, royal palace architectural background, golden hour soft bokeh lighting, fine art studio portraiture...',
      category: 'wedding',
      tags: ['Royal', 'Golden Hour', 'Cinematic'],
      isFavorite: true,
      version: 2,
    },
    {
      id: 'p-102',
      title: 'Haute Couture Vogue Portrait',
      promptText: 'Editorial fashion portraiture, sharp focal planes, Leica 50mm f/0.95 lens aesthetics, high contrast monochrome velvet tones...',
      category: 'portrait',
      tags: ['Vogue', 'Haute Couture', 'Monochrome'],
      isFavorite: false,
      version: 1,
    },
  ]);

  const handleToggleFavorite = (id: string) => {
    setPrompts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const handleDuplicate = (id: string) => {
    const target = prompts.find((p) => p.id === id);
    if (!target) return;
    const duplicated: PromptTemplateItem = {
      ...target,
      id: 'p-' + Date.now(),
      title: `${target.title} (Copy)`,
      version: 1,
    };
    setPrompts((prev) => [...prev, duplicated]);
  };

  const handleDelete = (id: string) => {
    setPrompts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredPrompts = prompts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.promptText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-subtle pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-gold-500" />
            <h3 className="text-lg font-bold text-text-primary">Prompt Template Library & Versioning</h3>
          </div>
          <span className="text-xs text-text-tertiary">Save reusable prompts, assign tags, track version history, and manage favorites.</span>
        </div>

        <Button variant="primary" size="sm" className="flex items-center gap-1.5">
          <Plus size={14} /> Save New Prompt
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
        <input
          type="text"
          placeholder="Search prompt templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-base text-xs text-text-primary placeholder:text-text-tertiary border border-border-subtle focus:outline-none focus:ring-1 focus:ring-gold-500"
        />
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPrompts.map((prompt) => (
          <div key={prompt.id} className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between gap-3 text-xs">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-text-primary text-sm">{prompt.title}</span>
                <span className="text-[10px] text-gold-500 font-mono font-semibold">v{prompt.version} • {prompt.category}</span>
              </div>

              <button
                onClick={() => handleToggleFavorite(prompt.id)}
                className={`p-1.5 rounded-full transition-colors ${
                  prompt.isFavorite ? 'text-gold-500' : 'text-text-tertiary hover:text-text-primary'
                }`}
              >
                <Heart size={16} fill={prompt.isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>

            <p className="text-text-secondary bg-surface-elevated p-3 rounded-lg border border-border-subtle font-mono text-[11px] leading-relaxed">
              {prompt.promptText}
            </p>

            <div className="flex justify-between items-center pt-2 border-t border-border-subtle">
              <div className="flex flex-wrap gap-1">
                {prompt.tags.map((tag, idx) => (
                  <Badge key={idx} variant="gold" className="text-[9px]">{tag}</Badge>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleDuplicate(prompt.id)}>
                  <Copy size={14} />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(prompt.id)} className="text-status-error">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
