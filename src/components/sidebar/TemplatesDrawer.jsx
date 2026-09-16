import React, { useState, useMemo } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { PREMADE_CANVAS_TEMPLATES } from '../../data/premadeCanvasTemplates';
import { X, Sparkles, Layout, ArrowRight, Search, Palette, Layers } from 'lucide-react';

export const TemplatesDrawer = ({ isOpen, onClose }) => {
  const { loadPremadeTemplate } = useCanvas();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Editorial & Magazine',
    'Swiss & Minimalist',
    'Brutalist & Bauhaus',
    'Luxury & Elegance',
    'Cyber & Futuristic',
    'Glass & Gradients'
  ];

  const filteredTemplates = useMemo(() => {
    return PREMADE_CANVAS_TEMPLATES.filter((tpl) => {
      const matchesCategory =
        selectedCategory === 'All' || tpl.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tpl.name.toLowerCase().includes(q) ||
        tpl.description.toLowerCase().includes(q) ||
        tpl.category.toLowerCase().includes(q) ||
        (tpl.styles && tpl.styles.some((s) => s.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  if (!isOpen) return null;

  const handleSelectTemplate = (tpl) => {
    loadPremadeTemplate(tpl);
    onClose();
  };

  return (
    <div className="fixed inset-y-0 left-0 w-[460px] bg-[#111318] border-r border-[#282d38] shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-200 select-none">
      {/* Header */}
      <div className="p-4 border-b border-[#262a34] flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Palette className="w-4 h-4 text-[#c5a059]" />
            <h2 className="font-serif text-base font-semibold text-white">
              Design Aesthetics & Style Templates
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#c5a059]">
            40+ Curated Aesthetics (Editorial, Swiss, Brutalist, Bauhaus, Luxury, Cyber)
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Search Input */}
      <div className="p-3 border-b border-[#262a34] bg-[#14161d]">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search style (e.g. Editorial, Swiss, Brutalist, Bauhaus, Cyber)..."
            className="w-full bg-[#0d0e12] border border-[#272b38] rounded-lg pl-9 pr-3 py-1.5 text-xs font-mono text-white placeholder:text-gray-500 focus:outline-none focus:border-[#c5a059]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-3 py-2 border-b border-[#262a34] flex space-x-1.5 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-[#c5a059] text-black font-bold shadow-sm'
                : 'bg-[#181a24] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredTemplates.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <Layout className="w-8 h-8 text-gray-600 mx-auto" />
            <p className="font-serif text-sm text-gray-400">No template found matching "{searchQuery}"</p>
            <p className="font-mono text-[10px] text-gray-500">Try searching for Editorial, Swiss, Brutalist, Bauhaus, or Luxury</p>
          </div>
        ) : (
          filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => handleSelectTemplate(tpl)}
              className="p-4 rounded-xl border border-[#2b303d] hover:border-[#c5a059] bg-[#161820] cursor-pointer group transition duration-150 space-y-3 shadow-md hover:bg-[#1a1c26]"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm font-semibold text-white group-hover:text-[#c5a059] transition">
                  {tpl.name}
                </span>
                <span className="font-mono text-[9px] text-[#c5a059] px-2 py-0.5 rounded bg-black/50 border border-white/5 font-semibold">
                  {tpl.aspectRatio}
                </span>
              </div>

              <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                {tpl.description}
              </p>

              {/* Style Aesthetic Tags */}
              {tpl.styles && tpl.styles.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {tpl.styles.map((st) => (
                    <span
                      key={st}
                      className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#1b1e2a] border border-[#2b3142] text-[#e4c88a]"
                    >
                      #{st}
                    </span>
                  ))}
                </div>
              )}

              {/* Visual Mini Preview Representation */}
              <div className="h-28 rounded-lg bg-[#0d0e12] border border-[#232733] p-2.5 flex items-center justify-between overflow-hidden relative">
                <div className="w-1/2 space-y-1.5 pr-2">
                  <div className="w-16 h-2 rounded-full bg-[#c5a059]/60" />
                  <div className="w-full h-3 rounded bg-white/30" />
                  <div className="w-4/5 h-2 rounded bg-white/15" />
                  <div className="w-24 h-4 rounded bg-[#c5a059] mt-2 flex items-center justify-center">
                    <span className="text-[8px] font-mono text-black font-bold tracking-wider">EDITABLE CODE</span>
                  </div>
                </div>

                {/* Image Thumbnail Placeholder */}
                <div className="w-1/2 h-full rounded-md border border-white/10 overflow-hidden relative shadow">
                  <img
                    src={
                      tpl.elements.find((e) => e.type === 'image')?.imageUrl ||
                      tpl.elements.find((e) => e.type === 'mockup')?.screenImage ||
                      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
                    }
                    alt={tpl.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-[10px] font-mono text-gray-500 uppercase font-medium">
                  {tpl.category}
                </span>
                <span className="text-xs text-[#c5a059] font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Load Style Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
