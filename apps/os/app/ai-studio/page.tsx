'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { AIStudioHeader } from '../../components/ai-studio/AIStudioHeader';
import { PromptManager } from '../../components/ai-studio/PromptManager';
import { AIJobQueue } from '../../components/ai-studio/AIJobQueue';
import { AIAssetLibrary } from '../../components/ai-studio/AIAssetLibrary';
import { AIModelManager } from '../../components/ai-studio/AIModelManager';
import { AIUsageAnalytics } from '../../components/ai-studio/AIUsageAnalytics';
import { Sparkles, Cpu, BookOpen, HardDrive, Plus } from 'lucide-react';

export default function AIStudioFoundationPage() {
  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase 3.0 AI Infrastructure Engine</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            AI Studio Foundation Hub
          </h1>
          <p className="text-sm text-text-secondary">
            Manage multi-provider AI model connectors, background worker queues, prompt template
            versioning, and asset libraries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus size={16} />
            New Prompt Template
          </Button>
        </div>
      </div>

      {/* Header Overview KPI Cards */}
      <AIStudioHeader />

      {/* Usage Analytics Grid */}
      <AIUsageAnalytics />

      {/* Prompt Template Manager */}
      <PromptManager />

      {/* Background AI Worker Queue & Asset Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AIJobQueue />
        <AIAssetLibrary />
      </div>

      {/* Multi-Provider Model Manager */}
      <AIModelManager />
    </main>
  );
}
