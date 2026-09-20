import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, Sparkles } from 'lucide-react';

export const LoginPage = () => {
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeDemo, setActiveDemo] = useState(null);

  const demoUsers = [
    { label: 'Founder', email: 'aarav@nexusai.io', role: 'founder' },
    { label: 'Investor', email: 'rahul@venturecap.com', role: 'investor' },
    { label: 'Mentor', email: 'vikram@growthmentors.com', role: 'mentor' },
    { label: 'Admin', email: 'admin@ventureconnect.com', role: 'admin' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuickDemo = async (demo) => {
    setActiveDemo(demo.role);
    setEmail(demo.email);
    setPassword('password123');
    try {
      const user = await login(demo.email, 'password123');
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      console.error(err);
    } finally {
      setActiveDemo(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white tracking-tight">Sign In</h2>
        <p className="text-xs text-slate-400 mt-1">Access your VentureConnect account</p>
      </div>

      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl text-center font-medium">
          {error}
        </div>
      )}

      {/* 1-Click Quick Demo Login */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" /> 1-Click Demo Login
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {demoUsers.map((demo) => (
            <button
              key={demo.role}
              type="button"
              disabled={isLoading || activeDemo !== null}
              onClick={() => handleQuickDemo(demo)}
              className="px-2 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 rounded-lg text-[11px] font-semibold text-slate-300 hover:text-white transition text-center disabled:opacity-50"
            >
              {activeDemo === demo.role ? '...' : demo.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-800 w-full"></div>
        <span className="bg-slate-900 px-2 text-[11px] text-slate-500 uppercase tracking-wider">or email</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition"
              placeholder="name@company.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? 'Signing In...' : <><LogIn className="w-3.5 h-3.5" /> Sign In</>}
        </button>
      </form>

      <p className="text-center text-xs text-slate-400">
        Don't have an account?{' '}
        <Link to="/register" className="text-indigo-400 font-semibold hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};
