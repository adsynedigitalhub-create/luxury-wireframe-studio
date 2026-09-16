import React, { useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import {
  ALL_SHAPE_FRAMES,
  generatePolygonSvgPath,
  generateStarburstSvgPath
} from '../../data/massiveShapeFrames';
import { CURATED_IMAGES } from '../../data/assetsLibrary';
import {
  X,
  Sparkles,
  Sliders,
  Upload,
  Plus,
  Layers,
  FileCode,
  Image as ImageIcon,
  Check
} from 'lucide-react';

export const ShapeFramesDrawer = ({ isOpen, onClose }) => {
  const { addShapeFrame } = useCanvas();
  const [activeTab, setActiveTab] = useState('curated'); // 'curated' | 'generator' | 'custom'
  const [frameCategory, setFrameCategory] = useState('All');

  // Generator State
  const [genMode, setGenMode] = useState('polygon'); // 'polygon' | 'star'
  const [genSides, setGenSides] = useState(7);
  const [genPoints, setGenPoints] = useState(12);
  const [genInnerRadius, setGenInnerRadius] = useState(26);
  const [genStrokeColor, setGenStrokeColor] = useState('#c5a059');
  const [genStrokeWidth, setGenStrokeWidth] = useState(2);
  const [genImage, setGenImage] = useState(CURATED_IMAGES[0].url);

  // Custom SVG State
  const [svgPathInput, setSvgPathInput] = useState('');
  const [svgNameInput, setSvgNameInput] = useState('My Custom Shape');
  const [svgError, setSvgError] = useState('');
  const [customSuccess, setCustomSuccess] = useState(false);

  if (!isOpen) return null;

  const categories = [
    'All',
    'Arches & Portals',
    'Organic Fluid Blobs',
    'Badges & Seals',
    'Stamps & Tickets',
    'Geometric & Editorial',
    'N-Sided Polygons',
    'N-Point Stars'
  ];

  const filteredFrames =
    frameCategory === 'All'
      ? ALL_SHAPE_FRAMES
      : ALL_SHAPE_FRAMES.filter((f) => f.category === frameCategory);

  const currentGenPath =
    genMode === 'polygon'
      ? generatePolygonSvgPath(genSides)
      : generateStarburstSvgPath(genPoints, 48, genInnerRadius);
  const handleAddGeneratedShape = () => {
    const frame = {
      id: `frame-gen-${Date.now()}`,
      name:
        genMode === 'polygon'
          ? `${genSides}-Sided Polygon Frame`
          : `${genPoints}-Point Starburst Frame`,
      path: currentGenPath,
      viewBox: '0 0 100 100',
      defaultWidth: 280,
      defaultHeight: 280,
      defaultImage: genImage,
      strokeColor: genStrokeColor,
      strokeWidth: genStrokeWidth
    };
    addShapeFrame(frame);
    onClose();
  };

  const handleAddCustomSvg = () => {
    setSvgError('');
    if (!svgPathInput.trim()) {
      setSvgError('Please enter an SVG path (e.g. M 0 0 L 100 0 ... Z) or drop an SVG file.');
      return;
    }

    let cleanedPath = svgPathInput.trim();
    if (cleanedPath.includes('<svg') || cleanedPath.includes('<path')) {
      const match = cleanedPath.match(/d=["']([^"']+)["']/i);
      if (match && match[1]) {
        cleanedPath = match[1];
      } else {
        setSvgError('Could not find d="..." attribute in the pasted SVG code.');
        return;
      }
    }

    const frame = {
      id: `frame-custom-${Date.now()}`,
      name: svgNameInput || 'Custom SVG Frame',
      path: cleanedPath,
      viewBox: '0 0 100 100',
      defaultWidth: 280,
      defaultHeight: 280,
      defaultImage: CURATED_IMAGES[0].url,
      strokeColor: '#c5a059',
      strokeWidth: 2
    };

    addShapeFrame(frame);
    setCustomSuccess(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      setSvgPathInput(text);
      setSvgNameInput(file.name.replace(/\.svg$/i, ''));
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-y-0 left-0 w-[470px] bg-[#111318] border-r border-[#282d38] shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-200 select-none">
      {/* Header */}
      <div className="p-4 border-b border-[#262a34] flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            <h2 className="font-serif text-base font-semibold text-white">
              1000+ Shape Frames & Masks
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#c5a059]">
            Infinite Polygons • Organic Blobs • Custom SVG Uploader
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Tabs */}
      <div className="grid grid-cols-3 gap-1 p-2 bg-[#161820] border-b border-[#262a34]">
        <button
          onClick={() => setActiveTab('curated')}
          className={`py-2 rounded-lg flex items-center justify-center space-x-1.5 text-xs font-sans transition ${
            activeTab === 'curated'
              ? 'bg-[#c5a059] text-black font-semibold shadow'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Library ({ALL_SHAPE_FRAMES.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('generator')}
          className={`py-2 rounded-lg flex items-center justify-center space-x-1.5 text-xs font-sans transition ${
            activeTab === 'generator'
              ? 'bg-[#c5a059] text-black font-semibold shadow'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Generator (1000+)</span>
        </button>

        <button
          onClick={() => setActiveTab('custom')}
          className={`py-2 rounded-lg flex items-center justify-center space-x-1.5 text-xs font-sans transition ${
            activeTab === 'custom'
              ? 'bg-[#c5a059] text-black font-semibold shadow'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload SVG</span>
        </button>
      </div>

      {/* TAB 1: CURATED FRAMES LIBRARY */}
      {activeTab === 'curated' && (
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Sub-Category Filter Chips */}
          <div className="p-3 border-b border-[#262a34] flex items-center space-x-1.5 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFrameCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-sans whitespace-nowrap border transition ${
                  frameCategory === cat
                    ? 'bg-[#c5a059] text-black font-semibold border-[#c5a059]'
                    : 'bg-[#181a22] border-[#292e3a] text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Frames Grid */}
          <div className="p-4 grid grid-cols-2 gap-3 flex-1 overflow-y-auto">
            {filteredFrames.map((frame) => (
              <div
                key={frame.id}
                onClick={() => {
                  addShapeFrame(frame);
                  onClose();
                }}
                className="p-3 rounded-xl border border-[#2b303d] hover:border-[#c5a059] bg-[#161820] cursor-pointer group flex flex-col items-center justify-between space-y-2 transition shadow-sm hover:bg-[#1a1c26]"
              >
                <div className="w-full flex items-center justify-between">
                  <span className="font-serif text-xs text-white group-hover:text-[#c5a059] truncate font-medium">
                    {frame.name}
                  </span>
                  <span className="text-[9px] font-mono text-[#c5a059] px-1.5 py-0.5 rounded bg-black/40 border border-white/5">
                    {frame.aspectRatio}
                  </span>
                </div>

                {/* SVG Visual Graphic with Image Mask */}
                <div className="w-full h-28 rounded-lg bg-[#0d0f14] border border-[#242833] flex items-center justify-center p-2 relative overflow-hidden group-hover:border-[#c5a059]/50 transition">
                  <svg
                    viewBox={frame.viewBox || '0 0 100 100'}
                    className="w-20 h-20 filter drop-shadow"
                  >
                    <defs>
                      <clipPath id={`clip-preview-${frame.id}`}>
                        <path d={frame.path} />
                      </clipPath>
                    </defs>
                    <image
                      href={frame.defaultImage || CURATED_IMAGES[0].url}
                      xlinkHref={frame.defaultImage || CURATED_IMAGES[0].url}
                      width="100"
                      height="100"
                      preserveAspectRatio="xMidYMid slice"
                      clipPath={`url(#clip-preview-${frame.id})`}
                    />
                    <path
                      d={frame.path}
                      fill="none"
                      stroke={frame.strokeColor || '#c5a059'}
                      strokeWidth={frame.strokeWidth || 2}
                    />
                  </svg>
                </div>

                <div className="w-full flex items-center justify-between text-[10px] font-mono text-gray-400 pt-1 border-t border-white/5">
                  <span className="truncate">{frame.category.split('&')[0]}</span>
                  <span className="text-[#c5a059] flex items-center space-x-0.5 group-hover:underline">
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ALGORITHMIC INFINITE SHAPE GENERATOR */}
      {activeTab === 'generator' && (
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="p-3 bg-[#171922] border border-[#262a34] rounded-xl space-y-1">
            <span className="font-serif text-sm font-semibold text-white flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Algorithmic Shape Frame Engine</span>
            </span>
            <p className="text-xs text-gray-400 font-sans">
              Generate any regular polygon from 3 to 32 sides, or complex starbursts with precision inner radii.
            </p>
          </div>

          {/* Generator Type Selector */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-[#161820] rounded-xl border border-[#282d38]">
            <button
              onClick={() => setGenMode('polygon')}
              className={`py-2 rounded-lg text-xs font-sans transition ${
                genMode === 'polygon'
                  ? 'bg-[#c5a059] text-black font-semibold shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              N-Sided Polygon
            </button>
            <button
              onClick={() => setGenMode('star')}
              className={`py-2 rounded-lg text-xs font-sans transition ${
                genMode === 'star'
                  ? 'bg-[#c5a059] text-black font-semibold shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              N-Point Starburst
            </button>
          </div>

          {/* Live Dynamic Preview */}
          <div className="h-48 rounded-xl bg-[#0b0d11] border border-[#282d3a] flex items-center justify-center p-3 relative overflow-hidden shadow-inner">
            <svg viewBox="0 0 100 100" className="w-36 h-36 filter drop-shadow-xl">
              <defs>
                <clipPath id="clip-live-generator">
                  <path d={currentGenPath} />
                </clipPath>
              </defs>
              <image
                href={genImage}
                width="100"
                height="100"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#clip-live-generator)"
              />
              <path
                d={currentGenPath}
                fill="none"
                stroke={genStrokeColor}
                strokeWidth={genStrokeWidth}
              />
            </svg>
            <span className="absolute bottom-2 right-3 font-mono text-[10px] text-[#c5a059] bg-black/60 px-2 py-0.5 rounded border border-white/5">
              {genMode === 'polygon' ? `${genSides} Sides` : `${genPoints} Points`}
            </span>
          </div>

          {/* Slider Controls */}
          {genMode === 'polygon' ? (
            <div className="space-y-2 p-3 bg-[#171922] border border-[#2b303e] rounded-xl">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-gray-300">Number of Sides (Polygon)</span>
                <span className="text-[#c5a059] font-bold">{genSides} sides</span>
              </div>
              <input
                type="range"
                min="3"
                max="32"
                value={genSides}
                onChange={(e) => setGenSides(Number(e.target.value))}
                className="w-full accent-[#c5a059]"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-500">
                <span>3 (Triangle)</span>
                <span>8 (Octagon)</span>
                <span>16</span>
                <span>32-gon</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3 p-3 bg-[#171922] border border-[#2b303e] rounded-xl">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-300">Number of Star Points</span>
                  <span className="text-[#c5a059] font-bold">{genPoints} points</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="32"
                  value={genPoints}
                  onChange={(e) => setGenPoints(Number(e.target.value))}
                  className="w-full accent-[#c5a059]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-300">Inner Depth Radius</span>
                  <span className="text-[#c5a059] font-bold">{genInnerRadius}px</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="45"
                  value={genInnerRadius}
                  onChange={(e) => setGenInnerRadius(Number(e.target.value))}
                  className="w-full accent-[#c5a059]"
                />
              </div>
            </div>
          )}

          {/* Stroke & Style Controls */}
          <div className="p-3 bg-[#171922] border border-[#2b303e] rounded-xl space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 block">
              Frame Border & Outline
            </span>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={genStrokeColor}
                onChange={(e) => setGenStrokeColor(e.target.value)}
                className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer"
              />
              <div className="flex-1 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                  <span>Border Width</span>
                  <span className="text-[#c5a059]">{genStrokeWidth}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={genStrokeWidth}
                  onChange={(e) => setGenStrokeWidth(Number(e.target.value))}
                  className="w-full accent-[#c5a059]"
                />
              </div>
            </div>

            {/* Quick Presets for Demo Image */}
            <div className="space-y-1 pt-2 border-t border-white/5">
              <span className="text-[10px] font-mono text-gray-400 block">Preview Fill Image</span>
              <div className="grid grid-cols-5 gap-1.5">
                {CURATED_IMAGES.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setGenImage(img.url)}
                    className={`h-9 rounded overflow-hidden border transition ${
                      genImage === img.url ? 'border-[#c5a059] ring-2 ring-[#c5a059]/40' : 'border-white/10'
                    }`}
                  >
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleAddGeneratedShape}
            className="w-full py-2.5 bg-[#c5a059] hover:bg-[#e4c88a] text-black font-semibold rounded-xl text-xs font-sans flex items-center justify-center space-x-2 shadow-lg transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Generated Frame to Canvas</span>
          </button>
        </div>
      )}

      {/* TAB 3: CUSTOM SVG UPLOADER & PATH PARSER */}
      {activeTab === 'custom' && (
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="p-3 bg-[#171922] border border-[#262a34] rounded-xl space-y-1">
            <span className="font-serif text-sm font-semibold text-white flex items-center space-x-1.5">
              <FileCode className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Paste or Upload Any SVG Shape</span>
            </span>
            <p className="text-xs text-gray-400 font-sans">
              Bring any custom shape from Illustrator, Figma, or online SVG libraries. Any SVG shape is automatically converted into an image frame mask.
            </p>
          </div>

          {/* File Upload Box */}
          <label className="border-2 border-dashed border-[#2d3342] hover:border-[#c5a059] rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition bg-[#141720]/60 hover:bg-[#181c26]">
            <Upload className="w-6 h-6 text-[#c5a059] mb-1.5" />
            <span className="font-serif text-xs font-medium text-white">Click to Upload .SVG File</span>
            <span className="font-mono text-[9px] text-gray-400 mt-0.5">Supports any vector path</span>
            <input type="file" accept=".svg" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* SVG Code Input */}
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-gray-300 block">
              Or Paste SVG Code / Path ('d' attribute):
            </span>
            <textarea
              rows={5}
              value={svgPathInput}
              onChange={(e) => setSvgPathInput(e.target.value)}
              placeholder='<svg viewBox="0 0 100 100"><path d="M50 0 L100 100 L0 100 Z" /></svg>  OR  M 0 0 L 100 50 ...'
              className="w-full bg-[#0d0f14] border border-[#282d38] text-xs font-mono text-gray-200 p-2.5 rounded-xl focus:outline-none focus:border-[#c5a059] resize-none"
            />
          </div>

          {/* Shape Name */}
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-gray-400 block">Frame Name</span>
            <input
              type="text"
              value={svgNameInput}
              onChange={(e) => setSvgNameInput(e.target.value)}
              className="w-full bg-[#0d0f14] border border-[#282d38] text-xs font-mono text-white p-2 rounded-lg focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          {svgError && (
            <p className="text-xs text-red-400 font-mono bg-red-500/10 p-2 rounded border border-red-500/20">
              {svgError}
            </p>
          )}

          {customSuccess && (
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded text-xs text-emerald-400 font-mono flex items-center space-x-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>Custom Shape Frame added to canvas!</span>
            </div>
          )}

          <button
            onClick={handleAddCustomSvg}
            className="w-full py-2.5 bg-[#c5a059] hover:bg-[#e4c88a] text-black font-semibold rounded-xl text-xs font-sans flex items-center justify-center space-x-2 shadow-lg transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create Custom Shape Frame</span>
          </button>
        </div>
      )}
    </div>
  );
};
