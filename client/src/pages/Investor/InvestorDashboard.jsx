import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { StatCard } from '../../components/common/StatCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { formatCurrencyINR, formatDate } from '../../utils/formatters';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart as RePieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Briefcase,
  Sparkles,
  Search,
  DollarSign,
  ArrowRight,
  TrendingUp,
  Brain,
  ShieldCheck,
  Eye,
  Bookmark,
  Calendar,
  Layers,
  FileText,
  Clock,
  Bell,
  X,
  Send,
  Building2,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Globe,
  SlidersHorizontal,
  ChevronRight,
  Check,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const InvestorDashboard = () => {
  const { user } = useAuthStore();
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Global Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Comparison Tool state
  const [comparisonModal, setComparisonModal] = useState(false);

  // AI Research Assistant Widget state
  const [aiWidgetOpen, setAiWidgetOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiChatMessages, setAiChatMessages] = useState([
    { text: 'Hello Investor! Ask me to evaluate pitch decks, compare shortlisted startups, or filter AI deal flow.', isAi: true },
  ]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get('/matching/investor-recommendations');
        setMatches(res.data.matches || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (isLoading) return <LoadingSpinner label="Loading Investment Command Center..." />;

  const portfolioValue = '₹42,50,000';
  const activeDeals = 8;
  const watchlistCount = 24;
  const newMatchesCount = 12;

  // Portfolio Growth Data
  const portfolioGrowthData = [
    { month: 'Jan', value: 25 },
    { month: 'Feb', value: 28 },
    { month: 'Mar', value: 32 },
    { month: 'Apr', value: 37 },
    { month: 'May', value: 42.5 },
  ];

  const sectorDistribution = [
    { name: 'AI/ML', value: 35, color: '#6366f1' },
    { name: 'FinTech', value: 30, color: '#10b981' },
    { name: 'HealthTech', value: 20, color: '#a855f7' },
    { name: 'EdTech', value: 15, color: '#f59e0b' },
  ];

  // Deal Flow Kanban Pipeline Stages
  const kanbanPipeline = [
    { stage: 'Discovered', deals: ['AIHire', 'PayAI'] },
    { stage: 'Shortlisted', deals: ['FinTechX', 'GreenX'] },
    { stage: 'Contacted', deals: ['HealthPulse'] },
    { stage: 'Meeting', font: 'font-bold', deals: ['QuantumLabs'] },
    { stage: 'Due Diligence', deals: ['LogisticsPro'] },
    { stage: 'Invested', deals: ['EduTech Labs'] },
  ];

  // Due Diligence Checklist preview
  const dueDiligenceDocs = [
    { name: 'Pitch Deck & Exec Summary', status: 'completed' },
    { name: 'Audited Financial Statements FY25', status: 'completed' },
    { name: 'Cap Table & ESOP Ledger', status: 'completed' },
    { name: 'Business Plan & Unit Economics', status: 'completed' },
    { name: 'Legal Incorporation & IP Register', status: 'warning' },
    { name: 'Tax Compliance & GST Filings', status: 'completed' },
  ];

  // Comparison Grid Data
  const comparisonData = [
    { metric: 'AI Match Score', s1: '94%', s2: '89%', s3: '86%' },
    { metric: 'Monthly Revenue', s1: '₹4.2 Lakhs', s2: '₹3.1 Lakhs', s3: '₹5.6 Lakhs' },
    { metric: 'Growth Rate (MoM)', s1: '+24%', s2: '+19%', s3: '+31%' },
    { metric: 'Team Size', s1: '8 Members', s2: '6 Members', s3: '11 Members' },
    { metric: 'Funding Goal', s1: '₹20,00,000', s2: '₹15,00,000', s3: '₹40,00,000' },
    { metric: 'Unit Economics', s1: 'Positive LTV/CAC', s2: 'Break-even', s3: 'Profitable' },
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
          text: `Analysis complete: FinTechX leads with +31% MoM growth and profitable unit economics. AIHire holds the highest 94% thesis match score for your Seed portfolio.`,
          isAi: true,
        },
      ]);
    }, 600);
  };

  return (
    <div className="space-y-8 pb-24 relative">
      {/* 1. INVESTOR COMMAND CENTER HERO BANNER ⭐⭐⭐⭐⭐ */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-emerald-500/20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Institutional Deal Flow Console</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">Good Morning, Partner 👋</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Your Investment Command Center — Automated AI deal sourcing, multi-factor risk analysis, due diligence vault, and portfolio ledger.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-semibold text-slate-300">
            <span className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">Available Capital: <strong className="text-emerald-400">₹1.5 Cr</strong></span>
            <span className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">Stage: <strong className="text-indigo-400">Seed & Pre-Seed</strong></span>
            <span className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">Sectors: <strong className="text-purple-400">AI, FinTech, SaaS</strong></span>
          </div>
        </div>

        {/* Header Command Center Summary Box & Search */}
        <div className="flex flex-col items-end gap-3 w-full lg:w-auto">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full lg:w-auto px-4 py-2.5 bg-slate-800/90 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 text-emerald-400" /> Search Deals & Vault... <kbd className="bg-slate-950 px-2 py-0.5 rounded text-[10px] text-slate-400">Ctrl + K</kbd>
          </button>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs w-full">
            <div><span className="text-[10px] text-slate-400 uppercase font-bold block">Portfolio Value</span><strong className="text-emerald-400 text-base font-black">{portfolioValue}</strong></div>
            <div><span className="text-[10px] text-slate-400 uppercase font-bold block">Active Deals</span><strong className="text-white text-base font-black">{activeDeals}</strong></div>
            <div><span className="text-[10px] text-slate-400 uppercase font-bold block">Watchlist</span><strong className="text-indigo-400 text-base font-black">{watchlistCount}</strong></div>
            <div><span className="text-[10px] text-slate-400 uppercase font-bold block">New Matches</span><strong className="text-amber-400 text-base font-black">{newMatchesCount}</strong></div>
          </div>
        </div>
      </div>

      {/* 2. INVESTMENT KPI CARDS ⭐⭐⭐⭐⭐ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Portfolio Value" value={portfolioValue} change="▲ 14.2% returns" icon={DollarSign} color="emerald" />
        <StatCard title="Active Investments" value={`${activeDeals} Startups`} change="+2 this month" icon={Briefcase} color="indigo" />
        <StatCard title="Pending Deals" value="5 Deals" change="In Due Diligence" icon={Layers} color="purple" />
        <StatCard title="New Opportunities" value={`${newMatchesCount} Startups`} change="Top 90%+ match" icon={Sparkles} color="amber" />
      </div>

      {/* 3. AI STARTUP MATCH CENTER ⭐⭐⭐⭐⭐ */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">AI Sourced Thesis Matches</span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
              <Sparkles className="w-6 h-6 text-emerald-400" /> AI High-Match Startup Deals
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setComparisonModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-md"
            >
              <SlidersHorizontal className="w-4 h-4" /> Compare Startups Side-by-Side
            </button>
            <Link to="/investor/discover" className="text-xs font-bold text-emerald-400 hover:underline">
              Discover All →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase">AI/ML • Seed Stage</span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">NexusAI Solutions</h3>
                <p className="text-xs text-slate-400">Autonomous AI agents for enterprise workflow automation.</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-400">94%</span>
                <span className="text-[10px] text-slate-400 block font-bold">Thesis Match</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-slate-900 rounded-xl border border-slate-800"><span className="text-slate-400 text-[10px] block">Market Potential</span><strong className="text-white">91%</strong></div>
              <div className="p-2 bg-slate-900 rounded-xl border border-slate-800"><span className="text-slate-400 text-[10px] block">Team Strength</span><strong className="text-white">89%</strong></div>
              <div className="p-2 bg-slate-900 rounded-xl border border-slate-800"><span className="text-slate-400 text-[10px] block">Required Goal</span><strong className="text-emerald-400">₹20L</strong></div>
            </div>

            <div className="flex gap-3 pt-2">
              <Link to="/investor/discover" className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition text-center">
                View Pitch Deck & Details
              </Link>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700 transition flex items-center gap-1">
                <Bookmark className="w-3.5 h-3.5" /> Shortlist
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase">HealthTech • Pre-Seed</span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">HealthPulse MedTech</h3>
                <p className="text-xs text-slate-400">AI-driven diagnostic patient monitoring platform.</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-400">91%</span>
                <span className="text-[10px] text-slate-400 block font-bold">Thesis Match</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-slate-900 rounded-xl border border-slate-800"><span className="text-slate-400 text-[10px] block">Market Potential</span><strong className="text-white">88%</strong></div>
              <div className="p-2 bg-slate-900 rounded-xl border border-slate-800"><span className="text-slate-400 text-[10px] block">Team Strength</span><strong className="text-white">92%</strong></div>
              <div className="p-2 bg-slate-900 rounded-xl border border-slate-800"><span className="text-slate-400 text-[10px] block">Required Goal</span><strong className="text-emerald-400">₹15L</strong></div>
            </div>

            <div className="flex gap-3 pt-2">
              <Link to="/investor/discover" className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition text-center">
                View Pitch Deck & Details
              </Link>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700 transition flex items-center gap-1">
                <Bookmark className="w-3.5 h-3.5" /> Shortlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. INVESTMENT PIPELINE KANBAN & 13. UPCOMING MEETINGS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" /> Investment Deal Pipeline (Kanban Flow)
            </h3>
            <span className="text-xs text-slate-400">Drag-and-Drop Stages</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
            {kanbanPipeline.map((kp, idx) => (
              <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 block border-b border-slate-800 pb-1">{kp.stage}</span>
                <div className="space-y-1">
                  {kp.deals.map((d, dIdx) => (
                    <div key={dIdx} className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-white font-semibold text-[11px] truncate">
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 13. Meeting Center */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" /> Upcoming Partner Meetings
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">NexusAI Solutions Call</span>
                <span className="text-emerald-400 font-bold">Today 4:00 PM</span>
              </div>
              <p className="text-slate-400">Pitch deck review & term sheet evaluation</p>
              <button className="w-full mt-2 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition">
                Join Video Meeting
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">HealthPulse Partner Q&A</span>
                <span className="text-indigo-400 font-bold">Tomorrow 11:30 AM</span>
              </div>
              <p className="text-slate-400">Clinical trials & diagnostic growth verification</p>
            </div>
          </div>
        </div>
      </div>

      {/* 10. DUE DILIGENCE WORKSPACE & 5. WATCHLIST & ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Due Diligence Vault Workspace
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Active Audit: NexusAI Solutions — <strong className="text-emerald-400">78% Completed</strong></p>
            </div>
            <Link to="/investor/due-diligence" className="text-xs font-bold text-emerald-400 hover:underline">
              Open Full Diligence →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {dueDiligenceDocs.map((doc, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-200 font-semibold">{doc.name}</span>
                {doc.status === 'completed' ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Verified</span>
                ) : (
                  <span className="text-amber-400 font-bold flex items-center gap-1"><AlertTriangle className="w-4 h-4" /> Action Req.</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 5. Watchlist & Real-Time Alerts */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" /> Watchlist & Deal Alerts
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-white">🔔 HealthPulse MedTech</span>
              <p className="text-slate-400">Updated funding goal to ₹15,00,000</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400">🔔 NexusAI Solutions</span>
              <p className="text-slate-400">Uploaded new pitch deck V2.4</p>
            </div>
          </div>
        </div>
      </div>

      {/* 14. PORTFOLIO GROWTH & SECTOR DISTRIBUTION CHARTS (RECHARTS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" /> Portfolio Valuation Growth Trajectory (Lakhs INR)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioGrowthData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" /> Portfolio Sector Distribution
          </h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie data={sectorDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} dataKey="value">
                  {sectorDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 7. STARTUP COMPARISON MODAL */}
      {comparisonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setComparisonModal(false)} />
          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-indigo-400" /> Startup Comparison Matrix (Side-by-Side)
              </h3>
              <button onClick={() => setComparisonModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="pb-3">Metric</th>
                    <th className="pb-3 text-indigo-400">NexusAI Solutions</th>
                    <th className="pb-3 text-emerald-400">HealthPulse MedTech</th>
                    <th className="pb-3 text-purple-400">FinTechX Labs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 font-semibold text-slate-300">{row.metric}</td>
                      <td className="py-3 font-bold text-white">{row.s1}</td>
                      <td className="py-3 font-bold text-white">{row.s2}</td>
                      <td className="py-3 font-bold text-white">{row.s3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 19. GLOBAL COMMAND PALETTE (CTRL + K) SEARCH MODAL */}
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
                placeholder="Search Startups, Pitch Decks, Deals, Due Diligence Documents..."
                className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
              />
              <button onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1 text-xs text-slate-400 p-2">
              <p className="text-[10px] uppercase font-bold text-slate-500">Quick Search Shortcuts</p>
              <div className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer text-white font-bold">NexusAI Solutions (AI/ML Pitch Deck)</div>
              <div className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer text-white font-bold">HealthPulse MedTech (Due Diligence Vault)</div>
              <div className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer text-white font-bold">FinTechX Labs (Financial Model FY26)</div>
            </div>
          </div>
        </div>
      )}

      {/* 18. AI INVESTMENT RESEARCH ASSISTANT FLOATING WIDGET */}
      <div className="fixed bottom-6 right-6 z-40">
        {!aiWidgetOpen ? (
          <button
            onClick={() => setAiWidgetOpen(true)}
            className="px-4 py-3 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-full shadow-2xl transition flex items-center gap-2 animate-bounce"
          >
            <Sparkles className="w-4 h-4 text-amber-300 fill-current" /> AI Investment Co-Pilot
          </button>
        ) : (
          <div className="w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-xs">VentureHub AI Investment Co-Pilot</span>
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
                placeholder="Ask to evaluate pitch deck or compare startups..."
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
