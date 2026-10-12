import React, { useState, useEffect } from 'react';
import {
  Shield,
  FileText,
  Lock,
  Unlock,
  Upload,
  UserCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  PenTool,
  Download,
  Eye,
} from 'lucide-react';
import { api } from '../../services/api';
import { StatCard } from '../../components/common/StatCard';
import { CanvasSignaturePad } from '../../components/deals/CanvasSignaturePad';
import { WatermarkedViewerModal } from '../../components/deals/WatermarkedViewerModal';

export const VirtualDataRoomPage = () => {
  const [activeTab, setActiveTab] = useState('vdr');
  const [documents, setDocuments] = useState([]);
  const [termSheets, setTermSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [termSheetModalOpen, setTermSheetModalOpen] = useState(false);
  const [selectedDocForView, setSelectedDocForView] = useState(null);
  const [signingTermSheetId, setSigningTermSheetId] = useState(null);

  // Upload Form State
  const [newDoc, setNewDoc] = useState({
    title: '',
    category: 'Financials',
    fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
    fileSize: '1.8 MB',
    isLocked: true,
  });

  // Term Sheet Form State
  const [newTermSheet, setNewTermSheet] = useState({
    roundName: 'Seed',
    investmentAmount: 500000,
    preMoneyValuation: 4500000,
    liquidationPreference: '1x Non-Participating Preference',
    boardSeats: '1 Founder, 1 Lead Investor, 1 Independent Observer',
    notes: 'Closing contingent upon satisfactory completion of final VDR due diligence.',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [docsRes, tsRes] = await Promise.all([
        api.get('/deals/vdr/documents'),
        api.get('/deals/term-sheets'),
      ]);
      if (docsRes.data?.documents) setDocuments(docsRes.data.documents);
      if (tsRes.data?.termSheets) setTermSheets(tsRes.data.termSheets);
    } catch (err) {
      console.error('Error fetching VDR data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUploadDoc = async (e) => {
    e.preventDefault();
    try {
      await api.post('/deals/vdr/documents', newDoc);
      setUploadModalOpen(false);
      setNewDoc({
        title: '',
        category: 'Financials',
        fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
        fileSize: '1.8 MB',
        isLocked: true,
      });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error uploading document');
    }
  };

  const handleManageAccess = async (docId, investorId, action) => {
    try {
      await api.post(`/deals/vdr/documents/${docId}/manage-access`, {
        investorId,
        action,
        durationDays: 7,
      });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating access');
    }
  };

  const handleCreateTermSheet = async (e) => {
    e.preventDefault();
    try {
      await api.post('/deals/term-sheets', newTermSheet);
      setTermSheetModalOpen(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating term sheet');
    }
  };

  const handleSignTermSheet = async (signatureDataUrl) => {
    if (!signingTermSheetId) return;
    try {
      await api.post(`/deals/term-sheets/${signingTermSheetId}/sign`, {
        signatureDataUrl,
        signerName: 'Founder Executive',
      });
      setSigningTermSheetId(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error signing term sheet');
    }
  };

  // Pending access requests across all docs
  const pendingRequests = [];
  documents.forEach((doc) => {
    if (doc.accessRequests) {
      doc.accessRequests.forEach((req) => {
        if (req.status === 'pending') {
          pendingRequests.push({ ...req, documentId: doc._id, documentTitle: doc.title });
        }
      });
    }
  });

  const postMoneyPreview = Number(newTermSheet.preMoneyValuation) + Number(newTermSheet.investmentAmount);
  const equityPreview = postMoneyPreview > 0 ? ((Number(newTermSheet.investmentAmount) / postMoneyPreview) * 100).toFixed(2) : 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-purple-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Enterprise Deal Room</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Virtual Data Room & Term Sheets</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Secure investor due diligence vault with dynamic cryptographic watermarking, access approvals, and e-signable term sheets.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setUploadModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" /> Upload VDR Document
          </button>
          <button
            onClick={() => setTermSheetModalOpen(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold rounded-xl transition shadow-lg shadow-purple-600/30 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Draft Term Sheet
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="VDR Documents" value={documents.length.toString()} change="Secured & Indexed" icon={Shield} color="purple" />
        <StatCard title="Access Requests" value={pendingRequests.length.toString()} change="Awaiting approval" icon={Lock} color="amber" />
        <StatCard title="Term Sheets" value={termSheets.length.toString()} change="In negotiation" icon={FileText} color="indigo" />
        <StatCard
          title="Executed Deals"
          value={termSheets.filter((t) => t.status === 'signed').length.toString()}
          change="Both parties signed"
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('vdr')}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'vdr'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-4 h-4" /> Virtual Data Room ({documents.length})
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'requests'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <UserCheck className="w-4 h-4" /> Access Requests ({pendingRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'terms'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" /> Term Sheets & E-Sign ({termSheets.length})
        </button>
      </div>

      {/* TAB 1: VDR Documents */}
      {activeTab === 'vdr' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" /> Uploaded Diligence Assets
            </h3>
            <span className="text-xs text-slate-400">Total {documents.length} files encrypted</span>
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-xl space-y-3">
              <Shield className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-slate-400 text-sm">No diligence documents in data room yet.</p>
              <button
                onClick={() => setUploadModalOpen(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition"
              >
                Upload First Document
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc._id}
                  className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 hover:border-slate-700 transition flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {doc.category}
                      </span>
                      {doc.isLocked ? (
                        <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Locked
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                          <Unlock className="w-3 h-3" /> Open
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white">{doc.title}</h4>
                    <p className="text-xs text-slate-500">
                      Size: {doc.fileSize || '1.4 MB'} • Added {new Date(doc.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedDocForView(doc)}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-indigo-400 hover:text-indigo-300 rounded-lg transition"
                      title="Preview Watermarked Document"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition"
                      title="Download file"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Access Requests */}
      {activeTab === 'requests' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-400" /> Pending Access Authorizations
            </h3>
            <span className="text-xs text-slate-400">All approvals grant 7-day watermarked access</span>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="text-center py-10 border border-slate-800 rounded-xl space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="text-sm text-slate-400">No pending investor access requests.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingRequests.map((req, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-sm font-bold text-white">{req.documentTitle}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Requested by:{' '}
                      <span className="text-indigo-300 font-medium">
                        {req.investor?.name || 'Accredited Investor'} ({req.investor?.email || 'investor@fund.vc'})
                      </span>
                    </p>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" /> Requested {new Date(req.requestedAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleManageAccess(req.documentId, req.investor?._id || req.investor, 'approve')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition"
                    >
                      Approve (7 Days)
                    </button>
                    <button
                      onClick={() => handleManageAccess(req.documentId, req.investor?._id || req.investor, 'reject')}
                      className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs font-bold rounded-lg transition"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Term Sheets & E-Sign */}
      {activeTab === 'terms' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" /> Active Financing Term Sheets
              </h3>
              <button
                onClick={() => setTermSheetModalOpen(true)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Draft New Round
              </button>
            </div>

            {termSheets.length === 0 ? (
              <div className="text-center py-10 border border-slate-800 rounded-xl space-y-2">
                <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-sm text-slate-400">No active term sheets. Draft a term sheet to initiate formal investment closing.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {termSheets.map((ts) => (
                  <div
                    key={ts._id}
                    className="p-5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-4 hover:border-slate-700 transition"
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
                            {ts.status === 'signed' ? 'Fully Executed ✍️' : 'Under Review'}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-1">
                          ${(ts.investmentAmount / 1000).toLocaleString()}k for {ts.equityPercentage}% Equity
                        </h4>
                      </div>

                      <div className="text-right sm:text-right">
                        <span className="text-xs text-slate-400">Post-Money Valuation</span>
                        <div className="text-base font-extrabold text-indigo-400">
                          ${(ts.postMoneyValuation / 1000000).toFixed(2)}M
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Liquidation Preference</span>
                        <p className="text-white font-medium mt-0.5">{ts.liquidationPreference}</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Board Governance</span>
                        <p className="text-white font-medium mt-0.5">{ts.boardSeats}</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Investor Counterparty</span>
                        <p className="text-white font-medium mt-0.5">
                          {ts.investor?.name || 'Venture Partner'}
                        </p>
                      </div>
                    </div>

                    {/* Signatures status block */}
                    <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">Founder Signature:</span>
                          {ts.founderSignature?.signed ? (
                            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Signed ({new Date(ts.founderSignature.signedAt).toLocaleDateString()})
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" /> Awaiting Signature
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">Investor Signature:</span>
                          {ts.investorSignature?.signed ? (
                            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Signed ({new Date(ts.investorSignature.signedAt).toLocaleDateString()})
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" /> Awaiting Signature
                            </span>
                          )}
                        </div>
                      </div>

                      {!ts.founderSignature?.signed && (
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
          </div>

          {/* Embedded Signature Canvas when signing is active */}
          {signingTermSheetId && (
            <div className="p-6 bg-slate-900 border border-indigo-500/40 rounded-2xl space-y-4">
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
                title="Founder E-Signature Canvas"
                onSaveSignature={handleSignTermSheet}
              />
            </div>
          )}
        </div>
      )}

      {/* Upload Document Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Upload to Virtual Data Room</h3>
            <form onSubmit={handleUploadDoc} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Document Title</label>
                <input
                  type="text"
                  required
                  value={newDoc.title}
                  onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                  placeholder="e.g. FY25 Audited Balance Sheet & P&L"
                  className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Category</label>
                  <select
                    value={newDoc.category}
                    onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                  >
                    <option value="Financials">Financials</option>
                    <option value="Legal">Legal</option>
                    <option value="IP & Patents">IP & Patents</option>
                    <option value="Cap Table">Cap Table</option>
                    <option value="Due Diligence">Due Diligence</option>
                    <option value="Contracts">Contracts</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Lock Document</label>
                  <select
                    value={newDoc.isLocked ? 'true' : 'false'}
                    onChange={(e) => setNewDoc({ ...newDoc, isLocked: e.target.value === 'true' })}
                    className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                  >
                    <option value="true">Locked (Requires Approval)</option>
                    <option value="false">Public to Accredited</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition"
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Term Sheet Creation Modal */}
      {termSheetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Draft Investment Term Sheet</h3>
            <form onSubmit={handleCreateTermSheet} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Round Type</label>
                  <select
                    value={newTermSheet.roundName}
                    onChange={(e) => setNewTermSheet({ ...newTermSheet, roundName: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                  >
                    <option value="Pre-Seed">Pre-Seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A">Series A</option>
                    <option value="Series B">Series B</option>
                    <option value="SAFE Note">SAFE Note</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Investment Target ($)</label>
                  <input
                    type="number"
                    value={newTermSheet.investmentAmount}
                    onChange={(e) => setNewTermSheet({ ...newTermSheet, investmentAmount: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Pre-Money Valuation ($)</label>
                <input
                  type="number"
                  value={newTermSheet.preMoneyValuation}
                  onChange={(e) => setNewTermSheet({ ...newTermSheet, preMoneyValuation: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                />
              </div>

              {/* Dynamic calculations summary badge */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400">Post-Money Valuation:</span>
                  <div className="text-white font-bold">${postMoneyPreview.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-slate-400">Offered Equity:</span>
                  <div className="text-indigo-400 font-bold">{equityPreview}%</div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Liquidation Preference</label>
                <input
                  type="text"
                  value={newTermSheet.liquidationPreference}
                  onChange={(e) => setNewTermSheet({ ...newTermSheet, liquidationPreference: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setTermSheetModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition"
                >
                  Issue & Send Term Sheet
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
