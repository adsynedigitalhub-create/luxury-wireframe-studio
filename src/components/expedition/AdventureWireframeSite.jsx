import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  Phone,
  ArrowRight,
  ArrowDown,
  Sparkles,
  Edit3,
  Globe,
  Smartphone,
  Monitor,
  Columns,
  X,
  CheckCircle2,
  ChevronDown,
  Code,
  Type
} from 'lucide-react';

export const AdventureWireframeSite = ({
  onBackToCanvas,
  onOpenCodeModal,
  onOpenAnimationsModal,
  onOpenTypographyModal,
  enabledAnimations = {},
  selectedTypographyStyle = 'editorial',
  onSelectTypographyStyle
}) => {
  const [viewMode, setViewMode] = useState('side-by-side'); // 'side-by-side' | 'desktop' | 'mobile'
  const [lang, setLang] = useState('ru'); // 'ru' | 'en'
  const [isEditable, setIsEditable] = useState(false);
  const [selectedTourModal, setSelectedTourModal] = useState(null);

  // Filter Form State
  const [destinationFilter, setDestinationFilter] = useState('Кавказ (Эльбрус)');
  const [tourTypeFilter, setTourTypeFilter] = useState('Пеший поход');
  const [monthFilter, setMonthFilter] = useState('Сентябрь');

  // Tour data
  const tours = [
    {
      id: 'elbrus',
      number: '01',
      watermark: 'Elbrus',
      watermarkRu: 'Эльбрус',
      titleRu: 'ВОСХОЖДЕНИЕ НА ЭЛЬБРУС',
      titleEn: 'ASCENT TO MOUNT ELBRUS',
      durationRu: 'Продолжительность пешего маршрута: 9 дней',
      durationEn: 'Hiking route duration: 9 days',
      datesRu: 'Сбор группы: 15 сентября (баз. лагерь)',
      datesEn: 'Group gathering: September 15 (base camp)',
      lengthRu: 'Длина пешей части маршрута: около 55 км',
      lengthEn: 'Length of hiking portion: approx. 55 km',
      elevation: '5,642 m',
      difficulty: 'Hard / Alpine',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Hiker on cliff peak overlooking Elbrus'
    },
    {
      id: 'crimea',
      number: '02',
      watermark: 'Crimea',
      watermarkRu: 'Крым',
      titleRu: 'ПОХОД ПО ГОРНОМУ КРЫМУ',
      titleEn: 'TREK IN MOUNTAINOUS CRIMEA',
      durationRu: 'Продолжительность пешего маршрута: 7 дней',
      durationEn: 'Hiking route duration: 7 days',
      datesRu: 'Даты похода: 15-22 сентября',
      datesEn: 'Expedition dates: September 15–22',
      lengthRu: 'Длина пешей части маршрута: около 45 км',
      lengthEn: 'Length of hiking portion: approx. 45 km',
      elevation: '1,545 m',
      difficulty: 'Moderate / Panoramic',
      image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Two hikers around campfire at sunset'
    },
    {
      id: 'altai',
      number: '03',
      watermark: 'Altai',
      watermarkRu: 'Алтай',
      titleRu: 'ПУТЕШЕСТВИЕ ПО АЛТАЮ',
      titleEn: 'JOURNEY ACROSS ALTAI',
      durationRu: 'Продолжительность пешего маршрута: 9 дней',
      durationEn: 'Hiking route duration: 9 days',
      datesRu: 'Даты похода: 5-13 октября',
      datesEn: 'Expedition dates: October 5–13',
      lengthRu: 'Длина пешей части маршрута: около 50 км',
      lengthEn: 'Length of hiking portion: approx. 50 km',
      elevation: '3,200 m',
      difficulty: 'Wilderness / Glacial',
      image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Hikers with poles in snowy Altai mountains'
    }
  ];

  // Helper for editable text content
  const renderText = (text, customClasses = '') => {
    return (
      <span
        contentEditable={isEditable}
        suppressContentEditableWarning={true}
        className={`${customClasses} ${
          isEditable
            ? 'hover:outline-dashed hover:outline-1 hover:outline-[#c5a059] cursor-text rounded px-1'
            : ''
        }`}
      >
        {text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#1c1b18] text-[#1c1b18] flex flex-col select-none overflow-x-hidden">
      {/* Studio Top Control Bar */}
      <header className="sticky top-0 z-50 bg-[#111317]/95 backdrop-blur-md border-b border-[#2a2e39] px-6 py-3 flex items-center justify-between text-white shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c5a059] to-[#8f6e33] flex items-center justify-center font-bold text-black font-serif shadow-glow">
            🏔️
          </div>
          <div>
            <h1 className="font-serif text-sm font-semibold tracking-wider text-white flex items-center space-x-2">
              <span>ТУРПОХОДЫ ПО РОССИИ</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#c5a059]/20 text-[#e4c88a] border border-[#c5a059]/40">
                Exact Wireframe Match
              </span>
            </h1>
            <p className="font-mono text-[9px] text-gray-400">
              Pixel-perfect interactive replica of your reference wireframe
            </p>
          </div>
        </div>

        {/* View Switcher & Controls */}
        <div className="flex items-center space-x-2">
          {/* Dual Mode View Switcher */}
          {onBackToCanvas && (
            <div className="flex items-center bg-[#181b24] p-1 rounded-xl border border-[#2b303e]">
              <button
                onClick={onBackToCanvas}
                className="flex items-center space-x-1.5 px-3 py-1 text-gray-300 hover:text-white text-xs font-sans rounded-lg transition"
                title="Return to Studio Freeform Canvas"
              >
                <span>🎨</span>
                <span>Studio Canvas</span>
              </button>
              <div className="flex items-center space-x-1.5 px-3 py-1 bg-[#c5a059] text-black font-bold text-xs rounded-lg shadow-sm">
                <span>🏔️</span>
                <span>Adventure Site</span>
              </div>
            </div>
          )}

          {/* View Mode Buttons */}
          <div className="flex items-center bg-[#181b24] p-1 rounded-lg border border-[#2b303e]">
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs font-sans transition ${
                viewMode === 'side-by-side'
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Desktop & Mobile Side-by-Side (Like Reference Image)"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Side-by-Side</span>
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs font-sans transition ${
                viewMode === 'desktop'
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs font-sans transition ${
                viewMode === 'mobile'
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#181b24] hover:bg-[#202532] border border-[#2b303e] text-xs font-mono text-[#e4c88a] rounded-lg transition"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'ru' ? 'RU (Оригинал)' : 'EN (English)'}</span>
          </button>

          {/* Inline Edit Mode Toggle */}
          <button
            onClick={() => setIsEditable(!isEditable)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-sans transition border ${
              isEditable
                ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                : 'bg-[#181b24] border-[#2b303e] text-gray-400 hover:text-white'
            }`}
            title="Click any text on the website to edit directly"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditable ? 'Editing Active (Click Text)' : 'Edit Mode'}</span>
          </button>

          {/* ✨ MODERN ANIMATIONS POPUP BUTTON */}
          {onOpenAnimationsModal && (
            <button
              onClick={onOpenAnimationsModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-[#c5a059]/20 to-[#96793f]/20 hover:bg-[#c5a059] hover:text-black border border-[#c5a059]/60 text-[#f5ecd5] font-semibold rounded-lg text-xs transition shadow-sm group"
              title="Open Modern Animations Selector Popup"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059] group-hover:text-black transition-colors" />
              <span>Modern Animations</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-black/40 group-hover:bg-black/20 text-[#e4c88a] group-hover:text-black font-bold">
                Pop-up
              </span>
            </button>
          )}

          {/* ✍️ 31 TYPOGRAPHY STYLES POPUP BUTTON */}
          {onOpenTypographyModal && (
            <button
              onClick={onOpenTypographyModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:bg-[#c5a059] hover:text-black border border-[#c5a059]/60 text-[#f5ecd5] font-semibold rounded-lg text-xs transition shadow-sm group"
              title="Open 31 Typography Styles Suite (Project 3)"
            >
              <Type className="w-3.5 h-3.5 text-[#c5a059] group-hover:text-black transition-colors" />
              <span>31 Typography Styles</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-black/40 group-hover:bg-black/20 text-[#e4c88a] group-hover:text-black font-bold">
                Pop-up
              </span>
            </button>
          )}

          {/* ⚡ GENERATE CLEAN CODE BUTTON */}
          {onOpenCodeModal && (
            <button
              onClick={onOpenCodeModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500 hover:to-teal-500 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-black font-semibold rounded-lg text-xs transition shadow-md group"
              title="Compile clean production code for this website (Requires permission first)"
            >
              <Code className="w-3.5 h-3.5 text-emerald-400 group-hover:text-black transition-colors" />
              <span>Generate Code</span>
              <span className="text-[9px] font-mono px-1 rounded bg-black/40 group-hover:bg-black/20 text-emerald-300 group-hover:text-black font-bold">
                🔒
              </span>
            </button>
          )}

          {/* Back to Studio Canvas */}
          {onBackToCanvas && (
            <button
              onClick={onBackToCanvas}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#c5a059] to-[#96793f] hover:brightness-110 text-black font-bold text-xs font-sans rounded-lg transition shadow-md"
              title="Return to Studio Freeform Canvas"
            >
              <span>🎨</span>
              <span>Studio Canvas</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Exhibition Container */}
      <main className="flex-1 p-6 md:p-10 flex justify-center items-start bg-[#cfc7b6] overflow-y-auto">
        <div
          className={`w-full max-w-7xl flex ${
            viewMode === 'side-by-side'
              ? 'flex-col lg:flex-row items-start justify-center gap-10'
              : 'justify-center'
          }`}
        >
          {/* 1. DESKTOP WIREFRAME CANVAS */}
          {(viewMode === 'desktop' || viewMode === 'side-by-side') && (
            <div
              className={`bg-white rounded-sm shadow-2xl overflow-hidden border border-black/15 transition-all duration-300 ${
                viewMode === 'side-by-side' ? 'w-full lg:w-[720px] xl:w-[820px]' : 'w-full max-w-5xl'
              }`}
            >
              <DesktopWireframeView
                lang={lang}
                tours={tours}
                renderText={renderText}
                destinationFilter={destinationFilter}
                setDestinationFilter={setDestinationFilter}
                tourTypeFilter={tourTypeFilter}
                setTourTypeFilter={setTourTypeFilter}
                monthFilter={monthFilter}
                setMonthFilter={setMonthFilter}
                onSelectTour={(tour) => setSelectedTourModal(tour)}
                enabledAnimations={enabledAnimations}
                selectedTypographyStyle={selectedTypographyStyle}
              />
            </div>
          )}

          {/* 2. MOBILE WIREFRAME CANVAS */}
          {(viewMode === 'mobile' || viewMode === 'side-by-side') && (
            <div
              className={`bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-[#24272f] transition-all duration-300 ${
                viewMode === 'side-by-side' ? 'w-[320px] sm:w-[360px] flex-shrink-0' : 'w-[360px]'
              }`}
            >
              <MobileWireframeView
                lang={lang}
                tours={tours}
                renderText={renderText}
                destinationFilter={destinationFilter}
                setDestinationFilter={setDestinationFilter}
                tourTypeFilter={tourTypeFilter}
                setTourTypeFilter={setTourTypeFilter}
                monthFilter={monthFilter}
                setMonthFilter={setMonthFilter}
                onSelectTour={(tour) => setSelectedTourModal(tour)}
              />
            </div>
          )}
        </div>
      </main>

      {/* Tour Detail Modal */}
      {selectedTourModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-black max-w-lg w-full rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedTourModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-[#b34030] tracking-widest font-bold uppercase block mb-1">
              {selectedTourModal.number} // {lang === 'ru' ? selectedTourModal.watermarkRu : selectedTourModal.watermark}
            </span>
            <h3 className="font-['Oswald'] text-2xl font-bold uppercase text-gray-900 mb-3">
              {lang === 'ru' ? selectedTourModal.titleRu : selectedTourModal.titleEn}
            </h3>
            <div className="rounded-xl overflow-hidden mb-4 h-48 border border-gray-200">
              <img
                src={selectedTourModal.image}
                alt={selectedTourModal.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2 text-sm text-gray-700 font-sans mb-6">
              <p>📍 {lang === 'ru' ? selectedTourModal.durationRu : selectedTourModal.durationEn}</p>
              <p>📅 {lang === 'ru' ? selectedTourModal.datesRu : selectedTourModal.datesEn}</p>
              <p>🥾 {lang === 'ru' ? selectedTourModal.lengthRu : selectedTourModal.lengthEn}</p>
              <p>⛰️ {lang === 'ru' ? 'Высота пика' : 'Elevation'}: {selectedTourModal.elevation}</p>
              <p>🧭 {lang === 'ru' ? 'Сложность' : 'Difficulty'}: {selectedTourModal.difficulty}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  alert(lang === 'ru' ? 'Заявка принята! Гид свяжется с вами.' : 'Booking inquiry registered!');
                  setSelectedTourModal(null);
                }}
                className="flex-1 py-3 bg-[#b34030] hover:bg-[#973224] text-white font-['Oswald'] tracking-wider uppercase font-semibold rounded-lg transition"
              >
                {lang === 'ru' ? 'ЗАБРОНИРОВАТЬ МЕСТО' : 'BOOK YOUR EXPEDITION'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Launchers */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2">
        {/* ✍️ 31 Typography Suite Launcher */}
        {onOpenTypographyModal && (
          <button
            onClick={onOpenTypographyModal}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-[#1c202d] via-[#222738] to-[#1c202d] hover:border-[#c5a059] text-white border border-[#c5a059]/60 font-['Oswald'] tracking-wider uppercase font-bold text-xs rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 group"
            title="Open 31 Typography Styles Suite (Project 3)"
          >
            <Type className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>31 Typography Suite</span>
            <span className="px-2 py-0.5 rounded-full bg-[#c5a059]/20 text-[#e4c88a] text-[10px] font-mono font-bold capitalize">
              {selectedTypographyStyle}
            </span>
          </button>
        )}

        {/* ✨ Modern Animations Launcher */}
        <button
          onClick={onOpenAnimationsModal}
          className="flex items-center space-x-2.5 px-5 py-3.5 bg-gradient-to-r from-[#c5a059] via-[#d4b068] to-[#96793f] hover:brightness-110 text-black font-['Oswald'] tracking-wider uppercase font-bold text-xs rounded-full shadow-[0_10px_35px_rgba(197,160,89,0.5)] border border-[#fff2cc]/40 hover:scale-105 active:scale-95 transition-all duration-300 group"
          title="Open Modern Animations Selector (Project 2)"
        >
          <Sparkles className="w-4 h-4 fill-black animate-spin" style={{ animationDuration: '6s' }} />
          <span>Modern Animations Pop-up</span>
          <span className="px-2 py-0.5 rounded-full bg-black/80 text-[#e4c88a] text-[10px] font-mono font-bold">
            {Object.values(enabledAnimations).filter(Boolean).length}/8 Active
          </span>
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
   DESKTOP WIREFRAME VIEW (Exact Match to Left Design)
   ========================================================================= */
const DesktopWireframeView = ({
  lang,
  tours,
  renderText,
  destinationFilter,
  setDestinationFilter,
  tourTypeFilter,
  setTourTypeFilter,
  monthFilter,
  setMonthFilter,
  onSelectTour,
  enabledAnimations = {},
  selectedTypographyStyle = 'editorial'
}) => {
  const renderHeroHeadline = () => {
    const rawText = lang === 'ru' ? 'ТУРПОХОДЫ ПО РОССИИ' : 'TREKKING TOURS ACROSS RUSSIA';

    switch (selectedTypographyStyle) {
      case 'outline':
        return (
          <h2
            style={{ WebkitTextStroke: '2.5px #ffffff', color: 'transparent' }}
            className="font-['Oswald'] text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest drop-shadow-2xl"
          >
            {renderText(rawText)}
          </h2>
        );

      case 'split':
        return (
          <h2 className="font-['Oswald'] text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider flex items-center justify-center space-x-3 drop-shadow-xl">
            <span className="text-white">{renderText(lang === 'ru' ? 'ТУРПОХОДЫ' : 'TREKKING TOURS')}</span>
            <span style={{ WebkitTextStroke: '2px #c5a059', color: 'transparent' }}>
              {renderText(lang === 'ru' ? 'ПО РОССИИ' : 'ACROSS RUSSIA')}
            </span>
          </h2>
        );

      case 'stacked':
        return (
          <h2 className="font-['Oswald'] text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white flex flex-col leading-none drop-shadow-2xl text-center">
            <span className="text-white">{renderText(lang === 'ru' ? 'ТУРПОХОДЫ' : 'TREKKING')}</span>
            <span className="text-[#c5a059]">{renderText(lang === 'ru' ? 'ПО РОССИИ' : 'TOURS ACROSS')}</span>
            <span className="text-gray-300">{renderText(lang === 'ru' ? 'ЭКСПЕДИЦИЯ' : 'RUSSIA')}</span>
          </h2>
        );

      case 'gradient':
        return (
          <h2 className="font-['Cinzel'] text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider bg-gradient-to-r from-[#fff4d1] via-[#c5a059] to-[#8c6720] bg-clip-text text-transparent drop-shadow-2xl">
            {renderText(rawText)}
          </h2>
        );

      case 'neon-glow':
        return (
          <h2
            style={{
              textShadow: '0 0 10px #c5a059, 0 0 25px rgba(197,160,89,0.8), 0 0 50px rgba(197,160,89,0.5)'
            }}
            className="font-['Cinzel'] text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-widest text-[#fffdf5]"
          >
            {renderText(rawText)}
          </h2>
        );

      case '3d-extruded':
        return (
          <h2
            style={{
              textShadow: '1px 1px 0 #8c6d32, 2px 2px 0 #735724, 3px 3px 0 #5c4419, 4px 4px 0 #423010, 5px 5px 15px rgba(0,0,0,0.9)'
            }}
            className="font-['Oswald'] text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider text-[#fae5b8]"
          >
            {renderText(rawText)}
          </h2>
        );

      case 'glitch':
        return (
          <div className="relative inline-block">
            <h2 className="font-['Oswald'] text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider text-white relative z-10 drop-shadow-xl">
              <span className="absolute -left-1 top-0 text-cyan-400 opacity-70 mix-blend-screen select-none pointer-events-none">
                {rawText}
              </span>
              <span className="absolute left-1 top-0 text-rose-500 opacity-70 mix-blend-screen select-none pointer-events-none">
                {rawText}
              </span>
              <span>{renderText(rawText)}</span>
            </h2>
          </div>
        );

      case 'masked':
        return (
          <h2
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            className="font-['Oswald'] text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider filter contrast-150 drop-shadow-2xl"
          >
            {renderText(rawText)}
          </h2>
        );

      case 'monumental':
        return (
          <h2 className="font-['Cinzel'] text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-[0.28em] text-[#f7eed9] drop-shadow-2xl">
            {renderText(rawText)}
          </h2>
        );

      case 'oversized':
        return (
          <h2 className="font-['Oswald'] text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-none drop-shadow-2xl">
            {renderText(rawText)}
          </h2>
        );

      case 'condensed':
        return (
          <h2
            style={{ transform: 'scaleX(0.85)', transformOrigin: 'center' }}
            className="font-['Oswald'] text-5xl md:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-none drop-shadow-xl"
          >
            {renderText(rawText)}
          </h2>
        );

      case 'brutalist':
        return (
          <div className="bg-black/90 p-4 border-2 border-[#c5a059] shadow-[8px_8px_0px_#c5a059] inline-block">
            <h2 className="font-mono text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-emerald-400">
              [EXPEDITION] // {renderText(rawText)}
            </h2>
          </div>
        );

      case 'asymmetric':
        return (
          <div className="font-['Playfair_Display',serif] text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight">
            <div>{renderText(lang === 'ru' ? 'ТУР' : 'TREKKING')}</div>
            <div className="pl-12 text-[#c5a059] italic">{renderText(lang === 'ru' ? 'ПОХОДЫ' : 'EXPEDITIONS')}</div>
            <div className="pl-6 text-gray-200">{renderText(lang === 'ru' ? 'РОССИИ' : 'RUSSIA')}</div>
          </div>
        );

      case 'variable-spacing':
        return (
          <h2
            style={{ letterSpacing: '0.4em' }}
            className="font-['Plus_Jakarta_Sans'] text-2xl md:text-4xl lg:text-5xl font-extrabold uppercase text-white tracking-[0.4em] drop-shadow-xl"
          >
            {renderText(rawText)}
          </h2>
        );

      case 'high-contrast-serif':
        return (
          <h2 className="font-['Playfair_Display',serif] text-4xl md:text-6xl lg:text-7xl font-black italic text-white drop-shadow-2xl tracking-wide">
            {renderText(rawText)}
          </h2>
        );

      case 'editorial':
      default:
        return (
          <h2 className="font-['Oswald'] text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-white drop-shadow-xl">
            {renderText(rawText)}
          </h2>
        );
    }
  };

  return (
    <div className="relative bg-[#ffffff] text-black select-text">
      {/* 1. HERO SECTION WITH TENT OPENING & SUNLIT MOUNTAINS */}
      <section className="relative h-[560px] md:h-[620px] overflow-hidden bg-[#2d322b]">
        {/* Background Landscape: Mountain Valley with Hiking Boots in Foreground viewed through tent opening */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
            alt="Mountain Valley through Tent Opening"
            className="w-full h-full object-cover brightness-95"
          />
          {/* Subtle tent fabric shade at borders */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
        </div>

        {/* Tent Fabric Silhouette Border (Curved triangle tent opening overlay) */}
        <svg
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          {/* Tent flap left fabric */}
          <path
            d="M 0 0 L 180 0 Q 70 320 0 600 Z"
            fill="#d2c3aa"
            fillOpacity="0.45"
          />
          {/* Tent flap top drape curve */}
          <path
            d="M 0 0 L 1000 0 L 1000 50 Q 500 20 0 50 Z"
            fill="#000000"
            fillOpacity="0.15"
          />
        </svg>

        {/* Top Header Bar inside Hero */}
        <div className="relative z-20 px-8 py-5 flex items-center justify-between text-white drop-shadow-md">
          {/* Circular Mountain Crest Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center bg-black/20 backdrop-blur-xs">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="font-['Oswald'] text-xs tracking-widest uppercase font-semibold text-white/90">
              ТУР КЛУБ
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-sans tracking-wider uppercase font-medium text-white/90">
            <a href="#tours" className="hover:text-amber-200 transition">
              {lang === 'ru' ? 'Главная' : 'Home'}
            </a>
            <a href="#about" className="hover:text-amber-200 transition">
              {lang === 'ru' ? 'О нас' : 'About'}
            </a>
            <a href="#tours" className="hover:text-amber-200 transition text-amber-300 font-bold">
              {lang === 'ru' ? 'Популярные туры' : 'Popular Tours'}
            </a>
            <a href="#reviews" className="hover:text-amber-200 transition">
              {lang === 'ru' ? 'Отзывы' : 'Reviews'}
            </a>
            <a href="#contacts" className="hover:text-amber-200 transition">
              {lang === 'ru' ? 'Контакты' : 'Contacts'}
            </a>
          </nav>

          {/* Phone Number */}
          <div className="flex items-center space-x-1.5 text-xs font-mono font-bold tracking-wider text-white">
            <Phone className="w-3.5 h-3.5 text-amber-300" />
            <span>+7 (495) 180-21-72</span>
          </div>
        </div>

        {/* Hero Central Headline & Tag */}
        <div className="relative z-20 flex flex-col items-center justify-center h-[calc(100%-120px)] text-center px-4">
          {renderHeroHeadline()}

          {/* Royal Calligraphy Cursive Subtitle with Scroll Arrow */}
          <div className="mt-4 flex items-center space-x-3 text-white/95">
            <p className="font-['Pinyon_Script',cursive] text-3xl md:text-4xl tracking-wide drop-shadow-lg text-[#fff1dc] italic">
              {renderText(
                lang === 'ru' ? '«Открой неизведанное, а не просто путь»' : '«Discover the wild, not merely the road»'
              )}
            </p>
            <ArrowDown className="w-5 h-5 text-[#c5a059] animate-bounce mt-1" />
          </div>
        </div>

        {/* RIPPED / TORN PAPER EDGE TRANSITION AT BOTTOM */}
        <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
          <svg
            className="w-full h-12 md:h-16 text-white"
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            {/* Realistic jagged torn-paper silhouette */}
            <path d="M 0,60 L 0,35 Q 35,45 70,25 Q 110,48 150,28 Q 190,42 230,22 Q 275,50 320,30 Q 360,40 400,20 Q 450,48 500,28 Q 540,42 580,24 Q 630,52 680,26 Q 720,40 760,22 Q 810,48 860,26 Q 900,42 940,24 Q 990,48 1040,26 Q 1090,44 1140,28 Q 1175,45 1200,32 L 1200,60 Z" />
          </svg>
        </div>
      </section>

      {/* Kinetic Marquee Loop Animation (Modern 2026 Editorial Trend) */}
      {enabledAnimations['marquee-loop'] && (
        <div className="relative z-30 bg-[#151720] text-[#e4c88a] py-2.5 overflow-hidden border-y border-[#c5a059]/30 shadow-inner">
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="mx-4 font-['Oswald'] text-xs uppercase tracking-widest font-semibold flex items-center space-x-3">
              <span>ЭЛЬБРУС • КАВКАЗ 5642M</span>
              <span className="text-[#c5a059]">✦</span>
              <span>КРЫМСКИЕ ТРОПЫ</span>
              <span className="text-[#c5a059]">✦</span>
              <span>ДИКИЙ АЛТАЙ</span>
              <span className="text-[#c5a059]">✦</span>
              <span>ОЗЕРО БАЙКАЛ</span>
              <span className="text-[#c5a059]">✦</span>
              <span>ВУЛКАНЫ КАМЧАТКИ</span>
              <span className="text-[#c5a059]">✦</span>
              <span>ЭКСПЕДИЦИИ 2026</span>
              <span className="text-[#c5a059]">✦</span>
            </span>
            <span className="mx-4 font-['Oswald'] text-xs uppercase tracking-widest font-semibold flex items-center space-x-3">
              <span>ЭЛЬБРУС • КАВКАЗ 5642M</span>
              <span className="text-[#c5a059]">✦</span>
              <span>КРЫМСКИЕ ТРОПЫ</span>
              <span className="text-[#c5a059]">✦</span>
              <span>ДИКИЙ АЛТАЙ</span>
              <span className="text-[#c5a059]">✦</span>
              <span>ОЗЕРО БАЙКАЛ</span>
              <span className="text-[#c5a059]">✦</span>
              <span>ВУЛКАНЫ КАМЧАТКИ</span>
              <span className="text-[#c5a059]">✦</span>
              <span>ЭКСПЕДИЦИИ 2026</span>
              <span className="text-[#c5a059]">✦</span>
            </span>
          </div>
        </div>
      )}

      {/* 2. SECTION: ROUTE SELECTOR ("ВЫБОР МАРШРУТА") */}
      <section className="relative z-30 pt-6 pb-12 px-6 md:px-8 max-w-5xl mx-auto text-center">
        {/* Luxury Section Header with Sub-label and Ornament */}
        <div className="mb-8 space-y-1.5">
          <span className="font-['Tenor_Sans',sans-serif] text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-[#8a8070] font-semibold block">
            {lang === 'ru' ? 'ЭКСКЛЮЗИВНЫЕ ЭКСПЕДИЦИИ • ОСЕНЬ / ЗИМА 2026' : 'EXCLUSIVE EXPEDITIONS • AUTUMN / WINTER 2026'}
          </span>
          <h3 className="font-['Italiana',serif] text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.22em] text-[#1c1a17]">
            {renderText(lang === 'ru' ? 'ВЫБОР МАРШРУТА' : 'CHOOSE YOUR ROUTE')}
          </h3>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto mt-3" />
        </div>

        {/* Haute Luxury Horizontal Form Filter Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 md:gap-4 items-center bg-[#faf8f4] p-3.5 md:p-4 rounded-2xl border border-[#dcd4c5] shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-xs">
          {/* Input 1: Destination */}
          <div className="relative flex items-center border-b sm:border-b-0 sm:border-r border-[#e3dacb] px-3.5 py-2 text-left">
            <div className="flex-1">
              <span className="font-['Tenor_Sans',sans-serif] text-[9.5px] uppercase tracking-[0.28em] text-[#8a8070] block font-semibold mb-0.5">
                {lang === 'ru' ? 'Куда // Destination' : 'Destination'}
              </span>
              <select
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
                className="w-full bg-transparent font-['Bodoni_Moda',serif] text-sm font-semibold tracking-wide text-[#1c1a17] focus:outline-none cursor-pointer"
              >
                <option value="Кавказ (Эльбрус)">Кавказ (Эльбрус)</option>
                <option value="Горный Крым">Горный Крым</option>
                <option value="Алтай (Белуха)">Алтай (Белуха)</option>
                <option value="Байкал">Байкал</option>
                <option value="Камчатка">Камчатка</option>
              </select>
            </div>
            <MapPin className="w-4 h-4 text-[#a87954] ml-1" />
          </div>

          {/* Input 2: Hike Type */}
          <div className="relative flex items-center border-b sm:border-b-0 sm:border-r border-[#e3dacb] px-3.5 py-2 text-left">
            <div className="flex-1">
              <span className="font-['Tenor_Sans',sans-serif] text-[9.5px] uppercase tracking-[0.28em] text-[#8a8070] block font-semibold mb-0.5">
                {lang === 'ru' ? 'Тип похода // Trek Type' : 'Trek Type'}
              </span>
              <select
                value={tourTypeFilter}
                onChange={(e) => setTourTypeFilter(e.target.value)}
                className="w-full bg-transparent font-['Bodoni_Moda',serif] text-sm font-semibold tracking-wide text-[#1c1a17] focus:outline-none cursor-pointer"
              >
                <option value="Пеший поход">Пеший поход</option>
                <option value="Восхождение">Восхождение</option>
                <option value="Треккинг с рюкзаком">Треккинг</option>
                <option value="Фототур">Фототур</option>
              </select>
            </div>
            <Compass className="w-4 h-4 text-[#a87954] ml-1" />
          </div>

          {/* Input 3: Month */}
          <div className="relative flex items-center border-b sm:border-b-0 sm:border-r border-[#e3dacb] px-3.5 py-2 text-left">
            <div className="flex-1">
              <span className="font-['Tenor_Sans',sans-serif] text-[9.5px] uppercase tracking-[0.28em] text-[#8a8070] block font-semibold mb-0.5">
                {lang === 'ru' ? 'Месяц // Month' : 'Month'}
              </span>
              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="w-full bg-transparent font-['Bodoni_Moda',serif] text-sm font-semibold tracking-wide text-[#1c1a17] focus:outline-none cursor-pointer"
              >
                <option value="Сентябрь">Сентябрь 2026</option>
                <option value="Октябрь">Октябрь 2026</option>
                <option value="Ноябрь">Ноябрь 2026</option>
                <option value="Лето 2026">Лето 2026</option>
              </select>
            </div>
            <Calendar className="w-4 h-4 text-[#a87954] ml-1" />
          </div>

          {/* Button: Chiseled Luxury CTA */}
          <div className="p-1">
            <button
              onClick={() => alert(`Поиск туров в ${destinationFilter} (${monthFilter})`)}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#9e3d30] via-[#8c2d20] to-[#731f13] hover:from-[#b54332] hover:to-[#9e3d30] text-[#fff8ee] font-['Cinzel',serif] font-bold text-xs uppercase tracking-[0.22em] transition-all duration-300 rounded-xl shadow-[0_8px_25px_rgba(158,61,48,0.28)] hover:scale-[1.02]"
            >
              {renderText(lang === 'ru' ? 'ПОДОБРАТЬ ТУР' : 'FIND EXPEDITION')}
            </button>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE TRAIL SECTION WITH CONTINUOUS WINDING SVG LINE */}
      <section className="relative px-6 md:px-12 py-10 overflow-hidden" id="tours">
        {/* Winding continuous trail line in background connecting the 3 tour stops */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block"
          viewBox="0 0 1000 1600"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Elegant curved hiking path line */}
          <path
            d="M 500 40 Q 420 180 300 240 Q 150 320 280 440 Q 450 560 620 620 Q 800 680 720 840 Q 640 1000 450 1080 Q 260 1160 380 1320 Q 500 1480 680 1560"
            stroke={enabledAnimations['glow-pulse'] ? '#c5a059' : '#b8b2a5'}
            strokeWidth={enabledAnimations['trail-draw'] ? '2.5' : '1.5'}
            strokeDasharray={enabledAnimations['trail-draw'] ? '8 6' : '4 4'}
            className={enabledAnimations['trail-draw'] ? 'animate-trail' : ''}
            opacity="0.85"
          />

          {/* Checkpoint Red Dot 1 (Elbrus) */}
          <circle cx="480" cy="180" r="4.5" fill="#b34030" />
          <circle cx="480" cy="180" r="10" stroke="#b34030" strokeWidth="1" opacity="0.4" className={enabledAnimations['trail-draw'] ? 'animate-ping' : ''} />

          {/* Checkpoint Red Dot 2 (Crimea) */}
          <circle cx="70" cy="620" r="4.5" fill="#b34030" />
          <circle cx="70" cy="620" r="10" stroke="#b34030" strokeWidth="1" opacity="0.4" className={enabledAnimations['trail-draw'] ? 'animate-ping' : ''} />

          {/* Checkpoint Red Dot 3 (Altai) */}
          <circle cx="680" cy="1120" r="4.5" fill="#b34030" />
          <circle cx="680" cy="1120" r="10" stroke="#b34030" strokeWidth="1" opacity="0.4" className={enabledAnimations['trail-draw'] ? 'animate-ping' : ''} />
        </svg>

        <div className="relative z-10 max-w-5xl mx-auto space-y-24 md:space-y-36">
          {/* ===================================================================
              CARD 1: ВОСХОЖДЕНИЕ НА ЭЛЬБРУС (Left Image, Right Specs)
             =================================================================== */}
          <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-14 ${enabledAnimations['tilt-3d'] ? 'card-tilt-hover p-4 rounded-2xl bg-white/40' : ''}`}>
            {/* Left Image with organic torn/masked edge */}
            <div className="w-full md:w-1/2 relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-black/10">
                <img
                  src={tours[0].image}
                  alt={tours[0].imageAlt}
                  className="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            {/* Right Tour Metadata with Cursive Watermark */}
            <div className="w-full md:w-1/2 relative pl-2 md:pl-6">
              {/* Luxury Architectural Watermark */}
              <span className="absolute -top-12 -left-6 font-['Italiana',serif] text-7xl md:text-9xl text-amber-500/15 select-none pointer-events-none font-light tracking-wider">
                {lang === 'ru' ? 'Elbrus' : 'Elbrus'}
              </span>

              <div className="relative z-10 space-y-3">
                <h4 className="font-['Bodoni_Moda',serif] text-2xl md:text-3xl font-bold uppercase tracking-[0.06em] text-[#1c1a17]">
                  {renderText(lang === 'ru' ? tours[0].titleRu : tours[0].titleEn)}
                </h4>

                <div className="space-y-2 font-['Tenor_Sans',sans-serif] text-xs uppercase tracking-[0.14em] text-[#4a463e] leading-relaxed pt-1">
                  <p className="flex items-center space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9e3d30]" />
                    <span>{renderText(lang === 'ru' ? tours[0].durationRu : tours[0].durationEn)}</span>
                  </p>
                  <p className="flex items-center space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9e3d30]" />
                    <span>{renderText(lang === 'ru' ? tours[0].datesRu : tours[0].datesEn)}</span>
                  </p>
                  <p className="flex items-center space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9e3d30]" />
                    <span>{renderText(lang === 'ru' ? tours[0].lengthRu : tours[0].lengthEn)}</span>
                  </p>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => onSelectTour(tours[0])}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 border border-[#8a8070] hover:border-[#9e3d30] text-[#1c1a17] hover:text-[#9e3d30] rounded-xl text-xs font-['Cinzel',serif] uppercase font-bold tracking-[0.2em] transition-all duration-300 bg-white/70 hover:bg-white shadow-xs group"
                  >
                    <span>{renderText(lang === 'ru' ? 'ПОДРОБНЕЕ О МАРШРУТЕ' : 'DETAILS ABOUT ROUTE')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================
              CARD 2: ПОХОД ПО ГОРНОМУ КРЫМУ (Alternating: Left Specs, Right Image)
             =================================================================== */}
          <div className={`flex flex-col-reverse md:flex-row items-center gap-8 md:gap-14 ${enabledAnimations['tilt-3d'] ? 'card-tilt-hover p-4 rounded-2xl bg-white/40' : ''}`}>
            {/* Left Tour Metadata with Cursive Watermark */}
            <div className="w-full md:w-1/2 relative pr-2 md:pr-6">
              <span className="absolute -top-12 -left-6 font-['Italiana',serif] text-7xl md:text-9xl text-amber-500/15 select-none pointer-events-none font-light tracking-wider">
                {lang === 'ru' ? 'Crimea' : 'Crimea'}
              </span>

              <div className="relative z-10 space-y-3">
                <h4 className="font-['Bodoni_Moda',serif] text-2xl md:text-3xl font-bold uppercase tracking-[0.06em] text-[#1c1a17]">
                  {renderText(lang === 'ru' ? tours[1].titleRu : tours[1].titleEn)}
                </h4>

                <div className="space-y-2 font-['Tenor_Sans',sans-serif] text-xs uppercase tracking-[0.14em] text-[#4a463e] leading-relaxed pt-1">
                  <p className="flex items-center space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9e3d30]" />
                    <span>{renderText(lang === 'ru' ? tours[1].durationRu : tours[1].durationEn)}</span>
                  </p>
                  <p className="flex items-center space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9e3d30]" />
                    <span>{renderText(lang === 'ru' ? tours[1].datesRu : tours[1].datesEn)}</span>
                  </p>
                  <p className="flex items-center space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9e3d30]" />
                    <span>{renderText(lang === 'ru' ? tours[1].lengthRu : tours[1].lengthEn)}</span>
                  </p>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => onSelectTour(tours[1])}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 border border-[#8a8070] hover:border-[#9e3d30] text-[#1c1a17] hover:text-[#9e3d30] rounded-xl text-xs font-['Cinzel',serif] uppercase font-bold tracking-[0.2em] transition-all duration-300 bg-white/70 hover:bg-white shadow-xs group"
                  >
                    <span>{renderText(lang === 'ru' ? 'ПОДРОБНЕЕ О МАРШРУТЕ' : 'DETAILS ABOUT ROUTE')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Image: Campfire at sunset with feathered organic border */}
            <div className="w-full md:w-1/2 relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-black/10">
                <img
                  src={tours[1].image}
                  alt={tours[1].imageAlt}
                  className="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>

          {/* ===================================================================
              CARD 3: ПУТЕШЕСТВИЕ ПО АЛТАЮ (Left Image, Right Specs)
             =================================================================== */}
          <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-14 ${enabledAnimations['tilt-3d'] ? 'card-tilt-hover p-4 rounded-2xl bg-white/40' : ''}`}>
            {/* Left Image: Winter Snowy Altai */}
            <div className="w-full md:w-1/2 relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-black/10">
                <img
                  src={tours[2].image}
                  alt={tours[2].imageAlt}
                  className="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            {/* Right Tour Metadata with Cursive Watermark */}
            <div className="w-full md:w-1/2 relative pl-2 md:pl-6">
              <span className="absolute -top-12 -left-6 font-['Italiana',serif] text-7xl md:text-9xl text-amber-500/15 select-none pointer-events-none font-light tracking-wider">
                {lang === 'ru' ? 'Altai' : 'Altai'}
              </span>

              <div className="relative z-10 space-y-3">
                <h4 className="font-['Bodoni_Moda',serif] text-2xl md:text-3xl font-bold uppercase tracking-[0.06em] text-[#1c1a17]">
                  {renderText(lang === 'ru' ? tours[2].titleRu : tours[2].titleEn)}
                </h4>

                <div className="space-y-2 font-['Tenor_Sans',sans-serif] text-xs uppercase tracking-[0.14em] text-[#4a463e] leading-relaxed pt-1">
                  <p className="flex items-center space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9e3d30]" />
                    <span>{renderText(lang === 'ru' ? tours[2].durationRu : tours[2].durationEn)}</span>
                  </p>
                  <p className="flex items-center space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9e3d30]" />
                    <span>{renderText(lang === 'ru' ? tours[2].datesRu : tours[2].datesEn)}</span>
                  </p>
                  <p className="flex items-center space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9e3d30]" />
                    <span>{renderText(lang === 'ru' ? tours[2].lengthRu : tours[2].lengthEn)}</span>
                  </p>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => onSelectTour(tours[2])}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 border border-[#8a8070] hover:border-[#9e3d30] text-[#1c1a17] hover:text-[#9e3d30] rounded-xl text-xs font-['Cinzel',serif] uppercase font-bold tracking-[0.2em] transition-all duration-300 bg-white/70 hover:bg-white shadow-xs group"
                  >
                    <span>{renderText(lang === 'ru' ? 'ПОДРОБНЕЕ О МАРШРУТЕ' : 'DETAILS ABOUT ROUTE')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM TREELINE SILHOUETTE & FOOTER */}
      <footer className="relative mt-20 pt-24 pb-12 bg-gradient-to-t from-[#15171a] to-[#25292e] text-white">
        {/* Treeline Silhouette Overlay */}
        <div className="absolute -top-16 left-0 right-0 h-20 bg-repeat-x opacity-40 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400">
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-[#b34030]" />
            <span className="font-['Oswald'] text-sm tracking-widest text-white uppercase">
              ТУРПОХОДЫ ПО РОССИИ
            </span>
          </div>
          <p className="font-mono text-[11px]">
            © 2026. EXPEDITION CLUB. ВСЕ МАРШРУТЫ СЕРТИФИЦИРОВАНЫ ФЕДЕРАЦИЕЙ СПОРТИВНОГО ТУРИЗМА.
          </p>
          <div className="flex space-x-4">
            <span className="hover:text-white cursor-pointer">+7 (495) 180-21-72</span>
            <span className="hover:text-white cursor-pointer">info@expedition-tours.ru</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* =========================================================================
   MOBILE WIREFRAME VIEW (Exact Match to Right Design in Screenshot)
   ========================================================================= */
const MobileWireframeView = ({
  lang,
  tours,
  renderText,
  destinationFilter,
  setDestinationFilter,
  tourTypeFilter,
  setTourTypeFilter,
  monthFilter,
  setMonthFilter,
  onSelectTour
}) => {
  return (
    <div className="bg-white text-black font-sans text-xs select-text overflow-hidden">
      {/* Mobile Top Header */}
      <div className="px-4 py-3 bg-[#1e2023] text-white flex items-center justify-between">
        <div className="w-6 h-6 rounded-full border border-white/60 flex items-center justify-center">
          <Compass className="w-3.5 h-3.5" />
        </div>
        <span className="font-['Oswald'] text-[10px] tracking-widest uppercase">ТУР КЛУБ</span>
        <div className="space-y-0.5 w-4 cursor-pointer">
          <div className="w-full h-0.5 bg-white" />
          <div className="w-full h-0.5 bg-white" />
        </div>
      </div>

      {/* Mobile Hero: Tent view with condensed vertical title */}
      <div className="relative h-64 overflow-hidden bg-[#2d322b]">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
          alt="Hero Mobile"
          className="w-full h-full object-cover brightness-95"
        />
        <div className="absolute inset-0 bg-black/30" />

        {/* Tent flap silhouette */}
        <div className="absolute top-0 left-0 bottom-0 w-8 bg-black/20" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h2 className="font-['Oswald'] text-2xl font-bold uppercase tracking-wider text-white drop-shadow-md leading-tight">
            ТУРПОХОДЫ<br />ПО<br />РОССИИ
          </h2>
          <p className="font-['Marck_Script',cursive] text-sm text-[#fbf1dc] mt-2 drop-shadow">
            «Открой неизведанное»
          </p>
        </div>

        {/* Torn paper edge */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-white" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 40%, 85% 10%, 70% 50%, 50% 10%, 30% 60%, 15% 20%, 0% 60%)' }} />
      </div>

      {/* Mobile Route Selector */}
      <div className="p-4 border-b border-gray-200 text-center space-y-3">
        <h3 className="font-['Oswald'] text-base font-bold uppercase tracking-wider text-gray-900">
          ВЫБОР МАРШРУТА
        </h3>

        <div className="space-y-2 text-left">
          <div className="border border-gray-300 rounded p-2 flex items-center justify-between">
            <span className="text-[10px] text-gray-500 uppercase">{destinationFilter}</span>
            <MapPin className="w-3.5 h-3.5 text-[#b34030]" />
          </div>
          <div className="border border-gray-300 rounded p-2 flex items-center justify-between">
            <span className="text-[10px] text-gray-500 uppercase">{tourTypeFilter}</span>
            <Compass className="w-3.5 h-3.5 text-[#b34030]" />
          </div>
          <div className="border border-gray-300 rounded p-2 flex items-center justify-between">
            <span className="text-[10px] text-gray-500 uppercase">{monthFilter}</span>
            <Calendar className="w-3.5 h-3.5 text-[#b34030]" />
          </div>
          <button
            onClick={() => alert(`Поиск: ${destinationFilter}`)}
            className="w-full py-2 border border-[#b34030] text-[#b34030] font-['Oswald'] font-bold text-xs uppercase tracking-wider rounded"
          >
            ПОДОБРАТЬ ТУР
          </button>
        </div>
      </div>

      {/* Mobile Tour Cards Stack */}
      <div className="p-4 space-y-8">
        {tours.map((tour) => (
          <div key={tour.id} className="space-y-2.5">
            <div className="rounded-xl overflow-hidden shadow h-44 border border-gray-200">
              <img src={tour.image} alt={tour.imageAlt} className="w-full h-full object-cover" />
            </div>
            <h4 className="font-['Oswald'] text-base font-bold uppercase tracking-wide text-gray-900 pt-1">
              {tour.titleRu}
            </h4>
            <div className="text-[11px] text-gray-600 space-y-1">
              <p>• {tour.durationRu}</p>
              <p>• {tour.datesRu}</p>
              <p>• {tour.lengthRu}</p>
            </div>
            <button
              onClick={() => onSelectTour(tour)}
              className="text-[10px] font-['Oswald'] font-bold text-[#b34030] uppercase underline tracking-wider pt-1 block"
            >
              ПОДРОБНЕЕ О МАРШРУТЕ →
            </button>
          </div>
        ))}
      </div>

      {/* Mobile Footer */}
      <div className="p-4 bg-gray-900 text-gray-400 text-center text-[10px] space-y-1">
        <p className="font-['Oswald'] text-white">ТУР КЛУБ РОССИИ</p>
        <p>+7 (495) 180-21-72</p>
      </div>
    </div>
  );
};