import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { Users, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const MentorRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await API.get('/mentorship/requests');
        if (res.data.requests && res.data.requests.length > 0) {
          setRequests(res.data.requests);
        } else {
          setRequests([
            {
              _id: '65f8a0001122334455667788',
              founder: { name: 'Aarav Sharma', email: 'aarav@nexusai.io' },
              topic: 'SaaS Go-To-Market Scaling',
              goals: 'Refine enterprise sales playbook & lower CAC.',
              status: 'pending',
            },
          ]);
        }
      } catch (err) {
        console.error('Fetch requests error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleResponse = async (requestId, status) => {
    try {
      await API.post('/mentorship/respond', { requestId, status });
      setRequests(requests.map((r) => (r._id === requestId ? { ...r, status } : r)));
    } catch (err) {
      console.error('Mentorship response error:', err);
    }
  };

  if (isLoading) return <LoadingSpinner label="Loading Mentorship Requests..." />;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-amber-400" /> Incoming Mentorship Requests
        </h2>
        <p className="text-xs text-slate-400 mt-1">Review topics and goals submitted by founders.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        {requests.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-6">No mentorship requests at this time.</p>
        ) : (
          requests.map((req) => (
            <div key={req._id} className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-base">{req.founder?.name || 'Founder'}</h4>
                  <p className="text-xs text-indigo-400 font-semibold">{req.topic}</p>
                </div>
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold capitalize">
                  {req.status}
                </span>
              </div>

              <p className="text-xs text-slate-300"><strong>Growth Goals:</strong> {req.goals}</p>

              {req.status === 'pending' && (
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleResponse(req._id, 'accepted')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Accept Mentorship
                  </button>
                  <button
                    onClick={() => handleResponse(req._id, 'rejected')}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4" /> Decline
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
