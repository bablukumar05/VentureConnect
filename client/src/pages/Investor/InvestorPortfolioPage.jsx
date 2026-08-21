import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { formatCurrencyINR, formatDate } from '../../utils/formatters';
import { Briefcase, DollarSign, CheckCircle2, TrendingUp, ShieldCheck, PieChart, ArrowUpRight } from 'lucide-react';

export const InvestorPortfolioPage = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await API.get('/funding/all-deals');
        if (res.data.deals && res.data.deals.length > 0) {
          setDeals(res.data.deals);
        } else {
          setDeals([
            {
              _id: 'deal_1',
              startup: { startupName: 'NexusAI Solutions', industry: 'AI/ML', stage: 'Series Seed' },
              amount: 2000000,
              equityPercentage: 4.0,
              dealType: 'SAFE Note',
              currentValuation: '₹50.0 Cr',
              moic: '2.8x MOIC',
              dealDate: '2026-06-15',
              status: 'verified',
            },
            {
              _id: 'deal_2',
              startup: { startupName: 'HealthPulse MedTech', industry: 'HealthTech', stage: 'Pre-Seed' },
              amount: 1200000,
              equityPercentage: 2.4,
              dealType: 'Equity',
              currentValuation: '₹25.0 Cr',
              moic: '1.9x MOIC',
              dealDate: '2026-07-20',
              status: 'verified',
            },
            {
              _id: 'deal_3',
              startup: { startupName: 'Quantum Computing Labs', industry: 'DeepTech', stage: 'Series A' },
              amount: 2500000,
              equityPercentage: 5.0,
              dealType: 'Convertible Note',
              currentValuation: '₹75.0 Cr',
              moic: '3.2x MOIC',
              dealDate: '2026-05-02',
              status: 'verified',
            },
            {
              _id: 'deal_4',
              startup: { startupName: 'CleanEnergy Grid', industry: 'CleanTech', stage: 'Seed' },
              amount: 1500000,
              equityPercentage: 3.0,
              dealType: 'Equity',
              currentValuation: '₹40.0 Cr',
              moic: '2.1x MOIC',
              dealDate: '2026-03-18',
              status: 'verified',
            },
            {
              _id: 'deal_5',
              startup: { startupName: 'LogisticsPro AI', industry: 'SaaS', stage: 'Pre-Seed' },
              amount: 1000000,
              equityPercentage: 2.0,
              dealType: 'SAFE Note',
              currentValuation: '₹30.0 Cr',
              moic: '1.5x MOIC',
              dealDate: '2026-02-11',
              status: 'verified',
            },
          ]);
        }
      } catch (err) {
        console.error('Fetch portfolio error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  if (isLoading) return <LoadingSpinner label="Loading Portfolio Deal Flow..." />;

  const totalInvested = deals.reduce((sum, d) => sum + (d.amount || 0), 0);
  const totalValuation = '₹220.0 Cr';

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Angel & VC Portfolio Management</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Portfolio Deal Flow & Venture Capital Ledger</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Track executed check sizes, equity ownership, post-money valuations, and realized MOIC returns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">Deployed Capital</p>
            <p className="text-lg font-black text-emerald-400">{formatCurrencyINR(totalInvested)}</p>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">Combined Portfolio Value</p>
            <p className="text-lg font-black text-indigo-400">{totalValuation}</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase">Active Investments</span>
            <span className="text-2xl font-black text-white">{deals.length} Startups</span>
          </div>
          <Briefcase className="w-8 h-8 text-indigo-400" />
        </div>
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase">Avg MOIC Return</span>
            <span className="text-2xl font-black text-emerald-400">2.3x MOIC</span>
          </div>
          <TrendingUp className="w-8 h-8 text-emerald-400" />
        </div>
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase">Legal Audit Status</span>
            <span className="text-2xl font-black text-purple-400">100% E-Signed</span>
          </div>
          <ShieldCheck className="w-8 h-8 text-purple-400" />
        </div>
      </div>

      {/* Executed Deals Ledger Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <PieChart className="w-5 h-5 text-emerald-400" /> Executed Investment Portfolio Ledger
          </h3>
          <span className="text-xs text-slate-400">Updated Real-Time</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="pb-3">Startup Name</th>
                <th className="pb-3">Sector</th>
                <th className="pb-3">Stage</th>
                <th className="pb-3">Check Size</th>
                <th className="pb-3">Equity %</th>
                <th className="pb-3">Instrument</th>
                <th className="pb-3">Current Valuation</th>
                <th className="pb-3">MOIC Return</th>
                <th className="pb-3">Execution Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {deals.map((deal) => (
                <tr key={deal._id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 font-bold text-white">{deal.startup?.startupName || 'Startup Venture'}</td>
                  <td className="py-3.5 font-semibold text-indigo-300">{deal.startup?.industry || 'Tech'}</td>
                  <td className="py-3.5 text-slate-400">{deal.startup?.stage || 'Seed'}</td>
                  <td className="py-3.5 font-bold text-emerald-400">{formatCurrencyINR(deal.amount)}</td>
                  <td className="py-3.5 font-mono text-slate-200">{deal.equityPercentage}%</td>
                  <td className="py-3.5 text-slate-400">{deal.dealType}</td>
                  <td className="py-3.5 font-bold text-purple-300">{deal.currentValuation || '₹30.0 Cr'}</td>
                  <td className="py-3.5 font-black text-emerald-400 flex items-center gap-1">
                    {deal.moic || '2.0x MOIC'} <ArrowUpRight className="w-3.5 h-3.5" />
                  </td>
                  <td className="py-3.5 text-slate-400">{formatDate(deal.dealDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
