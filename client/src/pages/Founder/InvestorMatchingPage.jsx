import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { MatchCard } from '../../components/matching/MatchCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useChatStore } from '../../store/chatStore';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Search, CheckCircle2 } from 'lucide-react';

export const InvestorMatchingPage = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sentMessage, setSentMessage] = useState('');
  const { startConversation } = useChatStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await API.get('/matching/founder-recommendations');
        setMatches(res.data.matches || []);
        setFilteredMatches(res.data.matches || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredMatches(matches);
    } else {
      const lower = term.toLowerCase();
      setFilteredMatches(
        matches.filter(
          (m) =>
            m.investor?.user?.name?.toLowerCase().includes(lower) ||
            m.investor?.firmName?.toLowerCase().includes(lower) ||
            m.investor?.industries?.some((ind) => ind.toLowerCase().includes(lower))
        )
      );
    }
  };

  const handleSendRequest = async (investor) => {
    try {
      await startConversation(investor.user._id);
      setSentMessage(`Pitch request sent to ${investor.user.name}! Opening direct chat...`);
      setTimeout(() => {
        navigate('/founder/messages');
      }, 1200);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <LoadingSpinner label="Running Investor Matching Algorithm..." />;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Hero Feature Engine
          </div>
          <h2 className="text-2xl font-extrabold text-white">AI Investor Matching Engine</h2>
          <p className="text-xs text-slate-400 mt-1">
            Investors ranked by Industry (30%), Stage (20%), Budget (20%), Location (10%), Instrument (10%), and Traction (10%).
          </p>
        </div>

        {/* Filter Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search investors or sector..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {sentMessage && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> {sentMessage}
        </div>
      )}

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMatches.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-slate-500 text-sm">
            No matching investor profiles found. Try clearing your search filters.
          </div>
        ) : (
          filteredMatches.map((match) => (
            <MatchCard key={match._id} match={match} onSendRequest={handleSendRequest} />
          ))
        )}
      </div>
    </div>
  );
};
