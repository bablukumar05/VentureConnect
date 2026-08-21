import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

export const AnalyticsCharts = ({ data }) => {
  const lineData = data?.dailyViews || [
    { date: 'Mon', views: 42, deckViews: 12 },
    { date: 'Tue', views: 58, deckViews: 19 },
    { date: 'Wed', views: 86, deckViews: 29 },
    { date: 'Thu', views: 71, deckViews: 24 },
    { date: 'Fri', views: 95, deckViews: 38 },
    { date: 'Sat', views: 64, deckViews: 21 },
    { date: 'Sun', views: 80, deckViews: 31 },
  ];

  const barData = [
    { name: 'FinTech', count: 18 },
    { name: 'AI/ML', count: 28 },
    { name: 'SaaS', count: 22 },
    { name: 'HealthTech', count: 14 },
    { name: 'EdTech', count: 9 },
  ];

  const pieData = [
    { name: 'Equity Raised (₹32L)', value: 64, color: '#10b981' },
    { name: 'Remaining Target (₹18L)', value: 36, color: '#6366f1' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Line Chart: Profile & Pitch Deck Views */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h4 className="text-sm font-bold text-white mb-1">Weekly Views Trajectory</h4>
        <p className="text-xs text-slate-400 mb-4">Profile vs Pitch Deck Views</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="views" name="Profile Views" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1' }} />
              <Line type="monotone" dataKey="deckViews" name="Pitch Deck Views" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Area Chart: Growth Curve */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h4 className="text-sm font-bold text-white mb-1">Monthly MRR Growth Curve</h4>
        <p className="text-xs text-slate-400 mb-4">Traction & Revenue Progression (INR)</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineData}>
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="views" name="MRR Index" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart: Investor Interests by Sector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h4 className="text-sm font-bold text-white mb-1">Investor Interests by Category</h4>
        <p className="text-xs text-slate-400 mb-4">Distribution of connection requests</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
              <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart: Funding Progress Distribution */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-white mb-1">Funding Target Distribution</h4>
          <p className="text-xs text-slate-400 mb-4">₹32L Raised vs ₹18L Remaining (64%)</p>
        </div>
        <div className="h-56 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
