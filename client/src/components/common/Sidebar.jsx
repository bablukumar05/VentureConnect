import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  LayoutDashboard,
  Rocket,
  FileText,
  Sparkles,
  DollarSign,
  Users,
  MessageSquare,
  BarChart3,
  Search,
  Briefcase,
  UserCheck,
  ShieldCheck,
  FileSpreadsheet,
  PieChart,
  Shield,
  Video,
  Building2,
  Scale,
  CheckSquare,
  Lock,
  Globe,
  Kanban,
} from 'lucide-react';

export const Sidebar = ({ isMobile = false }) => {
  const { user } = useAuthStore();

  if (!user) return null;

  const founderNavs = [
    { name: 'Dashboard', path: '/founder/dashboard', icon: LayoutDashboard },
    { name: 'Community Feed', path: '/community', icon: Globe, badge: 'Social' },
    { name: 'My Startup', path: '/founder/startup', icon: Rocket },
    { name: 'Pitch Deck', path: '/founder/pitch-deck', icon: FileText },
    { name: 'AI Analyzer', path: '/founder/ai-analyzer', icon: Sparkles, badge: 'AI' },
    { name: 'AI Matches', path: '/founder/matches', icon: Sparkles, badge: 'Hero' },
    { name: 'Fundraising CRM', path: '/founder/crm', icon: Kanban, badge: 'CRM' },
    { name: 'Cap Table Vault', path: '/founder/cap-table', icon: PieChart },
    { name: 'Funding Tracker', path: '/founder/funding', icon: DollarSign },
    { name: 'Find Mentors', path: '/founder/mentors', icon: Users },
    { name: 'Messages', path: '/founder/messages', icon: MessageSquare },
    { name: 'Analytics', path: '/founder/analytics', icon: BarChart3 },
  ];

  const investorNavs = [
    { name: 'Dashboard', path: '/investor/dashboard', icon: LayoutDashboard },
    { name: 'Community Feed', path: '/community', icon: Globe, badge: 'Social' },
    { name: 'Discover Startups', path: '/investor/discover', icon: Search },
    { name: 'AI Recommendations', path: '/investor/recommendations', icon: Sparkles, badge: 'Hero' },
    { name: 'Due Diligence Vault', path: '/investor/due-diligence', icon: Shield },
    { name: 'Deal Requests', path: '/investor/requests', icon: Users },
    { name: 'Portfolio Track', path: '/investor/portfolio', icon: Briefcase },
    { name: 'Messages', path: '/investor/messages', icon: MessageSquare },
  ];

  const mentorNavs = [
    { name: 'Dashboard', path: '/mentor/dashboard', icon: LayoutDashboard },
    { name: 'Community Feed', path: '/community', icon: Globe, badge: 'Social' },
    { name: 'Video Advisory', path: '/mentor/video-consult', icon: Video, badge: 'Live' },
    { name: 'Mentorship Requests', path: '/mentor/requests', icon: Users },
    { name: 'Mentees & Progress', path: '/mentor/progress', icon: UserCheck },
    { name: 'Messages', path: '/mentor/messages', icon: MessageSquare },
  ];

  const adminNavs = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Community Feed', path: '/community', icon: Globe, badge: 'Social' },
    { name: 'Security & Fraud', path: '/admin/security', icon: Lock, badge: 'Sec' },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Verify Startups', path: '/admin/startups', icon: ShieldCheck },
    { name: 'Funding Deals', path: '/admin/funding', icon: DollarSign },
    { name: 'Audit Logs', path: '/admin/audit-logs', icon: FileSpreadsheet },
  ];

  const teamNavs = [
    { name: 'Team Dashboard', path: '/team/dashboard', icon: LayoutDashboard },
    { name: 'Community Feed', path: '/community', icon: Globe, badge: 'Social' },
    { name: 'Assigned Tasks', path: '/team/dashboard', icon: CheckSquare },
    { name: 'Shared Documents', path: '/founder/pitch-deck', icon: FileText },
  ];

  const incubatorNavs = [
    { name: 'Incubator Control', path: '/incubator/dashboard', icon: Building2 },
    { name: 'Community Feed', path: '/community', icon: Globe, badge: 'Social' },
    { name: 'Cohort Management', path: '/incubator/dashboard', icon: Users },
  ];

  const legalNavs = [
    { name: 'Legal Governance', path: '/legal/dashboard', icon: Scale },
    { name: 'Community Feed', path: '/community', icon: Globe, badge: 'Social' },
    { name: 'Compliance Audits', path: '/legal/dashboard', icon: ShieldCheck },
  ];

  const navItems =
    user.role === 'admin'
      ? adminNavs
      : user.role === 'investor'
      ? investorNavs
      : user.role === 'mentor'
      ? mentorNavs
      : user.role === 'team_member'
      ? teamNavs
      : user.role === 'incubator'
      ? incubatorNavs
      : user.role === 'legal'
      ? legalNavs
      : founderNavs;

  return (
    <aside className={isMobile ? "flex flex-col w-full" : "hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 shrink-0 p-4 min-h-[calc(100vh-61px)]"}>
      <div className="mb-4 px-3 py-2 bg-slate-800/40 rounded-xl border border-slate-800">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Navigation Menu</p>
        <p className="text-sm font-bold text-white capitalize mt-0.5">{user.role?.replace('_', ' ')} Workspace</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] bg-gradient-to-r from-amber-500 to-emerald-400 text-slate-950 font-black px-1.5 py-0.5 rounded uppercase">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer info widget */}
      <div className="mt-auto p-3 rounded-xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-900/40 text-xs text-slate-400">
        <p className="font-semibold text-indigo-300">VentureConnect v1.0</p>
        <p className="mt-1 text-slate-400">Full Phase 1-11 Ecosystem</p>
      </div>
    </aside>
  );
};
