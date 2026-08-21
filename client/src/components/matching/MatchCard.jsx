import React, { useState } from 'react';
import { Sparkles, Check, ChevronDown, ChevronUp, MapPin, Briefcase, Award, Send } from 'lucide-react';
import { Badge } from '../common/Badge';

export const MatchCard = ({ match, onSendRequest, isSending = false }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const investor = match.investor;
  const user = investor?.user;
  const score = match.overallScore || 85;
  const breakdown = match.breakdown || {};

  const getScoreColor = (s) => {
    if (s >= 85) return 'from-emerald-500 to-teal-400 text-emerald-400';
    if (s >= 70) return 'from-indigo-500 to-indigo-400 text-indigo-400';
    return 'from-amber-500 to-orange-400 text-amber-400';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition">
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300">
            {user?.name?.charAt(0) || 'I'}
          </div>
          <div>
            <h4 className="text-base font-bold text-white leading-tight">{user?.name || 'Angel Investor'}</h4>
            <p className="text-xs text-slate-400">{investor?.firmName || 'Venture Syndicate'}</p>
          </div>
        </div>

        {/* Hero Score Visual */}
        <div className="text-right">
          <div className="flex items-center gap-1 font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-indigo-300">
            <Sparkles className="w-5 h-5 text-emerald-400 inline" />
            {score}% Match
          </div>
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">AI Weighted Score</p>
        </div>
      </div>

      {/* Visual Match Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs font-semibold mb-1">
          <span className="text-slate-400">Match Accuracy</span>
          <span className="text-emerald-400">{score}%</span>
        </div>
        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
          <div
            className="bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400 h-full rounded-full transition-all duration-700 shadow-sm shadow-emerald-500/30"
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>

      {/* Overview Tags */}
      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
          <span>Ticket: <strong className="text-white">{investor?.ticketSizeLabel || '₹10L - ₹1Cr'}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>Location: <strong className="text-white">{investor?.geography || 'India'}</strong></span>
        </div>
      </div>

      {/* Interactive Checkmark Badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-medium">
          <Check className="w-3 h-3" /> Industry Match
        </span>
        <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-medium">
          <Check className="w-3 h-3" /> Stage Match
        </span>
        <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-medium">
          <Check className="w-3 h-3" /> Budget Range
        </span>
        <span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1 font-medium">
          <Check className="w-3 h-3" /> Location
        </span>
      </div>

      {/* Breakdown Accordion Toggle */}
      <button
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-white py-1 transition mb-3"
      >
        <span>View 6-Criteria Weight Breakdown</span>
        {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {showBreakdown && (
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-slate-400">Industry Overlap (30%)</span>
            <span className="font-semibold text-emerald-400">{breakdown.industryMatch || 30}% / 30%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Stage Target (20%)</span>
            <span className="font-semibold text-emerald-400">{breakdown.stageMatch || 20}% / 20%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Investment Range (20%)</span>
            <span className="font-semibold text-emerald-400">{breakdown.budgetMatch || 20}% / 20%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Geography Location (10%)</span>
            <span className="font-semibold text-indigo-400">{breakdown.locationMatch || 10}% / 10%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Investment Instrument (10%)</span>
            <span className="font-semibold text-indigo-400">{breakdown.investmentTypeMatch || 10}% / 10%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Startup Traction Potential (10%)</span>
            <span className="font-semibold text-purple-400">{breakdown.potentialMatch || 9}% / 10%</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onSendRequest && onSendRequest(investor)}
          disabled={isSending}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
        >
          <Send className="w-4 h-4" /> Send Pitch Request
        </button>
      </div>
    </div>
  );
};
