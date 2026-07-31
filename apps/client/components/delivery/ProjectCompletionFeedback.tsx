'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Star, Heart, CheckCircle2, MessageSquare } from 'lucide-react';

export const ProjectCompletionFeedback: React.FC = () => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState(
    'PhotoMagic Studio exceeded all our expectations! The 8K cinematic film and Italian gold-foil album are true masterpieces.',
  );

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Heart size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Project Completion & Client Testimonial
          </h3>
        </div>
        <Badge variant="gold">★★★★★ 5.0 Rating Submitted</Badge>
      </div>

      <div className="flex flex-col gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-text-secondary">Overall Studio Rating:</span>
          <div className="flex items-center gap-1 text-gold-500">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                fill={star <= rating ? 'currentColor' : 'none'}
                onClick={() => setRating(star)}
                className="cursor-pointer"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-text-primary">Written Client Testimonial</label>
          <textarea
            rows={3}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full p-3 rounded-xl bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-[10px] text-text-tertiary">
            Thank you for letting us capture your royal wedding story!
          </span>
          <Button variant="primary" size="sm">
            Submit Testimonial & Review
          </Button>
        </div>
      </div>
    </Card>
  );
};
