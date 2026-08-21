import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

export const Toast = ({ type = 'success', message, onClose }) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    error: <XCircle className="w-5 h-5 text-rose-400" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    info: <Info className="w-5 h-5 text-indigo-400" />,
  };

  const borderColors = {
    success: 'border-emerald-500/30 bg-emerald-950/80 text-emerald-200',
    error: 'border-rose-500/30 bg-rose-950/80 text-rose-200',
    warning: 'border-amber-500/30 bg-amber-950/80 text-amber-200',
    info: 'border-indigo-500/30 bg-indigo-950/80 text-indigo-200',
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-md shadow-2xl transition-all ${borderColors[type] || borderColors.info}`}>
      {icons[type]}
      <span className="text-xs font-bold">{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-2 text-xs opacity-70 hover:opacity-100 font-bold">
          ✕
        </button>
      )}
    </div>
  );
};
