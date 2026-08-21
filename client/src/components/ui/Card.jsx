import React from 'react';

export const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div
      className={`bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl ${
        hover ? 'hover:border-slate-700 transition' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
