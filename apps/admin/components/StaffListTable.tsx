import * as React from 'react';
import { DataTable, Badge, Avatar, Button } from '@photomagic/ui';
import { UserCheck, Star, Calendar, Clock } from 'lucide-react';

export interface StaffMember {
  id: string;
  name: string;
  role: 'lead_photographer' | 'cinematographer' | 'drone_pilot' | 'editor' | 'studio_manager';
  department: 'Photography' | 'Cinematography' | 'Post-Production' | 'Operations';
  employmentType: 'Full-time' | 'Contractor' | 'Freelance';
  email: string;
  phone: string;
  rating: number;
  completedProjects: number;
  status: 'active' | 'on_leave' | 'inactive';
}

interface StaffListTableProps {
  staff: StaffMember[];
  onAssign?: (member: StaffMember) => void;
}

export const StaffListTable: React.FC<StaffListTableProps> = ({ staff, onAssign }) => {
  const columns = [
    {
      header: 'Staff Member',
      accessorKey: (row: StaffMember) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} size="sm" />
          <div className="flex flex-col">
            <span className="font-bold text-text-primary text-sm">{row.name}</span>
            <span className="text-xs text-text-tertiary">{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Role & Dept',
      accessorKey: (row: StaffMember) => (
        <div className="flex flex-col text-xs">
          <span className="font-semibold text-gold-500 capitalize">
            {row.role.replace('_', ' ')}
          </span>
          <span className="text-text-tertiary">{row.department}</span>
        </div>
      ),
    },
    {
      header: 'Employment',
      accessorKey: (row: StaffMember) => (
        <Badge variant="gold" className="text-[10px]">
          {row.employmentType}
        </Badge>
      ),
    },
    {
      header: 'Performance KPI',
      accessorKey: (row: StaffMember) => (
        <div className="flex items-center gap-2 text-xs font-semibold text-text-primary">
          <div className="flex items-center text-gold-500">
            <Star size={12} fill="currentColor" />
            <span className="ml-1">{row.rating}</span>
          </div>
          <span className="text-text-tertiary">({row.completedProjects} Shoots)</span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: (row: StaffMember) => (
        <Badge variant={row.status === 'active' ? 'success' : 'warning'}>
          {row.status === 'active' ? 'Active On-Duty' : 'On Leave'}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      accessorKey: (row: StaffMember) => (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onAssign?.(row)}
          className="flex items-center gap-1.5"
        >
          <UserCheck size={14} />
          Assign to Shoot
        </Button>
      ),
    },
  ];

  return <DataTable columns={columns} data={staff} />;
};
