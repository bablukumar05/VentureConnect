import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { formatCurrencyINR, formatDate } from '../../utils/formatters';
import { DollarSign, CheckCircle2 } from 'lucide-react';

export const AdminFundingPage = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await API.get('/funding/all-deals');
        setDeals(res.data.deals || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDeals();
  }, []);

  if (isLoading) return <LoadingSpinner label="Loading Funding Monitoring Panel..." />;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-emerald-400" /> Platform Funding Monitoring
        </h2>
        <p className="text-xs text-slate-400 mt-1">Audit investment transactions and equity deal records across all startups.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="pb-3">Startup</th>
                <th className="pb-3">Investor</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Equity %</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {deals.map((deal) => (
                <tr key={deal._id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 font-semibold text-white">{deal.startup?.startupName}</td>
                  <td className="py-3 text-slate-300">{deal.investor?.name}</td>
                  <td className="py-3 font-bold text-emerald-400">{formatCurrencyINR(deal.amount)}</td>
                  <td className="py-3 text-slate-300">{deal.equityPercentage}%</td>
                  <td className="py-3 text-slate-400">{deal.dealType}</td>
                  <td className="py-3">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  </td>
                  <td className="py-3 text-slate-400">{formatDate(deal.dealDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
