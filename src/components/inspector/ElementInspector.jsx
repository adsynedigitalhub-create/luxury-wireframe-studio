import React, { useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { FONT_GALLERY, CURATED_IMAGES } from '../../data/assetsLibrary';
import { STANDARD_SECTION_SIZES, ELEMENTOR_CONTAINER_GRIDS } from '../../data/elementorGrids';
import {
  Palette,
  Sliders,
  Type,
  Maximize2,
  Trash2,
  Copy,
  Eye,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Crosshair,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronsUp,
  ChevronsDown,
  Compass,
  Minus,
  Plus,
  LayoutGrid,
  Upload,
  RotateCw,
  Image as ImageIcon,
  Layers,
  Sparkles
} from 'lucide-react';

export const ElementInspector = () => {
  const {
    elements,
    selectedElementId,
    setSelectedElementId,
    selectedElement,
    updateElement,
    removeElement,
    duplicateElement,
    scaleElement,
    rotateElement,
    bringToFront,
    sendToBack,
    setElementZIndex,
    moveTextAboveImages,
    alignElement,
    changeZIndex,
    setElementStandardSize,
    addElementorGrid,
    canvasBg,
    setCanvasBg,
    canvasDimensions,
    setCanvasDimensions
  } = useCanvas();

  const [showLayersStack, setShowLayersStack] = useState(true);

  // If no element is selected, inspect Canvas Background & Elementor Quick Grids
  if (!selectedElement) {
    return (
      <aside className="w-80 bg-[#121418] border-l border-[#282d38] p-5 flex flex-col h-[calc(100vh-64px)] overflow-y-auto select-none space-y-4">
        <div className="pb-3 border-b border-[#262a34]">
          <div className="flex items-center space-x-2">
            <Palette className="w-4 h-4 text-[#c5a059]" />
            <h3 className="font-serif text-sm font-semibold text-white">
              Canvas Styling & Standard Sizes
            </h3>
          </div>
          <p className="font-mono text-[10px] text-gray-400 mt-0.5">
            Select any item on canvas to resize or edit
          </p>
        </div>

        {/* 1. Elementor Quick Containers Generator */}
        <div className="p-3.5 bg-[#171922] border border-[#2b303e] rounded-xl space-y-2.5">
          <div className="flex items-center space-x-1.5">
            <LayoutGrid className="w-3.5 h-3.5 text-[#c5a059]" />
            <label className="font-mono text-[10px] uppercase tracking-wider text-white font-medium">
              Elementor Flexbox Containers
            </label>
          </div>
          <p className="text-[11px] text-gray-400 font-sans">
            Click to drop official Elementor container column splits:
          </p>
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {ELEMENTOR_CONTAINER_GRIDS.slice(0, 6).map((grid) => (
              <button
                key={grid.id}
                onClick={() => addElementorGrid(grid)}
                className="p-1.5 bg-[#101217] hover:bg-[#1e222c] border border-white/5 hover:border-[#c5a059] rounded text-left transition"
              >
                <span className="font-serif text-xs text-white block truncate">{grid.name.split('(')[0]}</span>
                <span className="font-mono text-[9px] text-[#c5a059] block">{grid.columns}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Standard Web Sizes Reference */}
        <div className="p-3.5 bg-[#171922] border border-[#2b303e] rounded-xl space-y-2">
          <label className="font-mono text-[10px] uppercase tracking-wider text-gray-300 block">
            Standard Website Dimensions (px)
          </label>
          <div className="space-y-1 text-[11px] font-mono">
            {STANDARD_SECTION_SIZES.slice(0, 5).map((size) => (
              <div key={size.name} className="flex items-center justify-between p-1.5 bg-[#101217] rounded border border-white/5">
                <span className="text-gray-300 font-sans text-xs">{size.name}</span>
                <span className="text-[#c5a059]">{size.badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Canvas Background Fill Mode: Solid or Gradient */}
        <div className="p-3.5 bg-[#171922] border border-[#2b303e] rounded-xl space-y-3">
          <label className="font-mono text-[10px] uppercase tracking-wider text-gray-400 block">
            Canvas Background Fill
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-[#101217] rounded-lg border border-[#282d38]">
            <button
              onClick={() => setCanvasBg({ ...canvasBg, type: 'solid' })}
              className={`py-1 text-xs font-sans rounded-md transition ${
                canvasBg.type === 'solid'
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Solid Color
            </button>
            <button
              onClick={() => setCanvasBg({ ...canvasBg, type: 'gradient' })}
              className={`py-1 text-xs font-sans rounded-md transition ${
                canvasBg.type === 'gradient'
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Gradient
            </button>
          </div>

          {canvasBg.type === 'solid' ? (
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono text-gray-500 block">Hex Code</span>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={canvasBg.solidColor || '#0c0d0e'}
                  onChange={(e) => setCanvasBg({ ...canvasBg, solidColor: e.target.value })}
                  className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={canvasBg.solidColor || '#0c0d0e'}
                  onChange={(e) => setCanvasBg({ ...canvasBg, solidColor: e.target.value })}
                  className="flex-1 bg-[#0f1115] border border-[#2a2e38] text-xs font-mono text-white p-1.5 rounded focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div>
                <span className="text-[9px] font-mono text-gray-500 block mb-1">Color 1 (From Hex)</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={canvasBg.gradient.from}
                    onChange={(e) => setCanvasBg({ ...canvasBg, gradient: { ...canvasBg.gradient, from: e.target.value } })}
                    className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={canvasBg.gradient.from}
                    onChange={(e) => setCanvasBg({ ...canvasBg, gradient: { ...canvasBg.gradient, from: e.target.value } })}
                    className="flex-1 bg-[#0f1115] border border-[#2a2e38] text-xs font-mono text-white p-1.5 rounded focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div>
                <span className="text-[9px] font-mono text-gray-500 block mb-1">Color 2 (To Hex)</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={canvasBg.gradient.to}
                    onChange={(e) => setCanvasBg({ ...canvasBg, gradient: { ...canvasBg.gradient, to: e.target.value } })}
                    className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={canvasBg.gradient.to}
                    onChange={(e) => setCanvasBg({ ...canvasBg, gradient: { ...canvasBg.gradient, to: e.target.value } })}
                    className="flex-1 bg-[#0f1115] border border-[#2a2e38] text-xs font-mono text-white p-1.5 rounded focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Compass className="w-3 h-3 text-[#c5a059]" />
                    <span>Gradient Angle</span>
                  </span>
                  <span className="text-[#c5a059]">{canvasBg.gradient.angle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="5"
                  value={canvasBg.gradient.angle}
                  onChange={(e) => setCanvasBg({ ...canvasBg, gradient: { ...canvasBg.gradient, angle: Number(e.target.value) } })}
                  className="w-full accent-[#c5a059]"
                />
              </div>
            </div>
          )}
        </div>

        {/* 4. ALL CANVAS LAYERS (Click to select any text/image/shape even if covered) */}
        <div className="p-3.5 bg-[#171922] border border-[#2b303e] rounded-xl space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-[#c5a059]" />
              <label className="font-mono text-[10px] uppercase tracking-wider text-white font-medium">
                Canvas Layers ({elements.length})
              </label>
            </div>
            <span className="text-[9px] font-mono text-gray-500">Top → Bottom</span>
          </div>
          <p className="text-[11px] text-gray-400 font-sans leading-tight">
            Kisi b layer (Text ya Image) ko select krne k liye click karein:
          </p>
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {[...elements].reverse().map((layerItem) => {
              const layerIndex = elements.findIndex(x => x.id === layerItem.id) + 1;
              let label = layerItem.type;
              if (layerItem.type === 'text') label = `Text: "${(layerItem.text || '').substring(0, 18)}..."`;
              else if (layerItem.type === 'image') label = `Image: ${layerItem.imageAlt || 'Photo'}`;
              else if (layerItem.type === 'shape') label = `Shape: ${layerItem.shapeType || 'Frame'}`;
              else if (layerItem.type === 'line') label = `Line: ${layerItem.name || 'Border'}`;
              else if (layerItem.type === 'grid') label = `Grid: ${layerItem.title || 'Layout'}`;

              return (
                <div
                  key={layerItem.id}
                  onClick={() => setSelectedElementId(layerItem.id)}
                  className="flex items-center justify-between p-2 rounded-lg cursor-pointer bg-[#101217] hover:bg-[#1a1e28] border border-white/5 hover:border-[#c5a059]/40 transition group"
                >
                  <div className="flex items-center space-x-2 truncate">
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-mono bg-white/10 group-hover:bg-[#c5a059] group-hover:text-black text-gray-300 font-bold transition-colors">
                      #{layerIndex}
                    </span>
                    <span className="truncate text-xs font-sans text-gray-300 group-hover:text-white transition-colors">
                      {label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        bringToFront(layerItem.id);
                      }}
                      title="Bring to Top"
                      className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-[#c5a059]"
                    >
                      <ChevronsUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sendToBack(layerItem.id);
                      }}
                      title="Send to Back"
                      className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-[#c5a059]"
                    >
                      <ChevronsDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    );
  }

  // When an element is selected
  const el = selectedElement;

  return (
    <aside className="w-80 bg-[#121418] border-l border-[#282d38] p-5 flex flex-col h-[calc(100vh-64px)] overflow-y-auto select-none space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#262a34]">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#c5a059]">
            {el.type} element
          </span>
          <h3 className="font-serif text-sm font-semibold text-white">
            Inspector & Styling
          </h3>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => duplicateElement(el.id)}
            title="Duplicate (Ctrl+D)"
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => removeElement(el.id)}
            title="Delete (Del)"
            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/15 rounded transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 0. CANVA-STYLE SHAPE FRAME PHOTO EMBEDDER */}
      {(el.type === 'vector' || el.isShapeFrame || (el.type === 'shape' && el.bgType === 'image')) && (
        <div className="p-3.5 bg-gradient-to-b from-[#1c1f2b] to-[#14161f] border-2 border-[#c5a059]/60 rounded-xl space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <label className="font-mono text-[11px] uppercase tracking-wider text-white font-bold">
                Shape Frame Photo Mask
              </label>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40 font-mono text-[9px] font-bold">
              Canva Frame
            </span>
          </div>

          {/* Mask Photo Preview & 1-Click Upload */}
          <div className="h-32 rounded-lg border border-[#363c4e] bg-[#0d0e13] overflow-hidden relative group">
            {el.imageUrl ? (
              <img
                src={el.imageUrl}
                alt="Mask preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[#c5a059] bg-black/40">
                <Upload className="w-6 h-6 mb-1" />
                <span className="text-xs font-mono font-medium">No photo embedded</span>
              </div>
            )}
            <label className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition">
              <Upload className="w-6 h-6 text-[#c5a059] mb-1" />
              <span className="text-xs font-mono text-white font-bold">Click to Upload Photo</span>
              <span className="text-[10px] font-sans text-gray-400">JPG, PNG, WebP</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                      updateElement(el.id, { bgType: 'image', imageUrl: evt.target.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>

          {/* Primary Action: Upload Button */}
          <label className="flex items-center justify-center space-x-2 w-full py-2 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-sans font-bold text-xs rounded-lg cursor-pointer transition shadow-md">
            <Upload className="w-4 h-4 text-black" />
            <span>Upload Photo from PC</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (evt) => {
                    updateElement(el.id, { bgType: 'image', imageUrl: evt.target.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>

          {/* Paste URL Input */}
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-gray-400 block">Or Paste Web Image URL:</span>
            <input
              type="text"
              value={el.imageUrl || ''}
              onChange={(e) => updateElement(el.id, { bgType: 'image', imageUrl: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[#0f1115] border border-[#2a2e38] text-xs font-mono text-white p-1.5 rounded focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          {/* Object Fit: Cover vs Contain */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#0f1115] rounded-lg border border-[#252936]">
            <button
              onClick={() => updateElement(el.id, { objectFit: 'cover' })}
              className={`py-1 text-xs font-sans rounded transition ${
                el.objectFit !== 'contain'
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Fill & Crop (Cover)
            </button>
            <button
              onClick={() => updateElement(el.id, { objectFit: 'contain' })}
              className={`py-1 text-xs font-sans rounded transition ${
                el.objectFit === 'contain'
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Fit Entire (Contain)
            </button>
          </div>

          {/* Curated Luxury Photo Presets */}
          <div>
            <span className="text-[9px] font-mono text-gray-400 block mb-1">Pick Luxury Stock Photo:</span>
            <div className="grid grid-cols-4 gap-1.5">
              {CURATED_IMAGES.slice(0, 8).map((img) => (
                <button
                  key={img.id}
                  onClick={() => updateElement(el.id, { bgType: 'image', imageUrl: img.url })}
                  className="h-10 rounded border border-white/10 hover:border-[#c5a059] overflow-hidden relative transition hover:scale-105"
                  title={img.title}
                >
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Border Stroke & Color for Frame */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-gray-300">
              <span>Frame Border Outline</span>
              <span className="text-[#c5a059]">{el.strokeWidth ?? 2}px</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={el.strokeColor || '#c5a059'}
                onChange={(e) => updateElement(el.id, { strokeColor: e.target.value })}
                className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={el.strokeWidth ?? 2}
                onChange={(e) => updateElement(el.id, { strokeWidth: Number(e.target.value) })}
                className="flex-1 accent-[#c5a059]"
              />
            </div>
          </div>
        </div>
      )}

      {/* 1. SCALE & STANDARD WEB DIMENSIONS SNAPPING */}
      <div className="p-3.5 bg-[#171922] border border-[#2b303e] rounded-xl space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="font-mono text-[10px] uppercase tracking-wider text-gray-300 flex items-center space-x-1">
            <Maximize2 className="w-3 h-3 text-[#c5a059]" />
            <span>Scale & Quick Resize</span>
          </label>
          <span className="font-mono text-xs text-[#c5a059] font-bold">
            {el.width}×{el.height}px
          </span>
        </div>

        {/* Quick Scale Buttons */}
        <div className="grid grid-cols-4 gap-1">
          <button
            onClick={() => scaleElement(el.id, 0.75)}
            className="py-1 px-1.5 bg-[#101217] hover:bg-[#1d212b] border border-white/5 rounded text-[10px] font-mono text-gray-300 flex items-center justify-center space-x-0.5"
          >
            <Minus className="w-2.5 h-2.5 text-[#c5a059]" />
            <span>-25%</span>
          </button>
          <button
            onClick={() => scaleElement(el.id, 0.9)}
            className="py-1 px-1.5 bg-[#101217] hover:bg-[#1d212b] border border-white/5 rounded text-[10px] font-mono text-gray-300 flex items-center justify-center space-x-0.5"
          >
            <Minus className="w-2.5 h-2.5 text-[#c5a059]" />
            <span>-10%</span>
          </button>
          <button
            onClick={() => scaleElement(el.id, 1.1)}
            className="py-1 px-1.5 bg-[#101217] hover:bg-[#1d212b] border border-white/5 rounded text-[10px] font-mono text-gray-300 flex items-center justify-center space-x-0.5"
          >
            <Plus className="w-2.5 h-2.5 text-[#c5a059]" />
            <span>+10%</span>
          </button>
          <button
            onClick={() => scaleElement(el.id, 1.25)}
            className="py-1 px-1.5 bg-[#101217] hover:bg-[#1d212b] border border-white/5 rounded text-[10px] font-mono text-gray-300 flex items-center justify-center space-x-0.5"
          >
            <Plus className="w-2.5 h-2.5 text-[#c5a059]" />
            <span>+25%</span>
          </button>
        </div>

        {/* Snap to Official Web Section Dimensions */}
        <div className="pt-1 space-y-1">
          <span className="text-[9px] font-mono text-gray-400 block">Snap to Standard Size:</span>
          <div className="grid grid-cols-2 gap-1 text-[10px] font-mono">
            <button
              onClick={() => setElementStandardSize(el.id, 1200, 600)}
              className="p-1 bg-[#101217] hover:bg-[#1d212b] border border-white/5 hover:border-[#c5a059] rounded text-left truncate text-gray-300"
            >
              1200×600 (Container)
            </button>
            <button
              onClick={() => setElementStandardSize(el.id, 580, 600)}
              className="p-1 bg-[#101217] hover:bg-[#1d212b] border border-white/5 hover:border-[#c5a059] rounded text-left truncate text-gray-300"
            >
              580×600 (50% Split)
            </button>
            <button
              onClick={() => setElementStandardSize(el.id, 380, 480)}
              className="p-1 bg-[#101217] hover:bg-[#1d212b] border border-white/5 hover:border-[#c5a059] rounded text-left truncate text-gray-300"
            >
              380×480 (Card)
            </button>
            <button
              onClick={() => setElementStandardSize(el.id, 280, 260)}
              className="p-1 bg-[#101217] hover:bg-[#1d212b] border border-white/5 hover:border-[#c5a059] rounded text-left truncate text-gray-300"
            >
              280×260 (Feature)
            </button>
          </div>
        </div>

        {/* Manual Dimensions Input */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
          <div>
            <span className="text-[9px] font-mono text-gray-500 block mb-0.5">Width (px)</span>
            <input
              type="number"
              value={el.width}
              onChange={(e) => updateElement(el.id, { width: Number(e.target.value) })}
              className="w-full bg-[#0f1115] border border-[#2a2e38] text-xs font-mono text-white p-1 rounded focus:outline-none focus:border-[#c5a059]"
            />
          </div>
          <div>
            <span className="text-[9px] font-mono text-gray-500 block mb-0.5">Height (px)</span>
            <input
              type="number"
              value={el.height}
              onChange={(e) => updateElement(el.id, { height: Number(e.target.value) })}
              className="w-full bg-[#0f1115] border border-[#2a2e38] text-xs font-mono text-white p-1 rounded focus:outline-none focus:border-[#c5a059]"
            />
          </div>
        </div>
      </div>

      {/* ROTATION & OBJECT ANGLE CONTROL */}
      <div className="p-3.5 bg-[#171922] border border-[#2b303e] rounded-xl space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="font-mono text-[10px] uppercase tracking-wider text-gray-300 flex items-center space-x-1.5">
            <RotateCw className="w-3 h-3 text-[#c5a059]" />
            <span>Object Rotation</span>
          </label>
          <div className="flex items-center space-x-1">
            <input
              type="number"
              min="0"
              max="360"
              value={el.rotation || 0}
              onChange={(e) => rotateElement(el.id, Number(e.target.value))}
              className="w-14 bg-[#0f1115] border border-[#2a2e38] text-xs font-mono text-[#c5a059] p-0.5 text-right rounded focus:outline-none focus:border-[#c5a059]"
            />
            <span className="font-mono text-xs text-[#c5a059]">°</span>
          </div>
        </div>

        {/* Quick Rotation Buttons */}
        <div className="grid grid-cols-5 gap-1">
          {[0, 45, 90, 180, 270].map((deg) => (
            <button
              key={deg}
              onClick={() => rotateElement(el.id, deg)}
              className={`py-1 rounded text-[10px] font-mono border transition ${
                (el.rotation || 0) === deg
                  ? 'bg-[#c5a059] text-black font-semibold border-[#c5a059]'
                  : 'bg-[#101217] border-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {deg}°
            </button>
          ))}
        </div>

        <input
          type="range"
          min="0"
          max="360"
          step="1"
          value={el.rotation || 0}
          onChange={(e) => rotateElement(el.id, Number(e.target.value))}
          className="w-full accent-[#c5a059]"
        />
      </div>

      {/* 2. OPACITY CONTROLS */}
      <div className="p-3.5 bg-[#171922] border border-[#2b303e] rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-mono text-[10px] uppercase tracking-wider text-gray-400 flex items-center space-x-1">
            <Eye className="w-3 h-3 text-[#c5a059]" />
            <span>Opacity</span>
          </label>
          <span className="font-mono text-xs text-[#c5a059] font-medium">
            {el.opacity ?? 100}%
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1">
          {[
            { label: 'Full', val: 100 },
            { label: 'Dark', val: 75 },
            { label: 'Med', val: 50 },
            { label: 'Low', val: 25 },
          ].map((op) => (
            <button
              key={op.label}
              onClick={() => updateElement(el.id, { opacity: op.val })}
              className={`py-1 rounded text-[10px] font-sans border transition ${
                (el.opacity ?? 100) === op.val
                  ? 'bg-[#c5a059] text-black font-semibold border-[#c5a059]'
                  : 'bg-[#101217] border-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {op.label}
            </button>
          ))}
        </div>

        <input
          type="range"
          min="10"
          max="100"
          step="5"
          value={el.opacity ?? 100}
          onChange={(e) => updateElement(el.id, { opacity: Number(e.target.value) })}
          className="w-full accent-[#c5a059]"
        />
      </div>

      {/* 2b. LAYER ORDERING & CANVAS ALIGNMENT (User Requested: Move Right, Left, Up, Down, Center) */}
      <div className="p-3.5 bg-[#171922] border border-[#2b303e] rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-mono text-[10px] uppercase tracking-wider text-gray-300 font-medium flex items-center space-x-1.5">
            <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Position & Alignment (X / Y Coordinates)</span>
          </label>
        </div>

        {/* Exact X / Y Inputs and 4-Direction Nudge Pad */}
        <div className="space-y-2 p-2.5 bg-[#101217] rounded-lg border border-white/5">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[9px] font-mono text-gray-400 block mb-0.5">X Position (Left/Right)</span>
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  value={el.x}
                  onChange={(e) => updateElement(el.id, { x: Number(e.target.value) })}
                  className="w-full bg-[#181b24] border border-[#2c3140] text-xs font-mono text-white p-1 rounded focus:outline-none focus:border-[#c5a059]"
                />
                <span className="text-[10px] font-mono text-gray-400">px</span>
              </div>
            </div>
            <div>
              <span className="text-[9px] font-mono text-gray-400 block mb-0.5">Y Position (Up/Down)</span>
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  value={el.y}
                  onChange={(e) => updateElement(el.id, { y: Number(e.target.value) })}
                  className="w-full bg-[#181b24] border border-[#2c3140] text-xs font-mono text-white p-1 rounded focus:outline-none focus:border-[#c5a059]"
                />
                <span className="text-[10px] font-mono text-gray-400">px</span>
              </div>
            </div>
          </div>

          {/* Quick Step Nudge Buttons */}
          <div className="pt-1.5 border-t border-white/5">
            <span className="text-[9px] font-mono text-gray-500 block mb-1">Move Step (10px):</span>
            <div className="grid grid-cols-4 gap-1">
              <button
                onClick={() => updateElement(el.id, { x: el.x - 10 })}
                className="py-1 px-1 bg-[#191c26] hover:bg-[#252a3a] border border-white/5 rounded text-[10px] font-mono text-gray-200 flex items-center justify-center space-x-0.5"
                title="Move Left 10px"
              >
                <span>← Left</span>
              </button>
              <button
                onClick={() => updateElement(el.id, { x: el.x + 10 })}
                className="py-1 px-1 bg-[#191c26] hover:bg-[#252a3a] border border-white/5 rounded text-[10px] font-mono text-gray-200 flex items-center justify-center space-x-0.5"
                title="Move Right 10px"
              >
                <span>Right →</span>
              </button>
              <button
                onClick={() => updateElement(el.id, { y: el.y - 10 })}
                className="py-1 px-1 bg-[#191c26] hover:bg-[#252a3a] border border-white/5 rounded text-[10px] font-mono text-gray-200 flex items-center justify-center space-x-0.5"
                title="Move Up 10px"
              >
                <span>↑ Up</span>
              </button>
              <button
                onClick={() => updateElement(el.id, { y: el.y + 10 })}
                className="py-1 px-1 bg-[#191c26] hover:bg-[#252a3a] border border-white/5 rounded text-[10px] font-mono text-gray-200 flex items-center justify-center space-x-0.5"
                title="Move Down 10px"
              >
                <span>↓ Down</span>
              </button>
            </div>
          </div>
        </div>

        {/* Alignment Grid: Left, Center H, Right, Top, Center V, Bottom, Center Both */}
        <div className="space-y-1">
          <span className="text-[9px] font-mono text-gray-400 block">Canvas Snapping</span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => alignElement(el.id, 'left')}
              className="py-1.5 px-2 bg-[#101217] hover:bg-[#1d212c] border border-white/5 hover:border-[#c5a059] rounded text-[11px] font-sans text-gray-300 flex items-center justify-center space-x-1 transition"
              title="Align to Left"
            >
              <AlignLeft className="w-3 h-3 text-[#c5a059]" />
              <span>Left</span>
            </button>
            <button
              onClick={() => alignElement(el.id, 'center-h')}
              className="py-1.5 px-2 bg-[#101217] hover:bg-[#1d212c] border border-white/5 hover:border-[#c5a059] rounded text-[11px] font-sans text-[#e4c88a] font-medium flex items-center justify-center space-x-1 transition"
              title="Align Center Horizontally"
            >
              <AlignCenter className="w-3 h-3 text-[#c5a059]" />
              <span>Center H</span>
            </button>
            <button
              onClick={() => alignElement(el.id, 'right')}
              className="py-1.5 px-2 bg-[#101217] hover:bg-[#1d212c] border border-white/5 hover:border-[#c5a059] rounded text-[11px] font-sans text-gray-300 flex items-center justify-center space-x-1 transition"
              title="Align to Right"
            >
              <AlignRight className="w-3 h-3 text-[#c5a059]" />
              <span>Right</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <button
              onClick={() => alignElement(el.id, 'top')}
              className="py-1.5 px-2 bg-[#101217] hover:bg-[#1d212c] border border-white/5 hover:border-[#c5a059] rounded text-[11px] font-sans text-gray-300 flex items-center justify-center space-x-1 transition"
              title="Align to Top"
            >
              <ArrowUp className="w-3 h-3 text-[#c5a059]" />
              <span>Top</span>
            </button>
            <button
              onClick={() => alignElement(el.id, 'center-v')}
              className="py-1.5 px-2 bg-[#101217] hover:bg-[#1d212c] border border-white/5 hover:border-[#c5a059] rounded text-[11px] font-sans text-[#e4c88a] font-medium flex items-center justify-center space-x-1 transition"
              title="Align Center Vertically"
            >
              <ArrowUpDown className="w-3 h-3 text-[#c5a059]" />
              <span>Center V</span>
            </button>
            <button
              onClick={() => alignElement(el.id, 'bottom')}
              className="py-1.5 px-2 bg-[#101217] hover:bg-[#1d212c] border border-white/5 hover:border-[#c5a059] rounded text-[11px] font-sans text-gray-300 flex items-center justify-center space-x-1 transition"
              title="Align to Bottom"
            >
              <ArrowDown className="w-3 h-3 text-[#c5a059]" />
              <span>Bottom</span>
            </button>
          </div>

          <button
            onClick={() => alignElement(el.id, 'center-both')}
            className="w-full py-1.5 bg-[#1b1f2b] hover:bg-[#252b3b] border border-[#3b4356] hover:border-[#c5a059] rounded text-xs font-sans text-[#e4c88a] flex items-center justify-center space-x-1.5 transition mt-1"
          >
            <Crosshair className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Dead Center on Canvas</span>
          </button>
        </div>

        {/* Layer Hierarchy & Stacking: Bring to Front, Send to Back, Step Up, Step Down */}
        <div className="pt-2.5 border-t border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a059] flex items-center space-x-1.5 font-medium">
              <Layers className="w-3.5 h-3.5" />
              <span>Layer Order (Upar / Neeche)</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30 font-mono text-[10px] font-bold">
              Layer {el.zIndex || (elements.findIndex(x => x.id === el.id) + 1)} of {elements.length}
            </span>
          </div>

          {/* Quick Hero Actions: Bring to Front / Send to Back */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => bringToFront(el.id)}
              className="py-2 px-2 bg-[#1d222e] hover:bg-[#c5a059] text-gray-100 hover:text-black border border-[#c5a059]/40 hover:border-[#c5a059] rounded-lg text-xs font-sans font-semibold flex items-center justify-center space-x-1.5 transition shadow-sm group"
              title="Bring to Top of All Layers (Sab ke upar le aao) - Shortcut: Ctrl+Shift+]"
            >
              <ChevronsUp className="w-4 h-4 text-[#c5a059] group-hover:text-black transition-colors" />
              <span>Sab Ke Upar (Front)</span>
            </button>
            <button
              onClick={() => sendToBack(el.id)}
              className="py-2 px-2 bg-[#14161d] hover:bg-[#202532] text-gray-300 hover:text-white border border-white/10 hover:border-white/30 rounded-lg text-xs font-sans flex items-center justify-center space-x-1.5 transition group"
              title="Send to Bottom of All Layers (Sab ke neeche bhej do) - Shortcut: Ctrl+Shift+["
            >
              <ChevronsDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              <span>Sab Ke Neeche (Back)</span>
            </button>
          </div>

          {/* 1-Step Nudge Buttons */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => changeZIndex(el.id, 'up')}
              className="py-1.5 px-2 bg-[#101217] hover:bg-[#1d212c] border border-white/5 hover:border-[#c5a059]/40 rounded text-[11px] font-sans text-gray-300 hover:text-white flex items-center justify-center space-x-1.5 transition"
              title="Bring 1 Step Forward (Ctrl+])"
            >
              <ArrowUp className="w-3 h-3 text-[#c5a059]" />
              <span>1 Layer Upar (+1)</span>
            </button>
            <button
              onClick={() => changeZIndex(el.id, 'down')}
              className="py-1.5 px-2 bg-[#101217] hover:bg-[#1d212c] border border-white/5 hover:border-[#c5a059]/40 rounded text-[11px] font-sans text-gray-300 hover:text-white flex items-center justify-center space-x-1.5 transition"
              title="Send 1 Step Backward (Ctrl+[)"
            >
              <ArrowDown className="w-3 h-3 text-[#c5a059]" />
              <span>1 Layer Neeche (-1)</span>
            </button>
          </div>

          {/* Dedicated 1-Click Action for Text Under Image / Image Over Text */}
          {el.type === 'text' ? (
            <div className="p-3 bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-xl space-y-2">
              <div className="flex items-center space-x-1.5 text-[#e4c88a] font-medium text-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Text & Image Layer Stacking:</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                <button
                  onClick={() => sendToBack(el.id)}
                  className="py-1.5 px-2 bg-[#161922] hover:bg-[#202534] border border-[#c5a059]/40 hover:border-[#c5a059] rounded-lg text-xs font-sans text-white flex items-center justify-center space-x-1 transition"
                  title="Place Text directly underneath image layer"
                >
                  <ChevronsDown className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Text Image K Neeche</span>
                </button>
                <button
                  onClick={() => bringToFront(el.id)}
                  className="py-1.5 px-2 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-semibold rounded-lg text-xs font-sans flex items-center justify-center space-x-1 transition shadow-sm"
                  title="Bring Text above all images and shapes"
                >
                  <ChevronsUp className="w-3.5 h-3.5 text-black" />
                  <span>Text Image K Upar</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-[#191c28] border border-white/10 rounded-xl space-y-2">
              <div className="flex items-center space-x-1.5 text-gray-200 font-medium text-xs">
                <Layers className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Media & Text Stacking:</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                <button
                  onClick={() => bringToFront(el.id)}
                  className="py-1.5 px-2 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-semibold rounded-lg text-xs font-sans flex items-center justify-center space-x-1 transition shadow-sm"
                  title="Bring Image over text layers"
                >
                  <ChevronsUp className="w-3.5 h-3.5 text-black" />
                  <span>Image Text K Upar</span>
                </button>
                <button
                  onClick={() => sendToBack(el.id)}
                  className="py-1.5 px-2 bg-[#141620] hover:bg-[#1e2230] border border-white/10 hover:border-white/30 rounded-lg text-xs font-sans text-gray-200 flex items-center justify-center space-x-1 transition"
                  title="Send Image behind text layers"
                >
                  <ChevronsDown className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Image Text K Neeche</span>
                </button>
              </div>
            </div>
          )}

          {/* Mini Interactive Layers Stack viewer with 1-click reorder */}
          <div className="pt-2 border-t border-white/5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400">
                Canvas Layers Stack ({elements.length})
              </span>
              <span className="text-[9px] font-mono text-[#c5a059]">Top (#1) → Bottom</span>
            </div>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {[...elements].reverse().map((layerItem) => {
                const isCurrent = layerItem.id === el.id;
                const layerIndex = elements.findIndex(x => x.id === layerItem.id) + 1;
                let label = layerItem.type;
                let typeBadge = 'Obj';
                let badgeBg = 'bg-gray-700 text-gray-200';

                if (layerItem.type === 'text') {
                  label = layerItem.text ? `"${layerItem.text.substring(0, 16)}..."` : 'Text Box';
                  typeBadge = 'Text';
                  badgeBg = 'bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40';
                } else if (layerItem.type === 'image') {
                  label = layerItem.imageAlt || 'Editorial Photo';
                  typeBadge = 'Image';
                  badgeBg = 'bg-sky-500/20 text-sky-300 border border-sky-500/40';
                } else if (layerItem.type === 'vector' || layerItem.isShapeFrame) {
                  label = layerItem.shapeName || 'Shape Frame';
                  typeBadge = 'Frame';
                  badgeBg = 'bg-purple-500/20 text-purple-300 border border-purple-500/40';
                } else if (layerItem.type === 'shape') {
                  label = layerItem.shapeType || 'Box Shape';
                  typeBadge = 'Shape';
                  badgeBg = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
                } else if (layerItem.type === 'line') {
                  label = layerItem.name || 'Border Line';
                  typeBadge = 'Line';
                  badgeBg = 'bg-gray-500/20 text-gray-300';
                }

                return (
                  <div
                    key={layerItem.id}
                    onClick={() => setSelectedElementId(layerItem.id)}
                    className={`flex items-center justify-between p-1.5 rounded cursor-pointer transition text-xs font-mono group ${
                      isCurrent
                        ? 'bg-[#c5a059]/20 border border-[#c5a059] text-white font-medium'
                        : 'bg-[#101217] hover:bg-[#181b24] border border-white/5 text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 truncate">
                      <span className={`text-[8px] px-1 py-0.5 rounded font-mono font-bold ${badgeBg}`}>
                        {typeBadge}
                      </span>
                      <span className="truncate text-[11px] font-sans text-gray-200">{label}</span>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0">
                      {/* Step Up in Layer */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeZIndex(layerItem.id, 'up');
                        }}
                        title="Move layer up"
                        className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
                      >
                        <ArrowUp className="w-2.5 h-2.5" />
                      </button>
                      {/* Step Down in Layer */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeZIndex(layerItem.id, 'down');
                        }}
                        title="Move layer down"
                        className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
                      >
                        <ArrowDown className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2c. CANVA-STYLE DECORATIVE LINE STYLING */}
      {el.type === 'line' && (
        <div className="p-3.5 bg-[#171922] border border-[#2b303e] rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[10px] uppercase tracking-wider text-gray-300 font-medium">
              Decorative Line & Corners
            </label>
            <span className="font-mono text-[9px] text-[#c5a059] px-1.5 py-0.5 rounded bg-black/40 border border-white/5">
              {el.name || 'Line'}
            </span>
          </div>

          {/* Stroke Color */}
          <div>
            <span className="text-[9px] font-mono text-gray-400 block mb-1">Line / Corner Color</span>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={el.strokeColor || '#ffffff'}
                onChange={(e) => updateElement(el.id, { strokeColor: e.target.value })}
                className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={el.strokeColor || '#ffffff'}
                onChange={(e) => updateElement(el.id, { strokeColor: e.target.value })}
                className="flex-1 bg-[#0f1115] border border-[#2a2e38] text-xs font-mono text-white p-1.5 rounded focus:outline-none focus:border-[#c5a059]"
              />
            </div>
            {/* Quick Color Presets */}
            <div className="flex items-center space-x-1.5 pt-2">
              {[
                { label: 'White', color: '#ffffff' },
                { label: 'Gold', color: '#c5a059' },
                { label: 'Warm', color: '#e4c88a' },
                { label: 'Slate', color: '#6b7280' },
                { label: 'Dark', color: '#1a1d24' }
              ].map((c) => (
                <button
                  key={c.color}
                  onClick={() => updateElement(el.id, { strokeColor: c.color })}
                  className="px-2 py-0.5 rounded text-[9px] font-mono border border-white/10 hover:border-[#c5a059] text-gray-300 hover:text-white"
                  style={{ borderBottom: `2px solid ${c.color}` }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stroke Width */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
              <span>Thickness</span>
              <span className="text-[#c5a059]">{el.strokeWidth || 2}px</span>
            </div>
            <input
              type="range"
              min="1"
              max="16"
              step="0.5"
              value={el.strokeWidth || 2}
              onChange={(e) => updateElement(el.id, { strokeWidth: Number(e.target.value) })}
              className="w-full accent-[#c5a059]"
            />
          </div>

          {/* Stroke Style */}
          <div>
            <span className="text-[9px] font-mono text-gray-400 block mb-1">Pattern</span>
            <div className="grid grid-cols-3 gap-1 p-1 bg-[#0f1115] rounded-lg border border-[#262a34]">
              {['solid', 'dashed', 'dotted'].map((st) => (
                <button
                  key={st}
                  onClick={() => updateElement(el.id, { strokeStyle: st })}
                  className={`py-1 text-xs capitalize rounded transition ${
                    (el.strokeStyle || 'solid') === st
                      ? 'bg-[#c5a059] text-black font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. COLOR & GRADIENT ENGINE */}
      {(el.type === 'shape' || el.type === 'vector') && (
        <div className="p-3.5 bg-[#171922] border border-[#2b303e] rounded-xl space-y-3">
          <label className="font-mono text-[10px] uppercase tracking-wider text-gray-400 block">
            Fill & Gradient
          </label>

          <div className="grid grid-cols-3 gap-1 p-1 bg-[#0f1115] rounded-lg border border-[#262a34]">
            <button
              onClick={() => updateElement(el.id, { bgType: 'solid' })}
              className={`py-1 text-xs rounded transition ${
                (el.bgType === 'solid' || !el.bgType)
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Solid
            </button>
            <button
              onClick={() =>
                updateElement(el.id, {
                  bgType: 'gradient',
                  bgGradient: el.bgGradient || { from: '#1e212b', to: '#101217', angle: 135 }
                })
              }
              className={`py-1 text-xs rounded transition ${
                el.bgType === 'gradient'
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Gradient
            </button>
            <button
              onClick={() =>
                updateElement(el.id, {
                  bgType: 'image',
                  imageUrl: el.imageUrl || CURATED_IMAGES[0].url
                })
              }
              className={`py-1 text-xs rounded transition ${
                el.bgType === 'image'
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Image Mask
            </button>
          </div>

          {(el.bgType === 'solid' || !el.bgType) && (
            <div>
              <span className="text-[9px] font-mono text-gray-500 block mb-1">Fill Hex</span>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={el.bgColor || '#15171d'}
                  onChange={(e) => updateElement(el.id, { bgColor: e.target.value })}
                  className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={el.bgColor || '#15171d'}
                  onChange={(e) => updateElement(el.id, { bgColor: e.target.value })}
                  className="flex-1 bg-[#0f1115] border border-[#2a2e38] text-xs font-mono text-white p-1.5 rounded focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>
          )}

          {el.bgType === 'gradient' && (
            <div className="space-y-2.5">
              <div>
                <span className="text-[9px] font-mono text-gray-500 block mb-1">Color 1 (From)</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={el.bgGradient?.from || '#1e212b'}
                    onChange={(e) =>
                      updateElement(el.id, {
                        bgGradient: { ...el.bgGradient, from: e.target.value }
                      })
                    }
                    className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={el.bgGradient?.from || '#1e212b'}
                    onChange={(e) =>
                      updateElement(el.id, {
                        bgGradient: { ...el.bgGradient, from: e.target.value }
                      })
                    }
                    className="flex-1 bg-[#0f1115] border border-[#2a2e38] text-xs font-mono text-white p-1.5 rounded focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div>
                <span className="text-[9px] font-mono text-gray-500 block mb-1">Color 2 (To)</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={el.bgGradient?.to || '#101217'}
                    onChange={(e) =>
                      updateElement(el.id, {
                        bgGradient: { ...el.bgGradient, to: e.target.value }
                      })
                    }
                    className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={el.bgGradient?.to || '#101217'}
                    onChange={(e) =>
                      updateElement(el.id, {
                        bgGradient: { ...el.bgGradient, to: e.target.value }
                      })
                    }
                    className="flex-1 bg-[#0f1115] border border-[#2a2e38] text-xs font-mono text-white p-1.5 rounded focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="pt-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mb-1">
                  <span>Gradient Angle</span>
                  <span className="text-[#c5a059]">{el.bgGradient?.angle || 135}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="5"
                  value={el.bgGradient?.angle || 135}
                  onChange={(e) =>
                    updateElement(el.id, {
                      bgGradient: { ...el.bgGradient, angle: Number(e.target.value) }
                    })
                  }
                  className="w-full accent-[#c5a059]"
                />
              </div>
            </div>
          )}

          {/* 3c. IMAGE MASK IN SHAPE / VECTOR */}
          {el.bgType === 'image' && (
            <div className="space-y-3 pt-1">
              <span className="text-[10px] font-mono text-gray-400 block">Shape Mask Image</span>

              {/* Current Screen/Mask Preview */}
              <div className="h-28 rounded-lg border border-[#2e3342] bg-[#0c0e12] overflow-hidden relative group">
                <img
                  src={el.imageUrl || CURATED_IMAGES[0].url}
                  alt="Mask preview"
                  className="w-full h-full object-cover"
                />
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition">
                  <Upload className="w-5 h-5 text-[#c5a059] mb-1" />
                  <span className="text-[10px] font-mono text-white font-medium">Upload Image into Shape</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (evt) => {
                          updateElement(el.id, { bgType: 'image', imageUrl: evt.target.result });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>

              {/* URL Input */}
              <input
                type="text"
                value={el.imageUrl || ''}
                onChange={(e) => updateElement(el.id, { bgType: 'image', imageUrl: e.target.value })}
                placeholder="Paste Image URL to mask into shape..."
                className="w-full bg-[#0f1115] border border-[#2a2e38] text-xs font-mono text-white p-1.5 rounded focus:outline-none focus:border-[#c5a059]"
              />

              {/* Upload Button */}
              <label className="flex items-center justify-center space-x-1.5 w-full py-1.5 bg-[#1e222d] hover:bg-[#272c3a] border border-[#373d4e] rounded-lg text-xs font-mono text-gray-200 cursor-pointer transition">
                <Upload className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Upload Custom Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (evt) => {
                        updateElement(el.id, { bgType: 'image', imageUrl: evt.target.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>

              {/* Curated Presets */}
              <div>
                <span className="text-[9px] font-mono text-gray-500 block mb-1">Pick Luxury Image</span>
                <div className="grid grid-cols-4 gap-1.5">
                  {CURATED_IMAGES.slice(0, 8).map((img) => (
                    <button
                      key={img.id}
                      onClick={() => updateElement(el.id, { bgType: 'image', imageUrl: img.url })}
                      className="h-10 rounded border border-white/10 hover:border-[#c5a059] overflow-hidden relative transition"
                      title={img.title}
                    >
                      <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Outline Stroke & Width */}
              <div className="pt-2 border-t border-white/5 space-y-2">
                <span className="text-[9px] font-mono text-gray-400 block">Shape Border Outline</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={el.strokeColor || '#c5a059'}
                    onChange={(e) => updateElement(el.id, { strokeColor: e.target.value })}
                    className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={el.strokeWidth ?? 2}
                    onChange={(e) => updateElement(el.id, { strokeWidth: Number(e.target.value) })}
                    className="flex-1 accent-[#c5a059]"
                  />
                  <span className="font-mono text-xs text-[#c5a059] w-8 text-right">{el.strokeWidth ?? 2}px</span>
                </div>
              </div>
            </div>
          )}

          {el.type === 'shape' && (
            <div className="pt-2 border-t border-white/5 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                <span>Corner Radius</span>
                <span className="text-[#c5a059]">{el.borderRadius ?? 12}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={el.borderRadius ?? 12}
                onChange={(e) => updateElement(el.id, { borderRadius: Number(e.target.value) })}
                className="w-full accent-[#c5a059]"
              />
            </div>
          )}
        </div>
      )}

      {/* 4. TEXT TYPOGRAPHY */}
      {el.type === 'text' && (
        <div className="p-3.5 bg-[#171922] border border-[#2b303e] rounded-xl space-y-3">
          <label className="font-mono text-[10px] uppercase tracking-wider text-gray-400 block">
            Typography
          </label>

          <select
            value={el.fontFamily}
            onChange={(e) => updateElement(el.id, { fontFamily: e.target.value })}
            className="w-full bg-[#0f1115] border border-[#2a2e38] text-xs text-white p-2 rounded font-serif focus:outline-none focus:border-[#c5a059]"
          >
            {FONT_GALLERY.map((f) => (
              <option key={f.id} value={f.family}>
                {f.name} ({f.category})
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[9px] font-mono text-gray-500 block mb-0.5">Size (px)</span>
              <input
                type="number"
                value={el.fontSize || 36}
                onChange={(e) => updateElement(el.id, { fontSize: Number(e.target.value) })}
                className="w-full bg-[#0f1115] border border-[#2a2e38] text-xs font-mono text-white p-1 rounded focus:outline-none focus:border-[#c5a059]"
              />
            </div>
            <div>
              <span className="text-[9px] font-mono text-gray-500 block mb-0.5">Weight</span>
              <select
                value={el.fontWeight || '400'}
                onChange={(e) => updateElement(el.id, { fontWeight: e.target.value })}
                className="w-full bg-[#0f1115] border border-[#2a2e38] text-xs text-white p-1 rounded focus:outline-none focus:border-[#c5a059]"
              >
                <option value="300">Light (300)</option>
                <option value="400">Regular (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semibold (600)</option>
                <option value="700">Bold (700)</option>
              </select>
            </div>
          </div>

          <div>
            <span className="text-[9px] font-mono text-gray-500 block mb-1">Color</span>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={el.textColor || '#f5f2eb'}
                onChange={(e) => updateElement(el.id, { textColor: e.target.value })}
                className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={el.textColor || '#f5f2eb'}
                onChange={(e) => updateElement(el.id, { textColor: e.target.value })}
                className="flex-1 bg-[#0f1115] border border-[#2a2e38] text-xs font-mono text-white p-1 rounded focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
