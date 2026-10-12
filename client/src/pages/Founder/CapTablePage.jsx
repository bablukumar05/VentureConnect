import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { StatCard } from '../../components/common/StatCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  PieChart as PieChartIcon,
  DollarSign,
  Users,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Sliders,
  PlusCircle,
  FileCheck2,
  ArrowRight,
  RefreshCw,
  X,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const CapTablePage = () => {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'registry'
  const [capTable, setCapTable] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulation Sliders / Controls (in Rupees)
  const [preMoney, setPreMoney] = useState(250000000); // ₹25 Cr default
  const [investment, setInvestment] = useState(50000000); // ₹5 Cr default
  const [esopExpansion, setEsopExpansion] = useState(0); // 0%, 5%, 10%
  const [simulationData, setSimulationData] = useState(null);

  // Modal State for New Shareholder Grant
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newShareholder, setNewShareholder] = useState({
    name: '',
    shareType: 'Founder Common',
    sharesCount: 500000,
    investmentAmount: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCapTable = async () => {
    try {
      const res = await API.get('/funding/cap-table');
      setCapTable(res.data.capTable);
    } catch (err) {
      console.error('Error fetching Cap Table:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const runSimulation = async () => {
    try {
      const res = await API.post('/funding/cap-table/simulate', {
        preMoneyValuation: preMoney,
        newInvestment: investment,
        esopExpansionPercent: esopExpansion,
      });
      setSimulationData(res.data.simulation);
    } catch (err) {
      console.error('Simulation error:', err);
    }
  };

  useEffect(() => {
    fetchCapTable();
  }, []);

  useEffect(() => {
    if (capTable) {
      runSimulation();
    }
  }, [capTable, preMoney, investment, esopExpansion]);

  const handleCreateShareholder = async (e) => {
    e.preventDefault();
    if (!newShareholder.name.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await API.post('/funding/cap-table/shareholder', newShareholder);
      setCapTable(res.data.capTable);
      setIsModalOpen(false);
      setNewShareholder({
        name: '',
        shareType: 'Founder Common',
        sharesCount: 500000,
        investmentAmount: 0,
      });
    } catch (err) {
      console.error('Add shareholder error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const applyPreset = (pre, inv, esop = 0) => {
    setPreMoney(pre);
    setInvestment(inv);
    setEsopExpansion(esop);
  };

  if (isLoading) return <LoadingSpinner label="Loading Equity & Cap Table Registry..." />;

  // Chart Color Palette
  const COLORS = ['#6366f1', '#10b981', '#a855f7', '#f59e0b', '#06b6d4', '#ec4899'];

  // Current Ownership Data for Pie
  const currentChartData = (capTable?.shareholders || []).map((s) => ({
    name: s.name.split(' (')[0],
    value: s.ownershipPercentage,
  }));

  // Simulated Post-Money Data for Pie
  const simulatedChartData = (simulationData?.simulatedShareholders || []).map((s) => ({
    name: s.name.split(' (')[0],
    value: s.postRoundPercentage,
  }));

  const postMoneyCalculated = preMoney + investment;
  const newInvestorPct = Number(((investment / postMoneyCalculated) * 100).toFixed(1));

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 p-6 sm:p-8 rounded-3xl border border-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Equity Governance & Institutional Deal Room
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Cap Table & Equity Dilution Simulator</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Model future funding rounds, calculate post-money equity dilution, track SAFE notes, and preserve founder control.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-emerald-600/30 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Issue Share Grant
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 ${
            activeTab === 'simulator'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sliders className="w-4 h-4" /> Round Dilution Simulator
        </button>
        <button
          onClick={() => setActiveTab('registry')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 ${
            activeTab === 'registry'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <FileCheck2 className="w-4 h-4" /> Official Shareholder Registry
        </button>
      </div>

      {/* TAB 1: DILUTION SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-8">
          {/* Quick Round Scenario Presets */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Quick Round Templates:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => applyPreset(120000000, 15000000, 0)}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-200 transition font-medium"
              >
                Pre-Seed Angel (₹1.5 Cr @ ₹12 Cr Pre)
              </button>
              <button
                onClick={() => applyPreset(250000000, 50000000, 5)}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-indigo-500/40 rounded-xl text-indigo-300 transition font-bold"
              >
                Seed Round (₹5 Cr @ ₹25 Cr Pre + 5% ESOP)
              </button>
              <button
                onClick={() => applyPreset(800000000, 200000000, 10)}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-200 transition font-medium"
              >
                Series A (₹20 Cr @ ₹80 Cr Pre)
              </button>
            </div>
          </div>

          {/* Interactive Sliders & Live Control Card */}
          <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" /> Interactive Round Modeling Controls
              </h3>
              <span className="text-xs text-indigo-400 font-semibold">Real-Time Valuation Math</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pre-Money Valuation Slider */}
              <div className="space-y-2 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Pre-Money Valuation</span>
                  <span className="text-white text-sm font-black">₹{(preMoney / 10000000).toFixed(1)} Crore</span>
                </div>
                <input
                  type="range"
                  min="50000000"
                  max="1500000000"
                  step="5000000"
                  value={preMoney}
                  onChange={(e) => setPreMoney(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>₹5 Cr</span>
                  <span>₹150 Cr</span>
                </div>
              </div>

              {/* New Capital Raised Slider */}
              <div className="space-y-2 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">New Capital Target</span>
                  <span className="text-emerald-400 text-sm font-black">₹{(investment / 10000000).toFixed(1)} Crore</span>
                </div>
                <input
                  type="range"
                  min="5000000"
                  max="400000000"
                  step="5000000"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>₹50 Lakhs</span>
                  <span>₹40 Cr</span>
                </div>
              </div>

              {/* ESOP Expansion Option */}
              <div className="space-y-2 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">ESOP Pool Expansion</span>
                  <span className="text-purple-400 text-sm font-black">+{esopExpansion}% Option</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[0, 5, 10].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setEsopExpansion(pct)}
                      className={`py-1.5 rounded-xl text-xs font-bold transition border ${
                        esopExpansion === pct
                          ? 'bg-purple-600 border-purple-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {pct === 0 ? 'None' : `+${pct}%`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated KPI Outcome Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Post-Money Valuation</span>
                <strong className="text-xl font-black text-white mt-1 block">
                  ₹{(postMoneyCalculated / 10000000).toFixed(1)} Cr
                </strong>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Incoming Investor %</span>
                <strong className="text-xl font-black text-emerald-400 mt-1 block">
                  {newInvestorPct}% Equity
                </strong>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Effective Share Price</span>
                <strong className="text-xl font-black text-indigo-300 mt-1 block">
                  ₹{simulationData?.sharePrice || (preMoney / 10000000).toFixed(2)}
                </strong>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase block">New Shares Issued</span>
                <strong className="text-xl font-black text-purple-400 mt-1 block">
                  {simulationData?.newSharesIssued?.toLocaleString() || '2,000,000'}
                </strong>
              </div>
            </div>
          </div>

          {/* Side-by-Side Ownership Comparison Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pre-Round Ownership Chart */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center justify-between">
                <span>Current Pre-Round Cap Table</span>
                <span className="text-xs text-slate-400">100% Equity Pool</span>
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={45}
                      paddingAngle={3}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {currentChartData.map((entry, index) => (
                        <Cell key={`cell-curr-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Post-Round Diluted Ownership Chart */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/10 to-slate-900 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <TrendingUp className="w-4 h-4" /> Simulated Post-Round Ownership
                </span>
                <span className="text-xs text-emerald-400 font-bold">₹{(postMoneyCalculated / 10000000).toFixed(1)} Cr Valuation</span>
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={simulatedChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={45}
                      paddingAngle={3}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {simulatedChartData.map((entry, index) => (
                        <Cell key={`cell-sim-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Dilution Impact & Wealth Creation Ledger Table */}
          <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Shareholder Dilution & Net Wealth Valuation</h3>
                <p className="text-xs text-slate-400">Even with equity dilution, higher round valuation increases the monetary value of holdings.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-800/60 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-700">
                  <tr>
                    <th className="p-3">Shareholder</th>
                    <th className="p-3">Share Class</th>
                    <th className="p-3 text-center">Pre-Round %</th>
                    <th className="p-3 text-center">Post-Round %</th>
                    <th className="p-3 text-right">Pre-Money Value</th>
                    <th className="p-3 text-right">Post-Money Value</th>
                    <th className="p-3 text-right">Net Wealth Gain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {(simulationData?.simulatedShareholders || []).map((s, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-bold text-white">{s.name}</td>
                      <td className="p-3 font-semibold text-indigo-300">{s.shareType}</td>
                      <td className="p-3 text-center font-bold text-slate-400">{s.preRoundPercentage}%</td>
                      <td className="p-3 text-center font-bold text-indigo-400">{s.postRoundPercentage}%</td>
                      <td className="p-3 text-right font-mono text-slate-300">₹{(s.preMoneyValue / 10000000).toFixed(2)} Cr</td>
                      <td className="p-3 text-right font-mono font-bold text-white">₹{(s.postMoneyValue / 10000000).toFixed(2)} Cr</td>
                      <td className="p-3 text-right font-bold text-emerald-400 font-mono">
                        +₹{(s.netGain / 10000000).toFixed(2)} Cr ▲
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OFFICIAL SHAREHOLDER REGISTRY */}
      {activeTab === 'registry' && (
        <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-emerald-400" /> Official Shareholder Registry & Capital Ledger
              </h3>
              <p className="text-xs text-slate-400">Total Authorized Capital: {capTable?.totalAuthorizedShares?.toLocaleString()} Shares</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/60 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-700">
                <tr>
                  <th className="p-3">Shareholder Name</th>
                  <th className="p-3">Share Class</th>
                  <th className="p-3">Shares Count</th>
                  <th className="p-3">Ownership %</th>
                  <th className="p-3">Capital Invested</th>
                  <th className="p-3 text-right">Estimated Valuation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {(capTable?.shareholders || []).map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition">
                    <td className="p-3 font-bold text-white">{s.name}</td>
                    <td className="p-3 font-semibold text-indigo-300">{s.shareType}</td>
                    <td className="p-3 font-mono">{s.sharesCount?.toLocaleString()}</td>
                    <td className="p-3 font-bold text-emerald-400">{s.ownershipPercentage}%</td>
                    <td className="p-3 text-slate-300 font-mono">
                      {s.investmentAmount > 0 ? `₹${(s.investmentAmount / 10000000).toFixed(2)} Cr` : 'Sweat / Founder'}
                    </td>
                    <td className="p-3 text-right font-bold text-white font-mono">
                      ₹{(((s.ownershipPercentage / 100) * preMoney) / 10000000).toFixed(2)} Cr
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Issue Share Grant Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-400" /> Issue Share Grant / Add Shareholder
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateShareholder} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Shareholder Full Name</label>
                <input
                  type="text"
                  required
                  value={newShareholder.name}
                  onChange={(e) => setNewShareholder({ ...newShareholder, name: e.target.value })}
                  placeholder="e.g. Rohan Varma (Lead Architect)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Share Class</label>
                <select
                  value={newShareholder.shareType}
                  onChange={(e) => setNewShareholder({ ...newShareholder, shareType: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Founder Common">Founder Common Stock</option>
                  <option value="Angel Preferred">Angel Preferred Stock</option>
                  <option value="ESOP Pool">ESOP Talent Pool</option>
                  <option value="VC Series A">VC Series A Preferred</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Shares Count</label>
                  <input
                    type="number"
                    required
                    value={newShareholder.sharesCount}
                    onChange={(e) => setNewShareholder({ ...newShareholder, sharesCount: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Capital Invested (₹)</label>
                  <input
                    type="number"
                    value={newShareholder.investmentAmount}
                    onChange={(e) => setNewShareholder({ ...newShareholder, investmentAmount: Number(e.target.value) })}
                    placeholder="0"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  {isSubmitting ? 'Issuing Grant...' : 'Confirm Share Grant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
