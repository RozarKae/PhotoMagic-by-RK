import * as React from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  className = '',
}) => {
  const icons = {
    info: <Info size={20} className="text-status-info flex-shrink-0" />,
    success: <CheckCircle size={20} className="text-status-success flex-shrink-0" />,
    warning: <AlertTriangle size={20} className="text-status-warning flex-shrink-0" />,
    error: <XCircle size={20} className="text-status-error flex-shrink-0" />,
  };

  const variants = {
    info: 'bg-status-info/10 border-status-info/20 text-text-primary',
    success: 'bg-status-success/10 border-status-success/20 text-text-primary',
    warning: 'bg-status-warning/10 border-status-warning/20 text-text-primary',
    error: 'bg-status-error/10 border-status-error/20 text-text-primary',
  };

  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${variants[variant]} ${className}`}>
      {icons[variant]}
      <div className="flex flex-col gap-0.5">
        {title && <span className="text-sm font-semibold">{title}</span>}
        <div className="text-xs text-text-secondary">{children}</div>
      </div>
    </div>
  );
};
