'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Clock, History, RotateCcw, Eye, User, CheckCircle2 } from 'lucide-react';

export const AlbumRevisionHistoryTimeline: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState(3);

  const historyLogs = [
    {
      version: 3,
      designer: 'Vikram Sethi (Lead Designer)',
      summary: 'Client requested lighting enhancement on Spread #01 & #04.',
      time: 'Today 11:20 AM',
      current: true,
    },
    {
      version: 2,
      designer: 'Ananya Roy (Album Specialist)',
      summary: 'AI Auto-Layout generated initial 30 spreads with Luxury Gold preset.',
      time: 'Yesterday 04:15 PM',
      current: false,
    },
    {
      version: 1,
      designer: 'System Bot',
      summary: 'Album Project initialized from Client Favorites selection.',
      time: '2 days ago',
      current: false,
    },
  ];

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <History size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Phase 7.8 Album Revision History & Version Restore Engine
          </h3>
        </div>
        <Badge variant="gold">3 Revisions Logged</Badge>
      </div>

      <div className="flex flex-col gap-3 text-xs">
        {historyLogs.map((log) => (
          <div
            key={log.version}
            onClick={() => setSelectedVersion(log.version)}
            className={`p-4 rounded-xl border cursor-pointer flex justify-between items-center transition-all ${
              selectedVersion === log.version
                ? 'bg-gold-500/15 border-gold-500/50 ring-1 ring-gold-500/30'
                : 'bg-surface-base border-border-subtle hover:border-gold-500/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-500 flex items-center justify-center font-mono font-bold text-xs">
                v{log.version}
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-text-primary">{log.designer}</span>
                  {log.current && (
                    <Badge variant="success" className="text-[8px]">
                      Active Layout
                    </Badge>
                  )}
                </div>
                <span className="text-text-secondary">{log.summary}</span>
                <span className="text-[9px] text-text-tertiary font-mono">{log.time}</span>
              </div>
            </div>

            {!log.current && (
              <Button variant="secondary" size="sm" className="flex items-center gap-1 text-[11px]">
                <RotateCcw size={12} /> Restore v{log.version}
              </Button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
