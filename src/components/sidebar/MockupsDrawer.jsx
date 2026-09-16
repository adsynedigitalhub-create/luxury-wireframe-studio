import React from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { MOCKUP_PRESETS } from '../../data/mockupsData';
import { X, Laptop, Smartphone, Tablet, Globe, Sparkles, Plus } from 'lucide-react';

export const MockupsDrawer = ({ isOpen, onClose }) => {
  const { addMockupElement } = useCanvas();

  if (!isOpen) return null;

  const handleAdd = (preset) => {
    addMockupElement(preset);
    onClose();
  };

  const getMockupIcon = (type) => {
    switch (type) {
      case 'macbook': return <Laptop className="w-4 h-4 text-[#c5a059]" />;
      case 'iphone': return <Smartphone className="w-4 h-4 text-[#c5a059]" />;
      case 'ipad': return <Tablet className="w-4 h-4 text-[#c5a059]" />;
      case 'browser': return <Globe className="w-4 h-4 text-[#c5a059]" />;
      default: return <Sparkles className="w-4 h-4 text-[#c5a059]" />;
    }
  };

  return (
    <div className="fixed inset-y-0 left-0 w-[420px] bg-[#111318] border-r border-[#282d38] shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-200 select-none">
      {/* Header */}
      <div className="p-4 border-b border-[#262a34] flex items-center justify-between">
        <div>
          <h2 className="font-serif text-base font-semibold text-white">
            Realistic Device Mockups Studio
          </h2>
          <span className="font-mono text-[10px] text-[#c5a059]">
            MacBook, iPhone 16, iPad & Browser Window Shells
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 bg-[#171922] border-b border-[#262a34] text-xs text-gray-400 font-light">
        Drop any device mockup onto the canvas. You can insert, upload, or replace design screenshots inside the screen at any time!
      </div>

      {/* Mockups List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {MOCKUP_PRESETS.map((preset) => (
          <div
            key={preset.id}
            onClick={() => handleAdd(preset)}
            className="p-4 rounded-xl border border-[#2b303d] hover:border-[#c5a059] bg-[#161820] cursor-pointer group transition duration-150 space-y-2.5 shadow-sm hover:bg-[#1a1c25]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getMockupIcon(preset.mockupType)}
                <span className="font-serif text-sm font-medium text-white group-hover:text-[#c5a059] transition">
                  {preset.name}
                </span>
              </div>
              <span className="font-mono text-[9px] text-[#c5a059] px-2 py-0.5 rounded bg-black/50 border border-white/5">
                {preset.aspectRatio}
              </span>
            </div>

            {/* Mini Visual Mockup Frame Preview */}
            <div className="h-32 rounded-lg bg-[#0e1014] border border-[#232733] p-2 flex items-center justify-center overflow-hidden relative">
              {preset.mockupType === 'browser' && (
                <div className="w-full h-full rounded border border-[#313645] bg-[#161922] flex flex-col overflow-hidden shadow-md">
                  <div className="h-4 bg-[#1e222e] px-1.5 flex items-center space-x-1 border-b border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                    <div className="flex-1 max-w-[120px] h-2 bg-black/40 rounded mx-auto" />
                  </div>
                  <img
                    src={preset.defaultScreenImage}
                    alt={preset.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {preset.mockupType === 'macbook' && (
                <div className="w-4/5 h-4/5 rounded-t-lg border-2 border-[#313645] bg-black flex flex-col overflow-hidden shadow-lg relative">
                  <div className="w-1 h-1 rounded-full bg-white/20 mx-auto my-0.5" />
                  <img
                    src={preset.defaultScreenImage}
                    alt={preset.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/30 rounded-t" />
                </div>
              )}

              {preset.mockupType === 'iphone' && (
                <div className="w-16 h-28 rounded-2xl border-2 border-[#41485a] bg-black flex flex-col overflow-hidden shadow-lg p-0.5 relative">
                  <div className="w-5 h-1.5 rounded-full bg-black mx-auto mt-0.5 z-10" />
                  <img
                    src={preset.defaultScreenImage}
                    alt={preset.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              )}

              {preset.mockupType === 'ipad' && (
                <div className="w-36 h-24 rounded-xl border-2 border-[#41485a] bg-black flex flex-col overflow-hidden shadow-lg p-0.5">
                  <img
                    src={preset.defaultScreenImage}
                    alt={preset.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}

              {preset.mockupType === 'clay' && (
                <div className="w-44 h-24 rounded-lg border-2 border-[#c5a059]/60 bg-[#161820] flex items-center justify-center p-1">
                  <img
                    src={preset.defaultScreenImage}
                    alt={preset.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              )}
            </div>

            <p className="text-xs text-gray-400 font-sans font-light">
              {preset.description}
            </p>

            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/5">
              <span className="font-mono text-gray-500">{preset.width}×{preset.height}px</span>
              <span className="text-[#c5a059] group-hover:underline flex items-center space-x-1 font-medium">
                <Plus className="w-3.5 h-3.5" />
                <span>Place on Canvas</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
