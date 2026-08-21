import React from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState = ({ title = 'No records found', description = 'There are no items to display at this time.', actionText, onAction }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center space-y-3 max-w-md mx-auto my-6">
      <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
        <Inbox className="w-6 h-6" />
      </div>
      <h4 className="text-base font-bold text-white">{title}</h4>
      <p className="text-xs text-slate-400">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
