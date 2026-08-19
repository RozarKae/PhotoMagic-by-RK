'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  Plus,
  Edit3,
  Eye,
  Copy,
  Trash2,
  Sparkles,
  Palette,
  Layout,
  CheckCircle2,
  Clock,
  Layers,
  ArrowUpRight,
  ExternalLink,
  Laptop,
  Smartphone,
  Tablet,
  History,
  Check,
} from 'lucide-react';
import { getAllPages, saveDraftPage } from '@photomagic/config';
import { formatRelativeTime } from '@photomagic/shared';

interface BuilderPageSummary {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  theme: string;
  sectionsCount: number;
  lastEdited: string;
  isSystem: boolean;
  thumbnail: string;
}

export default function VisualBuilderDashboardPage() {
  const [pages, setPages] = useState<BuilderPageSummary[]>(() => {
    const canonical = getAllPages();
    const thumbs: Record<string, string> = {
      home: '/images/hero_wedding_couple.png',
      about: '/images/hindu_wedding_ceremony.png',
      portfolio: '/images/fashion_editorial.png',
      services: '/images/corporate_conference_summit.png',
      stories: '/images/prewedding_backwaters.png',
      packages: '/images/product_minimal.png',
      book: '/images/grand_event_celebration.png',
      contact: '/images/maternity_portrait.png',
    };

    return canonical.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      status: p.status,
      theme: p.theme
        ? `${p.theme.charAt(0).toUpperCase() + p.theme.slice(1)} Pastel`
        : 'Lavender Pastel',
      sectionsCount: p.sections.length,
      lastEdited: formatRelativeTime(p.updatedAt),
      isSystem: true,
      thumbnail: thumbs[p.id] || '/images/hero_wedding_couple.png',
    }));
  });

  const [activeGlobalTheme, setActiveGlobalTheme] = useState('lavender');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [newPageTemplate, setNewPageTemplate] = useState('royal-wedding');

  const templates = [
    {
      id: 'royal-wedding',
      name: 'Royal Heritage Wedding',
      description: 'Grand mandap visuals, silk layouts, gold accents, and multi-day itinerary.',
      image: '/images/hindu_wedding_ceremony.png',
    },
    {
      id: 'atelier-fashion',
      name: 'Atelier Couture Lookbook',
      description:
        'High-contrast silhouettes, monochrome framing, and minimal text magazine spreads.',
      image: '/images/fashion_editorial.png',
    },
    {
      id: 'misty-prewedding',
      name: 'Misty Backwaters Pre-Wedding',
      description:
        'Full-bleed landscape storytelling, dawn lighting, and romantic poetry captions.',
      image: '/images/prewedding_backwaters.png',
    },
    {
      id: 'babybliss-innocence',
      name: 'Project BabyBliss Innocence',
      description: 'Soft pastel warmth, milestone timelines, and heirloom album highlights.',
      image: '/images/babybliss_portrait.jpg',
    },
  ];

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageTitle) return;

    const formattedSlug = newPageSlug.startsWith('/') ? newPageSlug : `/${newPageSlug}`;
    const id = newPageSlug.replace(/[^a-z0-9]/gi, '-').toLowerCase() || `page-${Date.now()}`;

    const newPage: BuilderPageSummary = {
      id,
      title: newPageTitle,
      slug: formattedSlug,
      status: 'draft',
      theme: 'Lavender Pastel',
      sectionsCount: 4,
      lastEdited: 'Just now',
      isSystem: false,
      thumbnail: '/images/hero_wedding_couple.png',
    };

    setPages((prev) => [...prev, newPage]);
    setShowCreateModal(false);
    setNewPageTitle('');
    setNewPageSlug('');
  };

  return (
    <div className="min-h-screen bg-[#0E0716] text-[#F3E8FF] p-8 sm:p-12 flex flex-col gap-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-purple-900/40 pb-8">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-widest font-bold mb-1">
            <Globe size={14} />
            <span>PhotoMagic Studios by RK CMS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-hero text-white tracking-tight">
            Visual Website & Page Builder
          </h1>
          <p className="text-xs sm:text-sm text-purple-300/80 mt-1 max-w-xl">
            Live 3-panel visual editor, section block presets, typography engine, pastel palette
            switcher, and responsive device controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 border border-purple-800/60 text-xs font-mono font-semibold flex items-center gap-2 transition-colors"
          >
            <Eye size={14} />
            <span>View Public Site</span>
            <ExternalLink size={12} className="opacity-60" />
          </a>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-rose-500 to-purple-600 hover:opacity-95 text-white text-xs font-bold font-nav uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all"
          >
            <Plus size={15} />
            <span>Create New Page</span>
          </button>
        </div>
      </div>

      {/* Global Theme & Brand Tokens Toolbar */}
      <div className="p-6 rounded-2xl bg-[#170C22] border border-purple-800/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-900/50 border border-purple-700/50 flex items-center justify-center text-rose-400">
            <Palette size={20} />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Active Studio Palette</span>
            <span className="text-[11px] font-mono text-purple-300/70">
              Coordinated fashion pastels across all public pages
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'lavender', label: 'Lavender Pastel', color: '#A855F7' },
            { id: 'soft-pink', label: 'Soft Pink', color: '#FB7185' },
            { id: 'blush', label: 'Blush Ivory', color: '#F43F5E' },
            { id: 'rose', label: 'Rose Quartz', color: '#E11D48' },
            { id: 'mauve', label: 'Mauve Slate', color: '#7E22CE' },
            { id: 'maroon', label: 'Royal Maroon', color: '#881337' },
          ].map((theme) => (
            <button
              key={theme.id}
              onClick={() => setActiveGlobalTheme(theme.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-all ${
                activeGlobalTheme === theme.id
                  ? 'bg-purple-900 text-white border border-rose-400 ring-2 ring-rose-400/20'
                  : 'bg-purple-950/40 text-purple-300/80 border border-purple-800/40 hover:bg-purple-900/40'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.color }} />
              <span>{theme.label}</span>
              {activeGlobalTheme === theme.id && <Check size={12} className="text-rose-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Pages Grid */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-purple-400 font-bold">
            Studio Page Library ({pages.length})
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pages.map((p) => (
            <div
              key={p.id}
              className="rounded-3xl overflow-hidden bg-[#170C22] border border-purple-800/40 shadow-md hover:border-purple-600 transition-all flex flex-col justify-between group"
            >
              {/* Thumbnail Preview */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-purple-950">
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-emerald-400 font-bold border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{p.status.toUpperCase()}</span>
                </div>

                <div className="absolute top-3 right-3 font-mono text-[9px] text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  {p.sectionsCount} Sections
                </div>
              </div>

              {/* Page Metadata */}
              <div className="p-5 flex flex-col gap-3">
                <div>
                  <h3 className="font-hero text-sm font-bold text-white group-hover:text-rose-400 transition-colors">
                    {p.title}
                  </h3>
                  <span className="font-mono text-xs text-purple-400 block mt-0.5">{p.slug}</span>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-purple-400/70 pt-2 border-t border-purple-900/40">
                  <span>Edited {p.lastEdited}</span>
                  <span>{p.theme}</span>
                </div>

                {/* Visual Builder Trigger */}
                <div className="pt-2 flex items-center gap-2">
                  <Link href={`/admin/builder/${p.id}`} className="flex-1">
                    <button className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-nav text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                      <Edit3 size={13} />
                      <span>Edit In Builder</span>
                    </button>
                  </Link>

                  <a
                    href={`http://localhost:3000${p.slug === '/' ? '' : p.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 text-purple-300 transition-colors border border-purple-800/40"
                    title="Live Preview"
                  >
                    <Eye size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-Built Photography Templates Section */}
      <div className="mt-8 flex flex-col gap-6 border-t border-purple-900/40 pt-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-rose-400 font-bold">
            Pre-Built Full Page Templates
          </span>
          <h2 className="text-2xl font-bold font-hero text-white mt-1">
            One-Click Editorial Architecture
          </h2>
          <p className="text-xs text-purple-300/80 mt-1">
            Instantly deploy full photography storytelling layouts crafted for luxury events and
            portfolios.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="p-4 rounded-3xl bg-[#170C22] border border-purple-800/40 shadow-sm flex flex-col justify-between group"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-3 bg-purple-950">
                <img
                  src={tpl.image}
                  alt={tpl.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div>
                <h3 className="font-hero text-sm font-bold text-white group-hover:text-rose-400 transition-colors">
                  {tpl.name}
                </h3>
                <p className="text-[11px] text-purple-300/70 leading-relaxed mt-1 mb-4">
                  {tpl.description}
                </p>
              </div>

              <button
                onClick={() => {
                  setNewPageTitle(`${tpl.name} Landing`);
                  setNewPageSlug(`/${tpl.id}`);
                  setShowCreateModal(true);
                }}
                className="w-full py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 text-purple-200 border border-purple-800/60 font-mono text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles size={12} className="text-gold-400" />
                <span>Use This Template</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Create New Page Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-[#170C22] border border-purple-800/60 p-8 rounded-3xl max-w-lg w-full shadow-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-purple-900/40 pb-4">
              <div className="flex items-center gap-2">
                <Layout size={18} className="text-rose-400" />
                <h3 className="font-hero text-lg font-bold text-white">Create New Studio Page</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-purple-400 hover:text-white text-xs font-mono"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleCreatePage} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-purple-300 block mb-1">
                  Page Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Chettinad Wedding Gallery"
                  value={newPageTitle}
                  onChange={(e) => {
                    setNewPageTitle(e.target.value);
                    if (!newPageSlug) {
                      setNewPageSlug(`/${e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
                    }
                  }}
                  className="w-full text-xs px-4 py-3 rounded-xl bg-purple-950/50 border border-purple-800 text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-purple-300 block mb-1">
                  Route Slug URL *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /chettinad-wedding"
                  value={newPageSlug}
                  onChange={(e) => setNewPageSlug(e.target.value)}
                  className="w-full text-xs px-4 py-3 rounded-xl bg-purple-950/50 border border-purple-800 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-purple-300 block mb-1">
                  Base Photography Template
                </label>
                <select
                  value={newPageTemplate}
                  onChange={(e) => setNewPageTemplate(e.target.value)}
                  className="w-full text-xs px-4 py-3 rounded-xl bg-purple-950/50 border border-purple-800 text-white"
                >
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                  <option value="blank">Blank Canvas (Empty Page)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-purple-900/40">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-purple-950/50 text-purple-300 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 text-white font-nav text-xs font-bold uppercase tracking-wider"
                >
                  Create & Launch Editor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
