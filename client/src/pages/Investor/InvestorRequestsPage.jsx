import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useChatStore } from '../../store/chatStore';
import { useNavigate } from 'react-router-dom';
import { Users, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';

export const InvestorRequestsPage = () => {
  const [conversations, setConversations] = useState([]);
  const { startConversation } = useChatStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await API.get('/chat/conversations');
        setConversations(res.data.conversations || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-400" /> Incoming Founder Connections
        </h2>
        <p className="text-xs text-slate-400 mt-1">Review connection and pitch requests from startup founders.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        {conversations.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">No incoming connection requests yet.</div>
        ) : (
          <div className="divide-y divide-slate-800/60">
            {conversations.map((conv) => {
              const other = conv.participants?.find((p) => p.role === 'founder') || conv.participants[0];
              return (
                <div key={conv._id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 text-indigo-300 font-bold flex items-center justify-center">
                      {other?.name?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{other?.name}</h4>
                      <p className="text-xs text-slate-400">{conv.lastMessage || 'Founder connection request'}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      startConversation(other._id);
                      navigate('/investor/messages');
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Accept & Open Chat
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
