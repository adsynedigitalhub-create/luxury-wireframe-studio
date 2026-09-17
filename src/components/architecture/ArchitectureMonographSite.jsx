import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ThreeArchitecturalVideo } from './ThreeArchitecturalVideo';

export function ArchitectureMonographSite({ onBackToCanvas, onOpenCodeModal }) {
  const [clocks, setClocks] = useState({
    zurich: '00:00:00',
    tokyo: '00:00:00',
    milan: '00:00:00',
    nyc: '00:00:00'
  });

  // Ticking World Clocks
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatTime = (tz) =>
        now.toLocaleTimeString('en-GB', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
      setClocks({
        zurich: formatTime('Europe/Zurich'),
        tokyo: formatTime('Asia/Tokyo'),
        milan: formatTime('Europe/Rome'),
        nyc: formatTime('America/New_York')
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Framer-motion scroll animations for Hero Zoom-in / Zoom-out
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Hero scale from 1.0 to 1.25 on scroll, opacity fade out smoothly
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.28]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // Distinct Luxury Villas Data (Every single one is unique!)
  const featuredVillas = [
    {
      id: 'villa-zurich',
      tag: 'ZURICH METROPOLIS // GOLDCOAST',
      title: 'Villa Aethelgard Monolith',
      location: 'Zurich, Switzerland',
      area: '1,450 m²',
      span: '12.4m Cantilever',
      type: 'Private Travertine Residence',
      realityImage: '/images/architecture/urban_villa_exterior.jpg',
      cadImage: '/images/architecture/urban_villa_cad.jpg',
      specs: 'Post-Tensioned Slabs • Integrated Turquoise Reflection Pool • City Skyline Vistas',
      desc: 'Floating monolithic travertine slabs balancing heavy structural mass over a central courtyard pool with metropolitan city lights reflecting across glass.'
    },
    {
      id: 'villa-tokyo',
      tag: 'TOKYO SHIBUYA // SANCTUARY',
      title: 'The Shibuya Zen Courtyard',
      location: 'Tokyo, Japan',
      area: '1,180 m²',
      span: 'L-Shaped Internal Atrium',
      type: 'Minimalist Timber & Concrete',
      realityImage: '/images/architecture/villa_tokyo.jpg',
      cadImage: '/images/architecture/urban_villa_cad.jpg',
      specs: 'Charred Shou Sugi Ban Wood • Cast Basalt Concrete • Illuminated Japanese Maple Water',
      desc: 'Japanese contemporary minimalist architecture combining dark charred cedar timber and architectural concrete around an illuminated bonsai reflection pool.'
    },
    {
      id: 'villa-milan',
      tag: 'MILANO SAN SIRO // INTERIOR SALON',
      title: 'Palazzo Urbano Sunken Salon',
      location: 'Milano, Italy',
      area: '1,820 m²',
      span: 'Double-Height Atrium',
      type: 'Sunken Living & Gallery',
      realityImage: '/images/architecture/urban_villa_living.jpg',
      cadImage: '/images/architecture/arch_phase1_blueprint.jpg',
      specs: 'Fluted Roman Travertine • Linear Architectural Fireplace • Floor-to-Ceiling Glazing',
      desc: 'An expansive double-height sunken living room with fluted natural travertine walls, low-profile Italian modular seating, and seamless glass doors opening directly to the pool.'
    },
    {
      id: 'villa-geneva',
      tag: 'GENEVA HORIZON // MASTER SUITE',
      title: 'Céleste Cantilever Observatory',
      location: 'Geneva Enclave, Switzerland',
      area: '2,100 m²',
      span: '16.8m Corner Glass Butt',
      type: 'Skyline Master Sanctuary',
      realityImage: '/images/architecture/urban_villa_bedroom.jpg',
      cadImage: '/images/architecture/urban_villa_cad.jpg',
      specs: 'Midnight City Skyline View • Fumed Oak Slats • Freestanding Calacatta Marble Bath',
      desc: 'Upper cantilevered master bedroom suite suspended over city lights with wraparound structural silicone glass joints, custom acoustic wood, and ensuite soaking tub.'
    }
  ];

  // Active space preview in Spaces section
  const [activeSpaceIndex, setActiveSpaceIndex] = useState(0);

  // Inquiry Form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    typology: 'Private Urban Villa',
    budget: '$15M — $30M',
    message: ''
  });

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090a0e] text-[#f3f4f6] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#f05a36] selection:text-white antialiased overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: FULL-WIDTH CRAZY 3D VISUAL + EXACT 1-LINE & 2-LINE COPY */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        id="hero"
        className="relative w-full h-screen min-h-[700px] flex flex-col justify-between overflow-hidden border-b border-white/10"
      >
        {/* Full-width Framer-Motion Zoom-in/out 3D Background */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0 origin-center pointer-events-none"
        >
          {/* Autonomous 3D Three.js Video Timelapse Visual */}
          <div className="absolute inset-0 pointer-events-auto">
            <ThreeArchitecturalVideo />
          </div>
          {/* Subtle cinematic gradient vignette for razor-sharp text focus */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#090a0e]/95 via-[#090a0e]/60 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090a0e] via-transparent to-[#090a0e]/75 pointer-events-none" />
        </motion.div>

        {/* IN-HERO MINIMALIST LUXURY HEADER (NO NUMBERS, CLEAN HAUTE TYPOGRAPHY) */}
        <header className="relative z-30 w-full px-6 lg:px-16 py-7 flex items-center justify-between border-b border-white/10 bg-[#090a0e]/30 backdrop-blur-md">
          {/* Logo & Monogram */}
          <div className="flex items-center space-x-3.5 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-9 h-9 border border-[#f05a36] bg-[#f05a36]/10 flex items-center justify-center font-['Cinzel',serif] font-bold text-white text-base tracking-widest shadow-[0_0_20px_rgba(240,90,54,0.35)]">
              AV
            </div>
            <div>
              <span className="block font-['Cinzel',serif] font-bold text-white tracking-[0.25em] text-sm uppercase">
                Atelier Vanguard
              </span>
              <span className="block text-[9px] tracking-[0.3em] text-[#f05a36] uppercase font-mono">
                Architectural Monograph
              </span>
            </div>
          </div>

          {/* Clean Navigation (NO NUMBERS - PURE LUXURY LABELS) */}
          <nav className="hidden md:flex items-center space-x-9 text-xs font-mono tracking-[0.18em] uppercase">
            <button
              onClick={() => scrollToSection('villas')}
              className="text-white/80 hover:text-[#f05a36] transition duration-300"
            >
              Villas
            </button>
            <button
              onClick={() => scrollToSection('spaces')}
              className="text-white/80 hover:text-[#f05a36] transition duration-300"
            >
              Spaces
            </button>
            <button
              onClick={() => scrollToSection('materials')}
              className="text-white/80 hover:text-[#f05a36] transition duration-300"
            >
              Materials
            </button>
            <button
              onClick={() => scrollToSection('studios')}
              className="text-white/80 hover:text-[#f05a36] transition duration-300"
            >
              Studios
            </button>
            <button
              onClick={() => scrollToSection('inquire')}
              className="text-white/80 hover:text-[#f05a36] transition duration-300"
            >
              Inquire
            </button>
          </nav>

          {/* Telemetry & Quick Action */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-[11px] font-mono text-white/70 bg-white/5 border border-white/10 px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ZURICH {clocks.zurich}</span>
            </div>
            <button
              onClick={() => scrollToSection('inquire')}
              className="px-5 py-2 text-xs font-mono uppercase tracking-[0.15em] bg-[#f05a36] hover:bg-[#d94827] text-white font-bold transition shadow-[0_0_25px_rgba(240,90,54,0.4)]"
            >
              Commission
            </button>
          </div>
        </header>

        {/* HERO FOCUSED 1-SIDED CONTENT (EXACT MATCH TO REFERENCE SCREENSHOT LAYOUT) */}
        <motion.div
          style={{ y: heroTextY }}
          className="relative z-20 flex-1 px-6 lg:px-16 flex flex-col justify-center max-w-3xl"
        >
          {/* Mini Category Tag (like CRUST & EMBER in screenshot) */}
          <div className="inline-flex items-center space-x-2.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-[#f05a36] shadow-[0_0_8px_#f05a36]" />
            <span className="text-xs font-mono tracking-[0.25em] text-[#f05a36] uppercase font-semibold">
              ATELIER VANGUARD // RESIDENTIAL MONOGRAPH
            </span>
          </div>

          {/* EXACT ONE SINGLE LINE HEADING */}
          <h1 className="font-['Syne',sans-serif] font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white tracking-tight uppercase leading-none mb-6 drop-shadow-2xl whitespace-nowrap">
            Your Sanctuary Awaits.
          </h1>

          {/* EXACT TWO LINES BODY TEXT */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-xl mb-8 drop-shadow-lg line-clamp-2">
            Engineering ultra-luxury private villas and monumental residences across the world's most exclusive cities. From computational CAD precision to breathtaking physical reality.
          </p>

          {/* Pill Action Buttons (like reference screenshot) */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToSection('villas')}
              className="px-7 py-3.5 bg-[#f05a36] hover:bg-[#d94827] text-white font-mono uppercase text-xs tracking-[0.2em] font-bold rounded-full transition duration-300 shadow-[0_0_30px_rgba(240,90,54,0.45)] hover:scale-105"
            >
              Explore Villas
            </button>
            <button
              onClick={() => scrollToSection('spaces')}
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono uppercase text-xs tracking-[0.2em] rounded-full backdrop-blur-md transition duration-300 hover:scale-105"
            >
              Interior Spaces
            </button>
          </div>
        </motion.div>

        {/* HERO BOTTOM STATUS STRIP */}
        <div className="relative z-20 w-full px-6 lg:px-16 py-4 border-t border-white/10 bg-[#090a0e]/80 backdrop-blur-md grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="block text-white/40 text-[10px] uppercase">EVOLUTION</span>
            <span className="text-white font-bold">CAD &bull; CRANE &bull; REAL VILLA</span>
          </div>
          <div>
            <span className="block text-white/40 text-[10px] uppercase">TIME ZONES</span>
            <span className="text-white font-bold">MIL {clocks.milan} // TYO {clocks.tokyo}</span>
          </div>
          <div>
            <span className="block text-white/40 text-[10px] uppercase">SCALE</span>
            <span className="text-white font-bold">14.2M FLOATING CANTILEVER</span>
          </div>
          <div>
            <span className="block text-white/40 text-[10px] uppercase">EXPERIENCE</span>
            <span className="text-[#f05a36] font-bold">FRAMER SCROLL ANIMATED</span>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. DISTINCT LUXURY VILLAS SHOWCASE (FULL-WIDTH FRAMER SCROLL ANIMATED)   */}
      {/* ========================================================================= */}
      <section id="villas" className="relative w-full py-32 px-6 lg:px-16 border-b border-white/10 bg-[#0c0e14]">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-white/10"
          >
            <div>
              <span className="text-[#f05a36] font-mono text-xs tracking-[0.25em] uppercase block mb-3 font-semibold">
                // MONUMENTAL COMMISSIONS
              </span>
              <h2 className="font-['Syne',sans-serif] font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
                Distinct Villas Portfolio
              </h2>
            </div>
            <p className="mt-4 md:mt-0 text-sm font-mono text-white/70 max-w-md text-right">
              Har villa ka architectural design mukammal alag hai — Tokyo Zen charred timber se lekar Zurich travertine cantilever tak.
            </p>
          </motion.div>

          {/* Large Visible Showcase Cards (NO HIDDEN BOXES - FULL VISUAL GLORY) */}
          <div className="space-y-28">
            {featuredVillas.map((villa, idx) => (
              <motion.div
                key={villa.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-white/15 bg-[#12151e] p-6 lg:p-10 shadow-2xl group hover:border-[#f05a36]/60 transition-colors duration-500"
              >
                {/* Visual Side: Big, Open, Visible Image with Framer Zoom Effect */}
                <div className={`lg:col-span-7 relative aspect-[16/10] overflow-hidden border border-white/10 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <motion.img
                    src={villa.realityImage}
                    alt={villa.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Floating Architectural Badge */}
                  <div className="absolute top-4 left-4 bg-black/85 border border-white/20 px-3.5 py-1.5 text-[11px] font-mono text-white backdrop-blur-md">
                    {villa.tag}
                  </div>

                  {/* CAD Section Callout Badge */}
                  <div className="absolute bottom-4 right-4 bg-black/90 border border-[#f05a36]/50 px-3 py-1 text-[10px] font-mono text-[#f05a36] backdrop-blur-md">
                    BIM MODEL VERIFIED &bull; 4K REALITY
                  </div>
                </div>

                {/* Narrative & Technical Specs Side */}
                <div className={`lg:col-span-5 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#f05a36] tracking-[0.2em] uppercase font-bold">
                      {villa.location} &bull; {villa.type}
                    </span>
                    <h3 className="font-['Syne',sans-serif] font-black text-3xl sm:text-4xl text-white group-hover:text-[#f05a36] transition-colors duration-300">
                      {villa.title}
                    </h3>
                  </div>

                  <p className="text-neutral-300 text-sm font-light leading-relaxed">
                    {villa.desc}
                  </p>

                  <div className="p-4 bg-black/50 border border-white/10 text-xs font-mono text-white/80">
                    <span className="text-[#f05a36] font-bold block mb-1">SPECIFICATION MATRIX:</span>
                    <span>{villa.specs}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                    <div>
                      <span className="block text-white/40 uppercase">FOOTPRINT AREA</span>
                      <span className="text-white font-bold text-sm">{villa.area}</span>
                    </div>
                    <div>
                      <span className="block text-white/40 uppercase">STRUCTURAL SPAN</span>
                      <span className="text-[#f05a36] font-bold text-sm">{villa.span}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. INTERIOR SPACES WALKTHROUGH (FRAMER-MOTION CINEMATIC VIEW)             */}
      {/* ========================================================================= */}
      <section id="spaces" className="relative w-full py-32 px-6 lg:px-16 border-b border-white/10 bg-[#090a0e] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10"
          >
            <div>
              <span className="text-[#f05a36] font-mono text-xs tracking-[0.25em] uppercase block mb-3 font-semibold">
                // INTERIOR SPACES
              </span>
              <h2 className="font-['Syne',sans-serif] font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
                Rooms & Sanctuaries
              </h2>
            </div>
            <p className="mt-4 md:mt-0 text-sm font-mono text-white/70 max-w-md text-right">
              Villa ke andar sunken living salon aur cantilevered master suite tak camera angles.
            </p>
          </motion.div>

          {/* Split Spaces Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Space 1: Sunken Living Salon */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="border border-white/15 bg-[#12151e] overflow-hidden shadow-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src="/images/architecture/urban_villa_living.jpg"
                  alt="Sunken Living Room"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-black/80 border border-white/20 px-3 py-1 text-xs font-mono text-white">
                  SPACE 01 // SUNKEN LIVING SALON
                </div>
              </div>
              <div className="p-8 space-y-4">
                <h3 className="font-['Syne',sans-serif] font-bold text-2xl text-white">
                  Double-Height Living Salon & Fireplace
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Fluted travertine natural stone wall, integrated linear architectural fireplace, aur sliding glass doors jo central turquoise courtyard pool ke samne khulti hain.
                </p>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
                  <span>CEILING HEIGHT: 6.2 METERS</span>
                  <span className="text-[#f05a36]">POOL CONNECTIVITY 100%</span>
                </div>
              </div>
            </motion.div>

            {/* Space 2: Cantilever Master Bedroom */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="border border-white/15 bg-[#12151e] overflow-hidden shadow-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src="/images/architecture/urban_villa_bedroom.jpg"
                  alt="Master Bedroom Suite"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-black/80 border border-white/20 px-3 py-1 text-xs font-mono text-white">
                  SPACE 02 // CANTILEVER MASTER SUITE
                </div>
              </div>
              <div className="p-8 space-y-4">
                <h3 className="font-['Syne',sans-serif] font-bold text-2xl text-white">
                  Upper Cantilever Suite & Skyline Panorama
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Upper cantilevered floor par bani master bedroom suite jahan corner glass metropolis skyline ka 360 view deta hai, dark oak slats aur freestanding marble tub ke sath.
                </p>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
                  <span>GLAZING: STRUCTURAL SILICONE</span>
                  <span className="text-[#f05a36]">SKYLINE ORIENTATION EAST</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. MATERIALS LABORATORY & ENGINEERING                                      */}
      {/* ========================================================================= */}
      <section id="materials" className="relative w-full py-32 px-6 lg:px-16 border-b border-white/10 bg-[#0c0e14]">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-20 pb-8 border-b border-white/10">
            <span className="text-[#f05a36] font-mono text-xs tracking-[0.25em] uppercase block mb-3 font-semibold">
              // PHYSICAL INTEGRITY
            </span>
            <h2 className="font-['Syne',sans-serif] font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
              Materials Laboratory
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-white/15 bg-[#12151e] shadow-xl">
              <span className="text-3xl font-['Cinzel',serif] text-[#f05a36] font-bold block mb-4">01</span>
              <h4 className="font-['Syne',sans-serif] font-bold text-xl text-white mb-2">
                Post-Tensioned Monoliths
              </h4>
              <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                Internal high-tensile steel cables jo concrete slabs ko 14+ meters tak bina kisi column ke float karne dete hain.
              </p>
              <div className="pt-4 border-t border-white/10 text-xs font-mono text-white/60">
                DEFLECTION TOLERANCE &lt; L/600
              </div>
            </div>

            <div className="p-8 border border-white/15 bg-[#12151e] shadow-xl">
              <span className="text-3xl font-['Cinzel',serif] text-[#f05a36] font-bold block mb-4">02</span>
              <h4 className="font-['Syne',sans-serif] font-bold text-xl text-white mb-2">
                Low-Iron Triple Glazing
              </h4>
              <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                Triple laminated solar-control glass sheets with frameless structural silicone joints for pure optical transparency.
              </p>
              <div className="pt-4 border-t border-white/10 text-xs font-mono text-white/60">
                LIGHT TRANSMITTANCE 78% // U-VALUE 0.5
              </div>
            </div>

            <div className="p-8 border border-white/15 bg-[#12151e] shadow-xl">
              <span className="text-3xl font-['Cinzel',serif] text-[#f05a36] font-bold block mb-4">03</span>
              <h4 className="font-['Syne',sans-serif] font-bold text-xl text-white mb-2">
                Thermal Mass Travertine
              </h4>
              <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                Italian honed travertine with integrated sub-surface geothermal loops for natural radiant climate stabilization.
              </p>
              <div className="pt-4 border-t border-white/10 text-xs font-mono text-white/60">
                ENDURANCE &gt; 150 YEARS
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. GLOBAL STUDIOS FOOTPRINT                                               */}
      {/* ========================================================================= */}
      <section id="studios" className="relative w-full py-32 px-6 lg:px-16 border-b border-white/10 bg-[#090a0e]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10">
            <div>
              <span className="text-[#f05a36] font-mono text-xs tracking-[0.25em] uppercase block mb-3 font-semibold">
                // WORLDWIDE LOCATIONS
              </span>
              <h2 className="font-['Syne',sans-serif] font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
                Global Studios
              </h2>
            </div>
            <div className="mt-4 md:mt-0 text-sm font-mono text-white/70">
              4 ATELIERS // 42 ACTIVE COMMISSIONS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { city: 'Zurich (HQ)', country: 'Switzerland', address: 'Gotthardstrasse 28', time: clocks.zurich, director: 'Henrik Vane' },
              { city: 'Milano', country: 'Italy', address: 'Via Montenapoleone 14', time: clocks.milan, director: 'Alexander Van Der Rohe' },
              { city: 'Tokyo', country: 'Japan', address: 'Minami-Aoyama 5-Chome', time: clocks.tokyo, director: 'Kenzo Tange Studio' },
              { city: 'New York', country: 'United States', address: 'Crosby Street, SoHo', time: clocks.nyc, director: 'Elena Rostova' }
            ].map((st, i) => (
              <div key={i} className="p-6 border border-white/15 bg-[#12151e] shadow-lg">
                <div className="flex items-center justify-between text-xs font-mono text-[#f05a36] mb-3">
                  <span>{st.country}</span>
                  <span className="text-white font-bold">{st.time}</span>
                </div>
                <h4 className="font-['Syne',sans-serif] font-bold text-2xl text-white mb-1">
                  {st.city}
                </h4>
                <p className="text-xs font-mono text-white/60 mb-6">{st.address}</p>
                <div className="pt-4 border-t border-white/10 text-xs font-mono">
                  <span className="block text-white/40 uppercase">DIRECTOR</span>
                  <span className="text-white font-bold">{st.director}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 6. COMMISSION PROTOCOL & INQUIRY                                          */}
      {/* ========================================================================= */}
      <section id="inquire" className="relative w-full py-32 px-6 lg:px-16 bg-[#0c0e14]">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[#f05a36] font-mono text-xs tracking-[0.25em] uppercase block font-semibold">
                // DIRECT INQUIRY
              </span>
              <h2 className="font-['Syne',sans-serif] font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
                Initiate Commission
              </h2>
              <p className="text-neutral-300 text-sm font-light leading-relaxed">
                Hamari firm har saal sirf limited private villa commissions accept karti hai taake har structure ko highest architectural precision aur craftsmanship di ja sake.
              </p>
              
              <div className="space-y-4 pt-6 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="block text-white/40 uppercase">DIRECT ENCRYPTED LINE</span>
                  <a href="tel:+41442889000" className="text-white hover:text-[#f05a36] font-bold transition">
                    +41 44 288 9000
                  </a>
                </div>
                <div>
                  <span className="block text-white/40 uppercase">CONFIDENTIAL DOSSIERS</span>
                  <a href="mailto:commissions@vanguard-atelier.com" className="text-white hover:text-[#f05a36] font-bold transition">
                    commissions@vanguard-atelier.com
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 bg-[#12151e] border border-white/15 p-8 lg:p-12 shadow-2xl">
              {formSubmitted ? (
                <div className="p-8 border border-emerald-500/40 bg-emerald-500/10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="font-['Syne',sans-serif] font-bold text-2xl text-white">
                    Commission Request Transmitted
                  </h3>
                  <p className="text-xs font-mono text-neutral-300">
                    Aapka architectural brief Atelier Council ko receive ho chuka hai. 24 ghante ke andar principal partner aap se briefing schedule karega.
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-mono text-white/60 uppercase mb-2">NAME *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name / Title"
                        className="w-full bg-black/60 border border-white/20 p-3.5 text-sm text-white placeholder-white/30 focus:border-[#f05a36] focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-white/60 uppercase mb-2">EMAIL *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="client@family-office.com"
                        className="w-full bg-black/60 border border-white/20 p-3.5 text-sm text-white placeholder-white/30 focus:border-[#f05a36] focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-mono text-white/60 uppercase mb-2">TYPOLOGY</label>
                      <select
                        value={formData.typology}
                        onChange={(e) => setFormData({ ...formData, typology: e.target.value })}
                        className="w-full bg-black/60 border border-white/20 p-3.5 text-sm text-white focus:border-[#f05a36] focus:outline-none transition"
                      >
                        <option>Private Urban Villa</option>
                        <option>Cantilever Residence</option>
                        <option>Lakefront Compound</option>
                        <option>Metropolitan Penthouse</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-white/60 uppercase mb-2">BUDGET</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-black/60 border border-white/20 p-3.5 text-sm text-white focus:border-[#f05a36] focus:outline-none transition"
                      >
                        <option>$5M — $15M USD</option>
                        <option>$15M — $30M USD</option>
                        <option>$30M — $60M+ USD</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-white/60 uppercase mb-2">COMMISSION BRIEF</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Site topography, city location, architectural aspirations..."
                      className="w-full bg-black/60 border border-white/20 p-3.5 text-sm text-white placeholder-white/30 focus:border-[#f05a36] focus:outline-none transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#f05a36] hover:bg-[#d94827] text-white font-mono uppercase text-xs tracking-[0.25em] font-bold transition shadow-[0_0_30px_rgba(240,90,54,0.4)]"
                  >
                    Submit Commission Brief &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 7. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="w-full py-16 px-6 lg:px-16 border-t border-white/10 bg-[#08090d] text-white/60 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border border-[#f05a36] flex items-center justify-center text-[#f05a36] text-[10px] font-bold">
              AV
            </div>
            <span className="text-white font-bold tracking-widest">
              ATELIER VANGUARD ARCHITECTS &copy; 2026
            </span>
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <button onClick={() => scrollToSection('hero')} className="hover:text-white transition">Back to Top ↑</button>
            <button onClick={onBackToCanvas} className="hover:text-[#f05a36] transition">Open Studio Canvas 🎨</button>
            <button onClick={onOpenCodeModal} className="hover:text-[#f05a36] transition">Export Clean Code ⚡</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
