import React, { useRef, useState, useEffect } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { ArtboardFrame } from './ArtboardFrame';
import { MousePointer, Hand, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

export const InfiniteCanvas = ({ onOpenAddSection }) => {
  const {
    pan,
    setPan,
    zoom,
    setZoom,
    activeTool,
    setActiveTool
  } = useCanvas();

  const containerRef = useRef(null);
  const [isPanning, setIsPanning] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });

  // Handle Wheel: Pan or Zoom
  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      setZoom((prev) => Math.min(Math.max(prev * zoomFactor, 0.25), 2.0));
    } else {
      setPan((prev) => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY,
      }));
    }
  };

  // Pan interaction
  const handleMouseDown = (e) => {
    // If middle click, hand tool, or clicking on empty canvas
    if (e.button === 1 || activeTool === 'hand' || e.target === containerRef.current) {
      setIsPanning(true);
      setStartPoint({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - startPoint.x,
      y: e.clientY - startPoint.y,
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const resetView = () => {
    setZoom(0.85);
    setPan({ x: 120, y: 50 });
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={`relative w-full h-[calc(100vh-64px)] bg-[#0c0d0e] overflow-hidden canvas-grid-dots select-none ${
        activeTool === 'hand' || isPanning ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
      }`}
    >
      {/* Pan/Zoom Stage */}
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          transition: isPanning ? 'none' : 'transform 0.05s ease-out',
        }}
        className="relative py-10"
      >
        <ArtboardFrame onOpenAddSection={onOpenAddSection} />
      </div>

      {/* Floating Canvas Navigation Toolbar */}
      <div className="absolute bottom-6 left-6 flex items-center space-x-1.5 p-1.5 bg-[#14171d]/90 backdrop-blur-md border border-[#282d38] rounded-xl shadow-2xl z-30">
        <button
          onClick={() => setActiveTool('select')}
          title="Select tool (V)"
          className={`p-2 rounded-lg transition ${
            activeTool === 'select'
              ? 'bg-[#c5a059] text-black font-semibold shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <MousePointer className="w-4 h-4" />
        </button>
        <button
          onClick={() => setActiveTool('hand')}
          title="Pan / Hand tool (H or hold Space)"
          className={`p-2 rounded-lg transition ${
            activeTool === 'hand'
              ? 'bg-[#c5a059] text-black font-semibold shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Hand className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-[#282d38] mx-1" />

        <button
          onClick={() => setZoom((z) => Math.max(z - 0.1, 0.25))}
          title="Zoom Out (-)"
          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          onClick={resetView}
          title="Reset Zoom to 85% (0)"
          className="px-2.5 py-1 font-mono text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded transition min-w-[55px] text-center"
        >
          {Math.round(zoom * 100)}%
        </button>

        <button
          onClick={() => setZoom((z) => Math.min(z + 0.1, 2.0))}
          title="Zoom In (+)"
          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={resetView}
          title="Fit to Screen"
          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition"
        >
          <Maximize className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
