import * as React from 'react';
import { Camera } from 'lucide-react';
import { Button } from './button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <Camera size={32} className="text-gold-500" />,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-border-subtle rounded-2xl bg-surface-glass backdrop-blur-2xl shadow-museum relative overflow-hidden group">
      <div className="mb-5 rounded-full bg-gold-500/10 p-4 text-gold-500 border border-gold-500/20 shadow-watch transition-transform group-hover:scale-105 duration-300">
        {icon}
      </div>
      <h3 className="font-heading text-2xl font-bold text-ivory mb-2">{title}</h3>
      <p className="max-w-md text-sm text-silver font-light leading-relaxed mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
