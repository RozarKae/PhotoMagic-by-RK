'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import {
  Star,
  CheckCircle2,
  XCircle,
  Share2,
  ExternalLink,
  MessageSquare,
  Image as ImageIcon,
  ThumbsUp,
  Globe,
  Filter,
} from 'lucide-react';
import { ClientReviewV10 } from '@photomagic/config';

const MOCK_REVIEWS: ClientReviewV10[] = [
  {
    id: 'rev-101',
    projectId: 'proj-udr-901',
    clientName: 'Vikram & Ananya Sharma',
    projectTitle: 'Udaipur Royal Palace Wedding',
    starRating: 5,
    writtenReview:
      'PhotoMagic Studio completely blew us away! The 3D album proofing and AI face enhancement were truly spatial luxury. All our guests were amazed by the high-res 8K film delivery.',
    photoUrls: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400',
    ],
    googleReviewSynced: true,
    moderationStatus: 'featured',
    socialSharesCount: 42,
  },
  {
    id: 'rev-102',
    projectId: 'proj-udr-902',
    clientName: 'Rahul & Priya Verma',
    projectTitle: 'Lake Palace Pre-Wedding Shoot',
    starRating: 5,
    writtenReview:
      'The drone coverage and color grading were spectacular. The client portal made shortlisting our 400 photos effortless!',
    photoUrls: ['https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400'],
    googleReviewSynced: true,
    moderationStatus: 'approved',
    socialSharesCount: 18,
  },
  {
    id: 'rev-103',
    projectId: 'proj-udr-903',
    clientName: 'Siddharth & Meera Kapoor',
    projectTitle: 'Jagmandir Island Reception',
    starRating: 5,
    writtenReview:
      'Fastest delivery we have ever seen. The 12x18 metallic gold album quality is unmatched in Rajasthan.',
    photoUrls: [],
    googleReviewSynced: false,
    moderationStatus: 'pending_moderation',
    socialSharesCount: 5,
  },
  {
    id: 'rev-104',
    projectId: 'proj-udr-904',
    clientName: 'Aditya & Riya Singhania',
    projectTitle: 'City Palace Destination Wedding',
    starRating: 5,
    writtenReview:
      'Professional crew, tactile precision, and flawless communication via WhatsApp. Highly recommended!',
    photoUrls: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=400'],
    googleReviewSynced: true,
    moderationStatus: 'approved',
    socialSharesCount: 29,
  },
];

export const ReviewModerationHub: React.FC = () => {
  const [reviews, setReviews] = useState<ClientReviewV10[]>(MOCK_REVIEWS);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredReviews =
    filterStatus === 'all' ? reviews : reviews.filter((r) => r.moderationStatus === filterStatus);

  const handleUpdateStatus = (id: string, newStatus: any) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, moderationStatus: newStatus } : r)));
  };

  const handleToggleGoogleSync = (id: string) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, googleReviewSynced: !r.googleReviewSynced } : r)),
    );
  };

  return (
    <Card
      variant="elevated"
      className="p-6 border border-border-subtle bg-surface-elevated flex flex-col gap-6"
    >
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Star size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-text-primary">
                Phase 10.4 — Post-Delivery Reviews & Moderation Hub
              </h2>
              <Badge variant="gold">5.0 Star Average</Badge>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Client review collection, photo reviews, Google Review sync link, social sharing, and
              moderation controls.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://g.page/r/photomagic-studio/review"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-base border border-border-subtle text-xs text-gold-400 font-semibold hover:border-gold-500 transition-colors"
          >
            <Globe size={14} /> Google Business Review Page <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <Filter size={16} className="text-text-tertiary" />
        {['all', 'pending_moderation', 'approved', 'featured', 'rejected'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all border ${
              filterStatus === st
                ? 'bg-gold-500/20 text-gold-500 border-gold-500/40'
                : 'bg-surface-base text-text-secondary border-border-subtle hover:text-text-primary'
            }`}
          >
            {st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Reviews Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-xl bg-surface-base border border-border-subtle hover:border-gold-500/40 transition-all flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < rev.starRating ? 'text-gold-500 fill-gold-500' : 'text-text-tertiary'
                      }
                    />
                  ))}
                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded border bg-gold-500/10 text-gold-400 border-gold-500/20 capitalize">
                  {rev.moderationStatus.replace('_', ' ')}
                </span>
              </div>

              <h3 className="text-base font-bold text-text-primary">{rev.clientName}</h3>
              <span className="text-xs text-gold-500 block mb-2">{rev.projectTitle}</span>

              <p className="text-xs text-text-secondary leading-relaxed italic bg-surface-elevated/40 p-3 rounded-lg border border-border-subtle/50">
                "{rev.writtenReview}"
              </p>

              {rev.photoUrls.length > 0 && (
                <div className="flex items-center gap-2 mt-3">
                  {rev.photoUrls.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt="Review Attachment"
                      className="w-16 h-12 object-cover rounded-lg border border-border-subtle"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-border-subtle pt-3 flex items-center justify-between gap-2 text-xs">
              <button
                onClick={() => handleToggleGoogleSync(rev.id!)}
                className={`flex items-center gap-1 font-semibold ${
                  rev.googleReviewSynced
                    ? 'text-emerald-400'
                    : 'text-text-tertiary hover:text-text-primary'
                }`}
              >
                <Globe size={14} /> {rev.googleReviewSynced ? 'Google Synced' : 'Sync to Google'}
              </button>

              <div className="flex items-center gap-2">
                {rev.moderationStatus !== 'featured' && (
                  <Button
                    variant="secondary"
                    onClick={() => handleUpdateStatus(rev.id!, 'featured')}
                    className="text-[11px] py-1 px-2 h-auto font-semibold"
                  >
                    Feature
                  </Button>
                )}
                {rev.moderationStatus !== 'approved' && rev.moderationStatus !== 'featured' && (
                  <Button
                    variant="primary"
                    onClick={() => handleUpdateStatus(rev.id!, 'approved')}
                    className="text-[11px] py-1 px-2 h-auto font-bold"
                  >
                    Approve
                  </Button>
                )}
                {rev.moderationStatus !== 'rejected' && (
                  <Button
                    variant="danger"
                    onClick={() => handleUpdateStatus(rev.id!, 'rejected')}
                    className="text-[11px] py-1 px-2 h-auto font-semibold"
                  >
                    Reject
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
