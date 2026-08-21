import React from 'react';
import { Rocket, FileText, DollarSign, Users, Sparkles, CheckCircle2 } from 'lucide-react';

export const ActivityTimeline = ({ events }) => {
  const defaultEvents = [
    { type: 'startup', title: 'Startup Profile Created', desc: 'NexusAI Solutions profile verified by Admin', time: '2 hours ago', icon: Rocket, color: 'text-indigo-400 border-indigo-500/30' },
    { type: 'deck', title: 'Pitch Deck Uploaded', desc: 'Series Seed deck PDF verified & indexed', time: '1 day ago', icon: FileText, color: 'text-emerald-400 border-emerald-500/30' },
    { type: 'funding', title: 'Funding Offer Received', desc: '₹20L equity term sheet signed by Peak XV', time: '2 days ago', icon: DollarSign, color: 'text-amber-400 border-amber-500/30' },
    { type: 'mentor', title: 'Mentorship Session Completed', desc: 'GTM & SaaS pricing advisory with Vikram', time: '3 days ago', icon: Users, color: 'text-purple-400 border-purple-500/30' },
  ];

  const list = events && events.length > 0 ? events : defaultEvents;

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" /> Platform Activity Timeline & Audit Logs
        </h3>
        <span className="text-xs text-slate-400">Live Updates</span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
        {list.map((evt, idx) => {
          const Icon = evt.icon || CheckCircle2;
          return (
            <div key={idx} className="relative flex items-start justify-between gap-4">
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center">
                <Icon className={`w-3 h-3 ${evt.color || 'text-indigo-400'}`} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{evt.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{evt.desc}</p>
              </div>
              <span className="text-[10px] text-slate-500 font-medium shrink-0">{evt.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
