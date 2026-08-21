import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import API from '../../services/api';
import { DollarSign, Percent, FileText, CheckCircle } from 'lucide-react';

export const AddDealModal = ({ isOpen, onClose, startupId, onSuccess }) => {
  const [amount, setAmount] = useState('500000');
  const [equity, setEquity] = useState('2.5');
  const [dealType, setDealType] = useState('Equity');
  const [proofUrl, setProofUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await API.post('/funding/deal', {
        startupId,
        amount: Number(amount),
        equityPercentage: Number(equity),
        dealType,
        proofUrl,
      });

      setIsSubmitting(false);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record investment deal');
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record Investment Deal">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Investment Amount (INR ₹)</label>
          <div className="relative">
            <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. 500000 for ₹5 Lakhs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Equity Percentage (%)</label>
          <div className="relative">
            <Percent className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="number"
              step="0.1"
              value={equity}
              onChange={(e) => setEquity(e.target.value)}
              required
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. 2.5"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Deal Instrument Type</label>
          <select
            value={dealType}
            onChange={(e) => setDealType(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
          >
            <option value="Equity">Equity Shares</option>
            <option value="SAFE">SAFE Agreement</option>
            <option value="Convertible Note">Convertible Note</option>
            <option value="Debt">Venture Debt</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Proof Document / Agreement Link (Optional)</label>
          <div className="relative">
            <FileText className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="url"
              value={proofUrl}
              onChange={(e) => setProofUrl(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-indigo-500 focus:outline-none"
              placeholder="https://drive.google.com/..."
            />
          </div>
        </div>

        <div className="pt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-emerald-600/30 flex items-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" /> Save Investment Deal
          </button>
        </div>
      </form>
    </Modal>
  );
};
