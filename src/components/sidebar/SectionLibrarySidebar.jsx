import React from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { SECTION_TEMPLATES } from '../../data/industryPresets';
import { X, Plus, Layers } from 'lucide-react';

export const SectionLibrarySidebar = ({ isOpen, onClose }) => {
  const { addSection, boardTitle } = useCanvas();

  if (!isOpen) return null;

  const handleAdd = (templateType) => {
    addSection(templateType);
    onClose();
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-[#121418] border-l border-[#282d38] shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-5 border-b border-[#282d38] flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-[#c5a059]" />
            <h2 className="font-serif text-base font-semibold text-white">Section Library</h2>
          </div>
          <p className="font-mono text-[10px] text-gray-400 mt-0.5">
            Inserting into: <span className="text-[#c5a059]">{boardTitle}</span>
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Templates List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {SECTION_TEMPLATES.map((tpl) => (
          <div
            key={tpl.type}
            className="border border-[#282d38] hover:border-[#c5a059]/60 bg-[#171920] p-4 rounded-xl space-y-2 group transition duration-150"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#c5a059]">
                {tpl.type}
              </span>
              <button
                onClick={() => handleAdd(tpl.type)}
                className="flex items-center space-x-1 px-3 py-1 bg-[#c5a059]/15 group-hover:bg-[#c5a059] text-[#c5a059] group-hover:text-black font-semibold rounded text-xs transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
            <h4 className="font-serif text-sm text-white font-medium">{tpl.name}</h4>
            <p className="font-sans text-xs text-gray-400 leading-relaxed font-light">
              {tpl.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
