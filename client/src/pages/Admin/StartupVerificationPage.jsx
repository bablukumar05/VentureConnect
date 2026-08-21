import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Rocket, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

export const StartupVerificationPage = () => {
  const [startups, setStartups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const res = await API.get('/startups/all');
        setStartups(res.data.startups || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStartups();
  }, []);

  const handleVerification = async (startupId, status) => {
    try {
      await API.put('/admin/verify-startup', { startupId, status });
      setStartups(startups.map((s) => (s._id === startupId ? { ...s, status } : s)));
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <LoadingSpinner label="Loading Startups Verification Suite..." />;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-red-400" /> Startup Verification & Governance
        </h2>
        <p className="text-xs text-slate-400 mt-1">Review pitch decks and verify startup authenticity before public listing.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="divide-y divide-slate-800/60">
          {startups.map((st) => (
            <div key={st._id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-base">{st.startupName}</h4>
                  <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px] font-semibold">
                    {st.stage} • {st.industry}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{st.tagline}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 mr-2">Status: {st.status}</span>
                <button
                  onClick={() => handleVerification(st._id, 'verified')}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verify
                </button>
                <button
                  onClick={() => handleVerification(st._id, 'rejected')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-red-400 font-bold text-xs rounded-xl transition flex items-center gap-1"
                >
                  <XCircle className="w-3.5 h-3.5" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
