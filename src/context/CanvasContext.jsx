import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CURATED_IMAGES } from '../data/assetsLibrary';
import { VECTOR_SHAPES, WEBSITE_GRIDS } from '../data/shapesAndGrids';
import { ELEMENTOR_CONTAINER_GRIDS, STANDARD_SECTION_SIZES } from '../data/elementorGrids';
import { MOCKUP_PRESETS } from '../data/mockupsData';
import { EXPANDED_FONTS, loadGoogleFont } from '../data/expandedFonts';
import { CANVA_LINES } from '../data/canvaLinesAndFlourishes';
import { PREMADE_CANVAS_TEMPLATES } from '../data/premadeCanvasTemplates';
import { SHAPE_FRAMES } from '../data/shapeFrames';

const STORAGE_KEY = 'lumina_freeform_canvas_v5';

const CanvasContext = createContext(null);

export const CanvasProvider = ({ children }) => {
  const [pan, setPan] = useState({ x: 80, y: 60 });
  const [zoom, setZoom] = useState(0.85);
  const [activeTool, setActiveTool] = useState('select'); // 'select' | 'hand'

  const [canvasBg, setCanvasBg] = useState({
    type: 'gradient',
    solidColor: '#0c0d0e',
    gradient: {
      from: '#121418',
      to: '#08080a',
      angle: 135
    }
  });

  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 1440,
    height: 960
  });

  const [elements, setElements] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.elements && parsed.elements.length > 0) {
          return parsed.elements;
        }
      }
    } catch (e) {
      console.warn('Could not read saved canvas:', e);
    }

    return [
      {
        id: 'elem-bg-panel',
        type: 'shape',
        shapeType: 'rectangle',
        x: 60,
        y: 60,
        width: 1320,
        height: 840,
        opacity: 100,
        zIndex: 1,
        bgType: 'gradient',
        bgGradient: { from: '#15171d', to: '#0d0e12', angle: 145 },
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#2b303d'
      },
      {
        id: 'elem-hero-img',
        type: 'image',
        x: 760,
        y: 120,
        width: 560,
        height: 720,
        opacity: 100,
        zIndex: 2,
        imageUrl: CURATED_IMAGES[0].url,
        imageAlt: 'Editorial Portrait',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#373d4c',
        objectFit: 'cover'
      },
      {
        id: 'elem-badge',
        type: 'shape',
        shapeType: 'pill',
        x: 120,
        y: 140,
        width: 200,
        height: 38,
        opacity: 100,
        zIndex: 3,
        bgType: 'solid',
        bgColor: '#1c1811',
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#c5a059'
      },
      {
        id: 'elem-badge-text',
        type: 'text',
        x: 135,
        y: 148,
        width: 170,
        height: 24,
        opacity: 100,
        zIndex: 4,
        text: 'EDITION 2026 / VOL. IV',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 11,
        fontWeight: '500',
        textColor: '#c5a059',
        textAlign: 'center',
        letterSpacing: '0.15em'
      },
      {
        id: 'elem-title',
        type: 'text',
        x: 120,
        y: 210,
        width: 600,
        height: 180,
        opacity: 100,
        zIndex: 3,
        text: 'Poetry in Form & Solitude',
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 70,
        fontWeight: '300',
        textColor: '#f5f2eb',
        textAlign: 'left',
        letterSpacing: '-0.02em'
      }
    ];
  });

  const [selectedElementId, setSelectedElementId] = useState(null);
  const [lastSavedTime, setLastSavedTime] = useState(null);

  // Auto-save
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        elements,
        canvasBg,
        canvasDimensions,
        zoom,
        pan
      }));
      setLastSavedTime(new Date().toLocaleTimeString());
    } catch (e) {
      console.warn('Auto-save error:', e);
    }
  }, [elements, canvasBg, canvasDimensions, zoom, pan]);

  const selectedElement = elements.find(el => el.id === selectedElementId) || null;

  // Add Device Mockup (MacBook, iPhone, iPad, Browser)
  const addMockupElement = (mockupPreset) => {
    const preset = mockupPreset || MOCKUP_PRESETS[0];
    const newEl = {
      id: `mockup-${Date.now()}`,
      type: 'mockup',
      mockupType: preset.mockupType,
      name: preset.name,
      x: 180 - pan.x * 0.15,
      y: 140 - pan.y * 0.15,
      width: preset.width || 800,
      height: preset.height || 500,
      opacity: 100,
      zIndex: elements.length + 1,
      deviceColor: preset.deviceColor || '#14161c',
      borderColor: preset.borderColor || '#2b303e',
      screenImage: preset.defaultScreenImage || CURATED_IMAGES[0].url,
      browserUrl: 'https://maisondor-atelier.com'
    };
    setElements(prev => [...prev, newEl]);
    setSelectedElementId(newEl.id);
  };

  // Update Mockup Screen Image
  const updateMockupScreen = (id, imageUrl) => {
    setElements(prev =>
      prev.map(el => (el.id === id ? { ...el, screenImage: imageUrl } : el))
    );
  };

  // Add Elementor Style Flexbox Containers
  const addElementorGrid = (gridPreset) => {
    const originX = Math.max(60, 200 - pan.x * 0.2);
    const originY = Math.max(60, 180 - pan.y * 0.2);
    const totalW = gridPreset.width || 1200;
    const totalH = gridPreset.height || 480;
    const gap = 20;
    const ratios = gridPreset.ratios || [1];

    const availableW = totalW - gap * (ratios.length - 1);
    let currentX = originX;

    const newContainers = ratios.map((ratio, idx) => {
      const colW = Math.round(availableW * ratio);
      const container = {
        id: `el-container-${Date.now()}-${idx}`,
        type: 'shape',
        shapeType: 'rectangle',
        x: currentX,
        y: originY,
        width: colW,
        height: totalH,
        opacity: 100,
        zIndex: elements.length + idx + 1,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#292d3a'
      };
      currentX += colW + gap;
      return container;
    });

    setElements(prev => [...prev, ...newContainers]);
    if (newContainers[0]) setSelectedElementId(newContainers[0].id);
  };

  // Scale Element by factor
  const scaleElement = (id, factor) => {
    setElements(prev =>
      prev.map(el => {
        if (el.id === id) {
          const newW = Math.max(30, Math.round(el.width * factor));
          const newH = Math.max(15, Math.round(el.height * factor));
          const updates = { width: newW, height: newH };
          if (el.type === 'text' && el.fontSize) {
            updates.fontSize = Math.max(10, Math.round(el.fontSize * factor));
          }
          return { ...el, ...updates };
        }
        return el;
      })
    );
  };

  // Set Element Standard Web Dimension
  const setElementStandardSize = (id, width, height) => {
    setElements(prev =>
      prev.map(el => (el.id === id ? { ...el, width, height } : el))
    );
  };

  // Add Text Element
  const addTextElement = (fontFamily = '"Cormorant Garamond", serif', customText = 'Editorial Heading') => {
    loadGoogleFont(fontFamily);
    const newEl = {
      id: `text-${Date.now()}`,
      type: 'text',
      x: 200 - pan.x * 0.15,
      y: 200 - pan.y * 0.15,
      width: 440,
      height: 90,
      opacity: 100,
      zIndex: elements.length + 1,
      text: customText,
      fontFamily: fontFamily,
      fontSize: 44,
      fontWeight: '300',
      textColor: '#f5f2eb',
      textAlign: 'left',
      letterSpacing: '0em'
    };
    setElements(prev => [...prev, newEl]);
    setSelectedElementId(newEl.id);
  };

  // Add Vector Shape
  const addVectorShape = (shapeDef) => {
    const shape = shapeDef || VECTOR_SHAPES[0];
    const newEl = {
      id: `shape-${Date.now()}`,
      type: 'vector',
      shapeId: shape.id,
      shapeName: shape.name,
      svgPath: shape.path,
      x: 240 - pan.x * 0.15,
      y: 200 - pan.y * 0.15,
      width: shape.width || 140,
      height: shape.height || 140,
      opacity: 100,
      zIndex: elements.length + 1,
      bgType: 'solid',
      bgColor: '#c5a059',
      bgGradient: { from: '#e4c88a', to: '#96793f', angle: 135 },
      strokeColor: '#2b303d',
      strokeWidth: 0
    };
    setElements(prev => [...prev, newEl]);
    setSelectedElementId(newEl.id);
  };

  // Add Website Wireframe Grid
  const addWebsiteGrid = (gridDef) => {
    const grid = gridDef || WEBSITE_GRIDS[0];
    const originX = Math.max(60, 200 - pan.x * 0.2);
    const originY = Math.max(60, 160 - pan.y * 0.2);

    const createdElements = grid.subElements.map((sub, idx) => ({
      id: `grid-${grid.id}-${Date.now()}-${idx}`,
      ...sub,
      x: originX + sub.relX,
      y: originY + sub.relY,
      zIndex: elements.length + idx + 1,
      opacity: 100
    }));

    setElements(prev => [...prev, ...createdElements]);
    if (createdElements[0]) setSelectedElementId(createdElements[0].id);
  };

  // Add Image Element
  const addImageElement = (imageUrl, title = 'Editorial Asset') => {
    const newEl = {
      id: `img-${Date.now()}`,
      type: 'image',
      x: 260 - pan.x * 0.15,
      y: 180 - pan.y * 0.15,
      width: 380,
      height: 500,
      opacity: 100,
      zIndex: elements.length + 1,
      imageUrl: imageUrl,
      imageAlt: title,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: '#2b303d',
      objectFit: 'cover'
    };
    setElements(prev => [...prev, newEl]);
    setSelectedElementId(newEl.id);
  };

  // Add Canva-Style Shape Frame / Masked Image Mockup
  const addShapeFrame = (frameDef) => {
    const frame = frameDef || SHAPE_FRAMES[0];
    const newEl = {
      id: `frame-${Date.now()}`,
      type: 'vector',
      isShapeFrame: true,
      shapeId: frame.id,
      shapeName: frame.name,
      svgPath: frame.path,
      viewBox: frame.viewBox || '0 0 100 100',
      x: 240 - pan.x * 0.15,
      y: 180 - pan.y * 0.15,
      width: frame.defaultWidth || 280,
      height: frame.defaultHeight || 360,
      opacity: 100,
      zIndex: elements.length + 1,
      bgType: 'image', // Pre-configured as image mask
      imageUrl: frame.defaultImage || CURATED_IMAGES[0].url,
      objectFit: 'cover',
      strokeColor: frame.strokeColor || '#c5a059',
      strokeWidth: frame.strokeWidth || 2,
      rotation: 0
    };
    setElements(prev => [...prev, newEl]);
    setSelectedElementId(newEl.id);
  };

  // Update Shape Image Fill
  const updateShapeImage = (id, imageUrl) => {
    setElements(prev =>
      prev.map(el => (el.id === id ? { ...el, bgType: 'image', imageUrl } : el))
    );
  };

  // Update element properties
  const updateElement = (id, updates) => {
    setElements(prev =>
      prev.map(el => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  // Resize element directly with minimum boundaries
  const resizeElement = (id, newWidth, newHeight, newX, newY) => {
    setElements(prev =>
      prev.map(el => {
        if (el.id !== id) return el;
        const updates = {
          width: Math.max(30, Math.round(newWidth)),
          height: Math.max(20, Math.round(newHeight))
        };
        if (newX !== undefined) updates.x = Math.round(newX);
        if (newY !== undefined) updates.y = Math.round(newY);
        return { ...el, ...updates };
      })
    );
  };

  // Remove element
  const removeElement = useCallback((id) => {
    setElements(prev => prev.filter(el => el.id !== id));
    setSelectedElementId(prev => (prev === id ? null : prev));
  }, []);

  // Duplicate element
  const duplicateElement = useCallback((id) => {
    setElements(prev => {
      const target = prev.find(el => el.id === id);
      if (!target) return prev;
      const cloned = {
        ...target,
        id: `${target.type}-${Date.now()}`,
        x: target.x + 30,
        y: target.y + 30,
        zIndex: prev.length + 1
      };
      return [...prev, cloned];
    });
  }, []);

  // Helper to keep sequential zIndex strictly matching array order
  const reindexElements = (arr) => arr.map((item, idx) => ({ ...item, zIndex: idx + 1 }));

  // Reorder z-index: up (+1 layer forward) or down (-1 layer backward)
  const changeZIndex = (id, direction) => {
    setElements(prev => {
      const index = prev.findIndex(el => el.id === id);
      if (index === -1) return prev;
      if (direction === 'up' && index === prev.length - 1) return prev;
      if (direction === 'down' && index === 0) return prev;

      const targetIndex = direction === 'up' ? index + 1 : index - 1;
      const updated = [...prev];
      const [moved] = updated.splice(index, 1);
      updated.splice(targetIndex, 0, moved);
      return reindexElements(updated);
    });
  };

  // Bring element to front (top of all layers)
  const bringToFront = (id) => {
    setElements(prev => {
      const index = prev.findIndex(el => el.id === id);
      if (index === -1) return prev;
      const updated = [...prev];
      const [moved] = updated.splice(index, 1);
      updated.push(moved);
      return reindexElements(updated);
    });
  };

  // Send element to back (bottom of all layers)
  const sendToBack = (id) => {
    setElements(prev => {
      const index = prev.findIndex(el => el.id === id);
      if (index === -1) return prev;
      const updated = [...prev];
      const [moved] = updated.splice(index, 1);
      updated.unshift(moved);
      return reindexElements(updated);
    });
  };

  // Set explicit layer number (1 to N)
  const setElementZIndex = (id, newLayerNum) => {
    setElements(prev => {
      const index = prev.findIndex(el => el.id === id);
      if (index === -1) return prev;
      const targetIndex = Math.max(0, Math.min(prev.length - 1, newLayerNum - 1));
      const updated = [...prev];
      const [moved] = updated.splice(index, 1);
      updated.splice(targetIndex, 0, moved);
      return reindexElements(updated);
    });
  };

  // Move element directly above all images and shapes (perfect for text over media)
  const moveTextAboveImages = (id) => {
    bringToFront(id);
  };

  // Align element on canvas (Center H, Center V, Left, Right, Top, Bottom)
  const alignElement = (id, type) => {
    setElements(prev =>
      prev.map(el => {
        if (el.id !== id) return el;
        const cW = canvasDimensions.width;
        const cH = canvasDimensions.height;
        let newX = el.x;
        let newY = el.y;

        if (type === 'center-h') {
          newX = Math.round((cW - el.width) / 2);
        } else if (type === 'center-v') {
          newY = Math.round((cH - el.height) / 2);
        } else if (type === 'center-both') {
          newX = Math.round((cW - el.width) / 2);
          newY = Math.round((cH - el.height) / 2);
        } else if (type === 'left') {
          newX = 60;
        } else if (type === 'right') {
          newX = Math.max(60, cW - el.width - 60);
        } else if (type === 'top') {
          newY = 60;
        } else if (type === 'bottom') {
          newY = Math.max(60, cH - el.height - 60);
        }
        return { ...el, x: newX, y: newY };
      })
    );
  };

  // Convert any screenshot / image into an exact, editable luxury wireframe
  const convertScreenshotToWireframe = ({
    imagePreview,
    layoutType = 'full-page',
    keepBackdrop = true,
    backdropOpacity = 25,
    customWidth = 1440
  }) => {
    const ts = Date.now();
    loadGoogleFont('"Cormorant Garamond", serif');
    loadGoogleFont('"Inter", sans-serif');
    loadGoogleFont('"JetBrains Mono", monospace');

    let newElements = [];
    const canvasW = customWidth || 1440;
    let canvasH = 1950;

    if (layoutType === 'full-page') {
      canvasH = 1950;
      setCanvasDimensions({ width: canvasW, height: canvasH });

      // Optional faint screenshot backdrop at the very bottom layer
      if (keepBackdrop && imagePreview) {
        newElements.push({
          id: `wf-backdrop-${ts}`,
          type: 'image',
          x: 40,
          y: 40,
          width: 1360,
          height: 1870,
          opacity: backdropOpacity,
          zIndex: 1,
          imageUrl: imagePreview,
          imageAlt: 'Original Screenshot Guide',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#c5a059',
          objectFit: 'contain'
        });
      }

      // 1. Navigation Bar
      newElements.push(
        {
          id: `wf-nav-box-${ts}`,
          type: 'shape',
          shapeType: 'rectangle',
          x: 40,
          y: 40,
          width: 1360,
          height: 72,
          opacity: 96,
          zIndex: 2,
          bgType: 'solid',
          bgColor: '#111318',
          borderRadius: 14,
          borderWidth: 1,
          borderColor: '#292f3d'
        },
        {
          id: `wf-nav-logo-${ts}`,
          type: 'text',
          x: 70,
          y: 62,
          width: 240,
          height: 30,
          opacity: 100,
          zIndex: 3,
          text: 'ATELIER V',
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 22,
          fontWeight: '700',
          textColor: '#f5f2eb',
          letterSpacing: '0.12em'
        },
        {
          id: `wf-nav-links-${ts}`,
          type: 'text',
          x: 430,
          y: 66,
          width: 540,
          height: 24,
          opacity: 100,
          zIndex: 3,
          text: 'COLLECTION      RESIDENCES      DISCIPLINES      PHILOSOPHY',
          fontFamily: '"Inter", sans-serif',
          fontSize: 12,
          fontWeight: '500',
          textColor: '#a3abb8',
          letterSpacing: '0.14em',
          textAlign: 'center'
        },
        {
          id: `wf-nav-btn-${ts}`,
          type: 'shape',
          shapeType: 'pill',
          x: 1210,
          y: 54,
          width: 160,
          height: 44,
          opacity: 100,
          zIndex: 3,
          bgType: 'solid',
          bgColor: '#c5a059',
          borderRadius: 9999,
          borderWidth: 1,
          borderColor: '#e2be72'
        },
        {
          id: `wf-nav-btntxt-${ts}`,
          type: 'text',
          x: 1220,
          y: 67,
          width: 140,
          height: 20,
          opacity: 100,
          zIndex: 4,
          text: 'INQUIRE ACCESS',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          fontWeight: '700',
          textColor: '#0d0f14',
          textAlign: 'center',
          letterSpacing: '0.08em'
        }
      );

      // 2. Hero Section
      newElements.push(
        {
          id: `wf-hero-box-${ts}`,
          type: 'shape',
          shapeType: 'rectangle',
          x: 40,
          y: 130,
          width: 1360,
          height: 600,
          opacity: 92,
          zIndex: 2,
          bgType: 'gradient',
          bgGradient: { from: '#151720', to: '#0e1017', angle: 145 },
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#292f3d'
        },
        {
          id: `wf-hero-badge-${ts}`,
          type: 'shape',
          shapeType: 'pill',
          x: 90,
          y: 175,
          width: 240,
          height: 36,
          opacity: 100,
          zIndex: 3,
          bgType: 'solid',
          bgColor: '#1d1912',
          borderRadius: 9999,
          borderWidth: 1,
          borderColor: '#c5a059'
        },
        {
          id: `wf-hero-badgetxt-${ts}`,
          type: 'text',
          x: 105,
          y: 184,
          width: 210,
          height: 20,
          opacity: 100,
          zIndex: 4,
          text: 'COLLECTION 2026 / VOL. 1',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          fontWeight: '600',
          textColor: '#c5a059',
          textAlign: 'center',
          letterSpacing: '0.12em'
        },
        {
          id: `wf-hero-headline-${ts}`,
          type: 'text',
          x: 90,
          y: 235,
          width: 610,
          height: 160,
          opacity: 100,
          zIndex: 3,
          text: 'Architectural Silence & Sculptural Proportion',
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 54,
          fontWeight: '300',
          textColor: '#ffffff',
          letterSpacing: '-0.02em',
          textAlign: 'left'
        },
        {
          id: `wf-hero-sub-${ts}`,
          type: 'text',
          x: 90,
          y: 410,
          width: 580,
          height: 80,
          opacity: 100,
          zIndex: 3,
          text: 'Bespoke residences shaped with natural limestone, monolithic precision, and light choreography for uncompromising modern collectors.',
          fontFamily: '"Inter", sans-serif',
          fontSize: 15,
          fontWeight: '400',
          textColor: '#9fa6b6',
          textAlign: 'left'
        },
        {
          id: `wf-hero-btn1-${ts}`,
          type: 'shape',
          shapeType: 'pill',
          x: 90,
          y: 505,
          width: 210,
          height: 48,
          opacity: 100,
          zIndex: 3,
          bgType: 'solid',
          bgColor: '#c5a059',
          borderRadius: 9999,
          borderWidth: 1,
          borderColor: '#e2be72'
        },
        {
          id: `wf-hero-btn1txt-${ts}`,
          type: 'text',
          x: 105,
          y: 520,
          width: 180,
          height: 20,
          opacity: 100,
          zIndex: 4,
          text: 'EXPLORE PORTFOLIO',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12,
          fontWeight: '700',
          textColor: '#0b0c10',
          textAlign: 'center',
          letterSpacing: '0.09em'
        },
        {
          id: `wf-hero-btn2-${ts}`,
          type: 'shape',
          shapeType: 'pill',
          x: 320,
          y: 505,
          width: 180,
          height: 48,
          opacity: 100,
          zIndex: 3,
          bgType: 'solid',
          bgColor: '#171922',
          borderRadius: 9999,
          borderWidth: 1,
          borderColor: '#373f52'
        },
        {
          id: `wf-hero-btn2txt-${ts}`,
          type: 'text',
          x: 335,
          y: 520,
          width: 150,
          height: 20,
          opacity: 100,
          zIndex: 4,
          text: 'VIEW ATELIER FILM',
          fontFamily: '"Inter", sans-serif',
          fontSize: 12,
          fontWeight: '600',
          textColor: '#dce0e8',
          textAlign: 'center',
          letterSpacing: '0.06em'
        },
        {
          id: `wf-hero-media-${ts}`,
          type: 'image',
          x: 740,
          y: 175,
          width: 615,
          height: 515,
          opacity: 100,
          zIndex: 3,
          imageUrl: CURATED_IMAGES[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          imageAlt: 'Architecture Visual Showcase',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#353c4d',
          objectFit: 'cover'
        }
      );

      // 3. Metrics Strip
      newElements.push(
        {
          id: `wf-metrics-box-${ts}`,
          type: 'shape',
          shapeType: 'rectangle',
          x: 40,
          y: 750,
          width: 1360,
          height: 105,
          opacity: 96,
          zIndex: 2,
          bgType: 'solid',
          bgColor: '#101217',
          borderRadius: 14,
          borderWidth: 1,
          borderColor: '#262b37'
        },
        {
          id: `wf-stat1-val-${ts}`,
          type: 'text',
          x: 80,
          y: 768,
          width: 250,
          height: 36,
          opacity: 100,
          zIndex: 3,
          text: '$4.8 Billion',
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 28,
          fontWeight: '600',
          textColor: '#c5a059',
          textAlign: 'center'
        },
        {
          id: `wf-stat1-lbl-${ts}`,
          type: 'text',
          x: 80,
          y: 810,
          width: 250,
          height: 20,
          opacity: 100,
          zIndex: 3,
          text: 'PORTFOLIO VALUE COMPLETED',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          fontWeight: '500',
          textColor: '#838b9c',
          textAlign: 'center',
          letterSpacing: '0.1em'
        },
        {
          id: `wf-stat2-val-${ts}`,
          type: 'text',
          x: 410,
          y: 768,
          width: 250,
          height: 36,
          opacity: 100,
          zIndex: 3,
          text: '99.4%',
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 28,
          fontWeight: '600',
          textColor: '#ffffff',
          textAlign: 'center'
        },
        {
          id: `wf-stat2-lbl-${ts}`,
          type: 'text',
          x: 410,
          y: 810,
          width: 250,
          height: 20,
          opacity: 100,
          zIndex: 3,
          text: 'RETENTION & REFERRAL RATE',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          fontWeight: '500',
          textColor: '#838b9c',
          textAlign: 'center',
          letterSpacing: '0.1em'
        },
        {
          id: `wf-stat3-val-${ts}`,
          type: 'text',
          x: 740,
          y: 768,
          width: 250,
          height: 36,
          opacity: 100,
          zIndex: 3,
          text: '16 Honors',
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 28,
          fontWeight: '600',
          textColor: '#c5a059',
          textAlign: 'center'
        },
        {
          id: `wf-stat3-lbl-${ts}`,
          type: 'text',
          x: 740,
          y: 810,
          width: 250,
          height: 20,
          opacity: 100,
          zIndex: 3,
          text: 'GLOBAL BIENNALE AWARDS',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          fontWeight: '500',
          textColor: '#838b9c',
          textAlign: 'center',
          letterSpacing: '0.1em'
        },
        {
          id: `wf-stat4-val-${ts}`,
          type: 'text',
          x: 1070,
          y: 768,
          width: 250,
          height: 36,
          opacity: 100,
          zIndex: 3,
          text: '34 Cities',
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 28,
          fontWeight: '600',
          textColor: '#ffffff',
          textAlign: 'center'
        },
        {
          id: `wf-stat4-lbl-${ts}`,
          type: 'text',
          x: 1070,
          y: 810,
          width: 250,
          height: 20,
          opacity: 100,
          zIndex: 3,
          text: 'INTERNATIONAL FOOTPRINT',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          fontWeight: '500',
          textColor: '#838b9c',
          textAlign: 'center',
          letterSpacing: '0.1em'
        }
      );

      // 4. Bento Feature Cards Section
      newElements.push(
        {
          id: `wf-bento-title-${ts}`,
          type: 'text',
          x: 40,
          y: 890,
          width: 1360,
          height: 48,
          opacity: 100,
          zIndex: 3,
          text: 'Disciplines of Inherent Significance',
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 34,
          fontWeight: '300',
          textColor: '#ffffff',
          textAlign: 'center',
          letterSpacing: '0.04em'
        },
        {
          id: `wf-bento-sub-${ts}`,
          type: 'text',
          x: 350,
          y: 940,
          width: 740,
          height: 24,
          opacity: 100,
          zIndex: 3,
          text: 'EXPLORE OUR THREE CORE ARCHITECTURAL PILLARS',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          fontWeight: '500',
          textColor: '#c5a059',
          textAlign: 'center',
          letterSpacing: '0.16em'
        }
      );

      // Bento 3 Cards
      const cardConfigs = [
        {
          x: 40,
          img: CURATED_IMAGES[1]?.url || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
          num: '01',
          title: 'Monolithic Geometry',
          desc: 'High-density natural stone and textured cast concrete engineered for thermal stability and acoustic tranquility.'
        },
        {
          x: 505,
          img: CURATED_IMAGES[2]?.url || 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
          num: '02',
          title: 'Choreographed Daylight',
          desc: 'Precision astronomical solar orientation creating dynamic shadow sculptures and serene illuminated galleries.'
        },
        {
          x: 970,
          img: CURATED_IMAGES[3]?.url || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
          num: '03',
          title: 'Private Sanctuaries',
          desc: 'Integrated private courtyards connecting personal wellness suites with water installations and indigenous gardens.'
        }
      ];

      cardConfigs.forEach((c, idx) => {
        newElements.push(
          {
            id: `wf-card-bg-${ts}-${idx}`,
            type: 'shape',
            shapeType: 'rectangle',
            x: c.x,
            y: 990,
            width: 430,
            height: 480,
            opacity: 95,
            zIndex: 2,
            bgType: 'solid',
            bgColor: '#13151c',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#292e3c'
          },
          {
            id: `wf-card-img-${ts}-${idx}`,
            type: 'image',
            x: c.x + 16,
            y: 1006,
            width: 398,
            height: 240,
            opacity: 100,
            zIndex: 3,
            imageUrl: c.img,
            imageAlt: c.title,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#373e4f',
            objectFit: 'cover'
          },
          {
            id: `wf-card-num-${ts}-${idx}`,
            type: 'text',
            x: c.x + 24,
            y: 1265,
            width: 382,
            height: 20,
            opacity: 100,
            zIndex: 3,
            text: `PILLAR ${c.num} //`,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            fontWeight: '600',
            textColor: '#c5a059',
            letterSpacing: '0.12em'
          },
          {
            id: `wf-card-title-${ts}-${idx}`,
            type: 'text',
            x: c.x + 24,
            y: 1292,
            width: 382,
            height: 36,
            opacity: 100,
            zIndex: 3,
            text: c.title,
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 24,
            fontWeight: '600',
            textColor: '#ffffff'
          },
          {
            id: `wf-card-desc-${ts}-${idx}`,
            type: 'text',
            x: c.x + 24,
            y: 1335,
            width: 382,
            height: 70,
            opacity: 100,
            zIndex: 3,
            text: c.desc,
            fontFamily: '"Inter", sans-serif',
            fontSize: 13,
            fontWeight: '400',
            textColor: '#9da4b4',
            lineHeight: 1.5
          },
          {
            id: `wf-card-link-${ts}-${idx}`,
            type: 'text',
            x: c.x + 24,
            y: 1420,
            width: 200,
            height: 20,
            opacity: 100,
            zIndex: 3,
            text: 'DISCOVER DETAILS →',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            fontWeight: '700',
            textColor: '#c5a059',
            letterSpacing: '0.08em'
          }
        );
      });

      // 5. Footer Section
      newElements.push(
        {
          id: `wf-footer-box-${ts}`,
          type: 'shape',
          shapeType: 'rectangle',
          x: 40,
          y: 1510,
          width: 1360,
          height: 180,
          opacity: 98,
          zIndex: 2,
          bgType: 'solid',
          bgColor: '#0f1015',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#222630'
        },
        {
          id: `wf-footer-brand-${ts}`,
          type: 'text',
          x: 80,
          y: 1550,
          width: 300,
          height: 36,
          opacity: 100,
          zIndex: 3,
          text: 'ATELIER V ARCHITECTURE',
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 22,
          fontWeight: '700',
          textColor: '#f5ecd5',
          letterSpacing: '0.12em'
        },
        {
          id: `wf-footer-sub-${ts}`,
          type: 'text',
          x: 80,
          y: 1590,
          width: 400,
          height: 24,
          opacity: 100,
          zIndex: 3,
          text: 'ZÜRICH • MILANO • TOKYO • NEW YORK',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          fontWeight: '500',
          textColor: '#767f92',
          letterSpacing: '0.14em'
        },
        {
          id: `wf-footer-links-${ts}`,
          type: 'text',
          x: 800,
          y: 1555,
          width: 550,
          height: 24,
          opacity: 100,
          zIndex: 3,
          text: 'PORTFOLIO    MONOGRAPHS    EXHIBITIONS    LEGAL / PRIVACY',
          fontFamily: '"Inter", sans-serif',
          fontSize: 12,
          fontWeight: '500',
          textColor: '#9ba2b3',
          letterSpacing: '0.1em',
          textAlign: 'right'
        },
        {
          id: `wf-footer-copy-${ts}`,
          type: 'text',
          x: 800,
          y: 1600,
          width: 550,
          height: 24,
          opacity: 100,
          zIndex: 3,
          text: '© 2026 ATELIER V. RECONSTRUCTED EDITABLE WIREFRAME.',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          fontWeight: '400',
          textColor: '#575f70',
          letterSpacing: '0.08em',
          textAlign: 'right'
        }
      );
    } else if (layoutType === 'split-hero') {
      canvasH = 1100;
      setCanvasDimensions({ width: canvasW, height: canvasH });

      if (keepBackdrop && imagePreview) {
        newElements.push({
          id: `wf-backdrop-${ts}`,
          type: 'image',
          x: 40,
          y: 40,
          width: 1360,
          height: 1020,
          opacity: backdropOpacity,
          zIndex: 1,
          imageUrl: imagePreview,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#c5a059',
          objectFit: 'contain'
        });
      }

      // Split 50/50: Navbar + Left Column + Right Column
      newElements.push(
        {
          id: `wf-nav-box-${ts}`,
          type: 'shape',
          shapeType: 'rectangle',
          x: 40,
          y: 40,
          width: 1360,
          height: 72,
          opacity: 96,
          zIndex: 2,
          bgType: 'solid',
          bgColor: '#111318',
          borderRadius: 14,
          borderWidth: 1,
          borderColor: '#292f3d'
        },
        {
          id: `wf-nav-logo-${ts}`,
          type: 'text',
          x: 70,
          y: 62,
          width: 240,
          height: 30,
          opacity: 100,
          zIndex: 3,
          text: 'STUDIO NOIR',
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 22,
          fontWeight: '700',
          textColor: '#f5f2eb',
          letterSpacing: '0.12em'
        },
        {
          id: `wf-nav-btn-${ts}`,
          type: 'shape',
          shapeType: 'pill',
          x: 1210,
          y: 54,
          width: 160,
          height: 44,
          opacity: 100,
          zIndex: 3,
          bgType: 'solid',
          bgColor: '#c5a059',
          borderRadius: 9999
        },
        {
          id: `wf-nav-btntxt-${ts}`,
          type: 'text',
          x: 1220,
          y: 67,
          width: 140,
          height: 20,
          opacity: 100,
          zIndex: 4,
          text: 'GET IN TOUCH',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          fontWeight: '700',
          textColor: '#0d0f14',
          textAlign: 'center'
        },
        {
          id: `wf-split-left-${ts}`,
          type: 'shape',
          shapeType: 'rectangle',
          x: 40,
          y: 130,
          width: 665,
          height: 760,
          opacity: 94,
          zIndex: 2,
          bgType: 'solid',
          bgColor: '#13151c',
          borderRadius: 18,
          borderWidth: 1,
          borderColor: '#292f3d'
        },
        {
          id: `wf-split-badge-${ts}`,
          type: 'text',
          x: 80,
          y: 180,
          width: 300,
          height: 24,
          opacity: 100,
          zIndex: 3,
          text: 'ARCHITECTURAL RESIDENCES // 2026',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          fontWeight: '600',
          textColor: '#c5a059',
          letterSpacing: '0.12em'
        },
        {
          id: `wf-split-title-${ts}`,
          type: 'text',
          x: 80,
          y: 220,
          width: 580,
          height: 200,
          opacity: 100,
          zIndex: 3,
          text: 'Harmonizing Structure & Light',
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 60,
          fontWeight: '300',
          textColor: '#ffffff',
          lineHeight: 1.15
        },
        {
          id: `wf-split-sub-${ts}`,
          type: 'text',
          x: 80,
          y: 430,
          width: 560,
          height: 100,
          opacity: 100,
          zIndex: 3,
          text: 'We construct sanctuaries that blur boundaries between interior serenity and nature, combining natural cedar, raw poured concrete, and hand-cut quartzite.',
          fontFamily: '"Inter", sans-serif',
          fontSize: 16,
          fontWeight: '400',
          textColor: '#9da4b4',
          lineHeight: 1.6
        },
        {
          id: `wf-split-btn1-${ts}`,
          type: 'shape',
          shapeType: 'pill',
          x: 80,
          y: 560,
          width: 220,
          height: 50,
          opacity: 100,
          zIndex: 3,
          bgType: 'solid',
          bgColor: '#c5a059',
          borderRadius: 9999
        },
        {
          id: `wf-split-btn1txt-${ts}`,
          type: 'text',
          x: 95,
          y: 575,
          width: 190,
          height: 22,
          opacity: 100,
          zIndex: 4,
          text: 'VIEW CASE STUDIES',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12,
          fontWeight: '700',
          textColor: '#0c0d12',
          textAlign: 'center'
        },
        {
          id: `wf-split-right-${ts}`,
          type: 'image',
          x: 725,
          y: 130,
          width: 675,
          height: 760,
          opacity: 100,
          zIndex: 3,
          imageUrl: CURATED_IMAGES[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          imageAlt: 'Architecture Split Showcase',
          borderRadius: 18,
          borderWidth: 1,
          borderColor: '#373f52',
          objectFit: 'cover'
        }
      );
    } else if (layoutType === 'bento-grid') {
      canvasH = 1200;
      setCanvasDimensions({ width: canvasW, height: canvasH });

      if (keepBackdrop && imagePreview) {
        newElements.push({
          id: `wf-backdrop-${ts}`,
          type: 'image',
          x: 40,
          y: 40,
          width: 1360,
          height: 1120,
          opacity: backdropOpacity,
          zIndex: 1,
          imageUrl: imagePreview,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#c5a059',
          objectFit: 'contain'
        });
      }

      newElements.push(
        {
          id: `wf-bento-hero-${ts}`,
          type: 'shape',
          shapeType: 'rectangle',
          x: 40,
          y: 40,
          width: 1360,
          height: 240,
          opacity: 96,
          zIndex: 2,
          bgType: 'gradient',
          bgGradient: { from: '#151822', to: '#0e1017', angle: 135 },
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#292f3d'
        },
        {
          id: `wf-bento-htitle-${ts}`,
          type: 'text',
          x: 80,
          y: 80,
          width: 800,
          height: 70,
          opacity: 100,
          zIndex: 3,
          text: 'Curated Bento Grid Architecture',
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 44,
          fontWeight: '300',
          textColor: '#ffffff'
        },
        {
          id: `wf-bento-hsub-${ts}`,
          type: 'text',
          x: 80,
          y: 155,
          width: 700,
          height: 30,
          opacity: 100,
          zIndex: 3,
          text: 'Modular, modern asymmetric content containers for high-impact visual storytelling.',
          fontFamily: '"Inter", sans-serif',
          fontSize: 15,
          fontWeight: '400',
          textColor: '#9da4b4'
        },
        {
          id: `wf-bcard-1-${ts}`,
          type: 'image',
          x: 40,
          y: 300,
          width: 665,
          height: 520,
          opacity: 100,
          zIndex: 3,
          imageUrl: CURATED_IMAGES[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#373f52',
          objectFit: 'cover'
        },
        {
          id: `wf-bcard-2-${ts}`,
          type: 'image',
          x: 725,
          y: 300,
          width: 675,
          height: 245,
          opacity: 100,
          zIndex: 3,
          imageUrl: CURATED_IMAGES[1]?.url || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#373f52',
          objectFit: 'cover'
        },
        {
          id: `wf-bcard-3-${ts}`,
          type: 'image',
          x: 725,
          y: 565,
          width: 675,
          height: 255,
          opacity: 100,
          zIndex: 3,
          imageUrl: CURATED_IMAGES[2]?.url || 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#373f52',
          objectFit: 'cover'
        }
      );
    }

    setElements(newElements);
    if (newElements.length > 0) {
      setSelectedElementId(newElements[1]?.id || newElements[0].id);
    }
    setPan({ x: 30, y: 30 });
    setZoom(0.68);
  };

  // Reconstruct exact wireframe grid from uploaded screenshot (container mode)
  const buildWireframeFromScreenshot = ({ preset, size, ratios, imagePreview, keepBackdrop = false, layoutType = 'full-page' }) => {
    // If layoutType is full-page or split or bento, delegate to convertScreenshotToWireframe
    if (layoutType && layoutType !== 'simple-containers') {
      convertScreenshotToWireframe({
        imagePreview,
        layoutType,
        keepBackdrop,
        backdropOpacity: 25,
        customWidth: size?.width || 1440
      });
      return;
    }

    const originX = Math.max(60, 200 - pan.x * 0.2);
    const originY = Math.max(60, 180 - pan.y * 0.2);
    const totalW = size?.width || 1200;
    const totalH = size?.height || 500;
    const gap = 20;
    const colRatios = ratios || preset?.ratios || [0.5, 0.5];

    const availableW = totalW - gap * (colRatios.length - 1);
    let currentX = originX;
    const newBlocks = [];

    if (keepBackdrop && imagePreview) {
      newBlocks.push({
        id: `screenshot-backdrop-${Date.now()}`,
        type: 'image',
        x: originX,
        y: originY,
        width: totalW,
        height: totalH,
        opacity: 35,
        zIndex: elements.length + 1,
        imageUrl: imagePreview,
        imageAlt: 'Screenshot Reference',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#c5a059',
        objectFit: 'contain'
      });
    }

    colRatios.forEach((ratio, idx) => {
      const colW = Math.round(availableW * ratio);
      newBlocks.push({
        id: `wireframe-col-${Date.now()}-${idx}`,
        type: 'shape',
        shapeType: 'rectangle',
        x: currentX,
        y: originY,
        width: colW,
        height: totalH,
        opacity: 100,
        zIndex: elements.length + idx + 2,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#2f3442'
      });
      currentX += colW + gap;
    });

    setElements(prev => [...prev, ...newBlocks]);
    if (newBlocks[0]) setSelectedElementId(newBlocks[0].id);
  };

  // Add Canva-Style Decorative Line or Flourish
  const addDecorativeLine = (linePreset) => {
    const preset = linePreset || CANVA_LINES[0];
    const newEl = {
      id: `line-${Date.now()}`,
      type: 'line',
      lineId: preset.id,
      name: preset.name,
      viewBox: preset.viewBox || '0 0 400 20',
      path: preset.path,
      x: 220 - pan.x * 0.15,
      y: 240 - pan.y * 0.15,
      width: preset.defaultWidth || 320,
      height: preset.defaultHeight || 30,
      opacity: 100,
      zIndex: elements.length + 1,
      strokeColor: '#ffffff', // Default white line like Canva
      strokeWidth: preset.strokeWidth || 2,
      strokeStyle: preset.strokeStyle || 'solid',
      strokeDasharray: preset.strokeDasharray || undefined,
      strokeLinecap: preset.strokeLinecap || 'round',
      rotation: 0
    };
    setElements(prev => [...prev, newEl]);
    setSelectedElementId(newEl.id);
  };

  // Load Premade Canvas Template (Instant Ready Design)
  const loadPremadeTemplate = (template) => {
    if (!template) return;
    if (template.canvasWidth && template.canvasHeight) {
      setCanvasDimensions({
        width: template.canvasWidth,
        height: template.canvasHeight
      });
    }
    if (template.canvasBg) {
      setCanvasBg(template.canvasBg);
    }

    const newElements = (template.elements || []).map((el, i) => {
      if (el.fontFamily) {
        loadGoogleFont(el.fontFamily);
      }
      return {
        ...el,
        id: `${el.id}-${Date.now()}-${i}`,
        rotation: el.rotation || 0
      };
    });

    setElements(newElements);
    if (newElements[0]) setSelectedElementId(newElements[0].id);
    setPan({ x: 80, y: 60 });
    setZoom(0.85);
  };

  // Rotate Element
  const rotateElement = (id, angle) => {
    const normalized = ((Math.round(angle) % 360) + 360) % 360;
    setElements(prev =>
      prev.map(el => (el.id === id ? { ...el, rotation: normalized } : el))
    );
  };

  // Clear Canvas (Blank Slate)
  const clearCanvas = () => {
    if (confirm('Clear canvas to start 100% from a blank page?')) {
      setElements([]);
      setSelectedElementId(null);
    }
  };

  return (
    <CanvasContext.Provider
      value={{
        pan,
        setPan,
        zoom,
        setZoom,
        activeTool,
        setActiveTool,
        canvasBg,
        setCanvasBg,
        canvasDimensions,
        setCanvasDimensions,
        elements,
        setElements,
        selectedElementId,
        setSelectedElementId,
        selectedElement,
        addMockupElement,
        updateMockupScreen,
        addElementorGrid,
        scaleElement,
        setElementStandardSize,
        addTextElement,
        addVectorShape,
        addWebsiteGrid,
        addImageElement,
        addShapeFrame,
        updateShapeImage,
        addDecorativeLine,
        loadPremadeTemplate,
        rotateElement,
        bringToFront,
        sendToBack,
        setElementZIndex,
        moveTextAboveImages,
        alignElement,
        convertScreenshotToWireframe,
        buildWireframeFromScreenshot,
        updateElement,
        resizeElement,
        removeElement,
        duplicateElement,
        changeZIndex,
        clearCanvas,
        lastSavedTime
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) throw new Error('useCanvas must be used within CanvasProvider');
  return context;
};
