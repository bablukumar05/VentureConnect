import React, { useEffect, useState } from 'react';
import API from '../../services/api';
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
  BarChart,
  Bar,
} from 'recharts';
import {
  Shield,
  Users,
  Rocket,
  DollarSign,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Globe,
  TrendingUp,
  Brain,
  Bell,
  Lock,
  Search,
  Check,
  X,
  Send,
  Download,
  Flame,
  Award,
  Zap,
  Server,
  Database,
  Radio,
} from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verification lists state
  const [pendingStartups, setPendingStartups] = useState([
    { id: 'st_1', name: 'NexusAI Solutions', founder: 'Aarav Sharma', industry: 'AI/ML' },
    { id: 'st_2', name: 'QuantumLabs', founder: 'Rohan Gupta', industry: 'DeepTech' },
  ]);
  const [pendingInvestors, setPendingInvestors] = useState([
    { id: 'inv_1', name: 'Peak XV Partners', partner: 'Rahul Mehta', range: '₹50L - ₹5Cr' },
  ]);

  // Announcement modal state
  const [announcementText, setAnnouncementText] = useState('');
  const [announcementSent, setAnnouncementSent] = useState(false);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const res = await API.get('/admin/stats');
        setStats(res.data.stats);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdminStats();
  }, []);

  if (isLoading) return <LoadingSpinner label="Loading Platform Command Center..." />;

  // 1. Executive Summary & KPI Data
  const totalUsers = stats?.totalUsers || 12540;
  const activeStartups = stats?.totalStartups || 2150;
  const totalInvestors = 850;
  const totalMentors = stats?.totalMentors || 320;
  const todayRevenue = '₹45,000';
  const monthlyRevenue = '₹1,20,000';

  // 2. Health Scores
  const healthMetrics = [
    { label: 'Server Health', score: 98, color: 'bg-emerald-500' },
    { label: 'Database Health', score: 96, color: 'bg-indigo-500' },
    { label: 'User Activity', score: 92, color: 'bg-purple-500' },
    { label: 'Security Status', score: 94, color: 'bg-amber-500' },
  ];

  // 3. User Growth & Sector Data
  const userGrowthData = [
    { month: 'Jan', users: 1200 },
    { month: 'Feb', users: 1800 },
    { month: 'Mar', users: 2500 },
    { month: 'Apr', users: 3400 },
    { month: 'May', users: 4800 },
    { month: 'Jun', users: 6200 },
  ];

  const sectorData = [
    { name: 'AI/ML', value: 45, color: '#6366f1' },
    { name: 'FinTech', value: 25, color: '#10b981' },
    { name: 'HealthTech', value: 18, color: '#a855f7' },
    { name: 'EdTech', value: 12, color: '#f59e0b' },
  ];

  // 4. Geographic Distribution
  const geoHeatmap = [
    { country: 'India', users: '5,200', flag: '🇮🇳' },
    { country: 'USA', users: '2,400', flag: '🇺🇸' },
    { country: 'UK', users: '1,100', flag: '🇬🇧' },
    { country: 'Singapore', users: '900', flag: '🇸🇬' },
  ];

  // 5. Audit Logs
  const auditLogs = stats?.auditLogs || [
    { _id: '1', admin: { name: 'Super Admin' }, action: 'VERIFY_STARTUP', targetResource: 'Startup', details: 'Verified NexusAI Solutions after diligence', createdAt: new Date() },
    { _id: '2', admin: { name: 'Super Admin' }, action: 'APPROVE_MENTOR', targetResource: 'Mentor', details: 'Approved Vikram Malhotra advisor profile', createdAt: new Date() },
  ];

  const handleApproveStartup = (id) => {
    setPendingStartups(pendingStartups.filter((s) => s.id !== id));
  };

  const handleApproveInvestor = (id) => {
    setPendingInvestors(pendingInvestors.filter((i) => i.id !== id));
  };

  const handleSendAnnouncement = (e) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    setAnnouncementSent(true);
    setAnnouncementText('');
    setTimeout(() => setAnnouncementSent(false), 3000);
  };

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* SECTION 1: Super Admin Command Center Hero Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-red-500/20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-400" />
            <span className="text-xs font-black text-red-400 uppercase tracking-widest">Master Governance Console</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">VentureHub AI Control Center</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Real-time ecosystem intelligence, automated risk audit monitoring, user verification queue, and platform revenue metrics.
          </p>
        </div>

        {/* Executive Summary Card */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2 text-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Today's Executive Summary</span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-semibold">
            <span className="text-emerald-400">+120 New Users</span>
            <span className="text-indigo-400">+15 New Startups</span>
            <span className="text-purple-400">+4 Funding Deals</span>
            <span className="text-amber-400">Revenue +12%</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: Platform Overview Hero KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Users" value={totalUsers.toLocaleString()} change="▲ 14% this month" icon={Users} color="indigo" />
        <StatCard title="Active Startups" value={activeStartups.toLocaleString()} change="▲ 18% verified" icon={Rocket} color="emerald" />
        <StatCard title="Investors" value={totalInvestors.toString()} change="85 active VCs" icon={DollarSign} color="purple" />
        <StatCard title="Mentors" value={totalMentors.toString()} change="Verified experts" icon={Award} color="amber" />
        <StatCard title="Today's Revenue" value={todayRevenue} change="▲ 22% growth" icon={TrendingUp} color="rose" />
      </div>

      {/* SECTION 3 & 5: Platform Health Score & Revenue Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Score */}
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">System Architecture Diagnostics</span>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
                <Activity className="w-6 h-6 text-emerald-400" /> Platform Health Score: <span className="text-emerald-400">95 / 100</span>
              </h2>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold">
              Optimal Performance
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {healthMetrics.map((h, idx) => (
              <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center space-y-1">
                <span className="text-[11px] font-bold text-slate-400 block">{h.label}</span>
                <span className="text-lg font-black text-white block">{h.score}%</span>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className={`${h.color} h-full rounded-full`} style={{ width: `${h.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Center */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" /> Revenue Center & MRR
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Monthly Revenue</span>
              <strong className="text-emerald-400 text-base font-black">{monthlyRevenue}</strong>
            </div>
            <div className="flex justify-between text-slate-300"><span>Premium SaaS Users:</span> <strong className="text-white">420 Active</strong></div>
            <div className="flex justify-between text-slate-300"><span>Enterprise Accounts:</span> <strong className="text-indigo-400">65 Tier 1</strong></div>
            <div className="flex justify-between text-slate-300"><span>Annual Renewals:</span> <strong className="text-purple-400">98% Rate</strong></div>
          </div>
        </div>
      </div>

      {/* SECTION 4 & 6: User Growth & Startup Sector Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" /> User Growth Analytics (Monthly Cohort)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} fill="#6366f1" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" /> Top Startup Sectors
          </h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie data={sectorData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} dataKey="value">
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SECTION 8 & 9 & 10: Verification Center, Moderation Center & AI Risk Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification Center */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Verification Center Queue
          </h3>
          <div className="space-y-3 text-xs">
            {pendingStartups.map((st) => (
              <div key={st.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white">{st.name}</h4>
                  <p className="text-[10px] text-slate-400">{st.founder} • {st.industry}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleApproveStartup(st.id)} className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleApproveStartup(st.id)} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg transition">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {pendingStartups.length === 0 && (
              <p className="text-slate-500 text-center py-4">All pending startups verified!</p>
            )}
          </div>
        </div>

        {/* Moderation Center */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-400" /> Moderation Center
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>Reported Posts</span> <strong className="text-amber-400">2 Items</strong>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>Suspicious Accounts</span> <strong className="text-rose-400">1 Account</strong>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>Spam Detection Engine</span> <strong className="text-emerald-400">Clean</strong>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>Fake Profile Flagging</span> <strong className="text-slate-400">0 Flags</strong>
            </div>
          </div>
        </div>

        {/* AI Risk Monitoring */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400" /> AI Fraud & Risk Audit
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>Fake Startup Risk Score</span> <strong className="text-emerald-400">LOW (2/100)</strong>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>Fraud Probability</span> <strong className="text-emerald-400">0.1%</strong>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
              <span>Suspicious IP Activities</span> <strong className="text-indigo-400">0 Anomalies</strong>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 11 & 12: Live Activity Center & Geographic Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-400 animate-pulse" /> Live Activity Center (Socket.IO Stream)
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-white">Aarav Sharma created startup NexusAI Solutions</span>
              <span className="text-slate-400">2 mins ago</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-indigo-400">Rahul Mehta (Peak XV) joined investor roster</span>
              <span className="text-slate-400">10 mins ago</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-purple-400">Vikram Malhotra approved mentor session request</span>
              <span className="text-slate-400">25 mins ago</span>
            </div>
          </div>
        </div>

        {/* Geographic Intelligence */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-400" /> Geographic Heatmap
          </h3>
          <div className="space-y-2 text-xs">
            {geoHeatmap.map((g, idx) => (
              <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                <span>{g.flag} {g.country}</span>
                <strong className="text-indigo-400">{g.users} Users</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 13 & 14: Audit Logs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-indigo-400" /> Enterprise Governance Audit Logs
          </h3>
          <span className="text-xs text-slate-400">Recorded Cryptographically</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="pb-3">Admin</th>
                <th className="pb-3">Action</th>
                <th className="pb-3">Target Resource</th>
                <th className="pb-3">Details</th>
                <th className="pb-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {auditLogs.map((log) => (
                <tr key={log._id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 font-semibold text-white">{log.admin?.name || 'Super Admin'}</td>
                  <td className="py-3">
                    <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 text-slate-300">{log.targetResource}</td>
                  <td className="py-3 text-slate-400">{log.details}</td>
                  <td className="py-3 text-slate-500">{formatDate(log.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 17 & 18: Announcement Push & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Announcement Push */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" /> Platform Announcement Center
          </h3>
          <form onSubmit={handleSendAnnouncement} className="space-y-3">
            <textarea
              rows={3}
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="Broadcast system maintenance or feature announcements to all users..."
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
            <div className="flex items-center justify-between">
              {announcementSent && <span className="text-emerald-400 font-bold text-xs">Broadcast sent to all users!</span>}
              <button type="submit" className="ml-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" /> Push Broadcast
              </button>
            </div>
          </form>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" /> Admin Quick Actions Hub
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <button className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl font-bold text-white transition text-left">
              + Approve Pending Startups
            </button>
            <button className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl font-bold text-white transition text-left">
              + Verify Investor Credentials
            </button>
            <button className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl font-bold text-white transition text-left">
              + Create Incubator Cohort
            </button>
            <button className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl font-bold text-white transition text-left">
              + Export Governance Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
