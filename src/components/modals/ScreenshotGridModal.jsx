import React, { useState, useEffect, useRef } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { STANDARD_SECTION_SIZES, ELEMENTOR_CONTAINER_GRIDS } from '../../data/elementorGrids';
import {
  Camera,
  X,
  Sparkles,
  UploadCloud,
  LayoutGrid,
  Check,
  Columns,
  Maximize2,
  Sliders,
  Layers,
  Eye,
  FileCheck
} from 'lucide-react';

export const ScreenshotGridModal = ({ isOpen, onClose }) => {
  const { convertScreenshotToWireframe, buildWireframeFromScreenshot } = useCanvas();

  const [imagePreview, setImagePreview] = useState(null);
  const [detectedRatio, setDetectedRatio] = useState(null);
  const [conversionMode, setConversionMode] = useState('full-page'); // 'full-page' | 'split-hero' | 'bento-grid' | 'simple-containers'
  const [selectedPresetId, setSelectedPresetId] = useState('el-2col-5050');
  const [selectedSize, setSelectedSize] = useState(STANDARD_SECTION_SIZES[1]); // 1200x600 Boxed
  const [keepBackdrop, setKeepBackdrop] = useState(true);
  const [backdropOpacity, setBackdropOpacity] = useState(25);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          handleImageFile(file);
          break;
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      processImageDataUrl(dataUrl);
    };
    reader.onerror = () => {
      alert('Failed to read image file. Please try another image.');
    };
    reader.readAsDataURL(file);
  };

  const processImageDataUrl = (dataUrl) => {
    setImagePreview(dataUrl);
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth || img.width || 1200;
      const h = img.naturalHeight || img.height || 600;
      const ratioVal = w / h;
      const ratio = ratioVal.toFixed(2);
      setDetectedRatio(`${w} × ${h}px (Aspect Ratio ${ratio}:1)`);

      if (ratioVal < 1.1) {
        setConversionMode('full-page');
      } else if (ratioVal > 1.8) {
        setConversionMode('split-hero');
      }
    };
    img.onerror = () => {
      setDetectedRatio('Image Loaded Successfully');
    };
    img.src = dataUrl;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleLoadUrl = () => {
    if (!urlInput.trim()) return;
    processImageDataUrl(urlInput.trim());
    setUrlInput('');
  };

  const handleConvertWireframe = () => {
    if (conversionMode === 'simple-containers') {
      const preset = ELEMENTOR_CONTAINER_GRIDS.find(g => g.id === selectedPresetId) || ELEMENTOR_CONTAINER_GRIDS[1];
      buildWireframeFromScreenshot({
        preset,
        size: selectedSize,
        ratios: preset.ratios,
        imagePreview,
        keepBackdrop,
        layoutType: 'simple-containers'
      });
    } else {
      convertScreenshotToWireframe({
        imagePreview,
        layoutType: conversionMode,
        keepBackdrop,
        backdropOpacity,
        customWidth: 1440
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-150 select-none">
      <div className="bg-[#121419] border border-[#2d323f] rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#282d38] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#c5a059]">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-base font-semibold text-white">
                Screenshot to Exact Editable Wireframe Reconstructor
              </h2>
              <p className="font-mono text-[10px] text-gray-400">
                Upload or paste (<kbd className="text-[#c5a059]">Ctrl+V</kbd>) any design screenshot to reconstruct real editable wireframe elements
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Upload / Paste Dropzone */}
          {!imagePreview ? (
            <div className="space-y-3">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#383e4d] hover:border-[#c5a059] bg-[#161921]/70 hover:bg-[#1c202a] rounded-2xl p-7 text-center cursor-pointer transition group relative"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.png,.jpg,.jpeg,.webp,.svg,.bmp"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleImageFile(e.target.files[0]);
                    }
                  }}
                />
                <div className="w-12 h-12 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#c5a059] mx-auto flex items-center justify-center mb-2.5 group-hover:scale-110 transition">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="font-serif text-sm text-white font-medium mb-1">
                  Click to Browse Screenshot or Drag & Drop File Here
                </p>
                <p className="font-mono text-xs text-[#c5a059]">
                  Tip: Press <kbd className="px-1.5 py-0.5 bg-black/60 border border-white/20 rounded text-[10px] text-white">Ctrl + V</kbd> to paste clipboard screenshot immediately!
                </p>
              </div>

              {/* Alternative: Paste Image URL */}
              <div className="flex items-center space-x-2 p-2 bg-[#12141a] border border-[#272b36] rounded-xl">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLoadUrl()}
                  placeholder="Or paste screenshot image URL (https://...)"
                  className="flex-1 bg-transparent px-2 text-xs font-mono text-white placeholder:text-gray-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleLoadUrl}
                  className="px-3 py-1.5 bg-[#c5a059] hover:bg-[#e4c88a] text-black font-semibold text-xs rounded-lg transition"
                >
                  Load URL
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-[#161921] border border-[#282d38] rounded-xl flex items-center space-x-4">
              <img
                src={imagePreview}
                alt="Screenshot preview"
                className="w-28 h-20 object-cover rounded-lg border border-white/10 shadow-sm"
              />
              <div className="flex-1">
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block font-semibold flex items-center space-x-1">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Screenshot Analyzed: {detectedRatio}</span>
                </span>
                <span className="font-serif text-xs text-gray-200 block mt-0.5">
                  Ready to reconstruct into full editable wireframe elements!
                </span>
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setDetectedRatio(null);
                  }}
                  className="font-mono text-[10px] text-gray-400 hover:text-red-400 underline mt-1.5 block"
                >
                  Change Screenshot
                </button>
              </div>
            </div>
          )}

          {/* 1. Reconstruct Mode Selector */}
          <div className="p-4 bg-[#161921] border border-[#282d38] rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[10px] uppercase tracking-wider text-gray-300 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>1. Select Wireframe Conversion Layout</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Option A: Full Page Wireframe */}
              <button
                type="button"
                onClick={() => setConversionMode('full-page')}
                className={`p-3 rounded-xl text-left border transition ${
                  conversionMode === 'full-page'
                    ? 'bg-[#c5a059]/15 border-[#c5a059] text-white shadow-glow'
                    : 'bg-[#12141a] border-[#292e3a] text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif text-xs font-bold text-white">Full Landing Page</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#c5a059] text-black font-semibold">
                    Recommended
                  </span>
                </div>
                <span className="text-[10px] font-sans text-gray-300 block leading-relaxed">
                  Navbar + Hero Headline & Media + Stats Strip + 3-Card Bento + Footer
                </span>
              </button>

              {/* Option B: Split 50/50 Editorial Hero */}
              <button
                type="button"
                onClick={() => setConversionMode('split-hero')}
                className={`p-3 rounded-xl text-left border transition ${
                  conversionMode === 'split-hero'
                    ? 'bg-[#c5a059]/15 border-[#c5a059] text-white shadow-glow'
                    : 'bg-[#12141a] border-[#292e3a] text-gray-400 hover:text-white'
                }`}
              >
                <span className="font-serif text-xs font-bold text-white block mb-1">Split 50/50 Editorial</span>
                <span className="text-[10px] font-sans text-gray-300 block leading-relaxed">
                  Header + Left Column Text/CTAs + Right Large Media Visual Showcase
                </span>
              </button>

              {/* Option C: Bento Grid Layout */}
              <button
                type="button"
                onClick={() => setConversionMode('bento-grid')}
                className={`p-3 rounded-xl text-left border transition ${
                  conversionMode === 'bento-grid'
                    ? 'bg-[#c5a059]/15 border-[#c5a059] text-white shadow-glow'
                    : 'bg-[#12141a] border-[#292e3a] text-gray-400 hover:text-white'
                }`}
              >
                <span className="font-serif text-xs font-bold text-white block mb-1">Bento Grid Showcase</span>
                <span className="text-[10px] font-sans text-gray-300 block leading-relaxed">
                  Header Banner + 3 Asymmetric High-Impact Feature Content Cards
                </span>
              </button>
            </div>
          </div>

          {/* 2. Trace Guide Option */}
          <div className="p-4 bg-[#161921] border border-[#282d38] rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[10px] uppercase tracking-wider text-gray-300 flex items-center space-x-1.5">
                <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>2. Trace & Compare Guide (Screenshot Reference)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={keepBackdrop}
                  onChange={(e) => setKeepBackdrop(e.target.checked)}
                  className="rounded border-[#3a4050] text-[#c5a059] focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs font-sans text-[#e4c88a] font-medium">
                  Keep faint screenshot backdrop behind wireframe
                </span>
              </label>
            </div>

            {keepBackdrop && (
              <div className="flex items-center space-x-4 pt-1">
                <span className="text-[11px] font-mono text-gray-400">Backdrop Opacity:</span>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={backdropOpacity}
                  onChange={(e) => setBackdropOpacity(Number(e.target.value))}
                  className="w-48 accent-[#c5a059]"
                />
                <span className="text-xs font-mono text-[#c5a059] font-bold">{backdropOpacity}%</span>
                <span className="text-[10px] font-sans text-gray-500">
                  (Allows you to align and trace directly against original design)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#0d0e12] border-t border-[#282d38] flex items-center justify-between">
          <span className="font-mono text-[10px] text-gray-400">
            Reconstructs editable headers, buttons, cards, typography & frames
          </span>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-gray-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConvertWireframe}
              className="px-6 py-2.5 bg-gradient-to-r from-[#c5a059] to-[#e2be72] hover:brightness-110 text-black font-semibold text-xs rounded-xl shadow-lg transition flex items-center space-x-2 font-sans"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Convert to Exact Wireframe</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
