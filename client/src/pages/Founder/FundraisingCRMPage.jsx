import React, { useState } from 'react';
import { StatCard } from '../../components/common/StatCard';
import { Users, Calendar, Sparkles, CheckCircle2, DollarSign, PlusCircle } from 'lucide-react';

export const FundraisingCRMPage = () => {
  const [pipeline, setPipeline] = useState([
    { id: 1, name: 'Peak XV Partners (Sequoia India)', firm: 'VC Fund', target: '₹20,00,000', stage: 'Funded', notes: 'Lead investor term sheet executed.' },
    { id: 2, name: 'Blume Ventures', firm: 'Early Stage VC', target: '₹15,00,000', stage: 'Due Diligence', notes: 'Diligence vault access granted.' },
    { id: 3, name: 'Kalaari Capital', firm: 'SaaS Fund', target: '₹10,00,000', stage: 'Interested', notes: 'Partner meeting scheduled.' },
    { id: 4, name: 'Angel Syndicate Alpha', firm: 'Angel Network', target: '₹5,00,000', stage: 'Meeting Scheduled', notes: 'Intro pitch deck sent.' },
    { id: 5, name: 'Nexus Venture Partners', firm: 'DeepTech Fund', target: '₹25,00,000', stage: 'Contacted', notes: 'Outreach cold email sent.' },
  ]);

  const stages = ['Contacted', 'Meeting Scheduled', 'Interested', 'Due Diligence', 'Funded'];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-emerald-950 p-6 sm:p-8 rounded-3xl border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Fundraising Management</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Fundraising CRM & Pipeline Tracker</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Track investor outreach stages from initial contact to term sheet execution and closed funding.
          </p>
        </div>

        <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> Add Investor Lead
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Investors Contacted" value="50 Investors" change="Outreach campaign active" icon={Users} color="indigo" />
        <StatCard title="Meetings Scheduled" value="12 Meetings" change="4 partner calls this week" icon={Calendar} color="purple" />
        <StatCard title="Interested Investors" value="4 Interested" change="Term sheet discussions" icon={Sparkles} color="amber" />
        <StatCard title="Funding Closed" value="1 Funded (₹20L)" change="Lead angel finalized" icon={CheckCircle2} color="emerald" />
      </div>

      {/* Kanban Pipeline Stage View */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" /> Investor Deal Flow Pipeline
          </h3>
          <span className="text-xs text-slate-400">Total Goal: ₹50,00,000</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {stages.map((stg) => {
            const stageDeals = pipeline.filter((d) => d.stage === stg);
            return (
              <div key={stg} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-300">{stg}</span>
                  <span className="text-[10px] bg-slate-800 text-slate-400 font-bold px-2 py-0.5 rounded-full">
                    {stageDeals.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {stageDeals.map((deal) => (
                    <div key={deal.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                      <h4 className="text-xs font-bold text-white">{deal.name}</h4>
                      <p className="text-[10px] text-indigo-400 font-semibold">{deal.firm}</p>
                      <p className="text-xs font-extrabold text-emerald-400">{deal.target}</p>
                      <p className="text-[10px] text-slate-400 truncate">{deal.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
