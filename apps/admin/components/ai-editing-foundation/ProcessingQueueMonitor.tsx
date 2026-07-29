import * as React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { Cpu, Clock, CheckCircle2, Loader2 } from 'lucide-react';

export const ProcessingQueueMonitor: React.FC = () => {
  const jobs = [
    { title: 'AI Skin Retouching & Micro-Texture', status: 'processing', progress: 68, latency: '1.2s' },
    { title: 'Background Object Removal (Mic Wire)', status: 'queued', progress: 0, latency: 'Pending' },
    { title: 'Auto Color & White Balance Match', status: 'completed', progress: 100, latency: '0.4s' },
  ];

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Cpu size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">AI Editing Processing Queue Architecture</h3>
        </div>
        <Badge variant="gold">Async Job Queue Active</Badge>
      </div>

      <div className="flex flex-col gap-3 text-xs">
        {jobs.map((job, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-text-primary">{job.title}</span>
              <div className="flex items-center gap-2">
                <Badge variant={job.status === 'completed' ? 'success' : job.status === 'processing' ? 'gold' : 'info'}>
                  {job.status}
                </Badge>
                <span className="font-mono text-[10px] text-text-tertiary">{job.latency}</span>
              </div>
            </div>

            <div className="w-full bg-surface-elevated h-2 rounded-full overflow-hidden">
              <div
                className="bg-gold-500 h-full transition-all duration-300"
                style={{ width: `${job.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
