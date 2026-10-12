import React from 'react';
import { X, ShieldCheck, Download, Eye, Lock } from 'lucide-react';

export const WatermarkedViewerModal = ({ isOpen, onClose, document, watermarkText }) => {
  if (!isOpen || !document) return null;

  const displayWatermark =
    watermarkText ||
    document.watermark ||
    `CONFIDENTIAL • VENTURECONNECT SECURE VDR • ${new Date().toISOString().slice(0, 10)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                {document.title}
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                  {document.category}
                </span>
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Lock className="w-3 h-3 text-emerald-400" /> Digital Watermarking Active • Audit Trail Logged
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={document.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition"
              title="Open full file"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Document Viewer Body with Dynamic Watermark Overlay */}
        <div className="relative flex-1 p-6 sm:p-8 overflow-y-auto bg-slate-950 flex flex-col items-center justify-center min-h-[420px] select-none">
          {/* Diagonal repeating watermark overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 flex flex-col justify-around opacity-25">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="transform -rotate-12 text-center text-xs sm:text-sm font-black tracking-widest text-slate-300 uppercase whitespace-nowrap"
              >
                {displayWatermark}
              </div>
            ))}
          </div>

          {/* Document Simulated Content */}
          <div className="relative z-10 w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6 shadow-2xl">
            <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">
                  VentureConnect Data Room Vault
                </span>
                <h2 className="text-lg font-bold text-white mt-1">{document.title}</h2>
              </div>
              <span className="text-xs text-slate-500 font-mono">DOC ID: {document._id?.slice(-8)}</span>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong>EXECUTIVE SUMMARY & CERTIFICATION:</strong> This legal/financial document has been verified by the
                issuing startup and released under strict Non-Disclosure Agreement (NDA) and VentureConnect Institutional
                Data Room protocols.
              </p>
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Document Type:</span>
                  <span className="text-white font-medium">{document.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Security Clearance:</span>
                  <span className="text-emerald-400 font-medium">Verified Access Granted</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">License Watermark:</span>
                  <span className="text-indigo-300 font-mono text-[11px] truncate max-w-[280px]">
                    {displayWatermark}
                  </span>
                </div>
              </div>
              <p className="text-slate-400 italic">
                Notice: Unauthorized reproduction, dissemination, or screenshot redistribution of this document is strictly
                prohibited and monitored through cryptographic watermarking.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <a
                href={document.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" /> View Direct Source Attachment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
