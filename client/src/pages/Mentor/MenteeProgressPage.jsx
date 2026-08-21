import React from 'react';
import { UserCheck, CheckSquare, Square } from 'lucide-react';

export const MenteeProgressPage = () => {
  const mentees = [
    {
      name: 'Aarav Sharma',
      startup: 'NexusAI Solutions',
      tasks: [
        { title: 'Prepare enterprise pitch deck script', completed: true },
        { title: 'Draft outbound cold email template for CTOs', completed: false },
        { title: 'Calculate LTV:CAC ratio by customer segment', completed: false },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-amber-400" /> Mentee Progress & Tasks
        </h2>
        <p className="text-xs text-slate-400 mt-1">Track 30-day goals and action items assigned to mentees.</p>
      </div>

      <div className="space-y-6">
        {mentees.map((mentee, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-lg">{mentee.name}</h3>
                <p className="text-xs text-indigo-400 font-semibold">{mentee.startup}</p>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold">
                1/3 Tasks Completed
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Assigned Action Items</p>
              {mentee.tasks.map((task, tIdx) => (
                <div key={tIdx} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center gap-3 text-xs">
                  {task.completed ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                  <span className={task.completed ? 'line-through text-slate-500' : 'text-slate-200'}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
