import React, { useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { CANVA_LINES } from '../../data/canvaLinesAndFlourishes';
import { X, Sparkles, Minus, CornerDownRight, RotateCw } from 'lucide-react';

export const LinesAndFlourishesDrawer = ({ isOpen, onClose }) => {
  const { addDecorativeLine } = useCanvas();
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!isOpen) return null;

  const categories = ['All', 'Corner Lines', 'Rounded & Curves', 'Straight & Borders'];

  const filteredLines = selectedCategory === 'All'
    ? CANVA_LINES
    : CANVA_LINES.filter(l => l.category === selectedCategory);

  const handleAdd = (line) => {
    addDecorativeLine(line);
    onClose();
  };

  return (
    <div className="fixed inset-y-0 left-0 w-[420px] bg-[#111318] border-r border-[#282d38] shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-200 select-none">
      {/* Header */}
      <div className="p-4 border-b border-[#262a34] flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            <h2 className="font-serif text-base font-semibold text-white">
              Canva Lines & Corner Flourishes
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#c5a059]">
            White lines, corner framing accents, curves & waves
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="p-2.5 bg-[#161820] border-b border-[#252831] flex items-center space-x-1 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-sans whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-[#c5a059] text-black font-semibold shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="p-3 bg-[#171922] border-b border-[#262a34] text-xs text-gray-300 font-light flex items-center space-x-2">
        <RotateCw className="w-3.5 h-3.5 text-[#c5a059] flex-shrink-0" />
        <span>
          Click any line to drop onto canvas. You can freely rotate (0°–360°), scale, and change color to white or gold!
        </span>
      </div>

      {/* Lines Grid */}
      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-3">
        {filteredLines.map((line) => (
          <div
            key={line.id}
            onClick={() => handleAdd(line)}
            className="p-3 rounded-xl border border-[#2b303d] hover:border-[#c5a059] bg-[#161820] cursor-pointer group transition duration-150 flex flex-col items-center justify-between space-y-2 shadow-sm hover:bg-[#1a1c25]"
          >
            <div className="w-full flex items-center justify-between">
              <span className="font-serif text-xs text-gray-300 group-hover:text-white truncate">
                {line.name}
              </span>
              <span className="text-[9px] font-mono text-[#c5a059] opacity-0 group-hover:opacity-100 transition">
                + Add
              </span>
            </div>

            {/* SVG Visual Graphic */}
            <div className="w-full h-20 rounded-lg bg-[#0d0f14] border border-[#242833] flex items-center justify-center p-3 relative overflow-hidden group-hover:border-[#c5a059]/50 transition">
              <svg
                viewBox={line.viewBox}
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <path
                  d={line.path}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={line.strokeWidth || 2}
                  strokeDasharray={
                    line.strokeStyle === 'dashed'
                      ? '6,6'
                      : line.strokeStyle === 'dotted'
                      ? '2,6'
                      : line.strokeDasharray
                  }
                  strokeLinecap={line.strokeLinecap || 'round'}
                  strokeLinejoin="round"
                  className="group-hover:stroke-[#c5a059] transition-colors"
                />
              </svg>
            </div>

            <span className="text-[9px] font-mono text-gray-500 uppercase self-start">
              {line.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
