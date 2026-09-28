'use client';

import * as React from 'react';
import { Home, Image as ImageIcon, CheckCircle, User } from 'lucide-react';
import { useSoundFX } from '../hooks/use-sound-fx';

export interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}

export const MobileNavigationDock: React.FC<{ items?: DockItem[] }> = ({ items }) => {
  const { playMicroClick, playHoverTick } = useSoundFX();

  const defaultItems: DockItem[] = items || [
    { id: 'home', label: 'Home', icon: <Home size={20} />, active: true, onClick: () => {} },
    {
      id: 'gallery',
      label: 'Gallery',
      icon: <ImageIcon size={20} />,
      active: false,
      onClick: () => {},
    },
    {
      id: 'tasks',
      label: 'Approvals',
      icon: <CheckCircle size={20} />,
      active: false,
      onClick: () => {},
    },
    { id: 'profile', label: 'Profile', icon: <User size={20} />, active: false, onClick: () => {} },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md h-16 rounded-full bg-surface-glass/90 backdrop-blur-2xl border border-border-subtle shadow-modal flex items-center justify-around px-4 md:hidden">
      {defaultItems.map((item) => (
        <button
          key={item.id}
          onMouseEnter={playHoverTick}
          onClick={() => {
            playMicroClick();
            item.onClick();
          }}
          className={`flex flex-col items-center justify-center gap-1 text-xs transition-all duration-200 active:scale-90 ${
            item.active
              ? 'text-gold-500 font-semibold'
              : 'text-text-tertiary hover:text-text-primary'
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};
