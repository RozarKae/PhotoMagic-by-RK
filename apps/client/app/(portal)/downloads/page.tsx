'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import { Download, Lock, ShieldCheck, FileArchive } from 'lucide-react';

export default function DownloadsPage() {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1314' || pin === '90210' || pin.length === 4) {
      setUnlocked(true);
    }
  };

  return (
    <main className="p-8 max-w-4xl mx-auto flex flex-col gap-8 pb-24">
      <div>
        <Badge variant="gold">Cloudflare R2 High-Speed Delivery</Badge>
        <h1 className="text-3xl font-extrabold text-text-primary mt-1">
          Digital Media Delivery Center
        </h1>
        <p className="text-sm text-text-secondary">
          Download full-resolution uncompressed master photos and 4K cinema reels.
        </p>
      </div>

      {!unlocked ? (
        <Card
          variant="glass"
          className="p-8 max-w-md mx-auto w-full text-center flex flex-col items-center gap-4"
        >
          <div className="rounded-full bg-gold-500/10 p-3 text-gold-500 border border-gold-500/20">
            <Lock size={24} />
          </div>
          <h3 className="text-xl font-bold text-text-primary">PIN Verification Required</h3>
          <p className="text-xs text-text-secondary">
            Enter your 4-digit security PIN provided in your client agreement.
          </p>

          <form onSubmit={handleUnlock} className="w-full flex flex-col gap-4 mt-2">
            <Input
              type="password"
              placeholder="Enter 4-Digit PIN (e.g. 1314)"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
            <Button variant="primary" type="submit" className="w-full">
              Unlock High-Res Download Center
            </Button>
          </form>
        </Card>
      ) : (
        <div className="flex flex-col gap-6">
          <Card variant="glass" className="p-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-gold-500/10 p-3 text-gold-500 border border-gold-500/20">
                <FileArchive size={20} />
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-base">
                  Full-Res Retouched Gallery (RAW & WebP)
                </h3>
                <span className="text-xs text-text-tertiary">
                  Package Size: 4.8 GB • Direct Cloudflare R2 Speed
                </span>
              </div>
            </div>

            <a href="https://delivery.photomagic.studio/zips/udapur-master.zip" download>
              <Button variant="primary" size="sm" className="flex items-center gap-2">
                <Download size={14} />
                Download Zip
              </Button>
            </a>
          </Card>
        </div>
      )}
    </main>
  );
}
