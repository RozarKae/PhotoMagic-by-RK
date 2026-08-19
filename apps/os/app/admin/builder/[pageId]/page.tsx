'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  BuilderDevice,
  BuilderTheme,
  BuilderMode,
  BuilderElement,
  BuilderSection,
  BuilderPage,
  BuilderVersionSnapshot,
} from '@photomagic/types';
import {
  Laptop,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  Eye,
  Save,
  Send,
  Plus,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Palette,
  Moon,
  Sun,
  Layout,
  Type,
  Image as ImageIcon,
  Film,
  Layers,
  Sliders,
  Move,
  CheckCircle2,
  X,
  History,
  Grid,
  Check,
  ArrowLeft,
  Settings,
  ShieldCheck,
  Maximize2,
} from 'lucide-react';

import {
  getPageById,
  saveDraftPage,
  publishPage,
  getSnapshotsByPageId,
  rollbackToSnapshot as cmsRollback,
  INITIAL_WEBSITE_PAGES,
} from '@photomagic/config';
import { StudioPageRenderer } from '@photomagic/ui';

export default function VisualWebsiteBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const pageId = (params?.pageId as string) || 'home';

  // Device & Theme State
  const [device, setDevice] = useState<BuilderDevice>('desktop');
  const [theme, setTheme] = useState<BuilderTheme>('lavender');
  const [mode, setMode] = useState<BuilderMode>('light');
  const [leftTab, setLeftTab] = useState<'elements' | 'sections' | 'layers'>('elements');
  const [rightTab, setRightTab] = useState<'content' | 'style' | 'animation' | 'responsive'>(
    'content',
  );

  // Active Selection State
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [showMediaModal, setShowMediaModal] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial Page State loaded from canonical registry / CMS store
  const [pageData, setPageData] = useState<BuilderPage>(() => {
    const loaded = getPageById(pageId);
    if (loaded) return loaded as BuilderPage;
    const initial = INITIAL_WEBSITE_PAGES.find((p) => p.id === pageId);
    if (initial) return initial as BuilderPage;

    return {
      id: pageId,
      title: `${pageId.toUpperCase()} Page`,
      slug: `/${pageId}`,
      status: 'draft',
      theme: 'lavender',
      mode: 'light',
      sections: [],
      updatedAt: new Date().toISOString(),
    };
  });

  // Keep pageData synchronized when pageId changes
  useEffect(() => {
    const loaded = getPageById(pageId);
    if (loaded) {
      setPageData(loaded as BuilderPage);
    }
  }, [pageId]);

  // Undo / Redo History Stack
  const [history, setHistory] = useState<BuilderPage[]>([pageData]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Snapshots for Rollback
  const [snapshots, setSnapshots] = useState<BuilderVersionSnapshot[]>([
    {
      id: 'snap-1',
      pageId,
      timestamp: new Date().toISOString(),
      author: 'Rozar Khan (Lead Artist)',
      summary: 'Initial Master Showcase Publication',
      data: pageData,
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const updatePage = (newPage: BuilderPage) => {
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(newPage);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setPageData(newPage);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setPageData(history[historyIndex - 1]);
      showToast('Undo performed');
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setPageData(history[historyIndex + 1]);
      showToast('Redo performed');
    }
  };

  // Find currently selected element and section
  const currentSection = pageData.sections.find((s) => s.id === selectedSectionId);
  const currentElement = currentSection?.elements.find((e) => e.id === selectedElementId);

  // Element Actions
  const handleAddElement = (type: string) => {
    if (!selectedSectionId && pageData.sections.length > 0) {
      setSelectedSectionId(pageData.sections[0].id);
    }
    const targetSecId = selectedSectionId || pageData.sections[0]?.id;
    if (!targetSecId) return;

    const newElement: BuilderElement = {
      id: `el-${Date.now()}`,
      type: type as any,
      content: {
        text:
          type === 'heading'
            ? 'New Heading'
            : type === 'button'
              ? 'Click Here'
              : 'New text paragraph...',
        url: '#',
      },
      style: {
        fontSize: type === 'heading' ? '28px' : '14px',
        fontWeight: type === 'heading' ? '700' : '400',
        textColor: '#1E0A3C',
      },
    };

    const updatedSections = pageData.sections.map((sec) => {
      if (sec.id === targetSecId) {
        return { ...sec, elements: [...sec.elements, newElement] };
      }
      return sec;
    });

    updatePage({ ...pageData, sections: updatedSections });
    setSelectedElementId(newElement.id);
    showToast(`Added ${type} element`);
  };

  // Add Section Preset
  const handleAddSection = (presetType: string) => {
    const newSecId = `sec-${Date.now()}`;
    const newSection: BuilderSection = {
      id: newSecId,
      name: `${presetType.toUpperCase()} Section`,
      type: presetType as any,
      background: '#FAF5FF',
      textColor: '#1E0A3C',
      paddingTop: '64px',
      paddingBottom: '64px',
      elements: [
        {
          id: `el-${Date.now()}-1`,
          type: 'heading',
          content: { text: `Curated ${presetType} Chapter`, level: 2 },
          style: { fontSize: '32px', fontWeight: '800' },
        },
        {
          id: `el-${Date.now()}-2`,
          type: 'text',
          content: { text: 'Seamless storytelling rendered in high fidelity pastel aesthetics.' },
          style: { fontSize: '14px' },
        },
      ],
    };

    updatePage({ ...pageData, sections: [...pageData.sections, newSection] });
    setSelectedSectionId(newSecId);
    showToast(`Added ${presetType} section block`);
  };

  // Section Manipulation
  const moveSection = (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= pageData.sections.length) return;

    const reordered = [...pageData.sections];
    const [moved] = reordered.splice(idx, 1);
    reordered.splice(targetIdx, 0, moved);

    updatePage({ ...pageData, sections: reordered });
  };

  const duplicateSection = (sec: BuilderSection) => {
    const dup: BuilderSection = {
      ...sec,
      id: `sec-${Date.now()}`,
      name: `${sec.name} (Copy)`,
      elements: sec.elements.map((el) => ({ ...el, id: `el-${Date.now()}-${Math.random()}` })),
    };
    const idx = pageData.sections.findIndex((s) => s.id === sec.id);
    const updated = [...pageData.sections];
    updated.splice(idx + 1, 0, dup);
    updatePage({ ...pageData, sections: updated });
    showToast('Section duplicated');
  };

  const deleteSection = (secId: string) => {
    if (pageData.sections.length <= 1) {
      alert('Cannot delete the only section on the page.');
      return;
    }
    const updated = pageData.sections.filter((s) => s.id !== secId);
    updatePage({ ...pageData, sections: updated });
    setSelectedSectionId(null);
    setSelectedElementId(null);
    showToast('Section removed');
  };

  // Update Element Content
  const updateCurrentElementContent = (field: string, val: any) => {
    if (!selectedSectionId || !selectedElementId) return;

    const updatedSections = pageData.sections.map((sec) => {
      if (sec.id === selectedSectionId) {
        return {
          ...sec,
          elements: sec.elements.map((el) => {
            if (el.id === selectedElementId) {
              return { ...el, content: { ...el.content, [field]: val } };
            }
            return el;
          }),
        };
      }
      return sec;
    });

    updatePage({ ...pageData, sections: updatedSections });
  };

  // Update Element Style
  const updateCurrentElementStyle = (field: string, val: any) => {
    if (!selectedSectionId || !selectedElementId) return;

    const updatedSections = pageData.sections.map((sec) => {
      if (sec.id === selectedSectionId) {
        return {
          ...sec,
          elements: sec.elements.map((el) => {
            if (el.id === selectedElementId) {
              return { ...el, style: { ...el.style, [field]: val } };
            }
            return el;
          }),
        };
      }
      return sec;
    });

    updatePage({ ...pageData, sections: updatedSections });
  };

  // Save Draft Workflow
  const handleSaveDraft = () => {
    const saved = saveDraftPage(pageData as any);
    setPageData(saved as BuilderPage);
    showToast('Draft Saved to Persistent Store');
  };

  // Publish Workflow
  const handlePublish = async () => {
    setIsPublishing(true);
    await new Promise((res) => setTimeout(res, 400));

    try {
      const res = publishPage(pageId, 'Studio Lead Artist');
      setPageData(res.page as BuilderPage);
      setSnapshots(getSnapshotsByPageId(pageId));
      setIsPublishing(false);
      showToast('Page Published to Live Studio Website!');
    } catch {
      setIsPublishing(false);
      showToast('Page revision saved');
    }
  };

  // Media Library Selection
  const galleryAssets = [
    { src: '/images/hero_wedding_couple.png', title: 'Royal Couple Portrait' },
    { src: '/images/hindu_wedding_ceremony.png', title: 'Mandap Vows & Silks' },
    { src: '/images/prewedding_backwaters.png', title: 'Alleppey Backwaters' },
    { src: '/images/fashion_editorial.png', title: 'Fashion Couture Silhouette' },
    { src: '/images/babybliss_portrait.jpg', title: 'Project BabyBliss' },
    { src: '/images/grand_event_celebration.png', title: 'Grand Coastal Sangeet' },
    { src: '/images/drone_aerial_wedding.png', title: '4K Aerial Drone' },
    { src: '/images/product_minimal.png', title: 'Jewelry Macro Detail' },
  ];

  return (
    <div className="h-screen w-screen bg-[#0A0312] text-[#F3E8FF] flex flex-col overflow-hidden select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-xl bg-purple-600 text-white font-mono text-xs shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          {toastMessage}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP BUILDER TOOLBAR                                                   */}
      {/* ========================================================================= */}
      <header className="h-14 bg-[#140822] border-b border-purple-900/50 px-6 flex items-center justify-between flex-shrink-0 z-30">
        {/* Left: Back to Dashboard & Page Title */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin/builder"
            className="p-2 rounded-lg bg-purple-950/60 hover:bg-purple-900 text-purple-300 transition-colors"
            title="Back to Pages Dashboard"
          >
            <ArrowLeft size={16} />
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-hero font-bold text-white text-sm">{pageData.title}</span>
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
              {pageData.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Center: Responsive Device Switcher & History */}
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-[#0C0416] p-1 rounded-xl border border-purple-900/40">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-2 rounded-lg transition-colors ${
                device === 'desktop'
                  ? 'bg-purple-800 text-white shadow-sm'
                  : 'text-purple-400 hover:text-white'
              }`}
              title="Desktop (100%)"
            >
              <Laptop size={15} />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-2 rounded-lg transition-colors ${
                device === 'tablet'
                  ? 'bg-purple-800 text-white shadow-sm'
                  : 'text-purple-400 hover:text-white'
              }`}
              title="Tablet (768px)"
            >
              <Tablet size={15} />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-2 rounded-lg transition-colors ${
                device === 'mobile'
                  ? 'bg-purple-800 text-white shadow-sm'
                  : 'text-purple-400 hover:text-white'
              }`}
              title="Mobile (375px)"
            >
              <Smartphone size={15} />
            </button>
          </div>

          <div className="flex items-center gap-1 bg-[#0C0416] p-1 rounded-xl border border-purple-900/40">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-2 rounded-lg bg-purple-950/60 hover:bg-purple-900 disabled:opacity-30 text-purple-200"
              title="Undo"
            >
              <Undo2 size={15} />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 rounded-lg bg-purple-950/60 hover:bg-purple-900 disabled:opacity-30 text-purple-200"
              title="Redo"
            >
              <Redo2 size={15} />
            </button>
          </div>
        </div>

        {/* Right: Actions (Theme, Snapshots, Save Draft, Preview, Publish) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHistoryModal(true)}
            className="p-2 rounded-lg bg-purple-950/60 hover:bg-purple-900 text-purple-200 text-xs font-mono flex items-center gap-1.5"
            title="Version History & Rollback"
          >
            <History size={14} />
            <span className="hidden sm:inline">Snapshots</span>
          </button>

          <button
            onClick={handleSaveDraft}
            className="px-3 py-1.5 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-700 text-xs font-mono font-semibold flex items-center gap-1.5"
            title="Save Draft to Persistent Storage"
          >
            <Save size={13} />
            <span>Save Draft</span>
          </button>

          <a
            href={`http://localhost:3000${pageData.slug === '/' ? '' : pageData.slug}`}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 text-purple-200 border border-purple-800 text-xs font-mono font-semibold flex items-center gap-1.5"
          >
            <Eye size={14} />
            <span>Preview</span>
          </a>

          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 hover:opacity-95 text-white text-xs font-bold font-nav uppercase tracking-wider flex items-center gap-1.5 shadow-md"
          >
            <Send size={13} />
            <span>{isPublishing ? 'Publishing...' : 'Publish'}</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. THREE-PANEL WORKSPACE                                                 */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* ======================================================================= */}
        {/* LEFT PANEL: Elements / Presets / Page Tree                             */}
        {/* ======================================================================= */}
        <aside className="w-72 bg-[#140822] border-r border-purple-900/50 flex flex-col flex-shrink-0 z-20">
          {/* Left Tabs */}
          <div className="flex border-b border-purple-900/50">
            {[
              { id: 'elements', label: 'Elements', icon: Type },
              { id: 'sections', label: 'Blocks', icon: Layout },
              { id: 'layers', label: 'Outline', icon: Layers },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setLeftTab(tab.id as any)}
                className={`flex-1 py-3 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  leftTab === tab.id
                    ? 'text-white border-b-2 border-rose-500 bg-purple-950/40'
                    : 'text-purple-400 hover:text-purple-200'
                }`}
              >
                <tab.icon size={13} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {/* TAB: Elements Palette */}
            {leftTab === 'elements' && (
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-purple-400 font-bold">
                  Click to Add to Canvas
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: 'heading', label: 'Heading', icon: Type },
                    { type: 'text', label: 'Paragraph', icon: Type },
                    { type: 'tamil-text', label: 'Tamil Font', icon: Sparkles },
                    { type: 'button', label: 'Button CTA', icon: CheckCircle2 },
                    { type: 'image', label: 'Image Frame', icon: ImageIcon },
                    { type: 'video', label: 'Cinema Video', icon: Film },
                    { type: 'badge', label: 'Gold Hallmark', icon: Sparkles },
                    { type: 'spacer', label: 'Spacer Gap', icon: Move },
                  ].map((el) => (
                    <button
                      key={el.type}
                      onClick={() => handleAddElement(el.type)}
                      className="p-3 rounded-2xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/40 hover:border-rose-400 transition-all flex flex-col items-center gap-1.5 text-center group"
                    >
                      <el.icon size={16} className="text-purple-300 group-hover:text-rose-400" />
                      <span className="text-xs font-mono text-purple-200">{el.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Section Blocks */}
            {leftTab === 'sections' && (
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-purple-400 font-bold">
                  Pre-Designed Section Presets
                </span>

                {[
                  { type: 'hero', label: 'Rotating Cinematic Hero' },
                  { type: 'philosophy', label: 'Brand Storytelling & Philosophy' },
                  { type: 'categories', label: '10 Category Photography Realms' },
                  { type: 'stories-preview', label: 'Selected Visual Stories' },
                  { type: 'packages-preview', label: '5 Stone & Metal Collections' },
                  { type: 'custom-package-cta', label: 'Choose On Your Own Banner' },
                  { type: 'testimonials', label: 'Multilingual Client Reflections' },
                  { type: 'credibility', label: 'Credibility Stats (3+ Yrs, 50+ Events)' },
                  { type: 'final-cta', label: 'Date Reservation Anchor' },
                  { type: 'about-journey', label: '5 Foundations Visual Journey' },
                  { type: 'portfolio-grid', label: '10-Category Asymmetric Masonry' },
                  { type: 'services-list', label: 'Signature Capabilities Directory' },
                  { type: 'stories-list', label: 'Visual Magazine Story Feed' },
                  { type: 'custom-package-builder', label: 'Custom Rate Estimator' },
                  { type: 'booking-wizard', label: '7-Step Check Date Wizard' },
                  { type: 'contact-concierge', label: 'Concierge Desk & Form' },
                ].map((preset) => (
                  <button
                    key={preset.type}
                    onClick={() => handleAddSection(preset.type)}
                    className="p-3 rounded-2xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/40 hover:border-purple-600 transition-all flex items-center justify-between text-left group"
                  >
                    <div>
                      <span className="text-xs font-bold text-white group-hover:text-rose-400 transition-colors block">
                        {preset.label}
                      </span>
                      <span className="text-[10px] font-mono text-purple-400">Section Preset</span>
                    </div>
                    <Plus size={14} className="text-purple-400 group-hover:text-rose-400" />
                  </button>
                ))}
              </div>
            )}

            {/* TAB: Layers Outline Tree */}
            {leftTab === 'layers' && (
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-purple-400 font-bold mb-1">
                  Page Outline ({pageData.sections.length} Sections)
                </span>

                {pageData.sections.map((sec, idx) => (
                  <div
                    key={sec.id}
                    onClick={() => setSelectedSectionId(sec.id)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      selectedSectionId === sec.id
                        ? 'bg-purple-800/60 border-rose-500 text-white'
                        : 'bg-purple-950/30 border-purple-800/30 text-purple-300 hover:bg-purple-900/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Layout size={13} className="text-rose-400 flex-shrink-0" />
                      <span className="text-xs font-mono truncate">
                        {sec.name || `Section ${idx + 1}`}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-purple-400">
                      {sec.elements.length} els
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* ======================================================================= */}
        {/* CENTER PANEL: Live Interactive WYSIWYG Canvas                           */}
        {/* ======================================================================= */}
        <main className="flex-1 bg-[#07020E] p-6 overflow-y-auto flex justify-center items-start">
          <div
            className={`transition-all duration-300 rounded-3xl shadow-2xl overflow-hidden bg-white text-[#1E0A3C] min-h-[85vh] ${
              device === 'desktop'
                ? 'w-full max-w-6xl'
                : device === 'tablet'
                  ? 'w-[768px]'
                  : 'w-[375px]'
            }`}
          >
            {/* Unified High-Fidelity Studio Page Renderer in Builder Mode */}
            <StudioPageRenderer
              page={pageData}
              mode="builder"
              selectedSectionId={selectedSectionId}
              selectedElementId={selectedElementId}
              onSelectSection={setSelectedSectionId}
              onSelectElement={(secId, elId) => {
                setSelectedSectionId(secId);
                setSelectedElementId(elId);
              }}
              onMoveSection={moveSection}
              onDuplicateSection={duplicateSection}
              onDeleteSection={deleteSection}
            />
          </div>
        </main>

        {/* ======================================================================= */}
        {/* RIGHT PANEL: Inspector & Property Editor                                */}
        {/* ======================================================================= */}
        <aside className="w-80 bg-[#140822] border-l border-purple-900/50 flex flex-col flex-shrink-0 z-20">
          {/* Right Tabs */}
          <div className="flex border-b border-purple-900/50">
            {[
              { id: 'content', label: 'Content' },
              { id: 'style', label: 'Style' },
              { id: 'animation', label: 'Effects' },
              { id: 'responsive', label: 'Devices' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setRightTab(tab.id as any)}
                className={`flex-1 py-3 text-xs font-mono font-bold transition-colors ${
                  rightTab === tab.id
                    ? 'text-white border-b-2 border-rose-500 bg-purple-950/40'
                    : 'text-purple-400 hover:text-purple-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
            {currentElement ? (
              <>
                <div className="border-b border-purple-900/50 pb-3 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-rose-400 font-bold">
                    Editing {currentElement.type.toUpperCase()}
                  </span>
                  <span className="font-mono text-[10px] text-purple-400">{currentElement.id}</span>
                </div>

                {/* Content Tab */}
                {rightTab === 'content' && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-purple-300 block mb-1">
                        Text Content
                      </label>
                      <textarea
                        rows={4}
                        value={currentElement.content?.text || ''}
                        onChange={(e) => updateCurrentElementContent('text', e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800 text-white"
                      />
                    </div>

                    {currentElement.type === 'button' && (
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-purple-300 block mb-1">
                          Destination Link URL
                        </label>
                        <input
                          type="text"
                          value={currentElement.content?.url || ''}
                          onChange={(e) => updateCurrentElementContent('url', e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800 text-white font-mono"
                        />
                      </div>
                    )}

                    {currentElement.type === 'image' && (
                      <button
                        onClick={() => setShowMediaModal(true)}
                        className="w-full py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-xs font-mono font-bold flex items-center justify-center gap-2 border border-purple-700"
                      >
                        <ImageIcon size={14} />
                        <span>Select From Studio Gallery</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Style Tab */}
                {rightTab === 'style' && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-purple-300 block mb-1">
                        Font Size
                      </label>
                      <input
                        type="text"
                        value={currentElement.style?.fontSize || '16px'}
                        onChange={(e) => updateCurrentElementStyle('fontSize', e.target.value)}
                        placeholder="e.g. 36px, 1.5rem"
                        className="w-full text-xs px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-purple-300 block mb-1">
                        Text Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={currentElement.style?.textColor || '#1E0A3C'}
                          onChange={(e) => updateCurrentElementStyle('textColor', e.target.value)}
                          className="w-8 h-8 rounded-lg bg-transparent cursor-pointer"
                        />
                        <input
                          type="text"
                          value={currentElement.style?.textColor || '#1E0A3C'}
                          onChange={(e) => updateCurrentElementStyle('textColor', e.target.value)}
                          className="flex-1 text-xs px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-800 text-white font-mono"
                        />
                      </div>
                    </div>

                    {currentElement.type === 'button' && (
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-purple-300 block mb-1">
                          Button Background
                        </label>
                        <input
                          type="color"
                          value={currentElement.style?.backgroundColor || '#E11D48'}
                          onChange={(e) =>
                            updateCurrentElementStyle('backgroundColor', e.target.value)
                          }
                          className="w-8 h-8 rounded-lg bg-transparent cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Effects / Animation Tab */}
                {rightTab === 'animation' && (
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-purple-300 block">
                      Entrance Animation
                    </span>
                    {['Fade In Up', 'Zoom Soft', 'Slide Horizontal', 'None'].map((anim) => (
                      <button
                        key={anim}
                        className="p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900 border border-purple-800 text-left text-xs font-mono text-purple-200"
                      >
                        {anim}
                      </button>
                    ))}
                  </div>
                )}

                {/* Responsive Overrides Tab */}
                {rightTab === 'responsive' && (
                  <div className="flex flex-col gap-3 text-xs">
                    <label className="flex items-center justify-between p-3 rounded-xl bg-purple-950/40 border border-purple-800">
                      <span>Hide on Mobile Devices</span>
                      <input type="checkbox" className="rounded" />
                    </label>
                    <label className="flex items-center justify-between p-3 rounded-xl bg-purple-950/40 border border-purple-800">
                      <span>Hide on Desktop</span>
                      <input type="checkbox" className="rounded" />
                    </label>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 flex flex-col items-center gap-3 text-purple-400/60">
                <Sliders size={28} />
                <p className="text-xs font-mono">
                  Select any element on the canvas to inspect & customize.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* ========================================================================= */}
      {/* 3. MEDIA GALLERY PICKER MODAL                                            */}
      {/* ========================================================================= */}
      {showMediaModal && (
        <div className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-[#140822] border border-purple-800 p-6 rounded-3xl max-w-3xl w-full flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-purple-900/50 pb-3">
              <span className="font-hero text-base font-bold text-white">Studio Photo Vault</span>
              <button
                onClick={() => setShowMediaModal(false)}
                className="text-purple-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
              {galleryAssets.map((asset, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    updateCurrentElementContent('mediaUrl', asset.src);
                    setShowMediaModal(false);
                    showToast('Updated image media asset');
                  }}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-purple-800 hover:border-rose-400"
                >
                  <img src={asset.src} alt={asset.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-mono font-bold text-white p-2 text-center">
                    Select This
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SNAPSHOTS ROLLBACK MODAL                                              */}
      {/* ========================================================================= */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-[#140822] border border-purple-800 p-6 rounded-3xl max-w-lg w-full flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-purple-900/50 pb-3">
              <span className="font-hero text-base font-bold text-white">Version Snapshots</span>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-purple-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
              {snapshots.map((snap) => {
                const targetData = snap.data || snap.pageData;
                const timeStr = snap.timestamp
                  ? new Date(snap.timestamp).toLocaleTimeString()
                  : snap.createdAt
                    ? new Date(snap.createdAt).toLocaleTimeString()
                    : 'recently';

                return (
                  <div
                    key={snap.id}
                    className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/50 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {snap.summary || snap.label || 'Saved Snapshot'}
                      </span>
                      <span className="text-[10px] font-mono text-purple-400">
                        {snap.author || 'Studio Lead'} • {timeStr}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        if (targetData) {
                          updatePage(targetData);
                          setShowHistoryModal(false);
                          showToast('Rolled back to snapshot');
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-purple-800 hover:bg-purple-700 text-white font-mono text-[11px] font-bold"
                    >
                      Rollback
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
