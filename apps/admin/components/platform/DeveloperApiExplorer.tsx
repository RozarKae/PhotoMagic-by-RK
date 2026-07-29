'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import { Code, Key, Copy, CheckCircle2, ShieldAlert } from 'lucide-react';

export const DeveloperApiExplorer: React.FC = () => {
  const [apiKey, setApiKey] = useState('pm_live_9f8d7a6b5c4e3f2a1b0c9d8e7f6a5b4c');
  const [graphqlEndpoint, setGraphqlEndpoint] = useState('https://api.photomagic.app/v1/graphql');

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Code size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Developer Platform & REST / GraphQL API Explorer</h3>
        </div>
        <Badge variant="gold">API v1.4 Active</Badge>
      </div>

      <div className="flex flex-col gap-3 text-xs">
        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2">
          <span className="font-bold text-text-primary">Live Production API Secret Key</span>
          <div className="flex items-center gap-2">
            <input
              type="password"
              value={apiKey}
              readOnly
              className="flex-1 h-9 px-3 rounded-lg bg-surface-elevated border border-border-subtle text-xs text-gold-500 font-mono focus:outline-none"
            />
            <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(apiKey)} className="flex items-center gap-1">
              <Copy size={14} /> Copy Key
            </Button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2">
          <span className="font-bold text-text-primary">GraphQL Endpoint URL</span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={graphqlEndpoint}
              readOnly
              className="flex-1 h-9 px-3 rounded-lg bg-surface-elevated border border-border-subtle text-xs text-text-primary font-mono focus:outline-none"
            />
            <Button variant="secondary" size="sm" className="flex items-center gap-1">
              Open GraphQL Explorer
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
