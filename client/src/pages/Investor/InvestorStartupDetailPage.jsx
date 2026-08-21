import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { PitchDeckViewerModal } from '../../components/pitchdeck/PitchDeckViewerModal';
import { FundingProgressBar } from '../../components/funding/FundingProgressBar';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useChatStore } from '../../store/chatStore';
import { formatCurrencyINR } from '../../utils/formatters';
import { Rocket, FileText, Send, Bookmark, Users, TrendingUp, CheckCircle2, DollarSign } from 'lucide-react';

export const InvestorStartupDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [startup, setStartup] = useState(null);
  const [fundingSummary, setFundingSummary] = useState(null);
  const [pitchDeck, setPitchDeck] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [actionMsg, setActionMsg] = useState('');
  const { startConversation } = useChatStore();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [stRes, fundRes, deckRes] = await Promise.all([
          API.get(`/startups/${id}`),
          API.get(`/funding/summary/${id}`),
          API.get(`/pitch-decks/startup/${id}`),
        ]);
        setStartup(stRes.data.startup);
        setFundingSummary(fundRes.data.summary);
        setPitchDeck(deckRes.data.pitchDeck);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleExpressInterest = async () => {
    if (!startup || !startup.founder) return;
    try {
      await startConversation(startup.founder._id, startup._id);
      setActionMsg(`Connected with Founder ${startup.founder.name}! Redirecting to chat...`);
      setTimeout(() => {
        navigate('/investor/messages');
      }, 1200);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleSave = async () => {
    try {
      const res = await API.post(`/investors/save-startup/${startup._id}`);
      setIsSaved(res.data.isSaved);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <LoadingSpinner label="Loading Startup Profile & Pitch Deck..." />;
  if (!startup) return <div className="p-8 text-center text-slate-400">Startup profile not found.</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-extrabold text-white text-2xl">
            {startup.startupName?.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">{startup.startupName}</h2>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-xs font-bold">
                {startup.stage}
              </span>
            </div>
            <p className="text-sm text-slate-300 mt-1">{startup.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleToggleSave}
            className={`p-3 rounded-xl border transition ${
              isSaved ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Save Startup"
          >
            <Bookmark className="w-4 h-4" />
          </button>
          <button
            onClick={handleExpressInterest}
            className="flex-1 md:flex-none px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Express Interest & Chat
          </button>
        </div>
      </div>

      {actionMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> {actionMsg}
        </div>
      )}

      {/* Funding Progress Visual */}
      {fundingSummary && <FundingProgressBar summary={fundingSummary} />}

      {/* Overview & Deck Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-lg">Executive Summary</h3>
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{startup.description}</p>

          <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-xs text-slate-300">
            <div>
              <span className="text-slate-400">Business Model:</span>
              <p className="font-bold text-white mt-0.5">{startup.businessModel}</p>
            </div>
            <div>
              <span className="text-slate-400">Market Size (TAM):</span>
              <p className="font-bold text-indigo-400 mt-0.5">{startup.marketSize}</p>
            </div>
          </div>
        </div>

        {/* Pitch Deck Preview Sidebar */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-white text-base mb-2">Pitch Deck & Assets</h4>
            {pitchDeck ? (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-indigo-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{pitchDeck.fileName}</p>
                    <p className="text-[10px] text-slate-400">{(pitchDeck.fileSize / (1024 * 1024)).toFixed(2)} MB PDF</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsViewerOpen(true)}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-indigo-600/30 flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" /> Preview PDF Deck
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-500">No pitch deck uploaded yet by founder.</p>
            )}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-white text-lg flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-400" /> Founding Team
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {startup.team?.map((member, idx) => (
            <div key={idx} className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center">
                {member.name?.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-white text-sm">{member.name}</p>
                <p className="text-xs text-slate-400">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deck Modal */}
      {pitchDeck && (
        <PitchDeckViewerModal
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
          pitchDeck={pitchDeck}
        />
      )}
    </div>
  );
};
