import React, { useState } from 'react';
import {
  Type,
  Sparkles,
  Search,
  Check,
  CheckCircle2,
  Sliders,
  X,
  Layers,
  Zap,
  ArrowRight,
  Eye,
  Crown,
  Compass,
  MapPin,
  Calendar,
  Phone,
  AlertCircle,
  Columns
} from 'lucide-react';

export const LUXURY_EXPEDITION_PRESETS = [
  {
    id: 'belmond-luxury',
    name: 'Belmond / Condé Nast Luxury',
    tagline: 'High-Fashion Bodoni Moda + Royal Pinyon Script + Tenor Sans Micro-Labels',
    badge: '👑 Ultra-Luxury Editorial',
    headlineFont: "'Bodoni Moda', 'Playfair Display', serif",
    headlineClass: "font-['Bodoni_Moda',serif] font-normal tracking-[0.14em] uppercase",
    cursiveFont: "'Pinyon Script', cursive",
    cursiveClass: "font-['Pinyon_Script',cursive] text-3xl md:text-4xl text-[#fff1dc] italic",
    formHeadingFont: "'Italiana', serif",
    formHeadingClass: "font-['Italiana',serif] tracking-[0.24em] uppercase font-light",
    formLabelFont: "'Tenor Sans', sans-serif",
    formLabelClass: "font-['Tenor_Sans',sans-serif] text-[9.5px] uppercase tracking-[0.28em] text-[#8a8070] font-semibold",
    formValueFont: "'Bodoni Moda', serif",
    formValueClass: "font-['Bodoni_Moda',serif] text-sm font-semibold tracking-wide text-[#1c1a17]",
    buttonFont: "'Cinzel', serif",
    buttonClass: "font-['Cinzel',serif] tracking-[0.22em] font-bold text-xs uppercase py-3.5 px-5 bg-gradient-to-r from-[#9e3d30] to-[#782317] text-[#fff8ee] shadow-lg rounded-xl",
    cardWatermarkFont: "'Italiana', serif",
    whyLuxury: 'Bodoni Moda ki razor-sharp hairline serifs aur Tenor Sans ki wide tracking (0.28em) Vogue aur luxury travel monographs ka universal standard hain.'
  },
  {
    id: 'aman-alpine',
    name: 'Aman Resorts / Alpine Heritage',
    tagline: 'Chiseled Roman Cinzel + Alex Brush Calligraphy + Gilded Hairlines',
    badge: '🏔️ Alpine Aristocracy',
    headlineFont: "'Cinzel', serif",
    headlineClass: "font-['Cinzel',serif] font-bold tracking-[0.2em] uppercase",
    cursiveFont: "'Alex Brush', cursive",
    cursiveClass: "font-['Alex_Brush',cursive] text-3xl md:text-4xl text-[#faecd5]",
    formHeadingFont: "'Cinzel', serif",
    formHeadingClass: "font-['Cinzel',serif] tracking-[0.2em] uppercase font-bold",
    formLabelFont: "'Plus Jakarta Sans', sans-serif",
    formLabelClass: "font-['Plus_Jakarta_Sans',sans-serif] text-[9.5px] uppercase tracking-[0.24em] text-[#8a8070] font-semibold",
    formValueFont: "'Cinzel', serif",
    formValueClass: "font-['Cinzel',serif] text-sm font-bold tracking-wider text-[#1c1a17]",
    buttonFont: "'Cinzel', serif",
    buttonClass: "font-['Cinzel',serif] tracking-[0.25em] font-bold text-xs uppercase py-3.5 px-5 border-2 border-[#c5a059] bg-[#1a1714] text-[#e4c88a] shadow-glow rounded-xl",
    cardWatermarkFont: "'Cinzel', serif",
    whyLuxury: 'Roman monumental proportions mountain cliffs par chheni se tarashi hui lagti hain. Pure stone carvings vibe jo ultra-luxury alpine chalets use karte hain.'
  },
  {
    id: 'awwwards-vanguard',
    name: 'Awwwards 2026 Vanguard',
    tagline: 'Syne Extended Display + Cormorant Garamond Serif + Swiss Monospace',
    badge: '⚡ Awwwards Site of the Day',
    headlineFont: "'Syne', sans-serif",
    headlineClass: "font-['Syne',sans-serif] font-extrabold tracking-[0.04em] uppercase",
    cursiveFont: "'Cormorant Garamond', serif",
    cursiveClass: "font-['Cormorant_Garamond',serif] italic text-2xl md:text-3xl text-[#faecd5]",
    formHeadingFont: "'Syne', sans-serif",
    formHeadingClass: "font-['Syne',sans-serif] tracking-[0.15em] uppercase font-extrabold",
    formLabelFont: "'JetBrains Mono', monospace",
    formLabelClass: "font-mono text-[9px] uppercase tracking-[0.3em] text-[#7a8599] font-medium",
    formValueFont: "'Syne', sans-serif",
    formValueClass: "font-['Syne',sans-serif] text-xs font-bold tracking-wider text-[#1c1a17]",
    buttonFont: "'Syne', sans-serif",
    buttonClass: "font-['Syne',sans-serif] tracking-[0.18em] font-extrabold text-xs uppercase py-3.5 px-5 bg-white text-black hover:bg-[#c5a059] shadow-xl rounded-xl",
    cardWatermarkFont: "'Syne', sans-serif",
    whyLuxury: 'Modern European avant-garde studios geometric wide-stance typography use karte hain jo commercial corporate sites se 100 guna zyada contemporary lagti hai.'
  },
  {
    id: 'vogue-couture',
    name: 'Vogue & Harper’s Bazaar Couture',
    tagline: 'Playfair Display High-Contrast Italic + Marck Script Accent',
    badge: '🇮🇹 Milano Couture',
    headlineFont: "'Playfair Display', serif",
    headlineClass: "font-['Playfair_Display',serif] font-black italic tracking-[0.06em]",
    cursiveFont: "'Marck Script', cursive",
    cursiveClass: "font-['Marck_Script',cursive] text-2xl md:text-3xl text-[#faecd5]",
    formHeadingFont: "'Playfair Display', serif",
    formHeadingClass: "font-['Playfair_Display',serif] tracking-[0.16em] uppercase font-bold",
    formLabelFont: "'Tenor Sans', sans-serif",
    formLabelClass: "font-['Tenor_Sans',sans-serif] text-[9.5px] uppercase tracking-[0.25em] text-[#8a8070] font-semibold",
    formValueFont: "'Playfair Display', serif",
    formValueClass: "font-['Playfair_Display',serif] text-sm font-semibold tracking-wide text-[#1c1a17]",
    buttonFont: "'Tenor Sans', sans-serif",
    buttonClass: "font-['Tenor_Sans',sans-serif] tracking-[0.24em] font-bold text-xs uppercase py-3.5 px-5 border-2 border-[#1c1a17] hover:bg-[#1c1a17] hover:text-white transition-all rounded-xl",
    cardWatermarkFont: "'Playfair Display', serif",
    whyLuxury: 'Dramatic thick-to-thin contrast (Didone anatomy) jo vintage Italian fashion house travel monographs mein use hota hai.'
  }
];

