import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { StatCard } from '../../components/common/StatCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  Building2,
  Users,
  Award,
  Clock,
  PlusCircle,
  TrendingUp,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Layers,
  Sparkles,
  Search,
  Check,
  X,
  Send,
  UserCheck,
  DollarSign,
  Flame,
} from 'lucide-react';

export const IncubatorDashboard = () => {
  const [cohorts, setCohorts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search Modal state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Evaluation Modal state
  const [evalModal, setEvalModal] = useState(false);

  // AI Program Assistant Widget state
  const [aiWidgetOpen, setAiWidgetOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiChatMessages, setAiChatMessages] = useState([
    { text: 'Hello Program Manager! Ask me to identify at-risk startups, recommend mentor allocations, or summarize cohort progress.', isAi: true },
  ]);

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const res = await API.get('/incubator/cohorts');
        setCohorts(res.data.cohorts || []);
      } catch (err) {
        console.error('Fetch cohorts error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCohorts();
  }, []);

  if (isLoading) return <LoadingSpinner label="Loading Accelerator Program Command Center..." />;

  // 1. Hero Data
  const cohortName = 'Startup Accelerator — Summer 2026';
  const activeCohortCount = 32;
  const totalApplications = 184;
  const mentorsCount = 18;
  const demoDayDays = 24;
  const cohortProgressPercent = 82;

  // 3. Application Pipeline
  const applicationFunnel = [
    { stage: 'New', count: 86, color: 'text-slate-300' },
    { stage: 'Under Review', count: 42, color: 'text-indigo-400' },
    { stage: 'Shortlisted', count: 28, color: 'text-amber-400' },
    { stage: 'Interview', count: 16, countColor: 'text-purple-400' },
    { stage: 'Accepted', count: 12, color: 'text-emerald-400' },
    { stage: 'Rejected', count: 72, color: 'text-rose-400' },
  ];

  // 6. Cohort Startups Health Grid
  const cohortStartups = [
    { name: 'AIHire (NexusAI)', health: 89, progress: '82%', stage: 'Seed Stage', status: 'On Track', color: 'text-emerald-400' },
    { name: 'HealthPulse MedTech', health: 81, progress: '74%', stage: 'Pre-Seed', status: 'Needs Attention', color: 'text-amber-400' },
    { name: 'FinTechX Labs', health: 92, progress: '91%', stage: 'Seed Stage', status: 'On Track', color: 'text-emerald-400' },
    { name: 'EduTech Interactive', health: 76, progress: '63%', stage: 'MVP Stage', status: 'At Risk', color: 'text-rose-400' },
  ];

  // 7. Recommended Mentors
  const recommendedMentors = [
    { name: 'Rohit Sharma', expertise: 'Fundraising & VC Term Sheets', match: '94%' },
    { name: 'Ankit Verma', expertise: 'Product GTM & Enterprise Sales', match: '89%' },
  ];

  // 8. Milestones & Roadmap
  const milestones = [
    { week: 'Week 1', title: 'Orientation & Onboarding', status: 'completed' },
    { week: 'Week 2', title: 'Problem Statement Validation', status: 'completed' },
    { week: 'Week 4', title: 'MVP Review & Product Launch', status: 'completed' },
    { week: 'Week 6', title: 'Investor Readiness Audit', status: 'current' },
    { week: 'Week 8', title: 'Demo Day Pitch Practice', status: 'pending' },
    { week: 'Week 10', title: 'Graduation & Investor Introductions', status: 'pending' },
  ];

  // 9. Demo Day Pitch Slots
  const demoDaySlots = [
    { time: '10:00 AM', startup: 'AIHire (NexusAI Solutions)', founder: 'Aarav Sharma' },
    { time: '10:10 AM', startup: 'HealthPulse MedTech', founder: 'Priya Patel' },
    { time: '10:20 AM', startup: 'FinTechX Labs', founder: 'Aman Gupta' },
  ];

  // Recharts Growth Data
  const growthTrajectoryData = [
    { month: 'Month 1', score: 62 },
    { month: 'Month 2', score: 71 },
    { month: 'Month 3', score: 82 },
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
          text: `Insight: EduTech Interactive is currently At Risk (Health Score: 76). Recommended: Assign Growth Mentor Ankit Verma to refine product retention metrics before Demo Day.`,
          isAi: true,
        },
      ]);
    }, 600);
  };

  return (
    <div className="space-y-8 pb-24 relative">
      {/* 1. PROGRAM COMMAND CENTER HERO ⭐⭐⭐⭐⭐ */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-emerald-500/20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Incubator Program Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">Good Morning, Program Manager 👋</h1>
          <p className="text-xs text-indigo-300 font-bold mt-0.5">{cohortName}</p>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Orchestrate startup application screening, cohort milestone tracking, mentor office hour allocations, and Demo Day pitch prep.
          </p>

          <div className="w-full max-w-md bg-slate-950 p-2.5 rounded-xl border border-slate-800 mt-3 space-y-1">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-slate-300">Cohort Completion Progress</span>
              <span className="text-emerald-400">{cohortProgressPercent}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${cohortProgressPercent}%` }} />
            </div>
          </div>
        </div>

        {/* Header Summary Box & Search Shortcut */}
        <div className="flex flex-col items-end gap-3 w-full lg:w-auto">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full lg:w-auto px-4 py-2.5 bg-slate-800/90 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 text-emerald-400" /> Search Applications & Cohorts... <kbd className="bg-slate-950 px-2 py-0.5 rounded text-[10px] text-slate-400">Ctrl + K</kbd>
          </button>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs w-full">
            <div><span className="text-[10px] text-slate-400 uppercase font-bold block">Active Cohort</span><strong className="text-white text-base font-black">{activeCohortCount}</strong></div>
            <div><span className="text-[10px] text-slate-400 uppercase font-bold block">Applications</span><strong className="text-indigo-400 text-base font-black">{totalApplications}</strong></div>
            <div><span className="text-[10px] text-slate-400 uppercase font-bold block">Mentors</span><strong className="text-purple-400 text-base font-black">{mentorsCount}</strong></div>
            <div><span className="text-[10px] text-slate-400 uppercase font-bold block">Demo Day</span><strong className="text-amber-400 text-base font-black">{demoDayDays} Days</strong></div>
          </div>
        </div>
      </div>

      {/* 2. PROGRAM KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Applications" value={totalApplications.toString()} change="▲ 18% volume" icon={Clock} color="indigo" />
        <StatCard title="Selected Startups" value={`${activeCohortCount} Enrolled`} change="Top 17% Batch" icon={Building2} color="emerald" />
        <StatCard title="Active Startups" value="29 Startups" change="On-track status" icon={UserCheck} color="purple" />
        <StatCard title="Graduated" value="18 Alumni" change="92% Success rate" icon={Award} color="amber" />
        <StatCard title="Funding Raised" value="₹2.4 Crore" change="▲ 24% growth" icon={DollarSign} color="rose" />
      </div>

      {/* 3. APPLICATION MANAGEMENT PIPELINE ⭐⭐⭐⭐⭐ */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" /> Incoming Application Screening Funnel
          </h3>
          <span className="text-xs text-indigo-400 font-bold">{totalApplications} Total Applications Received</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center text-xs">
          {applicationFunnel.map((fn, idx) => (
            <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block">{fn.stage}</span>
              <strong className={`text-xl font-black block ${fn.color || 'text-white'}`}>{fn.count}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* 6. STARTUP COHORT VIEW GRID & 7. MENTOR ALLOCATION SYSTEM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-400" /> Cohort Startup Health & Progress Grid
            </h3>
            <button
              onClick={() => setEvalModal(true)}
              className="text-xs font-bold text-indigo-400 hover:underline"
            >
              Open Evaluation Scorecard →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="pb-3">Startup Name</th>
                  <th className="pb-3">Stage</th>
                  <th className="pb-3">Health Score</th>
                  <th className="pb-3">Milestone Progress</th>
                  <th className="pb-3">Cohort Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {cohortStartups.map((st, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 font-bold text-white">{st.name}</td>
                    <td className="py-3 font-semibold text-indigo-300">{st.stage}</td>
                    <td className="py-3 font-mono font-bold text-white">{st.health} / 100</td>
                    <td className="py-3 font-mono text-slate-200">{st.progress}</td>
                    <td className="py-3 font-bold">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] bg-slate-950 border border-slate-800 ${st.color}`}>
                        {st.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 7. Mentor Allocation System */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-purple-400" /> AI Recommended Mentor Allocation
          </h3>
          <div className="space-y-3 text-xs">
            {recommendedMentors.map((m, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white">{m.name}</h4>
                  <span className="text-emerald-400 font-bold">{m.match} Match</span>
                </div>
                <p className="text-slate-400">{m.expertise}</p>
                <button className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition">
                  Assign Mentor to Cohort
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 8. COHORT MILESTONES & 9. DEMO DAY MANAGEMENT ⭐⭐⭐⭐⭐ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cohort Milestones */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Accelerator Program Roadmap & Milestones
          </h3>
          <div className="space-y-2 text-xs">
            {milestones.map((ms, idx) => (
              <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-indigo-400 font-bold block">{ms.week}</span>
                  <span className="text-slate-200">{ms.title}</span>
                </div>
                <span className="font-bold">
                  {ms.status === 'completed' ? '✓ Completed' : ms.status === 'current' ? '⚡ Active' : '⏳ Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 9. Demo Day Management */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" /> Demo Day Pitch Schedule
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">24 September 2026 • 32 Startups • 48 Investors Attending</p>
            </div>
            <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold">
              24 Days Left
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {demoDaySlots.map((slot, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-slate-900 text-amber-400 font-mono font-bold rounded-lg">{slot.time}</span>
                  <div>
                    <h4 className="font-bold text-white">{slot.startup}</h4>
                    <p className="text-slate-400 text-[10px]">Founder: {slot.founder}</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] rounded-lg transition">
                  Pitch Deck
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 11. PROGRAM ANALYTICS CHARTS */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" /> Cohort Average Startup Health Score Trajectory
        </h3>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthTrajectoryData}>
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} fill="#10b981" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. EVALUATION SCORECARD MODAL */}
      {evalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setEvalModal(false)} />
          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl z-10 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-400" /> AI Startup Evaluation Scorecard — AIHire
              </h3>
              <button onClick={() => setEvalModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
              <div className="p-2 bg-slate-950 rounded-xl border border-slate-800"><span className="text-slate-400 block text-[10px]">Founder</span><strong className="text-white text-sm">88</strong></div>
              <div className="p-2 bg-slate-950 rounded-xl border border-slate-800"><span className="text-slate-400 block text-[10px]">Market</span><strong className="text-white text-sm">91</strong></div>
              <div className="p-2 bg-slate-950 rounded-xl border border-slate-800"><span className="text-slate-400 block text-[10px]">Product</span><strong className="text-white text-sm">84</strong></div>
              <div className="p-2 bg-slate-950 rounded-xl border border-slate-800"><span className="text-slate-400 block text-[10px]">Traction</span><strong className="text-white text-sm">79</strong></div>
              <div className="p-2 bg-slate-950 rounded-xl border border-slate-800"><span className="text-slate-400 block text-[10px]">Team</span><strong className="text-white text-sm">92</strong></div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400 block">Strengths:</span>
              <p className="text-slate-300">✓ Experienced technical team ex-Google ML</p>
              <p className="text-slate-300">✓ Growing B2B enterprise pilot customer base</p>
            </div>

            <div className="flex gap-2 pt-2">
              <button onClick={() => setEvalModal(false)} className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition text-center">
                Shortlist Application
              </button>
              <button onClick={() => setEvalModal(false)} className="py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold rounded-xl transition">
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH MODAL (CTRL + K) */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-4 shadow-2xl z-10 space-y-3">
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
              <Search className="w-4 h-4 text-emerald-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Applications, Startups, Mentors, Demo Day Slots..."
                className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
              />
              <button onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1 text-xs text-slate-400 p-2">
              <p className="text-[10px] uppercase font-bold text-slate-500">Quick Searches</p>
              <div className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer text-white font-bold">Summer 2026 Cohort (Active Batch)</div>
              <div className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer text-white font-bold">AIHire (Evaluation Scorecard 87/100)</div>
              <div className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer text-white font-bold">Demo Day 24 Sept Pitch Schedule</div>
            </div>
          </div>
        </div>
      )}

      {/* 20. AI PROGRAM ASSISTANT FLOATING WIDGET */}
      <div className="fixed bottom-6 right-6 z-40">
        {!aiWidgetOpen ? (
          <button
            onClick={() => setAiWidgetOpen(true)}
            className="px-4 py-3 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-full shadow-2xl transition flex items-center gap-2 animate-bounce"
          >
            <Sparkles className="w-4 h-4 text-amber-300 fill-current" /> AI Program Co-Pilot
          </button>
        ) : (
          <div className="w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-xs">VentureHub AI Program Co-Pilot</span>
              </div>
              <button onClick={() => setAiWidgetOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-48 overflow-y-auto space-y-2 p-2 bg-slate-950 rounded-xl text-xs">
              {aiChatMessages.map((msg, idx) => (
                <div key={idx} className={`p-2 rounded-xl max-w-[85%] ${msg.isAi ? 'bg-emerald-950/80 text-emerald-200 border border-emerald-500/20' : 'bg-slate-800 text-white ml-auto'}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleAiSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ask which startups are at risk..."
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
              <button type="submit" className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
