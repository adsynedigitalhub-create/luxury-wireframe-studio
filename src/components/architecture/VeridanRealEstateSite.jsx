import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function VeridanRealEstateSite() {
  const [activeRoom, setActiveRoom] = useState('living');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [activeFloorLevel, setActiveFloorLevel] = useState('exploded'); // 'ground' | 'first' | 'second' | 'exploded'
  const [activeMapPin, setActiveMapPin] = useState(null);
  const [bookingData, setBookingData] = useState({ name: '', email: '', phone: '', date: '', time: 'Morning (10:00 AM)' });

  // Custom Cursor Position
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const rooms = [
    {
      id: 'living',
      name: 'Living Room',
      image: '/images/architecture/urban_villa_living.jpg',
      specs: '6.2m Ceiling • Italian Minotti • Linear Fireplace',
      desc: 'Double-height sunken living room with fluted Roman travertine stone wall, built-in architectural fireplace, and uninterrupted floor-to-ceiling glass pool views.'
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      image: '/images/veridan/veridan_kitchen.jpg',
      specs: 'Calacatta Marble Island • Miele Appliances • Terrace Access',
      desc: 'Chef-inspired gourmet kitchen featuring a monolithic Calacatta marble waterfall island, fluted oak cabinetry, and direct sunset terrace access.'
    },
    {
      id: 'bedroom',
      name: 'Master Suite',
      image: '/images/architecture/urban_villa_bedroom.jpg',
      specs: '360° Skyline Views • Acoustic Wood • Private Balcony',
      desc: 'Upper cantilever master suite with wraparound structural corner glass framing the midnight city skyline, acoustic dark oak, and ensuite soaking tub.'
    },
    {
      id: 'pool',
      name: 'Pool & Terrace',
      image: '/images/architecture/arch_phase3_reality.jpg',
      specs: 'Heated Infinity Basin • Basalt Sun Deck • Firepit Lounge',
      desc: 'Suspended heated infinity pool with expansive basalt stone sundeck, recessed firepit lounge, and uninterrupted metropolitan vistas.'
    }
  ];

  const mapPins = [
    { id: 'center', label: 'Downtown City Center', time: '8 min drive', x: '58%', y: '42%', desc: 'Financial district, corporate headquarters, and high-end shopping.' },
    { id: 'beach', label: 'Private Beachfront & Marina', time: '5 min walk', x: '35%', y: '68%', desc: 'Direct slip yacht access, private cabanas, and pristine ocean waters.' },
    { id: 'school', label: 'St. Andrews Prep Academy', time: '6 min drive', x: '45%', y: '25%', desc: 'Top-ranked international prep school with Olympic sports facilities.' },
    { id: 'airport', label: 'Executive Private Jetport', time: '18 min drive', x: '78%', y: '30%', desc: '24/7 private jet handling and customs clearance terminal.' }
  ];

  const currentRoomObj = rooms.find(r => r.id === activeRoom) || rooms[0];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setModalSubmitted(true);
  };

  // Virtual 360 Tour drag rotation
  const [tourAngle, setTourAngle] = useState(0);
  const tourDragRef = useRef(false);
  const tourStartX = useRef(0);

  const handleTourMouseDown = (e) => {
    tourDragRef.current = true;
    tourStartX.current = e.clientX;
  };
  const handleTourMouseMove = (e) => {
    if (!tourDragRef.current) return;
    const delta = e.clientX - tourStartX.current;
    tourStartX.current = e.clientX;
    setTourAngle(prev => prev + delta * 0.4);
  };
  const handleTourMouseUp = () => {
    tourDragRef.current = false;
  };

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      className="min-h-screen bg-[#07111B] text-[#FBFBF8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#D4AF37] selection:text-[#0B1E2D] antialiased cursor-default"
    >
      {/* CUSTOM LUXURY GOLD CURSOR */}
      <div
        className="fixed pointer-events-none z-[100] w-3 h-3 rounded-full bg-[#D4AF37] shadow-[0_0_15px_#D4AF37] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 hidden md:block"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />
      <div
        className="fixed pointer-events-none z-[99] w-9 h-9 rounded-full border border-[#D4AF37]/40 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out hidden md:block"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.25 : 1})`
        }}
      />

      {/* ========================================================================= */}
      {/* GLOBAL HEADER                                                             */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-14 py-4 flex items-center justify-between bg-[#0B1E2D]/90 border-b border-white/10 backdrop-blur-md transition-all">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#997A15] flex items-center justify-center text-[#0B1E2D] font-bold text-sm font-['Playfair_Display',serif] shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            V
          </div>
          <div>
            <span className="block font-['Playfair_Display',serif] font-bold text-sm lg:text-base tracking-[0.2em] text-[#FBFBF8] uppercase">
              Veridan
            </span>
            <span className="block text-[8px] tracking-[0.3em] text-[#D4AF37] uppercase font-mono">
              Real Estate &bull; Miami &bull; Zurich
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-widest uppercase text-[#FBFBF8]/80">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#D4AF37] transition">Home</button>
          <button onClick={() => scrollToSection('arrival')} className="hover:text-[#D4AF37] transition">Arrival</button>
          <button onClick={() => scrollToSection('interior')} className="hover:text-[#D4AF37] transition">Interiors</button>
          <button onClick={() => scrollToSection('features')} className="hover:text-[#D4AF37] transition">Features</button>
          <button onClick={() => scrollToSection('location')} className="hover:text-[#D4AF37] transition">Location</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-[#D4AF37] transition">Contact</button>
        </nav>

        <div className="flex items-center space-x-4">
          <span className="hidden lg:inline-block font-mono text-xs text-[#D4AF37] font-bold bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
            $24,500,000 USD
          </span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B89020] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#0B1E2D] font-mono text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:scale-105"
          >
            Schedule a Viewing
          </button>
        </div>
      </header>


      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section id="hero" className="relative w-full h-screen min-h-[750px] flex flex-col justify-between overflow-hidden border-b border-white/10 pt-24 pb-8 px-6 lg:px-14">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/architecture/urban_villa_exterior.jpg"
            alt="Veridan Luxury Estate Exterior"
            className="w-full h-full object-cover select-none filter brightness-[0.98] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111B] via-transparent to-black/30 pointer-events-none" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-xl my-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="p-8 sm:p-10 rounded-2xl bg-[#0B1E2D]/85 border border-white/15 backdrop-blur-md shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold">
                EXCLUSIVE LISTING // VILLA AETHELGARD
              </span>
              <span className="text-xs font-mono font-bold text-white bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                ACTIVE
              </span>
            </div>

            <h1 className="font-['Playfair_Display',serif] font-medium text-4xl sm:text-5xl text-[#FBFBF8] leading-tight tracking-tight">
              More Than a Home <br />
              It's a <span className="italic font-normal text-[#D4AF37]">Lifestyle</span>
            </h1>

            <p className="text-sm sm:text-base text-[#FBFBF8]/80 font-light leading-relaxed">
              Discover a private architectural sanctuary nestled in the city enclave. Honed travertine, cantilevered post-tensioned slabs, and a private infinity pool.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollToSection('arrival')}
                className="px-7 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B89020] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#0B1E2D] font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-lg hover:scale-105"
              >
                Explore Property &rarr;
              </button>
              <button
                onClick={() => setIsTourOpen(true)}
                className="px-6 py-3.5 border border-white/30 hover:border-[#D4AF37] text-white font-mono text-xs uppercase tracking-[0.15em] rounded-full transition flex items-center space-x-2"
              >
                <span>🌐</span>
                <span>Launch 360° Tour</span>
              </button>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 w-full flex items-center justify-between text-xs font-mono text-[#FBFBF8]/70 pt-4 border-t border-white/15">
          <div className="flex items-center space-x-2 cursor-pointer hover:text-[#D4AF37] transition" onClick={() => scrollToSection('arrival')}>
            <span className="w-4 h-6 rounded-full border border-white/40 flex items-start justify-center p-1">
              <span className="w-1 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" />
            </span>
            <span className="uppercase tracking-widest text-[11px]">Scroll to explore property</span>
          </div>

          <span className="text-sm font-bold tracking-widest text-[#D4AF37]">
            01 / 06 &bull; OVERVIEW
          </span>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. LOCATION / ARRIVAL                                                     */}
      {/* ========================================================================= */}
      <section id="arrival" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden border-b border-white/10 py-20 px-6 lg:px-14">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/veridan/veridan_road_arrival.jpg"
            alt="Scenic Road Arrival"
            className="w-full h-full object-cover select-none filter contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111B] via-transparent to-black/30 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-[#0B1E2D]/85 border border-white/15 backdrop-blur-md shadow-2xl space-y-5">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold block">
              OUR LOCATION // SCENIC ARRIVAL
            </span>

            <h2 className="font-['Playfair_Display',serif] font-medium text-3xl sm:text-5xl text-[#FBFBF8] leading-tight tracking-tight">
              A Prime Location <br />
              for a Brighter Future
            </h2>

            <p className="text-sm sm:text-base text-[#FBFBF8]/85 font-light leading-relaxed">
              Nestled on the scenic ridge overlooking the metropolitan horizon, this private gated estate offers the ultimate fusion of absolute privacy and instantaneous city connectivity.
            </p>

            <button
              onClick={() => scrollToSection('location')}
              className="px-7 py-3 bg-transparent border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B1E2D] text-[#D4AF37] font-mono text-xs font-bold uppercase tracking-[0.18em] rounded-full transition-all duration-300"
            >
              Discover the Location &rarr;
            </button>
          </div>

          <div className="lg:col-span-5 flex flex-col space-y-3">
            {[
              { icon: '🏙️', label: 'Downtown City Center', time: '5 min' },
              { icon: '🎓', label: 'Private International Schools', time: '10 min' },
              { icon: '🛍️', label: 'Luxury Promenade & Shopping', time: '8 min' },
              { icon: '🏥', label: 'Premier Medical Pavilion', time: '12 min' }
            ].map((hotspot, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-[#0B1E2D]/90 border border-white/15 shadow-xl hover:border-[#D4AF37] transition duration-300 backdrop-blur-md"
              >
                <div className="flex items-center space-x-3.5">
                  <span className="text-xl">{hotspot.icon}</span>
                  <span className="text-sm font-medium text-[#FBFBF8]">{hotspot.label}</span>
                </div>
                <span className="text-xs font-mono text-[#D4AF37] font-bold bg-[#D4AF37]/15 px-3 py-1 rounded-full border border-[#D4AF37]/40">
                  {hotspot.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 w-full flex justify-end text-xs font-mono text-[#D4AF37] tracking-widest font-bold pt-4 border-t border-white/15">
          02 / 06 &bull; ARRIVAL &rarr;
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. INTERIOR SHOWCASE                                                      */}
      {/* ========================================================================= */}
      <section id="interior" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden border-b border-white/10 py-20 px-6 lg:px-14">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentRoomObj.id}
              src={currentRoomObj.image}
              alt={currentRoomObj.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover select-none filter contrast-[1.05]"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111B] via-transparent to-black/30 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-[#0B1E2D]/85 border border-white/15 backdrop-blur-md shadow-2xl space-y-5">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold">
                INSIDE THE RESIDENCE // ROOM SHOWCASE
              </span>
            </div>

            <h2 className="font-['Playfair_Display',serif] font-medium text-3xl sm:text-5xl text-[#FBFBF8] leading-tight tracking-tight">
              Step Inside <br />
              Your Dream Home
            </h2>

            <div className="p-4 rounded-xl bg-black/60 border border-white/15 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#D4AF37] font-bold uppercase">{currentRoomObj.name}</span>
                <span className="text-white/60">{currentRoomObj.specs}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#FBFBF8]/85 font-light leading-relaxed">
                {currentRoomObj.desc}
              </p>
            </div>

            <button
              onClick={() => setIsTourOpen(true)}
              className="px-7 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B89020] text-[#0B1E2D] font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full transition shadow-lg hover:scale-105 flex items-center space-x-2"
            >
              <span>🌐</span>
              <span>Open 360° Virtual Tour &rarr;</span>
            </button>
          </div>

          <div className="lg:col-span-5 flex flex-col space-y-3">
            {rooms.map((room) => {
              const isSelected = activeRoom === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#D4AF37] text-[#0B1E2D] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] font-bold scale-[1.02]'
                      : 'bg-[#0B1E2D]/90 text-[#FBFBF8] border-white/15 hover:border-[#D4AF37]/50 hover:bg-[#0B1E2D]'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-14 h-10 object-cover rounded-md border border-white/20"
                    />
                    <span className="text-sm font-medium tracking-wide">{room.name}</span>
                  </div>
                  <span className="text-xs font-mono">{isSelected ? 'ACTIVE ●' : 'SELECT →'}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 w-full flex justify-end text-xs font-mono text-[#D4AF37] tracking-widest font-bold pt-4 border-t border-white/15">
          03 / 06 &bull; INTERIORS &rarr;
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. 3D EXPLODED FLOOR PLAN WITH INTERACTIVE LEVEL TOGGLES                   */}
      {/* ========================================================================= */}
      <section id="features" className="relative w-full py-28 px-6 lg:px-14 bg-[#091522] border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-mono text-[#D4AF37] tracking-[0.25em] uppercase font-bold block mb-2">
                // ARCHITECTURAL DISSECTION
              </span>
              <h2 className="font-['Playfair_Display',serif] font-medium text-4xl sm:text-5xl text-[#FBFBF8] tracking-tight">
                Property Features & 3D Plan
              </h2>
            </div>
            
            {/* Interactive Floor Level Buttons */}
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              {[
                { id: 'exploded', label: 'Exploded All' },
                { id: 'ground', label: 'Ground Floor' },
                { id: 'first', label: 'First Floor' },
                { id: 'second', label: 'Roof Terrace' }
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setActiveFloorLevel(lvl.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition ${
                    activeFloorLevel === lvl.id
                      ? 'bg-[#D4AF37] text-[#0B1E2D] font-bold shadow-md'
                      : 'bg-white/10 text-white/70 hover:text-white'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="grid grid-cols-2 gap-3.5">
                {[
                  { icon: '🛏️', title: '4', subtitle: 'Bedrooms' },
                  { icon: '🛁', title: '3', subtitle: 'Bathrooms' },
                  { icon: '📐', title: '4,200', subtitle: 'Sq Ft' },
                  { icon: '🚗', title: '2', subtitle: 'Car Garage' },
                  { icon: '🏊‍♂️', title: 'Heated', subtitle: 'Pool & Terrace' },
                  { icon: '🍷', title: 'Cellar', subtitle: 'Wine Tasting' }
                ].map((feat, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#0B1E2D] border border-white/15 shadow-xl text-center space-y-1 hover:border-[#D4AF37] transition duration-300"
                  >
                    <span className="text-2xl block">{feat.icon}</span>
                    <span className="text-xl font-bold font-['Playfair_Display',serif] text-[#FBFBF8] block">
                      {feat.title}
                    </span>
                    <span className="text-xs font-mono text-[#D4AF37] block uppercase tracking-wider">
                      {feat.subtitle}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#07111B] border border-[#D4AF37]/30 text-xs font-mono text-white/80 space-y-1">
                <span className="text-[#D4AF37] font-bold block">SELECTED LEVEL: {activeFloorLevel.toUpperCase()}</span>
                <span>
                  {activeFloorLevel === 'ground' && 'Ground Level: Double-height living salon, open gourmet dining, pool patio, garage.'}
                  {activeFloorLevel === 'first' && 'First Level: 4 Ensuite bedroom chambers, master sanctuary, private walk-in wardrobes.'}
                  {activeFloorLevel === 'second' && 'Second Level: Rooftop cocktail terrace, outdoor kitchen, heated hydromassage spa.'}
                  {activeFloorLevel === 'exploded' && 'Full 3-tier vertical exploded BIM rendering showing all functional volumes.'}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#07111B] p-2">
              <img
                src="/images/veridan/veridan_exploded_floorplan.jpg"
                alt="3D Exploded Architectural Floor Plan"
                className="w-full h-auto object-contain rounded-xl hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>

          <div className="w-full flex justify-end text-xs font-mono text-[#D4AF37] tracking-widest font-bold pt-4 border-t border-white/10">
            04 / 06 &bull; 3D FLOOR PLAN &rarr;
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. LOCATION & SURROUNDINGS (WITH INTERACTIVE CLICKABLE PINS)              */}
      {/* ========================================================================= */}
      <section id="location" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden border-b border-white/10 py-20 px-6 lg:px-14">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/veridan/veridan_aerial_map.jpg"
            alt="3D Aerial Map of Coastline & City"
            className="w-full h-full object-cover select-none filter contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111B] via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Interactive Pulsing Map Pins directly on the 3D aerial map */}
        {mapPins.map((pin) => (
          <div
            key={pin.id}
            onClick={() => setActiveMapPin(pin)}
            style={{ left: pin.x, top: pin.y }}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center">
              <span className="w-6 h-6 rounded-full bg-[#D4AF37]/40 animate-ping absolute" />
              <div className="w-5 h-5 rounded-full bg-[#D4AF37] border-2 border-white shadow-xl flex items-center justify-center text-[9px] font-bold text-black group-hover:scale-125 transition-transform">
                📍
              </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-7 whitespace-nowrap bg-black/85 border border-[#D4AF37]/50 px-2.5 py-1 rounded-md text-[10px] font-mono text-white pointer-events-none shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              {pin.label} &bull; {pin.time}
            </div>
          </div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-[#0B1E2D]/85 border border-white/15 backdrop-blur-md shadow-2xl space-y-5">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold block">
              THE SURROUNDINGS // 3D MAP EXPLORER
            </span>

            <h2 className="font-['Playfair_Display',serif] font-medium text-3xl sm:text-5xl text-[#FBFBF8] leading-tight tracking-tight">
              The Perfect Location
            </h2>

            <p className="text-sm sm:text-base text-[#FBFBF8]/85 font-light leading-relaxed">
              Surrounded by turquoise ocean waters, private marinas, pristine beaches, and premier private golf clubs — with seamless direct arterial access to downtown and private executive airports.
            </p>

            {activeMapPin && (
              <div className="p-3.5 rounded-xl bg-black/70 border border-[#D4AF37] text-xs font-mono space-y-1">
                <span className="text-[#D4AF37] font-bold block">PIN SELECTED: {activeMapPin.label} ({activeMapPin.time})</span>
                <span className="text-white/80 block">{activeMapPin.desc}</span>
              </div>
            )}

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-7 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B89020] text-[#0B1E2D] font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full transition shadow-lg hover:scale-105"
            >
              Request Neighborhood Guide &rarr;
            </button>
          </div>

          <div className="lg:col-span-5 flex flex-col space-y-2.5">
            {[
              { icon: '🏫', label: 'Top Tier International Schools', time: '5 min' },
              { icon: '🛍️', label: 'Designer Promenade & Shopping', time: '7 min' },
              { icon: '🍽️', label: 'Michelin Star Fine Dining', time: '7 min' },
              { icon: '🏥', label: 'Private Wellness & Healthcare', time: '10 min' },
              { icon: '✈️', label: 'Executive Private Airport', time: '20 min' }
            ].map((commute, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B1E2D]/90 border border-white/15 shadow-xl hover:border-[#D4AF37] transition duration-300 backdrop-blur-md"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{commute.icon}</span>
                  <span className="text-xs sm:text-sm font-medium text-[#FBFBF8]">{commute.label}</span>
                </div>
                <span className="text-xs font-mono text-[#D4AF37] font-bold bg-[#D4AF37]/15 px-3 py-1 rounded-full border border-[#D4AF37]/40">
                  {commute.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 w-full flex justify-end text-xs font-mono text-[#D4AF37] tracking-widest font-bold pt-4 border-t border-white/15">
          05 / 06 &bull; MAP & SURROUNDINGS &rarr;
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 6. FINAL CTA SECTION                                                      */}
      {/* ========================================================================= */}
      <section id="contact" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden py-24 px-6 lg:px-14">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/architecture/urban_villa_exterior.jpg"
            alt="Veridan Luxury Villa Sunset"
            className="w-full h-full object-cover select-none filter contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111B] via-black/40 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center my-auto p-8 sm:p-12 rounded-3xl bg-[#0B1E2D]/90 border border-[#D4AF37]/50 shadow-2xl backdrop-blur-md space-y-6">
          <div className="space-y-3">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold block">
              YOUR NEXT CHAPTER
            </span>

            <h2 className="font-['Playfair_Display',serif] font-medium text-4xl sm:text-5xl text-[#FBFBF8] leading-tight tracking-tight">
              Ready to See It <br />
              in Person?
            </h2>

            <p className="text-sm sm:text-base text-[#FBFBF8]/80 font-light max-w-md mx-auto leading-relaxed">
              Schedule an exclusive private viewing and experience this architectural masterpiece firsthand.
            </p>
          </div>

          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-9 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B89020] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#0B1E2D] font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-[0_0_35px_rgba(212,175,55,0.5)] hover:scale-105"
            >
              Schedule a Viewing &rarr;
            </button>
          </div>

          <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs font-mono text-[#FBFBF8]/80">
            <a href="tel:+15651234567" className="hover:text-[#D4AF37] transition flex items-center space-x-2">
              <span>📞</span>
              <span>+1 (565) 123-4567</span>
            </a>
            <span className="hidden sm:inline">&bull;</span>
            <a href="mailto:hello@veridanrealty.com" className="hover:text-[#D4AF37] transition flex items-center space-x-2">
              <span>✉️</span>
              <span>hello@veridanrealty.com</span>
            </a>
          </div>
        </div>

        <div className="relative z-10 w-full flex justify-end text-xs font-mono text-[#D4AF37] tracking-widest font-bold pt-4 border-t border-white/15">
          06 / 06 &bull; END
        </div>
      </section>


      {/* ========================================================================= */}
      {/* FOOTER                                                                    */}
      {/* ========================================================================= */}
      <footer className="w-full py-10 px-6 lg:px-14 border-t border-white/10 bg-[#07111B] text-xs font-mono text-[#FBFBF8]/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded bg-[#D4AF37] text-[#0B1E2D] font-bold flex items-center justify-center text-xs">
              V
            </div>
            <span className="font-['Playfair_Display',serif] font-bold text-sm text-[#FBFBF8] tracking-widest uppercase">
              Veridan Real Estate &bull; Exclusive Brokerage
            </span>
          </div>

          <div className="flex items-center space-x-6 text-[11px] text-[#FBFBF8]/70">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#D4AF37] transition">Home</button>
            <button onClick={() => scrollToSection('arrival')} className="hover:text-[#D4AF37] transition">Properties</button>
            <button onClick={() => scrollToSection('features')} className="hover:text-[#D4AF37] transition">About</button>
            <button onClick={() => scrollToSection('location')} className="hover:text-[#D4AF37] transition">Location</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-[#D4AF37] transition">Contact</button>
          </div>

          <div>
            &copy; 2026 Veridan Real Estate. All rights reserved.
          </div>
        </div>
      </footer>


      {/* ========================================================================= */}
      {/* 360° INTERACTIVE VIRTUAL TOUR FULLSCREEN MODAL                            */}
      {/* ========================================================================= */}
      {isTourOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 select-none"
          onMouseDown={handleTourMouseDown}
          onMouseMove={handleTourMouseMove}
          onMouseUp={handleTourMouseUp}
        >
          {/* Header Bar */}
          <div className="absolute top-6 left-6 right-6 z-30 flex items-center justify-between text-xs font-mono bg-black/75 border border-white/20 px-6 py-3 rounded-full backdrop-blur-md">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="font-bold text-white uppercase tracking-widest">360° VIRTUAL PANORAMA TOUR</span>
              <span className="text-white/40">|</span>
              <span className="text-[#D4AF37]">{currentRoomObj.name.toUpperCase()}</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-white/70 hidden sm:inline">🖱️ DRAG MOUSE TO LOOK AROUND 360°</span>
              <button
                onClick={() => setIsTourOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Panoramic Image Canvas with Smooth Rotation */}
          <div className="relative w-full h-full overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing">
            <img
              src={currentRoomObj.image}
              alt="360 Panorama"
              style={{
                transform: `scale(1.4) translateX(${tourAngle}px)`,
                transition: tourDragRef.current ? 'none' : 'transform 0.2s ease-out'
              }}
              className="max-w-none w-[200vw] h-[100vh] object-cover pointer-events-none"
            />
          </div>

          {/* Bottom Room Switcher Inside 360 Tour */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-3 bg-black/80 border border-white/20 p-2 rounded-full backdrop-blur-md">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={(e) => { e.stopPropagation(); setActiveRoom(room.id); setTourAngle(0); }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase transition ${
                  activeRoom === room.id
                    ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {room.name}
              </button>
            ))}
          </div>
        </div>
      )}


      {/* ========================================================================= */}
      {/* SCHEDULE A VIEWING MODAL DIALOG                                           */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0B1E2D] border border-[#D4AF37]/50 rounded-2xl p-8 shadow-2xl space-y-6">
            <button
              onClick={() => { setIsModalOpen(false); setModalSubmitted(false); }}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-xl"
            >
              ✕
            </button>

            {modalSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-[#0B1E2D] flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="font-['Playfair_Display',serif] font-bold text-2xl text-[#FBFBF8]">
                  Viewing Scheduled
                </h3>
                <p className="text-xs font-mono text-[#FBFBF8]/70 max-w-xs mx-auto">
                  Thank you. Our luxury private concierge will confirm your appointment via phone and email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="text-center space-y-1">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">
                    PRIVATE APPOINTMENT // $24,500,000 USD
                  </span>
                  <h3 className="font-['Playfair_Display',serif] font-bold text-2xl text-[#FBFBF8]">
                    Schedule a Private Viewing
                  </h3>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[#FBFBF8]/70 uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-[#FBFBF8]/70 uppercase mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      placeholder="client@vip.com"
                      className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-[#FBFBF8]/70 uppercase mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-[#FBFBF8]/70 uppercase mb-1">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-[#FBFBF8]/70 uppercase mb-1">Time Slot</label>
                    <select
                      value={bookingData.time}
                      onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                      className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option>Morning (10:00 AM)</option>
                      <option>Afternoon (2:00 PM)</option>
                      <option>Sunset (5:30 PM)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B89020] text-[#0B1E2D] font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-xl mt-4"
                >
                  Confirm Appointment &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
