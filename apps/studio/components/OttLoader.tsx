'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, FastForward } from 'lucide-react';

interface OttLoaderProps {
  onComplete?: () => void;
}

export const OttLoader: React.FC<OttLoaderProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFrameWord, setCurrentFrameWord] = useState('EYES');
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Words flashing in rhythm
  const words = ['MOMENTS', 'THROUGH', 'OUR', 'EYES'];

  // Sound synthesis for camera shutter / rhythmic mechanical clicks
  const playClickSound = (pitch = 800) => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
      if (!audioCtxRef.current) return;

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Graceful fallback for strict autoplay environments
    }
  };

  const handleFinish = () => {
    setFading(true);
    setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
      try {
        sessionStorage.setItem('photomagic_intro_played', 'true');
      } catch {}
    }, 400);
  };

  useEffect(() => {
    // Check if intro was already played this session
    try {
      if (sessionStorage.getItem('photomagic_intro_played') === 'true') {
        setVisible(false);
        if (onComplete) onComplete();
        return;
      }
    } catch {}

    const startTime = Date.now();
    const duration = 1800; // Fast 1.8 second opening sequence

    let wordIndex = 0;
    const wordInterval = setInterval(() => {
      if (wordIndex < words.length) {
        setCurrentFrameWord(words[wordIndex]);
        playClickSound(900 + wordIndex * 200);
        wordIndex++;
      }
    }, 380);

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (elapsed >= duration) {
        clearInterval(progressInterval);
        clearInterval(wordInterval);
        playClickSound(1600); // Climax click
        handleFinish();
      }
    }, 40);

    return () => {
      clearInterval(progressInterval);
      clearInterval(wordInterval);
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, [isMuted]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#090310] text-[#FAF5FF] flex flex-col items-center justify-center select-none transition-opacity duration-500 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="PhotoMagic Studios Opening Sequence"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-rose-900/20 rounded-full blur-[90px]" />
      </div>

      {/* Center Cinematic Hallmark */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-400/90 font-semibold">
            PHOTOMAGIC STUDIOS BY RK
          </span>
        </div>

        {/* Flashing Kinetic Rhythmic Text */}
        <div className="h-16 flex items-center justify-center overflow-hidden">
          <span className="font-hero text-3xl sm:text-5xl font-extrabold tracking-[0.2em] bg-gradient-to-r from-purple-200 via-rose-300 to-gold-400 bg-clip-text text-transparent transform transition-all duration-200 scale-105">
            {currentFrameWord}
          </span>
        </div>

        {/* Tamil Statement Hallmark */}
        <p className="font-tamil text-xs text-purple-300/80 tracking-wider mt-3 font-medium">
          இல்லத்தின் இன்ப நிகழ்வுகள், விழிகளின் வழியே
        </p>

        {/* Cinematic Progress Bar */}
        <div className="w-48 h-[2px] bg-purple-950/60 rounded-full mt-8 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-rose-400 to-gold-400 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Top / Bottom Interactive Controls: Skip & Mute */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
        <button
          onClick={() => setIsMuted((prev) => !prev)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white transition-all text-xs flex items-center gap-1 backdrop-blur-md border border-white/10"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          <span className="text-[10px] uppercase tracking-wider font-mono pr-1">
            {isMuted ? 'Muted' : 'Audio On'}
          </span>
        </button>

        <button
          onClick={handleFinish}
          className="px-3.5 py-1.5 rounded-full bg-purple-600/40 hover:bg-purple-600/60 text-white transition-all text-[10px] uppercase tracking-widest font-mono flex items-center gap-1.5 backdrop-blur-md border border-purple-400/30"
          aria-label="Skip opening animation"
        >
          <span>Skip</span>
          <FastForward size={12} />
        </button>
      </div>
    </div>
  );
};
