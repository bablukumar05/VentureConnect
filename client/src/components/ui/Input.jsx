import React from 'react';

export const Input = ({
  label,
  error,
  icon: Icon,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          className={`w-full bg-slate-950 border ${
            error ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
          } rounded-xl ${Icon ? 'pl-9' : 'px-3'} py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-[10px] text-rose-400 font-semibold">{error}</p>}
    </div>
  );
};
