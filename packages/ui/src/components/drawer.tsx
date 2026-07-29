import * as React from 'react';
import { X } from 'lucide-react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  position?: 'right' | 'left';
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  position = 'right',
  children,
}) => {
  if (!isOpen) return null;

  const positionClasses = {
    right: 'right-0 animate-in slide-in-from-right duration-300',
    left: 'left-0 animate-in slide-in-from-left duration-300',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 bottom-0 w-full max-w-md bg-surface-elevated border-l border-border-subtle p-6 shadow-modal flex flex-col ${positionClasses[position]}`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-4">
          {title && <h3 className="text-lg font-semibold text-text-primary">{title}</h3>}
          <button
            onClick={onClose}
            aria-label="Close Drawer"
            className="rounded-full p-1 text-text-tertiary hover:text-text-primary hover:bg-surface-base transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
