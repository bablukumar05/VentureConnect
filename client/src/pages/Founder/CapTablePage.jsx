import React from 'react';
import { StatCard } from '../../components/common/StatCard';
import { PieChart, DollarSign, Users, Lock } from 'lucide-react';

export const CapTablePage = () => {
  const shareholders = [
    { name: 'Aarav Sharma (Founder)', type: 'Founder Common', shares: 5200000, equity: 52.0, valuation: '₹26 Cr' },
    { name: 'Rohan Deshmukh (Co-Founder)', type: 'Founder Common', shares: 2400000, equity: 24.0, valuation: '₹12 Cr' },
    { name: 'Peak XV Partners (Angel)', type: 'Angel Preferred', shares: 1400000, equity: 14.0, valuation: '₹7 Cr' },
    { name: 'ESOP Talent Pool', type: 'ESOP Pool', shares: 1000000, equity: 10.0, valuation: '₹5 Cr' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Equity & Legal Center</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Cap Table & Exit Strategy Planner</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Real-time equity distribution, shareholder registry, ESOP pool management, and virtual due diligence data room.
          </p>
        </div>

        <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl transition shadow-lg shadow-emerald-600/30 flex items-center gap-2">
          <PieChart className="w-4 h-4" /> Issue Share Grant
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Post-Money Valuation" value="₹50.0 Cr" change="Series Seed tier" icon={DollarSign} color="emerald" />
        <StatCard title="Total Shares Issued" value="10,000,000" change="Common & Preferred" icon={PieChart} color="indigo" />
        <StatCard title="ESOP Pool Remaining" value="10.0% Equity" change="1,000,000 shares" icon={Users} color="purple" />
        <StatCard title="Due Diligence Vault" value="18 Documents" change="Fully encrypted" icon={Lock} color="amber" />
      </div>

      {/* Shareholder Table */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <PieChart className="w-5 h-5 text-emerald-400" /> Shareholder Registry & Equity Breakdown
          </h3>
          <span className="text-xs font-bold text-slate-400">Total Authorized: 10,000,000 Shares</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-700">
              <tr>
                <th className="p-3">Shareholder</th>
                <th className="p-3">Share Class</th>
                <th className="p-3">Shares Count</th>
                <th className="p-3">Ownership %</th>
                <th className="p-3 text-right">Estimated Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {shareholders.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-bold text-white">{s.name}</td>
                  <td className="p-3 font-semibold text-indigo-300">{s.type}</td>
                  <td className="p-3 font-mono">{s.shares.toLocaleString()}</td>
                  <td className="p-3 font-bold text-emerald-400">{s.equity.toFixed(1)}%</td>
                  <td className="p-3 text-right font-bold text-white">{s.valuation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
