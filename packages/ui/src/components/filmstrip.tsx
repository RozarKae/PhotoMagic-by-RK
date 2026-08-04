import * as React from 'react';

export interface FilmstripItem {
  id: string;
  imageSrc: string;
  title?: string;
  isActive?: boolean;
}

export interface FilmstripProps {
  items: FilmstripItem[];
  onSelect?: (id: string) => void;
  className?: string;
}

export const Filmstrip: React.FC<FilmstripProps> = ({ items, onSelect, className = '' }) => {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-2xl bg-[#090909] border border-white/10 overflow-x-auto film-grain ${className}`}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect?.(item.id)}
          className={`relative aspect-[4/3] h-20 flex-shrink-0 rounded-xl overflow-hidden border transition-all duration-300 ${
            item.isActive
              ? 'border-gold-500 scale-105 shadow-kodakGlow ring-2 ring-gold-500/50'
              : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
          }`}
        >
          <img
            src={item.imageSrc}
            alt={item.title || 'Filmstrip thumbnail'}
            className="w-full h-full object-cover"
          />
          {item.isActive && <div className="absolute inset-0 bg-gold-500/10 pointer-events-none" />}
        </button>
      ))}
    </div>
  );
};
