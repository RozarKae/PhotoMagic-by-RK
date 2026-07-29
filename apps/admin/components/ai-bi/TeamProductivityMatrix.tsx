import * as React from 'react';
import { DataTable, Badge } from '@photomagic/ui';
import { Star, Award, Clock } from 'lucide-react';

export interface TeamPerformanceRecord {
  id: string;
  name: string;
  role: string;
  projectsCompleted: number;
  avgDeliveryDays: number;
  rating: number;
}

export const TeamProductivityMatrix: React.FC = () => {
  const data: TeamPerformanceRecord[] = [
    {
      id: 'tp-1',
      name: 'Vikram Sethi',
      role: 'Senior Lead Photographer',
      projectsCompleted: 24,
      avgDeliveryDays: 3,
      rating: 4.95,
    },
    {
      id: 'tp-2',
      name: 'Ananya Roy',
      role: 'Master Colorist & Editor',
      projectsCompleted: 38,
      avgDeliveryDays: 4,
      rating: 4.90,
    },
  ];

  const columns = [
    {
      header: 'Team Member & Role',
      accessorKey: (row: TeamPerformanceRecord) => (
        <div className="flex flex-col">
          <span className="font-bold text-text-primary text-xs">{row.name}</span>
          <span className="text-[10px] text-gold-500 font-semibold">{row.role}</span>
        </div>
      ),
    },
    {
      header: 'Completed Projects',
      accessorKey: 'projectsCompleted' as const,
    },
    {
      header: 'Avg Delivery Time',
      accessorKey: (row: TeamPerformanceRecord) => (
        <span className="font-mono text-xs text-text-secondary">{row.avgDeliveryDays} Days</span>
      ),
    },
    {
      header: 'Client Rating',
      accessorKey: (row: TeamPerformanceRecord) => (
        <div className="flex items-center gap-1 text-gold-500 font-bold text-xs">
          <Star size={12} fill="currentColor" />
          <span>{row.rating} / 5.0</span>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
};
