import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function VeridanRealEstateSite() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({ name: '', email: '', phone: '', date: '', time: 'Morning (10:00 AM)' });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setModalSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#060a0f] text-[#f5f5f7] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#D4AF37] selection:text-black antialiased">
      
      {/* ========================================================================= */}
      {/* MINIMALIST UNBOXED HEADER                                                 */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 lg:px-20 py-6 flex items-center justify-between bg-[#060a0f]/80 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="font-['Playfair_Display',serif] font-bold text-lg tracking-[0.2em] text-white uppercase">
            VERIDAN
          </span>
          <span className="text-[9px] font-mono text-[#D4AF37] tracking-[0.3em] uppercase">
            &bull; RESIDENCE
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-12 text-xs font-mono tracking-[0.2em] uppercase text-white/60">
          <button onClick={() => document.getElementById('ad-exterior').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition">Architecture</button>
          <button onClick={() => document.getElementById('ad-arrival').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition">Approach</button>
          <button onClick={() => document.getElementById('ad-salon').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition">Interior</button>
          <button onClick={() => document.getElementById('ad-anatomy').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition">Anatomy</button>
          <button onClick={() => document.getElementById('ad-territory').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition">Territory</button>
        </nav>

        <div className="flex items-center space-x-6">
          <span className="hidden lg:inline-block font-mono text-xs text-[#D4AF37] tracking-wider">
            $24,500,000 USD
          </span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 bg-white hover:bg-[#D4AF37] text-black hover:text-black font-mono text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-105"
          >
            Inquire
          </button>
        </div>
      </header>


      {/* ========================================================================= */}
      {/* PRODUCT AD 01: THE ARCHITECTURE (HERO)                                    */}
      {/* Monumental visual + small punchy description (Zero container boxes)       */}
      {/* ========================================================================= */}
      <section id="ad-exterior" className="relative w-full min-h-screen pt-32 pb-24 px-8 lg:px-20 flex flex-col justify-center border-b border-white/5">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text: Floating directly on canvas, zero box */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold block">
              PRODUCT 01 // ARCHITECTURAL MONOLITH
            </span>

            <h1 className="font-['Playfair_Display',serif] font-medium text-4xl sm:text-6xl text-white leading-[1.1] tracking-tight">
              A Home Designed <br />
              Around Your Life.
            </h1>

            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
              Cast in honed Roman travertine and dark basalt, engineered with a 14-meter post-tensioned cantilever hovering over a heated turquoise reflection pool.
            </p>

            <div className="pt-2 flex items-center space-x-6 text-xs font-mono text-white/50 tracking-wider">
              <span>4,200 SQ FT</span>
              <span>&bull;</span>
              <span>4 BEDROOMS</span>
              <span>&bull;</span>
              <span>INFINITY POOL</span>
            </div>

            <div className="pt-4 flex items-center space-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3.5 bg-white hover:bg-[#D4AF37] text-black font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300"
              >
                Schedule Viewing &rarr;
              </button>
            </div>
          </div>

          {/* Right Visual: Clean, sharp, unboxed presentation */}
          <div className="lg:col-span-7 relative aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/images/architecture/urban_villa_exterior.jpg"
              alt="Veridan Architecture"
              className="w-full h-full object-cover select-none filter contrast-[1.05]"
            />
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* PRODUCT AD 02: THE APPROACH (ROAD ARRIVAL)                                */}
      {/* ========================================================================= */}
      <section id="ad-arrival" className="relative w-full min-h-screen py-28 px-8 lg:px-20 flex flex-col justify-center border-b border-white/5">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual on Left */}
          <div className="lg:col-span-7 relative aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1">
            <img
              src="/images/veridan/veridan_road_arrival.jpg"
              alt="The Road Arrival"
              className="w-full h-full object-cover select-none filter contrast-[1.05]"
            />
          </div>

          {/* Text on Right: Floating directly on canvas, zero box */}
          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            <span className="text-xs font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold block">
              PRODUCT 02 // THE ARRIVAL
            </span>

            <h2 className="font-['Playfair_Display',serif] font-medium text-4xl sm:text-5xl text-white leading-tight tracking-tight">
              The Approach.
            </h2>

            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
              A private winding ascent through protected coastal foothills, culminating at illuminated security portals with the glowing metropolis skyline below.
            </p>

            <div className="pt-2 space-y-2 text-xs font-mono text-white/50 tracking-wider">
              <p>&bull; 5 Minutes to Downtown Marina</p>
              <p>&bull; 10 Minutes to International Prep Academies</p>
              <p>&bull; Complete Gated Perimeter & Thermal Sensors</p>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* PRODUCT AD 03: THE INTERIOR SALON (SPACE & LIGHT)                         */}
      {/* ========================================================================= */}
      <section id="ad-salon" className="relative w-full min-h-screen py-28 px-8 lg:px-20 flex flex-col justify-center border-b border-white/5">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold block">
              PRODUCT 03 // THE SALON
            </span>

            <h2 className="font-['Playfair_Display',serif] font-medium text-4xl sm:text-5xl text-white leading-tight tracking-tight">
              Space and Fire.
            </h2>

            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
              Double-height architectural volume wrapped in frameless floor-to-ceiling glass, anchored by an integrated linear hearth and fluted travertine stone.
            </p>

            <div className="pt-2 flex items-center space-x-6 text-xs font-mono text-white/50 tracking-wider">
              <span>6.2M VOLUME</span>
              <span>&bull;</span>
              <span>FLUTED STONE</span>
              <span>&bull;</span>
              <span>POOL THRESHOLD</span>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] hover:underline"
              >
                Request Architectural Specs &rarr;
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="lg:col-span-7 relative aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/images/architecture/urban_villa_living.jpg"
              alt="Living Room Salon"
              className="w-full h-full object-cover select-none filter contrast-[1.05]"
            />
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* PRODUCT AD 04: THE 3D ANATOMY (EXPLODED FLOOR PLAN)                       */}
      {/* ========================================================================= */}
      <section id="ad-anatomy" className="relative w-full min-h-screen py-28 px-8 lg:px-20 flex flex-col justify-center border-b border-white/5">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual on Left */}
          <div className="lg:col-span-7 relative aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1 flex items-center justify-center bg-[#090e15] p-6">
            <img
              src="/images/veridan/veridan_exploded_floorplan.jpg"
              alt="3D Exploded Anatomy"
              className="w-full h-full object-contain select-none"
            />
          </div>

          {/* Text on Right */}
          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            <span className="text-xs font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold block">
              PRODUCT 04 // 3D ANATOMY
            </span>

            <h2 className="font-['Playfair_Display',serif] font-medium text-4xl sm:text-5xl text-white leading-tight tracking-tight">
              Three Vertical <br />
              Volumes.
            </h2>

            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
              A spatial vertical dialogue separating social entertaining on the ground pool level, private suites in the cantilever core, and open sky terraces above.
            </p>

            <div className="pt-2 space-y-2 text-xs font-mono text-white/50 tracking-wider">
              <p>&bull; Level 01: Sunken Salon, Dining, Pool Patio, Garage</p>
              <p>&bull; Level 02: 4 Ensuite Chambers & Master Sanctuary</p>
              <p>&bull; Level 03: Cocktail Sky Terrace & Hydro Spa</p>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* PRODUCT AD 05: THE TERRITORY (AERIAL MAP)                                 */}
      {/* ========================================================================= */}
      <section id="ad-territory" className="relative w-full min-h-screen py-28 px-8 lg:px-20 flex flex-col justify-center border-b border-white/5">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold block">
              PRODUCT 05 // THE TERRITORY
            </span>

            <h2 className="font-['Playfair_Display',serif] font-medium text-4xl sm:text-5xl text-white leading-tight tracking-tight">
              Surrounded by Water.
            </h2>

            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
              Perched on the coastal peninsula, minutes from private deep-water slips, sandy shores, and direct arterial corridors into the financial district.
            </p>

            <div className="pt-2 space-y-2 text-xs font-mono text-white/50 tracking-wider">
              <p>&bull; Marina Slip Access: 5 Mins</p>
              <p>&bull; Michelin Star Dining Promenade: 7 Mins</p>
              <p>&bull; Executive Private Jetport: 18 Mins</p>
            </div>
          </div>

          {/* Right Visual */}
          <div className="lg:col-span-7 relative aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/images/veridan/veridan_aerial_map.jpg"
              alt="Surrounding Territory"
              className="w-full h-full object-cover select-none filter contrast-[1.05]"
            />
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* FINAL AD: PRIVATE ACQUISITION                                             */}
      {/* ========================================================================= */}
      <section className="relative w-full py-36 px-8 lg:px-20 text-center flex flex-col items-center justify-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <span className="text-xs font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold block">
            PRIVATE ACQUISITION
          </span>

          <h2 className="font-['Playfair_Display',serif] font-medium text-5xl sm:text-6xl text-white leading-tight tracking-tight">
            Make It Yours.
          </h2>

          <p className="text-lg text-white/70 font-light leading-relaxed">
            Offered exclusively at $24,500,000 USD. <br />
            Private viewings arranged strictly by appointment.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-9 py-4 bg-white hover:bg-[#D4AF37] text-black font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:scale-105"
            >
              Schedule Private Viewing &rarr;
            </button>
          </div>

          <div className="pt-8 flex items-center justify-center space-x-8 text-xs font-mono text-white/50">
            <a href="tel:+15651234567" className="hover:text-white transition">+1 (565) 123-4567</a>
            <span>&bull;</span>
            <a href="mailto:hello@veridanrealty.com" className="hover:text-white transition">hello@veridanrealty.com</a>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* FOOTER                                                                    */}
      {/* ========================================================================= */}
      <footer className="w-full py-12 px-8 lg:px-20 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/40 gap-4">
        <span>VERIDAN REAL ESTATE &copy; 2026</span>
        <span>MIAMI &bull; ZURICH</span>
      </footer>


      {/* ========================================================================= */}
      {/* PRIVATE VIEWING MODAL DIALOG                                              */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-md bg-[#0c1017] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
            <button
              onClick={() => { setIsModalOpen(false); setModalSubmitted(false); }}
              className="absolute top-5 right-5 text-white/40 hover:text-white text-lg"
            >
              ✕
            </button>

            {modalSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="font-['Playfair_Display',serif] font-bold text-2xl text-white">
                  Appointment Requested
                </h3>
                <p className="text-xs font-mono text-white/60">
                  Our private client concierge will contact you within 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="text-center space-y-1">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">
                    PRIVATE VIEWING // $24,500,000 USD
                  </span>
                  <h3 className="font-['Playfair_Display',serif] font-medium text-2xl text-white">
                    Request Appointment
                  </h3>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-white/50 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-white/50 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    placeholder="client@vip.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-white/50 uppercase mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-white hover:bg-[#D4AF37] text-black font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-xl mt-4"
                >
                  Submit Request &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
