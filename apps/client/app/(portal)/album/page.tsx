'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import { AlbumSpreadViewer } from '../../../components/AlbumSpreadViewer';
import { AlbumCommentItem } from '@photomagic/config';
import { addAlbumCommentAction, approveAlbumAction } from '../../actions/album-actions';
import { BookOpen, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';

export default function ClientAlbumApprovalPage() {
  const [spreads] = useState([
    {
      spreadNumber: 1,
      leftPhotoUrl:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
      rightPhotoUrl:
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    },
    {
      spreadNumber: 2,
      leftPhotoUrl:
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      rightPhotoUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    },
  ]);

  const [comments, setComments] = useState<AlbumCommentItem[]>([
    {
      id: 'c1',
      albumId: 'alb-101',
      spreadNumber: 1,
      authorName: 'Eleanor Vance',
      pinX: 25,
      pinY: 40,
      comment: 'Could we brighten the shadow tones on the left bouquet photo slightly?',
      resolved: false,
      timestamp: '11:15 AM',
    },
  ]);

  const [activePin, setActivePin] = useState<{ spreadNumber: number; x: number; y: number } | null>(
    null,
  );
  const [commentText, setCommentText] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  const handleAddPin = (spreadNumber: number, pinX: number, pinY: number) => {
    setActivePin({ spreadNumber, x: pinX, y: pinY });
  };

  const handleSaveComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePin || !commentText.trim()) return;

    const res = await addAlbumCommentAction({
      albumId: 'alb-101',
      spreadNumber: activePin.spreadNumber,
      pinX: activePin.x,
      pinY: activePin.y,
      comment: commentText,
    });

    if (res.success) {
      setComments((prev) => [...prev, res.data as AlbumCommentItem]);
      setActivePin(null);
      setCommentText('');
    }
  };

  const handleApprove = async () => {
    const res = await approveAlbumAction({
      albumId: 'alb-101',
      approvedBy: 'Eleanor Vance',
    });

    if (res.success) {
      setIsApproved(true);
    }
  };

  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">3D Spatial Album Co-Design</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            Flush-Mount Album Approval Hub
          </h1>
          <p className="text-sm text-text-secondary">
            Review 2-page spread layouts and place pin comments for your album designer.
          </p>
        </div>

        <Button
          variant={isApproved ? 'secondary' : 'primary'}
          onClick={handleApprove}
          disabled={isApproved}
          className="flex items-center gap-2"
        >
          {isApproved ? <ShieldCheck size={16} /> : <CheckCircle2 size={16} />}
          {isApproved
            ? 'Album Approved & Sent to Italian Print Lab'
            : 'Approve Layout & Order Print'}
        </Button>
      </div>

      {/* Main Spread Viewer */}
      <AlbumSpreadViewer spreads={spreads} comments={comments} onAddCommentPin={handleAddPin} />

      {/* Pin Comment Creation Popover */}
      {activePin && (
        <Card variant="glass" className="p-6 border-gold-500/50">
          <form onSubmit={handleSaveComment} className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-text-primary">
              Add Revision Note Pin at ({activePin.x}%, {activePin.y}%)
            </h4>
            <Input
              placeholder="e.g., Swap this photo with reception entrance picture..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" type="button" onClick={() => setActivePin(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Pin Revision Note
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Revision Comments List */}
      <Card variant="glass" className="p-6">
        <h3 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
          <MessageSquare size={18} className="text-gold-500" />
          Active Spatial Revision Pins ({comments.length})
        </h3>
        <div className="flex flex-col gap-3 divide-y divide-border-subtle">
          {comments.map((cmt) => (
            <div key={cmt.id} className="pt-3 first:pt-0 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-gold-500">Spread {cmt.spreadNumber} Pin</span>
                <p className="text-text-secondary mt-0.5">{cmt.comment}</p>
              </div>
              <Badge variant="warning">Revision Open</Badge>
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
}
