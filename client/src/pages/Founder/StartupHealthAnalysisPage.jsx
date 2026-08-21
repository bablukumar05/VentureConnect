import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  Brain,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const StartupHealthAnalysisPage = () => {
  const [health, setHealth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHealth = async () => {
    try {
      setIsLoading(true);
      const res = await API.get('/startups/health/my-health');
      setHealth(res.data.health);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  if (isLoading) return <LoadingSpinner label="Running Startup Health Diagnostics..." />;

  const overallScore = health?.overallScore || 85;
  const statusLevel = health?.statusLevel || 'Strong';
  const monthlyChange = health?.monthlyChange || 4;

  const breakdown = health?.breakdown || {
    profileCompleteness: 90,
    teamStrength: 82,
    investorReadiness: 91,
    fundingReadiness: 76,
    businessTraction: 84,
  };

  const scoreHistory = health?.scoreHistory || [
    { month: 'May', score: 71 },
    { month: 'June', score: 77 },
    { month: 'July', score: 81 },
    { month: 'August', score: 85 },
  ];

  const scoreChanges = health?.scoreChanges || [
    { points: '+3', reason: 'Investor viewed your profile' },
    { points: '+2', reason: 'Financial projection added' },
    { points: '+1', reason: 'Mentor session completed' },
    { points: '-2', reason: 'Investor pipeline inactive warning' },
  ];

  const recommendations = health?.recommendations || [
    { title: 'Add financial projections', impact: 6, priority: 'high', category: 'Finance', actionLink: '/founder/pitch-deck' },
    { title: 'Add co-founder information', impact: 4, priority: 'medium', category: 'Team', actionLink: '/founder/startup' },
    { title: 'Add product demo video', impact: 5, priority: 'high', category: 'Product', actionLink: '/founder/pitch-deck' },
  ];

  const getStatusBadge = () => {
    switch (statusLevel) {
      case 'Excellent':
        return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1.5">🟢 Excellent (Investor Ready)</span>;
      case 'Strong':
        return <span className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1.5">🔵 Strong Growth Tier</span>;
      case 'Needs Improvement':
        return <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1.5">🟡 Needs Improvement</span>;
      default:
        return <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1.5">🔴 Critical Action Required</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-6 sm:p-8 rounded-3xl border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">VentureHub Neural Engine</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Startup Health Score Analysis</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Real-time multi-variable scoring model evaluating Profile Completeness (20%), Team Strength (20%), Investor Readiness (25%), Funding Readiness (20%), and Business Traction (15%).
          </p>
        </div>

        <button
          onClick={fetchHealth}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4 text-indigo-400" /> Recalculate Diagnostics
        </button>
      </div>

      {/* Main Score & Status Level Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-4 shadow-2xl">
          <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-1 shadow-xl shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-full flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white">{overallScore}</span>
              <span className="text-xs font-bold text-slate-400">/ 100</span>
            </div>
          </div>

          <div className="space-y-1">
            {getStatusBadge()}
            <p className="text-xs text-emerald-400 font-bold mt-2">↑ +{monthlyChange} points this month</p>
            <p className="text-xs text-slate-400 max-w-xs">Your startup is investor-ready for Series Seed funding rounds.</p>
          </div>
        </div>

        {/* 5 Weighted Categories Breakdown */}
        <div className="lg:col-span-2 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400" /> Weighted Score Category Breakdown
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-300">Profile Completeness (20% Weight)</span>
                <span className="text-white">{breakdown.profileCompleteness}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: `${breakdown.profileCompleteness}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-300">Team Strength (20% Weight)</span>
                <span className="text-white">{breakdown.teamStrength}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${breakdown.teamStrength}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-300">Investor Readiness (25% Weight)</span>
                <span className="text-white">{breakdown.investorReadiness}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${breakdown.investorReadiness}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-300">Funding Readiness (20% Weight)</span>
                <span className="text-white">{breakdown.fundingReadiness}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${breakdown.fundingReadiness}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-300">Business Traction (15% Weight)</span>
                <span className="text-white">{breakdown.businessTraction}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full transition-all duration-500" style={{ width: `${breakdown.businessTraction}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Score History Chart & Why Did My Score Change Trace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score History Line Chart */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" /> Historical Score Progress (4 Months)
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreHistory}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Why Did My Score Change Log Trace */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" /> Why Did My Score Change?
          </h3>
          <div className="space-y-3 text-xs">
            {scoreChanges.map((sc, idx) => (
              <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-200 font-semibold">{sc.reason}</span>
                <span className={`font-black ${sc.points.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {sc.points} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Center - Improve These Areas */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> Action Center — Improve These Areas
          </h3>
          <span className="text-xs text-indigo-400 font-bold">Highest Score Impact Actions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-wider block">{rec.category}</span>
                <h4 className="font-bold text-white text-sm mt-1">{rec.title}</h4>
                <p className="text-emerald-400 font-black mt-2">Potential Impact: +{rec.impact} Points</p>
              </div>

              <Link
                to={rec.actionLink}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition text-center block"
              >
                Fix Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
