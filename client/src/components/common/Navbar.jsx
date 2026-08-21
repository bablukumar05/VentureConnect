import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { NotificationBell } from '../notifications/NotificationBell';
import { Search, LogOut, User as UserIcon, Menu, Rocket, Shield, Briefcase, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = ({ toggleMobileSidebar }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const sampleSearchItems = [
    { title: 'NexusAI Solutions', type: 'Startup', link: '/investor/discover' },
    { title: 'HealthPulse MedTech', type: 'Startup', link: '/investor/discover' },
    { title: 'Peak XV Partners', type: 'Investor', link: '/founder/matches' },
    { title: 'Vikram Malhotra', type: 'Mentor', link: '/founder/mentors' },
  ];

  const filteredSearch = searchQuery.trim()
    ? sampleSearchItems.filter((i) => i.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const getRoleBadge = () => {
    switch (user?.role) {
      case 'admin':
        return <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 text-xs font-semibold rounded-full flex items-center gap-1"><Shield className="w-3 h-3" /> Admin</span>;
      case 'investor':
        return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-xs font-semibold rounded-full flex items-center gap-1"><Briefcase className="w-3 h-3" /> Investor</span>;
      case 'mentor':
        return <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 text-xs font-semibold rounded-full flex items-center gap-1"><Award className="w-3 h-3" /> Mentor</span>;
      default:
        return <span className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 text-xs font-semibold rounded-full flex items-center gap-1"><Rocket className="w-3 h-3" /> Founder</span>;
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden p-2 text-slate-400 hover:text-white bg-slate-800/60 rounded-lg"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            VC
          </div>
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-300 tracking-tight">
            VentureConnect
          </span>
        </Link>
      </div>

      {/* Global Search Bar */}
      <div className="hidden md:block relative w-64 lg:w-80">
        <div className="flex items-center bg-slate-800/80 border border-slate-700/60 rounded-full px-3 py-1.5 text-sm focus-within:border-indigo-500 transition">
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchOpen(true);
            }}
            placeholder="Search startups, investors, mentors..."
            className="bg-transparent text-slate-200 placeholder-slate-400 focus:outline-none w-full text-xs"
          />
        </div>

        {searchOpen && filteredSearch.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50">
            {filteredSearch.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                  navigate(item.link);
                }}
                className="px-4 py-2 hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs"
              >
                <span className="font-bold text-white">{item.title}</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-semibold">{item.type}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <NotificationBell />

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-800 transition border border-slate-700/50"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <div className="hidden sm:block text-left pr-1">
                  <p className="text-xs font-semibold text-white leading-none">{user.name}</p>
                  <div className="mt-0.5">{getRoleBadge()}</div>
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-800">
                    <p className="text-sm font-bold text-white">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate(`/${user.role}/dashboard`);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4 text-indigo-400" /> My Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                      navigate('/login');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg shadow-lg shadow-indigo-600/30 transition"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
