import * as React from 'react';
import { Camera } from 'lucide-react';

export interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({ title, subtitle, children }) => {
  return (
    <div className="w-full max-w-md rounded-2xl bg-surface-glass backdrop-blur-2xl border border-border-subtle p-8 shadow-modal">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="rounded-full bg-gold-500/10 p-3 mb-3 text-gold-500 border border-gold-500/20">
          <Camera size={28} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-text-primary">{title}</h2>
        {subtitle && <p className="text-xs text-text-secondary mt-1">{subtitle}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
};
