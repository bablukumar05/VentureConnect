import React from 'react';
import { StatCard } from '../../components/common/StatCard';
import { FileCheck, Shield, GitCompare, FileText, CheckCircle2, Download } from 'lucide-react';

export const DueDiligencePage = () => {
  const documents = [
    { title: 'Audited Financial Statements FY25', category: 'Finance', status: 'Verified', date: '12 Aug 2026' },
    { title: 'SHA & Certificate of Incorporation', category: 'Legal', status: 'Verified', date: '15 Aug 2026' },
    { title: 'Cap Table Shareholder Register', category: 'Equity', status: 'Verified', date: '18 Aug 2026' },
    { title: 'Intellectual Property & Patent Assignment', category: 'IP / Tech', status: 'Verified', date: '19 Aug 2026' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-purple-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Investor Workspace</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Due Diligence & E-Sign Vault</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Audit startup legal contracts, perform side-by-side startup comparisons, and execute e-signed investment term sheets.
          </p>
        </div>

        <button className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-xl transition shadow-lg shadow-purple-600/30 flex items-center gap-2">
          <GitCompare className="w-4 h-4" /> Launch Startup Comparison Tool
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Deal Flow" value="6 Startups" change="2 in final diligence" icon={FileCheck} color="purple" />
        <StatCard title="Term Sheets Sent" value="3 Drafted" change="1 e-signed" icon={FileText} color="emerald" />
        <StatCard title="Risk Score Rating" value="Low Risk (18)" change="Top 10% tier" icon={Shield} color="indigo" />
        <StatCard title="Diligent Vault Docs" value="18 Verified" change="Full access" icon={CheckCircle2} color="amber" />
      </div>

      {/* Due Diligence Vault */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-400" /> NexusAI Solutions — Verified Diligence Vault
          </h3>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            Diligence Pass Rating: 98%
          </span>
        </div>

        <div className="space-y-3">
          {documents.map((doc, idx) => (
            <div key={idx} className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{doc.category}</span>
                <h4 className="text-sm font-bold text-white mt-0.5">{doc.title}</h4>
                <p className="text-xs text-slate-400 mt-1">Uploaded: {doc.date}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-bold rounded-full">
                  {doc.status}
                </span>
                <button className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
