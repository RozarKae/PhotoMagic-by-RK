import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface WorkspacePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
}

export const WorkspacePanel: React.FC<WorkspacePanelProps> = ({
  title,
  subtitle,
  headerAction,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl bg-[#141414] border border-white/10 p-6 shadow-museum transition-all duration-300 relative overflow-hidden',
        className,
      )}
      {...props}
    >
      {(title || headerAction) && (
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
          <div>
            {title && (
              <h3 className="font-heading text-xl font-bold text-ivory tracking-wide">{title}</h3>
            )}
            {subtitle && (
              <span className="font-mono text-[10px] text-silver/70 uppercase tracking-widest block mt-0.5">
                {subtitle}
              </span>
            )}
          </div>
          {headerAction && <div className="flex items-center gap-2">{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
