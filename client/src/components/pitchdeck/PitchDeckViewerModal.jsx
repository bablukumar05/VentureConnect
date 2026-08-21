import React from 'react';
import { Modal } from '../common/Modal';
import { FileText, Download, Eye, Calendar, HardDrive, ExternalLink } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const PitchDeckViewerModal = ({ isOpen, onClose, pitchDeck }) => {
  if (!pitchDeck) return null;

  const fileSizeMB = (pitchDeck.fileSize / (1024 * 1024)).toFixed(2);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pitch Deck Viewer & Analytics" maxWidth="max-w-4xl">
      <div className="space-y-6">
        {/* Meta Bar */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <div>
              <p className="font-bold text-white text-sm">{pitchDeck.fileName || 'Startup_Pitch_Deck.pdf'}</p>
              <p className="text-slate-400">PDF Document</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span><strong>{pitchDeck.viewsCount || 0}</strong> Views</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Download className="w-4 h-4 text-indigo-400" />
              <span><strong>{pitchDeck.downloadsCount || 0}</strong> Downloads</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-slate-400" />
              <span>{fileSizeMB} MB</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{formatDate(pitchDeck.uploadedAt)}</span>
            </div>
          </div>
        </div>

        {/* PDF Viewer Frame */}
        <div className="w-full h-[480px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden relative flex flex-col items-center justify-center">
          {pitchDeck.fileUrl ? (
            <iframe
              src={pitchDeck.fileUrl}
              title="Pitch Deck PDF Preview"
              className="w-full h-full border-none"
            />
          ) : (
            <div className="text-center p-8 space-y-3">
              <FileText className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-400 text-sm">PDF Preview not directly embedded. Click below to view.</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <a
            href={pitchDeck.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl transition flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" /> Open Fullscreen
          </a>
          <a
            href={pitchDeck.fileUrl}
            download={pitchDeck.fileName}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download PDF
          </a>
        </div>
      </div>
    </Modal>
  );
};
