import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Rocket, Briefcase, Award, ArrowRight, Building2, Scale, CheckSquare } from 'lucide-react';

export const RegisterPage = () => {
  const { register, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  const [role, setRole] = useState('founder');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await register({ name, email, password, role, bio });
      const roleRedirectMap = {
        founder: '/founder/dashboard',
        investor: '/investor/dashboard',
        mentor: '/mentor/dashboard',
        admin: '/admin/dashboard',
        team_member: '/team/dashboard',
        incubator: '/incubator/dashboard',
        legal: '/legal/dashboard',
      };
      navigate(roleRedirectMap[user.role] || '/');
    } catch (err) {
      console.error(err);
    }
  };

  const roleOptions = [
    { id: 'founder', name: 'Founder', icon: Rocket, color: 'bg-indigo-600' },
    { id: 'investor', name: 'Investor', icon: Briefcase, color: 'bg-emerald-600' },
    { id: 'mentor', name: 'Mentor', icon: Award, color: 'bg-amber-600' },
    { id: 'team_member', name: 'Team', icon: CheckSquare, color: 'bg-blue-600' },
    { id: 'incubator', name: 'Incubator', icon: Building2, color: 'bg-purple-600' },
    { id: 'legal', name: 'Legal Advisor', icon: Scale, color: 'bg-rose-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Create Ecosystem Account</h2>
        <p className="text-xs text-slate-400 mt-1">Select your ecosystem role to get started</p>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl text-center font-medium">
          {error}
        </div>
      )}

      {/* Role Selection Grid */}
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800">
        {roleOptions.map((item) => {
          const Icon = item.icon;
          const isSelected = role === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setRole(item.id)}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 ${
                isSelected
                  ? `${item.color} text-white shadow-lg`
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {item.name}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. Aarav Sharma"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
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
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Short Bio / Expertise</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            placeholder="Brief description of your startup, thesis, or legal/incubator background..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
        >
          {isLoading ? 'Creating Profile...' : <><ArrowRight className="w-4 h-4" /> Register as {role.replace('_', ' ')}</>}
        </button>
      </form>

      <p className="text-center text-xs text-slate-400">
        Already registered?{' '}
        <Link to="/login" className="text-indigo-400 font-bold hover:underline">
          Sign In Here
        </Link>
      </p>
    </div>
  );
};
