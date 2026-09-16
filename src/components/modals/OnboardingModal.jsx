import React from 'react';
import { Sparkles, X, MousePointer, Hand, Trash2, Copy, ZoomIn, Edit3, Image as ImageIcon, Palette, Maximize2 } from 'lucide-react';

export const OnboardingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Drag anywhere', icon: <MousePointer className="w-3.5 h-3.5 text-[#c5a059]" />, desc: 'Click & drag elements freely' },
    { key: 'Corner handle', icon: <Maximize2 className="w-3.5 h-3.5 text-[#c5a059]" />, desc: 'Drag bottom-right handle to resize' },
    { key: 'Click any text', icon: <Edit3 className="w-3.5 h-3.5 text-[#c5a059]" />, desc: 'Edit copy & headlines inline' },
    { key: 'Space + Drag', icon: <Hand className="w-3.5 h-3.5 text-[#c5a059]" />, desc: 'Pan canvas infinitely' },
    { key: 'Del / Backspace', icon: <Trash2 className="w-3.5 h-3.5 text-red-400" />, desc: 'Remove any shape, text, or image' },
    { key: 'Ctrl + D', icon: <Copy className="w-3.5 h-3.5 text-[#c5a059]" />, desc: 'Duplicate selected element' },
    { key: '+ / - / 0', icon: <ZoomIn className="w-3.5 h-3.5 text-[#c5a059]" />, desc: 'Zoom in, out, and reset (90%)' },
    { key: 'Inspector panel', icon: <Palette className="w-3.5 h-3.5 text-[#c5a059]" />, desc: 'Custom Hex, Gradient Angle & Opacity' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-150 select-none">
      <div className="bg-[#121419] border border-[#2d323f] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#282d38] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c5a059] to-[#96793f] flex items-center justify-center font-serif text-black font-bold text-lg shadow-glow">
              L
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold text-white">
                Freestyle Studio — How To Design
              </h2>
              <p className="font-mono text-[10px] text-[#c5a059] tracking-widest uppercase">
                100% Freedom • Custom Hex, Gradients, 18 Images & Font Gallery
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="p-3.5 bg-[#171922] border border-[#2b303d] rounded-xl space-y-1 text-xs text-gray-300">
            <span className="font-serif text-white font-medium block">
              Complete Creative Control
            </span>
            <p className="leading-relaxed font-light">
              No forced templates. Drop shapes, images, and text anywhere. Use the right-hand Inspector to build custom <strong>linear gradients with any angle</strong>, customize <strong>opacity (100%, 75%, 50%, 25%)</strong>, and scale any element.
            </p>
          </div>

          {/* Shortcuts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {shortcuts.map((s, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 bg-[#171922] border border-[#262b37] rounded-lg text-xs"
              >
                <div className="flex items-center space-x-2 text-gray-300">
                  {s.icon}
                  <span className="text-[11px]">{s.desc}</span>
                </div>
                <kbd className="px-1.5 py-0.5 bg-[#0d0e12] border border-white/10 rounded font-mono text-[10px] text-[#c5a059]">
                  {s.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#0d0e12] border-t border-[#282d38] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#c5a059] hover:bg-[#e4c88a] text-black font-semibold text-xs rounded-xl shadow-lg transition"
          >
            Start Designing
          </button>
        </div>
      </div>
    </div>
  );
};
