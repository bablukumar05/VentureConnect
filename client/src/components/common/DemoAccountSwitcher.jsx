import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Rocket, Briefcase, Award, Shield } from 'lucide-react';

export const DemoAccountSwitcher = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loadingRole, setLoadingRole] = useState(null);

  const demoAccounts = [
    { role: 'founder', name: 'Founder (Aarav)', email: 'aarav@nexusai.io', icon: Rocket, color: 'text-indigo-400' },
    { role: 'investor', name: 'Investor (Rahul)', email: 'rahul@venturecap.com', icon: Briefcase, color: 'text-emerald-400' },
    { role: 'mentor', name: 'Mentor (Vikram)', email: 'vikram@growthmentors.com', icon: Award, color: 'text-amber-400' },
    { role: 'admin', name: 'Super Admin', email: 'admin@ventureconnect.com', icon: Shield, color: 'text-rose-400' },
  ];

  const handleSwitch = async (acc) => {
    setLoadingRole(acc.role);
    try {
      await login(acc.email, 'password123');
      setIsOpen(false);
      navigate(`/${acc.role}/dashboard`);
    } catch (err) {
      console.error('Demo login error:', err);
    } finally {
      setLoadingRole(null);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-emerald-400 hover:from-amber-400 hover:to-emerald-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
      >
        <Sparkles className="w-3.5 h-3.5 fill-current" /> Try Demo Account
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 space-y-1">
          <div className="px-3 py-1.5 border-b border-slate-800">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
              1-Click Demo Login
            </span>
          </div>

          {demoAccounts.map((acc) => {
            const Icon = acc.icon;
            return (
              <button
                key={acc.role}
                onClick={() => handleSwitch(acc)}
                disabled={loadingRole !== null}
                className="w-full text-left px-3 py-2 text-xs hover:bg-slate-800/80 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${acc.color}`} />
                  <span className="font-bold text-slate-200 group-hover:text-white">{acc.name}</span>
                </div>
                {loadingRole === acc.role && <span className="text-[10px] text-amber-400 font-bold">Logging in...</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
