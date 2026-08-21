import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { StatCard } from '../../components/common/StatCard';
import { ActivityTimeline } from '../../components/common/ActivityTimeline';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
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
  Rocket,
  Sparkles,
  Eye,
  Users,
  MessageSquare,
  DollarSign,
  ArrowRight,
  Brain,
  TrendingUp,
  Plus,
  FileText,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Bell,
  X,
  Send,
  Building2,
  Bookmark,
  Award,
  Globe,
  Clock,
  Search,
  CheckSquare,
  Activity,
  Folder,
  Layers,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FounderDashboard = () => {
  const { user } = useAuthStore();
  const [startup, setStartup] = useState(null);
  const [fundingSummary, setFundingSummary] = useState(null);
  const [unreadCount, setUnreadCount] = useState(7);
  const [mentorSessionsCount, setMentorSessionsCount] = useState(12);
  const [investorViews, setInvestorViews] = useState(145);
  const [isLoading, setIsLoading] = useState(true);

  // Global Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // AI Widget state
  const [aiWidgetOpen, setAiWidgetOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiChatMessages, setAiChatMessages] = useState([
    { text: 'Hi Bablu! How can I assist with your startup fundraising or profile scaling today?', isAi: true },
  ]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const startupRes = await API.get('/startups/my-startup');
        const st = startupRes.data.startup;
        setStartup(st);

        if (st) {
          const fundingRes = await API.get(`/funding/summary/${st._id}`).catch(() => null);
          if (fundingRes?.data?.summary) {
            setFundingSummary(fundingRes.data.summary);
          }
        }
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (isLoading) return <LoadingSpinner label="Loading Founder Startup Operating System..." />;

  // 1. Hero Command Center Data
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';
  const founderName = user?.name ? user.name.split(' ')[0] : 'Bablu';

  // 2. Today's Priorities (Mission Center)
  const priorities = [
    { title: 'Upload Financial Projection FY26', urgent: true },
    { title: 'Schedule Investor Partner Meeting', urgent: true },
    { title: 'Complete Team Profile Details', urgent: true },
    { title: 'Pitch Deck Uploaded & Audited', urgent: false },
    { title: 'Mentor Session Completed', urgent: false },
  ];

  // 4. Health Breakdown Engine
  const healthMetrics = [
    { label: 'Profile Completeness', score: 95, color: 'bg-indigo-500' },
    { label: 'Team Strength', score: 84, color: 'bg-purple-500' },
    { label: 'Investor Readiness', score: 91, color: 'bg-emerald-500' },
    { label: 'Funding Readiness', score: 80, color: 'bg-amber-500' },
    { label: 'Market Presence', score: 87, color: 'bg-rose-500' },
  ];

  // 9. Startup Growth Radar Metrics
  const growthRadar = [
    { label: 'Product Maturity', score: 85, color: 'bg-indigo-500' },
    { label: 'Market Reach', score: 92, color: 'bg-emerald-500' },
    { label: 'Finance Health', score: 76, color: 'bg-amber-500' },
    { label: 'Team Capacity', score: 84, color: 'bg-purple-500' },
    { label: 'Tech Stack', score: 90, color: 'bg-rose-500' },
  ];

  // 10. Milestones
  const milestones = [
    { title: 'Startup Created', done: true },
    { title: 'Pitch Deck Uploaded', done: true },
    { title: 'First Investor View', done: true },
    { title: 'First Meeting', done: true },
    { title: 'First Investment', done: false },
    { title: 'Funding Goal Achieved', done: false },
  ];

  // 11. Team Performance
  const teamPerformance = [
    { name: 'Rahul (Co-Founder)', task: 'Completed 8 Sprint Tasks', time: '10 mins ago' },
    { name: 'Priya (Product)', task: 'Uploaded Pitch Deck V3.4', time: '1 hour ago' },
    { name: 'Aman (Finance)', task: 'Scheduled Meeting with Peak XV', time: '3 hours ago' },
  ];

  // 12. Mentor Hub
  const upcomingMentorSessions = [
    { topic: 'Funding & Term Sheet Strategy', time: 'Tomorrow at 10:00 AM', mentor: 'Rohit Sharma (Ex-VP Sequoia)' },
    { topic: 'SaaS GTM Scaling Playbook', time: 'Friday at 2:00 PM', mentor: 'Neha Verma (Growth Lead)' },
  ];

  // 13. Document Vault
  const vaultDocuments = [
    { name: 'PitchDeck_2026.pdf', category: 'Pitch Deck', size: '3.4 MB' },
    { name: 'FinancialPlan_FY26.xlsx', category: 'Financial Plan', size: '1.8 MB' },
    { name: 'CapTable_Register.pdf', category: 'Cap Table', size: '1.2 MB' },
    { name: 'BusinessModel_Canvas.pdf', category: 'Business Model', size: '2.1 MB' },
    { name: 'Legal_Incorporation.pdf', category: 'Legal Documents', size: '4.5 MB' },
  ];

  // 16. Opportunities Center
  const opportunities = [
    { type: 'Investors Match', count: '3 VCs Match 90%+' },
    { type: 'Mentors Match', count: '2 Mentors Available' },
    { type: 'Incubator Program', count: '1 YC/Techstars Cohort' },
    { type: 'Funding Opportunities', count: '4 Active Grant Deals' },
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
          text: `Based on your startup data, I recommend uploading your FY26 Financial Projections (+15 Health Score) and scheduling a meeting with Accel Ventures.`,
          isAi: true,
        },
      ]);
    }, 600);
  };

  return (
    <div className="space-y-8 pb-24 relative">
      {/* 1. HERO COMMAND CENTER ⭐⭐⭐⭐⭐ */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-6 sm:p-8 rounded-3xl border border-indigo-500/20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 font-black text-white text-3xl flex items-center justify-center shadow-xl shadow-indigo-500/30">
            {startup?.startupName ? startup.startupName[0] : 'N'}
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {greeting}, {founderName} 👋
              </h1>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
                {startup?.stage || 'Seed Stage'}
              </span>
            </div>
            <p className="text-xs text-indigo-200 font-semibold mt-1">
              Startup: <strong className="text-white">{startup?.startupName || 'NexusAI Solutions'}</strong> • Health Score: <strong className="text-emerald-400">89/100</strong> • Funding: <strong className="text-amber-300">₹20L / ₹50L</strong>
            </p>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <strong>3 Investors</strong> viewed your startup profile today.
            </p>
          </div>
        </div>

        {/* Global Search Shortcut Button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="px-4 py-2.5 bg-slate-800/90 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-2xl text-xs font-bold transition flex items-center gap-2"
        >
          <Search className="w-4 h-4 text-indigo-400" /> Search Workspace... <kbd className="bg-slate-950 px-2 py-0.5 rounded text-[10px] text-slate-400">Ctrl + K</kbd>
        </button>
      </div>

      {/* 2. TODAY'S MISSION CENTER & 3. EXECUTIVE SUMMARY CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-indigo-400" /> Today's Mission Priorities
            </h3>
            <span className="text-xs text-slate-400 font-bold">2 of 5 Completed</span>
          </div>

          <div className="space-y-2 text-xs">
            {priorities.map((p, idx) => (
              <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-slate-200">{p.title}</span>
                {p.urgent ? (
                  <span className="text-amber-400 font-bold flex items-center gap-1"><AlertTriangle className="w-4 h-4" /> ⚠ Priority Action</span>
                ) : (
                  <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> ✅ Completed</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Executive Summary Card */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" /> Today's Executive Summary
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>Investor Views:</span> <strong className="text-indigo-400">+3 Today</strong>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>Meetings Scheduled:</span> <strong className="text-purple-400">+1 Partner Call</strong>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>Mentor Match:</span> <strong className="text-emerald-400">+2 Recommendations</strong>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>Funding Progress:</span> <strong className="text-emerald-400">+4% Goal</strong>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>Startup Health Score:</span> <strong className="text-indigo-300">+2 Improvement</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 4. STARTUP HEALTH ENGINE ⭐⭐⭐⭐⭐ */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">AI Neural Health Score</span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
              <Brain className="w-6 h-6 text-emerald-400" /> Startup Health Engine: <span className="text-emerald-400">89 / 100</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold">
              🟢 Excellent (Investor Ready)
            </span>
            <Link to="/founder/health-analysis" className="text-xs font-bold text-indigo-400 hover:underline flex items-center gap-1">
              View Detailed Analysis →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {healthMetrics.map((hm, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
              <span className="text-xs font-bold text-slate-300 block">{hm.label}</span>
              <span className="text-xl font-black text-white block">{hm.score}%</span>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className={`${hm.color} h-full rounded-full`} style={{ width: `${hm.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. FUNDING COMMAND CENTER ⭐⭐⭐⭐⭐ */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-amber-400" /> Funding Command Center
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Seed Round Capital Milestone Tracking</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="text-slate-400">Runway: <strong className="text-indigo-400">7 Months</strong></span>
            <span className="text-emerald-400">Raised ₹20L</span>
            <span className="text-slate-500">/</span>
            <span className="text-white">Target ₹50L</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 block">Target Funding</span>
            <strong className="text-white text-base">₹50,00,000</strong>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 block">Raised Capital</span>
            <strong className="text-emerald-400 text-base">₹20,00,000</strong>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 block">Remaining Goal</span>
            <strong className="text-amber-400 text-base">₹30,00,000</strong>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 block">Estimated Runway</span>
            <strong className="text-indigo-400 text-base">7 Months</strong>
          </div>
        </div>
      </div>

      {/* 6. INVESTOR CRM PIPELINE & 7. INVESTOR ACTIVITY FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" /> Investor CRM Pipeline (Kanban Flow)
            </h3>
            <Link to="/founder/crm" className="text-xs font-bold text-indigo-400 hover:underline">
              Open CRM →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-xs">
            {[
              { stage: 'Lead', count: 8 },
              { stage: 'Contacted', count: 50 },
              { stage: 'Meeting', count: 12 },
              { stage: 'Interested', count: 4 },
              { stage: 'Diligence', count: 2 },
              { stage: 'Funded', count: 1 },
            ].map((s, idx) => (
              <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 block">{s.stage}</span>
                <span className="text-base font-black text-indigo-400 block mt-1">{s.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Real-Time Investor Activity Feed */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-400" /> Investor Activity Feed
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span className="font-bold text-white">Accel Ventures viewed profile</span>
              <span className="text-slate-500">15m ago</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span className="font-bold text-emerald-400">Tech Angels downloaded deck</span>
              <span className="text-slate-500">1h ago</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span className="font-bold text-amber-400">Future Capital bookmarked startup</span>
              <span className="text-slate-500">3h ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* 8. KPI ANALYTICS CARDS & 9. STARTUP GROWTH RADAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Investor Views" value="145" change="+32% this month" icon={Eye} color="indigo" />
            <StatCard title="Pitch Downloads" value="48" change="+18% this month" icon={FileText} color="emerald" />
            <StatCard title="Meetings Scheduled" value="12" change="+12% this month" icon={Calendar} color="purple" />
            <StatCard title="Mentor Sessions" value="12" change="+7% this month" icon={Users} color="amber" />
          </div>
        </div>

        {/* 9. Startup Growth Radar */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" /> Startup Growth Radar
          </h3>
          <div className="space-y-2 text-xs">
            {growthRadar.map((gr, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-300">{gr.label}</span>
                  <span className="text-white">{gr.score}%</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <div className={`${gr.color} h-full rounded-full`} style={{ width: `${gr.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 10. MILESTONE TRACKER & 11. TEAM PERFORMANCE CENTER & 12. MENTOR HUB */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Milestone Tracker */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Milestone Tracker
          </h3>
          <div className="space-y-2 text-xs">
            {milestones.map((m, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-slate-950 rounded-lg">
                <span className="text-slate-300">{m.title}</span>
                <span>{m.done ? '✓' : '⏳'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Performance */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" /> Team Performance Center
          </h3>
          <div className="space-y-2 text-xs">
            {teamPerformance.map((tp, idx) => (
              <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                <div>
                  <span className="font-bold text-white block">{tp.name}</span>
                  <span className="text-slate-400 text-[10px]">{tp.task}</span>
                </div>
                <span className="text-slate-500 text-[10px]">{tp.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mentor Hub */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" /> Mentor Advisory Hub
          </h3>
          <div className="space-y-2 text-xs">
            {upcomingMentorSessions.map((ms, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-white block">{ms.topic}</span>
                <span className="text-slate-400 block">{ms.time}</span>
                <span className="text-indigo-400 font-semibold block">{ms.mentor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 13. DOCUMENT VAULT & 14. ACTIVITY TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Folder className="w-5 h-5 text-emerald-400" /> Document Vault
          </h3>
          <div className="space-y-2 text-xs">
            {vaultDocuments.map((doc, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">{doc.name}</span>
                  <span className="text-indigo-400 text-[10px]">{doc.category}</span>
                </div>
                <span className="text-slate-400 font-mono text-[10px]">{doc.size}</span>
              </div>
            ))}
          </div>
        </div>

        <ActivityTimeline />
      </div>

      {/* 15. COMMUNITY INSIGHTS & 16. OPPORTUNITIES CENTER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-400" /> Community Insights & Feed
          </h3>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="font-bold text-white block">Trending Discussion: Series Seed Term Sheet Negotiation</span>
              <p className="text-slate-400 mt-0.5">34 comments • Shared by Peak XV Lead</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="font-bold text-white block">Popular Post: Scaling B2B SaaS MRR from $10k to $100k</span>
              <p className="text-slate-400 mt-0.5">89 likes • Shared by Aarav Sharma</p>
            </div>
          </div>
        </div>

        {/* 16. Opportunities Center */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> Opportunities Center
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {opportunities.map((op, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <span className="font-bold text-white block">{op.type}</span>
                <span className="text-indigo-400 font-semibold block mt-1">{op.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 17. NOTIFICATION COMMAND CENTER & 18. QUICK ACTIONS PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" /> Notification Command Center
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span className="font-bold text-white">🔔 Accel Ventures is Interested</span>
              <span className="text-slate-500">Just now</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span className="font-bold text-emerald-400">🔔 Vikram M Accepted Session</span>
              <span className="text-slate-500">1h ago</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span className="font-bold text-purple-400">🔔 New Series Seed Opportunity</span>
              <span className="text-slate-500">3h ago</span>
            </div>
          </div>
        </div>

        {/* 18. Quick Actions Panel */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" /> Quick Actions Hub
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <Link to="/founder/pitch-deck" className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition text-center">
              + Upload Pitch Deck
            </Link>
            <Link to="/founder/matches" className="p-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition text-center">
              + Contact Investor
            </Link>
            <Link to="/founder/mentors" className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition text-center">
              + Book Mentor
            </Link>
            <Link to="/founder/startup" className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition text-center">
              + Edit Startup Details
            </Link>
          </div>
        </div>
      </div>

      {/* 19. AI STARTUP ADVISOR FLOATING WIDGET */}
      <div className="fixed bottom-6 right-6 z-40">
        {!aiWidgetOpen ? (
          <button
            onClick={() => setAiWidgetOpen(true)}
            className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs rounded-full shadow-2xl transition flex items-center gap-2 animate-bounce"
          >
            <Sparkles className="w-4 h-4 text-amber-300 fill-current" /> Ask VentureHub AI
          </button>
        ) : (
          <div className="w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-white text-xs">VentureHub AI Startup Advisor</span>
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
                placeholder="Ask how to improve funding chances..."
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
