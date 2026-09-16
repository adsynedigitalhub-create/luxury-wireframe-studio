import React, { useRef, useState, useEffect } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import {
  MousePointer,
  Hand,
  ZoomIn,
  ZoomOut,
  Maximize,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  RotateCw,
  Image as ImageIcon,
  AlignCenter,
  ChevronsUp,
  ChevronsDown,
  Upload
} from 'lucide-react';

export const FreeformCanvas = () => {
  const {
    pan,
    setPan,
    zoom,
    setZoom,
    activeTool,
    setActiveTool,
    canvasBg,
    canvasDimensions,
    elements,
    selectedElementId,
    setSelectedElementId,
    updateElement,
    removeElement,
    duplicateElement,
    changeZIndex,
    bringToFront,
    sendToBack,
    alignElement,
    scaleElement,
    rotateElement,
    updateMockupScreen
  } = useCanvas();

  const containerRef = useRef(null);
  const artboardRef = useRef(null);
  const fileInputRef = useRef(null);
  const [targetElementForUpload, setTargetElementForUpload] = useState(null);

  const triggerImageUpload = (elemId) => {
    setTargetElementForUpload(elemId);
    fileInputRef.current?.click();
  };

  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const [draggingElemId, setDraggingElemId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [resizingElem, setResizingElem] = useState(null);
  const [rotatingElem, setRotatingElem] = useState(null);

  // Pan Wheel
  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.08 : 0.92;
      setZoom((z) => Math.min(Math.max(z * factor, 0.2), 2.5));
    } else {
      setPan((p) => ({
        x: p.x - e.deltaX,
        y: p.y - e.deltaY
      }));
    }
  };

  const handleCanvasMouseDown = (e) => {
    if (e.button === 1 || activeTool === 'hand' || e.target === containerRef.current) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleElementMouseDown = (e, elem) => {
    e.stopPropagation();
    setSelectedElementId(elem.id);

    if (activeTool === 'hand') {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      return;
    }

    setDraggingElemId(elem.id);
    setDragOffset({
      x: e.clientX / zoom - elem.x,
      y: e.clientY / zoom - elem.y
    });
  };

  const handleResizeHandleMouseDown = (e, elem, direction) => {
    e.stopPropagation();
    setResizingElem({
      id: elem.id,
      direction,
      initX: elem.x,
      initY: elem.y,
      initW: elem.width,
      initH: elem.height,
      startMouseX: e.clientX,
      startMouseY: e.clientY
    });
  };

  const handleRotateHandleMouseDown = (e, elem) => {
    e.stopPropagation();
    setRotatingElem({
      id: elem.id,
      centerX: elem.x + elem.width / 2,
      centerY: elem.y + elem.height / 2,
      initRotation: elem.rotation || 0
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isPanning) {
        setPan({
          x: e.clientX - panStart.x,
          y: e.clientY - panStart.y
        });
      }

      if (draggingElemId) {
        const newX = Math.round(e.clientX / zoom - dragOffset.x);
        const newY = Math.round(e.clientY / zoom - dragOffset.y);
        updateElement(draggingElemId, { x: newX, y: newY });
      }

      if (resizingElem) {
        const deltaX = (e.clientX - resizingElem.startMouseX) / zoom;
        const deltaY = (e.clientY - resizingElem.startMouseY) / zoom;
        const dir = resizingElem.direction;

        let newW = resizingElem.initW;
        let newH = resizingElem.initH;
        let newX = resizingElem.initX;
        let newY = resizingElem.initY;

        if (dir.includes('e')) {
          newW = Math.max(30, Math.round(resizingElem.initW + deltaX));
        } else if (dir.includes('w')) {
          const possibleW = Math.max(30, Math.round(resizingElem.initW - deltaX));
          newX = Math.round(resizingElem.initX + (resizingElem.initW - possibleW));
          newW = possibleW;
        }

        if (dir.includes('s')) {
          newH = Math.max(15, Math.round(resizingElem.initH + deltaY));
        } else if (dir.includes('n')) {
          const possibleH = Math.max(15, Math.round(resizingElem.initH - deltaY));
          newY = Math.round(resizingElem.initY + (resizingElem.initH - possibleH));
          newH = possibleH;
        }

        updateElement(resizingElem.id, {
          x: newX,
          y: newY,
          width: newW,
          height: newH
        });
      }

      if (rotatingElem && artboardRef.current) {
        const rect = artboardRef.current.getBoundingClientRect();
        const elemScreenCenterX = rect.left + rotatingElem.centerX * zoom;
        const elemScreenCenterY = rect.top + rotatingElem.centerY * zoom;
        const dx = e.clientX - elemScreenCenterX;
        const dy = e.clientY - elemScreenCenterY;
        let deg = Math.round(Math.atan2(dy, dx) * (180 / Math.PI) + 90);
        const mod45 = ((deg % 45) + 45) % 45;
        if (mod45 < 3) deg -= mod45;
        else if (mod45 > 42) deg += (45 - mod45);
        const normalized = ((deg % 360) + 360) % 360;
        updateElement(rotatingElem.id, { rotation: normalized });
      }
    };

    const handleMouseUp = () => {
      setIsPanning(false);
      setDraggingElemId(null);
      setResizingElem(null);
      setRotatingElem(null);
    };

    const handleKeyDown = (e) => {
      // Don't intercept if user is typing inside text or input
      if (
        document.activeElement &&
        (document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'TEXTAREA' ||
          document.activeElement.isContentEditable)
      ) {
        return;
      }

      if (!selectedElementId) return;

      const step = e.shiftKey ? 10 : 1;
      const target = elements.find((el) => el.id === selectedElementId);
      if (!target) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        updateElement(selectedElementId, { x: target.x - step });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        updateElement(selectedElementId, { x: target.x + step });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        updateElement(selectedElementId, { y: target.y - step });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        updateElement(selectedElementId, { y: target.y + step });
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        removeElement(selectedElementId);
      } else if (e.ctrlKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        duplicateElement(selectedElementId);
      } else if (e.ctrlKey && e.shiftKey && (e.key === '}' || e.key === ']')) {
        e.preventDefault();
        bringToFront(selectedElementId);
      } else if (e.ctrlKey && e.shiftKey && (e.key === '{' || e.key === '[')) {
        e.preventDefault();
        sendToBack(selectedElementId);
      } else if (e.ctrlKey && e.key === ']') {
        e.preventDefault();
        changeZIndex(selectedElementId, 'up');
      } else if (e.ctrlKey && e.key === '[') {
        e.preventDefault();
        changeZIndex(selectedElementId, 'down');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isPanning, draggingElemId, dragOffset, resizingElem, rotatingElem, zoom, panStart, selectedElementId, elements]);

  const getCanvasBgStyle = () => {
    if (canvasBg.type === 'solid') {
      return { backgroundColor: canvasBg.solidColor || '#0c0d0e' };
    }
    const { from, to, angle } = canvasBg.gradient;
    return {
      background: `linear-gradient(${angle || 135}deg, ${from || '#121418'}, ${to || '#08080a'})`
    };
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleCanvasMouseDown}
      className={`relative w-full h-[calc(100vh-64px)] bg-[#090a0c] overflow-hidden canvas-grid-dots select-none ${
        activeTool === 'hand' || isPanning ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
      }`}
    >
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          transition: isPanning || draggingElemId || resizingElem ? 'none' : 'transform 0.05s ease-out'
        }}
        className="relative py-8"
      >
        {/* Master Freeform Canvas Artboard */}
        <div
          ref={artboardRef}
          onClick={(e) => {
            if (e.target === artboardRef.current) {
              setSelectedElementId(null);
            }
          }}
          style={{
            width: `${canvasDimensions.width}px`,
            minHeight: `${canvasDimensions.height}px`,
            ...getCanvasBgStyle()
          }}
          className="relative rounded-2xl shadow-artboard border border-[#262a34] overflow-hidden select-none transition-colors duration-150"
        >
          {elements.map((el) => {
            const isSelected = selectedElementId === el.id;

            let elemBgStyle = {};
            if (el.type === 'shape') {
              if (el.bgType === 'gradient' && el.bgGradient) {
                elemBgStyle.background = `linear-gradient(${el.bgGradient.angle || 135}deg, ${el.bgGradient.from}, ${el.bgGradient.to})`;
              } else {
                elemBgStyle.backgroundColor = el.bgColor || '#15171d';
              }
            }

            return (
              <div
                key={el.id}
                onMouseDown={(e) => handleElementMouseDown(e, el)}
                onDoubleClick={(e) => {
                  if (el.type === 'vector' || el.type === 'shape' || el.isShapeFrame || el.type === 'image') {
                    e.stopPropagation();
                    triggerImageUpload(el.id);
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const file = e.dataTransfer?.files?.[0];
                  if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                      updateElement(el.id, {
                        bgType: 'image',
                        imageUrl: evt.target.result,
                        ...(el.type === 'image' ? { imageUrl: evt.target.result } : {})
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                style={{
                  position: 'absolute',
                  left: `${el.x}px`,
                  top: `${el.y}px`,
                  width: `${el.width}px`,
                  height: `${el.height}px`,
                  opacity: (el.opacity ?? 100) / 100,
                  zIndex: isSelected ? 9999 : (el.zIndex || 1),
                  borderRadius: el.type === 'shape' ? `${el.borderRadius ?? 0}px` : undefined,
                  borderWidth: el.type === 'shape' ? `${el.borderWidth ?? 0}px` : undefined,
                  borderColor: el.borderColor || 'transparent',
                  borderStyle: el.borderWidth ? 'solid' : 'none',
                  transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
                  transformOrigin: 'center center',
                  ...elemBgStyle
                }}
                className={`group select-none ${
                  isSelected
                    ? 'ring-2 ring-[#c5a059] ring-offset-2 ring-offset-black/50 cursor-move'
                    : 'hover:ring-1 hover:ring-white/30 cursor-pointer'
                }`}
              >
                {/* 1. TEXT ELEMENT */}
                {el.type === 'text' && (
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateElement(el.id, { text: e.currentTarget.innerText })}
                    style={{
                      fontFamily: el.fontFamily || '"Cormorant Garamond", serif',
                      fontSize: `${el.fontSize || 36}px`,
                      fontWeight: el.fontWeight || '400',
                      color: el.textColor || '#f5f2eb',
                      textAlign: el.textAlign || 'left',
                      letterSpacing: el.letterSpacing || 'normal',
                      lineHeight: '1.15'
                    }}
                    className="w-full h-full p-1 cursor-text focus:outline-none"
                  >
                    {el.text}
                  </div>
                )}

                {/* 2. IMAGE ELEMENT */}
                {el.type === 'image' && (
                  <img
                    src={el.imageUrl}
                    alt={el.imageAlt || 'Editorial asset'}
                    style={{
                      borderRadius: `${el.borderRadius ?? 8}px`,
                      objectFit: el.objectFit || 'cover'
                    }}
                    className="w-full h-full pointer-events-none"
                  />
                )}

                {/* 3. RECTANGLE / CARD SHAPE */}
                {el.type === 'shape' && (
                  el.bgType === 'image' && el.imageUrl ? (
                    <img
                      src={el.imageUrl}
                      alt="Shape Mask"
                      style={{
                        borderRadius: el.borderRadius ? `${el.borderRadius}px` : undefined,
                        objectFit: el.objectFit || 'cover'
                      }}
                      className="w-full h-full pointer-events-none"
                    />
                  ) : (
                    <div className="w-full h-full pointer-events-none" />
                  )
                )}

                {/* 4. VECTOR SHAPE (Supports Vector Masks & Canva Shape Frames!) */}
                {el.type === 'vector' && (() => {
                  const vbParts = (el.viewBox || '0 0 100 100').trim().split(/\s+/).map(Number);
                  const vbX = isNaN(vbParts[0]) ? 0 : vbParts[0];
                  const vbY = isNaN(vbParts[1]) ? 0 : vbParts[1];
                  const vbW = isNaN(vbParts[2]) || vbParts[2] <= 0 ? 100 : vbParts[2];
                  const vbH = isNaN(vbParts[3]) || vbParts[3] <= 0 ? 100 : vbParts[3];

                  return (
                    <div className="w-full h-full relative overflow-hidden">
                      <svg
                        viewBox={el.viewBox || "0 0 100 100"}
                        preserveAspectRatio="none"
                        className="w-full h-full pointer-events-none drop-shadow-md overflow-hidden"
                      >
                        <defs>
                          <linearGradient
                            id={`grad-${el.id}`}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor={el.bgGradient?.from || '#e4c88a'} />
                            <stop offset="100%" stopColor={el.bgGradient?.to || '#96793f'} />
                          </linearGradient>
                          {el.bgType === 'image' && el.imageUrl && (
                            <clipPath id={`clip-${el.id}`}>
                              <path d={el.svgPath} />
                            </clipPath>
                          )}
                        </defs>

                        {el.bgType === 'image' && el.imageUrl ? (
                          <>
                            <image
                              href={el.imageUrl}
                              xlinkHref={el.imageUrl}
                              x={vbX}
                              y={vbY}
                              width={vbW}
                              height={vbH}
                              preserveAspectRatio={el.objectFit === 'contain' ? 'xMidYMid meet' : 'xMidYMid slice'}
                              clipPath={`url(#clip-${el.id})`}
                            />
                            {el.strokeWidth > 0 && (
                              <path
                                d={el.svgPath}
                                fill="none"
                                stroke={el.strokeColor || '#c5a059'}
                                strokeWidth={el.strokeWidth || 1}
                              />
                            )}
                          </>
                        ) : (
                          <path
                            d={el.svgPath}
                            fill={el.bgType === 'gradient' ? `url(#grad-${el.id})` : (el.bgColor || '#c5a059')}
                            stroke={el.strokeColor || '#2b303d'}
                            strokeWidth={el.strokeWidth || 0}
                          />
                        )}
                      </svg>

                      {/* Canva-Style Quick Embed Photo Overlay */}
                      {!el.imageUrl && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerImageUpload(el.id);
                          }}
                          className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 border-2 border-dashed border-[#c5a059] p-2 text-center cursor-pointer transition hover:bg-black/75"
                          title="Click to embed photo into this shape frame"
                        >
                          <Upload className="w-5 h-5 text-[#c5a059] mb-1" />
                          <span className="text-[10px] font-mono text-[#c5a059] font-bold">Embed Photo</span>
                          <span className="text-[9px] font-sans text-gray-400">Click or drop image</span>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* 5. REALISTIC DEVICE MOCKUPS (MacBook, iPhone, iPad, Browser) */}
                {el.type === 'mockup' && (
                  <div className="w-full h-full relative flex flex-col pointer-events-none">
                    {/* A. BROWSER WINDOW MOCKUP */}
                    {el.mockupType === 'browser' && (
                      <div className="w-full h-full rounded-xl border border-[#303544] bg-[#12141a] flex flex-col overflow-hidden shadow-2xl">
                        <div className="h-8 bg-[#181b24] border-b border-[#252936] px-3 flex items-center space-x-2">
                          <div className="flex items-center space-x-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                          </div>
                          <div className="flex-1 max-w-sm h-5 bg-[#0e1015] border border-white/5 rounded-md mx-auto px-2 flex items-center justify-center">
                            <span className="font-mono text-[9px] text-gray-400 truncate">
                              {el.browserUrl || 'https://luxurybrand-atelier.com'}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 relative overflow-hidden bg-[#0c0d10]">
                          <img
                            src={el.screenImage}
                            alt="Browser Screen Design"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* B. MACBOOK PRO LAPTOP MOCKUP */}
                    {el.mockupType === 'macbook' && (
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <div className="w-[90%] h-[92%] rounded-t-xl border-4 border-[#252833] bg-[#0c0e12] p-1 shadow-2xl flex flex-col relative overflow-hidden">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/30 mx-auto mb-1" />
                          <div className="flex-1 rounded-lg overflow-hidden relative">
                            <img
                              src={el.screenImage}
                              alt="MacBook Design Screen"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="w-full h-[8%] bg-gradient-to-b from-[#2a2e3a] to-[#1e222b] rounded-b-xl border-t border-[#373d4d] relative flex items-center justify-center shadow-lg">
                          <div className="w-24 h-1.5 bg-[#15171e] rounded-b" />
                        </div>
                      </div>
                    )}

                    {/* C. IPHONE 16 PRO MOBILE MOCKUP */}
                    {el.mockupType === 'iphone' && (
                      <div className="w-full h-full rounded-[44px] border-[5px] border-[#373d4d] bg-black p-1.5 shadow-2xl flex flex-col relative overflow-hidden">
                        {/* Dynamic Island Speaker Pill */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full border border-white/10 z-20" />
                        <div className="w-full h-full rounded-[36px] overflow-hidden relative bg-[#0c0e12]">
                          <img
                            src={el.screenImage}
                            alt="Mobile Screen Design"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* D. IPAD PRO TABLET MOCKUP */}
                    {el.mockupType === 'ipad' && (
                      <div className="w-full h-full rounded-2xl border-[6px] border-[#313645] bg-black p-1.5 shadow-2xl flex flex-col relative overflow-hidden">
                        <div className="w-full h-full rounded-xl overflow-hidden relative bg-[#0c0e12]">
                          <img
                            src={el.screenImage}
                            alt="iPad Screen Design"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* E. MINIMALIST CLAY FRAME */}
                    {el.mockupType === 'clay' && (
                      <div className="w-full h-full rounded-2xl border-2 border-[#c5a059] bg-[#161822] p-2.5 shadow-2xl flex flex-col relative overflow-hidden">
                        <div className="w-full h-full rounded-xl overflow-hidden relative bg-[#0c0e12]">
                          <img
                            src={el.screenImage}
                            alt="Clay Screen Design"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 6. CANVA-STYLE DECORATIVE LINE OR FLOURISH */}
                {el.type === 'line' && (
                  <svg
                    viewBox={el.viewBox || `0 0 ${el.width} ${el.height}`}
                    className="w-full h-full overflow-visible pointer-events-none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d={el.path}
                      fill="none"
                      stroke={el.strokeColor || '#ffffff'}
                      strokeWidth={el.strokeWidth || 2}
                      strokeDasharray={
                        el.strokeStyle === 'dashed'
                          ? '8,8'
                          : el.strokeStyle === 'dotted'
                          ? '3,8'
                          : el.strokeDasharray || undefined
                      }
                      strokeLinecap={el.strokeLinecap || 'round'}
                      strokeLinejoin="round"
                    />
                  </svg>
                )}

                {/* ACTIVE SELECTION TOOLBAR & RESIZE HANDLES */}
                {isSelected && (
                  <>
                    {/* Sleek Floating Toolbar without intrusive clutter */}
                    <div
                      onMouseDown={(e) => e.stopPropagation()}
                      className="absolute -top-11 left-0 bg-[#161922] border border-[#2e3444] rounded-xl px-2 py-1 flex items-center space-x-2 shadow-2xl z-50 text-[11px]"
                    >
                      {/* Dimensions label in header without blocking wireframe */}
                      <span className="font-mono text-[10px] text-[#c5a059] pr-1.5 border-r border-white/10">
                        {el.width}×{el.height}
                      </span>

                      {/* Quick Scale Buttons */}
                      <div className="flex items-center space-x-0.5 bg-black/40 p-0.5 rounded-lg border border-white/5">
                        <button
                          onClick={() => scaleElement(el.id, 0.8)}
                          title="Scale Down"
                          className="px-2 py-0.5 text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded font-mono flex items-center space-x-0.5"
                        >
                          <Minus className="w-2.5 h-2.5 text-[#c5a059]" />
                          <span>Small</span>
                        </button>
                        <button
                          onClick={() => scaleElement(el.id, 1.25)}
                          title="Scale Up"
                          className="px-2 py-0.5 text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded font-mono flex items-center space-x-0.5"
                        >
                          <Plus className="w-2.5 h-2.5 text-[#c5a059]" />
                          <span>Big</span>
                        </button>
                      </div>

                      {/* Quick Rotate Button */}
                      <button
                        onClick={() => rotateElement(el.id, (el.rotation || 0) + 45)}
                        title="Click to rotate +45°"
                        className="px-2 py-0.5 text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded font-mono flex items-center space-x-1 border border-white/5"
                      >
                        <RotateCw className="w-2.5 h-2.5 text-[#c5a059]" />
                        <span>{el.rotation || 0}°</span>
                      </button>

                      {/* Center Element on Canvas */}
                      <button
                        onClick={() => alignElement(el.id, 'center-both')}
                        title="Center on Canvas"
                        className="px-2 py-0.5 text-xs text-[#e4c88a] hover:text-white hover:bg-white/10 rounded font-mono flex items-center space-x-1 border border-white/5"
                      >
                        <AlignCenter className="w-2.5 h-2.5 text-[#c5a059]" />
                        <span>Center</span>
                      </button>

                      {/* If vector, shape, or frame: 1-Click File Picker to Embed Photo */}
                      {(el.type === 'vector' || el.type === 'shape' || el.isShapeFrame || el.type === 'image') && (
                        <button
                          onClick={() => triggerImageUpload(el.id)}
                          title="Upload and embed photo from PC / computer"
                          className="px-2.5 py-1 text-[11px] bg-[#c5a059] hover:bg-[#d8b46e] text-black font-bold rounded-lg transition flex items-center space-x-1 shadow-sm"
                        >
                          <Upload className="w-3 h-3 text-black" />
                          <span>{el.imageUrl ? 'Change Photo' : 'Embed Photo'}</span>
                        </button>
                      )}

                      {/* Direct Nudge Buttons Left, Right, Up, Down */}
                      <div className="flex items-center space-x-0.5 bg-black/40 p-0.5 rounded border border-white/5">
                        <button
                          onClick={() => updateElement(el.id, { x: el.x - 10 })}
                          title="Move Left 10px (Or use Left Arrow Key)"
                          className="p-1 text-gray-300 hover:text-white hover:bg-white/10 rounded"
                        >
                          <ArrowLeft className="w-3 h-3 text-[#c5a059]" />
                        </button>
                        <button
                          onClick={() => updateElement(el.id, { x: el.x + 10 })}
                          title="Move Right 10px (Or use Right Arrow Key)"
                          className="p-1 text-gray-300 hover:text-white hover:bg-white/10 rounded"
                        >
                          <ArrowRight className="w-3 h-3 text-[#c5a059]" />
                        </button>
                        <button
                          onClick={() => updateElement(el.id, { y: el.y - 10 })}
                          title="Move Up 10px (Or use Up Arrow Key)"
                          className="p-1 text-gray-300 hover:text-white hover:bg-white/10 rounded"
                        >
                          <ArrowUp className="w-3 h-3 text-[#c5a059]" />
                        </button>
                        <button
                          onClick={() => updateElement(el.id, { y: el.y + 10 })}
                          title="Move Down 10px (Or use Down Arrow Key)"
                          className="p-1 text-gray-300 hover:text-white hover:bg-white/10 rounded"
                        >
                          <ArrowDown className="w-3 h-3 text-[#c5a059]" />
                        </button>
                      </div>

                      {/* Explicit Layer Ordering (Neeche / Upar) */}
                      <div className="flex items-center space-x-0.5 pl-1.5 border-l border-white/10">
                        {/* Current Layer Badge */}
                        <span
                          title={`Layer ${el.zIndex || (elements.findIndex(x => x.id === el.id) + 1)} of ${elements.length}`}
                          className="px-1.5 py-0.5 font-mono text-[9px] text-[#c5a059] bg-[#c5a059]/10 rounded border border-[#c5a059]/20 font-semibold cursor-default mr-0.5"
                        >
                          L{el.zIndex || (elements.findIndex(x => x.id === el.id) + 1)}
                        </span>

                        {/* Send 1 Step Backward (Neeche) */}
                        <button
                          onClick={() => changeZIndex(el.id, 'down')}
                          title="1 Layer Neeche Bhejo / Send Backward (Ctrl+[)"
                          className="px-1.5 py-0.5 bg-black/40 hover:bg-white/10 text-gray-300 hover:text-white rounded border border-white/5 flex items-center space-x-0.5 transition"
                        >
                          <ArrowDown className="w-3 h-3 text-[#c5a059]" />
                          <span className="font-sans text-[10px] font-medium">Neeche</span>
                        </button>

                        {/* Bring 1 Step Forward (Upar) */}
                        <button
                          onClick={() => changeZIndex(el.id, 'up')}
                          title="1 Layer Upar Lao / Bring Forward (Ctrl+])"
                          className="px-1.5 py-0.5 bg-black/40 hover:bg-white/10 text-gray-300 hover:text-white rounded border border-white/5 flex items-center space-x-0.5 transition"
                        >
                          <ArrowUp className="w-3 h-3 text-[#c5a059]" />
                          <span className="font-sans text-[10px] font-medium">Upar</span>
                        </button>

                        {/* Send to Back (Sab Ke Neeche) */}
                        <button
                          onClick={() => sendToBack(el.id)}
                          title="Sab Ke Neeche Bhejo / Send to Back (Ctrl+Shift+[)"
                          className="p-1 text-gray-400 hover:text-[#c5a059] hover:bg-white/10 rounded transition"
                        >
                          <ChevronsDown className="w-3.5 h-3.5" />
                        </button>

                        {/* Bring to Front (Sab Ke Upar) */}
                        <button
                          onClick={() => bringToFront(el.id)}
                          title="Sab Ke Upar Lao / Bring to Front (Ctrl+Shift+])"
                          className="p-1 text-gray-400 hover:text-[#c5a059] hover:bg-white/10 rounded transition"
                        >
                          <ChevronsUp className="w-3.5 h-3.5" />
                        </button>
                      </div>

                        <button
                          onClick={() => duplicateElement(el.id)}
                          title="Duplicate (Ctrl+D)"
                          className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded transition ml-0.5"
                        >
                          <Copy className="w-3 h-3" />
                        </button>

                        <button
                          onClick={() => removeElement(el.id)}
                          title="Delete (Del)"
                          className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/15 rounded transition ml-0.5"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                    {/* 4 CORNER RESIZE HANDLES */}
                    <div
                      onMouseDown={(e) => handleResizeHandleMouseDown(e, el, 'se')}
                      title="Drag to resize (Bottom-Right)"
                      className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-[#c5a059] border-2 border-black shadow-lg cursor-se-resize z-50 hover:scale-150 transition-transform"
                    />
                    <div
                      onMouseDown={(e) => handleResizeHandleMouseDown(e, el, 'sw')}
                      title="Drag to resize (Bottom-Left)"
                      className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-[#c5a059] border-2 border-black shadow-lg cursor-sw-resize z-50 hover:scale-150 transition-transform"
                    />
                    <div
                      onMouseDown={(e) => handleResizeHandleMouseDown(e, el, 'ne')}
                      title="Drag to resize (Top-Right)"
                      className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#c5a059] border-2 border-black shadow-lg cursor-ne-resize z-50 hover:scale-150 transition-transform"
                    />
                    <div
                      onMouseDown={(e) => handleResizeHandleMouseDown(e, el, 'nw')}
                      title="Drag to resize (Top-Left)"
                      className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-[#c5a059] border-2 border-black shadow-lg cursor-nw-resize z-50 hover:scale-150 transition-transform"
                    />

                    {/* 4 EDGE RESIZE HANDLES */}
                    <div
                      onMouseDown={(e) => handleResizeHandleMouseDown(e, el, 'e')}
                      title="Adjust Width"
                      className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-7 rounded-full bg-[#c5a059] border-2 border-black shadow cursor-e-resize z-50 hover:scale-125 transition-transform"
                    />
                    <div
                      onMouseDown={(e) => handleResizeHandleMouseDown(e, el, 'w')}
                      title="Adjust Width"
                      className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-7 rounded-full bg-[#c5a059] border-2 border-black shadow cursor-w-resize z-50 hover:scale-125 transition-transform"
                    />
                    <div
                      onMouseDown={(e) => handleResizeHandleMouseDown(e, el, 's')}
                      title="Adjust Height"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-7 h-3 rounded-full bg-[#c5a059] border-2 border-black shadow cursor-s-resize z-50 hover:scale-125 transition-transform"
                    />
                    <div
                      onMouseDown={(e) => handleResizeHandleMouseDown(e, el, 'n')}
                      title="Adjust Height"
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-7 h-3 rounded-full bg-[#c5a059] border-2 border-black shadow cursor-n-resize z-50 hover:scale-125 transition-transform"
                    />

                    {/* ROTATION STALK & KNOB (Figma / Canva style) */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-50 pointer-events-auto">
                      <div
                        onMouseDown={(e) => handleRotateHandleMouseDown(e, el)}
                        title={`Drag to rotate (Angle: ${el.rotation || 0}°)`}
                        className="w-5 h-5 rounded-full bg-[#c5a059] border-2 border-black shadow-xl cursor-grab active:cursor-grabbing flex items-center justify-center hover:scale-125 transition-transform"
                      >
                        <RotateCw className="w-3 h-3 text-black stroke-[2.5]" />
                      </div>
                      <div className="w-0.5 h-3 bg-[#c5a059]" />
                    </div>

                    {/* LIVE RESIZE DIMENSION TOOLTIP BADGE */}
                    {resizingElem && resizingElem.id === el.id && (
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#c5a059] text-black font-mono text-[11px] font-bold shadow-2xl pointer-events-none z-[9999] border border-black/40 whitespace-nowrap">
                        {el.width} × {el.height}px
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Canvas Navigation Toolbar */}
      <div className="absolute bottom-6 left-6 flex items-center space-x-1.5 p-1.5 bg-[#14171d]/90 backdrop-blur-md border border-[#282d38] rounded-xl shadow-2xl z-30">
        <button
          onClick={() => setActiveTool('select')}
          title="Select / Move tool (V)"
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
          onClick={() => {
            setZoom(0.85);
            setPan({ x: 80, y: 60 });
          }}
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
          onClick={() => {
            setZoom(0.85);
            setPan({ x: 80, y: 60 });
          }}
          title="Fit to Center"
          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition"
        >
          <Maximize className="w-4 h-4" />
        </button>
      </div>

      {/* Hidden File Input for 1-Click Image Upload into Shape Frames & Canvas */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && targetElementForUpload) {
            const reader = new FileReader();
            reader.onload = (evt) => {
              updateElement(targetElementForUpload, {
                bgType: 'image',
                imageUrl: evt.target.result
              });
              e.target.value = '';
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </div>
  );
};
