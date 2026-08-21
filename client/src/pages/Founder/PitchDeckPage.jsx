import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { PitchDeckViewerModal } from '../../components/pitchdeck/PitchDeckViewerModal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { FileText, UploadCloud, Eye, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const PitchDeckPage = () => {
  const [pitchDeck, setPitchDeck] = useState(null);
  const [startup, setStartup] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const loadDeckData = async () => {
      try {
        const startupRes = await API.get('/startups/my-startup');
        const st = startupRes.data.startup;
        setStartup(st);
        if (st) {
          const deckRes = await API.get(`/pitch-decks/startup/${st._id}`);
          setPitchDeck(deckRes.data.pitchDeck);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadDeckData();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validation
    if (file.type !== 'application/pdf') {
      setMessage({ type: 'error', text: 'Invalid file format! Only PDF pitch decks are supported.' });
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'File size exceeds maximum 25MB limit.' });
      return;
    }

    setIsUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await API.post('/pitch-decks/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPitchDeck(res.data.pitchDeck);
      setMessage({ type: 'success', text: 'Pitch Deck PDF uploaded & attached successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Upload failed' });
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) return <LoadingSpinner label="Loading Pitch Deck Storage..." />;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-indigo-400" /> Pitch Deck Management
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Upload and manage your startup pitch deck PDF. Investors will preview & download this during deal review.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl border text-sm font-semibold flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}
        >
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      <div className="bg-slate-900 border-2 border-dashed border-slate-700/80 rounded-3xl p-8 sm:p-12 text-center hover:border-indigo-500/80 transition relative overflow-hidden group">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          disabled={isUploading}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
        />

        <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-lg font-bold text-white mb-1">
          {isUploading ? 'Uploading PDF Deck...' : 'Click or Drag & Drop Pitch Deck PDF'}
        </h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Supported file format: PDF up to 25MB. Automatically saved and secured.
        </p>
      </div>

      {/* Active Deck Card */}
      {pitchDeck && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">{pitchDeck.fileName}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Uploaded: {formatDate(pitchDeck.uploadedAt)} • {(pitchDeck.fileSize / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsViewerOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" /> Preview Deck
            </button>
            <a
              href={pitchDeck.fileUrl}
              download={pitchDeck.fileName}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" /> Download
            </a>
          </div>
        </div>
      )}

      {/* Viewer Modal */}
      {pitchDeck && (
        <PitchDeckViewerModal
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
          pitchDeck={pitchDeck}
        />
      )}
    </div>
  );
};
