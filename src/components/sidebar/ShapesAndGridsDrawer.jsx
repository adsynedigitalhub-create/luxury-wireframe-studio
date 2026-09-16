import React, { useState, useEffect } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { VECTOR_SHAPES, WEBSITE_GRIDS } from '../../data/shapesAndGrids';
import { SHAPE_FRAMES } from '../../data/shapeFrames';
import { X, LayoutGrid, Shapes, Plus, Home, Cpu, Columns, Rows, Layers, Image as ImageIcon, Sparkles } from 'lucide-react';

export const ShapesAndGridsDrawer = ({ isOpen, onClose, initialTab = 'grids' }) => {
  const { addVectorShape, addWebsiteGrid, addShapeFrame } = useCanvas();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [gridCategory, setGridCategory] = useState('All');
  const [shapeCategory, setShapeCategory] = useState('All');
  const [frameCategory, setFrameCategory] = useState('All');

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const gridCategories = [
    'All',
    'Real Estate',
    'AI & Tech',
    'Columns',
    'Rows',
    'Modular Matrix',
    'Hierarchic Bento'
  ];

  const shapeCategories = [
    'All',
    'Basic',
    'Triangles',
    'Polygons',
    'Quadrilaterals',
    'Abstract & Badges',
    'Architectural'
  ];

  const filteredGrids = gridCategory === 'All'
    ? WEBSITE_GRIDS
    : WEBSITE_GRIDS.filter((g) => g.category === gridCategory);

  const filteredShapes = shapeCategory === 'All'
    ? VECTOR_SHAPES
    : VECTOR_SHAPES.filter((s) => s.category === shapeCategory);

  const handleAddGrid = (grid) => {
    addWebsiteGrid(grid);
    onClose();
  };

  const handleAddShape = (shape) => {
    addVectorShape(shape);
    onClose();
  };

  // Helper to render responsive mini wireframe thumbnail preview for any grid
  const renderGridMiniPreview = (grid) => {
    const maxX = Math.max(...grid.subElements.map(e => e.relX + e.width));
    const maxY = Math.max(...grid.subElements.map(e => e.relY + e.height));

    return (
      <div className="h-20 w-full rounded-lg bg-[#0c0e12] border border-[#232733] p-1.5 relative overflow-hidden flex items-center justify-center">
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transform: 'scale(1)',
            transformOrigin: 'top left'
          }}
        >
          {grid.subElements.map((sub, idx) => {
            const leftPct = (sub.relX / maxX) * 100;
            const topPct = (sub.relY / maxY) * 100;
            const widthPct = (sub.width / maxX) * 100;
            const heightPct = (sub.height / maxY) * 100;

            if (sub.type === 'text') {
              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    width: `${widthPct}%`,
                    height: `${heightPct}%`
                  }}
                  className="bg-[#c5a059]/40 rounded-[2px]"
                />
              );
            }

            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  width: `${widthPct}%`,
                  height: `${heightPct}%`
                }}
                className="rounded-[3px] border border-dashed border-[#3a4152] bg-[#161a24]/80"
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-y-0 left-0 w-[450px] bg-[#111318] border-r border-[#282d38] shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-200 select-none">
      {/* Header */}
      <div className="p-4 border-b border-[#262a34] flex items-center justify-between">
        <div>
          <h2 className="font-serif text-base font-semibold text-white">
            Architectural Grids & Shapes Library
          </h2>
          <span className="font-mono text-[10px] text-[#c5a059]">
            {WEBSITE_GRIDS.length} Website Wireframe Grids • {VECTOR_SHAPES.length} Shapes
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Primary Tabs */}
      <div className="grid grid-cols-3 gap-1 p-2 bg-[#161820] border-b border-[#262a34]">
        <button
          onClick={() => setActiveTab('grids')}
          className={`py-2 rounded-lg flex items-center justify-center space-x-1.5 text-xs font-sans transition ${
            activeTab === 'grids'
              ? 'bg-[#c5a059] text-black font-semibold shadow'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Grids</span>
        </button>

        <button
          onClick={() => setActiveTab('frames')}
          className={`py-2 rounded-lg flex items-center justify-center space-x-1.5 text-xs font-sans transition ${
            activeTab === 'frames'
              ? 'bg-[#c5a059] text-black font-semibold shadow'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Shape Frames</span>
        </button>

        <button
          onClick={() => setActiveTab('shapes')}
          className={`py-2 rounded-lg flex items-center justify-center space-x-1.5 text-xs font-sans transition ${
            activeTab === 'shapes'
              ? 'bg-[#c5a059] text-black font-semibold shadow'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Shapes className="w-3.5 h-3.5" />
          <span>Shapes (35+)</span>
        </button>
      </div>

      {/* TAB 1: WEBSITE WIREFRAME GRIDS */}
      {activeTab === 'grids' && (
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Sub-Category Filters */}
          <div className="p-3 border-b border-[#262a34] flex items-center space-x-1.5 overflow-x-auto">
            {gridCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setGridCategory(cat)}
                className={`px-3 py-1 rounded-full text-[10px] font-sans whitespace-nowrap border transition flex items-center space-x-1 ${
                  gridCategory === cat
                    ? 'bg-[#c5a059] text-black font-semibold border-[#c5a059]'
                    : 'bg-[#181a22] border-[#292e3a] text-gray-400 hover:text-white'
                }`}
              >
                {cat === 'Real Estate' && <Home className="w-3 h-3 text-[#c5a059] mr-0.5" />}
                {cat === 'AI & Tech' && <Cpu className="w-3 h-3 text-cyan-400 mr-0.5" />}
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Grids List */}
          <div className="p-4 space-y-3.5 flex-1 overflow-y-auto">
            {filteredGrids.map((grid) => (
              <div
                key={grid.id}
                onClick={() => handleAddGrid(grid)}
                className="p-4 rounded-xl border border-[#2b303d] hover:border-[#c5a059] bg-[#161820] cursor-pointer group transition duration-150 space-y-2.5 shadow-sm hover:bg-[#1a1c25]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-serif text-sm font-medium text-white group-hover:text-[#c5a059] transition">
                      {grid.name}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-[#c5a059] px-2 py-0.5 rounded bg-black/50 border border-white/5">
                    {grid.category}
                  </span>
                </div>

                {/* Live Structural Preview Schema */}
                {renderGridMiniPreview(grid)}

                <p className="text-xs text-gray-400 font-sans font-light leading-relaxed">
                  {grid.description}
                </p>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/5">
                  <span className="font-mono text-gray-500">
                    {grid.subElements.length} wireframe blocks • {grid.width}×{grid.height}px
                  </span>
                  <span className="text-[#c5a059] group-hover:underline flex items-center space-x-1 font-medium">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Drop onto Canvas</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SHAPES & VECTOR POLYGONS */}
      {activeTab === 'shapes' && (
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Category Chips */}
          <div className="p-3 border-b border-[#262a34] flex items-center space-x-1.5 overflow-x-auto">
            {shapeCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setShapeCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-sans whitespace-nowrap border transition ${
                  shapeCategory === cat
                    ? 'bg-[#c5a059] text-black font-semibold border-[#c5a059]'
                    : 'bg-[#181a22] border-[#292e3a] text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Shapes Grid */}
          <div className="p-4 grid grid-cols-3 gap-3 flex-1 overflow-y-auto">
            {filteredShapes.map((shape) => (
              <div
                key={shape.id}
                onClick={() => handleAddShape(shape)}
                className="p-3 rounded-xl border border-[#292d3a] hover:border-[#c5a059] bg-[#161820] cursor-pointer group flex flex-col items-center justify-center transition shadow-sm hover:scale-105"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-2">
                  <svg viewBox="0 0 100 100" className="w-10 h-10">
                    <path
                      d={shape.path}
                      fill="#c5a059"
                      className="group-hover:fill-[#e4c88a] transition"
                    />
                  </svg>
                </div>
                <span className="text-[10px] text-gray-300 font-sans text-center truncate w-full group-hover:text-white">
                  {shape.name}
                </span>
                <span className="text-[8px] font-mono text-gray-500 mt-0.5">
                  {shape.category.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SHAPE FRAMES / SHAPE MOCKUPS (CANVA FRAMES) */}
      {activeTab === 'frames' && (
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="p-3 bg-[#171922] border-b border-[#262a34] text-xs text-gray-300 font-light flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
            <span>
              Canva-style Shape Mockup Frames! Drop any frame onto canvas and swap with your own design image or screenshot.
            </span>
          </div>

          {/* Frames Grid */}
          <div className="p-4 grid grid-cols-2 gap-3 flex-1 overflow-y-auto">
            {SHAPE_FRAMES.map((frame) => (
              <div
                key={frame.id}
                onClick={() => {
                  addShapeFrame(frame);
                  onClose();
                }}
                className="p-3 rounded-xl border border-[#2b303d] hover:border-[#c5a059] bg-[#161820] cursor-pointer group flex flex-col items-center justify-between space-y-2.5 transition shadow-sm hover:bg-[#1a1c25]"
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
                    viewBox={frame.viewBox || "0 0 100 100"}
                    className="w-full h-full overflow-hidden"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <clipPath id={`preview-clip-${frame.id}`}>
                        <path d={frame.path} />
                      </clipPath>
                    </defs>
                    <image
                      href={frame.defaultImage}
                      width="100"
                      height="100"
                      preserveAspectRatio="xMidYMid slice"
                      clipPath={`url(#preview-clip-${frame.id})`}
                    />
                    <path
                      d={frame.path}
                      fill="none"
                      stroke={frame.strokeColor || '#c5a059'}
                      strokeWidth={frame.strokeWidth || 2}
                    />
                  </svg>
                </div>

                <div className="w-full flex items-center justify-between text-[9px] font-mono text-gray-400">
                  <span>{frame.category.split(' ')[0]}</span>
                  <span className="text-[#c5a059] font-medium group-hover:underline">+ Drop Frame</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
