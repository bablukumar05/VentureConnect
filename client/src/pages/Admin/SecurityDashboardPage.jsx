import React from 'react';
import { StatCard } from '../../components/common/StatCard';
import { ShieldCheck, ShieldAlert, Cpu, Lock, ToggleRight, Server, Activity } from 'lucide-react';

export const SecurityDashboardPage = () => {
  const flags = [
    { name: 'AI Startup Neural Analyzer', status: true, description: 'Deep learning SWOT & market analysis module' },
    { name: 'Automated Investor Match Engine', status: true, description: '5-part weighted scoring algorithm (30/25/15/20/10)' },
    { name: 'E-Sign Term Sheet Contracts', status: true, description: 'Digital signature vault for investment rounds' },
    { name: 'Fraud Detection Engine', status: true, description: 'Automated IP anomaly & pitch deck plagiarism filter' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-rose-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Super Admin Governance</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Security Dashboard & Fraud Detection</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Monitor real-time system health, feature flags, global platform threat vectors, and AI engine performance.
          </p>
        </div>

        <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold text-xs rounded-xl flex items-center gap-2">
          <Activity className="w-4 h-4" /> All Systems Operational
        </span>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Security Threat Index" value="0 Critical" change="99.9% uptime" icon={ShieldCheck} color="emerald" />
        <StatCard title="Fraud Alerts" value="0 Active" change="2 blocked yesterday" icon={ShieldAlert} color="rose" />
        <StatCard title="Active Feature Flags" value="4 Modules" change="All features enabled" icon={Lock} color="indigo" />
        <StatCard title="API Traffic Load" value="1.4M Requests" change="Avg response 18ms" icon={Server} color="purple" />
      </div>

      {/* Feature Flags Management */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" /> Platform Configuration & Feature Management Flags
          </h3>
        </div>

        <div className="space-y-3">
          {flags.map((flag, idx) => (
            <div key={idx} className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">{flag.name}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{flag.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400">ACTIVE</span>
                <ToggleRight className="w-7 h-7 text-indigo-500 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
