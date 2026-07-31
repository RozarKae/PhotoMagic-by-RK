'use client';

import React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { GitMerge, Building, ChevronRight, Users } from 'lucide-react';

export const OrganizationHierarchyTree: React.FC = () => {
  const tree = [
    {
      level: 'Headquarters (HQ)',
      title: 'Udaipur Corporate HQ',
      subs: ['India Regional Office', 'Middle East & Europe Regional Office'],
    },
    {
      level: 'Regional Divisions',
      title: 'Asia-Pacific & EMEA Operational Hubs',
      subs: ['Mumbai Studio Branch', 'Dubai International Branch', 'London Mayfair Branch'],
    },
  ];

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <GitMerge size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Corporate Organization & Reporting Hierarchy
          </h3>
        </div>
        <Badge variant="gold">Parent / Subsidiary Tree</Badge>
      </div>

      <div className="flex flex-col gap-3 text-xs">
        {tree.map((node, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-text-primary text-sm">{node.title}</span>
              <Badge variant="gold" className="text-[9px]">
                {node.level}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border-subtle">
              {node.subs.map((sub, sIdx) => (
                <Badge key={sIdx} variant="success" className="text-[10px] flex items-center gap-1">
                  <ChevronRight size={10} /> {sub}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
