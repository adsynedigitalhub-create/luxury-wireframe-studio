/**
 * Clean Code Generator Service
 * Lumina Studio - Project 1
 * Compiles wireframe elements and website templates into:
 * 1. React + Tailwind CSS
 * 2. Standalone HTML5 + Modern CSS3
 * 3. Elementor Importable JSON Template
 */

function escapeText(text) {
  if (!text) return '';
  return String(text).replace(/"/g, '&quot;');
}

export function generateReactTailwind(elements = [], canvasDimensions = { width: 1440, height: 900 }, canvasBg = { type: 'solid', solidColor: '#0c0d0e' }) {
  const bgStyle = canvasBg.type === 'solid'
    ? `backgroundColor: '${canvasBg.solidColor || '#0c0d0e'}'`
    : `background: 'linear-gradient(${canvasBg.gradient?.angle || 135}deg, ${canvasBg.gradient?.from || '#121418'}, ${canvasBg.gradient?.to || '#08080a'})'`;

  const renderedElements = elements.map((el, index) => {
    const left = el.x;
    const top = el.y;
    const width = el.width;
    const height = el.height;
    const opacity = (el.opacity ?? 100) / 100;
    const rotation = el.rotation || 0;
    const zIndex = el.zIndex || index + 1;

    const styleProps = [
      `left: '${left}px'`,
      `top: '${top}px'`,
      `width: '${width}px'`,
      `height: '${height}px'`,
      `zIndex: ${zIndex}`,
      opacity < 1 ? `opacity: ${opacity}` : null,
      rotation ? `transform: 'rotate(${rotation}deg)'` : null
    ].filter(Boolean);

    if (el.type === 'text') {
      if (el.fontFamily) styleProps.push(`fontFamily: '${el.fontFamily}'`);
      styleProps.push(`color: '${el.textColor || '#f5f2eb'}'`);
      styleProps.push(`fontSize: '${el.fontSize || 32}px'`);
      if (el.fontWeight) styleProps.push(`fontWeight: '${el.fontWeight}'`);
      if (el.letterSpacing) styleProps.push(`letterSpacing: '${el.letterSpacing}'`);
      if (el.textAlign) styleProps.push(`textAlign: '${el.textAlign}'`);

      return `      {/* Text Element #${index + 1} */}
      <div
        className="absolute leading-tight select-none transition-all duration-300 hover:opacity-90"
        style={{ ${styleProps.join(', ')} }}
      >
        ${el.text || 'Editorial Heading'}
      </div>`;
    }

    if (el.type === 'image') {
      if (el.borderRadius) styleProps.push(`borderRadius: '${el.borderRadius}px'`);
      const objectFit = el.objectFit || 'cover';
      return `      {/* Image Element #${index + 1} */}
      <div
        className="absolute overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
        style={{ ${styleProps.join(', ')} }}
      >
        <img
          src="${el.imageUrl || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'}"
          alt="${escapeText(el.imageAlt || 'Visual Asset')}"
          className="w-full h-full object-${objectFit} select-none"
          loading="lazy"
        />
      </div>`;
    }

    if (el.type === 'shape') {
      if (el.borderRadius) styleProps.push(`borderRadius: '${el.borderRadius}px'`);
      if (el.borderWidth) styleProps.push(`border: '${el.borderWidth}px solid ${el.borderColor || '#c5a059'}'`);
      if (el.bgType === 'gradient' && el.bgGradient) {
        styleProps.push(`background: 'linear-gradient(${el.bgGradient.angle || 135}deg, ${el.bgGradient.from || '#c5a059'}, ${el.bgGradient.to || '#96793f'})'`);
      } else if (el.bgType === 'image' && el.imageUrl) {
        return `      {/* Shape Card with Embedded Photo #${index + 1} */}
      <div
        className="absolute overflow-hidden shadow-xl transition-all duration-300"
        style={{ ${styleProps.join(', ')} }}
      >
        <img
          src="${el.imageUrl}"
          alt="Card Visual"
          className="w-full h-full object-${el.objectFit || 'cover'}"
        />
      </div>`;
      } else {
        styleProps.push(`backgroundColor: '${el.bgColor || '#15171d'}'`);
      }
      return `      {/* Shape / Card Element #${index + 1} */}
      <div
        className="absolute transition-all duration-300"
        style={{ ${styleProps.join(', ')} }}
      />`;
    }

    if (el.type === 'vector') {
      const viewBox = el.viewBox || '0 0 100 100';
      const path = el.svgPath || '';
      return `      {/* Vector / Mask Element #${index + 1} */}
      <div
        className="absolute overflow-hidden"
        style={{ ${styleProps.join(', ')} }}
      >
        <svg viewBox="${viewBox}" preserveAspectRatio="none" className="w-full h-full drop-shadow-md">
          <path d="${path}" fill="${el.fill || '#c5a059'}" />
        </svg>
      </div>`;
    }

    if (el.type === 'line') {
      return `      {/* Line / Trail Vector #${index + 1} */}
      <div
        className="absolute pointer-events-none"
        style={{ ${styleProps.join(', ')} }}
      >
        <svg viewBox="0 0 ${width} ${height}" className="w-full h-full">
          <path
            d="${el.path || `M 0 ${height / 2} L ${width} ${height / 2}`}"
            fill="none"
            stroke="${el.strokeColor || '#c5a059'}"
            strokeWidth="${el.strokeWidth || 2}"
            strokeDasharray="${el.strokeStyle === 'dashed' ? '8,8' : el.strokeStyle === 'dotted' ? '3,8' : 'none'}"
            strokeLinecap="round"
          />
        </svg>
      </div>`;
    }

    return `      {/* Generic Wireframe Element #${index + 1} */}
      <div className="absolute" style={{ ${styleProps.join(', ')} }} />`;
  }).join('\n\n');

  return `import React from 'react';

/**
 * Compiled Wireframe Component
 * Exported from Lumina Wireframe Studio
 * Canvas Dimensions: ${canvasDimensions.width}px x ${canvasDimensions.height}px
 */
export default function WireframeSection() {
  return (
    <section className="relative w-full flex items-center justify-center py-12 px-4 bg-[#090a0c]">
      <div
        className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/10"
        style={{
          width: '100%',
          maxWidth: '${canvasDimensions.width}px',
          minHeight: '${canvasDimensions.height}px',
          ${bgStyle}
        }}
      >
${renderedElements}
      </div>
    </section>
  );
}
`;
}

export function generateHTMLCSS(elements = [], canvasDimensions = { width: 1440, height: 900 }, canvasBg = { type: 'solid', solidColor: '#0c0d0e' }) {
  const bgCss = canvasBg.type === 'solid'
    ? `background-color: ${canvasBg.solidColor || '#0c0d0e'};`
    : `background: linear-gradient(${canvasBg.gradient?.angle || 135}deg, ${canvasBg.gradient?.from || '#121418'}, ${canvasBg.gradient?.to || '#08080a'});`;

  const htmlElements = elements.map((el, index) => {
    const left = el.x;
    const top = el.y;
    const width = el.width;
    const height = el.height;
    const opacity = (el.opacity ?? 100) / 100;
    const rotation = el.rotation || 0;
    const zIndex = el.zIndex || index + 1;

    let inlineCss = `left: ${left}px; top: ${top}px; width: ${width}px; height: ${height}px; z-index: ${zIndex};`;
    if (opacity < 1) inlineCss += ` opacity: ${opacity};`;
    if (rotation) inlineCss += ` transform: rotate(${rotation}deg);`;

    if (el.type === 'text') {
      const font = el.fontFamily ? `font-family: ${el.fontFamily};` : `font-family: 'Playfair Display', serif;`;
      const color = `color: ${el.textColor || '#f5f2eb'};`;
      const fontSize = `font-size: ${el.fontSize || 32}px;`;
      const fontWeight = el.fontWeight ? `font-weight: ${el.fontWeight};` : 'font-weight: 400;';
      const letterSpacing = el.letterSpacing ? `letter-spacing: ${el.letterSpacing};` : '';
      const textAlign = el.textAlign ? `text-align: ${el.textAlign};` : '';

      return `    <!-- Text Element #${index + 1} -->
    <div class="wireframe-elem wireframe-text" style="${inlineCss} ${font} ${color} ${fontSize} ${fontWeight} ${letterSpacing} ${textAlign}">
      ${escapeText(el.text || 'Editorial Heading')}
    </div>`;
    }

    if (el.type === 'image') {
      const radius = el.borderRadius ? `border-radius: ${el.borderRadius}px;` : 'border-radius: 8px;';
      return `    <!-- Image Element #${index + 1} -->
    <div class="wireframe-elem wireframe-image" style="${inlineCss} ${radius}">
      <img src="${el.imageUrl || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'}" alt="${escapeText(el.imageAlt || 'Photo')}" style="object-fit: ${el.objectFit || 'cover'}; width: 100%; height: 100%; display: block;" />
    </div>`;
    }

    if (el.type === 'shape') {
      const radius = el.borderRadius ? `border-radius: ${el.borderRadius}px;` : '';
      const border = el.borderWidth ? `border: ${el.borderWidth}px solid ${el.borderColor || '#c5a059'};` : '';
      let shapeBg = `background-color: ${el.bgColor || '#15171d'};`;
      if (el.bgType === 'gradient' && el.bgGradient) {
        shapeBg = `background: linear-gradient(${el.bgGradient.angle || 135}deg, ${el.bgGradient.from || '#c5a059'}, ${el.bgGradient.to || '#96793f'});`;
      } else if (el.bgType === 'image' && el.imageUrl) {
        return `    <!-- Shape Mask Image #${index + 1} -->
    <div class="wireframe-elem wireframe-shape-image" style="${inlineCss} ${radius} ${border}">
      <img src="${el.imageUrl}" alt="Masked Shape" style="object-fit: ${el.objectFit || 'cover'}; width: 100%; height: 100%;" />
    </div>`;
      }
      return `    <!-- Shape Element #${index + 1} -->
    <div class="wireframe-elem wireframe-shape" style="${inlineCss} ${shapeBg} ${radius} ${border}"></div>`;
    }

    if (el.type === 'line') {
      return `    <!-- Line Element #${index + 1} -->
    <div class="wireframe-elem wireframe-line" style="${inlineCss}">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: 100%;">
        <path d="${el.path || `M 0 ${height / 2} L ${width} ${height / 2}`}" fill="none" stroke="${el.strokeColor || '#c5a059'}" stroke-width="${el.strokeWidth || 2}" stroke-linecap="round" />
      </svg>
    </div>`;
    }

    return `    <!-- Element #${index + 1} -->
    <div class="wireframe-elem" style="${inlineCss}"></div>`;
  }).join('\n\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Editorial Wireframe ? Lumina Studio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Marck+Script&family=Montserrat:wght@300;400;600;800&family=Oswald:wght@300;500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background-color: #090a0c; color: #f5f2eb; font-family: 'Montserrat', sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 16px; }
    .artboard-container { position: relative; width: 100%; max-width: ${canvasDimensions.width}px; min-height: ${canvasDimensions.height}px; border-radius: 16px; overflow: hidden; box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08); ${bgCss} }
    .wireframe-elem { position: absolute; transition: transform 0.25s ease, opacity 0.25s ease; }
    .wireframe-text { line-height: 1.15; user-select: none; }
    .wireframe-image { overflow: hidden; }
    .wireframe-image img { width: 100%; height: 100%; display: block; }
  </style>
</head>
<body>
  <div class="artboard-container">
${htmlElements}
  </div>
</body>
</html>`;
}

export function generateElementorJSON(elements = [], canvasDimensions = { width: 1440, height: 900 }) {
  const elementorWidgets = elements.map((el, index) => {
    const id = `lumina_el_${index + 1}_${Date.now().toString(36)}`;
    if (el.type === 'text') {
      return {
        id,
        elType: 'widget',
        widgetType: 'heading',
        settings: {
          title: el.text || 'Editorial Heading',
          header_size: el.fontSize > 40 ? 'h1' : el.fontSize > 24 ? 'h2' : 'h3',
          align: el.textAlign || 'left',
          title_color: el.textColor || '#f5f2eb',
          typography_typography: 'custom',
          typography_font_family: el.fontFamily || 'Playfair Display',
          typography_font_size: { unit: 'px', size: el.fontSize || 32 },
          typography_font_weight: el.fontWeight || '400',
          _position: 'absolute',
          _offset_x: { unit: 'px', size: el.x },
          _offset_y: { unit: 'px', size: el.y },
          _element_width: 'initial',
          _element_custom_width: { unit: 'px', size: el.width },
          _z_index: el.zIndex || index + 1
        }
      };
    }
    if (el.type === 'image') {
      return {
        id,
        elType: 'widget',
        widgetType: 'image',
        settings: {
          image: { url: el.imageUrl || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', id: '' },
          image_size: 'full',
          border_radius: { unit: 'px', top: el.borderRadius || 8, right: el.borderRadius || 8, bottom: el.borderRadius || 8, left: el.borderRadius || 8 },
          _position: 'absolute',
          _offset_x: { unit: 'px', size: el.x },
          _offset_y: { unit: 'px', size: el.y },
          _element_width: 'initial',
          _element_custom_width: { unit: 'px', size: el.width },
          _z_index: el.zIndex || index + 1
        }
      };
    }
    return {
      id,
      elType: 'widget',
      widgetType: 'spacer',
      settings: {
        space: { unit: 'px', size: el.height || 50 },
        _position: 'absolute',
        _offset_x: { unit: 'px', size: el.x },
        _offset_y: { unit: 'px', size: el.y },
        _z_index: el.zIndex || index + 1
      }
    };
  });

  const templateData = {
    version: '0.4',
    title: 'Lumina Studio Wireframe Section',
    type: 'section',
    content: [
      {
        id: `section_${Date.now().toString(36)}`,
        elType: 'section',
        isInner: false,
        settings: {
          layout: 'full_width',
          gap: 'no',
          height: 'min-height',
          custom_height: { unit: 'px', size: canvasDimensions.height },
          background_background: 'classic',
          background_color: '#0c0d0e'
        },
        elements: [
          {
            id: `col_${Date.now().toString(36)}`,
            elType: 'column',
            isInner: false,
            settings: { _column_size: 100 },
            elements: elementorWidgets
          }
        ]
      }
    ]
  };
  return JSON.stringify(templateData, null, 2);
}

export function generateAdventureSiteReactCode() {
  return `import React, { useState } from 'react';
import { Compass, MapPin, Calendar, Phone, ArrowRight, ArrowDown } from 'lucide-react';

export default function AdventureHikingWebsite() {
  const [destination, setDestination] = useState('?????? (???????)');
  const [tourType, setTourType] = useState('????? ?????');
  const [month, setMonth] = useState('????????');

  const tours = [
    {
      number: '01',
      watermark: 'Elbrus',
      title: '??????????? ?? ???????',
      duration: '????????????????? ?????? ????????: 9 ????',
      dates: '???? ??????: 15 ???????? (???. ??????)',
      length: '????? ????? ????? ????????: ????? 55 ??',
      elevation: '5,642 m',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    },
    {
      number: '02',
      watermark: 'Crimea',
      title: '????? ?? ??????? ?????',
      duration: '????????????????? ?????? ????????: 7 ????',
      dates: '???? ??????: 15-22 ????????',
      length: '????? ????? ????? ????????: ????? 45 ??',
      elevation: '1,545 m',
      image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80'
    },
    {
      number: '03',
      watermark: 'Altai',
      title: '??????????? ?? ?????',
      duration: '????????????????? ?????? ????????: 9 ????',
      dates: '???? ??????: 5-13 ???????',
      length: '????? ????? ????? ????????: ????? 50 ??',
      elevation: '3,200 m',
      image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-[#1c1b18] text-[#f4efe4] font-sans antialiased selection:bg-[#c5a059] selection:text-black">
      <header className="relative z-20 max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
            <Compass className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <div className="font-['Oswald'] tracking-[0.2em] text-lg font-bold uppercase text-white">
              ?????????
            </div>
            <div className="font-mono text-[9px] tracking-widest text-[#c5a059] uppercase">
              ?????????? ?? ??????
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-xs font-['Oswald'] tracking-widest uppercase text-gray-300">
          <a href="#tours" className="hover:text-[#c5a059] transition">????????</a>
          <a href="#about" className="hover:text-[#c5a059] transition">? ?????</a>
          <a href="#reviews" className="hover:text-[#c5a059] transition">??????</a>
          <a href="#contacts" className="hover:text-[#c5a059] transition">????????</a>
        </nav>

        <a href="tel:+78005553535" className="flex items-center space-x-2 px-4 py-2 rounded-full border border-[#c5a059]/50 hover:bg-[#c5a059] hover:text-black text-xs font-mono text-[#c5a059] transition">
          <Phone className="w-3.5 h-3.5" />
          <span>8 (800) 555-35-35</span>
        </a>
      </header>

      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=2000&q=85"
            alt="Mountain Expedition Vista"
            className="w-full h-full object-cover brightness-[0.7] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b18] via-black/40 to-black/70" />
        </div>

        <div className="relative z-20 max-w-4xl mx-auto text-center px-6 py-16">
          <span className="inline-block font-['Caveat'] text-2xl md:text-3xl text-[#e4c88a] mb-3">
            ?????? ??? ???? ??????? ?????? ??????
          </span>
          <h1 className="font-['Oswald'] text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-wide leading-[1.05] text-white drop-shadow-lg mb-6">
            ????????? ?? ??????
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-300 font-light leading-relaxed mb-8">
            ?????????????? ????????? ?????? ? ??????????? ? ????????????? ????????????????? ?????? ?????.
          </p>
          <a
            href="#filter"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-['Oswald'] tracking-widest uppercase font-bold text-sm rounded-full transition transform hover:scale-105 shadow-2xl"
          >
            <span>??????? ?????</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </section>

      <div className="relative w-full z-20 -mt-1 pointer-events-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 md:h-14 fill-[#24221e]">
          <path d="M0,0 L0,35 Q120,55 240,32 Q360,10 480,38 Q600,60 720,28 Q840,8 960,40 Q1080,58 1200,30 Q1320,12 1440,36 L1440,60 L0,60 Z" />
        </svg>
      </div>

      <section id="filter" className="relative z-20 bg-[#24221e] border-y border-[#3d3830] py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-['Oswald'] text-2xl md:text-3xl font-bold tracking-widest uppercase text-white">
              ????? ????????
            </h2>
            <p className="font-mono text-xs text-[#c5a059] mt-1">
              ????????? ????????? ????????? ??????
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#181714] border border-[#3a352c] shadow-xl">
            <div className="space-y-1.5">
              <label className="font-['Oswald'] text-xs text-gray-400 tracking-wider uppercase block">???????</label>
              <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full bg-[#24221e] border border-[#3f3a30] text-sm text-white rounded-lg p-2.5 focus:outline-none focus:border-[#c5a059]">
                <option>?????? (???????)</option>
                <option>?????? ????</option>
                <option>????????? ????</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-['Oswald'] text-xs text-gray-400 tracking-wider uppercase block">??? ??????</label>
              <select value={tourType} onChange={(e) => setTourType(e.target.value)} className="w-full bg-[#24221e] border border-[#3f3a30] text-sm text-white rounded-lg p-2.5 focus:outline-none focus:border-[#c5a059]">
                <option>????? ?????</option>
                <option>?????? ???????????</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-['Oswald'] text-xs text-gray-400 tracking-wider uppercase block">?????</label>
              <select value={month} onChange={(e) => setMonth(e.target.value)} className="w-full bg-[#24221e] border border-[#3f3a30] text-sm text-white rounded-lg p-2.5 focus:outline-none focus:border-[#c5a059]">
                <option>????????</option>
                <option>???????</option>
              </select>
            </div>
            <div className="flex items-end">
              <button type="button" className="w-full py-3 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-['Oswald'] tracking-widest font-bold text-sm uppercase rounded-lg transition shadow-md">
                ???????? ??????
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#332e25] bg-[#141311] py-8 text-center text-xs font-mono text-gray-500">
        <p>? 2026 ????????? ?? ??????. ??? ????? ????????.</p>
      </footer>
    </div>
  );
}
`;
}

export function generateAdventureSiteHTMLCode() {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>????????? ?? ?????? ? ?????????? ? ???????????</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Oswald:wght@300;400;500;600;700&family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Montserrat', sans-serif;
      background-color: #1c1b18;
      color: #f4efe4;
    }
    .font-oswald { font-family: 'Oswald', sans-serif; }
    .font-caveat { font-family: 'Caveat', cursive; }
  </style>
</head>
<body class="selection:bg-[#c5a059] selection:text-black">
  <!-- Top Brand Header -->
  <header class="relative z-20 max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 rounded-full border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
        ??
      </div>
      <div>
        <div class="font-oswald tracking-[0.2em] text-lg font-bold uppercase text-white">
          ?????????
        </div>
        <div class="font-mono text-[9px] tracking-widest text-[#c5a059] uppercase">
          ?????????? ?? ??????
        </div>
      </div>
    </div>

    <nav class="hidden md:flex items-center space-x-8 text-xs font-oswald tracking-widest uppercase text-gray-300">
      <a href="#tours" class="hover:text-[#c5a059] transition">????????</a>
      <a href="#about" class="hover:text-[#c5a059] transition">? ?????</a>
      <a href="#reviews" class="hover:text-[#c5a059] transition">??????</a>
      <a href="#contacts" class="hover:text-[#c5a059] transition">????????</a>
    </nav>

    <a href="tel:+78005553535" class="flex items-center space-x-2 px-4 py-2 rounded-full border border-[#c5a059]/50 hover:bg-[#c5a059] hover:text-black text-xs font-mono text-[#c5a059] transition">
      ?? <span>8 (800) 555-35-35</span>
    </a>
  </header>

  <!-- Hero Section -->
  <section class="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=2000&q=85"
        alt="Expedition Vista"
        class="w-full h-full object-cover brightness-[0.7] contrast-[1.1]"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#1c1b18] via-black/40 to-black/70"></div>
    </div>

    <div class="relative z-20 max-w-4xl mx-auto text-center px-6 py-16">
      <span class="inline-block font-caveat text-3xl text-[#e4c88a] mb-3">
        ?????? ??? ???? ??????? ?????? ??????
      </span>
      <h1 class="font-oswald text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-wide leading-[1.05] text-white drop-shadow-lg mb-6">
        ????????? ?? ??????
      </h1>
      <p class="max-w-xl mx-auto text-sm md:text-base text-gray-300 font-light leading-relaxed mb-8">
        ?????????????? ????????? ?????? ? ??????????? ? ????????????? ????????????????? ?????? ?????.
      </p>
      <a
        href="#filter"
        class="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-oswald tracking-widest uppercase font-bold text-sm rounded-full transition transform hover:scale-105 shadow-2xl"
      >
        <span>??????? ?????</span>
        <span>?</span>
      </a>
    </div>
  </section>

  <!-- Torn Paper Edge Separator -->
  <div class="relative w-full z-20 -mt-1 pointer-events-none">
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" class="w-full h-10 md:h-14 fill-[#24221e]">
      <path d="M0,0 L0,35 Q120,55 240,32 Q360,10 480,38 Q600,60 720,28 Q840,8 960,40 Q1080,58 1200,30 Q1320,12 1440,36 L1440,60 L0,60 Z"></path>
    </svg>
  </div>

  <!-- Route Filter Bar -->
  <section id="filter" class="relative z-20 bg-[#24221e] border-y border-[#3d3830] py-8 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-6">
        <h2 class="font-oswald text-2xl md:text-3xl font-bold tracking-widest uppercase text-white">
          ????? ????????
        </h2>
        <p class="font-mono text-xs text-[#c5a059] mt-1">
          ????????? ????????? ????????? ??????
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#181714] border border-[#3a352c] shadow-xl">
        <div class="space-y-1.5">
          <label class="font-oswald text-xs text-gray-400 tracking-wider uppercase block">???????</label>
          <select class="w-full bg-[#24221e] border border-[#3f3a30] text-sm text-white rounded-lg p-2.5 focus:outline-none focus:border-[#c5a059]">
            <option>?????? (???????)</option>
            <option>?????? ????</option>
            <option>????????? ????</option>
          </select>
        </div>
        <div class="space-y-1.5">
          <label class="font-oswald text-xs text-gray-400 tracking-wider uppercase block">??? ??????</label>
          <select class="w-full bg-[#24221e] border border-[#3f3a30] text-sm text-white rounded-lg p-2.5 focus:outline-none focus:border-[#c5a059]">
            <option>????? ?????</option>
            <option>?????? ???????????</option>
          </select>
        </div>
        <div class="space-y-1.5">
          <label class="font-oswald text-xs text-gray-400 tracking-wider uppercase block">?????</label>
          <select class="w-full bg-[#24221e] border border-[#3f3a30] text-sm text-white rounded-lg p-2.5 focus:outline-none focus:border-[#c5a059]">
            <option>????????</option>
            <option>???????</option>
          </select>
        </div>
        <div class="flex items-end">
          <button type="button" class="w-full py-3 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-oswald tracking-widest font-bold text-sm uppercase rounded-lg transition shadow-md">
            ???????? ??????
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Tours Cards -->
  <section id="tours" class="relative py-20 px-6 max-w-7xl mx-auto space-y-20">
    <!-- Tour 1 -->
    <article class="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
      <div class="relative w-full lg:w-1/2 group">
        <div class="absolute -top-10 -left-6 z-0 font-caveat text-8xl text-[#c5a059]/20 select-none pointer-events-none transform -rotate-6">
          Elbrus
        </div>
        <div class="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-[#3d372c]">
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80" alt="Elbrus" class="w-full h-[380px] object-cover transition-transform duration-700 group-hover:scale-105" />
          <div class="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#c5a059]/40 text-[#c5a059] font-oswald text-xs font-bold">
            ??????? 01
          </div>
          <div class="absolute bottom-4 right-4 bg-[#c5a059] text-black font-oswald text-xs px-3 py-1 rounded-full font-bold">
            5,642 m
          </div>
        </div>
      </div>
      <div class="w-full lg:w-1/2 space-y-5">
        <div class="font-caveat text-2xl text-[#e4c88a]">??????? #01</div>
        <h3 class="font-oswald text-3xl font-bold uppercase tracking-wide text-white leading-tight">
          ??????????? ?? ???????
        </h3>
        <div class="space-y-2.5 pt-2 font-light text-sm text-gray-300">
          <div>? ????????????????? ?????? ????????: 9 ????</div>
          <div>? ???? ??????: 15 ???????? (???. ??????)</div>
          <div>? ????? ????? ????? ????????: ????? 55 ??</div>
        </div>
        <div class="pt-4">
          <button class="px-6 py-3 bg-gradient-to-r from-[#c5a059] to-[#96793f] text-black font-oswald uppercase font-bold text-xs tracking-widest rounded-lg transition shadow-lg hover:brightness-110">
            ????????? ? ???????? ?
          </button>
        </div>
      </div>
    </article>

    <!-- Tour 2 -->
    <article class="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16">
      <div class="relative w-full lg:w-1/2 group">
        <div class="absolute -top-10 -left-6 z-0 font-caveat text-8xl text-[#c5a059]/20 select-none pointer-events-none transform -rotate-6">
          Crimea
        </div>
        <div class="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-[#3d372c]">
          <img src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80" alt="Crimea" class="w-full h-[380px] object-cover transition-transform duration-700 group-hover:scale-105" />
          <div class="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#c5a059]/40 text-[#c5a059] font-oswald text-xs font-bold">
            ??????? 02
          </div>
          <div class="absolute bottom-4 right-4 bg-[#c5a059] text-black font-oswald text-xs px-3 py-1 rounded-full font-bold">
            1,545 m
          </div>
        </div>
      </div>
      <div class="w-full lg:w-1/2 space-y-5">
        <div class="font-caveat text-2xl text-[#e4c88a]">??????? #02</div>
        <h3 class="font-oswald text-3xl font-bold uppercase tracking-wide text-white leading-tight">
          ????? ?? ??????? ?????
        </h3>
        <div class="space-y-2.5 pt-2 font-light text-sm text-gray-300">
          <div>? ????????????????? ?????? ????????: 7 ????</div>
          <div>? ???? ??????: 15-22 ????????</div>
          <div>? ????? ????? ????? ????????: ????? 45 ??</div>
        </div>
        <div class="pt-4">
          <button class="px-6 py-3 bg-gradient-to-r from-[#c5a059] to-[#96793f] text-black font-oswald uppercase font-bold text-xs tracking-widest rounded-lg transition shadow-lg hover:brightness-110">
            ????????? ? ???????? ?
          </button>
        </div>
      </div>
    </article>
  </section>

  <footer class="border-t border-[#332e25] bg-[#141311] py-8 text-center text-xs font-mono text-gray-500">
    <p>? 2026 ????????? ?? ??????. ??? ????? ????????.</p>
  </footer>
</body>
</html>`;
}
