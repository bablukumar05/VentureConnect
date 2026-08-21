import React from 'react';
import { formatCurrencyINR } from '../../utils/formatters';
import { TrendingUp, Users, DollarSign, Clock, ShieldCheck } from 'lucide-react';

export const FundingProgressBar = ({ summary, onAddDeal }) => {
  if (!summary) return null;

  const { totalGoal = 5000000, totalRaised = 3200000, percentage = 64, investorsCount = 5, avgInvestment = 640000, remaining = 1800000 } = summary;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">Funding Progress</span>
          <h3 className="text-2xl font-extrabold text-white mt-1">
            {formatCurrencyINR(totalRaised)} <span className="text-slate-400 font-normal text-lg">/ {formatCurrencyINR(totalGoal)}</span>
          </h3>
        </div>
        {onAddDeal && (
          <button
            onClick={onAddDeal}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition shadow-lg shadow-emerald-600/30 flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" /> Record New Investment Deal
          </button>
        )}
      </div>

      {/* Visual Progress Bar */}
      <div>
        <div className="flex justify-between text-xs font-bold mb-2">
          <span className="text-slate-300">Goal Completion Rate</span>
          <span className="text-emerald-400 font-mono text-sm">{percentage}% Raised</span>
        </div>
        <div className="w-full bg-slate-950 h-4 rounded-full overflow-hidden p-1 border border-slate-800">
          <div
            className="bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400 h-full rounded-full transition-all duration-1000 shadow-md shadow-emerald-500/30"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* 4 Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-2 border-t border-slate-800">
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>Participating Investors</span>
          </div>
          <p className="text-lg font-bold text-white mt-1">{investorsCount}</p>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Average Check Size</span>
          </div>
          <p className="text-lg font-bold text-white mt-1">{formatCurrencyINR(avgInvestment)}</p>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 col-span-2 lg:col-span-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Remaining Target</span>
          </div>
          <p className="text-lg font-bold text-amber-400 mt-1">{formatCurrencyINR(remaining)}</p>
        </div>
      </div>
    </div>
  );
};
