import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { AnalyticsCharts } from '../../components/analytics/AnalyticsCharts';
import { StatCard } from '../../components/common/StatCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { BarChart3, Eye, FileText, Sparkles, TrendingUp } from 'lucide-react';

export const FounderAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get('/analytics');
        setAnalytics(res.data.analytics);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (isLoading) return <LoadingSpinner label="Compiling Startup Analytics..." />;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-400" /> Startup Metrics & Analytics
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Detailed performance metrics tracking investor interest, pitch deck downloads, and conversion funnels.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Profile Views" value={analytics?.profileViews || 482} change="18% vs last week" icon={Eye} color="indigo" />
        <StatCard title="Pitch Deck Views" value={analytics?.pitchDeckViews || 184} change="12% vs last week" icon={FileText} color="emerald" />
        <StatCard title="Investor Requests" value={analytics?.requestsCount || 14} change="5 new this week" icon={Sparkles} color="purple" />
        <StatCard title="Interest Conversion" value={`${analytics?.conversionRate || 16.8}%`} change="Top 10% benchmark" icon={TrendingUp} color="amber" />
      </div>

      <AnalyticsCharts data={analytics} />
    </div>
  );
};
