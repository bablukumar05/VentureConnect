import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { FundingProgressBar } from '../../components/funding/FundingProgressBar';
import { AddDealModal } from '../../components/funding/AddDealModal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { formatCurrencyINR, formatDate } from '../../utils/formatters';
import { DollarSign, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';

export const FundingTrackerPage = () => {
  const [summary, setSummary] = useState(null);
  const [startup, setStartup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchFunding = async () => {
    try {
      const startupRes = await API.get('/startups/my-startup');
      const st = startupRes.data.startup;
      setStartup(st);

      if (st) {
        const sumRes = await API.get(`/funding/summary/${st._id}`);
        setSummary(sumRes.data.summary);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFunding();
  }, []);

  if (isLoading) return <LoadingSpinner label="Loading Funding Deals & Tracker..." />;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-emerald-400" /> Funding Deal Tracker
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Monitor your startup funding round progress, logged investor tickets, and equity deal records.
        </p>
      </div>

      {/* Visual Progress Bar */}
      {summary && <FundingProgressBar summary={summary} onAddDeal={() => setIsAddModalOpen(true)} />}

      {/* Deals Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-indigo-400" /> Investment Deal Log History
        </h3>

        {summary?.deals?.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            No investment deals recorded yet. Click "Record New Investment Deal" above to log a transaction.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="pb-3">Investor</th>
                  <th className="pb-3">Check Size</th>
                  <th className="pb-3">Equity Offered</th>
                  <th className="pb-3">Instrument</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Deal Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {summary?.deals?.map((deal) => (
                  <tr key={deal._id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 font-semibold text-white">
                      {deal.investor?.name || 'Angel Investor'}
                    </td>
                    <td className="py-3 font-bold text-emerald-400">{formatCurrencyINR(deal.amount)}</td>
                    <td className="py-3 text-slate-300">{deal.equityPercentage}%</td>
                    <td className="py-3 text-slate-400">{deal.dealType}</td>
                    <td className="py-3">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    </td>
                    <td className="py-3 text-slate-400">{formatDate(deal.dealDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Deal Modal */}
      {startup && (
        <AddDealModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          startupId={startup._id}
          onSuccess={fetchFunding}
        />
      )}
    </div>
  );
};
