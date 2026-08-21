import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { formatCurrencyINR } from '../../utils/formatters';
import { Link } from 'react-router-dom';
import { Search, Filter, Rocket, FileText, ArrowRight } from 'lucide-react';

export const DiscoverStartupsPage = () => {
  const [startups, setStartups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');

  const fetchStartups = async () => {
    setIsLoading(true);
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (industryFilter) params.industry = industryFilter;
      if (stageFilter) params.stage = stageFilter;

      const res = await API.get('/startups/all', { params });
      setStartups(res.data.startups || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStartups();
  }, [industryFilter, stageFilter]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Search className="w-6 h-6 text-emerald-400" /> Discover Startups
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Search and filter verified startups by sector, stage, and capital requirements.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchStartups()}
            placeholder="Search startup name, keywords..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <select
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-emerald-500 focus:outline-none"
        >
          <option value="">All Industries</option>
          <option value="AI/ML">AI / ML / DeepTech</option>
          <option value="FinTech">FinTech</option>
          <option value="SaaS">B2B SaaS</option>
          <option value="HealthTech">HealthTech</option>
        </select>

        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-emerald-500 focus:outline-none"
        >
          <option value="">All Stages</option>
          <option value="Pre-Seed">Pre-Seed</option>
          <option value="Seed">Seed</option>
          <option value="Series A">Series A</option>
        </select>
      </div>

      {isLoading ? (
        <LoadingSpinner label="Fetching verified startup directory..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {startups.map((st) => (
            <div key={st._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-white text-base">{st.startupName}</h4>
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-semibold">
                      {st.industry} • {st.stage}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-indigo-400">
                    {st.startupName?.charAt(0)}
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-4 line-clamp-2">{st.tagline}</p>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-1 text-xs text-slate-300 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Seeking:</span>
                    <strong className="text-emerald-400">{formatCurrencyINR(st.fundingRequirement)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <strong className="text-white">{st.location || 'India'}</strong>
                  </div>
                </div>
              </div>

              <Link
                to={`/investor/startup/${st._id}`}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-1.5"
              >
                View Full Profile & Deck <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
