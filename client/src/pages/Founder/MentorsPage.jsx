import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { Modal } from '../../components/common/Modal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Award, Star, Search, Send, CheckCircle2, Clock } from 'lucide-react';

export const MentorsPage = () => {
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [topic, setTopic] = useState('SaaS Growth & Go-To-Market');
  const [goals, setGoals] = useState('');
  const [message, setMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await API.get('/mentorship/mentors');
        setMentors(res.data.mentors || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMentor) return;

    try {
      await API.post('/mentorship/request', {
        mentorUserId: selectedMentor.user._id,
        topic,
        goals,
        message,
      });

      setSuccessMsg(`Mentorship request successfully sent to ${selectedMentor.user.name}!`);
      setSelectedMentor(null);
      setGoals('');
      setMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <LoadingSpinner label="Loading Industry Mentors..." />;

  const filteredMentors = mentors.filter(
    (m) =>
      m.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.expertise?.some((e) => e.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" /> Startup Advisory & Mentors
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Connect with experienced VP-level leaders and serial founders for 1-on-1 strategy guidance.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by expertise, name..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> {successMsg}
        </div>
      )}

      {/* Mentor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor._id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center font-bold text-amber-300 text-lg">
                    {mentor.user?.name?.charAt(0) || 'M'}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">{mentor.user?.name}</h4>
                    <p className="text-xs text-indigo-400 font-semibold">{mentor.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full text-xs font-bold text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {mentor.rating} ({mentor.reviewsCount})
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-4 line-clamp-2">{mentor.bio}</p>

              {/* Expertise Pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {mentor.expertise?.map((exp, idx) => (
                  <span key={idx} className="bg-slate-800 text-slate-300 text-[10px] font-medium px-2.5 py-0.5 rounded-md border border-slate-700">
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" /> {mentor.availability || '4 hrs/week'}
              </span>

              <button
                onClick={() => setSelectedMentor(mentor)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Request Mentorship
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Request Modal */}
      {selectedMentor && (
        <Modal isOpen={!!selectedMentor} onClose={() => setSelectedMentor(null)} title={`Request Mentorship from ${selectedMentor.user?.name}`}>
          <form onSubmit={handleRequestSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Advisory Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                placeholder="e.g. Go-To-Market Scaling & Pricing Strategy"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Key 30-Day Growth Goals</label>
              <textarea
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                required
                rows={3}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                placeholder="List 2-3 specific milestones you aim to achieve with this mentor..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Introductory Note</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
                placeholder="Brief message introducing your startup..."
              />
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedMentor(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Submit Request
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
