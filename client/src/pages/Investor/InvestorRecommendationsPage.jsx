import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { formatCurrencyINR } from '../../utils/formatters';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export const InvestorRecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await API.get('/matching/investor-recommendations');
        setRecommendations(res.data.matches || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  if (isLoading) return <LoadingSpinner label="Calculating AI Thesis Matches..." />;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Hero Feature Engine
        </div>
        <h2 className="text-2xl font-extrabold text-white">AI Recommended Startups</h2>
        <p className="text-xs text-slate-400 mt-1">
          Startups matching your investment criteria ranked by 6-criteria weighted algorithm.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((match) => {
          const startup = match.startup;
          const score = match.overallScore || 85;
          return (
            <div key={match._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-lg">{startup?.startupName}</h4>
                  <p className="text-xs text-slate-400">{startup?.tagline}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-emerald-400">{score}% Match</span>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">AI Thesis Score</p>
                </div>
              </div>

              {/* Score bar */}
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400 h-full rounded-full"
                  style={{ width: `${score}%` }}
                ></div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Industry Match
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Stage Match
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Budget Match
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-white">Seeking {formatCurrencyINR(startup?.fundingRequirement)}</span>
                <Link
                  to={`/investor/startup/${startup?._id}`}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center gap-1"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
