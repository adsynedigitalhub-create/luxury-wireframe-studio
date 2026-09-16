import React, { useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { EXPANDED_FONTS, loadGoogleFont } from '../../data/expandedFonts';
import { X, Type, Search, Plus, Check, Sparkles } from 'lucide-react';

export const FontGalleryDrawer = ({ isOpen, onClose }) => {
  const { addTextElement, selectedElement, updateElement } = useCanvas();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [customFontInput, setCustomFontInput] = useState('');

  if (!isOpen) return null;

  const categories = ['All', 'Luxury Serif', 'Modern Sans', 'High Fashion', 'Royal Monogram', 'Script & Cursive', 'Monospace'];

  const filteredFonts = EXPANDED_FONTS.filter((f) => {
    const matchesCat = activeCategory === 'All' || f.category === activeCategory;
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleApplyFont = (fontFamily, fontName) => {
    loadGoogleFont(fontName || fontFamily);
    if (selectedElement && selectedElement.type === 'text') {
      updateElement(selectedElement.id, { fontFamily: fontFamily });
    } else {
      addTextElement(fontFamily, `Headline in ${fontName}`);
    }
    onClose();
  };

  const handleLoadCustomFont = (e) => {
    e.preventDefault();
    if (!customFontInput.trim()) return;

    const fontName = customFontInput.trim();
    loadGoogleFont(fontName);
    const fontSpec = `"${fontName}", serif, sans-serif`;

    if (selectedElement && selectedElement.type === 'text') {
      updateElement(selectedElement.id, { fontFamily: fontSpec });
    } else {
      addTextElement(fontSpec, `Typography in ${fontName}`);
    }
    setCustomFontInput('');
    onClose();
  };

  return (
    <div className="fixed inset-y-0 left-0 w-[420px] bg-[#111318] border-r border-[#282d38] shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-200 select-none">
      {/* Header */}
      <div className="p-4 border-b border-[#262a34] flex items-center justify-between">
        <div>
          <h2 className="font-serif text-base font-semibold text-white">
            Universal Typography Gallery
          </h2>
          <span className="font-mono text-[10px] text-[#c5a059]">
            {EXPANDED_FONTS.length}+ Curated Google Fonts + Instant Font Search
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Dynamic Font Loader Input (Any Google Font) */}
      <div className="p-3.5 border-b border-[#262a34] bg-[#15181f] space-y-2">
        <form onSubmit={handleLoadCustomFont} className="flex items-center space-x-1.5">
          <div className="relative flex-1">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059] absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={customFontInput}
              onChange={(e) => setCustomFontInput(e.target.value)}
              placeholder="Type ANY Google Font (e.g. 'Bodoni Moda', 'Syne')..."
              className="w-full bg-[#0d0f13] border border-[#2c303c] text-xs text-white rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:border-[#c5a059]"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 bg-[#c5a059] text-black font-semibold text-xs rounded-lg hover:bg-[#e4c88a] transition"
          >
            Load
          </button>
        </form>

        {/* Filter Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search fonts in catalog..."
            className="w-full bg-[#0d0f13] border border-[#2c303c] text-xs text-white rounded-lg pl-8 pr-2 py-1.5 focus:outline-none focus:border-[#c5a059]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="p-3 border-b border-[#262a34] flex items-center space-x-1.5 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-sans whitespace-nowrap border transition ${
              activeCategory === cat
                ? 'bg-[#c5a059] text-black font-semibold border-[#c5a059]'
                : 'bg-[#181a22] border-[#292e3a] text-gray-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Font Cards List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {filteredFonts.map((font) => {
          loadGoogleFont(font.name);
          const isCurrentFont =
            selectedElement &&
            selectedElement.type === 'text' &&
            selectedElement.fontFamily?.includes(font.name);

          return (
            <div
              key={font.name}
              onClick={() => handleApplyFont(font.family, font.name)}
              className={`p-3.5 rounded-xl border transition cursor-pointer group bg-[#161820] hover:border-[#c5a059] ${
                isCurrentFont ? 'border-[#c5a059] ring-1 ring-[#c5a059]' : 'border-[#292e3a]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-serif font-medium text-white group-hover:text-[#c5a059] transition">
                  {font.name}
                </span>
                <span className="text-[9px] font-mono text-gray-400 px-2 py-0.5 rounded bg-black/40 border border-white/5">
                  {font.category}
                </span>
              </div>

              <div
                style={{ fontFamily: font.family }}
                className="text-2xl text-[#f5f2eb] py-1.5 leading-tight truncate"
              >
                Poetry in Form & Solitude
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-gray-500 font-mono">
                <span>Google Font</span>
                <span className="text-[#c5a059] group-hover:underline flex items-center space-x-1">
                  {isCurrentFont ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3" />
                      <span>Use Font</span>
                    </>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