export const TYPOGRAPHY_STYLES_31 = [
  {
    id: 'editorial',
    number: '01',
    name: 'Editorial Typography',
    nameUrdu: 'Magazine jaisa sophisticated text arrangement',
    category: 'Editorial & Magazine',
    badge: 'Magazine Luxury',
    font: 'Cormorant Garamond, serif',
    desc: 'Sophisticated magazine layout with italic accents, proportional leading, and refined serif aesthetics.',
    sample: '« Открой неизведанное, а не просто путь »',
    previewType: 'editorial'
  },
  {
    id: 'oversized',
    number: '02',
    name: 'Oversized Typography',
    nameUrdu: 'Bohat bada headline',
    category: 'High Impact & Display',
    badge: 'Hero Display',
    font: 'Oswald, sans-serif',
    desc: 'Massive, screen-filling headlines designed to immediately dominate visual hierarchy.',
    sample: 'ЭЛЬБРУС',
    previewType: 'oversized'
  },
  {
    id: 'kinetic',
    number: '03',
    name: 'Kinetic Typography',
    nameUrdu: 'Moving / Animated text',
    category: 'Kinetic & Movement',
    badge: 'Live Motion',
    font: 'Oswald, sans-serif',
    desc: 'Text that moves dynamically across viewport, shifting opacity or floating smoothly.',
    sample: 'EXPEDITION ✦ ЭКСПЕДИЦИЯ ✦ EXPEDITION',
    previewType: 'kinetic'
  },
  {
    id: 'stacked',
    number: '04',
    name: 'Stacked Typography',
    nameUrdu: 'Words ko vertically/lines mein stack karna',
    category: 'High Impact & Display',
    badge: 'Graphic Layout',
    font: 'Oswald, sans-serif',
    desc: 'Multi-line dense vertical word stacking with ultra-tight leading (line-height: 0.85).',
    sample: 'ТУРПОХОДЫ\nПО РОССИИ\nЭКСПЕДИЦИЯ',
    previewType: 'stacked'
  },
  {
    id: 'split',
    number: '05',
    name: 'Split Typography',
    nameUrdu: 'Heading ko 2 visual parts mein divide karna',
    category: 'High Impact & Display',
    badge: 'Two-Tone',
    font: 'Oswald, sans-serif',
    desc: 'Heading split into dual contrasting visual treatments (e.g. solid white + outlined gold).',
    sample: 'ТУРПОХОДЫ // РОССИИ',
    previewType: 'split'
  },
  {
    id: 'layered',
    number: '06',
    name: 'Layered Typography',
    nameUrdu: 'Text overlapping / layering',
    category: 'Artistic & Layered',
    badge: 'Visual Depth',
    font: 'Cinzel, serif',
    desc: 'Text placed in distinct visual z-layers, overlapping imagery and ambient background glows.',
    sample: 'MOUNTAIN PEAK 5642',
    previewType: 'layered'
  },
  {
    id: 'outline',
    number: '07',
    name: 'Outline Typography',
    nameUrdu: 'Hollow / outlined letters',
    category: 'High Impact & Display',
    badge: 'Hollow Stroke',
    font: 'Oswald, sans-serif',
    desc: 'Letters with transparent fill and crisp high-contrast golden/white stroke borders.',
    sample: 'WILD EXPEDITION',
    previewType: 'outline'
  },
  {
    id: 'vertical',
    number: '08',
    name: 'Vertical Typography',
    nameUrdu: 'Text vertically oriented',
    category: 'Editorial & Magazine',
    badge: 'Asian & Modern',
    font: 'Oswald, sans-serif',
    desc: 'Text oriented vertically (writing-mode: vertical-rl) used for artistic margin accents.',
    sample: 'ТУР КЛУБ 2026',
    previewType: 'vertical'
  },
  {
    id: 'rotated',
    number: '09',
    name: 'Rotated Typography',
    nameUrdu: 'Text ko angle / 90° par place karna',
    category: 'Artistic & Layered',
    badge: 'Angled Display',
    font: 'Oswald, sans-serif',
    desc: 'Rotated at 90° or subtle angles (-12° or -90°) to break grid monotony.',
    sample: 'ELBRUS TRAIL',
    previewType: 'rotated'
  },
  {
    id: 'masked',
    number: '10',
    name: 'Masked Typography',
    nameUrdu: 'Image / texture ke andar text',
    category: 'Artistic & Layered',
    badge: 'Photo Mask',
    font: 'Oswald, sans-serif',
    desc: 'High-contrast text masked with background mountain photography (background-clip: text).',
    sample: 'KAVKAZ',
    previewType: 'masked'
  },
  {
    id: 'text-as-image',
    number: '11',
    name: 'Text-as-Image',
    nameUrdu: 'Typography ko main visual element banana',
    category: 'Artistic & Layered',
    badge: 'Architectural',
    font: 'Cinzel, serif',
    desc: 'Gigantic letters acting as the background architectural landscape and graphic texture.',
    sample: 'ALTAI',
    previewType: 'text-as-image'
  },
  {
    id: 'type-on-path',
    number: '12',
    name: 'Type-on-Path',
    nameUrdu: 'Curved / shape ke along text',
    category: 'Kinetic & Movement',
    badge: 'SVG Curvature',
    font: 'Plus Jakarta Sans, sans-serif',
    desc: 'Text curving organically along circular badges or undulating mountain trail paths.',
    sample: '✦ DISCOVER THE UNCHARTED WILD ✦ MOUNTAIN CLUB ✦',
    previewType: 'type-on-path'
  },
  {
    id: 'marquee',
    number: '13',
    name: 'Marquee Typography',
    nameUrdu: 'Horizontally moving / repeating text',
    category: 'Kinetic & Movement',
    badge: 'Infinite Flow',
    font: 'Oswald, sans-serif',
    desc: 'Seamless 60fps horizontal kinetic ticker repeating key mountain destinations.',
    sample: 'ЭЛЬБРУС • КРЫМ • АЛТАЙ • БАЙКАЛ • КАМЧАТКА',
    previewType: 'marquee'
  },
  {
    id: 'monumental',
    number: '14',
    name: 'Monumental Typography',
    nameUrdu: 'Huge, architectural-looking type',
    category: 'High Impact & Display',
    badge: 'Monumental',
    font: 'Cinzel, serif',
    desc: 'Heavy, chiseled Roman architectural uppercase type with wide ceremonial tracking.',
    sample: 'MONUMENTA RUSSIA',
    previewType: 'monumental'
  },
  {
    id: 'micro',
    number: '15',
    name: 'Micro Typography',
    nameUrdu: 'Tiny refined labels / text',
    category: 'Editorial & Magazine',
    badge: 'Swiss Refined',
    font: 'JetBrains Mono, monospace',
    desc: 'Tiny refined sub-labels (9px–11px) with extreme letter spacing (0.35em) for ultra-luxury polish.',
    sample: 'LAT. 43.3499° N • ELEVATION 5,642 M • EXPEDITION DEPT',
    previewType: 'micro'
  },
  {
    id: 'condensed',
    number: '16',
    name: 'Condensed Typography',
    nameUrdu: 'Narrow, compressed type treatment',
    category: 'High Impact & Display',
    badge: 'Compressed',
    font: 'Oswald, sans-serif',
    desc: 'Ultra-compressed letterforms that maximize impact in compact horizontal widths.',
    sample: 'ВОСХОЖДЕНИЕ',
    previewType: 'condensed'
  },
  {
    id: 'justified-editorial',
    number: '17',
    name: 'Justified Editorial',
    nameUrdu: 'Newspaper-style aligned paragraphs',
    category: 'Editorial & Magazine',
    badge: 'Broadsheet',
    font: 'Cormorant Garamond, serif',
    desc: 'Strict left-and-right justified paragraphs creating razor-sharp rectangular text blocks.',
    sample: 'Пешие походы по горным хребтам открывают подлинную красоту дикой природы Кавказа и Крыма.',
    previewType: 'justified-editorial'
  },
  {
    id: 'column',
    number: '18',
    name: 'Column Typography',
    nameUrdu: 'Multiple editorial columns',
    category: 'Editorial & Magazine',
    badge: 'Multi-Column',
    font: 'Plus Jakarta Sans, sans-serif',
    desc: 'Magazine-style split dual column text arrangement with vertical separator rules.',
    sample: 'Маршрут 9 дней // Подготовка гидов // Снаряжение',
    previewType: 'column'
  },
  {
    id: 'asymmetric',
    number: '19',
    name: 'Asymmetric Typography',
    nameUrdu: 'Intentionally uneven / offset staggered',
    category: 'Modern & Experimental',
    badge: 'Awwwards 2026',
    font: 'Playfair Display, serif',
    desc: 'Intentionally staggered margins and un-aligned lines creating high-fashion editorial tension.',
    sample: 'ТУР\n      ПОХОДЫ\n   РОССИИ',
    previewType: 'asymmetric'
  },
  {
    id: 'brutalist',
    number: '20',
    name: 'Brutalist Typography',
    nameUrdu: 'Raw, unpolished high-contrast monospace',
    category: 'Modern & Experimental',
    badge: 'Neo-Brutalist',
    font: 'JetBrains Mono, monospace',
    desc: 'Raw, direct, unembellished monospace letterforms with harsh borders and high contrast.',
    sample: '[01_ROUTE_ELBRUS.EXE] // 5642M',
    previewType: 'brutalist'
  },
  {
    id: 'high-contrast-serif',
    number: '21',
    name: 'High-Contrast Serif',
    nameUrdu: 'Didone / Bodoni style sharp contrast',
    category: 'Editorial & Magazine',
    badge: 'Vogue / Luxury',
    font: 'Playfair Display, serif',
    desc: 'Extreme contrast between hairline thins and bold thick vertical stems.',
    sample: 'Grand Expedition',
    previewType: 'high-contrast-serif'
  },
  {
    id: 'glitch',
    number: '22',
    name: 'Glitch / Chromatic Typography',
    nameUrdu: 'Digital glitch & chromatic shift',
    category: 'Modern & Experimental',
    badge: 'Cyber Glitch',
    font: 'Oswald, sans-serif',
    desc: 'Subtle RGB chromatic aberration and digital horizontal offset slice effect.',
    sample: 'ELBRUS GLITCH',
    previewType: 'glitch'
  },
  {
    id: 'glassmorphism',
    number: '23',
    name: 'Glassmorphism Typography',
    nameUrdu: 'Frosted glass text backdrop',
    category: 'Artistic & Layered',
    badge: 'Aero Glass',
    font: 'Plus Jakarta Sans, sans-serif',
    desc: 'Text contained within frosted translucent glass plates with glowing white rim borders.',
    sample: '🏔️ АЛТАЙ 2026',
    previewType: 'glassmorphism'
  },
  {
    id: 'neon-glow',
    number: '24',
    name: 'Neon Glow Typography',
    nameUrdu: 'Luminous vibrant multi-layer glow',
    category: 'High Impact & Display',
    badge: 'Golden Neon',
    font: 'Cinzel, serif',
    desc: 'Multi-stage text-shadow aura that radiates a warm golden neon glow into the background.',
    sample: 'ЗОЛОТОЕ КОЛЬЦО',
    previewType: 'neon-glow'
  },
  {
    id: '3d-extruded',
    number: '25',
    name: '3D Extruded Typography',
    nameUrdu: 'Isometric 3D multi-layered depth',
    category: 'High Impact & Display',
    badge: '3D Extruded',
    font: 'Oswald, sans-serif',
    desc: 'Layered directional drop shadows simulating physical 3D blocks carved into stone.',
    sample: 'КРЫМ 3D',
    previewType: '3d-extruded'
  },
  {
    id: 'gradient',
    number: '26',
    name: 'Metallic Gradient Typography',
    nameUrdu: 'Metallic gold / bronze gradient fill',
    category: 'Artistic & Layered',
    badge: 'Liquid Gold',
    font: 'Cinzel, serif',
    desc: 'Text filled with a luxurious linear gradient from pale champagne gold to rich bronze.',
    sample: 'ROYAL EXPEDITIONS',
    previewType: 'gradient'
  },
  {
    id: 'monogram-dropcap',
    number: '27',
    name: 'Monogram & Drop Cap',
    nameUrdu: 'Large decorative initial drop cap',
    category: 'Editorial & Magazine',
    badge: 'Drop Cap',
    font: 'Cinzel, serif',
    desc: 'A grand 3-line tall historical drop cap introducing the narrative adventure story.',
    sample: 'Э тот поход изменит ваше представление о горах навсегда.',
    previewType: 'monogram-dropcap'
  },
  {
    id: 'variable-spacing',
    number: '28',
    name: 'Variable Wide Letter-Spacing',
    nameUrdu: 'Dynamically spaced breathing typography',
    category: 'Modern & Experimental',
    badge: 'Air & Space',
    font: 'Plus Jakarta Sans, sans-serif',
    desc: 'Ultra-wide airy tracking (0.45em) creating cinematic spatial elegance.',
    sample: 'E X P E D I T I O N',
    previewType: 'variable-spacing'
  },
  {
    id: 'cursive-signature',
    number: '29',
    name: 'Cursive Handscript / Signature',
    nameUrdu: 'Expressive handwritten calligraphy accent',
    category: 'Editorial & Magazine',
    badge: 'Signature',
    font: 'Pinyon Script, cursive',
    desc: 'Emotional handwritten script paired as an artistic accent next to bold sans titles.',
    sample: '«Открой неизведанное, а не просто путь»',
    previewType: 'cursive-signature'
  },
  {
    id: 'tape-highlight',
    number: '30',
    name: 'Tape / Highlight Typography',
    nameUrdu: 'Marker highlight or label tape background',
    category: 'Modern & Experimental',
    badge: 'Tape Marker',
    font: 'Oswald, sans-serif',
    desc: 'Text highlighted with colored sticker tape backing like vintage field trail journals.',
    sample: 'ВЫБОР МАРШРУТА',
    previewType: 'tape-highlight'
  },
  {
    id: 'cyberpunk-hud',
    number: '31',
    name: 'Cyberpunk HUD Coordinate Typography',
    nameUrdu: 'Tactical coordinate data typography',
    category: 'Modern & Experimental',
    badge: 'Tactical HUD',
    font: 'JetBrains Mono, monospace',
    desc: 'Tactical expedition HUD typography with brackets, coordinates, and system metrics.',
    sample: '[SYS_ALT: 5642M] :: LOC_ELBRUS // OK',
    previewType: 'cyberpunk-hud'
  }
];

