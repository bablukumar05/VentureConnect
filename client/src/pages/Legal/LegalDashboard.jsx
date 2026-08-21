import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { StatCard } from '../../components/common/StatCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { formatDate } from '../../utils/formatters';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  Scale,
  ShieldCheck,
  FileCheck,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Brain,
  TrendingUp,
  Users,
  Calendar,
  Sparkles,
  Search,
  Check,
  X,
  Send,
  Lock,
  Download,
  Eye,
  FileSpreadsheet,
  Layers,
  Clock,
  Briefcase,
  Globe,
  Bell,
  Award,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const LegalDashboard = () => {
  const [consultations, setConsultations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Active Workspace Tab state
  const [workspaceTab, setWorkspaceTab] = useState('overview');

  // Search Modal state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Audit Modal state
  const [auditModal, setAuditModal] = useState(false);
  const [activeDoc, setActiveDoc] = useState(null);

  // AI Legal Co-Pilot Widget state
  const [aiWidgetOpen, setAiWidgetOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiChatMessages, setAiChatMessages] = useState([
    { text: 'Hello Counselor! Ask me to evaluate compliance risk, audit term sheet clauses, or verify IP assignment contracts.', isAi: true },
  ]);

  useEffect(() => {
    const fetchLegalRequests = async () => {
      try {
        const res = await API.get('/legal/consultations');
        if (res.data.consultations && res.data.consultations.length > 0) {
          setConsultations(res.data.consultations);
        } else {
          setConsultations([
            {
              _id: 'leg_1',
              title: 'Seed SAFE Note Term Sheet Review',
              category: 'Term Sheet Audit',
              description: 'Evaluate liquidation preference & 1x non-participating preferred equity clauses for Sequoia term sheet.',
              founder: { name: 'Aarav Sharma' },
              startup: { startupName: 'AIHire (NexusAI)' },
              urgency: 'High',
              status: 'in_review',
            },
            {
              _id: 'leg_2',
              title: 'Shareholder Rights Agreement (SHA) Audit',
              category: 'Corporate Governance',
              description: 'Audit board composition, drag-along rights, and tag-along transfer restrictions.',
              founder: { name: 'Priya Patel' },
              startup: { startupName: 'HealthX MedTech' },
              urgency: 'Medium',
              status: 'pending',
            },
            {
              _id: 'leg_3',
              title: 'IP Assignment & Proprietary Invention Contracts',
              category: 'Intellectual Property',
              description: 'Verify 100% IP assignment from technical co-founders to corporate entity.',
              founder: { name: 'Aman Gupta' },
              startup: { startupName: 'FinTechX Labs' },
              urgency: 'High',
              status: 'in_review',
            },
          ]);
        }
      } catch (err) {
        console.error('Fetch legal requests error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLegalRequests();
  }, []);

  if (isLoading) return <LoadingSpinner label="Loading Legal Advisor Portal..." />;

  // 1. Header Hero Counters
  const activeStartupsCount = 24;
  const pendingReviewsCount = 12;
  const complianceIssuesCount = 5;
  const dueDiligenceCasesCount = 8;

  // 3. Legal Queue Startups
  const legalQueue = [
    { name: 'AIHire (NexusAI)', status: 'In Review', color: 'text-amber-400', stage: 'Seed Stage' },
    { name: 'HealthX MedTech', status: 'Awaiting Review', color: 'text-indigo-400', stage: 'Pre-Seed' },
    { name: 'FinTechX Labs', status: 'Approved', color: 'text-emerald-400', stage: 'Seed Stage' },
  ];

  // 5. Compliance Engine Checklist (86/100)
  const complianceChecklist = [
    { name: 'Company Incorporation & MCA Filings', status: 'verified' },
    { name: 'GST & Income Tax PAN Compliance', status: 'verified' },
    { name: 'Founders Vesting Agreement', status: 'warning' },
    { name: 'Privacy Policy & Terms of Service', status: 'verified' },
    { name: 'Employment & Invention Assignment Agreements', status: 'warning' },
  ];

  // 7. Contract Review Center
  const contractsReview = [
    { title: 'Founders Agreement', status: 'Needs Changes', issue: 'Missing founder IP assignment clause' },
    { title: 'Employee Stock Option (ESOP) Plan', status: 'Approved', issue: '100% Compliant' },
    { title: 'Series Seed Investment Agreement', status: 'In Review', issue: 'Liquidation preference audit' },
    { title: 'Mutual Non-Disclosure Agreement (NDA)', status: 'Approved', issue: 'Standard 2-year clause' },
  ];

  // 9. IP Protection Center
  const ipStatus = [
    { type: 'Trademarks', status: 'Pending Application', color: 'text-amber-400' },
    { type: 'Patents', status: 'Not Filed', color: 'text-slate-400' },
    { type: 'Copyrights & Source Code', status: 'Registered', color: 'text-emerald-400' },
    { type: 'Domain Ownership', status: 'Verified & Locked', color: 'text-emerald-400' },
  ];

  // 13. Legal Meetings
  const upcomingMeetings = [
    { time: 'Tomorrow 11:00 AM', startup: 'AIHire (NexusAI)', topic: 'Fundraising SHA Terms & Valuation Cap' },
    { time: '2:30 PM Friday', startup: 'FinTechX Labs', topic: 'SEBI Security Compliance Review' },
  ];

  // Recharts Compliance Analytics
  const analyticsData = [
    { month: 'May', approvals: 14, score: 82 },
    { month: 'Jun', approvals: 22, score: 88 },
    { month: 'Jul', approvals: 28, score: 91 },
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
          text: `Legal Analysis: AIHire compliance score is 86/100. Adding the missing Founder IP Assignment clause will increase compliance to 94/100 and lower regulatory risk to 12/100.`,
          isAi: true,
        },
      ]);
    }, 600);
  };

  return (
    <div className="space-y-8 pb-24 relative max-w-6xl mx-auto">
      {/* 1. LEGAL COMMAND CENTER HERO BANNER ⭐⭐⭐⭐⭐ */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-amber-500/20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest">Securities & Legal Governance Console</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">Good Morning, Legal Advisor 👋</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Startup Legal Operating System — Review compliance documents, verify investment contracts, audit IP protection, and guide due diligence.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-semibold text-slate-300">
            <span className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">Status: <strong className="text-emerald-400">Verified Legal Counsel</strong></span>
            <span className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">Risk Score: <strong className="text-emerald-400">24 / 100 (Low Risk)</strong></span>
          </div>
        </div>

        {/* Header Summary Box & Search Shortcut */}
        <div className="flex flex-col items-end gap-3 w-full lg:w-auto">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full lg:w-auto px-4 py-2.5 bg-slate-800/90 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 text-amber-400" /> Search Contracts & Filings... <kbd className="bg-slate-950 px-2 py-0.5 rounded text-[10px] text-slate-400">Ctrl + K</kbd>
          </button>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs w-full">
            <div><span className="text-[10px] text-slate-400 uppercase font-bold block">Active Startups</span><strong className="text-white text-base font-black">{activeStartupsCount}</strong></div>
            <div><span className="text-[10px] text-slate-400 uppercase font-bold block">Pending Reviews</span><strong className="text-indigo-400 text-base font-black">{pendingReviewsCount}</strong></div>
            <div><span className="text-[10px] text-slate-400 uppercase font-bold block">Compliance Issues</span><strong className="text-rose-400 text-base font-black">{complianceIssuesCount}</strong></div>
            <div><span className="text-[10px] text-slate-400 uppercase font-bold block">Due Diligence</span><strong className="text-emerald-400 text-base font-black">{dueDiligenceCasesCount}</strong></div>
          </div>
        </div>
      </div>

      {/* 2. LEGAL KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Contracts Reviewed" value="142 Contracts" change="Zero legal flaws" icon={FileCheck} color="emerald" />
        <StatCard title="Legal Approvals" value="88 Approved" change="E-Signed & Released" icon={CheckCircle2} color="indigo" />
        <StatCard title="Compliance Score" value="91% Score" change="Top Audit Rating" icon={ShieldCheck} color="purple" />
        <StatCard title="Pending Documents" value="17 Documents" change="Under Inspection" icon={Clock} color="amber" />
      </div>

      {/* 3. STARTUP LEGAL QUEUE & 4. LEGAL WORKSPACE (TABBED) ⭐⭐⭐⭐⭐ */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Startup Legal Workspace</span>
            <h2 className="text-xl font-extrabold text-white mt-0.5">AIHire (NexusAI) — Compliance Score: <span className="text-emerald-400">86 / 100</span></h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs">
            {['overview', 'compliance', 'contracts', 'ip', 'diligence'].map((tab) => (
              <button
                key={tab}
                onClick={() => setWorkspaceTab(tab)}
                className={`px-4 py-2 rounded-xl font-bold uppercase tracking-wider transition ${
                  workspaceTab === tab ? 'bg-amber-600 text-slate-950 shadow-md font-black' : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {workspaceTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px]">Contracts Rating</span>
              <strong className="text-white text-lg">90 / 100</strong>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px]">Compliance Score</span>
              <strong className="text-emerald-400 text-lg">84 / 100</strong>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px]">IP Protection</span>
              <strong className="text-indigo-400 text-lg">79 / 100</strong>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px]">Fundraising Docs</span>
              <strong className="text-purple-400 text-lg">92 / 100</strong>
            </div>
          </div>
        )}

        {workspaceTab === 'compliance' && (
          <div className="space-y-3 text-xs">
            {complianceChecklist.map((c, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-200 font-semibold">{c.name}</span>
                <span className={`font-bold flex items-center gap-1 ${c.status === 'verified' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {c.status === 'verified' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  {c.status === 'verified' ? 'Verified & Compliant' : 'Needs Action'}
                </span>
              </div>
            ))}
          </div>
        )}

        {workspaceTab === 'contracts' && (
          <div className="space-y-3 text-xs">
            {contractsReview.map((ctr, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{ctr.title}</h4>
                  <p className="text-slate-400 text-[10px]">{ctr.issue}</p>
                </div>
                <span className={`px-3 py-1 rounded-full font-bold ${ctr.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                  {ctr.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {workspaceTab === 'ip' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {ipStatus.map((ip, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="font-bold text-white">{ip.type}</span>
                <span className={`font-bold ${ip.color}`}>{ip.status}</span>
              </div>
            ))}
          </div>
        )}

        {workspaceTab === 'diligence' && (
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <div className="flex justify-between font-bold">
              <span className="text-white">Due Diligence Verification Progress</span>
              <span className="text-emerald-400">82% Completed</span>
            </div>
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '82%' }} />
            </div>
            <p className="text-slate-400 text-[11px]">Financial (✓), IP (✓), Tax Records (✓), Legal Contracts (⚠ Pending Founder SHA sign-off)</p>
          </div>
        )}
      </div>

      {/* 10. LEGAL RISK SCORE & 11. RECOMMENDATIONS ⭐⭐⭐⭐⭐ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Score */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> Regulatory Legal Risk Index
            </h3>
            <span className="text-xl font-black text-emerald-400">24 / 100 (Low Risk)</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>Compliance Risk</span> <strong className="text-emerald-400">Low Risk</strong>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>Contracts Clause Risk</span> <strong className="text-amber-400">Medium Risk</strong>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>IP Ownership Risk</span> <strong className="text-emerald-400">Low Risk</strong>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3 text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400" /> AI Legal Recommendations
          </h3>
          <div className="space-y-2">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400 block">⚠ Add Founder Invention Assignment Clause</span>
              <p className="text-slate-400">Potential Risk Reduction: -12 Points</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400 block">✓ Trademark Class 42 Filing Complete</span>
              <p className="text-slate-400">Brand IP Protected across software & SaaS</p>
            </div>
          </div>
        </div>
      </div>

      {/* 13. LEGAL MEETING CENTER & 18. ANALYTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" /> Upcoming Legal Strategy Meetings
          </h3>
          <div className="space-y-2 text-xs">
            {upcomingMeetings.map((m, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-amber-400 font-mono font-bold block">{m.time}</span>
                  <h4 className="font-bold text-white">{m.startup}</h4>
                  <p className="text-slate-400 text-[10px]">{m.topic}</p>
                </div>
                <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] rounded-lg transition">
                  Join Strategy Call
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" /> Legal Approvals & Compliance Trend
          </h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Bar dataKey="approvals" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SEARCH MODAL (CTRL + K) */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-4 shadow-2xl z-10 space-y-3">
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
              <Search className="w-4 h-4 text-amber-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Contracts, Term Sheets, Cap Table Audits, Filings..."
                className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
              />
              <button onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1 text-xs text-slate-400 p-2">
              <p className="text-[10px] uppercase font-bold text-slate-500">Quick Searches</p>
              <div className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer text-white font-bold">AIHire (Seed SAFE Note Review)</div>
              <div className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer text-white font-bold">Shareholder Rights Agreement (SHA Audit)</div>
              <div className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer text-white font-bold">Standard Series Seed Term Sheet Template</div>
            </div>
          </div>
        </div>
      )}

      {/* AI LEGAL ASSISTANT FLOATING WIDGET */}
      <div className="fixed bottom-6 right-6 z-40">
        {!aiWidgetOpen ? (
          <button
            onClick={() => setAiWidgetOpen(true)}
            className="px-4 py-3 bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-full shadow-2xl transition flex items-center gap-2 animate-bounce"
          >
            <Sparkles className="w-4 h-4 text-amber-300 fill-current" /> AI Legal Co-Pilot
          </button>
        ) : (
          <div className="w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white text-xs">VentureHub AI Legal Co-Pilot</span>
              </div>
              <button onClick={() => setAiWidgetOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-48 overflow-y-auto space-y-2 p-2 bg-slate-950 rounded-xl text-xs">
              {aiChatMessages.map((msg, idx) => (
                <div key={idx} className={`p-2 rounded-xl max-w-[85%] ${msg.isAi ? 'bg-amber-950/80 text-amber-200 border border-amber-500/20' : 'bg-slate-800 text-white ml-auto'}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleAiSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ask about term sheet clauses or compliance..."
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
              />
              <button type="submit" className="p-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl transition">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
