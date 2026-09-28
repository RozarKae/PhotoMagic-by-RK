'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

export type SoundType =
  | 'microClick'
  | 'glassTap'
  | 'tactileThud'
  | 'dragGrab'
  | 'dragDrop'
  | 'hoverTick'
  | 'successChime';

export interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  setMuted: (muted: boolean) => void;
  play: (type: SoundType) => void;
  playMicroClick: () => void;
  playGlassTap: () => void;
  playTactileThud: () => void;
  playDragGrab: () => void;
  playDragDrop: () => void;
  playHoverTick: () => void;
  playSuccessChime: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const STORAGE_KEY = 'photomagic_sound_muted';

export const SoundProvider: React.FC<{ children: React.ReactNode; defaultMuted?: boolean }> = ({
  children,
  defaultMuted = false,
}) => {
  const [isMuted, setIsMutedState] = useState<boolean>(true); // start muted until mounted to avoid SSR flash
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastHoverTimeRef = useRef<number>(0);

  // Synchronize with localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        setIsMutedState(stored === 'true');
      } else {
        setIsMutedState(defaultMuted);
      }
    } catch {
      setIsMutedState(defaultMuted);
    }
  }, [defaultMuted]);

  // Lazy-initialize AudioContext
  const getAudioContext = useCallback((): AudioContext | null => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
      return audioCtxRef.current;
    } catch {
      return null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  // 1. Ultra-subtle crisp mechanical micro-click (1200Hz filtered impulse, 14ms decay)
  const playMicroClick = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.Q.setValueAtTime(3.5, ctx.currentTime);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.014);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.014);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.016);
    } catch {}
  }, [isMuted, getAudioContext]);

  // 2. Soft glass tap (2600Hz high-Q resonant ping, 24ms)
  const playGlassTap = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1800, ctx.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(2600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.024);

      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.024);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.028);
    } catch {}
  }, [isMuted, getAudioContext]);

  // 3. Low-frequency warm velvet thud (sine wave dropping 85Hz -> 45Hz, 32ms)
  const playTactileThud = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(85, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(42, ctx.currentTime + 0.032);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.038);
    } catch {}
  }, [isMuted, getAudioContext]);

  // 4. Drag grab tone (Rising tension ramp from 105Hz -> 210Hz, 28ms)
  const playDragGrab = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(105, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(210, ctx.currentTime + 0.028);

      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.032);
    } catch {}
  }, [isMuted, getAudioContext]);

  // 5. Drag drop tone (Settling crisp snap from 170Hz -> 55Hz, 26ms)
  const playDragDrop = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(170, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.026);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.028);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {}
  }, [isMuted, getAudioContext]);

  // 6. Micro-acoustic hover tick (throttled to 65ms, gain 0.025)
  const playHoverTick = useCallback(() => {
    if (isMuted) return;
    const now = Date.now();
    if (now - lastHoverTimeRef.current < 65) return;
    lastHoverTimeRef.current = now;

    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.009);

      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.009);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.01);
    } catch {}
  }, [isMuted, getAudioContext]);

  // 7. Success chime (Gentle minimalist two-tone golden chord: E6 1318Hz -> G#6 1661Hz)
  const playSuccessChime = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const tones = [
        { freq: 1318.5, delay: 0, dur: 0.14 },
        { freq: 1661.2, delay: 0.06, dur: 0.18 },
      ];

      tones.forEach(({ freq, delay, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

        gain.gain.setValueAtTime(0.0001, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + delay + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + dur);
      });
    } catch {}
  }, [isMuted, getAudioContext]);

  // Master play dispatcher
  const play = useCallback(
    (type: SoundType) => {
      switch (type) {
        case 'microClick':
          playMicroClick();
          break;
        case 'glassTap':
          playGlassTap();
          break;
        case 'tactileThud':
          playTactileThud();
          break;
        case 'dragGrab':
          playDragGrab();
          break;
        case 'dragDrop':
          playDragDrop();
          break;
        case 'hoverTick':
          playHoverTick();
          break;
        case 'successChime':
          playSuccessChime();
          break;
      }
    },
    [
      playMicroClick,
      playGlassTap,
      playTactileThud,
      playDragGrab,
      playDragDrop,
      playHoverTick,
      playSuccessChime,
    ],
  );

  const toggleMute = useCallback(() => {
    setIsMutedState((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {}
      // Play a gentle feedback tone when unmuting
      if (prev && !next) {
        setTimeout(() => {
          playGlassTap();
        }, 50);
      }
      return next;
    });
  }, [playGlassTap]);

  const setMuted = useCallback((muted: boolean) => {
    setIsMutedState(muted);
    try {
      localStorage.setItem(STORAGE_KEY, String(muted));
    } catch {}
  }, []);

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        setMuted,
        play,
        playMicroClick,
        playGlassTap,
        playTactileThud,
        playDragGrab,
        playDragDrop,
        playHoverTick,
        playSuccessChime,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export function useSoundFX(): SoundContextType {
  const context = useContext(SoundContext);
  if (!context) {
    // Graceful no-op fallback if used outside Provider
    return {
      isMuted: true,
      toggleMute: () => {},
      setMuted: () => {},
      play: () => {},
      playMicroClick: () => {},
      playGlassTap: () => {},
      playTactileThud: () => {},
      playDragGrab: () => {},
      playDragDrop: () => {},
      playHoverTick: () => {},
      playSuccessChime: () => {},
    };
  }
  return context;
}
