import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function VeridanRealEstateSite() {
  // Active room state for Section 3 (Interior Showcase)
  const [activeRoom, setActiveRoom] = useState('living');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({ name: '', email: '', phone: '', date: '', time: 'Morning (10:00 AM)' });

  const rooms = [
    {
      id: 'living',
      name: 'Living Room',
      image: '/images/architecture/urban_villa_living.jpg',
      desc: 'Double-height sunken living room with fluted Roman stone wall, integrated linear fireplace, and floor-to-ceiling glass pool views.'
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      image: '/images/veridan/veridan_kitchen.jpg',
      desc: 'Chef-inspired gourmet kitchen featuring a monolithic Calacatta marble waterfall island, fluted oak cabinetry, and direct sunset terrace access.'
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      image: '/images/architecture/urban_villa_bedroom.jpg',
      desc: 'Upper cantilever master bedroom suite with 360-degree corner glass framing the midnight city skyline, acoustic dark wood, and private balcony.'
    },
    {
      id: 'bathroom',
      name: 'Bathroom',
      image: '/images/architecture/urban_villa_bedroom.jpg',
      desc: 'Spa-inspired en-suite with freestanding Calacatta marble soaking tub, fluted glass sliding partitions, and indirect ambient illumination.'
    },
    {
      id: 'pool',
      name: 'Pool & Terrace',
      image: '/images/architecture/arch_phase3_reality.jpg',
      desc: 'Suspended heated infinity pool with expansive basalt stone sundeck, recessed firepit lounge, and uninterrupted city vistas.'
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
    <div className="min-h-screen bg-[#0B1E2D] text-[#FBFBF8] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#D4AF37] selection:text-[#0B1E2D] antialiased overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* GLOBAL HEADER: VERIDAN REAL ESTATE                                        */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-14 py-5 flex items-center justify-between bg-[#0B1E2D]/80 backdrop-blur-md border-b border-white/10 transition-all">
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
              Real Estate
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

        {/* CTA Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B89020] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#0B1E2D] font-mono text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:scale-105"
        >
          Schedule a Viewing
        </button>
      </header>


      {/* ========================================================================= */}
      {/* 1. HERO SECTION (0 - 15s)                                                 */}
      {/* 3D cinematic house reveal, slow camera push-in, parallax clouds & sunset  */}
      {/* ========================================================================= */}
      <section id="hero" className="relative w-full h-screen min-h-[750px] flex flex-col justify-between overflow-hidden border-b border-white/10 pt-24 pb-8 px-6 lg:px-14">
        
        {/* Fullscreen Hero Background Image with Parallax Push-in */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            src="/images/architecture/urban_villa_exterior.jpg"
            alt="Veridan Luxury Estate"
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 16, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="w-full h-full object-cover select-none"
          />
          {/* Subtle cinematic gradient overlays for perfect text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E2D]/95 via-[#0B1E2D]/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2D] via-transparent to-[#0B1E2D]/70" />
        </div>

        {/* Hero Left Content (Exact match to Section 1 in wireframe) */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-2xl my-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="text-xs font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-semibold block">
              LUXURY LIVING REDEFINED
            </span>

            <h1 className="font-['Playfair_Display',serif] font-medium text-5xl sm:text-6xl lg:text-7xl text-[#FBFBF8] leading-[1.08] tracking-tight">
              More Than a Home <br />
              It's a <span className="italic font-normal text-[#D4AF37]">Lifestyle</span>
            </h1>

            <p className="text-base sm:text-lg text-[#FBFBF8]/80 font-light leading-relaxed max-w-lg">
              Discover premium residences designed for modern living, where luxury meets comfort.
            </p>

            <div className="pt-2">
              <button
                onClick={() => scrollToSection('arrival')}
                className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B89020] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#0B1E2D] font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:scale-105 flex items-center space-x-3 group"
              >
                <span>Explore Properties</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom HUD: Scroll to explore & Index indicator */}
        <div className="relative z-10 w-full flex items-center justify-between text-xs font-mono text-[#FBFBF8]/60 pt-4 border-t border-white/10">
          <div className="flex items-center space-x-2 cursor-pointer hover:text-[#D4AF37] transition" onClick={() => scrollToSection('arrival')}>
            <span className="w-4 h-6 rounded-full border border-white/40 flex items-start justify-center p-1">
              <span className="w-1 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" />
            </span>
            <span className="uppercase tracking-widest text-[11px]">Scroll to explore</span>
          </div>

          <span className="text-sm font-bold tracking-widest text-[#D4AF37]">
            01 / 06 &rarr;
          </span>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. LOCATION / ARRIVAL (15s - 30s)                                         */}
      {/* Road arrival, sports car moving, city skyline reveal, commute hotspots    */}
      {/* ========================================================================= */}
      <section id="arrival" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden border-b border-white/10 py-20 px-6 lg:px-14">
        
        {/* Fullscreen Road Arrival Visual */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/veridan/veridan_road_arrival.jpg"
            alt="Scenic Road Arrival"
            className="w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E2D]/95 via-[#0B1E2D]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2D] via-transparent to-[#0B1E2D]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-semibold block">
              OUR LOCATION
            </span>

            <h2 className="font-['Playfair_Display',serif] font-medium text-4xl sm:text-5xl lg:text-6xl text-[#FBFBF8] leading-tight tracking-tight">
              A Prime Location <br />
              for a Brighter Future
            </h2>

            <p className="text-base sm:text-lg text-[#FBFBF8]/80 font-light leading-relaxed max-w-xl">
              Nestled in the heart of the city, this exclusive community offers the perfect blend of privacy, convenience, and natural beauty.
            </p>

            <div className="pt-2">
              <button
                onClick={() => scrollToSection('location')}
                className="px-8 py-3.5 bg-transparent border border-[#D4AF37] hover:bg-[#D4AF37]/15 text-[#D4AF37] font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300"
              >
                Discover the Location &rarr;
              </button>
            </div>
          </div>

          {/* Right Floating Hotspot Cards (Exact match to wireframe Section 2) */}
          <div className="lg:col-span-5 flex flex-col space-y-3.5">
            {[
              { icon: '🏙️', label: 'City Access', time: '5 min' },
              { icon: '🎓', label: 'Top Schools', time: '10 min' },
              { icon: '🛍️', label: 'Shopping', time: '8 min' },
              { icon: '🏥', label: 'Healthcare', time: '12 min' }
            ].map((hotspot, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-[#0B1E2D]/80 border border-white/15 backdrop-blur-md shadow-xl hover:border-[#D4AF37] transition duration-300"
              >
                <div className="flex items-center space-x-3.5">
                  <span className="text-xl">{hotspot.icon}</span>
                  <span className="text-sm font-medium text-[#FBFBF8]">{hotspot.label}</span>
                </div>
                <span className="text-xs font-mono text-[#D4AF37] font-bold bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  {hotspot.time}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Section Indicator */}
        <div className="relative z-10 w-full flex justify-end text-xs font-mono text-[#D4AF37] tracking-widest font-bold pt-4 border-t border-white/10">
          02 / 06 &rarr;
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. INTERIOR SHOWCASE (30s - 50s)                                          */}
      {/* Smooth room transitions: Living Room, Kitchen, Bedroom, Bathroom, Pool    */}
      {/* ========================================================================= */}
      <section id="interior" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden border-b border-white/10 py-20 px-6 lg:px-14">
        
        {/* Dynamic Room Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentRoomObj.id}
              src={currentRoomObj.image}
              alt={currentRoomObj.name}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover select-none"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E2D]/95 via-[#0B1E2D]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2D] via-transparent to-[#0B1E2D]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-semibold block">
              INSIDE THE HOME
            </span>

            <h2 className="font-['Playfair_Display',serif] font-medium text-4xl sm:text-5xl lg:text-6xl text-[#FBFBF8] leading-tight tracking-tight">
              Step Inside <br />
              Your Dream Home
            </h2>

            <p className="text-base sm:text-lg text-[#FBFBF8]/80 font-light leading-relaxed max-w-xl">
              Spacious interiors, premium finishes, and smart design — every detail crafted for your comfort.
            </p>

            <div className="p-4 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md max-w-lg">
              <span className="text-xs font-mono text-[#D4AF37] font-bold uppercase block mb-1">
                CURRENT SPACE: {currentRoomObj.name}
              </span>
              <p className="text-xs text-[#FBFBF8]/85 font-light leading-relaxed">
                {currentRoomObj.desc}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B89020] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#0B1E2D] font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-lg"
              >
                Take a Virtual Tour &rarr;
              </button>
            </div>
          </div>

          {/* Right Room Selector (Exact match to wireframe Section 3) */}
          <div className="lg:col-span-5 flex flex-col space-y-2.5">
            {rooms.map((room) => {
              const isSelected = activeRoom === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border backdrop-blur-md transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#D4AF37] text-[#0B1E2D] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] font-bold'
                      : 'bg-[#0B1E2D]/80 text-[#FBFBF8] border-white/15 hover:border-[#D4AF37]/50 hover:bg-[#0B1E2D]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-12 h-9 object-cover rounded-md border border-white/20"
                    />
                    <span className="text-sm font-medium tracking-wide">{room.name}</span>
                  </div>
                  <span className="text-xs font-mono">{isSelected ? 'ACTIVE ●' : 'VIEW →'}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Section Indicator */}
        <div className="relative z-10 w-full flex justify-end text-xs font-mono text-[#D4AF37] tracking-widest font-bold pt-4 border-t border-white/10">
          03 / 06 &rarr;
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. PROPERTY FEATURES & 3D EXPLODED FLOOR PLAN (50s - 70s)                 */}
      {/* 3D Exploded Floor Plan with Ground, First & Second Floor Levels           */}
      {/* ========================================================================= */}
      <section id="features" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden border-b border-white/10 py-20 px-6 lg:px-14 bg-[#081724]">
        <div className="max-w-7xl mx-auto w-full my-auto space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-['Playfair_Display',serif] font-medium text-4xl sm:text-5xl text-[#FBFBF8] tracking-tight">
              Property Features
            </h2>
            <p className="text-sm sm:text-base text-[#FBFBF8]/75 font-light leading-relaxed">
              Everything you need for a comfortable, modern and luxurious lifestyle.
            </p>
          </div>

          {/* Main Grid: Left Hotspots + Right 3D Exploded Floor Plan Model */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left 5 Property Feature Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3.5">
                {[
                  { icon: '🛏️', title: '4', subtitle: 'Bedrooms' },
                  { icon: '🛁', title: '3', subtitle: 'Bathrooms' },
                  { icon: '📐', title: '4,200', subtitle: 'Sq Ft' },
                  { icon: '🚗', title: '2', subtitle: 'Car Garage' },
                  { icon: '🏊‍♂️', title: 'Pool', subtitle: '& Terrace' }
                ].map((feat, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#0B1E2D]/80 border border-white/15 backdrop-blur-md shadow-xl text-center space-y-1 hover:border-[#D4AF37] transition duration-300"
                  >
                    <span className="text-2xl block">{feat.icon}</span>
                    <span className="text-lg font-bold font-['Playfair_Display',serif] text-[#FBFBF8] block">
                      {feat.title}
                    </span>
                    <span className="text-xs font-mono text-[#D4AF37] block uppercase tracking-wider">
                      {feat.subtitle}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B89020] text-[#0B1E2D] font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-lg"
                >
                  View Floor Plan &rarr;
                </button>
              </div>
            </div>

            {/* Right: 3D Exploded Floor Plan Rendering (Exact Match to wireframe Section 4) */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/50 p-4">
              <img
                src="/images/veridan/veridan_exploded_floorplan.jpg"
                alt="3D Exploded Architectural Floor Plan"
                className="w-full h-full object-contain rounded-xl hover:scale-102 transition-transform duration-700"
              />
              
              {/* Floor Annotations */}
              <div className="absolute top-8 right-6 bg-black/80 border border-[#D4AF37]/50 px-3 py-1 rounded-full text-[11px] font-mono text-[#D4AF37] backdrop-blur-md">
                ● Second Floor - Roof Terrace
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-6 bg-black/80 border border-white/20 px-3 py-1 rounded-full text-[11px] font-mono text-[#FBFBF8] backdrop-blur-md">
                ● First Floor - Bedrooms
              </div>
              <div className="absolute bottom-8 right-6 bg-black/80 border border-white/20 px-3 py-1 rounded-full text-[11px] font-mono text-[#FBFBF8] backdrop-blur-md">
                ● Ground Floor - Living/Pool Patio
              </div>
            </div>

          </div>

        </div>

        {/* Section Indicator */}
        <div className="relative z-10 w-full flex justify-end text-xs font-mono text-[#D4AF37] tracking-widest font-bold pt-4 border-t border-white/10">
          04 / 06 &rarr;
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. LOCATION & SURROUNDINGS (70s - 90s)                                    */}
      {/* 3D Map-style coastal aerial perspective with interactive distance badges  */}
      {/* ========================================================================= */}
      <section id="location" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden border-b border-white/10 py-20 px-6 lg:px-14">
        
        {/* Fullscreen 3D Aerial Drone Map Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/veridan/veridan_aerial_map.jpg"
            alt="3D Aerial Map of Surrounding Metropolis"
            className="w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E2D]/95 via-[#0B1E2D]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2D] via-transparent to-[#0B1E2D]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-['Playfair_Display',serif] font-medium text-4xl sm:text-5xl lg:text-6xl text-[#FBFBF8] leading-tight tracking-tight">
              The Perfect Location
            </h2>

            <p className="text-base sm:text-lg text-[#FBFBF8]/80 font-light leading-relaxed max-w-xl">
              Close to top schools, shopping, dining and major business hubs — everything you need, right around the corner.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B89020] text-[#0B1E2D] font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-lg"
              >
                Explore the Area &rarr;
              </button>
            </div>
          </div>

          {/* Right Floating Commute Badges (Exact match to wireframe Section 5) */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {[
              { icon: '🏫', label: 'Schools', time: '5 min' },
              { icon: '🛍️', label: 'Shopping', time: '7 min' },
              { icon: '🍽️', label: 'Dining', time: '7 min' },
              { icon: '🏥', label: 'Healthcare', time: '10 min' },
              { icon: '✈️', label: 'Airport', time: '20 min' }
            ].map((commute, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-[#0B1E2D]/80 border border-white/15 backdrop-blur-md shadow-xl hover:border-[#D4AF37] transition duration-300"
              >
                <div className="flex items-center space-x-3.5">
                  <span className="text-xl">{commute.icon}</span>
                  <span className="text-sm font-medium text-[#FBFBF8]">{commute.label}</span>
                </div>
                <span className="text-xs font-mono text-[#D4AF37] font-bold bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  {commute.time}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Section Indicator */}
        <div className="relative z-10 w-full flex justify-end text-xs font-mono text-[#D4AF37] tracking-widest font-bold pt-4 border-t border-white/10">
          05 / 06 &rarr;
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 6. FINAL CTA SECTION (90s - 110s)                                         */}
      {/* Sunset villa fullscreen, glowing CTA button, full contact info            */}
      {/* ========================================================================= */}
      <section id="contact" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden py-24 px-6 lg:px-14">
        
        {/* Fullscreen Sunset Villa Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/architecture/urban_villa_exterior.jpg"
            alt="Veridan Luxury Villa Sunset"
            className="w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-[#0B1E2D]/75 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2D] via-transparent to-[#0B1E2D]/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center my-auto space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold block">
              YOUR NEXT CHAPTER
            </span>

            <h2 className="font-['Playfair_Display',serif] font-medium text-5xl sm:text-6xl lg:text-7xl text-[#FBFBF8] leading-tight tracking-tight">
              Ready to See It <br />
              in Person?
            </h2>

            <p className="text-base sm:text-lg text-[#FBFBF8]/80 font-light max-w-lg mx-auto leading-relaxed">
              Schedule a private viewing and experience the lifestyle firsthand.
            </p>
          </div>

          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B89020] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#0B1E2D] font-mono text-sm font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-[0_0_35px_rgba(212,175,55,0.5)] hover:scale-105"
            >
              Schedule a Viewing &rarr;
            </button>
          </div>

          {/* Contact Details (Exact match to wireframe Section 6) */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-[#FBFBF8]/80">
            <a href="tel:+15651234567" className="hover:text-[#D4AF37] transition flex items-center space-x-2">
              <span>📞</span>
              <span>+1 (565) 123-4567</span>
            </a>
            <a href="mailto:hello@veridanrealty.com" className="hover:text-[#D4AF37] transition flex items-center space-x-2">
              <span>✉️</span>
              <span>hello@veridanrealty.com</span>
            </a>
            <span className="flex items-center space-x-2">
              <span>📍</span>
              <span>123 Luxury Drive, Miami, FL</span>
            </span>
          </div>
        </div>

        {/* Section Indicator */}
        <div className="relative z-10 w-full flex justify-end text-xs font-mono text-[#D4AF37] tracking-widest font-bold pt-4 border-t border-white/10">
          06 / 06 &bull; END
        </div>
      </section>


      {/* ========================================================================= */}
      {/* FOOTER: VERIDAN REAL ESTATE                                               */}
      {/* ========================================================================= */}
      <footer className="w-full py-10 px-6 lg:px-14 border-t border-white/10 bg-[#07131D] text-xs font-mono text-[#FBFBF8]/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded bg-[#D4AF37] text-[#0B1E2D] font-bold flex items-center justify-center text-xs">
              V
            </div>
            <span className="font-['Playfair_Display',serif] font-bold text-sm text-[#FBFBF8] tracking-widest uppercase">
              Veridan Real Estate
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
                    PRIVATE APPOINTMENT
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
