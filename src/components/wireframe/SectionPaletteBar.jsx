import React from 'react';
import { ArrowUp, ArrowDown, Copy, Trash2 } from 'lucide-react';
import { useCanvas } from '../../context/CanvasContext';

export const SectionPaletteBar = ({ section, isFirst, isLast }) => {
  const { moveSection, duplicateSection, removeSection, currentPalette } = useCanvas();

  return (
    <div className="flex items-center justify-between px-6 py-2.5 bg-[#121418]/95 backdrop-blur-md border-b border-[#282c35] text-xs select-none transition-opacity duration-200">
      <div className="flex items-center space-x-3">
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: currentPalette.accent || '#c5a059' }}
        />
        <span className="uppercase tracking-widest font-mono text-[10px] text-[#c5a059] font-medium">
          {section.type}
        </span>
        <span className="text-[#8e95a5] font-sans font-medium text-xs">
          {section.title}
        </span>
      </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            moveSection(section.id, 'up');
          }}
          disabled={isFirst}
          title="Move section up"
          className={`p-1.5 rounded transition ${
            isFirst ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            moveSection(section.id, 'down');
          }}
          disabled={isLast}
          title="Move section down"
          className={`p-1.5 rounded transition ${
            isLast ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            duplicateSection(section.id);
          }}
          title="Duplicate section (Ctrl+D)"
          className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            removeSection(section.id);
          }}
          title="Skip or Remove section (Del)"
          className="flex items-center space-x-1 px-2.5 py-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition font-sans text-[11px]"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Skip</span>
        </button>
      </div>
    </div>
  );
};
