'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { StaffListTable, StaffMember } from '../../components/StaffListTable';
import { AttendanceTracker } from '../../components/AttendanceTracker';
import { UserPlus, Search, ShieldCheck, Users } from 'lucide-react';

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const [staff] = useState<StaffMember[]>([
    {
      id: 'stf-101',
      name: 'Alexander Ross',
      role: 'lead_photographer',
      department: 'Photography',
      employmentType: 'Full-time',
      email: 'alex.ross@photomagic.studio',
      phone: '+1 (555) 019-2831',
      rating: 4.9,
      completedProjects: 48,
      status: 'active',
    },
    {
      id: 'stf-102',
      name: 'Elena Rostova',
      role: 'cinematographer',
      department: 'Cinematography',
      employmentType: 'Contractor',
      email: 'elena.rostova@photomagic.studio',
      phone: '+1 (555) 014-9922',
      rating: 4.8,
      completedProjects: 32,
      status: 'active',
    },
  ]);

  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Human Capital Engine</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">Team & Crew Management</h1>
          <p className="text-sm text-text-secondary">
            Manage studio staff, assign crews to shoots, track shift attendance, and monitor
            freelancer rosters.
          </p>
        </div>

        <Button variant="primary" className="flex items-center gap-2">
          <UserPlus size={16} />
          Add Staff Member
        </Button>
      </div>

      {/* Attendance & Clock-In Widget */}
      <AttendanceTracker />

      {/* Main Staff Directory Table */}
      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Active Studio Crew Roster</h3>
        <StaffListTable staff={staff} />
      </Card>
    </main>
  );
}
