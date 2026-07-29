'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { ShieldCheck, Key, Lock, CheckCircle2 } from 'lucide-react';

export const EnterpriseRbacMatrix: React.FC = () => {
  const roles = [
    { role: 'Super Admin', scope: 'Global Enterprise', permissions: 'Full Read/Write/Delete/Billing/AI' },
    { role: 'Branch Manager', scope: 'Single Branch', permissions: 'Manage Staff, Equipment, Invoices' },
    { role: 'Senior Photographer', scope: 'Assigned Shoots', permissions: 'Gallery Upload, Client Proofing' },
    { role: 'Master Editor', scope: 'Post-Production', permissions: 'AI Photo Editing, Album Canvas' },
  ];

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Enterprise Role-Based Access Control (RBAC)</h3>
        </div>
        <Badge variant="gold">14 Enterprise System Roles</Badge>
      </div>

      <div className="flex flex-col gap-2 text-xs">
        {roles.map((r, idx) => (
          <div key={idx} className="p-3 rounded-lg bg-surface-base border border-border-subtle flex justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-text-primary">{r.role}</span>
                <Badge variant="gold" className="text-[9px]">{r.scope}</Badge>
              </div>
              <span className="text-[10px] text-text-tertiary font-mono">{r.permissions}</span>
            </div>
            <Button variant="secondary" size="sm">Edit Permissions</Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
