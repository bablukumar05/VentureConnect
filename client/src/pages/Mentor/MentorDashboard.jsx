import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { StatCard } from '../../components/common/StatCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { formatDate } from '../../utils/formatters';
import {
  Award,
  Users,
  Calendar,
  Star,
  CheckCircle2,
  Brain,
  TrendingUp,
  Video,
  Clock,
  CheckSquare,
  FileText,
  MessageSquare,
  Sparkles,
  Search,
  Check,
  X,
  Send,
  AlertTriangle,
  Zap,
  Bookmark,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const MentorDashboard = () => {
  const { user } = useAuthStore();
  const [sessions, setSessions] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Active Workspace Tab state
  const [activeTab, setActiveTab] = useState('overview');

  // Search Modal state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // AI Mentor Assistant Widget state
  const [aiWidgetOpen, setAiWidgetOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiChatMessages, setAiChatMessages] = useState([
    { text: 'Hello Mentor! Ask me to analyze mentee traction, suggest 30-day goals, or summarize previous session notes.', isAi: true },
  ]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [sessionsRes, requestsRes] = await Promise.all([
          API.get('/mentorship/sessions').catch(() => ({ data: { sessions: [] } })),
          API.get('/mentorship/requests').catch(() => ({ data: { requests: [] } })),
        ]);
        setSessions(sessionsRes.data.sessions || []);
        if (requestsRes.data.requests && requestsRes.data.requests.length > 0) {
          setRequests(requestsRes.data.requests);
        } else {
          setRequests([
            {
              _id: 'req_1',
              founder: { name: 'Aarav Sharma', email: 'aarav@nexusai.io' },
              topic: 'Fundraising Strategy & Term Sheet Review',
              goals: 'Refine enterprise sales playbook & lower CAC for Series Seed.',
              urgency: 'High',
              status: 'pending',
            },
          ]);
        }
      } catch (err) {
        console.error('Mentor dashboard error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (isLoading) return <LoadingSpinner label="Loading Mentor Coaching Workspace..." />;

  const activeStartups = 8;
  const todaySessionsCount = 3;
  const pendingRequestsCount = requests.filter((r) => r.status === 'pending').length;
  const completedSessionsCount = 47;
  const mentorRating = '4.8 / 5';

  // Today's Schedule Data
  const todaySchedule = [
    { time: '10:00 AM', startup: 'NexusAI Solutions', topic: 'Fundraising & Term Sheet Strategy', founder: 'Aarav Sharma', link: 'https://meet.google.com' },
    { time: '12:30 PM', startup: 'HealthPulse MedTech', topic: 'Product Roadmap & Clinical Trials', founder: 'Priya Patel', link: 'https://meet.google.com' },
    { time: '04:00 PM', startup: 'FinTechX Labs', topic: 'Go-To-Market & Pricing Strategy', founder: 'Aman Gupta', link: 'https://meet.google.com' },
  ];

  // Startup Health Breakdown Preview for Active Workspace
  const menteeHealth = {
    profile: 92,
    team: 81,
    product: 88,
    funding: 76,
    traction: 84,
  };

  // Goals & Subtasks
  const activeGoals = [
    { title: 'Reach ₹5L Monthly Recurring Revenue', date: '30 Sept 2026', progress: 75 },
  ];

  const subtasks = [
    { title: 'Improve enterprise pricing tier structure', done: true },
    { title: 'Launch outbound LinkedIn founder campaign', done: true },
    { title: 'Contact 20 enterprise pilot leads', done: true },
    { title: 'Analyze cohort customer retention data', done: false },
  ];

  // Mentorship Impact Analytics
  const impactMetrics = [
    { label: 'Overall Startup Health', before: 68, after: 84, change: '+23.5%' },
    { label: 'Investor Readiness Score', before: 61, after: 88, change: '+44.2%' },
    { label: 'Pitch Deck Quality', before: 64, after: 91, change: '+42.1%' },
    { label: 'Funding Readiness', before: 58, after: 79, change: '+36.2%' },
  ];

  const handleRequestResponse = async (id, status) => {
    try {
      await API.post('/mentorship/respond', { requestId: id, status });
      setRequests(requests.map((r) => (r._id === id ? { ...r, status } : r)));
    } catch (err) {
      console.error(err);
    }
  };

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
          text: `NexusAI Solutions has improved health score from 68 to 84 (+23.5%). For today's 10:00 AM session, focus on Seed term sheet liquidation preference clauses.`,
          isAi: true,
        },
      ]);
    }, 600);
  };

  return (
    <div className="space-y-8 pb-24 relative">
      {/* 1. MENTOR COMMAND CENTER HERO BANNER ⭐⭐⭐⭐⭐ */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-amber-500/20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest">Startup Advisory & Coaching Console</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">Good Morning, Mentor 👋</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Your Mentorship Command Center — Diagnose startup health, assign 30-day growth goals, conduct strategy sessions, and track mentee impact.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-semibold text-slate-300">
            <span className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">Status: <strong className="text-emerald-400">Verified Expert</strong></span>
            <span className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">Rating: <strong className="text-amber-400">4.8 / 5 (124 Reviews)</strong></span>
            <span className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">Availability: <strong className="text-indigo-400">6 hrs/week</strong></span>
          </div>
        </div>

        {/* Global Search Shortcut */}
        <button
          onClick={() => setSearchOpen(true)}
          className="w-full lg:w-auto px-4 py-2.5 bg-slate-800/90 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4 text-amber-400" /> Search Mentees & Resources... <kbd className="bg-slate-950 px-2 py-0.5 rounded text-[10px] text-slate-400">Ctrl + K</kbd>
        </button>
      </div>

      {/* 2. KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Mentees" value={`${activeStartups} Startups`} change="High Growth Tier" icon={Users} color="amber" />
        <StatCard title="Today's Sessions" value={`${todaySessionsCount} Sessions`} change="10:00 AM Start" icon={Calendar} color="emerald" />
        <StatCard title="Pending Requests" value={`${pendingRequestsCount} Requests`} change="Needs Response" icon={Clock} color="purple" />
        <StatCard title="Completed Sessions" value={`${completedSessionsCount} Sessions`} change="4.8 Rating" icon={Award} color="indigo" />
      </div>

      {/* 2. TODAY'S SCHEDULE ⭐⭐⭐⭐⭐ */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" /> Today's Advisory Schedule
          </h3>
          <span className="text-xs text-indigo-400 font-bold">{todaySessionsCount} Sessions Scheduled Today</span>
        </div>

        <div className="space-y-3">
          {todaySchedule.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-center">
                  <span className="text-xs font-black text-amber-400 block">{item.time}</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-base">{item.startup}</h4>
                  <p className="text-xs text-indigo-400 font-semibold">{item.topic} • <span className="text-slate-400">Founder: {item.founder}</span></p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Video className="w-4 h-4" /> Join Session
                </a>
                <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700 transition">
                  Add Notes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MENTORSHIP REQUESTS QUEUE & 16. AVAILABILITY MANAGEMENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" /> Mentorship Requests Queue
            </h3>
            <span className="text-xs text-slate-400">{requests.length} Total Requests</span>
          </div>

          <div className="space-y-3 text-xs">
            {requests.map((req) => (
              <div key={req._id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{req.founder?.name || 'Founder'}</h4>
                    <p className="text-xs text-indigo-400 font-semibold">{req.topic}</p>
                  </div>
                  <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-[10px] font-bold">
                    Urgency: {req.urgency || 'High'}
                  </span>
                </div>

                <p className="text-slate-300"><strong>Goals:</strong> {req.goals}</p>

                {req.status === 'pending' && (
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleRequestResponse(req._id, 'accepted')}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Accept Request
                    </button>
                    <button
                      onClick={() => handleRequestResponse(req._id, 'rejected')}
                      className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold rounded-xl transition flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Availability Management */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" /> Weekly Availability
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>Monday</span> <strong className="text-emerald-400">10:00 AM – 1:00 PM</strong>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>Wednesday</span> <strong className="text-emerald-400">2:00 PM – 6:00 PM</strong>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>Friday</span> <strong className="text-emerald-400">10:00 AM – 4:00 PM</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 4. STARTUP COACHING WORKSPACE (TABBED) ⭐⭐⭐⭐⭐ */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Active Mentee Workspace</span>
            <h2 className="text-xl font-extrabold text-white mt-0.5">NexusAI Solutions Coaching Workspace</h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs">
            {['overview', 'goals', 'notes', 'docs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl font-bold uppercase tracking-wider transition ${
                  activeTab === tab ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-xs font-bold text-slate-400 block">Profile</span>
              <strong className="text-xl font-black text-white block mt-1">{menteeHealth.profile}%</strong>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-xs font-bold text-slate-400 block">Team</span>
              <strong className="text-xl font-black text-white block mt-1">{menteeHealth.team}%</strong>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-xs font-bold text-slate-400 block">Product</span>
              <strong className="text-xl font-black text-white block mt-1">{menteeHealth.product}%</strong>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-xs font-bold text-slate-400 block">Funding</span>
              <strong className="text-xl font-black text-amber-400 block mt-1">{menteeHealth.funding}%</strong>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-xs font-bold text-slate-400 block">Traction</span>
              <strong className="text-xl font-black text-emerald-400 block mt-1">{menteeHealth.traction}%</strong>
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="space-y-4 text-xs">
            {activeGoals.map((g, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">Goal: {g.title}</h4>
                  <span className="text-emerald-400 font-bold">Target: {g.date}</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${g.progress}%` }} />
                </div>
                <div className="space-y-1 text-slate-300">
                  {subtasks.map((st, stIdx) => (
                    <p key={stIdx} className={st.done ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
                      {st.done ? '✓' : '○'} {st.title}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-3 text-xs">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Session Notes — 15 Aug 2026</h4>
              <p className="text-slate-300">Problem: Founder struggling with investor cold outreach and pitch deck storytelling.</p>
              <p className="text-emerald-400 font-semibold">Recommendation: Focus outreach on Seed-stage FinTech & AI specialist VCs.</p>
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-white">PitchDeck_NexusAI_2026.pdf</span>
              <span className="text-indigo-400 font-bold">Shared by Founder</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-white">FinancialModel_FY26.xlsx</span>
              <span className="text-indigo-400 font-bold">Shared by Founder</span>
            </div>
          </div>
        )}
      </div>

      {/* 19. MENTORSHIP IMPACT ANALYTICS ⭐⭐⭐⭐⭐ */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Measurable Growth Assessment</span>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
              <TrendingUp className="w-6 h-6 text-emerald-400" /> Your Mentorship Impact Performance
            </h2>
          </div>
          <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold">
            Average Improvement: +23.5%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {impactMetrics.map((im, idx) => (
            <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-400 block">{im.label}</span>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">{im.before} → <strong className="text-white text-lg">{im.after}</strong></span>
                <span className="text-emerald-400 font-black text-sm">{im.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GLOBAL COMMAND PALETTE SEARCH MODAL (CTRL + K) */}
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
                placeholder="Search Mentees, Sessions, Pitch Decks, Action Items..."
                className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
              />
              <button onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1 text-xs text-slate-400 p-2">
              <p className="text-[10px] uppercase font-bold text-slate-500">Quick Searches</p>
              <div className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer text-white font-bold">NexusAI Solutions (Mentee Workspace)</div>
              <div className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer text-white font-bold">HealthPulse MedTech (Product Strategy Session)</div>
              <div className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer text-white font-bold">PitchDeck_NexusAI_2026.pdf</div>
            </div>
          </div>
        </div>
      )}

      {/* 12. AI MENTOR ASSISTANT FLOATING WIDGET */}
      <div className="fixed bottom-6 right-6 z-40">
        {!aiWidgetOpen ? (
          <button
            onClick={() => setAiWidgetOpen(true)}
            className="px-4 py-3 bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-full shadow-2xl transition flex items-center gap-2 animate-bounce"
          >
            <Sparkles className="w-4 h-4 text-amber-300 fill-current" /> AI Mentor Co-Pilot
          </button>
        ) : (
          <div className="w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white text-xs">VentureHub AI Mentor Co-Pilot</span>
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
                placeholder="Ask to analyze startup progress or goals..."
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
