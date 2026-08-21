import React, { useState } from 'react';
import { StatCard } from '../../components/common/StatCard';
import {
  CheckSquare,
  Calendar,
  FileText,
  MessageSquare,
  Clock,
  Sparkles,
  Search,
  X,
  Send,
  UserCheck,
  Zap,
  TrendingUp,
  Brain,
  Video,
} from 'lucide-react';

export const TeamDashboard = () => {
  // Global Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // AI Team Assistant Widget state
  const [aiWidgetOpen, setAiWidgetOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiChatMessages, setAiChatMessages] = useState([
    { text: 'Hello Teammate! Ask me to summarize sprint goals, inspect pitch deck task blockers, or generate standup notes.', isAi: true },
  ]);

  const sprintTasks = [
    { id: 1, title: 'Finalize Series Seed pitch deck slide 8', stage: 'In Progress', priority: 'High', due: 'Tomorrow' },
    { id: 2, title: 'Implement Socket.IO real-time notification listener', stage: 'Completed', priority: 'Medium', due: 'Yesterday' },
    { id: 3, title: 'Prepare Q3 financial runway audit report', stage: 'Backlog', priority: 'High', due: 'In 3 days' },
    { id: 4, title: 'Audit cap table dilution model for Series Seed', stage: 'In Progress', priority: 'High', due: 'Today' },
  ];

  const teamEvents = [
    { time: '10:00 AM Today', title: 'Daily Engineering & Pitch Standup', link: 'https://meet.google.com' },
    { time: '03:00 PM Friday', title: 'Series Seed Investor Presentation Trial Run', link: 'https://meet.google.com' },
  ];

  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    const userMsg = aiPrompt;
    setAiChatMessages((prev) => [...prev, { text: userMsg, isAi: false }]);
    setAiPrompt('');
    setTimeout(() => {
      setAiChatMessages((prev) => [
        ...prev,
        {
          text: `Sprint Analysis: 3 of 4 tasks for Sprint #14 are on track. Pitch deck slide 8 requires financial projection sign-off from Founder.`,
          isAi: true,
        },
      ]);
    }, 600);
  };

  return (
    <div className="space-y-8 pb-24 relative max-w-6xl mx-auto">
      {/* 1. HERO BANNER ⭐⭐⭐⭐⭐ */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-6 sm:p-8 rounded-3xl border border-indigo-500/20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Startup Team Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">Good Morning, Team Lead 👋</h1>
          <p className="text-xs text-indigo-300 font-bold mt-0.5">Sprint #14 — Series Seed Preparation</p>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Track agile sprint tasks, participate in daily standups, access founder pitch deck vaults, and execute growth deliverables.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-semibold text-slate-300">
            <span className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">Sprint Velocity: <strong className="text-emerald-400">94% On-Time</strong></span>
            <span className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">Assigned Deliverables: <strong className="text-indigo-400">8 Sprint Tasks</strong></span>
          </div>
        </div>

        {/* Global Search Shortcut */}
        <button
          onClick={() => setSearchOpen(true)}
          className="w-full lg:w-auto px-4 py-2.5 bg-slate-800/90 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4 text-indigo-400" /> Search Tasks & Shared Vault... <kbd className="bg-slate-950 px-2 py-0.5 rounded text-[10px] text-slate-400">Ctrl + K</kbd>
        </button>
      </div>

      {/* 2. KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Assigned Tasks" value="8 Sprint Tasks" change="2 high priority" icon={CheckSquare} color="indigo" />
        <StatCard title="Team Milestones" value="4 Active" change="1 due this week" icon={Clock} color="purple" />
        <StatCard title="Shared Vault Docs" value="24 Vault Files" change="Uploaded by CEO" icon={FileText} color="emerald" />
        <StatCard title="Internal Discussions" value="12 Threads" change="5 unread messages" icon={MessageSquare} color="amber" />
      </div>

      {/* 3. AGILE SPRINT KANBAN & 4. TEAM CALENDAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-indigo-400" /> Agile Sprint Board (Sprint #14)
            </h3>
            <span className="text-xs text-indigo-400 font-bold">8 Tasks Enrolled</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 block border-b border-slate-800 pb-1">Backlog / Pending</span>
              {sprintTasks.filter((t) => t.stage === 'Backlog').map((t) => (
                <div key={t.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <h4 className="font-bold text-white text-xs">{t.title}</h4>
                  <span className="text-rose-400 text-[10px] font-bold block">Priority: {t.priority}</span>
                </div>
              ))}
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-indigo-400 block border-b border-slate-800 pb-1">In Progress</span>
              {sprintTasks.filter((t) => t.stage === 'In Progress').map((t) => (
                <div key={t.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <h4 className="font-bold text-white text-xs">{t.title}</h4>
                  <span className="text-indigo-300 text-[10px] font-bold block">Due: {t.due}</span>
                </div>
              ))}
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-emerald-400 block border-b border-slate-800 pb-1">Completed</span>
              {sprintTasks.filter((t) => t.stage === 'Completed').map((t) => (
                <div key={t.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <h4 className="font-bold text-slate-300 text-xs line-through">{t.title}</h4>
                  <span className="text-emerald-400 text-[10px] font-bold block">✓ Verified</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Calendar & Events */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" /> Daily Standups & Events
          </h3>
          <div className="space-y-2 text-xs">
            {teamEvents.map((evt, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-indigo-400 font-mono font-bold block">{evt.time}</span>
                <h4 className="font-bold text-white">{evt.title}</h4>
                <a
                  href={evt.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition text-center block"
                >
                  Join Meeting
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEARCH MODAL (CTRL + K) */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-4 shadow-2xl z-10 space-y-3">
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
              <Search className="w-4 h-4 text-indigo-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Sprint Tasks, Shared Vault Files, Standup Notes..."
                className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
              />
              <button onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1 text-xs text-slate-400 p-2">
              <p className="text-[10px] uppercase font-bold text-slate-500">Quick Searches</p>
              <div className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer text-white font-bold">Finalize Series Seed pitch deck slide 8</div>
              <div className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer text-white font-bold">Daily Engineering & Pitch Standup (10:00 AM)</div>
              <div className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer text-white font-bold">Cap Table Dilution Model FY26.xlsx</div>
            </div>
          </div>
        </div>
      )}

      {/* AI TEAM ASSISTANT FLOATING WIDGET */}
      <div className="fixed bottom-6 right-6 z-40">
        {!aiWidgetOpen ? (
          <button
            onClick={() => setAiWidgetOpen(true)}
            className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs rounded-full shadow-2xl transition flex items-center gap-2 animate-bounce"
          >
            <Sparkles className="w-4 h-4 text-amber-300 fill-current" /> AI Team Co-Pilot
          </button>
        ) : (
          <div className="w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-white text-xs">VentureHub AI Team Co-Pilot</span>
              </div>
              <button onClick={() => setAiWidgetOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-48 overflow-y-auto space-y-2 p-2 bg-slate-950 rounded-xl text-xs">
              {aiChatMessages.map((msg, idx) => (
                <div key={idx} className={`p-2 rounded-xl max-w-[85%] ${msg.isAi ? 'bg-indigo-950/80 text-indigo-200 border border-indigo-500/20' : 'bg-slate-800 text-white ml-auto'}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleAiSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ask about sprint tasks or pitch deck..."
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
              <button type="submit" className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
