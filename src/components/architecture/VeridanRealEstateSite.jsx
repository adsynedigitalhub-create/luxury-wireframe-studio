import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function VeridanRealEstateSite() {
  const [activeRoom, setActiveRoom] = useState('living');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({ name: '', email: '', phone: '', date: '', time: 'Morning (10:00 AM)' });

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

  const currentRoomObj = rooms.find(r => r.id === activeRoom) || rooms[0];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setModalSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#07111B] text-[#FBFBF8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#D4AF37] selection:text-[#0B1E2D] antialiased">
      
      {/* ========================================================================= */}
      {/* GLOBAL HEADER: VERIDAN REAL ESTATE                                        */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-14 py-4 flex items-center justify-between bg-[#0B1E2D]/90 border-b border-white/10 backdrop-blur-md transition-all">
        {/* Brand Logo */}
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

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-widest uppercase text-[#FBFBF8]/80">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#D4AF37] transition">Home</button>
          <button onClick={() => scrollToSection('arrival')} className="hover:text-[#D4AF37] transition">Arrival</button>
          <button onClick={() => scrollToSection('interior')} className="hover:text-[#D4AF37] transition">Interiors</button>
          <button onClick={() => scrollToSection('features')} className="hover:text-[#D4AF37] transition">Features</button>
          <button onClick={() => scrollToSection('location')} className="hover:text-[#D4AF37] transition">Location</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-[#D4AF37] transition">Contact</button>
        </nav>

        {/* CTA Button & Price Tag */}
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
      {/* 1. HERO SECTION (100% CRYSTAL-CLEAR PHOTO, ZERO BLUR FILTER)              */}
      {/* ========================================================================= */}
      <section id="hero" className="relative w-full h-screen min-h-[750px] flex flex-col justify-between overflow-hidden border-b border-white/10 pt-24 pb-8 px-6 lg:px-14">
        
        {/* Fullscreen Hero Background Image - 100% CRISP, NO BLUR */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/architecture/urban_villa_exterior.jpg"
            alt="Veridan Luxury Estate Exterior"
            className="w-full h-full object-cover select-none filter brightness-[0.95] contrast-[1.05]"
          />
          {/* Subtle bottom edge gradient ONLY so the crystal photo remains vibrant */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111B] via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Hero Floating Editorial Card (Clean glass box leaving photo visible) */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-xl my-auto">
          <div className="p-8 sm:p-10 rounded-2xl bg-[#0B1E2D]/85 border border-white/15 backdrop-blur-md shadow-2xl space-y-5">
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
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3.5 border border-white/30 hover:border-[#D4AF37] text-white font-mono text-xs uppercase tracking-[0.15em] rounded-full transition"
              >
                Private Tour
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
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
      {/* 2. LOCATION / ARRIVAL (100% CRISP HIGHWAY & ESTATE PHOTO)                 */}
      {/* ========================================================================= */}
      <section id="arrival" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden border-b border-white/10 py-20 px-6 lg:px-14">
        
        {/* Fullscreen Road Arrival Visual - 100% RAZOR-SHARP */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/veridan/veridan_road_arrival.jpg"
            alt="Scenic Road Arrival"
            className="w-full h-full object-cover select-none filter contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111B] via-transparent to-black/30 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Floating Editorial Narrative Card */}
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

          {/* Right Floating Commute Distance Cards */}
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
      {/* 3. INTERIOR SHOWCASE (100% RAZOR-SHARP ROOM ENVIRONMENT CHANGING)         */}
      {/* ========================================================================= */}
      <section id="interior" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden border-b border-white/10 py-20 px-6 lg:px-14">
        
        {/* Crisp Dynamic Room Background */}
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
          
          {/* Left Narrative Card */}
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
              onClick={() => setIsModalOpen(true)}
              className="px-7 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B89020] text-[#0B1E2D] font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full transition shadow-lg hover:scale-105"
            >
              Take a Virtual Tour &rarr;
            </button>
          </div>

          {/* Right Room Selector Thumbnails */}
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
      {/* 4. 3D EXPLODED FLOOR PLAN & FEATURES (CRYSTAL-CLEAR 3D RENDER)            */}
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
            <p className="mt-4 md:mt-0 text-xs sm:text-sm font-mono text-neutral-400 max-w-md text-right">
              4,200 Sq Ft luxury living with 3 separated vertical levels, private roof terrace, and cantilever infinity pool.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Feature Badges */}
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

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#B89020] text-[#0B1E2D] font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full transition shadow-lg hover:scale-[1.02]"
              >
                Download Full Architectural Dossier &rarr;
              </button>
            </div>

            {/* 3D Exploded Floor Plan Image - 100% Crisp */}
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
      {/* 5. LOCATION & SURROUNDINGS (100% RAZOR-SHARP 3D AERIAL MAP)                */}
      {/* ========================================================================= */}
      <section id="location" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden border-b border-white/10 py-20 px-6 lg:px-14">
        
        {/* Fullscreen 3D Aerial Drone Map - 100% CRISP */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/veridan/veridan_aerial_map.jpg"
            alt="3D Aerial Map of Coastline & City"
            className="w-full h-full object-cover select-none filter contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07111B] via-transparent to-black/30 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Narrative Card */}
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

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-7 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B89020] text-[#0B1E2D] font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full transition shadow-lg hover:scale-105"
            >
              Request Neighborhood Guide &rarr;
            </button>
          </div>

          {/* Right Floating Commute Badges */}
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
      {/* 6. FINAL CTA SECTION (NO BLUR, BRILLIANT CRISP SUNSET POOL)                */}
      {/* ========================================================================= */}
      <section id="contact" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden py-24 px-6 lg:px-14">
        
        {/* Fullscreen Sunset Villa Background - 100% CLEAR, ZERO BLUR */}
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
      {/* FOOTER: VERIDAN REAL ESTATE                                               */}
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
