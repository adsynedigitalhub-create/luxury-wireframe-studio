import React, { useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import {
  Type,
  LayoutGrid,
  Shapes,
  Image as ImageIcon,
  Palette,
  Download,
  Trash2,
  HelpCircle,
  Camera,
  Sparkles,
  CornerDownRight,
  Plus,
  Layout,
  Code,
  ShieldCheck
} from 'lucide-react';
import html2canvas from 'html2canvas';

export const DesignToolbar = ({
  onOpenLines,
  onOpenGridsAndShapes,
  onOpenTemplates,
  onOpenImageGallery,
  onOpenFontGallery,
  onOpenScreenshotGrid,
  onOpenHelpModal,
  onOpenCodeGenerator,
  onSwitchToAdventure,
  onOpenAnimationsModal,
  onOpenTypographyModal
}) => {
  const {
    addTextElement,
    clearCanvas,
    elements,
    lastSavedTime,
    selectedElementId,
    setSelectedElementId
  } = useCanvas();

  const [isExporting, setIsExporting] = useState(false);

  // Handle Export PNG
  const handleExportPNG = async () => {
    const artboard = document.querySelector('.shadow-artboard');
    if (!artboard) return;
    setIsExporting(true);

    try {
      const prev = selectedElementId;
      setSelectedElementId(null);

      setTimeout(async () => {
        const canvas = await html2canvas(artboard, {
          scale: 2,
          backgroundColor: null,
          useCORS: true,
          logging: false
        });
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `editorial-wireframe-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
        setSelectedElementId(prev);
        setIsExporting(false);
      }, 60);
    } catch (err) {
      console.error('Export PNG failed:', err);
      setIsExporting(false);
    }
  };

  return (
    <header className="h-16 bg-[#111317] border-b border-[#252831] px-5 flex items-center justify-between z-40 relative shadow-sm select-none">
      {/* Brand */}
      <div className="flex items-center space-x-3 pr-4 border-r border-[#252831]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c5a059] to-[#96793f] flex items-center justify-center font-serif text-black font-bold text-base shadow-glow">
          L
        </div>
        <div>
          <h1 className="font-serif text-sm font-semibold tracking-wider text-white">
            LUMINA STUDIO
          </h1>
          <span className="font-mono text-[9px] text-[#c5a059] tracking-widest uppercase block -mt-0.5">
            ELEMENTOR & WIREFRAME GRIDS
          </span>
        </div>
      </div>

      {/* Creation Tools */}
      <div className="flex items-center space-x-2">
        {/* 1. Screenshot to Exact Wireframe Reconstructor */}
        <button
          onClick={onOpenScreenshotGrid}
          className="flex items-center space-x-2 px-3.5 py-1.5 bg-gradient-to-r from-[#c5a059]/30 to-[#a87954]/25 border border-[#c5a059] hover:bg-[#c5a059] text-[#f5ecd5] hover:text-black rounded-lg text-xs font-sans font-semibold transition shadow-glow group"
          title="Convert any uploaded or pasted screenshot into an exact editable wireframe"
        >
          <Camera className="w-3.5 h-3.5 text-[#c5a059] group-hover:text-black transition-colors" />
          <span>Screenshot to Wireframe</span>
          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-black/40 group-hover:bg-black/20 text-[#e4c88a] group-hover:text-black font-bold ml-0.5">
            Exact
          </span>
        </button>

        {/* 2. Website Wireframe Grids (Real Estate, AI/Tech, Columns, Bento) */}
        <button
          onClick={() => onOpenGridsAndShapes('grids')}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#171a22] hover:bg-[#202532] border border-[#2b303d] hover:border-[#c5a059] text-gray-200 hover:text-white rounded-lg text-xs font-sans transition shadow-sm"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Website Grids</span>
        </button>

        {/* 3. Shapes & Vectors (All 35+ Shapes from image) */}
        <button
          onClick={() => onOpenGridsAndShapes('shapes')}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#171a22] hover:bg-[#202532] border border-[#2b303d] hover:border-[#c5a059] text-gray-200 hover:text-white rounded-lg text-xs font-sans transition shadow-sm"
        >
          <Shapes className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Shapes</span>
        </button>

        {/* 3. Style Aesthetics Templates (40+ Design Aesthetics: Editorial, Swiss, Brutalist, Luxury, etc.) */}
        <button
          onClick={onOpenTemplates}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-[#c5a059]/20 to-[#a87954]/20 hover:bg-[#c5a059] hover:text-black border border-[#c5a059]/60 text-[#f5ecd5] rounded-lg text-xs font-sans font-medium transition shadow-sm group"
        >
          <Layout className="w-3.5 h-3.5 text-[#c5a059] group-hover:text-black transition-colors" />
          <span>Style Templates</span>
          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-black/40 group-hover:bg-black/20 text-[#e4c88a] group-hover:text-black font-bold ml-0.5">
            40+ Styles
          </span>
        </button>

        {/* 3a. Canva-style White Lines & Corner Flourishes */}
        <button
          onClick={onOpenLines}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#171a22] hover:bg-[#202532] border border-[#2b303d] hover:border-[#c5a059] text-gray-200 hover:text-white rounded-lg text-xs font-sans transition shadow-sm"
        >
          <CornerDownRight className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Lines & Corners</span>
        </button>

        {/* 4. Add Text Button */}
        <button
          onClick={() => addTextElement()}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#171a22] hover:bg-[#202532] border border-[#2b303d] hover:border-[#c5a059] text-gray-200 hover:text-white rounded-lg text-xs font-sans transition shadow-sm"
        >
          <Type className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>+ Text</span>
        </button>

        {/* 5. Add Image (18 Curated Assets) */}
        <button
          onClick={onOpenImageGallery}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#171a22] hover:bg-[#202532] border border-[#2b303d] hover:border-[#c5a059] text-gray-200 hover:text-white rounded-lg text-xs font-sans transition shadow-sm"
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>18 Images</span>
        </button>

        {/* 6. Font Gallery Drawer */}
        <button
          onClick={onOpenFontGallery}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#171a22] hover:bg-[#202532] border border-[#2b303d] hover:border-[#c5a059] text-gray-200 hover:text-white rounded-lg text-xs font-sans transition shadow-sm"
        >
          <Palette className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Fonts</span>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {lastSavedTime && (
          <span className="hidden lg:inline font-mono text-[10px] text-emerald-400/80">
            ✓ Auto-saved {lastSavedTime}
          </span>
        )}

        {/* Dual Mode View Switcher */}
        <div className="flex items-center bg-[#171a23] p-1 rounded-xl border border-[#2b3142]">
          <div className="flex items-center space-x-1.5 px-3 py-1 bg-[#c5a059] text-black font-bold text-xs rounded-lg shadow-sm">
            <span>🎨</span>
            <span>Studio Canvas</span>
          </div>
          {onSwitchToAdventure && (
            <button
              onClick={onSwitchToAdventure}
              className="flex items-center space-x-1.5 px-3 py-1 text-gray-300 hover:text-white text-xs font-sans rounded-lg transition"
              title="Switch to Russian Adventure Hiking Site"
            >
              <span>🏔️</span>
              <span>Adventure Site</span>
            </button>
          )}
        </div>

        {/* ✨ MODERN ANIMATIONS SELECTOR POPUP BUTTON */}
        {onOpenAnimationsModal && (
          <button
            onClick={onOpenAnimationsModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-[#c5a059]/20 to-[#96793f]/20 hover:bg-[#c5a059] hover:text-black border border-[#c5a059]/60 text-[#f5ecd5] font-semibold rounded-lg text-xs transition shadow-sm group"
            title="Open Modern Animations Selector Popup"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059] group-hover:text-black transition-colors" />
            <span>Modern Animations</span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-black/40 group-hover:bg-black/20 text-[#e4c88a] group-hover:text-black font-bold">
              Pop-up
            </span>
          </button>
        )}

        {/* ✍️ 31 TYPOGRAPHY STYLES SUITE BUTTON */}
        {onOpenTypographyModal && (
          <button
            onClick={onOpenTypographyModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:bg-[#c5a059] hover:text-black border border-[#c5a059]/60 text-[#f5ecd5] font-semibold rounded-lg text-xs transition shadow-sm group"
            title="Open 31 Typography Styles Suite (Project 3)"
          >
            <Type className="w-3.5 h-3.5 text-[#c5a059] group-hover:text-black transition-colors" />
            <span>31 Typography</span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-black/40 group-hover:bg-black/20 text-[#e4c88a] group-hover:text-black font-bold">
              Pop-up
            </span>
          </button>
        )}

        {/* ⚡ GENERATE CLEAN CODE BUTTON WITH PERMISSION GATE */}
        <button
          onClick={onOpenCodeGenerator}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500 hover:to-teal-500 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-black font-semibold rounded-lg text-xs transition shadow-md group"
          title="Compile clean React, HTML, or Elementor code (Asks for permission first)"
        >
          <Code className="w-3.5 h-3.5 text-emerald-400 group-hover:text-black transition-colors" />
          <span>Generate Code</span>
          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-black/40 group-hover:bg-black/20 text-emerald-300 group-hover:text-black font-bold">
            🔒 Permission
          </span>
        </button>

        <button
          onClick={clearCanvas}
          title="Clear everything to start from a blank page"
          className="flex items-center space-x-1 px-2.5 py-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg text-xs transition font-sans"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Start Fresh</span>
        </button>

        <button
          onClick={handleExportPNG}
          disabled={isExporting || elements.length === 0}
          className="flex items-center space-x-1.5 px-4 py-1.5 bg-[#c5a059] hover:bg-[#e4c88a] disabled:bg-gray-700 text-black font-semibold rounded-lg text-xs transition shadow-md"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isExporting ? 'Exporting...' : 'Export PNG'}</span>
        </button>

        <button
          onClick={onOpenHelpModal}
          title="Keyboard shortcuts & instructions"
          className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
