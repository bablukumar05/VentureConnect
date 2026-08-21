import React from 'react';

export const LoadingSkeleton = ({ count = 3, height = 'h-20' }) => {
  return (
    <div className="space-y-3 w-full animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className={`bg-slate-800/60 border border-slate-700/40 rounded-2xl ${height}`} />
      ))}
    </div>
  );
};
