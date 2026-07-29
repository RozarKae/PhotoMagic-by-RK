'use client';

import React from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import { Sparkles, Dices, Layers, Play } from 'lucide-react';

interface BatchGeneratorBarProps {
  batchSize: string;
  seed: string;
  isGenerating: boolean;
  onBatchSizeChange: (size: string) => void;
  onSeedChange: (seed: string) => void;
  onRandomizeSeed: () => void;
  onGenerate: () => void;
}

export const BatchGeneratorBar: React.FC<BatchGeneratorBarProps> = ({
  batchSize,
  seed,
  isGenerating,
  onBatchSizeChange,
  onSeedChange,
  onRandomizeSeed,
  onGenerate,
}) => {
  const batchOptions = ['1', '2', '4', '8', '16'];

  return (
    <Card variant="glass" className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex flex-wrap items-center gap-6 text-xs">
        {/* Batch Selector */}
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-gold-500" />
          <span className="font-semibold text-text-primary">Batch Count:</span>
          <div className="flex items-center gap-1">
            {batchOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onBatchSizeChange(opt)}
                className={`w-8 h-8 rounded-lg font-bold transition-all text-xs flex items-center justify-center ${
                  batchSize === opt
                    ? 'bg-gold-500 text-surface-base font-extrabold shadow-md'
                    : 'bg-surface-base text-text-secondary hover:text-text-primary border border-border-subtle'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Seed Input */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-text-primary">Seed:</span>
          <input
            type="text"
            value={seed}
            onChange={(e) => onSeedChange(e.target.value)}
            className="w-28 h-8 px-2.5 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono"
            placeholder="Random"
          />
          <Button variant="ghost" size="sm" onClick={onRandomizeSeed} title="Randomize Seed">
            <Dices size={16} className="text-gold-500" />
          </Button>
        </div>
      </div>

      {/* Primary Action Button */}
      <Button
        variant="primary"
        size="lg"
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full sm:w-auto px-8 flex items-center justify-center gap-2 shadow-xl shadow-gold-500/10"
      >
        <Sparkles size={18} />
        {isGenerating ? 'Synthesizing AI Batch...' : `Generate ${batchSize} Image${Number(batchSize) > 1 ? 's' : ''}`}
      </Button>
    </Card>
  );
};
