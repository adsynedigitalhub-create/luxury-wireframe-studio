import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { InteractiveFuturistic3DVilla } from './InteractiveFuturistic3DVilla';

export function ArchitectureMonographSite({ onBackToCanvas, onOpenCodeModal }) {
  // Pinned "lets-scroll" Container Ref
  const scrollContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end']
  });

  // 4 Cinematic Story Steps (Matching the exact video reference syllabus)
  const storySteps = [
    {
      step: '01 / 04',
      category: 'RESIDENTIAL MONOGRAPH',
      title: 'Your sanctuary is waiting.',
      subtitle: 'Raw honed travertine, monolithic concrete, and structural glass in the heart of the metropolis.',
      tags: ['Travertine', 'Metropolis'],
      image: '/images/architecture/urban_villa_exterior.jpg',
      specs: '1,450 m² • Zurich Goldcoast • N 47° 22 min 40 sec'
    },
    {
      step: '02 / 04',
      category: 'CANTILEVER & WATER',
      title: 'Suspended over reflection.',
      subtitle: 'A 14-meter post-tensioned cantilever floating weightlessly over private turquoise waters.',
      tags: ['Post-Tensioned', 'Infinity Pool'],
      image: '/images/architecture/arch_phase3_reality.jpg',
      specs: '14.2m Cantilever • Deflection < L/600 • Heated Basalt'
    },
    {
      step: '03 / 04',
      category: 'INTERIOR SALON',
      title: 'Light, stone, and silence.',
      subtitle: 'Double-height sunken living room framed by fluted Roman stone, open hearth, and pool views.',
      tags: ['Sunken Salon', 'Linear Hearth'],
      image: '/images/architecture/urban_villa_living.jpg',
      specs: '6.2m Ceiling Height • Fluted Travertine • Italian Minotti'
    },
    {
      step: '04 / 04',
      category: 'UPPER OBSERVATORY',
      title: 'Waking above the city.',
      subtitle: 'Wraparound corner structural silicone glazing framing midnight metropolis horizons.',
      tags: ['Master Suite', 'Skyline Panorama'],
      image: '/images/architecture/urban_villa_bedroom.jpg',
      specs: '360° Glazing • Fumed French Oak • Calacatta Bath'
    }
  ];

  // Active step calculated from scroll progress (0.00 to 1.00)
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.25) setActiveStepIndex(0);
      else if (latest < 0.50) setActiveStepIndex(1);
      else if (latest < 0.75) setActiveStepIndex(2);
      else setActiveStepIndex(3);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Framer-motion transforms for the visual
  const imageScale = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [1.0, 1.08, 1.02, 1.08, 1.0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-4%']);

  // Distinct Villas
  const distinctVillas = [
    {
      id: 'villa-tokyo',
      city: 'TOKYO // SHIBUYA',
      title: 'The Shibuya Courtyard Villa',
      desc: 'Japanese minimalist architecture blending charred Shou Sugi Ban cedar with cast basalt concrete and an illuminated bonsai reflection pool.',
      image: '/images/architecture/villa_tokyo.jpg',
      cad: '/images/architecture/urban_villa_cad.jpg',
      specs: '1,180 m² • Inner Bonsai Atrium • Tatami Salon'
    },
    {
      id: 'villa-zurich',
      city: 'ZURICH // GOLDCOAST',
      title: 'Villa Aethelgard Monolith',
      desc: 'Cantilevered private residence balancing heavy Roman travertine mass over reflection water with distant Alpine and lake views.',
      image: '/images/architecture/urban_villa_exterior.jpg',
      cad: '/images/architecture/arch_phase1_blueprint.jpg',
      specs: '1,450 m² • 14.2m Cantilever • Triple Glazing'
    }
  ];

  // Commission Form State
  const [formDone, setFormDone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', budget: '$15M — $30M', note: '' });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToInquire = () => {
    const el = document.getElementById('inquire-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f6f3ee] text-[#1b1d22] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#f05a36] selection:text-white antialiased">
      
      {/* ========================================================================= */}
      {/* 1. TOP MINIMALIST HEADER (PURE LUXURY LABELS, NO NUMBERS)                 */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 lg:px-16 py-6 flex items-center justify-between bg-[#f6f3ee]/85 backdrop-blur-md border-b border-[#1b1d22]/10 transition-all duration-300">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={scrollToTop}>
          <div className="w-8 h-8 rounded-full bg-[#1b1d22] text-white flex items-center justify-center font-['Cinzel',serif] font-bold text-xs tracking-wider">
            AV
          </div>
          <span className="font-['Cinzel',serif] font-bold text-sm tracking-[0.2em] text-[#1b1d22] uppercase">
            Atelier Vanguard
          </span>
        </div>

        {/* Minimal Navigation (Clean labels, zero clutter, no numbers) */}
        <nav className="hidden md:flex items-center space-x-10 text-xs font-mono tracking-[0.2em] uppercase text-[#1b1d22]/80">
          <button onClick={() => document.getElementById('interactive-3d').scrollIntoView({ behavior: 'smooth' })} className="text-[#f05a36] font-bold hover:underline transition flex items-center space-x-1"><span>🌐</span><span>3D Interactive</span></button>
          <button onClick={() => window.scrollTo({ top: window.innerHeight * 0.5, behavior: 'smooth' })} className="hover:text-[#f05a36] transition">Story</button>
          <button onClick={() => document.getElementById('villas-catalog').scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#f05a36] transition">Villas</button>
          <button onClick={() => document.getElementById('blueprint-section').scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#f05a36] transition">Blueprint</button>
          <button onClick={scrollToInquire} className="hover:text-[#f05a36] transition">Inquire</button>
        </nav>

        <div className="flex items-center space-x-4">
          <span className="hidden lg:inline-block text-[11px] font-mono text-[#1b1d22]/60">
            ZURICH &bull; MILAN &bull; TOKYO
          </span>
          <button
            onClick={scrollToInquire}
            className="px-5 py-2.5 bg-[#1b1d22] hover:bg-[#f05a36] text-white text-xs font-mono uppercase tracking-[0.15em] rounded-full transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Commission
          </button>
        </div>
      </header>


      {/* ========================================================================= */}
      {/* 2. THE "LETS-SCROLL" PINNED 3D CINEMATIC VILLA WALKTHROUGH                */}
      {/* Height: 400vh container, pinned 100vh viewport, smooth scroll scrubbing    */}
      {/* ========================================================================= */}
      <div ref={scrollContainerRef} className="relative w-full h-[400vh]">
        
        {/* Sticky 100vh Screen: Stays pinned while user scrolls through 4 steps */}
        <div className="sticky top-0 w-full h-screen flex flex-col justify-between overflow-hidden pt-24 pb-10 px-8 lg:px-16">
          
          {/* Main Stage Grid: Left Floating Content + Right Giant 3D Hero Visual */}
          <div className="relative flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT FLOATING CONTENT (EXACT MATCH TO VIDEO TUTORIAL REFERENCE SCREENSHOT) */}
            <div className="lg:col-span-5 z-20 space-y-6">
              
              {/* Step indicator & Category (like 06/06 CRUST & EMBER in screenshot) */}
              <div className="space-y-1">
                <span className="text-xs font-mono tracking-widest text-[#1b1d22]/50 uppercase block font-semibold">
                  {storySteps[activeStepIndex].step}
                </span>
                <span className="text-xs font-mono tracking-[0.25em] text-[#f05a36] uppercase font-bold block">
                  {storySteps[activeStepIndex].category}
                </span>
              </div>

              {/* EXACT ONE SINGLE LINE HEADING */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={storySteps[activeStepIndex].title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="font-['Syne',sans-serif] font-black text-3xl sm:text-5xl lg:text-6xl text-[#1b1d22] tracking-tight leading-tight"
                >
                  {storySteps[activeStepIndex].title}
                </motion.h1>
              </AnimatePresence>

              {/* EXACT TWO LINES BODY TEXT */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={storySteps[activeStepIndex].subtitle}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                  className="text-base text-[#1b1d22]/75 font-normal leading-relaxed max-w-md line-clamp-2"
                >
                  {storySteps[activeStepIndex].subtitle}
                </motion.p>
              </AnimatePresence>

              {/* Filter Pills (like Margherita, Wood-fired in screenshot) */}
              <div className="flex items-center space-x-2 pt-1">
                {storySteps[activeStepIndex].tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-full text-xs font-mono text-[#1b1d22] bg-[#e9e4db] border border-[#1b1d22]/10 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons (like [Order your slice] [Fly it again] in screenshot) */}
              <div className="flex items-center space-x-3 pt-3">
                <button
                  onClick={scrollToInquire}
                  className="px-7 py-3.5 bg-[#1b1d22] hover:bg-[#f05a36] text-white text-xs font-mono uppercase tracking-[0.18em] font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Commission villa
                </button>
                <button
                  onClick={() => document.getElementById('blueprint-section').scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3.5 bg-transparent hover:bg-[#e9e4db] border border-[#1b1d22]/20 text-[#1b1d22] text-xs font-mono uppercase tracking-[0.18em] rounded-full transition-all duration-300"
                >
                  View Blueprint
                </button>
              </div>

              {/* Telemetry metadata */}
              <div className="pt-2 text-[11px] font-mono text-[#1b1d22]/50">
                {storySteps[activeStepIndex].specs}
              </div>
            </div>

            {/* RIGHT GIANT CINEMATIC 3D VISUAL (FULL FOCUSED HERO SCENE WITH ZOOM & DEPTH) */}
            <div className="lg:col-span-7 relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/10] flex items-center justify-center">
              
              {/* Soft Studio Ambient Shadow underneath the floating 3D architecture */}
              <div className="absolute -bottom-8 w-4/5 h-16 bg-black/15 blur-2xl rounded-full pointer-events-none" />

              {/* Visual Container with Framer-motion scroll zoom */}
              <motion.div
                style={{ scale: imageScale, y: imageY }}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-[#1b1d22]/10 bg-white group"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={storySteps[activeStepIndex].image}
                    src={storySteps[activeStepIndex].image}
                    alt={storySteps[activeStepIndex].title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1.0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover select-none"
                  />
                </AnimatePresence>

                {/* Floating Architectural Watermark Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md border border-black/10 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-[#1b1d22] tracking-wider uppercase shadow-sm">
                  {storySteps[activeStepIndex].specs.split('•')[0]}
                </div>
              </motion.div>
            </div>

          </div>

          {/* BOTTOM PINNED HUD: Step Pills & Scroll Prompter */}
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between border-t border-[#1b1d22]/10 pt-4 text-xs font-mono text-[#1b1d22]/60">
            {/* Clickable Step Pills */}
            <div className="flex items-center space-x-3">
              {storySteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const targetScroll = (idx / 3) * (window.innerHeight * 3);
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-all ${
                    activeStepIndex === idx
                      ? 'bg-[#1b1d22] text-white font-bold shadow-md'
                      : 'bg-[#e9e4db] text-[#1b1d22]/70 hover:text-[#1b1d22]'
                  }`}
                >
                  <span>0{idx + 1}</span>
                  <span className="hidden sm:inline text-[10px] uppercase">{step.category.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Scroll prompter indicator */}
            <div className="flex items-center space-x-2">
              <span className="animate-pulse text-[#f05a36] font-bold">&darr;</span>
              <span className="uppercase tracking-widest text-[11px]">Scroll to navigate rooms</span>
            </div>
          </div>

        </div>
      </div>


      {/* ========================================================================= */}
      {/* 2.5 REAL-TIME 3D FUTURISTIC INTERACTIVE VILLA (WEBGL 60 FPS)              */}
      {/* ========================================================================= */}
      <section id="interactive-3d" className="w-full py-28 px-6 lg:px-16 border-t border-[#1b1d22]/10 bg-[#090b10] text-white">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>// REAL-TIME WEBGL THREE.JS ENGINE</span>
              </div>
              <h2 className="font-['Syne',sans-serif] font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
                Interactive 3D Villa Hologram
              </h2>
            </div>
            <p className="mt-4 md:mt-0 text-xs sm:text-sm font-mono text-neutral-400 max-w-md text-right">
              Mouse se 3D building ko 360° ghumayein, zoom-in/out karein, aur LiDAR laser scanlines ya structural X-Ray mode activate karein.
            </p>
          </div>

          {/* Full Interactive 3D WebGL Canvas */}
          <div className="w-full h-[650px] lg:h-[750px]">
            <InteractiveFuturistic3DVilla />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DISTINCT VILLAS CATALOG (NO REPETITION, UNIQUE DESIGNS)                */}
      {/* ========================================================================= */}
      <section id="villas-catalog" className="w-full py-32 px-8 lg:px-16 border-t border-[#1b1d22]/10 bg-[#f6f3ee]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-6 border-b border-[#1b1d22]/10">
            <div>
              <span className="text-xs font-mono text-[#f05a36] tracking-[0.25em] uppercase font-bold block mb-2">
                // MONUMENTAL COMMISSIONS
              </span>
              <h2 className="font-['Syne',sans-serif] font-black text-4xl sm:text-5xl text-[#1b1d22] tracking-tight uppercase">
                Distinct Architectural Forms
              </h2>
            </div>
            <p className="mt-4 md:mt-0 text-sm font-mono text-[#1b1d22]/60 max-w-sm text-right">
              Har villa ka design, material palette aur geometry mukammal munfarid hai.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {distinctVillas.map((villa) => (
              <div
                key={villa.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#1b1d22]/10 shadow-xl group hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={villa.image}
                    alt={villa.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black/85 text-white text-[11px] font-mono px-3 py-1 rounded-full backdrop-blur-md">
                    {villa.city}
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <h3 className="font-['Syne',sans-serif] font-bold text-2xl text-[#1b1d22] group-hover:text-[#f05a36] transition-colors">
                    {villa.title}
                  </h3>
                  <p className="text-sm text-[#1b1d22]/75 font-normal leading-relaxed">
                    {villa.desc}
                  </p>
                  <div className="pt-4 border-t border-[#1b1d22]/10 flex items-center justify-between text-xs font-mono text-[#1b1d22]/60">
                    <span>{villa.specs}</span>
                    <button
                      onClick={scrollToInquire}
                      className="text-[#f05a36] font-bold hover:underline"
                    >
                      Inquire &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. BLUEPRINT TO REALITY COMPARISON MATRIX                                  */}
      {/* ========================================================================= */}
      <section id="blueprint-section" className="w-full py-32 px-8 lg:px-16 border-t border-[#1b1d22]/10 bg-[#ede8df]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1b1d22]/10">
            <div>
              <span className="text-xs font-mono text-[#f05a36] tracking-[0.25em] uppercase font-bold block mb-2">
                // PRECISION TO MATERIALITY
              </span>
              <h2 className="font-['Syne',sans-serif] font-black text-4xl sm:text-5xl text-[#1b1d22] tracking-tight uppercase">
                CAD Blueprint &bull; Built Reality
              </h2>
            </div>
            <p className="mt-4 md:mt-0 text-sm font-mono text-[#1b1d22]/60 max-w-sm text-right">
              2D floorplan aur structural isometric CAD drawings jo physical luxury reality mein convert hoti hain.
            </p>
          </div>

          {/* Clean Side-by-Side Blueprint vs Reality Showcase (NO HIDDEN BOXES) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* CAD Drawing */}
            <div className="bg-[#12151d] rounded-2xl p-4 shadow-xl border border-white/10">
              <div className="aspect-[16/10] overflow-hidden rounded-xl bg-black">
                <img
                  src="/images/architecture/urban_villa_cad.jpg"
                  alt="CAD Blueprint"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-4 px-2 flex items-center justify-between text-xs font-mono text-white/80">
                <span className="text-cyan-400 font-bold">&bull; CAD BIM BLUEPRINT [LEVEL +0.00 TO +8.50M]</span>
                <span>AXIS A-F</span>
              </div>
            </div>

            {/* Finished Reality */}
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-[#1b1d22]/10">
              <div className="aspect-[16/10] overflow-hidden rounded-xl bg-neutral-100">
                <img
                  src="/images/architecture/urban_villa_exterior.jpg"
                  alt="Finished Villa Reality"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-4 px-2 flex items-center justify-between text-xs font-mono text-[#1b1d22]/80">
                <span className="text-[#f05a36] font-bold">&bull; COMPLETED LUXURY RESIDENCE</span>
                <span>ZURICH METROPOLIS</span>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. COMMISSION PROTOCOL & INQUIRY                                          */}
      {/* ========================================================================= */}
      <section id="inquire-section" className="w-full py-32 px-8 lg:px-16 border-t border-[#1b1d22]/10 bg-[#f6f3ee]">
        <div className="max-w-4xl mx-auto space-y-10 text-center">
          
          <div className="space-y-3">
            <span className="text-xs font-mono text-[#f05a36] tracking-[0.25em] uppercase font-bold">
              // INITIATE COMMISSION
            </span>
            <h2 className="font-['Syne',sans-serif] font-black text-4xl sm:text-5xl text-[#1b1d22] tracking-tight uppercase">
              Commission Your Sanctuary
            </h2>
            <p className="text-base text-[#1b1d22]/70 font-normal max-w-lg mx-auto leading-relaxed">
              Atelier Vanguard accepts a strictly limited cohort of residential commissions annually.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 lg:p-12 border border-[#1b1d22]/10 shadow-2xl text-left">
            {formDone ? (
              <div className="p-8 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto font-bold text-lg">✓</div>
                <h4 className="font-bold text-emerald-900 text-xl">Brief Transmitted</h4>
                <p className="text-xs font-mono text-emerald-700">A partner will contact your office within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setFormDone(true); }} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-[#1b1d22]/70 uppercase mb-2">Principal Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Name / Title"
                      className="w-full bg-[#f6f3ee] border border-[#1b1d22]/20 rounded-xl p-3.5 text-sm text-[#1b1d22] focus:border-[#f05a36] focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#1b1d22]/70 uppercase mb-2">Direct Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@familyoffice.com"
                      className="w-full bg-[#f6f3ee] border border-[#1b1d22]/20 rounded-xl p-3.5 text-sm text-[#1b1d22] focus:border-[#f05a36] focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#1b1d22]/70 uppercase mb-2">Project Brief & Desired Metropolis</label>
                  <textarea
                    rows={3}
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    placeholder="Location, cantilever aspirations, indoor pool courtyard..."
                    className="w-full bg-[#f6f3ee] border border-[#1b1d22]/20 rounded-xl p-3.5 text-sm text-[#1b1d22] focus:border-[#f05a36] focus:outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#1b1d22] hover:bg-[#f05a36] text-white text-xs font-mono uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.01]"
                >
                  Transmit Commission Request &rarr;
                </button>
              </form>
            )}
          </div>

          <div className="flex items-center justify-center space-x-8 text-xs font-mono text-[#1b1d22]/60 pt-4">
            <a href="tel:+41442889000" className="hover:text-[#f05a36] transition">+41 44 288 9000</a>
            <span>&bull;</span>
            <a href="mailto:commissions@vanguard-atelier.com" className="hover:text-[#f05a36] transition">commissions@vanguard-atelier.com</a>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 6. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="w-full py-12 px-8 lg:px-16 border-t border-[#1b1d22]/10 bg-[#ede8df] text-[#1b1d22]/60 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold tracking-widest text-[#1b1d22]">
            ATELIER VANGUARD ARCHITECTS &copy; 2026
          </span>

          <div className="flex items-center space-x-6 text-[11px]">
            <button onClick={scrollToTop} className="hover:text-[#1b1d22] transition">Back to Top ↑</button>
            <button onClick={onBackToCanvas} className="hover:text-[#f05a36] transition">Open Studio Canvas 🎨</button>
            <button onClick={onOpenCodeModal} className="hover:text-[#f05a36] transition">Export Clean Code ⚡</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
