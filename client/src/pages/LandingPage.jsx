import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Rocket, Briefcase, Award, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Users } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="px-6 lg:px-12 py-5 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            VC
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">VentureConnect</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl transition"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 lg:px-12 py-20 max-w-7xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Automated 6-Criteria Investor Matching Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Where Groundbreaking Startups Meet <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-teal-300 to-emerald-400">Smart Capital & Mentors</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal">
          An end-to-end ecosystem for Founders, Angel Investors, VCs, and Industry Mentors. Powered by automated pitch decks, deal tracking, real-time chat, and AI recommendation scores.
        </p>

        {/* Hero CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/register"
            className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
          >
            Join Ecosystem Now
          </Link>
          <Link
            to="/login"
            className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-base px-8 py-4 rounded-2xl transition"
          >
            Explore Demo Access
          </Link>
        </div>

        {/* Live Matching Engine Preview Card */}
        <div className="mt-16 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto shadow-2xl text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400 text-xl">
                N
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">NexusAI Solutions × Peak XI Ventures</h3>
                <p className="text-xs text-slate-400">AI/ML Enterprise Automation • Seed Stage</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black text-emerald-400">92% Match</span>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Automated AI Score</p>
            </div>
          </div>

          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800 mb-4">
            <div className="bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400 h-full rounded-full w-[92%] shadow-sm shadow-emerald-500/30"></div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-medium">Industry Match 30% ✓</span>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-medium">Stage Match 20% ✓</span>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-medium">Range Match 20% ✓</span>
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-medium">Location 10% ✓</span>
          </div>
        </div>
      </section>

      {/* 4 Roles Section */}
      <section className="px-6 lg:px-12 py-16 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white">4 Distinct Role Workflows</h2>
            <p className="text-slate-400 mt-2 text-sm">Tailored dashboards and tools for every ecosystem stakeholder.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Founder Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Founders</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Create startup profile, upload pitch deck PDFs, receive investor matching recommendations, track funding targets, and request mentors.
              </p>
            </div>

            {/* Investor Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Investors</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Filter startups by stage/ticket size, view deck previews and traction analytics, save top startups, and log portfolio deals.
              </p>
            </div>

            {/* Mentor Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Mentors</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Set expertise areas and availability, accept mentee requests, schedule 1-on-1 sessions, assign growth tasks, and track mentee progress.
              </p>
            </div>

            {/* Admin Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-red-500/50 transition">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Admins</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Complete platform governance: verify/reject startups, block suspicious accounts, inspect funding deals, and audit logs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-8 bg-slate-950 border-t border-slate-900 text-center text-xs text-slate-500">
        <p>© 2026 VentureConnect Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};
