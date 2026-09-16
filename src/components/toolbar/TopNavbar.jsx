import React, { useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { INDUSTRY_PRESETS } from '../../data/industryPresets';
import { generateFromPrompt } from '../../services/aiVisionService';
import {
  Sparkles,
  Camera,
  Palette,
  Settings,
  HelpCircle,
  RotateCcw,
  ChevronDown,
  FileCode
} from 'lucide-react';

export const TopNavbar = ({
  onOpenScreenshotModal,
  onOpenSettingsModal,
  onOpenOnboardingModal,
  onTogglePaletteInspector,
  isPaletteOpen
}) => {
  const {
    activePresetId,
    switchIndustry,
    resetToPreset,
    activePreset,
    loadGeneratedWireframe,
    boardTitle,
    sections
  } = useCanvas();

  const [promptText, setPromptText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    if (!promptText.trim()) return;

    setIsGenerating(true);
    try {
      const generated = await generateFromPrompt(promptText, activePreset);
      loadGeneratedWireframe(generated);
      setPromptText('');
    } catch (err) {
      console.error('Prompt generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportJSON = () => {
    const data = {
      title: boardTitle,
      preset: activePresetId,
      exportedAt: new Date().toISOString(),
      sections: sections
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${boardTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}.json`;
    a.click();
  };

  return (
    <header className="h-16 bg-[#111317] border-b border-[#252831] px-5 flex items-center justify-between z-40 relative shadow-sm">
      {/* Brand & Industry Dropdown */}
      <div className="flex items-center space-x-5">
        <div className="flex items-center space-x-3 pr-4 border-r border-[#252831]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c5a059] to-[#96793f] flex items-center justify-center font-serif text-black font-bold text-base shadow-glow">
            L
          </div>
          <div>
            <h1 className="font-serif text-sm font-semibold tracking-wider text-white">
              LUMINA STUDIO
            </h1>
            <span className="font-mono text-[9px] text-[#c5a059] tracking-widest uppercase block -mt-0.5">
              EDITORIAL WIREFRAMES
            </span>
          </div>
        </div>

        {/* Industry Dropdown */}
        <div className="relative group">
          <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest block mb-0.5">
            Select Industry Preset
          </label>
          <div className="relative">
            <select
              value={activePresetId}
              onChange={(e) => switchIndustry(e.target.value)}
              className="bg-[#191c22] border border-[#2d323e] hover:border-[#c5a059]/60 text-white font-serif text-xs rounded-lg px-3 py-1.5 pr-8 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#c5a059] transition"
            >
              {INDUSTRY_PRESETS.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#14171d] text-white">
                  {p.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* AI Smart Prompt Bar */}
      <form
        onSubmit={handlePromptSubmit}
        className="hidden md:flex items-center flex-1 max-w-md mx-6 relative"
      >
        <div className="relative w-full">
          <input
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Type prompt (e.g. '1920s Art Deco Hotel' or 'Fine Jewelry Atelier')..."
            className="w-full bg-[#181a20] border border-[#2d323e] focus:border-[#c5a059] text-xs text-white rounded-lg pl-9 pr-20 py-2 placeholder-gray-500 focus:outline-none transition shadow-inner font-sans"
          />
          <Sparkles className="w-4 h-4 text-[#c5a059] absolute left-2.5 top-2.5" />
          <button
            type="submit"
            disabled={isGenerating || !promptText.trim()}
            className="absolute right-1.5 top-1.5 px-2.5 py-1 bg-[#c5a059] disabled:bg-gray-700 text-black font-semibold text-[10px] rounded uppercase tracking-wider transition"
          >
            {isGenerating ? 'Drafting...' : 'Generate'}
          </button>
        </div>
      </form>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        {/* Screenshot to Wireframe (SS Scan) */}
        <button
          onClick={onOpenScreenshotModal}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-[#c5a059]/20 to-[#a87954]/20 border border-[#c5a059]/50 hover:border-[#c5a059] text-[#e4c88a] rounded-lg text-xs font-sans font-medium transition shadow-sm"
        >
          <Camera className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Screenshot to Wireframe</span>
        </button>

        {/* Palette & Contrast Inspector Toggle */}
        <button
          onClick={onTogglePaletteInspector}
          title="Color Palettes & WCAG Contrast Spec"
          className={`p-2 rounded-lg border transition ${
            isPaletteOpen
              ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#c5a059]'
              : 'bg-[#181a20] border-[#2d323e] text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Palette className="w-4 h-4" />
        </button>

        {/* Export JSON */}
        <button
          onClick={handleExportJSON}
          title="Export Wireframe JSON"
          className="p-2 bg-[#181a20] border border-[#2d323e] text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition"
        >
          <FileCode className="w-4 h-4" />
        </button>

        {/* Help / Shortcuts Cheatsheet */}
        <button
          onClick={onOpenOnboardingModal}
          title="Keyboard Shortcuts & Canvas Guide (?)"
          className="p-2 bg-[#181a20] border border-[#2d323e] text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Settings Modal (Gemini API Key) */}
        <button
          onClick={onOpenSettingsModal}
          title="AI Settings & API Key"
          className="p-2 bg-[#181a20] border border-[#2d323e] text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
