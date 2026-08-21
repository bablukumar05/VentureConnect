import React from 'react';

export const StatCard = ({ title, value, change, icon: Icon, color = 'indigo' }) => {
  const colorMap = {
    indigo: 'from-indigo-500/20 to-indigo-600/5 text-indigo-400 border-indigo-500/30',
    emerald: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/30',
    amber: 'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/30',
    purple: 'from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/30',
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group hover:border-slate-700 transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
          <h4 className="text-2xl font-extrabold text-white mt-1">{value}</h4>
          {change && (
            <p className="text-xs font-medium text-emerald-400 mt-1 flex items-center gap-1">
              <span>↑</span> {change}
            </p>
          )}
        </div>
        {Icon && (
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[color]} border flex items-center justify-center`}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};