export const Typography31Modal = ({
  isOpen,
  onClose,
  activeStyleId = 'belmond-luxury',
  onSelectStyle,
  onApplyStyleToSite
}) => {
  const [modalTab, setModalTab] = useState('luxury-guide'); // 'luxury-guide' | 'all-31-styles'
  const [selectedPresetId, setSelectedPresetId] = useState('belmond-luxury');
  const [compareMode, setCompareMode] = useState('luxury'); // 'luxury' | 'cheap-vs-luxury'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [fontSizeScale, setFontSizeScale] = useState(36); // in px

  if (!isOpen) return null;

  const currentPreset =
    LUXURY_EXPEDITION_PRESETS.find((p) => p.id === selectedPresetId) ||
    LUXURY_EXPEDITION_PRESETS[0];

  const categories = [
    'all',
    'Editorial & Magazine',
    'High Impact & Display',
    'Kinetic & Movement',
    'Artistic & Layered',
    'Modern & Experimental'
  ];

  const filteredStyles = TYPOGRAPHY_STYLES_31.filter((style) => {
    const matchesCat = selectedCategory === 'all' || style.category === selectedCategory;
    const matchesSearch =
      style.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      style.nameUrdu.toLowerCase().includes(searchTerm.toLowerCase()) ||
      style.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      style.badge.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleApplyPreset = (preset) => {
    setSelectedPresetId(preset.id);
    if (onSelectStyle) onSelectStyle(preset.id);
    if (onApplyStyleToSite) onApplyStyleToSite(preset);
  };

  const handleApplyStyle = (style) => {
    if (onSelectStyle) onSelectStyle(style.id);
    if (onApplyStyleToSite) onApplyStyleToSite(style);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-5 select-none animate-fadeIn">
      <div className="relative w-full max-w-6xl bg-[#101218] border border-[#2b3040] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Main Header with Tab Switcher */}
        <header className="px-6 py-4 border-b border-[#232735] flex items-center justify-between bg-[#141722]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c5a059] to-[#8c6d32] flex items-center justify-center text-black shadow-glow font-bold">
              <Crown className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="font-serif text-base font-semibold text-white flex items-center space-x-2">
                <span>Luxury Typography Architecture & Form Guide</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#c5a059]/20 text-[#e4c88a] border border-[#c5a059]/40">
                  Curated Haute Editorial
                </span>
              </h2>
              <p className="font-mono text-[10px] text-gray-400">
                How to eliminate cheap-looking typography and achieve multi-million-dollar luxury travel magazine aesthetics
              </p>
            </div>
          </div>

          {/* Navigation View Tabs */}
          <div className="flex items-center space-x-2 bg-[#0d0f15] p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setModalTab('luxury-guide')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-sans transition ${
                modalTab === 'luxury-guide'
                  ? 'bg-[#c5a059] text-black font-bold shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Luxury Form Guide & Presets</span>
            </button>
            <button
              onClick={() => setModalTab('all-31-styles')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-sans transition ${
                modalTab === 'all-31-styles'
                  ? 'bg-[#c5a059] text-black font-bold shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>All 31 Styles Grid</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition ml-2"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* TAB 1: LUXURY FORM TYPOGRAPHY GUIDE & PRESETS */}
        {modalTab === 'luxury-guide' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0c0d12]">
            {/* 1. WHY CHEAP VS HOW LUXURY IS BORN BANNER */}
            <div className="bg-gradient-to-r from-[#171b26] via-[#1d2232] to-[#171b26] border border-[#c5a059]/40 rounded-2xl p-5 shadow-xl">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#c5a059]/20 text-[#f5ebd7] border border-[#c5a059]/40 uppercase">
                      The Luxury Typography Formula
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      (Aapke Sawal Ka Jawab: "Fonts cheap lagte hain, luxury feel kesy aye gii?")
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    5 Secrets Jo Cheap Wireframe ko High-End Editorial Travel Magazine Banate Hain
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs text-gray-300">
                    <div className="bg-black/30 p-2.5 rounded-lg border border-white/5 space-y-1">
                      <strong className="text-rose-400 block">❌ Cheap / Generic Lagny Ki Wajah:</strong>
                      <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                        Default sans-serif (Arial/plain Oswald), har jagah aik jaisi weight, form labels mein zero letter-spacing, aur flat rectangular dropdown borders.
                      </p>
                    </div>
                    <div className="bg-black/30 p-2.5 rounded-lg border border-white/5 space-y-1">
                      <strong className="text-emerald-400 block">✅ Luxury Magazine Feel Ki Wajah:</strong>
                      <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                        <strong>Bodoni Moda / Italiana</strong> (hairline serifs), <strong>Tenor Sans</strong> micro-labels (wide 0.28em tracking), <strong>Pinyon Script</strong> (royal fountain pen signature), aur warm Italian bone-ivory palette.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Compare Mode Toggle */}
                <div className="flex flex-col items-end space-y-2">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                    Form Visual Test:
                  </span>
                  <div className="flex items-center bg-[#0e1017] p-1 rounded-xl border border-white/10">
                    <button
                      onClick={() => setCompareMode('luxury')}
                      className={`px-3 py-1 rounded-lg text-xs font-sans transition ${
                        compareMode === 'luxury'
                          ? 'bg-[#c5a059] text-black font-bold shadow-sm'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      👑 View Luxury Standard
                    </button>
                    <button
                      onClick={() => setCompareMode('cheap-vs-luxury')}
                      className={`px-3 py-1 rounded-lg text-xs font-sans transition ${
                        compareMode === 'cheap-vs-luxury'
                          ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      ⚖️ Side-by-Side (Cheap vs Luxury)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. INTERACTIVE LIVE FORM REPLICA SANDBOX */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-sm font-semibold text-white flex items-center space-x-2">
                  <span>Interactive Route Selector Form & Hero Typography Live Preview</span>
                  <span className="text-[10px] font-mono text-[#c5a059] px-2 py-0.5 rounded bg-[#c5a059]/10">
                    Preset: {currentPreset.name}
                  </span>
                </h4>
                <button
                  onClick={() => handleApplyPreset(currentPreset)}
                  className="px-4 py-1.5 bg-gradient-to-r from-[#c5a059] to-[#96793f] hover:brightness-110 text-black font-bold text-xs rounded-lg transition shadow-glow flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                  <span>Apply This Luxury Preset to Live Site</span>
                </button>
              </div>

              {/* LIVE FORM SIMULATION CONTAINER */}
              <div className="bg-[#1a1c24] border border-[#2b3040] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                {/* Simulated Hero Snippet */}
                <div className="text-center py-6 border-b border-white/5 bg-[#252a28]/60 rounded-xl mb-6 relative overflow-hidden">
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-[0.3em] block mb-2">
                    Hero Headline Treatment
                  </span>
                  {compareMode === 'cheap-vs-luxury' ? (
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-black/40 rounded-lg border border-red-500/30">
                        <span className="text-[10px] font-mono text-red-400 block mb-1">❌ Cheap / Generic Font:</span>
                        <h2 className="font-sans text-xl font-bold uppercase tracking-tight text-white">
                          ТУРПОХОДЫ ПО РОССИИ
                        </h2>
                        <p className="font-sans text-xs text-gray-400 mt-1 italic">
                          «Открой неизведанное, а не просто путь»
                        </p>
                      </div>
                      <div className="p-3 bg-black/40 rounded-lg border border-emerald-500/30">
                        <span className="text-[10px] font-mono text-emerald-400 block mb-1">✅ Luxury High-Fashion:</span>
                        <h2 className={`${currentPreset.headlineClass} text-2xl text-white drop-shadow-lg`}>
                          ТУРПОХОДЫ ПО РОССИИ
                        </h2>
                        <p className={`${currentPreset.cursiveClass} mt-1`}>
                          «Открой неизведанное, а не просто путь»
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className={`${currentPreset.headlineClass} text-3xl md:text-5xl text-white drop-shadow-xl`}>
                        ТУРПОХОДЫ ПО РОССИИ
                      </h2>
                      <p className={`${currentPreset.cursiveClass} mt-2`}>
                        «Открой неизведанное, а не просто путь»
                      </p>
                    </div>
                  )}
                </div>

                {/* Simulated «ВЫБОР МАРШРУТА» Form */}
                <div className="max-w-4xl mx-auto text-center space-y-4">
                  <div>
                    <h3 className={`${currentPreset.formHeadingClass} text-2xl text-[#f5ebd7] tracking-[0.24em]`}>
                      ВЫБОР МАРШРУТА
                    </h3>
                    <div className="w-16 h-0.5 bg-[#c5a059]/60 mx-auto mt-2" />
                  </div>

                  {/* The Actual Form Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center bg-[#faf8f4] p-3.5 rounded-2xl border border-[#d8d0c2] shadow-2xl text-left">
                    {/* Col 1 */}
                    <div className="border-b sm:border-b-0 sm:border-r border-[#e0d8c8] px-3 py-1.5">
                      <span className={currentPreset.formLabelClass}>
                        Куда // Destination
                      </span>
                      <div className={`flex items-center justify-between ${currentPreset.formValueClass}`}>
                        <span>Кавказ (Эльбрус)</span>
                        <MapPin className="w-4 h-4 text-[#a87954] ml-1" />
                      </div>
                    </div>

                    {/* Col 2 */}
                    <div className="border-b sm:border-b-0 sm:border-r border-[#e0d8c8] px-3 py-1.5">
                      <span className={currentPreset.formLabelClass}>
                        Пеший поход // Trek Type
                      </span>
                      <div className={`flex items-center justify-between ${currentPreset.formValueClass}`}>
                        <span>Пеший поход</span>
                        <Compass className="w-4 h-4 text-[#a87954] ml-1" />
                      </div>
                    </div>

                    {/* Col 3 */}
                    <div className="border-b sm:border-b-0 sm:border-r border-[#e0d8c8] px-3 py-1.5">
                      <span className={currentPreset.formLabelClass}>
                        Месяц // Month
                      </span>
                      <div className={`flex items-center justify-between ${currentPreset.formValueClass}`}>
                        <span>Сентябрь 2026</span>
                        <Calendar className="w-4 h-4 text-[#a87954] ml-1" />
                      </div>
                    </div>

                    {/* Col 4: Button */}
                    <div className="p-1">
                      <button className={`w-full ${currentPreset.buttonClass} transition hover:brightness-110 flex items-center justify-center space-x-1.5`}>
                        <span>ПОДОБРАТЬ ТУР</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. THE 4 GRAND LUXURY PRESETS PICKER */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-semibold text-white">
                Choose from 4 Curated Haute Luxury Presets for this Adventure Form:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {LUXURY_EXPEDITION_PRESETS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;

                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleApplyPreset(preset)}
                      className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 group ${
                        isSelected
                          ? 'bg-[#181d2c] border-[#c5a059] shadow-glow ring-1 ring-[#c5a059]'
                          : 'bg-[#12141c] border-white/5 hover:border-white/20 hover:bg-[#151822]'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="font-serif font-bold text-base text-white group-hover:text-[#e4c88a] transition-colors">
                            {preset.name}
                          </h5>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#c5a059]/15 text-[#e4c88a] border border-[#c5a059]/30">
                            {preset.badge}
                          </span>
                        </div>
                        <p className="text-xs text-amber-200/90 font-mono">
                          {preset.tagline}
                        </p>
                        <p className="text-xs text-gray-300 font-light leading-relaxed">
                          {preset.whyLuxury}
                        </p>
                      </div>

                      {/* Font pairing tags */}
                      <div className="pt-3 border-t border-white/5 flex flex-wrap gap-2 text-[10px] font-mono">
                        <span className="px-2 py-1 rounded bg-black/40 text-gray-300">
                          Headline: <strong className="text-white">{preset.headlineFont}</strong>
                        </span>
                        <span className="px-2 py-1 rounded bg-black/40 text-gray-300">
                          Cursive: <strong className="text-white">{preset.cursiveFont}</strong>
                        </span>
                        <span className="px-2 py-1 rounded bg-black/40 text-gray-300">
                          Form Labels: <strong className="text-white">{preset.formLabelFont} (0.28em)</strong>
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApplyPreset(preset);
                        }}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
                          isSelected
                            ? 'bg-[#c5a059] text-black shadow-glow'
                            : 'bg-[#1c202d] hover:bg-[#252b3d] text-gray-200 border border-white/10'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isSelected ? 'Active On Website' : 'Apply This Preset'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ALL 31 TYPOGRAPHY STYLES GRID */}
        {modalTab === 'all-31-styles' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#0d0e14]">
            {/* Action Bar: Search, Category Filter, and Size Resize Slider */}
            <div className="px-6 py-3 bg-[#131620] border-b border-[#232735] flex flex-wrap items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search 31 styles..."
                  className="w-full bg-[#0d0f15] border border-[#2b3042] text-xs text-white rounded-lg pl-9 pr-3 py-1.5 focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              {/* Interactive Font Resizer Slider */}
              <div className="flex items-center space-x-3 bg-[#0d0f15] px-3.5 py-1.5 rounded-xl border border-[#2b3042]">
                <Sliders className="w-3.5 h-3.5 text-[#c5a059]" />
                <span className="text-[11px] font-mono text-gray-300">
                  Font Scale: <strong className="text-[#e4c88a]">{fontSizeScale}px</strong>
                </span>
                <input
                  type="range"
                  min="18"
                  max="72"
                  value={fontSizeScale}
                  onChange={(e) => setFontSizeScale(Number(e.target.value))}
                  className="w-28 accent-[#c5a059] cursor-pointer"
                />
                <div className="flex items-center space-x-1 pl-1">
                  <button
                    onClick={() => setFontSizeScale(24)}
                    className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 hover:bg-white/15 text-gray-300"
                  >
                    S
                  </button>
                  <button
                    onClick={() => setFontSizeScale(36)}
                    className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 hover:bg-white/15 text-gray-300"
                  >
                    M
                  </button>
                  <button
                    onClick={() => setFontSizeScale(54)}
                    className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 hover:bg-white/15 text-gray-300"
                  >
                    XL
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="flex items-center space-x-1 bg-[#0e1017] p-1 rounded-xl border border-white/5 text-xs overflow-x-auto max-w-full">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg capitalize transition font-sans whitespace-nowrap text-[11px] ${
                      selectedCategory === cat
                        ? 'bg-[#c5a059] text-black font-bold shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat === 'all' ? 'All (31)' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 31 Styles Grid Container */}
            <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStyles.map((style) => {
                const isSelected = activeStyleId === style.id;

                return (
                  <div
                    key={style.id}
                    onClick={() => handleApplyStyle(style)}
                    className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between space-y-3 cursor-pointer group ${
                      isSelected
                        ? 'bg-[#161a28] border-[#c5a059] shadow-glow ring-1 ring-[#c5a059]'
                        : 'bg-[#12141c] border-white/5 hover:border-white/20 hover:bg-[#151822]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-[#c5a059]">
                          #{style.number}
                        </span>
                        <h4 className="font-sans font-bold text-xs text-white group-hover:text-[#e4c88a] transition-colors">
                          {style.name}
                        </h4>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/5 text-gray-400 border border-white/5">
                        {style.badge}
                      </span>
                    </div>

                    <p className="text-[11px] text-amber-200/90 font-mono italic">
                      « {style.nameUrdu} »
                    </p>

                    <div className="p-3 bg-[#0a0b0f] rounded-lg border border-white/5 min-h-[90px] flex items-center justify-center overflow-hidden">
                      <div className="font-serif text-white font-bold text-base">
                        {style.sample}
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-400 font-light line-clamp-2">
                      {style.desc}
                    </p>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400">
                      <span className="text-[#c5a059]">{style.category}</span>
                      <span className={isSelected ? 'text-emerald-400 font-bold' : 'text-gray-400'}>
                        {isSelected ? '✓ Active' : 'Click to Apply'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="px-6 py-3.5 bg-[#141722] border-t border-[#232735] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-gray-300">
            <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
            <span className="font-mono text-[#e4c88a]">
              Active Haute Luxury Preset: {currentPreset.name}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-[#c5a059] to-[#96793f] hover:brightness-110 text-black font-bold rounded-lg transition shadow-glow flex items-center space-x-1.5"
          >
            <span>View Website</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </footer>
      </div>
    </div>
  );
};
