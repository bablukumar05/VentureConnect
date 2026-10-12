import React, { useState, useEffect } from 'react';
import {
  FileCheck,
  Shield,
  FileText,
  CheckCircle2,
  Lock,
  Eye,
  Download,
  Clock,
  PenTool,
  Plus,
  Send,
} from 'lucide-react';
import { api } from '../../services/api';
import { StatCard } from '../../components/common/StatCard';
import { CanvasSignaturePad } from '../../components/deals/CanvasSignaturePad';
import { WatermarkedViewerModal } from '../../components/deals/WatermarkedViewerModal';

export const DueDiligencePage = () => {
  const [documents, setDocuments] = useState([]);
  const [termSheets, setTermSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDocForView, setSelectedDocForView] = useState(null);
  const [signingTermSheetId, setSigningTermSheetId] = useState(null);
  const [proposeModalOpen, setProposeModalOpen] = useState(false);

  // Proposal state
  const [proposal, setProposal] = useState({
    startupId: '',
    roundName: 'Seed',
    investmentAmount: 750000,
    preMoneyValuation: 5000000,
    liquidationPreference: '1x Non-Participating Preference',
    boardSeats: '1 Lead Investor Observer Seat',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [docsRes, tsRes] = await Promise.all([
        api.get('/deals/vdr/documents'),
        api.get('/deals/term-sheets'),
      ]);

      if (docsRes.data?.documents) {
        setDocuments(docsRes.data.documents);
      }
      if (tsRes.data?.termSheets) {
        setTermSheets(tsRes.data.termSheets);
      }
    } catch (err) {
      console.error('Error fetching due diligence data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRequestAccess = async (docId) => {
    try {
      await api.post(`/deals/vdr/documents/${docId}/request-access`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error requesting access');
    }
  };

  const handleSignTermSheet = async (signatureDataUrl) => {
    if (!signingTermSheetId) return;
    try {
      await api.post(`/deals/term-sheets/${signingTermSheetId}/sign`, {
        signatureDataUrl,
        signerName: 'Lead Institutional Investor',
      });
      setSigningTermSheetId(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error signing term sheet');
    }
  };

  const handleProposeTermSheet = async (e) => {
    e.preventDefault();
    try {
      await api.post('/deals/term-sheets', proposal);
      setProposeModalOpen(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error sending term sheet');
    }
  };

  // Fallback demo documents if database is fresh
  const displayDocuments = documents.length > 0 ? documents : [
    {
      _id: 'vdr-demo-1',
      title: 'Audited Financial Statements & Tax Returns FY25',
      category: 'Financials',
      fileSize: '3.4 MB',
      hasAccess: true,
      watermark: 'CONFIDENTIAL • ACCREDITED INVESTOR • DUE DILIGENCE AUDIT',
      fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
    },
    {
      _id: 'vdr-demo-2',
      title: 'Cap Table Shareholder Register & Stock Option Pool',
      category: 'Cap Table',
      fileSize: '1.2 MB',
      hasAccess: false,
      myRequestStatus: 'none',
    },
    {
      _id: 'vdr-demo-3',
      title: 'Intellectual Property, Patent Assignment & Source Code Audit',
      category: 'IP & Patents',
      fileSize: '8.1 MB',
      hasAccess: false,
      myRequestStatus: 'pending',
    },
  ];

  const postMoneyCalc = Number(proposal.preMoneyValuation) + Number(proposal.investmentAmount);
  const equityCalc = postMoneyCalc > 0 ? ((Number(proposal.investmentAmount) / postMoneyCalc) * 100).toFixed(2) : 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-purple-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Investor Workspace</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Due Diligence & E-Sign Vault</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Audit verified startup legal contracts, request secure watermarked data room access, and execute binding term sheets.
          </p>
        </div>

        <button
          onClick={() => setProposeModalOpen(true)}
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-xl transition shadow-lg shadow-purple-600/30 flex items-center gap-2"
        >
          <Send className="w-4 h-4" /> Propose Investment Term Sheet
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Deal Flow" value="6 Startups" change="2 in final diligence" icon={FileCheck} color="purple" />
        <StatCard title="Term Sheets Active" value={termSheets.length.toString()} change="In review" icon={FileText} color="indigo" />
        <StatCard
          title="Executed Term Sheets"
          value={termSheets.filter((t) => t.status === 'signed').length.toString()}
          change="Fully signed"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard title="Vault Clearance" value="Tier 1 Accredited" change="Audit watermarks on" icon={Shield} color="amber" />
      </div>

      {/* Virtual Data Room Document Section */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-400" /> Virtual Data Room (VDR) Repository
          </h3>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            Cryptographic Watermarking Enabled
          </span>
        </div>

        <div className="space-y-3">
          {displayDocuments.map((doc) => (
            <div
              key={doc._id}
              className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{doc.category}</span>
                  {doc.hasAccess ? (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Access Granted
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      Protected Asset
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-white">{doc.title}</h4>
                <p className="text-xs text-slate-400">File Size: {doc.fileSize || '2.1 MB'}</p>
              </div>

              <div className="flex items-center gap-2">
                {doc.hasAccess ? (
                  <button
                    onClick={() => setSelectedDocForView(doc)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Watermarked Doc
                  </button>
                ) : doc.myRequestStatus === 'pending' ? (
                  <span className="px-3.5 py-2 bg-slate-800 text-amber-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-amber-500/30">
                    <Clock className="w-3.5 h-3.5" /> Access Pending Founder Review
                  </span>
                ) : (
                  <button
                    onClick={() => handleRequestAccess(doc._id)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-md shadow-purple-600/20"
                  >
                    <Lock className="w-3.5 h-3.5" /> Request Access
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Term Sheets & E-Signatures Section */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" /> Active Deal Term Sheets
          </h3>
          <span className="text-xs text-slate-400">Bilateral Digital Contract Execution</span>
        </div>

        {termSheets.length === 0 ? (
          <div className="p-8 text-center border border-slate-800 rounded-xl space-y-2">
            <FileText className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-slate-400 text-sm">No term sheets pending execution.</p>
            <button
              onClick={() => setProposeModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition"
            >
              Issue First Term Sheet
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {termSheets.map((ts) => (
              <div
                key={ts._id}
                className="p-5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                        {ts.roundName} Round
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          ts.status === 'signed'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {ts.status === 'signed' ? 'Fully Executed ✍️' : 'Under Negotiation'}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white mt-1">
                      ${(ts.investmentAmount / 1000).toLocaleString()}k for {ts.equityPercentage}% Equity
                    </h4>
                  </div>

                  <div className="text-right sm:text-right">
                    <span className="text-xs text-slate-400">Pre-Money Valuation</span>
                    <div className="text-base font-extrabold text-indigo-400">
                      ${(ts.preMoneyValuation / 1000000).toFixed(2)}M
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400">Issuing Founder:</span>
                    <p className="text-white font-medium mt-0.5">{ts.founder?.name || 'Startup Founder'}</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400">Liquidation Preference:</span>
                    <p className="text-white font-medium mt-0.5">{ts.liquidationPreference}</p>
                  </div>
                </div>

                {/* Signatures status block */}
                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Founder:</span>
                      {ts.founderSignature?.signed ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Signed
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> Pending
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Investor:</span>
                      {ts.investorSignature?.signed ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Signed ({new Date(ts.investorSignature.signedAt).toLocaleDateString()})
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> Pending
                        </span>
                      )}
                    </div>
                  </div>

                  {!ts.investorSignature?.signed && (
                    <button
                      onClick={() => setSigningTermSheetId(ts._id)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5"
                    >
                      <PenTool className="w-3.5 h-3.5" /> Sign with E-Signature Canvas
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Embedded Signature Canvas */}
        {signingTermSheetId && (
          <div className="p-6 bg-slate-950 border border-indigo-500/40 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-indigo-400" /> Digital Term Sheet Execution
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Draw your signature below to legally bind and record the term sheet.
                </p>
              </div>
              <button
                onClick={() => setSigningTermSheetId(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <CanvasSignaturePad
              title="Investor E-Signature Canvas"
              onSaveSignature={handleSignTermSheet}
            />
          </div>
        )}
      </div>

      {/* Propose Term Sheet Modal */}
      {proposeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Propose Deal Term Sheet</h3>
            <form onSubmit={handleProposeTermSheet} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Round Type</label>
                  <select
                    value={proposal.roundName}
                    onChange={(e) => setProposal({ ...proposal, roundName: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                  >
                    <option value="Pre-Seed">Pre-Seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A">Series A</option>
                    <option value="SAFE Note">SAFE Note</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Investment Commitment ($)</label>
                  <input
                    type="number"
                    value={proposal.investmentAmount}
                    onChange={(e) => setProposal({ ...proposal, investmentAmount: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Target Pre-Money Valuation ($)</label>
                <input
                  type="number"
                  value={proposal.preMoneyValuation}
                  onChange={(e) => setProposal({ ...proposal, preMoneyValuation: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400">Post-Money Valuation:</span>
                  <div className="text-white font-bold">${postMoneyCalc.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-slate-400">Acquired Equity:</span>
                  <div className="text-indigo-400 font-bold">{equityCalc}%</div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setProposeModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition"
                >
                  Dispatch to Founder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Watermarked Document Previewer Modal */}
      <WatermarkedViewerModal
        isOpen={Boolean(selectedDocForView)}
        onClose={() => setSelectedDocForView(null)}
        document={selectedDocForView}
      />
    </div>
  );
};
