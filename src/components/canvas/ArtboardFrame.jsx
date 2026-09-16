import React, { useRef, useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { WireframeBlock } from '../wireframe/WireframeBlock';
import { Plus, Download, Sparkles, Layers, RotateCcw, Check } from 'lucide-react';
import html2canvas from 'html2canvas';

export const ArtboardFrame = ({ onOpenAddSection }) => {
  const {
    boardTitle,
    sections,
    activePreset,
    resetToPreset,
    lastSavedTime
  } = useCanvas();

  const artboardRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPNG = async () => {
    if (!artboardRef.current) return;
    setIsExporting(true);

    try {
      const canvas = await html2canvas(artboardRef.current, {
        scale: 2,
        backgroundColor: '#0c0d0e',
        useCORS: true,
        logging: false,
        windowWidth: 1200
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${boardTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}-wireframe.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export PNG failed:', err);
      alert('Error exporting PNG. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      style={{
        width: '1200px',
        margin: '0 auto'
      }}
      className="select-text"
    >
      {/* Artboard Frame Top Bar */}
      <div className="flex items-center justify-between px-6 py-3.5 bg-[#15171d] border border-[#2d323e] rounded-t-2xl text-xs select-none shadow-md">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-[#c5a059]" />
            <span className="font-serif text-sm font-medium tracking-wide text-white">
              {boardTitle}
            </span>
          </div>

          <span className="font-mono text-[10px] text-gray-400 px-2 py-0.5 bg-black/40 rounded border border-white/5">
            {sections.length} sections
          </span>

          {lastSavedTime && (
            <span className="hidden sm:inline font-mono text-[10px] text-emerald-400/80">
              • Auto-saved {lastSavedTime}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={resetToPreset}
            title="Reset to industry preset defaults"
            className="flex items-center space-x-1 px-2.5 py-1 text-gray-400 hover:text-white hover:bg-white/5 rounded border border-transparent hover:border-white/10 text-xs transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={() => onOpenAddSection()}
            className="flex items-center space-x-1 px-3 py-1 bg-[#c5a059]/15 border border-[#c5a059]/40 text-[#c5a059] hover:bg-[#c5a059]/25 rounded-lg text-xs font-sans font-medium transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Section</span>
          </button>

          <button
            onClick={handleExportPNG}
            disabled={isExporting || sections.length === 0}
            title="Export full wireframe as high-resolution 2x PNG"
            className="flex items-center space-x-1 px-3 py-1 bg-white/5 hover:bg-white/10 disabled:opacity-40 text-gray-200 hover:text-white rounded-lg border border-white/10 text-xs font-sans transition"
          >
            <Download className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{isExporting ? 'Generating PNG...' : 'Export PNG'}</span>
          </button>
        </div>
      </div>

      {/* Wireframe Canvas Body */}
      <div
        ref={artboardRef}
        className="bg-[#0c0d0e] border-x border-b border-[#282c35] rounded-b-2xl shadow-artboard overflow-hidden flex flex-col min-h-[600px]"
      >
        {sections.length === 0 ? (
          <div className="py-36 text-center space-y-4 px-6">
            <div className="w-14 h-14 rounded-full bg-[#181a22] border border-[#2b303d] flex items-center justify-center mx-auto text-[#c5a059]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-white font-medium">
                Canvas is currently empty
              </h3>
              <p className="font-sans text-xs text-gray-400 max-w-sm mx-auto mt-1 font-light">
                All sections were skipped or removed. Pick an industry preset or add new editorial sections to construct your wireframe.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center space-x-3">
              <button
                onClick={resetToPreset}
                className="px-4 py-2 border border-[#373d4c] text-white text-xs rounded-lg hover:border-[#c5a059] transition"
              >
                Restore {activePreset.name}
              </button>
              <button
                onClick={() => onOpenAddSection()}
                className="px-4 py-2 bg-[#c5a059] text-black text-xs font-semibold rounded-lg hover:bg-[#e4c88a] transition"
              >
                + Add Section
              </button>
            </div>
          </div>
        ) : (
          sections.map((sec, idx) => (
            <WireframeBlock
              key={sec.id}
              section={sec}
              isFirst={idx === 0}
              isLast={idx === sections.length - 1}
            />
          ))
        )}
      </div>
    </div>
  );
};
