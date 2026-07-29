'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { CameraSimulationControls } from '../../components/ai-generator/CameraSimulationControls';
import { ProviderSelector } from '../../components/ai-generator/ProviderSelector';
import { PromptBuilderDrawer } from '../../components/ai-generator/PromptBuilderDrawer';
import { BatchGeneratorBar } from '../../components/ai-generator/BatchGeneratorBar';
import { GenerationResultGallery, GeneratedPhotoResult } from '../../components/ai-generator/GenerationResultGallery';
import { Sparkles, Sliders, Dices, Layers, Camera, BookOpen } from 'lucide-react';

export default function AIGeneratorWorkspacePage() {
  const [prompt, setPrompt] = useState(
    'Ultra-cinematic 8k resolution, royal Indian wedding bride in raw silk golden lehenga, Udaipur city palace sunset, soft bokeh, Leica 50mm f/1.4 optics...'
  );
  const [negativePrompt, setNegativePrompt] = useState(
    'blurry, low resolution, bad anatomy, extra limbs, distorted face, oversaturated, amateur photography'
  );
  const [provider, setProvider] = useState('flux');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [batchSize, setBatchSize] = useState('4');
  const [seed, setSeed] = useState('9482015');
  const [camera, setCamera] = useState({
    brand: 'Leica',
    lens: '50mm',
    aperture: 'f1.4',
    lighting: 'Golden Hour',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const [results, setResults] = useState<GeneratedPhotoResult[]>([
    {
      id: 'res-1',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      prompt: 'Royal Indian wedding bride in raw silk golden lehenga...',
      negativePrompt: 'blurry, low resolution, bad anatomy...',
      provider: 'Flux 1.1 Pro',
      aspectRatio: '16:9',
      seed: 9482015,
      camera: 'Leica M11',
      lens: '50mm f/1.4',
      cost: '$0.040',
      isFavorite: true,
    },
    {
      id: 'res-2',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      prompt: 'Royal Indian wedding bride in raw silk golden lehenga...',
      negativePrompt: 'blurry, low resolution, bad anatomy...',
      provider: 'Flux 1.1 Pro',
      aspectRatio: '16:9',
      seed: 9482016,
      camera: 'Leica M11',
      lens: '50mm f/1.4',
      cost: '$0.040',
      isFavorite: false,
    },
  ]);

  const handleCameraChange = (field: string, value: string) => {
    setCamera((prev) => ({ ...prev, [field]: value }));
  };

  const handleInsertParameter = (token: string) => {
    setPrompt((prev) => `${prev}, ${token}`);
  };

  const handleRandomizeSeed = () => {
    setSeed(String(Math.floor(Math.random() * 8999999 + 1000000)));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const newItems: GeneratedPhotoResult[] = Array.from({ length: Number(batchSize) }).map((_, i) => ({
        id: `res-${Date.now()}-${i}`,
        url: i % 2 === 0
          ? 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
          : 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
        prompt,
        negativePrompt,
        provider,
        aspectRatio,
        seed: Number(seed) + i,
        camera: `${camera.brand}`,
        lens: `${camera.lens} ${camera.aperture}`,
        cost: '$0.040',
        isFavorite: false,
      }));
      setResults(newItems);
    }, 1500);
  };

  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase 3.1 AI Generation Engine</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">AI Photo Generation Studio Workspace</h1>
          <p className="text-sm text-text-secondary">Synthesize professional wedding concepts, high-fashion editorials, album spreads, and studio portraits.</p>
        </div>
      </div>

      {/* Main Prompt & Negative Prompt Editor */}
      <Card variant="glass" className="p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-gold-500" />
            <h3 className="text-sm font-bold text-text-primary">Primary Prompt & Negative Prompt Synthesis</h3>
          </div>
          <Badge variant="gold">Leica Optical Style Preset Active</Badge>
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-text-primary">Main Creative Prompt</label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 rounded-xl bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none focus:ring-1 focus:ring-gold-500 leading-relaxed"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-text-tertiary">Negative Prompt (Excluded Elements)</label>
            <input
              type="text"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-tertiary font-mono focus:outline-none focus:ring-1 focus:ring-gold-500"
            />
          </div>
        </div>
      </Card>

      {/* Provider Selector & Camera Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProviderSelector
          provider={provider}
          aspectRatio={aspectRatio}
          onChange={(field, val) => {
            if (field === 'provider') setProvider(val);
            if (field === 'aspectRatio') setAspectRatio(val);
          }}
        />
        <CameraSimulationControls
          brand={camera.brand}
          lens={camera.lens}
          aperture={camera.aperture}
          lighting={camera.lighting}
          onChange={handleCameraChange}
        />
      </div>

      {/* 1-Click Prompt Builder Drawer */}
      <PromptBuilderDrawer onInsertParameter={handleInsertParameter} />

      {/* Batch Generator Controller Bar */}
      <BatchGeneratorBar
        batchSize={batchSize}
        seed={seed}
        isGenerating={isGenerating}
        onBatchSizeChange={setBatchSize}
        onSeedChange={setSeed}
        onRandomizeSeed={handleRandomizeSeed}
        onGenerate={handleGenerate}
      />

      {/* Generation Result Canvas Gallery */}
      <GenerationResultGallery results={results} onRegenerate={handleGenerate} />
    </main>
  );
}
