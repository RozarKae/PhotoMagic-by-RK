'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Clock, CheckCircle2, LogIn, LogOut, MapPin } from 'lucide-react';

export const AttendanceTracker: React.FC = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState<string | null>(null);

  const handleClockToggle = () => {
    if (!clockedIn) {
      setClockedIn(true);
      setClockTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } else {
      setClockedIn(false);
      setClockTime(null);
    }
  };

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Crew Attendance & Clock-In</h3>
        </div>
        <Badge variant={clockedIn ? 'success' : 'warning'}>
          {clockedIn ? 'Clocked In' : 'Off-Duty'}
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-surface-base border border-border-subtle">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-text-tertiary">Current Shift Time</span>
          <span className="text-xl font-bold text-text-primary">
            {clockedIn ? `On Shift (Since ${clockTime})` : '08h 00m Scheduled'}
          </span>
          <span className="text-[11px] text-text-tertiary flex items-center gap-1">
            <MapPin size={12} className="text-gold-500" /> GPS Geofence Verification Ready
          </span>
        </div>

        <Button
          variant={clockedIn ? 'secondary' : 'primary'}
          onClick={handleClockToggle}
          className="flex items-center gap-2"
        >
          {clockedIn ? <LogOut size={16} /> : <LogIn size={16} />}
          {clockedIn ? 'Clock Out Shift' : 'Clock In Now'}
        </Button>
      </div>
    </Card>
  );
};
