import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LayoutDashboard, Sparkles, MessageSquare, User, Search, Rocket, Building2, Scale, CheckSquare } from 'lucide-react';

export const MobileNav = () => {
  const { user } = useAuthStore();
  if (!user) return null;

  const role = user.role || 'founder';

  const getQuickLinks = () => {
    switch (role) {
      case 'investor':
        return [
          { name: 'Home', path: '/investor/dashboard', icon: LayoutDashboard },
          { name: 'Discover', path: '/investor/discover', icon: Search },
          { name: 'Matches', path: '/investor/recommendations', icon: Sparkles },
          { name: 'Messages', path: '/investor/messages', icon: MessageSquare },
        ];
      case 'mentor':
        return [
          { name: 'Home', path: '/mentor/dashboard', icon: LayoutDashboard },
          { name: 'Mentees', path: '/mentor/progress', icon: User },
          { name: 'Messages', path: '/mentor/messages', icon: MessageSquare },
        ];
      case 'admin':
        return [
          { name: 'Home', path: '/admin/dashboard', icon: LayoutDashboard },
          { name: 'Users', path: '/admin/users', icon: User },
          { name: 'Startups', path: '/admin/startups', icon: Rocket },
        ];
      case 'team_member':
        return [
          { name: 'Home', path: '/team/dashboard', icon: LayoutDashboard },
          { name: 'Tasks', path: '/team/dashboard', icon: CheckSquare },
        ];
      case 'incubator':
        return [
          { name: 'Home', path: '/incubator/dashboard', icon: LayoutDashboard },
          { name: 'Cohorts', path: '/incubator/dashboard', icon: Building2 },
        ];
      case 'legal':
        return [
          { name: 'Home', path: '/legal/dashboard', icon: LayoutDashboard },
          { name: 'Legal', path: '/legal/dashboard', icon: Scale },
        ];
      default:
        return [
          { name: 'Home', path: '/founder/dashboard', icon: LayoutDashboard },
          { name: 'Startup', path: '/founder/startup', icon: Rocket },
          { name: 'Matches', path: '/founder/matches', icon: Sparkles },
          { name: 'Messages', path: '/founder/messages', icon: MessageSquare },
        ];
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-2 py-2">
      <div className="flex items-center justify-around">
        {getQuickLinks().map((link, idx) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-xs py-1 px-3 rounded-lg transition ${
                  isActive ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
