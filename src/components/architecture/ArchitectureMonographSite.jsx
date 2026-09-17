import React, { useState, useEffect, useRef } from 'react';
import { ThreeArchitecturalVideo } from './ThreeArchitecturalVideo';

export function ArchitectureMonographSite({ onBackToCanvas, onOpenCodeModal }) {
  // Navigation active section tracking
  const [activeSection, setActiveSection] = useState('hero');
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

  // Section 2: Interactive Blueprint-to-Reality Card State
  const [activeMorphCard, setActiveMorphCard] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [sliderPositions, setSliderPositions] = useState({ 0: 50, 1: 50, 2: 50 });

  // Section 3: Cinematic Interior Walkthrough Camera Angles
  const [currentCameraAngle, setCurrentCameraAngle] = useState(0);
  const [isAutoTourPlaying, setIsAutoTourPlaying] = useState(true);

  const cameraAngles = [
    {
      id: 'blueprint',
      tag: 'ANGLE 01 // ORTHOGRAPHIC & ISOMETRIC',
      title: 'Structural CAD Blueprint & Floorplan',
      desc: 'High-precision BIM vector drafting showing sunken salon, central pool courtyard, guest wing, and cantilevered upper structural core with level marks.',
      image: '/images/architecture/urban_villa_cad.jpg',
      fallback: '/images/architecture/arch_phase1_blueprint.jpg',
      specs: { focal: 'Orthographic 50mm', fStop: 'f/8.0', axis: 'Grid A-F // Level +0.00 to +8.50m', material: 'Reinforced Steel & Monolithic Concrete' }
    },
    {
      id: 'exterior',
      tag: 'ANGLE 02 // EXTERIOR DUSK CINEMATIC',
      title: 'City Metropolis Enclave & Illuminated Facade',
      desc: 'Ground-level dusk perspective capturing the cantilevered upper floor hovering over a turquoise reflection pool with sparkling urban skyline bokeh.',
      image: '/images/architecture/urban_villa_exterior.jpg',
      fallback: '/images/architecture/arch_phase3_reality.jpg',
      specs: { focal: 'Wide 24mm Anamorphic', fStop: 'f/2.8', axis: 'West Garden Axis // Golden Dusk', material: 'Honed Roman Travertine & Fluted Basalt' }
    },
    {
      id: 'living',
      tag: 'ANGLE 03 // INTERIOR SUNKEN SALON',
      title: 'Double-Height Living Salon & Fireplace',
      desc: 'Camera moves inside the sunken living room with fluted travertine stone wall, integrated architectural fireplace, and uninterrupted floor-to-ceiling glass pool views.',
      image: '/images/architecture/urban_villa_living.jpg',
      fallback: '/images/architecture/arch_phase3_reality.jpg',
      specs: { focal: 'Cinematic 35mm Prime', fStop: 'f/1.8', axis: 'Interior Datum // Courtyard Elevation', material: 'Italian Minotti Boucle, Fumed Oak, Glass' }
    },
    {
      id: 'bedroom',
      tag: 'ANGLE 04 // CANTILEVER MASTER SANCTUARY',
      title: 'Upper Cantilever Suite & Skyline Panorama',
      desc: 'Gliding into the upper master suite with wraparound structural glazing framing the midnight metropolis lights, dark oak acoustic slats, and marble ensuite soaking tub.',
      image: '/images/architecture/urban_villa_bedroom.jpg',
      fallback: '/images/architecture/arch_phase3_reality.jpg',
      specs: { focal: 'Portrait 50mm T1.5', fStop: 'f/1.4', axis: 'Upper Horizon // 360 Metropolis Glazing', material: 'Calacatta Paonazzo Marble & Fluted Glass' }
    }
  ];

  // Auto-advance camera tour if playing
  useEffect(() => {
    if (!isAutoTourPlaying) return;
    const tourTimer = setInterval(() => {
      setCurrentCameraAngle((prev) => (prev + 1) % cameraAngles.length);
    }, 6000);
    return () => clearInterval(tourTimer);
  }, [isAutoTourPlaying, cameraAngles.length]);

  // Project Morphing Cards Data
  const morphProjects = [
    {
      id: 'villa-zurich',
      code: 'ATV-V01',
      title: 'Villa Aethelgard Residence',
      city: 'Zurich Goldcoast, Switzerland',
      area: '1,450 m²',
      span: '12.4m Floating Cantilever',
      cadImage: '/images/architecture/urban_villa_cad.jpg',
      cadFallback: '/images/architecture/arch_phase1_blueprint.jpg',
      realImage: '/images/architecture/urban_villa_exterior.jpg',
      realFallback: '/images/architecture/arch_phase3_reality.jpg',
      specs: ['Monolithic Post-Tensioned Slabs', 'Low-Iron Triple Glazing (U=0.5)', 'Heated Basalt Stone Decking'],
      narrative: 'A private metropolitan sanctuary balancing heavy travertine mass with razor-thin structural glass edges suspended directly over reflective water.'
    },
    {
      id: 'villa-milan',
      code: 'ATV-V02',
      title: 'Palazzo Urbano Solarium',
      city: 'Milano City San Siro, Italy',
      area: '1,820 m²',
      span: 'Double-Height Internal Biophilic Atrium',
      cadImage: '/images/architecture/arch_phase1_blueprint.jpg',
      cadFallback: '/images/architecture/urban_villa_cad.jpg',
      realImage: '/images/architecture/urban_villa_living.jpg',
      realFallback: '/images/architecture/arch_phase3_reality.jpg',
      specs: ['Fluted Roman Travertine Veneer', 'Sub-Zero Geothermal Climatization', 'Integrated Linear Fireplace'],
      narrative: 'A sunken architectural living pavilion engineered for seamless indoor-outdoor transition between living salon and courtyard reflection pool.'
    },
    {
      id: 'villa-geneva',
      code: 'ATV-V03',
      title: 'Céleste Cantilever Observatory',
      city: 'Lake Geneva Enclave, Switzerland',
      area: '2,100 m²',
      span: '16.8m Panoramic Corner Glazing',
      cadImage: '/images/architecture/urban_villa_cad.jpg',
      cadFallback: '/images/architecture/arch_phase1_blueprint.jpg',
      realImage: '/images/architecture/urban_villa_bedroom.jpg',
      realFallback: '/images/architecture/arch_phase3_reality.jpg',
      specs: ['Fumed French Oak Paneling', 'Acoustic Sound Decoupling Walls', 'Calacatta Marble Monolithic Tub'],
      narrative: 'An elevated private sanctuary capturing sweeping metropolitan city lights through uninterrupted structural silicone corner joints.'
    }
  ];

  // Inquiry Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    typology: 'Private Urban Villa',
    location: '',
    budget: '$15M — $30M',
    message: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d11] text-[#f3f4f6] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#f05a36] selection:text-white antialiased overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO WITH IN-HERO INTEGRATED HEADER & 3D TIMELAPSE VIDEO     */}
      {/* ========================================================================= */}
      <section id="hero" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden border-b border-white/10">
        
        {/* Full Background 3D Three.js Autonomous Video Timelapse */}
        <div className="absolute inset-0 z-0">
          <ThreeArchitecturalVideo />
          {/* Subtle cinematic gradient scrim for ultra-focused high contrast text */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d11]/95 via-[#0b0d11]/70 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d11] via-transparent to-[#0b0d11]/80 pointer-events-none" />
          {/* Architectural Subtle Background Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        </div>

        {/* IN-HERO INTEGRATED LUXURY HEADER (Overlaying Top of Full Hero Visual) */}
        <header className="relative z-30 w-full px-6 lg:px-14 py-6 flex items-center justify-between border-b border-white/10 bg-[#0b0d11]/40 backdrop-blur-md">
          {/* Atelier Monogram & Brand Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 border border-[#f05a36] bg-[#f05a36]/10 flex items-center justify-center font-['Cinzel',serif] font-bold text-white text-lg tracking-widest shadow-[0_0_20px_rgba(240,90,54,0.3)]">
              AV
            </div>
            <div>
              <span className="block font-['Cinzel',serif] font-bold text-white tracking-[0.25em] text-sm uppercase">
                Atelier Vanguard
              </span>
              <span className="block text-[10px] tracking-[0.3em] text-[#f05a36] uppercase font-mono">
                Architectural Monograph // Zurich &bull; Milan
              </span>
            </div>
          </div>

          {/* In-Hero Section Jump Anchors */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-mono tracking-widest uppercase">
            <button
              onClick={() => scrollToSection('blueprint-reality')}
              className="text-white/80 hover:text-[#f05a36] transition flex items-center space-x-1.5 group"
            >
              <span className="text-[#f05a36]">01.</span>
              <span className="group-hover:translate-x-0.5 transition-transform">Morphing Cards</span>
            </button>
            <button
              onClick={() => scrollToSection('interior-tour')}
              className="text-white/80 hover:text-[#f05a36] transition flex items-center space-x-1.5 group"
            >
              <span className="text-[#f05a36]">02.</span>
              <span className="group-hover:translate-x-0.5 transition-transform">3D Room Tour</span>
            </button>
            <button
              onClick={() => scrollToSection('works')}
              className="text-white/80 hover:text-[#f05a36] transition flex items-center space-x-1.5 group"
            >
              <span className="text-[#f05a36]">03.</span>
              <span className="group-hover:translate-x-0.5 transition-transform">Villas Portfolio</span>
            </button>
            <button
              onClick={() => scrollToSection('rnd-lab')}
              className="text-white/80 hover:text-[#f05a36] transition flex items-center space-x-1.5 group"
            >
              <span className="text-[#f05a36]">04.</span>
              <span className="group-hover:translate-x-0.5 transition-transform">Materials Lab</span>
            </button>
            <button
              onClick={() => scrollToSection('studios')}
              className="text-white/80 hover:text-[#f05a36] transition flex items-center space-x-1.5 group"
            >
              <span className="text-[#f05a36]">05.</span>
              <span className="group-hover:translate-x-0.5 transition-transform">Studios</span>
            </button>
            <button
              onClick={() => scrollToSection('inquiry')}
              className="text-white/80 hover:text-[#f05a36] transition flex items-center space-x-1.5 group"
            >
              <span className="text-[#f05a36]">06.</span>
              <span className="group-hover:translate-x-0.5 transition-transform">Commission</span>
            </button>
          </nav>

          {/* Studio Telemetry & Commission CTA */}
          <div className="flex items-center space-x-5">
            <div className="hidden sm:flex items-center space-x-2 text-[11px] font-mono text-white/70 bg-white/5 border border-white/10 px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ZURICH {clocks.zurich}</span>
            </div>
            <button
              onClick={() => scrollToSection('inquiry')}
              className="px-5 py-2 text-xs font-mono uppercase tracking-widest bg-[#f05a36] hover:bg-[#d94827] text-white font-bold transition shadow-[0_0_25px_rgba(240,90,54,0.4)]"
            >
              Inquire
            </button>
          </div>
        </header>

        {/* HERO FOCUSED EDITORIAL CONTENT (Left Side Massive Bold Architecture) */}
        <div className="relative z-20 flex-1 px-6 lg:px-14 py-16 flex flex-col justify-center max-w-4xl">
          
          {/* Architectural Coordinate Beacon */}
          <div className="inline-flex items-center space-x-3 mb-6 bg-black/60 border border-white/15 px-4 py-1.5 backdrop-blur-md w-fit">
            <span className="w-2 h-2 rounded-full bg-[#f05a36] shadow-[0_0_8px_#f05a36]" />
            <span className="text-xs font-mono tracking-widest text-white uppercase">
              BIM 4D // MONUMENTAL URBAN RESIDENCES
            </span>
            <span className="text-xs font-mono text-white/40">|</span>
            <span className="text-xs font-mono text-[#f05a36] tracking-wider">
              N 47° 22' 40" E 8° 32' 28"
            </span>
          </div>

          {/* Massive Cinematic Bold Headline */}
          <h1 className="font-['Syne',sans-serif] font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.92] mb-8 drop-shadow-2xl">
            Pure <br />
            <span className="font-['Cinzel',serif] italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
              Architecture
            </span> <br />
            <span className="text-[#f05a36]">In Motion.</span>
          </h1>

          {/* Architectural Manifesto Rationale */}
          <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl mb-10 drop-shadow-lg">
            Hum CAD wireframe blueprints aur active construction sites se shuru karke real-world luxury travertine city villas ko generate karte hain. Har structure ek cinematic visual route hai jahan pure geometry aur physical reality aapas mein milti hain.
          </p>

          {/* Action CTAs & Specifications Bar */}
          <div className="flex flex-wrap items-center gap-5">
            <button
              onClick={() => scrollToSection('blueprint-reality')}
              className="px-8 py-4 bg-[#f05a36] hover:bg-[#d94827] text-white font-mono uppercase text-xs tracking-[0.2em] font-bold transition flex items-center space-x-3 shadow-[0_0_30px_rgba(240,90,54,0.45)] group"
            >
              <span>Explore Morphing Cards</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </button>
            <button
              onClick={() => scrollToSection('interior-tour')}
              className="px-8 py-4 border border-white/30 hover:border-white bg-black/40 hover:bg-white/10 backdrop-blur-md text-white font-mono uppercase text-xs tracking-[0.2em] transition"
            >
              Enter 3D Room Tour
            </button>
          </div>
        </div>

        {/* HERO BOTTOM STATUS STRIP */}
        <div className="relative z-20 w-full px-6 lg:px-14 py-4 border-t border-white/10 bg-[#0b0d11]/70 backdrop-blur-md grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="border-l border-[#f05a36] pl-3">
            <span className="block text-white/50 text-[10px] uppercase">EVOLUTION TIMELAPSE</span>
            <span className="text-white font-bold">CAD &rarr; CRANE &rarr; REAL VILLA</span>
          </div>
          <div className="border-l border-white/20 pl-3">
            <span className="block text-white/50 text-[10px] uppercase">GLOBAL STUDIO CLOCKS</span>
            <span className="text-white font-bold">MIL {clocks.milan} // TYO {clocks.tokyo}</span>
          </div>
          <div className="border-l border-white/20 pl-3">
            <span className="block text-white/50 text-[10px] uppercase">MONOLITHIC SCALE</span>
            <span className="text-white font-bold">12.4M CANTILEVER OVER POOL</span>
          </div>
          <div className="border-l border-[#f05a36] pl-3 flex items-center justify-between">
            <div>
              <span className="block text-white/50 text-[10px] uppercase">3D CINEMATIC VIEW</span>
              <span className="text-[#f05a36] font-bold">AUTONOMOUS NO BUTTONS</span>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. INTERACTIVE BLUEPRINT-TO-REALITY MORPHING CARDS                        */}
      {/* ========================================================================= */}
      <section id="blueprint-reality" className="relative w-full py-28 px-6 lg:px-14 border-b border-white/10 bg-[#0c0e14]">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#f05a36] font-mono text-xs tracking-widest uppercase mb-3">
                <span>// ARCHITECTURAL MORPHING MATRIX</span>
              </div>
              <h2 className="font-['Syne',sans-serif] font-bold text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
                Blueprint &rarr; Reality
              </h2>
            </div>
            <p className="mt-4 md:mt-0 text-sm font-mono text-white/70 max-w-md text-right">
              Card par mouse le jayein ya interactive split drag karein — technical CAD architectural blueprint foran real finished luxury villa mein transform ho jati hai.
            </p>
          </div>

          {/* Grid of Interactive Morphing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {morphProjects.map((project, idx) => {
              const isHovered = hoveredCardIndex === idx;
              const sliderPos = sliderPositions[idx] || 50;

              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setHoveredCardIndex(idx)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                  className="group relative bg-[#12151d] border border-white/15 overflow-hidden transition-all duration-500 hover:border-[#f05a36] shadow-2xl flex flex-col"
                >
                  {/* Top Technical Metadata Bar */}
                  <div className="p-4 border-b border-white/10 flex items-center justify-between text-[11px] font-mono bg-black/50">
                    <span className="text-[#f05a36] font-bold">{project.code}</span>
                    <span className="text-white/80">{project.city}</span>
                    <span className="px-2 py-0.5 bg-white/10 text-white text-[10px] tracking-wider uppercase">
                      {isHovered ? 'REALITY VISUAL' : 'CAD BLUEPRINT'}
                    </span>
                  </div>

                  {/* Visual Morphing Canvas (Video Style Transition) */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black select-none">
                    
                    {/* Layer 1: Real Luxury Villa Photograph (Revealed on Hover / Split) */}
                    <img
                      src={project.realImage}
                      alt={`${project.title} Finished Reality`}
                      onError={(e) => { e.target.src = project.realFallback; }}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Layer 2: Architectural CAD Blueprint (Top overlay with clip-path or smooth crossfade) */}
                    <div
                      className="absolute inset-0 transition-opacity duration-700 ease-out"
                      style={{
                        opacity: isHovered ? 0.05 : 1.0,
                        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      <img
                        src={project.cadImage}
                        alt={`${project.title} CAD Blueprint`}
                        onError={(e) => { e.target.src = project.cadFallback; }}
                        className="w-full h-full object-cover filter contrast-125 brightness-90"
                      />
                      {/* Blueprint Grid Overlay Lines */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff15_1px,transparent_1px),linear-gradient(to_bottom,#00ffff15_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
                      
                      {/* Badge indicating CAD Mode */}
                      <div className="absolute top-3 left-3 bg-black/80 border border-cyan-400/40 px-2.5 py-1 text-[10px] font-mono text-cyan-300">
                        &bull; CAD BLUEPRINT [AXIS A-F]
                      </div>
                    </div>

                    {/* Hover Reality Indicator Badge */}
                    <div
                      className="absolute bottom-3 right-3 bg-[#f05a36] text-white px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase transition-opacity duration-300 shadow-lg"
                      style={{ opacity: isHovered ? 1 : 0 }}
                    >
                      REALITY 4K VISUAL &bull; HOVER ACTIVE
                    </div>
                  </div>

                  {/* Bottom Information Rationale */}
                  <div className="p-6 flex-1 flex flex-col justify-between bg-[#11141b]">
                    <div>
                      <h3 className="font-['Syne',sans-serif] font-bold text-2xl text-white mb-2 group-hover:text-[#f05a36] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-neutral-300 font-light leading-relaxed mb-4">
                        {project.narrative}
                      </p>
                    </div>

                    {/* Technical Specification Chips */}
                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-white/50 uppercase">GROSS FLOOR AREA</span>
                        <span className="text-white font-bold">{project.area}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-white/50 uppercase">CANTILEVER SPAN</span>
                        <span className="text-[#f05a36] font-bold">{project.span}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. CINEMATIC INTERIOR WALKTHROUGH ("ROOM-BY-ROOM 3D CAMERA TOUR")         */}
      {/* ========================================================================= */}
      <section id="interior-tour" className="relative w-full py-28 px-6 lg:px-14 border-b border-white/10 bg-[#090a0e] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#f05a36] font-mono text-xs tracking-widest uppercase mb-3">
                <span className="w-2 h-2 rounded-full bg-[#f05a36] animate-ping" />
                <span>// CINEMATIC ROOM WALKTHROUGH WITH CAMERA ANGLES</span>
              </div>
              <h2 className="font-['Syne',sans-serif] font-bold text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
                Inside The City Villa
              </h2>
            </div>
            
            {/* Tour Controls */}
            <div className="mt-6 lg:mt-0 flex items-center space-x-4">
              <button
                onClick={() => setIsAutoTourPlaying(!isAutoTourPlaying)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold border transition ${
                  isAutoTourPlaying
                    ? 'border-[#f05a36] bg-[#f05a36]/20 text-white'
                    : 'border-white/30 text-white/70 hover:text-white'
                }`}
              >
                {isAutoTourPlaying ? '⏸ Pause Auto Tour' : '▶ Play Auto Tour'}
              </button>
            </div>
          </div>

          {/* Giant Cinematic Viewport */}
          <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] bg-black border border-white/20 overflow-hidden shadow-2xl">
            
            {/* Active Camera Image */}
            <img
              src={cameraAngles[currentCameraAngle].image}
              alt={cameraAngles[currentCameraAngle].title}
              onError={(e) => { e.target.src = cameraAngles[currentCameraAngle].fallback; }}
              className="w-full h-full object-cover transition-all duration-1000 transform scale-100 hover:scale-102"
            />

            {/* Dark Dramatic Gradient Scrims for text focus */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Viewport Floating HUD Metadata (Top) */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/90">
              <div className="bg-black/75 border border-white/20 px-3 py-1.5 backdrop-blur-md">
                <span className="text-[#f05a36] font-bold">{cameraAngles[currentCameraAngle].tag}</span>
              </div>
              <div className="hidden sm:flex items-center space-x-3 bg-black/75 border border-white/20 px-3 py-1.5 backdrop-blur-md">
                <span>FOCAL: {cameraAngles[currentCameraAngle].specs.focal}</span>
                <span>&bull;</span>
                <span>APERTURE: {cameraAngles[currentCameraAngle].specs.fStop}</span>
              </div>
            </div>

            {/* Viewport Lower Content (Bottom Left Focused Narrative) */}
            <div className="absolute bottom-6 left-6 right-6 lg:right-auto lg:max-w-2xl bg-black/85 border border-white/20 p-6 backdrop-blur-md">
              <span className="text-[10px] font-mono text-[#f05a36] tracking-[0.25em] uppercase block mb-1">
                LOCATION: {cameraAngles[currentCameraAngle].specs.axis}
              </span>
              <h3 className="font-['Syne',sans-serif] font-bold text-2xl sm:text-3xl text-white mb-2">
                {cameraAngles[currentCameraAngle].title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-4">
                {cameraAngles[currentCameraAngle].desc}
              </p>
              <div className="text-[11px] font-mono text-white/70 flex items-center space-x-2">
                <span className="text-white/40 uppercase">PRIMARY MATERIAL:</span>
                <span className="text-white font-bold">{cameraAngles[currentCameraAngle].specs.material}</span>
              </div>
            </div>
          </div>

          {/* Interactive Camera Angle Selector Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {cameraAngles.map((cam, idx) => (
              <button
                key={cam.id}
                onClick={() => {
                  setCurrentCameraAngle(idx);
                  setIsAutoTourPlaying(false);
                }}
                className={`p-4 text-left border transition-all ${
                  currentCameraAngle === idx
                    ? 'border-[#f05a36] bg-[#f05a36]/15 shadow-[0_0_20px_rgba(240,90,54,0.3)]'
                    : 'border-white/10 bg-[#12151e] hover:border-white/30 text-white/70'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className={currentCameraAngle === idx ? 'text-[#f05a36] font-bold' : 'text-white/40'}>
                    0{idx + 1}. CAM
                  </span>
                  {currentCameraAngle === idx && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f05a36]" />
                  )}
                </div>
                <h4 className="font-bold text-white text-xs sm:text-sm truncate">
                  {cam.title}
                </h4>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. MONUMENTAL WORKS & VILLA CATALOG                                       */}
      {/* ========================================================================= */}
      <section id="works" className="relative w-full py-28 px-6 lg:px-14 border-b border-white/10 bg-[#0c0e14]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#f05a36] font-mono text-xs tracking-widest uppercase mb-3">
                <span>// SELECT MONUMENTAL COMMISSIONS</span>
              </div>
              <h2 className="font-['Syne',sans-serif] font-bold text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
                Architectural Works
              </h2>
            </div>
            <div className="mt-4 md:mt-0 text-sm font-mono text-white/70">
              COMMISSION TYPOLOGIES: PRIVATE VILLAS // URBAN MASTERPLANS
            </div>
          </div>

          {/* Large Editorial Project Showcases */}
          <div className="space-y-16">
            
            {/* Feature 1: Monolithic Travertine City Villa */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-white/15 bg-[#12151e] p-6 lg:p-10">
              <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden border border-white/10">
                <img
                  src="/images/architecture/urban_villa_exterior.jpg"
                  alt="Metropolis Sanctuary Villa"
                  onError={(e) => { e.target.src = '/images/architecture/arch_phase3_reality.jpg'; }}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-black/80 border border-white/20 px-3 py-1 text-xs font-mono text-white">
                  ATV-W01 // ZURICH METROPOLIS
                </div>
              </div>
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#f05a36] tracking-widest uppercase">
                    COMPLETED 2025 // RESIDENTIAL MONOGRAPH
                  </span>
                  <h3 className="font-['Syne',sans-serif] font-bold text-3xl sm:text-4xl text-white">
                    Villa Solarium Lakefront
                  </h3>
                </div>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Ek private urban residence jo lakefront Zurich ke paas monolithic reinforced post-tensioned slabs aur 360-degree acoustic glazed facade par banai gayi hai. Is mein central courtyard reflection pool aur double-height sunken salon shaamil hain.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                  <div>
                    <span className="block text-white/40 uppercase">GROSS FOOTPRINT</span>
                    <span className="text-white font-bold">1,680 M²</span>
                  </div>
                  <div>
                    <span className="block text-white/40 uppercase">STRUCTURAL SPAN</span>
                    <span className="text-[#f05a36] font-bold">14.2M CANTILEVER</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Alpine Cliffside Villa */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-white/15 bg-[#12151e] p-6 lg:p-10">
              <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#f05a36] tracking-widest uppercase">
                    COMPLETED 2024 // HIGH RESIDENTIAL
                  </span>
                  <h3 className="font-['Syne',sans-serif] font-bold text-3xl sm:text-4xl text-white">
                    Aethelgard Clifftop Observatory
                  </h3>
                </div>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Granite cliff edge par anchored modern architectural wonder. Suspended infinity pool valley ke upar float karti hai aur corner structural glass joints uninterrupted alpine horizons offer karte hain.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                  <div>
                    <span className="block text-white/40 uppercase">FOUNDATION MAT</span>
                    <span className="text-white font-bold">MICROPILINGS IN GRANITE</span>
                  </div>
                  <div>
                    <span className="block text-white/40 uppercase">THERMAL RATING</span>
                    <span className="text-[#f05a36] font-bold">PASSIVE HOUSE CERTIFIED</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden border border-white/10 order-1 lg:order-2">
                <img
                  src="/images/architecture/arch_phase3_reality.jpg"
                  alt="Aethelgard Clifftop Observatory"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-black/80 border border-white/20 px-3 py-1 text-xs font-mono text-white">
                  ATV-W02 // VALAIS ALPS
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. COMPUTATIONAL DESIGN & MATERIALS LAB (R&D)                             */}
      {/* ========================================================================= */}
      <section id="rnd-lab" className="relative w-full py-28 px-6 lg:px-14 border-b border-white/10 bg-[#090a0e]">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-16 pb-6 border-b border-white/10">
            <div className="inline-flex items-center space-x-2 text-[#f05a36] font-mono text-xs tracking-widest uppercase mb-3">
              <span>// ENGINEERING & COMPUTATIONAL MATERIALITY</span>
            </div>
            <h2 className="font-['Syne',sans-serif] font-bold text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
              Materials Laboratory
            </h2>
            <p className="mt-4 text-sm font-mono text-white/70 max-w-2xl">
              Hamari engineering laboratory structural physics, parametric algorithms aur zero-carbon concrete ke saath building limits ko push karti hai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-white/15 bg-[#12151e]">
              <span className="text-3xl font-['Cinzel',serif] text-[#f05a36] font-bold block mb-4">01</span>
              <h4 className="font-['Syne',sans-serif] font-bold text-xl text-white mb-2">
                Post-Tensioned Monoliths
              </h4>
              <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                Internal high-tensile steel cables jo concrete slabs ko 16+ meters tak bina kisi column support ke cantilever hone dete hain.
              </p>
              <div className="pt-4 border-t border-white/10 text-xs font-mono text-white/60">
                DEFLECTION TOLERANCE &lt; L/600
              </div>
            </div>

            <div className="p-8 border border-white/15 bg-[#12151e]">
              <span className="text-3xl font-['Cinzel',serif] text-[#f05a36] font-bold block mb-4">02</span>
              <h4 className="font-['Syne',sans-serif] font-bold text-xl text-white mb-2">
                Low-Iron Acoustic Glazing
              </h4>
              <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                Triple laminated solar-control glass sheets with structural silicone corner butts for completely frameless vistas.
              </p>
              <div className="pt-4 border-t border-white/10 text-xs font-mono text-white/60">
                LIGHT TRANSMITTANCE 78% // U-VALUE 0.5
              </div>
            </div>

            <div className="p-8 border border-white/15 bg-[#12151e]">
              <span className="text-3xl font-['Cinzel',serif] text-[#f05a36] font-bold block mb-4">03</span>
              <h4 className="font-['Syne',sans-serif] font-bold text-xl text-white mb-2">
                Thermal Mass Travertine
              </h4>
              <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                Directly quarried Italian honed travertine with sub-surface geothermal loops for natural radiant climate stabilization.
              </p>
              <div className="pt-4 border-t border-white/10 text-xs font-mono text-white/60">
                LIFETIME ENDURANCE &gt; 150 YEARS
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 6. GLOBAL STUDIOS FOOTPRINT & DIRECTORS                                    */}
      {/* ========================================================================= */}
      <section id="studios" className="relative w-full py-28 px-6 lg:px-14 border-b border-white/10 bg-[#0c0e14]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#f05a36] font-mono text-xs tracking-widest uppercase mb-3">
                <span>// INTERNATIONAL PRESENCE</span>
              </div>
              <h2 className="font-['Syne',sans-serif] font-bold text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
                Global Studios
              </h2>
            </div>
            <div className="mt-4 md:mt-0 text-sm font-mono text-white/70">
              4 ATELIERS // 42 COMMISSIONS ACTIVE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                city: 'Zurich (HQ)',
                country: 'Switzerland',
                address: 'Gotthardstrasse 28, 8002',
                time: clocks.zurich,
                director: 'Henrik Vane',
                active: '14 Commissions'
              },
              {
                city: 'Milano',
                country: 'Italy',
                address: 'Via Montenapoleone 14, 20121',
                time: clocks.milan,
                director: 'Alexander Van Der Rohe',
                active: '11 Commissions'
              },
              {
                city: 'Tokyo',
                country: 'Japan',
                address: 'Minami-Aoyama 5-Chome, 107',
                time: clocks.tokyo,
                director: 'Kenzo Tange Studio',
                active: '9 Commissions'
              },
              {
                city: 'New York',
                country: 'United States',
                address: 'Crosby Street, SoHo 10012',
                time: clocks.nyc,
                director: 'Elena Rostova',
                active: '8 Commissions'
              }
            ].map((st, i) => (
              <div key={i} className="p-6 border border-white/15 bg-[#12151e] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#f05a36] mb-3">
                    <span>{st.country}</span>
                    <span className="text-white font-bold">{st.time}</span>
                  </div>
                  <h4 className="font-['Syne',sans-serif] font-bold text-2xl text-white mb-2">
                    {st.city}
                  </h4>
                  <p className="text-xs font-mono text-white/60 mb-6">
                    {st.address}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 text-xs font-mono">
                  <span className="block text-white/40 uppercase">PARTNER IN CHARGE</span>
                  <span className="text-white font-bold">{st.director}</span>
                  <span className="block text-[#f05a36] mt-1">{st.active}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 7. PRIVATE VILLA COMMISSIONING & INQUIRY                                   */}
      {/* ========================================================================= */}
      <section id="inquiry" className="relative w-full py-28 px-6 lg:px-14 bg-[#090a0e]">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 text-[#f05a36] font-mono text-xs tracking-widest uppercase">
                <span>// PRIVATE COMMISSION PROTOCOL</span>
              </div>
              <h2 className="font-['Syne',sans-serif] font-bold text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
                Initiate A Commission
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
                <div>
                  <span className="block text-white/40 uppercase">CHIEF OF ARCHITECTURAL PROTOCOL</span>
                  <span className="text-[#f05a36] font-bold">Atelier Vanguard Advisory Council</span>
                </div>
              </div>
            </div>

            {/* Commission Form */}
            <div className="lg:col-span-7 bg-[#12151e] border border-white/15 p-8 lg:p-12">
              {formSubmitted ? (
                <div className="p-8 border border-emerald-500/40 bg-emerald-500/10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="font-['Syne',sans-serif] font-bold text-2xl text-white">
                    Commission Request Received
                  </h3>
                  <p className="text-xs font-mono text-neutral-300 max-w-md mx-auto">
                    Aapka architectural brief Atelier Council ko transmit ho chuka hai. 24 ghante ke andar principal partner aap se confidential briefing schedule karega.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-mono text-white/60 uppercase mb-2">
                        CLIENT / PRINCIPAL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Lord / Lady / Dr. / Name"
                        className="w-full bg-black/60 border border-white/20 p-3.5 text-sm text-white placeholder-white/30 focus:border-[#f05a36] focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-white/60 uppercase mb-2">
                        OFFICIAL EMAIL *
                      </label>
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
                      <label className="block text-[10px] font-mono text-white/60 uppercase mb-2">
                        COMMISSION TYPOLOGY
                      </label>
                      <select
                        value={formData.typology}
                        onChange={(e) => setFormData({ ...formData, typology: e.target.value })}
                        className="w-full bg-black/60 border border-white/20 p-3.5 text-sm text-white focus:border-[#f05a36] focus:outline-none transition"
                      >
                        <option>Private Urban Villa</option>
                        <option>Cliffside Cantilever Residence</option>
                        <option>Lakefront Compound</option>
                        <option>Metropolitan Penthouse</option>
                        <option>Cultural Pavilion</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-white/60 uppercase mb-2">
                        ESTIMATED BUDGET ALLOCATION
                      </label>
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
                    <label className="block text-[10px] font-mono text-white/60 uppercase mb-2">
                      COMMISSION NARRATIVE & SITE BRIEF
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Site topography, zoning parameters, cantilever desires, architectural aspirations..."
                      className="w-full bg-black/60 border border-white/20 p-3.5 text-sm text-white placeholder-white/30 focus:border-[#f05a36] focus:outline-none transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#f05a36] hover:bg-[#d94827] text-white font-mono uppercase text-xs tracking-[0.25em] font-bold transition shadow-[0_0_30px_rgba(240,90,54,0.4)]"
                  >
                    Submit Architectural Commission Brief &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 8. FOOTER (Deep Charcoal #0b0d11 - Seamless Match with Whole Website)      */}
      {/* ========================================================================= */}
      <footer className="w-full py-16 px-6 lg:px-14 border-t border-white/10 bg-[#08090d] text-white/60 text-xs font-mono">
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
