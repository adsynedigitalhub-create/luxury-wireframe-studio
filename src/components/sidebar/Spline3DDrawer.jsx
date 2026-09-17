import React from 'react';
import { X, Box, Sparkles, Eye, Plus, Cuboid } from 'lucide-react';
import { SPLINE_3D_PRESETS } from '../../data/spline3dPresets';
import { useCanvas } from '../../context/CanvasContext';

export const Spline3DDrawer = ({ isOpen, onClose }) => {
  const { addSplineElement } = useCanvas();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-16 w-96 bg-[#101218]/95 backdrop-blur-2xl border-r border-[#2a2f3e] z-50 flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
      {/* Header */}
      <div className="p-4 border-b border-[#262a38] flex items-center justify-between bg-black/30">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#c5a059] to-[#e4c88a] flex items-center justify-center text-black shadow-glow">
            <Cuboid className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white tracking-wide flex items-center space-x-2">
              <span>Spline 3D Models</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#c5a059]/20 text-[#e4c88a] border border-[#c5a059]/40">
                2026 Era
              </span>
            </h2>
            <p className="text-[10px] text-gray-400 font-sans">
              Interactive 3D WebGL scenes with mouse physics
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Models List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {SPLINE_3D_PRESETS.map((preset) => (
          <div
            key={preset.id}
            className="group rounded-xl border border-[#2b3142] hover:border-[#c5a059] bg-[#151821] hover:bg-[#1a1e2a] overflow-hidden transition-all duration-300 shadow-md hover:shadow-glow flex flex-col"
          >
            {/* Preview Image / Fallback */}
            <div className="h-40 relative overflow-hidden bg-black">
              <img
                src={preset.fallbackPreview}
                alt={preset.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute top-2 left-2 flex items-center space-x-1.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
                <span className="text-[9px] font-mono text-[#f5ecd5] font-semibold">
                  {preset.badge}
                </span>
              </div>
              <div className="absolute top-2 right-2 bg-[#c5a059] text-black text-[9px] font-bold font-mono px-2 py-0.5 rounded shadow">
                {preset.category}
              </div>
            </div>

            {/* Info & Action */}
            <div className="p-3.5 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-xs font-semibold text-white group-hover:text-[#f5ecd5] tracking-wide">
                  {preset.title}
                </h3>
                <p className="text-[10px] text-gray-400 leading-relaxed mt-1">
                  {preset.description}
                </p>
              </div>

              <button
                onClick={() => {
                  addSplineElement(preset);
                  onClose();
                }}
                className="mt-3 w-full py-2 bg-gradient-to-r from-[#c5a059] to-[#96793f] hover:brightness-110 text-black font-bold text-xs rounded-lg transition flex items-center justify-center space-x-1.5 shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add 3D Scene to Canvas</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
