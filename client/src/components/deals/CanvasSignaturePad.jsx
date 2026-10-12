import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Check, PenTool } from 'lucide-react';

export const CanvasSignaturePad = ({ onSaveSignature, onClear, title = 'Digital E-Signature Canvas' }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [penColor, setPenColor] = useState('#2563eb');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2.5;
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.strokeStyle = penColor;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    if (onClear) onClear();
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) return;
    const dataUrl = canvas.toDataURL('image/png');
    if (onSaveSignature) {
      onSaveSignature(dataUrl);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PenTool className="w-4 h-4 text-indigo-400" />
          <h4 className="text-sm font-bold text-white">{title}</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Pen Color:</span>
          <button
            type="button"
            onClick={() => setPenColor('#2563eb')}
            className={`w-5 h-5 rounded-full bg-blue-600 transition ${penColor === '#2563eb' ? 'ring-2 ring-white scale-110' : 'opacity-70'}`}
            title="Blue ink"
          />
          <button
            type="button"
            onClick={() => setPenColor('#0f172a')}
            className={`w-5 h-5 rounded-full bg-slate-950 border border-slate-600 transition ${penColor === '#0f172a' ? 'ring-2 ring-white scale-110' : 'opacity-70'}`}
            title="Black ink"
          />
        </div>
      </div>

      <div className="relative border-2 border-dashed border-slate-700 rounded-xl overflow-hidden bg-slate-950/80 hover:border-indigo-500/50 transition">
        <canvas
          ref={canvasRef}
          width={500}
          height={160}
          className="w-full h-40 cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {!hasDrawn && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs text-slate-500 font-medium">
            Sign inside this box with your mouse, trackpad, or finger
          </div>
        )}
        <div className="absolute bottom-2 left-4 right-4 border-b border-slate-700/60 pointer-events-none" />
      </div>

      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={clearCanvas}
          className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-lg transition flex items-center gap-1.5"
        >
          <Eraser className="w-3.5 h-3.5" /> Clear
        </button>

        <button
          type="button"
          disabled={!hasDrawn}
          onClick={handleSave}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition shadow-lg shadow-emerald-600/20 flex items-center gap-1.5"
        >
          <Check className="w-3.5 h-3.5" /> Adopt & Apply Signature
        </button>
      </div>
    </div>
  );
};
