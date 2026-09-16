import React, { useState, useEffect, useRef } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { analyzeScreenshotWithAI } from '../../services/aiVisionService';
import {
  UploadCloud,
  X,
  Sparkles,
  Camera,
  Check,
  HelpCircle
} from 'lucide-react';

export const ScreenshotUploadModal = ({ isOpen, onClose }) => {
  const { loadGeneratedWireframe, activePreset } = useCanvas();

  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [industryName, setIndustryName] = useState(activePreset.name);

  // Sections to skip / exclude
  const [skipSections, setSkipSections] = useState([]);
  // Sections to add
  const [extraSections, setExtraSections] = useState([]);

  const fileInputRef = useRef(null);

  // Clipboard Paste (Ctrl+V) listener
  useEffect(() => {
    if (!isOpen) return;

    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          handleFile(file);
          break;
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      setImageBase64(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const toggleSkipSection = (secKey) => {
    setSkipSections(prev =>
      prev.includes(secKey) ? prev.filter(k => k !== secKey) : [...prev, secKey]
    );
  };

  const toggleExtraSection = (secKey) => {
    setExtraSections(prev =>
      prev.includes(secKey) ? prev.filter(k => k !== secKey) : [...prev, secKey]
    );
  };

  const handleProcess = async () => {
    if (!imageBase64) return;
    setIsProcessing(true);

    try {
      const result = await analyzeScreenshotWithAI({
        imageBase64,
        industry: industryName,
        skipSections,
        extraSections
      });

      if (result && result.data) {
        loadGeneratedWireframe(result.data);
        onClose();
      }
    } catch (err) {
      console.error('Failed to analyze screenshot:', err);
      alert('Error analyzing screenshot. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-[#121419] border border-[#2d323f] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#282d38] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#c5a059]">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-base font-semibold text-white">
                Screenshot to Editorial Wireframe
              </h2>
              <p className="font-mono text-[10px] text-gray-400">
                Reconstructs layout with luxury typography, palettes & editable sections
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Upload Zone */}
          {!imagePreview ? (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#383e4d] hover:border-[#c5a059] bg-[#161921]/60 rounded-2xl p-10 text-center cursor-pointer transition group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              <div className="w-14 h-14 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#c5a059] mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <UploadCloud className="w-7 h-7" />
              </div>
              <p className="font-serif text-base text-white font-medium mb-1">
                Drop screenshot here, or click to browse
              </p>
              <p className="font-mono text-xs text-[#c5a059] font-medium">
                Tip: Press <kbd className="px-2 py-0.5 bg-black/50 border border-white/20 rounded text-[10px]">Ctrl + V</kbd> to paste directly!
              </p>
            </div>
          ) : (
            <div className="border border-[#282d38] rounded-xl overflow-hidden bg-[#161921] p-3 flex items-center space-x-4">
              <img
                src={imagePreview}
                alt="Screenshot Preview"
                className="w-28 h-20 object-cover rounded-lg border border-white/10"
              />
              <div className="flex-1">
                <span className="font-mono text-[10px] text-emerald-400 font-medium uppercase tracking-wider block">
                  ✓ Screenshot Ready
                </span>
                <p className="font-serif text-sm text-white font-medium mt-0.5">
                  Layout structure ready to reconstruct into editorial wireframe
                </p>
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setImageBase64('');
                  }}
                  className="font-mono text-[10px] text-gray-400 hover:text-red-400 mt-1 underline transition"
                >
                  Change screenshot
                </button>
              </div>
            </div>
          )}

          {/* Target Industry */}
          <div className="p-4 bg-[#161921] border border-[#282d38] rounded-xl space-y-2">
            <label className="font-mono text-[10px] uppercase tracking-wider text-gray-400 block">
              Industry or Brand Atmosphere
            </label>
            <input
              type="text"
              value={industryName}
              onChange={(e) => setIndustryName(e.target.value)}
              placeholder="e.g. Haute Couture, Fine Jewelry, SaaS, Architecture..."
              className="w-full bg-[#1e222b] border border-[#333847] text-white text-xs rounded-lg p-2.5 font-serif focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
            />
          </div>

          {/* Skip Sections */}
          <div className="p-4 bg-[#161921] border border-[#282d38] rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[10px] uppercase tracking-wider text-gray-300">
                Sections to Skip / Remove From Original
              </label>
              <span className="font-mono text-[10px] text-gray-500">
                Click to omit from canvas
              </span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { id: 'quote', label: 'Skip Testimonial / Press' },
                { id: 'heritage', label: 'Skip Brand Story' },
                { id: 'lookbook', label: 'Skip Product Showcase' },
                { id: 'pricing', label: 'Skip Pricing' },
              ].map((item) => {
                const isSkipped = skipSections.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleSkipSection(item.id)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-sans transition ${
                      isSkipped
                        ? 'bg-red-500/15 border-red-500/40 text-red-300 line-through'
                        : 'bg-[#1d2029] border-[#2e3340] text-gray-300 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add New Sections */}
          <div className="p-4 bg-[#161921] border border-[#282d38] rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[10px] uppercase tracking-wider text-gray-300">
                New Sections to Add (Not in Original)
              </label>
              <span className="font-mono text-[10px] text-gray-500">
                Click to inject fresh components
              </span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { id: 'pricing', label: '+ Private Tier Pricing Cards' },
                { id: 'heritage', label: '+ Heritage & Craft Manifesto' },
                { id: 'faq', label: '+ Client Concierge FAQ' },
              ].map((item) => {
                const isAdded = extraSections.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleExtraSection(item.id)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-sans transition flex items-center space-x-1.5 ${
                      isAdded
                        ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#e4c88a] font-medium'
                        : 'bg-[#1d2029] border-[#2e3340] text-gray-300 hover:text-white'
                    }`}
                  >
                    {isAdded && <Check className="w-3.5 h-3.5 text-[#c5a059]" />}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#0d0e12] border-t border-[#282d38] flex items-center justify-between">
          <span className="font-mono text-[10px] text-gray-500">
            Heuristic Redesign Engine Active
          </span>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-gray-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              disabled={!imageBase64 || isProcessing}
              onClick={handleProcess}
              className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#e4c88a] disabled:bg-gray-700 text-black font-semibold text-xs rounded-xl shadow-lg transition flex items-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Reconstructing Wireframe...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Reconstruct Wireframe</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
