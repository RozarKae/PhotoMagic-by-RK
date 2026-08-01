import * as React from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-surface-glass backdrop-blur-2xl border border-border-subtle p-8 shadow-museum animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-6">
          {title && <h3 className="font-heading text-2xl font-bold text-ivory">{title}</h3>}
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="rounded-full p-1.5 text-silver hover:text-gold-400 hover:bg-surface-elevated transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
