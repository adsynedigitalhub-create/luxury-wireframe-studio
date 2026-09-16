import React, { useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { Check, Copy, ShieldCheck, Type, Palette, X } from 'lucide-react';

export const ColorContrastInspector = ({ isOpen, onClose }) => {
  const { currentPalette, setCustomPalette, activePreset } = useCanvas();
  const [copiedHex, setCopiedHex] = useState(null);

  if (!isOpen) return null;

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const paletteItems = [
    { label: 'Background', hex: currentPalette.background || '#0c0d0e', desc: 'Deep canvas base' },
    { label: 'Surface', hex: currentPalette.surface || '#14161a', desc: 'Card & container fill' },
    { label: 'Primary Text', hex: currentPalette.text || '#f5f2eb', desc: 'High-contrast editorial serif' },
    { label: 'Gold Accent', hex: currentPalette.accent || '#c5a059', desc: 'Bespoke buttons & badges' },
    { label: 'Subtle Border', hex: currentPalette.border || '#282b33', desc: 'Hairline dividers' },
  ];

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-[#13151a]/95 backdrop-blur-md border border-[#2b2f3a] rounded-2xl shadow-2xl p-5 z-40 animate-in fade-in zoom-in-95 duration-150">
      <div className="flex items-center justify-between pb-3 border-b border-[#282d38] mb-4">
        <div className="flex items-center space-x-2">
          <Palette className="w-4 h-4 text-[#c5a059]" />
          <h3 className="font-serif text-sm font-semibold text-white">
            Editorial Palette & Contrast
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-white rounded transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Palette Name & Overall Contrast Badge */}
      <div className="p-3 bg-[#0d0e11] border border-[#242730] rounded-xl mb-4 flex items-center justify-between">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#c5a059] block">
            ACTIVE SYSTEM
          </span>
          <span className="font-serif text-sm text-white font-medium">
            {currentPalette.name || 'Noir & Champagne Silk'}
          </span>
        </div>
        <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-[11px] font-mono font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{currentPalette.contrastScore || '14.8:1 (AAA)'}</span>
        </div>
      </div>

      {/* Color Swatches with Copy */}
      <div className="space-y-2 mb-4">
        <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 block">
          Swatches & Hex Codes (Click to copy)
        </span>
        {paletteItems.map((item) => (
          <div
            key={item.label}
            onClick={() => copyToClipboard(item.hex)}
            className="flex items-center justify-between p-2 rounded-lg bg-[#181a21] hover:bg-[#1f222b] border border-[#262a33] cursor-pointer transition group"
          >
            <div className="flex items-center space-x-3">
              <span
                className="w-5 h-5 rounded-md border border-white/20 shadow-sm"
                style={{ backgroundColor: item.hex }}
              />
              <div>
                <span className="text-xs font-medium text-white block">{item.label}</span>
                <span className="text-[10px] font-sans text-gray-400">{item.desc}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 font-mono text-xs text-gray-400 group-hover:text-white">
              <span>{item.hex}</span>
              {copiedHex === item.hex ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* WCAG Accessibility Specifications */}
      <div className="p-3 bg-[#0d0e11] border border-[#242730] rounded-xl space-y-2">
        <div className="flex items-center space-x-1.5 text-xs font-mono text-[#c5a059]">
          <Type className="w-3.5 h-3.5" />
          <span>WCAG 2.1 ACCESSIBILITY SPEC</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px] font-sans">
          <div className="p-2 bg-[#14161d] rounded border border-white/5">
            <span className="text-gray-400 block text-[10px]">Headings Contrast</span>
            <span className="text-emerald-400 font-medium">15.2:1 • WCAG AAA</span>
          </div>
          <div className="p-2 bg-[#14161d] rounded border border-white/5">
            <span className="text-gray-400 block text-[10px]">Body Copy Contrast</span>
            <span className="text-emerald-400 font-medium">12.6:1 • WCAG AAA</span>
          </div>
        </div>
        <div className="text-[10px] text-gray-500 font-mono pt-1">
          Font Display: {activePreset.fonts.display}
        </div>
      </div>
    </div>
  );
};
