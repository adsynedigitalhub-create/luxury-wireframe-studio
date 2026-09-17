import React from 'react';
import {
  MousePointer,
  Hand,
  Shapes,
  LayoutGrid,
  Type,
  Cuboid,
  Layout,
  Minus,
  Image as ImageIcon,
  Camera,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useCanvas } from '../../context/CanvasContext';

export const LeftToolDock = ({
  onOpenGridsAndShapes,
  onOpenTemplates,
  onOpenLines,
  onOpenImageGallery,
  onOpenFontGallery,
  onOpenScreenshotGrid,
  onOpenSplineDrawer
}) => {
  const {
    activeTool,
    setActiveTool,
    addTextElement,
    resetToDefaultCanvas
  } = useCanvas();

  const handleAddText = () => {
    addTextElement({
      text: 'Haute Editorial Headline',
      fontFamily: '"Cormorant Garamond", serif',
      fontSize: 56,
      fontWeight: '300',
      textColor: '#f5f2eb',
      letterSpacing: '-0.02em'
    });
  };

  const tools = [
    {
      id: 'select',
      label: 'Select (V)',
      icon: MousePointer,
      active: activeTool === 'select',
      onClick: () => setActiveTool('select')
    },
    {
      id: 'hand',
      label: 'Hand Pan (H)',
      icon: Hand,
      active: activeTool === 'hand',
      onClick: () => setActiveTool('hand')
    },
    { isDivider: true },
    {
      id: 'shapes',
      label: 'Shapes & Vectors',
      icon: Shapes,
      badge: '35+',
      onClick: () => onOpenGridsAndShapes('shapes')
    },
    {
      id: 'grids',
      label: 'Website Grids',
      icon: LayoutGrid,
      badge: 'Bento',
      onClick: () => onOpenGridsAndShapes('grids')
    },
    {
      id: 'text',
      label: 'Luxury Text',
      icon: Type,
      badge: 'Add',
      onClick: handleAddText
    },
    {
      id: 'spline',
      label: '3D & Spline Models',
      icon: Cuboid,
      badge: '3D',
      isSpecial: true,
      onClick: onOpenSplineDrawer
    },
    {
      id: 'templates',
      label: 'Style Templates',
      icon: Layout,
      badge: '40+',
      onClick: onOpenTemplates
    },
    {
      id: 'lines',
      label: 'Lines & Flourishes',
      icon: Minus,
      onClick: onOpenLines
    },
    {
      id: 'images',
      label: 'Editorial Media',
      icon: ImageIcon,
      onClick: onOpenImageGallery
    },
    {
      id: 'screenshot',
      label: 'Screenshot to Wireframe',
      icon: Camera,
      badge: 'AI',
      onClick: onOpenScreenshotGrid
    },
    { isDivider: true },
    {
      id: 'reset',
      label: 'Reset to Starter Layout',
      icon: RotateCcw,
      onClick: () => {
        if (window.confirm('Reset canvas back to luxury starter layout? (Your current canvas will be replaced)')) {
          resetToDefaultCanvas();
        }
      }
    }
  ];

  return (
    <aside className="w-16 bg-[#0e1015] border-r border-[#252834] flex flex-col items-center py-3 select-none z-30 shadow-2xl">
      <div className="flex-1 flex flex-col items-center space-y-2 w-full px-2 overflow-y-auto custom-scrollbar">
        {tools.map((tool, idx) => {
          if (tool.isDivider) {
            return <div key={div-} className="w-8 h-px bg-[#232734] my-1" />;
          }

          const IconComponent = tool.icon;
          const isActive = tool.active;

          return (
            <button
              key={tool.id}
              onClick={tool.onClick}
              title={tool.label}
              className={group relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 }
            >
              <IconComponent className="w-4 h-4 transition-transform group-hover:scale-110" />

              {/* Little Badge if applicable */}
              {tool.badge && (
                <span className="absolute -top-1 -right-1 text-[8px] font-mono px-1 py-0.1 rounded-full bg-[#181a22] text-[#e4c88a] border border-[#c5a059]/50 font-bold">
                  {tool.badge}
                </span>
              )}

              {/* Framer/Spline Tooltip on Hover */}
              <div className="absolute left-14 px-2.5 py-1.5 rounded-lg bg-[#181b24] text-white text-xs font-sans whitespace-nowrap shadow-xl border border-[#2b303d] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50 flex items-center space-x-1.5">
                <span>{tool.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
