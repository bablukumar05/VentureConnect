import React from 'react';
import { StatCard } from '../../components/common/StatCard';
import { Video, Calendar, Users, Award, PlayCircle, ExternalLink } from 'lucide-react';

export const VideoConsultationPage = () => {
  const sessions = [
    { title: 'NexusAI Solutions — GTM & Pricing Advisory', founder: 'Aarav Sharma', date: 'Tomorrow at 4:00 PM', link: 'https://meet.google.com/vc-nexusai-mentoring', type: '1-on-1 Session' },
    { title: 'HealthPulse MedTech — MedTech Fundraising', founder: 'Priya Patel', date: 'Friday at 2:00 PM', link: 'https://meet.google.com/vc-healthpulse-mentoring', type: '1-on-1 Session' },
    { title: 'Webinar: Scaling SaaS from $0 to $1M ARR', founder: 'Open Cohort (38 Registered)', date: 'Next Tuesday at 6:00 PM', link: 'https://meet.google.com/vc-saas-webinar', type: 'Group Webinar' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-6 sm:p-8 rounded-3xl border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Mentor Workspace</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Video Consultations & Webinar Hosting</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Conduct 1-on-1 video advisory sessions, host group mentorship webinars, and track founder progress reports.
          </p>
        </div>

        <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center gap-2">
          <Video className="w-4 h-4" /> Start Instant Advisory Room
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Upcoming Sessions" value="3 Scheduled" change="1 today" icon={Video} color="indigo" />
        <StatCard title="Total Advisory Hours" value="92 Hours" change="4.9 Rating" icon={Calendar} color="purple" />
        <StatCard title="Webinar Attendees" value="142 Founders" change="Next on Tuesday" icon={Users} color="emerald" />
        <StatCard title="Performance Index" value="5.0 / 5.0" change="32 positive reviews" icon={Award} color="amber" />
      </div>

      {/* Video Consultation Room Queue */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-indigo-400" /> Upcoming Mentorship Video Rooms & Webinars
          </h3>
        </div>

        <div className="space-y-3">
          {sessions.map((s, idx) => (
            <div key={idx} className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">{s.type}</span>
                <h4 className="text-base font-extrabold text-white mt-0.5">{s.title}</h4>
                <p className="text-xs text-slate-400 mt-1">Founder / Audience: <span className="text-slate-200 font-semibold">{s.founder}</span> • Time: <span className="text-indigo-300 font-bold">{s.date}</span></p>
              </div>

              <a
                href={s.link}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 shrink-0"
              >
                <PlayCircle className="w-4 h-4" /> Join Video Meeting <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
