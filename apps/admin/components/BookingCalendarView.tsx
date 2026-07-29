'use client';

import React from 'react';
import { Card, Badge } from '@photomagic/ui';
import { BookingItem } from '../app/actions/booking-actions';
import { Calendar as CalendarIcon, AlertTriangle } from 'lucide-react';

interface BookingCalendarViewProps {
  bookings: BookingItem[];
}

export const BookingCalendarView: React.FC<BookingCalendarViewProps> = ({ bookings }) => {
  // Calendar dates placeholder grid
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <Card variant="glass" className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <CalendarIcon className="text-gold-500" size={20} />
          <h3 className="text-lg font-bold text-text-primary">
            October 2026 Schedule & Conflict Detector
          </h3>
        </div>
        <Badge variant="gold">3 Booked Events</Badge>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="font-bold text-text-tertiary uppercase py-1">
            {d}
          </div>
        ))}

        {daysInMonth.map((day) => {
          const dateStr = `2026-10-${day.toString().padStart(2, '0')}`;
          const dayBookings = bookings.filter((b) => b.eventDate === dateStr);
          const hasConflict = dayBookings.length > 1;

          return (
            <div
              key={day}
              className={`min-h-[80px] p-2 rounded-lg border text-left flex flex-col justify-between transition-colors ${
                dayBookings.length > 0
                  ? 'bg-surface-elevated border-gold-500/30'
                  : 'bg-surface-base/30 border-border-subtle'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-text-primary">{day}</span>
                {hasConflict && (
                  <span title="Booking Conflict Detected!" className="text-status-warning">
                    <AlertTriangle size={14} />
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1 mt-1">
                {dayBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-1 rounded bg-gold-500/10 text-gold-500 text-[10px] font-semibold truncate border border-gold-500/20"
                  >
                    {b.clientName}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
