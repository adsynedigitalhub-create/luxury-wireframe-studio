import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  Sparkles,
  Plus,
  X,
  CheckCircle2,
  Building2,
  Compass,
  Layers,
  ChevronRight,
  SlidersHorizontal,
  FileText,
  Activity,
  ShieldCheck,
  Award,
  Maximize2
} from 'lucide-react';
import {
  ARCHITECTURE_PROJECTS,
  ARCHITECTURE_CATEGORIES,
  GLOBAL_STUDIOS
} from '../../data/architectureProjects';
import { ThreeArchitectureBuilding } from './ThreeArchitectureBuilding';

export const ArchitectureMonographSite = ({ onBackToCanvas, onOpenCodeModal }) => {
  // Navigation & Filter State
  const [activeCategory, setActiveCategory] = useState('all');
  const [projectsList, setProjectsList] = useState(ARCHITECTURE_PROJECTS);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeStudioIndex, setActiveStudioIndex] = useState(0);

  // Live World Clocks State
  const [worldTimes, setWorldTimes] = useState({});

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const times = {};
      GLOBAL_STUDIOS.forEach((studio) => {
        try {
          const timeStr = now.toLocaleTimeString('en-GB', {
            timeZone: studio.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
          times[studio.id] = timeStr;
        } catch (e) {
          times[studio.id] = now.toLocaleTimeString();
        }
      });
      setWorldTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  // Modals
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);

  // New Project Form State
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjCategory, setNewProjCategory] = useState('commercial');
  const [newProjLocation, setNewProjLocation] = useState('');
  const [newProjYear, setNewProjYear] = useState('2026');
  const [newProjArea, setNewProjArea] = useState('');
  const [newProjImage, setNewProjImage] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');

  // Client Commission Form State
  const [formTypology, setFormTypology] = useState('Luxury Residential Villa');
  const [formBudget, setFormBudget] = useState('$2M – $10M');
  const [formLocation, setFormLocation] = useState('');
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formBrief, setFormBrief] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle Adding New Project
  const handleAddNewProject = (e) => {
    e.preventDefault();
    if (!newProjTitle.trim()) return;

    const createdProject = {
      id: `proj-custom-${Date.now()}`,
      number: String(projectsList.length + 1).padStart(2, '0'),
      title: newProjTitle,
      category: ARCHITECTURE_CATEGORIES.find(c => c.key === newProjCategory)?.label || 'Custom Project',
      categoryKey: newProjCategory,
      location: newProjLocation || 'Global Atelier Project',
      year: newProjYear || '2026',
      area: newProjArea || '5,000 m²',
      height: 'Parametric Topology',
      materials: 'Architectural Ultra-Performance Concrete & Glass',
      image: newProjImage || '/images/architecture/skyscraper_landmark.jpg',
      description: newProjDesc || 'Bespoke architectural commission engineered with sustainable parametric computational modeling and timeless materiality.',
      leadArchitect: 'Atelier Vanguard Design Council'
    };

    setProjectsList([createdProject, ...projectsList]);
    setIsAddProjectModalOpen(false);
    setNewProjTitle('');
    setNewProjLocation('');
    setNewProjArea('');
    setNewProjImage('');
    setNewProjDesc('');
  };

  // Filtered projects
  const filteredProjects = activeCategory === 'all'
    ? projectsList
    : projectsList.filter(p => p.categoryKey === activeCategory);

  const activeStudio = GLOBAL_STUDIOS[activeStudioIndex] || GLOBAL_STUDIOS[0];

  return (
    <div className="min-h-screen bg-[#07080b] text-[#f4f5f8] font-sans selection:bg-[#f05a36] selection:text-white relative overflow-x-hidden">
      {/* Background Architectural Blueprint Matrix Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#f05a36]/10 rounded-full blur-[140px] opacity-70" />
        <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#38bdf8]/5 rounded-full blur-[160px] opacity-50" />
        <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-[#f05a36]/5 rounded-full blur-[150px] opacity-60" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="relative z-10">
        {/* ─────────────────────────────────────────────────────────────
            1. MODERN ARCHITECTURAL NAVIGATION HEADER
            (4 Clean Nav Links + 'ATV' 3-Letter Mark + Animated Free Call CTA)
           ───────────────────────────────────────────────────────────── */}
        <header className="sticky top-0 z-50 bg-[#08090d]/85 backdrop-blur-md border-b border-[#1c2230] shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Logo Brand with 'ATV' 3-Letter Mark Underneath */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-11 h-11 bg-gradient-to-br from-[#f05a36] to-[#b3391b] rounded-sm flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#f05a36]/25 border border-white/20 transition group-hover:scale-105">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="font-serif text-lg font-bold tracking-widest text-white uppercase">
                    ATELIER VANGUARD
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f05a36]" />
                </div>
                {/* 3 Letters Mark Under Logo as requested */}
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[10px] text-[#f05a36] font-extrabold tracking-[0.45em] uppercase">
                    ATV
                  </span>
                  <span className="font-mono text-[9px] text-gray-400 tracking-wider">
                    / GLOBAL ARCHITECTURE
                  </span>
                </div>
              </div>
            </div>

            {/* Exactly 4 Clean Nav Links */}
            <nav className="hidden md:flex items-center space-x-8 font-mono text-xs tracking-wider uppercase text-gray-300">
              <a href="#experience" className="hover:text-[#f05a36] transition flex items-center space-x-1">
                <span className="text-[#f05a36] font-bold">01.</span>
                <span>Experience</span>
              </a>
              <a href="#works" className="hover:text-[#f05a36] transition flex items-center space-x-1">
                <span className="text-[#f05a36] font-bold">02.</span>
                <span>Works</span>
              </a>
              <a href="#about" className="hover:text-[#f05a36] transition flex items-center space-x-1">
                <span className="text-[#f05a36] font-bold">03.</span>
                <span>About</span>
              </a>
              <a href="#studios" className="hover:text-[#f05a36] transition flex items-center space-x-1">
                <span className="text-[#f05a36] font-bold">04.</span>
                <span>Studios</span>
              </a>
              <a href="#inquiry" className="hover:text-[#f05a36] transition flex items-center space-x-1">
                <span className="text-[#f05a36] font-bold">05.</span>
                <span>Inquiry</span>
              </a>
            </nav>

            {/* Action CTA: Animated Framer Motion Book Free Call Button */}
            <div className="flex items-center space-x-3">
              {onBackToCanvas && (
                <button
                  onClick={onBackToCanvas}
                  className="hidden lg:flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-[#2b3345] bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-mono text-xs transition"
                  title="Switch to Studio Canvas"
                >
                  <span>🎨 Canvas</span>
                </button>
              )}

              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(240, 90, 54, 0.45)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsConsultationModalOpen(true)}
                className="relative group overflow-hidden px-4 sm:px-5 py-2.5 rounded-sm bg-gradient-to-r from-[#f05a36] to-[#d94824] text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-[#f05a36]/30 border border-[#ff7856]"
              >
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                >
                  <Phone className="w-3.5 h-3.5 text-white" />
                </motion.span>
                <span>Book Free Call</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </motion.button>
            </div>
          </div>
        </header>

        {/* ─────────────────────────────────────────────────────────────
            2. SECTION 1 (FIRST SECTION AFTER HEADER):
               PROCEDURAL 3D ARCHITECTURAL BUILDING (Three.js WebGL + GSAP)
               WITH SIDE HIGH-IMPACT ARCHITECTURAL TYPOGRAPHY
           ───────────────────────────────────────────────────────────── */}
        <section id="experience" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Side: High-Impact Architectural Typography (GSAP-style) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#f05a36]/15 border border-[#f05a36]/30 text-[#f05a36] font-mono text-xs font-semibold">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>THREE.JS & GSAP COMPUTATIONAL SUITE</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-white leading-[1.05]">
                  PARAMETRIC <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f05a36] via-[#ff7c5c] to-amber-300">
                    MONUMENTS.
                  </span> <br />
                  ENGINEERED FOR TIME.
                </h1>
                <div className="h-1.5 w-24 bg-[#f05a36] rounded-full mt-3" />
              </div>

              <p className="text-sm text-gray-300 font-sans leading-relaxed text-justify">
                Atelier Vanguard conceives monolithic architectural landmarks where computational geometry, high-performance structural engineering, and sustainable materials fuse into civic icons.
              </p>

              {/* Kinetic Metrics Counters */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/10">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                  <span className="font-mono text-2xl lg:text-3xl font-extrabold text-[#f05a36] block">
                    42+
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 block mt-0.5">
                    BUILT LANDMARKS
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                  <span className="font-mono text-2xl lg:text-3xl font-extrabold text-white block">
                    100%
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 block mt-0.5">
                    CARBON NEUTRAL
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                  <span className="font-mono text-2xl lg:text-3xl font-extrabold text-amber-400 block">
                    $2.4B
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 block mt-0.5">
                    VALUATION
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#works"
                  className="px-5 py-3 rounded-sm bg-[#f05a36] hover:bg-white hover:text-black text-white font-bold text-xs uppercase tracking-widest transition shadow-lg shadow-[#f05a36]/25 flex items-center space-x-2"
                >
                  <span>Explore Built Works</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#studios"
                  className="px-5 py-3 rounded-sm bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 font-bold text-xs uppercase tracking-widest transition flex items-center space-x-2"
                >
                  <Globe className="w-3.5 h-3.5 text-[#f05a36]" />
                  <span>Global Studios Hub</span>
                </a>
              </div>
            </div>

            {/* Right Side: Interactive Three.js WebGL Building Canvas */}
            <div className="lg:col-span-7 h-[560px] lg:h-[640px]">
              <ThreeArchitectureBuilding />
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            3. SECTION 2: HIGH BUILDING LANDMARK CENTERPIECE SHOWCASE
               (Moved from Hero to 2nd position as user requested)
           ───────────────────────────────────────────────────────────── */}
        <section id="hero-landmark" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-[#1c2230]">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-gray-300 uppercase tracking-widest">
              <span>FEATURED SKYSCRAPER LANDMARK</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#f05a36]" />
              <span>ZURICH HEADQUARTERS</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              THE MONOLITH TITAN TOWER
            </h2>
            <p className="text-xs text-gray-400 font-sans max-w-2xl mx-auto">
              340 meters of structural titanium, faceted diagrid aerodynamics, and net-zero geothermal foundations towering over the Swiss plateau.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-b from-[#11141c] to-[#0a0c10] border border-[#232a3b] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
            {/* Left Specs Panel */}
            <div className="lg:col-span-3 space-y-5 order-2 lg:order-1">
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <span className="font-mono text-[10px] text-[#f05a36] uppercase font-bold tracking-wider block">
                  STRUCTURAL METRICS:
                </span>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-gray-500">HEIGHT:</span>
                    <span className="text-white font-bold">340 METERS</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-gray-500">STORIES:</span>
                    <span className="text-white font-bold">78 LEVELS</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-gray-500">GROSS AREA:</span>
                    <span className="text-white font-bold">85,400 M²</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-gray-500">STEEL SAVED:</span>
                    <span className="text-[#f05a36] font-bold">-34% DIAGRID</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <span className="font-mono text-[10px] text-gray-400 uppercase font-bold tracking-wider block">
                  MATERIALITY PALETTE:
                </span>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Reflective aerospace-grade titanium diagrid, triple-glazed acoustic low-iron glass, and basalt aggregate foundation cores.
                </p>
              </div>
            </div>

            {/* Center: Hero High Building Image */}
            <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center relative group">
              <div className="relative w-full max-w-lg aspect-[3/4] rounded-xl overflow-hidden border-2 border-[#f05a36]/40 shadow-2xl shadow-[#f05a36]/20 bg-black">
                <img
                  src="/images/architecture/skyscraper_landmark.jpg"
                  alt="The Monolith Titan Tower Skyscraper"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#f05a36] font-mono font-bold block text-[10px]">LANDMARK STATUS</span>
                    <span className="text-white font-semibold">Titan Tower — Zurich Alpine Horizon</span>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-1 rounded bg-[#f05a36]/20 text-[#f05a36] border border-[#f05a36]/40">
                    2026 INAUGURATION
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Principal Architect Quote & Contact Bar */}
            <div className="lg:col-span-3 space-y-5 order-3">
              <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[#f05a36]">
                    <img
                      src="/images/architecture/architect_principal.jpg"
                      alt="Henrik Vane, Lead Principal"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-white font-bold text-xs block">Henrik Vane</span>
                    <span className="font-mono text-[10px] text-[#f05a36]">Lead Principal Architect</span>
                  </div>
                </div>
                <p className="text-xs text-gray-300 italic leading-relaxed font-serif">
                  &ldquo;A skyscraper is not merely an exclamation mark in the clouds; it is a thermal lung, an aerodynamic spine, and a timeless civic testament.&rdquo;
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f05a36]/10 border border-[#f05a36]/30 space-y-2">
                <span className="font-mono text-[10px] text-[#f05a36] font-bold uppercase tracking-wider block">
                  MONUMENT INQUIRY:
                </span>
                <p className="text-xs text-gray-300 font-sans">
                  Commissioning commercial masterplans & vertical headquarters worldwide.
                </p>
                <a
                  href="#inquiry"
                  className="text-xs font-mono text-white hover:text-[#f05a36] flex items-center space-x-1 pt-1 font-semibold group"
                >
                  <span>Transmit Commission Brief</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            4. SECTION 3: SELECTED WORKS & FILTERABLE PORTFOLIO
               (Includes + Add Custom Project Modal)
           ───────────────────────────────────────────────────────────── */}
        <section id="works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#1c2230]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 font-mono text-[10px] text-[#f05a36] tracking-[0.25em] uppercase font-bold mb-2">
                <span>CURATED PORTFOLIO</span>
                <span className="w-1 h-1 rounded-full bg-[#f05a36]" />
                <span>42+ GLOBAL LANDMARKS</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
                MONUMENTAL ARCHITECTURE WORKS
              </h2>
            </div>

            {/* + Add Custom Project Button */}
            <button
              onClick={() => setIsAddProjectModalOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-sm bg-white/5 hover:bg-[#f05a36] text-white font-mono text-xs uppercase tracking-wider border border-white/15 hover:border-[#f05a36] transition shadow-md"
            >
              <Plus className="w-4 h-4 text-[#f05a36] group-hover:text-white" />
              <span>Add Custom Project</span>
            </button>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 border-b border-[#1f2636] font-mono text-xs">
            {ARCHITECTURE_CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-sm whitespace-nowrap transition uppercase tracking-wider font-semibold ${
                  activeCategory === cat.key
                    ? 'bg-[#f05a36] text-white shadow-md'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                whileHover={{ y: -6 }}
                onClick={() => setSelectedProject(proj)}
                className="bg-[#10131a] rounded-xl overflow-hidden border border-[#212738] hover:border-[#f05a36] transition duration-300 shadow-xl cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[10px] text-[#f05a36] font-bold">
                      #{proj.number}
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[9px] text-gray-300">
                      {proj.year}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="font-mono text-[10px] text-[#f05a36] uppercase tracking-wider block">
                      {proj.category}
                    </span>
                    <h3 className="font-sans text-lg font-bold text-white group-hover:text-[#f05a36] transition">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-sans line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-white/5 font-mono text-[10px] text-gray-400">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-[#f05a36]" />
                    <span>{proj.location}</span>
                  </span>
                  <span className="text-white font-semibold">{proj.area}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            5. SECTION 4: GLOBAL STUDIOS HUB (COMPLETELY OVERHAULED)
               With Real-time Live World Clocks (Zurich, Milano, Tokyo, NYC),
               GPS Coordinates, Studio Specs & High-Res Photography
           ───────────────────────────────────────────────────────────── */}
        <section id="studios" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#1c2230]">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#f05a36]/15 border border-[#f05a36]/30 font-mono text-[10px] text-[#f05a36] uppercase font-bold tracking-widest">
              <Globe className="w-3.5 h-3.5" />
              <span>GLOBAL COMMAND STUDIOS</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              4 CONTINENTAL ATELIERS & RESEARCH HUBS
            </h2>
            <p className="text-xs text-gray-400 font-sans max-w-2xl mx-auto">
              Operating seamlessly across global time zones from structural engineering headquarters in Zurich to computational robotics in Tokyo.
            </p>
          </div>

          {/* Interactive City Selector Tabs with Live Clocks */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {GLOBAL_STUDIOS.map((studio, idx) => {
              const isActive = activeStudioIndex === idx;
              const liveTime = worldTimes[studio.id] || '12:00:00';
              return (
                <button
                  key={studio.id}
                  onClick={() => setActiveStudioIndex(idx)}
                  className={`p-4 rounded-xl border text-left transition relative overflow-hidden group ${
                    isActive
                      ? 'bg-gradient-to-br from-[#1c2230] to-[#121622] border-[#f05a36] shadow-xl shadow-[#f05a36]/10'
                      : 'bg-[#0f1218] border-[#222938] hover:border-[#f05a36]/50 hover:bg-[#151924]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] font-bold text-white group-hover:text-[#f05a36] transition">
                      {studio.city}
                    </span>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">
                      {studio.flag}
                    </span>
                  </div>

                  <div className="font-mono text-lg font-extrabold text-[#f05a36] tracking-tight flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{liveTime}</span>
                  </div>

                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block mt-1">
                    {studio.utcOffset} • {studio.country}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="activeStudioIndicator"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-[#f05a36]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Studio Deep Detail Showcase */}
          <div className="bg-gradient-to-br from-[#12151f] to-[#090b10] border border-[#242b3d] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Studio Photograph */}
              <div className="lg:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-2xl group">
                <img
                  src={activeStudio.studioImage}
                  alt={activeStudio.city + ' Atelier'}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#f05a36] font-mono font-bold block text-[10px]">REGIONAL HUB</span>
                    <span className="text-white font-bold">{activeStudio.city} Atelier</span>
                  </div>
                  <span className="font-mono text-[10px] text-gray-300">
                    {activeStudio.elevation}
                  </span>
                </div>
              </div>

              {/* Studio Specifications & Team Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs text-[#f05a36] font-bold uppercase tracking-widest">
                      {activeStudio.role}
                    </span>
                  </div>
                  <h3 className="font-sans text-2xl sm:text-3xl font-extrabold uppercase text-white">
                    {activeStudio.city} Studio & Lab
                  </h3>
                </div>

                <p className="text-xs text-gray-300 font-sans leading-relaxed text-justify">
                  {activeStudio.focus}. Our {activeStudio.city} office houses computational simulation clusters and rapid prototyping machinery for live architectural testing.
                </p>

                {/* Studio Metrics Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                    <span className="text-gray-500 font-mono text-[9px] uppercase block">GPS COORDINATES:</span>
                    <span className="font-mono text-xs text-white font-bold mt-0.5 block">{activeStudio.gpsCoords}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                    <span className="text-gray-500 font-mono text-[9px] uppercase block">TEAM CAPACITY:</span>
                    <span className="font-mono text-xs text-white font-bold mt-0.5 block">{activeStudio.teamSize}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                    <span className="text-gray-500 font-mono text-[9px] uppercase block">ACTIVE COMMISSIONS:</span>
                    <span className="font-mono text-xs text-[#f05a36] font-bold mt-0.5 block">{activeStudio.activeCommissions} Landmark Projects</span>
                  </div>
                </div>

                {/* Director & Contact Strip */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-gray-400 text-[10px] uppercase font-mono block">DIRECTOR IN CHARGE:</span>
                    <span className="text-white font-bold font-sans">{activeStudio.leadArchitect}</span>
                    <span className="text-gray-400 text-[11px] block">{activeStudio.address}</span>
                  </div>
                  <div className="flex flex-col sm:items-end space-y-1 font-mono text-xs">
                    <a href={`tel:${activeStudio.phone}`} className="text-[#f05a36] hover:underline">
                      {activeStudio.phone}
                    </a>
                    <a href={`mailto:${activeStudio.email}`} className="text-gray-400 hover:text-white">
                      {activeStudio.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            6. SECTION 5: ABOUT LEADERSHIP
               (Features the DIFFERENT architect: Alexander Van Der Rohe)
           ───────────────────────────────────────────────────────────── */}
        <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#1c2230]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Different Architect Portrait Image */}
            <div className="lg:col-span-5 relative group">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#f05a36]/40 shadow-2xl bg-black">
                <img
                  src="/images/architecture/architect_partner.jpg"
                  alt="Alexander Van Der Rohe, Design Director"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 space-y-1">
                  <span className="font-mono text-[10px] text-[#f05a36] uppercase font-bold tracking-wider block">
                    DESIGN DIRECTOR & SENIOR PARTNER
                  </span>
                  <h4 className="font-sans text-sm font-bold text-white">Alexander Van Der Rohe</h4>
                  <span className="font-mono text-[9px] text-gray-400 block">M.Arch ETH Zurich • Registered SIA Architect</span>
                </div>
              </div>
            </div>

            {/* Right: Leadership Manifesto */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 font-mono text-[10px] text-[#f05a36] uppercase font-bold tracking-widest">
                <Award className="w-3.5 h-3.5" />
                <span>ARCHITECTURAL LEADERSHIP</span>
              </div>

              <div className="space-y-2">
                <h2 className="font-sans text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight leading-tight">
                  YOU ARE WELCOME! <br />
                  <span className="text-[#f05a36]">CRAFTING HUMAN DIGNITY</span> IN STEEL & STONE.
                </h2>
                <div className="h-1.5 w-20 bg-[#f05a36] rounded-full" />
              </div>

              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed text-justify">
                &ldquo;True contemporary architecture is neither nostalgic pastiche nor digital exhibitionism. It is the radical orchestration of weight, proportion, daylight, and materiality into structures that elevate human consciousness.&rdquo;
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-sans text-xs">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <span className="font-bold text-white block">Pritzker & Mies Nominee</span>
                  <p className="text-gray-400 leading-relaxed text-[11px]">
                    Recipient of European Civic Architecture Medals and RIBA International Awards.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <span className="font-bold text-white block">LOD-400 BIM Directorship</span>
                  <p className="text-gray-400 leading-relaxed text-[11px]">
                    Pioneering algorithmic structural optimization and mass-timber sequestration.
                  </p>
                </div>
              </div>

              {/* Hand-signed Cursive Signature Simulation */}
              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                <div>
                  <span className="font-serif text-2xl text-[#f05a36] italic tracking-wide block font-light">
                    Alexander v.d. Rohe
                  </span>
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                    DIRECTOR OF DESIGN COUNCIL
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified Principal Signature</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            7. SECTION 6: CLIENT COMMISSION INQUIRY FORM
           ───────────────────────────────────────────────────────────── */}
        <section id="inquiry" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#1c2230] mb-12">
          <div className="bg-gradient-to-br from-[#121620] to-[#0a0c10] rounded-2xl shadow-2xl border-2 border-[#f05a36]/50 p-6 md:p-10 lg:p-14 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column */}
              <div className="lg:col-span-5 space-y-5">
                <span className="font-mono text-xs text-[#f05a36] tracking-[0.25em] uppercase font-bold block">
                  COMMISSION AN ARCHITECTURAL MONUMENT
                </span>
                <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
                  LET US ENGINEER YOUR NEXT LANDMARK
                </h2>
                <p className="text-xs text-gray-300 leading-relaxed font-sans text-justify">
                  Whether you are envisioning a private cliffside estate, an institutional museum, or an urban commercial supertower, our partners review every architectural commission with personalized rigor.
                </p>

                <div className="p-4 bg-white/5 border-l-4 border-[#f05a36] rounded-sm space-y-2 text-xs">
                  <span className="font-bold text-white block">Our Client Engagement Commitment:</span>
                  <ul className="space-y-1 text-gray-400 list-disc list-inside font-sans">
                    <li>Direct partner consultation within 48 business hours</li>
                    <li>Complimentary geodetic & zoning pre-feasibility analysis</li>
                    <li>LOD-400 parametric BIM budget forecasting</li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-7 bg-[#0b0e14] p-6 sm:p-8 rounded-xl border border-white/10 shadow-sm">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 text-center space-y-4"
                  >
                    <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
                    <h3 className="font-sans text-xl font-bold text-white">
                      Commission Brief Successfully Transmitted
                    </h3>
                    <p className="text-xs text-gray-300 max-w-md mx-auto">
                      Thank you. Your project brief has been encrypted and delivered directly to Henrik Vane and Alexander Van Der Rohe for confidential feasibility review.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-5 py-2.5 rounded-sm bg-[#f05a36] text-white font-mono text-xs uppercase tracking-wider font-bold"
                    >
                      Transmit Another Brief
                    </button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSubmitted(true);
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1.5">
                        PROJECT TYPOLOGY:
                      </label>
                      <select
                        value={formTypology}
                        onChange={(e) => setFormTypology(e.target.value)}
                        className="w-full p-2.5 bg-[#141822] border border-[#262e40] rounded-sm font-sans text-xs text-white focus:outline-none focus:border-[#f05a36]"
                      >
                        <option>Luxury Residential Villa / Estate</option>
                        <option>Commercial Tower / Mixed-Use</option>
                        <option>Cultural Museum / Pavilion</option>
                        <option>Infrastructure Bridge & Civic Works</option>
                        <option>Urban Masterplan & District Design</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1.5">
                        ESTIMATED PROJECT BUDGET:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['$500K – $2M', '$2M – $10M', '$10M+ Enterprise'].map((budget) => (
                          <button
                            key={budget}
                            type="button"
                            onClick={() => setFormBudget(budget)}
                            className={`p-2 rounded-sm border text-center font-mono text-[11px] font-semibold transition ${
                              formBudget === budget
                                ? 'bg-[#f05a36] text-white border-[#f05a36]'
                                : 'bg-[#141822] text-gray-300 border-[#262e40] hover:border-gray-500'
                            }`}
                          >
                            {budget}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1.5">
                          YOUR NAME / ORGANIZATION:
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. Lorde Harrington"
                          className="w-full p-2.5 bg-[#141822] border border-[#262e40] rounded-sm font-sans text-xs text-white focus:outline-none focus:border-[#f05a36]"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1.5">
                          PROJECT SITE LOCATION:
                        </label>
                        <input
                          type="text"
                          required
                          value={formLocation}
                          onChange={(e) => setFormLocation(e.target.value)}
                          placeholder="City, Country (e.g. Geneva, Switzerland)"
                          className="w-full p-2.5 bg-[#141822] border border-[#262e40] rounded-sm font-sans text-xs text-white focus:outline-none focus:border-[#f05a36]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1.5">
                          CORPORATE EMAIL:
                        </label>
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="client@domain.com"
                          className="w-full p-2.5 bg-[#141822] border border-[#262e40] rounded-sm font-sans text-xs text-white focus:outline-none focus:border-[#f05a36]"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1.5">
                          PHONE NUMBER:
                        </label>
                        <input
                          type="tel"
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          placeholder="+41 ..."
                          className="w-full p-2.5 bg-[#141822] border border-[#262e40] rounded-sm font-sans text-xs text-white focus:outline-none focus:border-[#f05a36]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1.5">
                        PROJECT BRIEF & AMBITION:
                      </label>
                      <textarea
                        rows={3}
                        value={formBrief}
                        onChange={(e) => setFormBrief(e.target.value)}
                        placeholder="Describe your architectural ambition, timeline, and site constraints..."
                        className="w-full p-2.5 bg-[#141822] border border-[#262e40] rounded-sm font-sans text-xs text-white focus:outline-none focus:border-[#f05a36]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#f05a36] hover:bg-white hover:text-black text-white font-bold text-xs uppercase tracking-widest rounded-sm transition shadow-lg shadow-[#f05a36]/25 flex items-center justify-center space-x-2"
                    >
                      <span>Transmit Architectural Commission Brief</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            8. FOOTER: MODERN DARK MINIMALIST ARCHITECTURAL FOOTER
           ───────────────────────────────────────────────────────────── */}
        <footer className="bg-[#06070a] text-white border-t-2 border-[#1c2230] py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
            <div className="space-y-3">
              <div className="flex items-center space-x-2.5">
                <span className="text-xl font-mono text-[#f05a36] font-bold">ATV</span>
                <span className="font-serif text-sm font-bold tracking-widest uppercase">
                  ATELIER VANGUARD
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed font-sans">
                Contemporary architectural monuments, parametric computational towers, and structural masterworks. Built to endure across centuries.
              </p>
              <span className="font-mono text-[10px] text-[#f05a36] block">
                ZURICH • MILANO • TOKYO • NEW YORK
              </span>
            </div>

            <div className="space-y-2 font-sans">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#f05a36] font-bold block mb-2">
                ATELIER DIRECTORY
              </span>
              <ul className="space-y-1.5 text-gray-300">
                <li><a href="#experience" className="hover:text-[#f05a36] transition">3D Computational Experience</a></li>
                <li><a href="#works" className="hover:text-[#f05a36] transition">Curated Built Works</a></li>
                <li><a href="#about" className="hover:text-[#f05a36] transition">About Leadership</a></li>
                <li><a href="#studios" className="hover:text-[#f05a36] transition">Global Studios Hub</a></li>
              </ul>
            </div>

            <div className="space-y-2 font-sans">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#f05a36] font-bold block mb-2">
                GLOBAL STUDIOS DIRECT
              </span>
              <ul className="space-y-1.5 text-gray-400 font-mono text-[11px]">
                <li>Zurich HQ: +41 44 288 9000</li>
                <li>Milano Atelier: +39 02 8901 3340</li>
                <li>Tokyo Robotics Lab: +81 3 5468 1120</li>
                <li>New York Flagship: +1 212 755 8890</li>
              </ul>
            </div>

            <div className="space-y-3 font-sans">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#f05a36] font-bold block mb-1">
                COMMISSION INQUIRY
              </span>
              <p className="text-gray-400 text-xs leading-relaxed">
                Connect with our partners for private residential or civic commercial commissions worldwide.
              </p>
              <button
                onClick={() => setIsConsultationModalOpen(true)}
                className="w-full py-2 bg-white/10 hover:bg-[#f05a36] text-white text-xs font-mono font-bold rounded-sm transition"
              >
                Schedule Partner Consultation
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto border-t border-gray-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-gray-500 font-mono text-[10px]">
            <span>&copy; 2026 ATELIER VANGUARD ARCHITECTS. ALL RIGHTS RESERVED.</span>
            <span>THREE.JS • GSAP • COMPUTATIONAL MONOGRAPH PLATFORM</span>
          </div>
        </footer>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODAL 1: CONSULTATION / CALL BOOKING MODAL
         ───────────────────────────────────────────────────────────── */}
      {isConsultationModalOpen && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#10131b] border border-[#2b3347] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative text-xs">
            <button
              onClick={() => {
                setIsConsultationModalOpen(false);
                setConsultationSubmitted(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 text-[#f05a36] font-mono text-[11px] font-bold">
              <Phone className="w-4 h-4" />
              <span>CONFIDENTIAL PARTNER CALL</span>
            </div>

            <h3 className="font-sans text-xl font-bold text-white">
              Schedule a Strategic Architecture Consultation
            </h3>

            {consultationSubmitted ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-base">Consultation Request Confirmed</h4>
                <p className="text-gray-300 text-xs">
                  Our partner secretary will contact you within 24 hours to schedule the confidential video session.
                </p>
                <button
                  onClick={() => {
                    setIsConsultationModalOpen(false);
                    setConsultationSubmitted(false);
                  }}
                  className="px-4 py-2 bg-[#f05a36] text-white rounded-sm font-bold text-xs"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setConsultationSubmitted(true);
                }}
                className="space-y-3.5"
              >
                <div>
                  <label className="font-mono text-[10px] text-gray-400 block mb-1">YOUR FULL NAME:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lorde Harrington"
                    className="w-full p-2.5 bg-[#161a25] border border-[#2b3347] rounded-sm text-white"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-gray-400 block mb-1">EMAIL ADDRESS:</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    className="w-full p-2.5 bg-[#161a25] border border-[#2b3347] rounded-sm text-white"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-gray-400 block mb-1">PREFERRED STUDIO / TIME ZONE:</label>
                  <select className="w-full p-2.5 bg-[#161a25] border border-[#2b3347] rounded-sm text-white">
                    <option>Zurich HQ (CET / Central European)</option>
                    <option>Milano Atelier (CET)</option>
                    <option>Tokyo Robotics Lab (JST)</option>
                    <option>New York Americas (EST)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#f05a36] hover:bg-[#e04925] text-white font-bold uppercase tracking-wider rounded-sm transition shadow-lg"
                >
                  Confirm Video Strategy Consultation
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 2: ADD CUSTOM PROJECT MODAL
         ───────────────────────────────────────────────────────────── */}
      {isAddProjectModalOpen && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#10131b] border border-[#2b3347] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative text-xs max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddProjectModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 text-[#f05a36] font-mono text-[11px] font-bold">
              <Plus className="w-4 h-4" />
              <span>NEW ARCHITECTURAL COMMISSION</span>
            </div>

            <h3 className="font-sans text-xl font-bold text-white">
              Publish Custom Project to Live Portfolio
            </h3>

            <form onSubmit={handleAddNewProject} className="space-y-3.5">
              <div>
                <label className="font-mono text-[10px] text-gray-400 block mb-1">PROJECT TITLE:</label>
                <input
                  type="text"
                  required
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  placeholder="e.g. Alpine Cantilever Research Observatory"
                  className="w-full p-2.5 bg-[#161a25] border border-[#2b3347] rounded-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[10px] text-gray-400 block mb-1">TYPOLOGY CATEGORY:</label>
                  <select
                    value={newProjCategory}
                    onChange={(e) => setNewProjCategory(e.target.value)}
                    className="w-full p-2.5 bg-[#161a25] border border-[#2b3347] rounded-sm text-white"
                  >
                    <option value="commercial">Commercial High-Rise</option>
                    <option value="residential">Luxury Villas</option>
                    <option value="cultural">Cultural & Museums</option>
                    <option value="infrastructure">Infrastructure & Bridges</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono text-[10px] text-gray-400 block mb-1">LOCATION (CITY, COUNTRY):</label>
                  <input
                    type="text"
                    value={newProjLocation}
                    onChange={(e) => setNewProjLocation(e.target.value)}
                    placeholder="e.g. Reykjavik, Iceland"
                    className="w-full p-2.5 bg-[#161a25] border border-[#2b3347] rounded-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[10px] text-gray-400 block mb-1">COMPLETION YEAR:</label>
                  <input
                    type="text"
                    value={newProjYear}
                    onChange={(e) => setNewProjYear(e.target.value)}
                    placeholder="2026"
                    className="w-full p-2.5 bg-[#161a25] border border-[#2b3347] rounded-sm text-white"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-gray-400 block mb-1">TOTAL AREA (M²):</label>
                  <input
                    type="text"
                    value={newProjArea}
                    onChange={(e) => setNewProjArea(e.target.value)}
                    placeholder="14,500 m²"
                    className="w-full p-2.5 bg-[#161a25] border border-[#2b3347] rounded-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] text-gray-400 block mb-1">IMAGE URL (OR LEAVE BLANK FOR DEFAULT):</label>
                <input
                  type="text"
                  value={newProjImage}
                  onChange={(e) => setNewProjImage(e.target.value)}
                  placeholder="https://... or /images/architecture/..."
                  className="w-full p-2.5 bg-[#161a25] border border-[#2b3347] rounded-sm text-white"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-gray-400 block mb-1">PROJECT DESCRIPTION:</label>
                <textarea
                  rows={3}
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  placeholder="Describe the architectural thesis, structural feats, and materials..."
                  className="w-full p-2.5 bg-[#161a25] border border-[#2b3347] rounded-sm text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#f05a36] hover:bg-[#e04925] text-white font-bold uppercase tracking-wider rounded-sm transition shadow-lg"
              >
                Add to Live Portfolio
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 3: PROJECT DETAIL INSPECTION MODAL
         ───────────────────────────────────────────────────────────── */}
      {selectedProject && (
        <div className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#11141c] border border-[#2b3347] rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 relative text-xs max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md font-mono text-[10px] text-[#f05a36] font-bold">
                PROJECT #{selectedProject.number}
              </div>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] text-[#f05a36] uppercase font-bold tracking-widest block">
                {selectedProject.category} • {selectedProject.year}
              </span>
              <h3 className="font-sans text-2xl font-bold text-white">
                {selectedProject.title}
              </h3>
              <span className="font-mono text-xs text-gray-400 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-[#f05a36]" />
                <span>{selectedProject.location}</span>
              </span>
            </div>

            <p className="text-xs text-gray-300 font-sans leading-relaxed text-justify">
              {selectedProject.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 border-t border-white/10 font-mono text-[10px]">
              <div className="p-2.5 rounded bg-white/5 border border-white/10">
                <span className="text-gray-500 block">TOTAL AREA:</span>
                <span className="text-white font-bold">{selectedProject.area}</span>
              </div>
              <div className="p-2.5 rounded bg-white/5 border border-white/10">
                <span className="text-gray-500 block">STRUCTURAL HEIGHT:</span>
                <span className="text-white font-bold">{selectedProject.height}</span>
              </div>
              <div className="p-2.5 rounded bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                <span className="text-gray-500 block">LEAD ARCHITECT:</span>
                <span className="text-[#f05a36] font-bold">{selectedProject.leadArchitect}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
