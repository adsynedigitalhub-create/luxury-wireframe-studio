import React, { useState } from 'react';
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
  FileText
} from 'lucide-react';
import {
  ARCHITECTURE_PROJECTS,
  ARCHITECTURE_CATEGORIES,
  GLOBAL_STUDIOS
} from '../../data/architectureProjects';

export const ArchitectureMonographSite = ({ onBackToCanvas, onOpenCodeModal }) => {
  // Navigation & Filter State
  const [activeCategory, setActiveCategory] = useState('all');
  const [projectsList, setProjectsList] = useState(ARCHITECTURE_PROJECTS);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeStudioPin, setActiveStudioPin] = useState(GLOBAL_STUDIOS[0]);

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
    // Reset form
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

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#1f242e] font-sans selection:bg-[#f05a36] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. MODERN ARCHITECTURAL NAVIGATION HEADER
          (4 Clean Nav Links + Animated Free Call CTA)
      ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Mark (Exact Magazine Brand Block) */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-[#1f242e] rounded-sm flex items-center justify-center shadow-md group-hover:bg-[#f05a36] transition-colors duration-300">
              <span className="text-white font-mono font-bold text-base tracking-tighter">
                ∞
              </span>
            </div>
            <div>
              <span className="font-serif text-sm font-bold tracking-[0.22em] text-[#1f242e] uppercase block leading-none">
                ATELIER VANGUARD
              </span>
              <span className="font-mono text-[9px] text-[#f05a36] tracking-[0.3em] uppercase block mt-1">
                ARCHITECTURE MONOGRAPH
              </span>
            </div>
          </a>

          {/* 4 Clean Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#portfolio"
              className="text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-[#f05a36] transition-colors relative py-1 group"
            >
              <span>01. Works</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f05a36] group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#about"
              className="text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-[#f05a36] transition-colors relative py-1 group"
            >
              <span>02. About</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f05a36] group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#studios"
              className="text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-[#f05a36] transition-colors relative py-1 group"
            >
              <span>03. Studios</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f05a36] group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#inquiry"
              className="text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-[#f05a36] transition-colors relative py-1 group"
            >
              <span>04. Inquiry</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f05a36] group-hover:w-full transition-all duration-300" />
            </a>
          </nav>

          {/* Header Actions: Animated Consultation Call Button */}
          <div className="flex items-center space-x-3">
            {/* Animated Call/Service Button with Framer Motion */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsConsultationModalOpen(true)}
              className="relative group overflow-hidden px-4 sm:px-5 py-2.5 rounded-sm bg-[#f05a36] text-white font-semibold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center space-x-2 border border-[#f05a36]"
            >
              {/* Soft breathing pulse glow */}
              <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <Phone className="w-3.5 h-3.5 animate-bounce text-white" />
              <span className="relative z-10">Book Free Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Studio Canvas Back Link if provided */}
            {onBackToCanvas && (
              <button
                onClick={onBackToCanvas}
                className="hidden lg:flex items-center space-x-1.5 px-3 py-2 bg-[#1f242e] hover:bg-[#2c3240] text-gray-200 hover:text-white rounded-sm text-xs font-mono transition"
                title="Return to Freeform Studio Canvas"
              >
                <span>🎨</span>
                <span>Studio</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION: 1:1 EXACT MAGAZINE COVER MATCH
          (Page 1 of Uploaded Magazine: 32% / 68% Split Grid)
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-white rounded-sm shadow-xl border border-[#e5e7eb] overflow-hidden p-6 md:p-10 lg:p-14 relative">
          {/* Top Magazine Masthead */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-[#f05a36] pb-4 mb-8">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="w-14 h-14 bg-[#1f242e] text-white flex items-center justify-center font-mono font-bold text-2xl shadow">
                ∞
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gray-400 block">
                  ATELIER MONOGRAPH
                </span>
                <span className="font-serif text-xs font-bold text-[#1f242e] uppercase tracking-[0.2em]">
                  ARCHITECTURAL VOLUME
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-sans text-xs md:text-sm font-bold text-[#f05a36] tracking-[0.35em] uppercase block">
                CONTEMPORARY ARCHITECTURE
              </span>
              <div className="relative inline-block mt-1">
                <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1f242e] tracking-[0.14em] uppercase leading-none">
                  M A G A Z I N E
                </h1>
                {/* Exact Orange Block Bar Underneath Title */}
                <div className="h-2 bg-[#f05a36] w-full mt-1.5" />
              </div>
            </div>
          </div>

          {/* Exact Asymmetrical 32% / 68% Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* ── LEFT COLUMN (32% width: 4 columns out of 12) ── */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              {/* Block 1 */}
              <div className="space-y-2.5 pb-5 border-b border-gray-200">
                <h3 className="font-sans text-base font-extrabold text-[#1f242e] tracking-tight uppercase leading-snug">
                  BACK TO THE CONVENTIONAL BUILDING PROCESS?{' '}
                  <span className="text-[#f05a36]">NO!</span>
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-sans text-justify">
                  Architecture in 2026 is no longer defined by inert mass. We synthesize computational parametric engineering with organic volcanic basalt, glass, and sustainable timber to pioneer structures that actively breathe.
                </p>
              </div>

              {/* Block 2 */}
              <div className="space-y-2.5 pb-5 border-b border-gray-200">
                <h3 className="font-sans text-base font-extrabold text-[#1f242e] tracking-tight uppercase leading-snug">
                  SEE HOW MONUMENTAL SPACES BREATHE WITH{' '}
                  <span className="text-[#f05a36]">LIGHT & SHADOW!</span>
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-sans text-justify">
                  Through precision solar orientation and structural cantilever loads, our buildings eliminate artificial reliance, framing panoramic horizons while generating clean geothermal equilibrium.
                </p>
              </div>

              {/* Block 3: Solid Orange Terracotta Manifesto Box (Exact Match) */}
              <div className="bg-[#f05a36] text-white p-6 rounded-sm shadow-md space-y-3">
                <h4 className="font-sans text-sm font-extrabold uppercase tracking-wide leading-snug">
                  THE ATELIER WHICH TURNS RAW CONCRETE INTO TIMELESS MONUMENTS!
                </h4>
                <p className="text-[11px] text-white/90 leading-relaxed font-sans">
                  From Zurich alpine observation cantilevers to Manhattan diagrid supertowers, our architectural monograph redefines global urban skylines.
                </p>
                <a
                  href="#inquiry"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-white uppercase tracking-wider underline hover:text-black transition-colors pt-1"
                >
                  <span>Commission a Monograph Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* ── RIGHT COLUMN (68% width: 8 columns out of 12) ── */}
            <div className="lg:col-span-8 flex flex-col relative">
              {/* Inset Orange Issue Tag */}
              <div className="absolute top-4 right-4 z-20 bg-[#f05a36] text-white font-mono text-xs font-bold px-3 py-1 uppercase tracking-widest shadow-md">
                ISSUE #27
              </div>

              {/* Cover Hero Photo: Lead Principal Architect */}
              <div className="relative w-full h-[420px] sm:h-[500px] md:h-[560px] overflow-hidden rounded-sm shadow-lg border border-gray-200 bg-[#12141a]">
                <img
                  src="/images/architecture/architect_principal.jpg"
                  alt="Henrik Vane — Lead Principal Architect"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-16 left-6 z-20 text-white">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#f05a36] font-bold bg-black/60 px-2 py-0.5 rounded">
                    LEAD PRINCIPAL ARCHITECT
                  </span>
                  <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                    Henrik Vane, FAIA
                  </h2>
                  <p className="text-xs text-gray-300 font-sans">
                    Founding Partner & Master of Structural Cantilevers
                  </p>
                </div>
              </div>

              {/* Exact Dark Charcoal Contact Bar at Bottom */}
              <div className="bg-[#1f242e] text-white p-4 sm:p-5 rounded-b-sm border-t-2 border-[#f05a36] grid grid-cols-2 sm:grid-cols-4 gap-4 mt-0 shadow-lg">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#f05a36] flex items-center justify-center text-white shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 block">
                      Headquarters
                    </span>
                    <span className="text-[11px] font-sans font-semibold text-white truncate block">
                      Gotthardstr. 28, Zurich
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#f05a36] flex items-center justify-center text-white shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 block">
                      Direct Line
                    </span>
                    <span className="text-[11px] font-sans font-semibold text-white truncate block">
                      +41 44 288 9000
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#f05a36] flex items-center justify-center text-white shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 block">
                      Client Inquiries
                    </span>
                    <span className="text-[11px] font-sans font-semibold text-white truncate block">
                      atelier@vanguard.ch
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#f05a36] flex items-center justify-center text-white shrink-0">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 block">
                      Monograph
                    </span>
                    <span className="text-[11px] font-sans font-semibold text-white truncate block">
                      vanguard-atelier.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. STRUCTURAL ENGINEERING & CANTILEVERS (Spread 1 Match)
          (Suspension Bridge & Concrete Pavilion Showcase)
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-sm shadow-xl border border-[#e5e7eb] p-6 md:p-10 lg:p-14 space-y-8">
          {/* Section Eyebrow */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4">
            <div>
              <span className="font-mono text-xs text-[#f05a36] tracking-[0.25em] uppercase font-bold">
                SPREAD 01 // STRUCTURAL HARMONY
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1f242e] uppercase tracking-tight mt-1">
                CANTILEVER BRIDGES & GEOTECHNICAL MONUMENTS
              </h2>
            </div>
            <span className="font-mono text-xs text-gray-400 mt-2 sm:mt-0">
              PAGES 02 — 03
            </span>
          </div>

          {/* Full-Width Suspension Bridge Photo with Orange Banner Overlay */}
          <div className="relative w-full h-[360px] sm:h-[460px] md:h-[540px] rounded-sm overflow-hidden shadow-lg border border-gray-200">
            <img
              src="/images/architecture/cantilever_bridge.jpg"
              alt="Fjord Suspension Bridge and Brutalist Cantilever Pavilion"
              className="w-full h-full object-cover"
            />

            {/* Horizontal Orange Overlay Banner (Exact Magazine Spread Match) */}
            <div className="absolute bottom-6 left-0 right-0 md:right-auto md:max-w-xl bg-[#f05a36] text-white p-4 sm:p-6 shadow-2xl">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/80 block">
                CIVIC INFRASTRUCTURE MONOGRAPH
              </span>
              <h3 className="font-sans text-base sm:text-lg font-bold uppercase tracking-wide leading-tight mt-1">
                ENGINEERING BRIDGES BETWEEN UNTAMED NATURE AND HUMAN HABITATION
              </h3>
              <p className="text-xs text-white/90 font-sans mt-2 leading-relaxed">
                Hardanger Fjord, Norway — 45-meter brutalist cantilevered concrete viewing deck defying seismic and glacial wind vectors without external bracing.
              </p>
            </div>
          </div>

          {/* 3-Column Editorial Text Block */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs text-gray-600 leading-relaxed font-sans text-justify">
            <div>
              <h4 className="font-sans text-sm font-bold text-[#1f242e] uppercase mb-2">
                01 / Structural Integrity
              </h4>
              <p>
                Every cable tension and compression vault is calculated down to the millimeter using high-performance finite element simulation. Our bridges do not merely span physical geography; they celebrate the tectonic weight of raw materials.
              </p>
            </div>
            <div>
              <h4 className="font-sans text-sm font-bold text-[#1f242e] uppercase mb-2">
                02 / Carbon-Neutral Concrete
              </h4>
              <p>
                By infusing recycled pozzolanic micro-silica into our structural UHPC recipes, our concrete structures sequester carbon over their 120-year lifespan while offering unprecedented tensile flexural capacity.
              </p>
            </div>
            <div>
              <h4 className="font-sans text-sm font-bold text-[#1f242e] uppercase mb-2">
                03 / Environmental Resilience
              </h4>
              <p>
                Designed to withstand alpine seismic shockwaves and hurricane gale winds, our cantilevered geometries distribute dynamic loads evenly into bedrock foundations with absolute structural poise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. ABOUT LEADERSHIP: "YOU ARE WELCOME!" (Spread 2 Match)
          (With DIFFERENT Senior Partner Architect as requested!)
      ───────────────────────────────────────────────────────────── */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-sm shadow-xl border border-[#e5e7eb] p-6 md:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Different Male Architect Portrait (Late 30s Design Director) */}
            <div className="lg:col-span-5 relative">
              <div className="w-full h-[460px] sm:h-[540px] rounded-sm overflow-hidden shadow-lg border border-gray-200 bg-[#12141a]">
                <img
                  src="/images/architecture/architect_partner.jpg"
                  alt="Alexander Van Der Rohe — Design Director"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Quote Card */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 max-w-xs bg-[#1f242e] text-white p-4 rounded-sm border-l-4 border-[#f05a36] shadow-xl">
                <p className="font-serif italic text-xs leading-relaxed text-gray-200">
                  "Form is never arbitrary. In every blueprint we draft, structure itself is the truest ornament."
                </p>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#f05a36] font-bold block mt-2">
                  — Alexander Van Der Rohe
                </span>
              </div>
            </div>

            {/* Right: "YOU ARE WELCOME!" & Monograph Bio */}
            <div className="lg:col-span-7 space-y-6 pt-6 lg:pt-0">
              <div>
                <span className="font-mono text-xs text-[#f05a36] tracking-[0.25em] uppercase font-bold">
                  SPREAD 02 // LEADERSHIP
                </span>
                <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1f242e] tracking-tight uppercase mt-1">
                  YOU ARE <span className="text-[#f05a36]">WELCOME!</span>
                </h2>
              </div>

              {/* Circular Avatar Badge & Title */}
              <div className="flex items-center space-x-4 border-y border-gray-200 py-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#f05a36] shadow-md shrink-0">
                  <img
                    src="/images/architecture/architect_partner.jpg"
                    alt="Alexander Van Der Rohe"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-sans text-base font-bold text-[#1f242e]">
                    Alexander Van Der Rohe
                  </h3>
                  <span className="font-mono text-xs text-[#f05a36] font-semibold">
                    Co-Founder & Design Director, M.Arch ETH Zurich
                  </span>
                </div>
              </div>

              {/* Editorial Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-gray-600 leading-relaxed font-sans text-justify">
                <p>
                  Atelier Vanguard was founded on the radical premise that contemporary architecture should stand as permanent testament to human purpose. While commercial trends chase ephemeral aesthetics, our studio focuses on the permanence of stone, the poetry of cast shadow, and structural truth.
                </p>
                <p>
                  Every commission entrusted to our atelier undergoes exhaustive topological optimization. We operate across Zurich, Milano, Tokyo, and New York, ensuring our clients receive the focused precision of an artisan studio paired with the global computational prowess of modern engineering.
                </p>
              </div>

              {/* Hand-Signed Cursive Signature */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <div>
                  <span className="font-serif italic text-2xl sm:text-3xl text-[#1f242e] tracking-wider block">
                    Alexander Van Der Rohe
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 block mt-0.5">
                    Principal Partner & Director of Design
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="px-4 py-2 bg-[#f05a36] text-white font-semibold text-xs tracking-wider uppercase rounded-sm shadow-md hover:bg-black transition-colors"
                >
                  Schedule Private Interview
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. ARCHITECTURE PORTFOLIO & SELECTED WORKS
          (Spread 3 & 6: Filterable Grid + Add Custom Project)
      ───────────────────────────────────────────────────────────── */}
      <section id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-sm shadow-xl border border-[#e5e7eb] p-6 md:p-10 lg:p-14 space-y-8">
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-6 gap-4">
            <div>
              <span className="font-mono text-xs text-[#f05a36] tracking-[0.25em] uppercase font-bold">
                PORTFOLIO MONOGRAPHS // 2024 — 2026
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1f242e] uppercase tracking-tight mt-1">
                SELECTED BUILT ARCHITECTURAL WORKS
              </h2>
            </div>

            {/* Dynamic "+ Add Project" Button for Client */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsAddProjectModalOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#1f242e] hover:bg-[#f05a36] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition shadow-md self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Project</span>
            </motion.button>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 custom-scrollbar">
            {ARCHITECTURE_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-sm text-xs font-sans font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
                  activeCategory === cat.key
                    ? 'bg-[#f05a36] text-white shadow-md'
                    : 'bg-[#f4f5f7] hover:bg-gray-200 text-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Featured Monolith Skyscraper Showcase (Spread 6 Match) */}
          <div className="relative w-full rounded-sm overflow-hidden border border-gray-200 shadow-xl bg-[#12141a]">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Photo */}
              <div className="lg:col-span-7 h-[380px] sm:h-[480px] md:h-[560px] relative overflow-hidden">
                <img
                  src="/images/architecture/skyscraper_landmark.jpg"
                  alt="The Monolith Titan Tower"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#f05a36] text-white font-mono text-[10px] uppercase tracking-widest font-bold px-3 py-1 shadow">
                  FEATURED LANDMARK TOWER
                </div>
              </div>

              {/* Architectural Monograph Specs Column */}
              <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-white">
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-3">
                    <span className="font-mono text-xs text-[#f05a36] font-bold">
                      KEY MONOGRAPH 01
                    </span>
                    <h3 className="font-sans text-2xl font-extrabold text-[#1f242e] uppercase tracking-tight mt-1">
                      THE MONOLITH TITAN TOWER
                    </h3>
                    <p className="font-mono text-xs text-gray-500 mt-0.5">
                      Zurich, Switzerland • 2026
                    </p>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed font-sans text-justify">
                    A monumental 340-meter commercial tower sculpted with aerodynamic faceted diagrid cantilevers. The triple-glazed titanium mullions deflect alpine turbulence while reducing embodied structural steel by 34%.
                  </p>

                  {/* Specs Table */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-200 font-mono text-[11px]">
                    <div>
                      <span className="text-gray-400 block">HEIGHT:</span>
                      <span className="font-bold text-[#1f242e]">340 m / 78 Stories</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">GROSS AREA:</span>
                      <span className="font-bold text-[#1f242e]">85,400 m²</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">PRIMARY STRUCT:</span>
                      <span className="font-bold text-[#1f242e]">Titanium Diagrid</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">LEED CERT:</span>
                      <span className="font-bold text-[#f05a36]">Platinum Plus</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setSelectedProject(ARCHITECTURE_PROJECTS[0])}
                    className="w-full py-3 bg-[#1f242e] hover:bg-[#f05a36] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition flex items-center justify-center space-x-2 shadow"
                  >
                    <span>View Architectural Blueprints</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedProject(project)}
                className="group bg-white rounded-sm border border-[#e5e7eb] hover:border-[#f05a36] overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col cursor-pointer"
              >
                {/* Image */}
                <div className="h-60 relative overflow-hidden bg-[#151821]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#1f242e] text-white font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 shadow">
                    {project.number}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#f05a36] text-white font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 shadow">
                    {project.year}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <span className="font-mono text-[10px] text-[#f05a36] tracking-wider uppercase font-semibold block">
                      {project.category}
                    </span>
                    <h4 className="font-sans text-base font-bold text-[#1f242e] group-hover:text-[#f05a36] transition-colors tracking-tight mt-1">
                      {project.title}
                    </h4>
                    <p className="font-mono text-[11px] text-gray-500 mt-0.5 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>{project.location}</span>
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-xs font-semibold text-[#1f242e] group-hover:text-[#f05a36]">
                    <span>Explore Monograph</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. STUDIO BIM PROCESS & PIPELINE (Spread 4 & 5 Match)
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-sm shadow-xl border border-[#e5e7eb] p-6 md:p-10 lg:p-14 space-y-8">
          <div>
            <span className="font-mono text-xs text-[#f05a36] tracking-[0.25em] uppercase font-bold">
              SPREAD 04 // METHODOLOGY
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1f242e] uppercase tracking-tight mt-1">
              COMPUTATIONAL BIM ARCHITECTURAL PIPELINE
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#f7f8fa] border-t-4 border-[#f05a36] rounded-sm space-y-3">
              <span className="font-mono text-xl font-bold text-[#f05a36]">01</span>
              <h3 className="font-sans text-base font-bold text-[#1f242e] uppercase">
                Site Topology & Solar Pathing
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                Laser LiDAR mapping and environmental micro-climate analysis to establish optimal structural orientation.
              </p>
            </div>

            <div className="p-6 bg-[#f7f8fa] border-t-4 border-[#1f242e] rounded-sm space-y-3">
              <span className="font-mono text-xl font-bold text-[#1f242e]">02</span>
              <h3 className="font-sans text-base font-bold text-[#1f242e] uppercase">
                Parametric 3D Form-Finding
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                Algorithmic geometry generation exploring structural cantilevers, daylight infiltration, and wind dissipation.
              </p>
            </div>

            <div className="p-6 bg-[#f7f8fa] border-t-4 border-[#f05a36] rounded-sm space-y-3">
              <span className="font-mono text-xl font-bold text-[#f05a36]">03</span>
              <h3 className="font-sans text-base font-bold text-[#1f242e] uppercase">
                Structural BIM Coordination
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                LOD-400 full digital twin coordination between civil engineers, mechanical systems, and material suppliers.
              </p>
            </div>

            <div className="p-6 bg-[#f7f8fa] border-t-4 border-[#1f242e] rounded-sm space-y-3">
              <span className="font-mono text-xl font-bold text-[#1f242e]">04</span>
              <h3 className="font-sans text-base font-bold text-[#1f242e] uppercase">
                Tectonic Execution & Delivery
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                On-site artisan supervision ensuring uncompromised precision in concrete casting, stone masonry, and glass tolerances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. INTERACTIVE GLOBAL STUDIOS & PROJECTS MAP
      ───────────────────────────────────────────────────────────── */}
      <section id="studios" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-sm shadow-xl border border-[#e5e7eb] p-6 md:p-10 lg:p-14 space-y-8">
          <div>
            <span className="font-mono text-xs text-[#f05a36] tracking-[0.25em] uppercase font-bold">
              GLOBAL PRESENCE // 4 CONTINENTS
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1f242e] uppercase tracking-tight mt-1">
              ATELIER VANGUARD STUDIOS & MONUMENT LOCATIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive World Blueprint Canvas */}
            <div className="lg:col-span-8 bg-[#181c24] rounded-sm p-6 relative h-[380px] sm:h-[460px] overflow-hidden border border-gray-300 shadow-inner flex flex-col justify-between">
              {/* Blueprint Grid Lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <span className="font-mono text-[10px] text-[#f05a36] tracking-widest uppercase font-bold bg-black/60 px-2.5 py-1 rounded">
                  INTERACTIVE STUDIO LOCATIONS
                </span>
                <span className="font-mono text-[10px] text-gray-400">
                  Click any studio pin below to inspect
                </span>
              </div>

              {/* Simplified Geometric Continents Silhouette Graphic */}
              <div className="relative w-full h-full flex items-center justify-center my-auto">
                <svg viewBox="0 0 1000 500" className="w-full h-full opacity-20 pointer-events-none stroke-[#f05a36] fill-none">
                  <path d="M150,120 Q200,80 280,110 T350,180 T250,300 T180,240 Z" strokeWidth="1" />
                  <path d="M220,320 Q260,340 280,420 T240,480 T190,380 Z" strokeWidth="1" />
                  <path d="M480,100 Q560,70 650,120 T720,200 T600,240 T500,160 Z" strokeWidth="1" />
                  <path d="M510,240 Q580,230 620,320 T560,450 T480,340 Z" strokeWidth="1" />
                  <path d="M680,110 Q780,80 880,130 T920,220 T820,280 T700,190 Z" strokeWidth="1" />
                  <path d="M780,330 Q860,320 890,380 T820,440 T760,380 Z" strokeWidth="1" />
                </svg>

                {/* Studio Pins */}
                {GLOBAL_STUDIOS.map((studio) => {
                  const isSelected = activeStudioPin.id === studio.id;
                  return (
                    <button
                      key={studio.id}
                      onClick={() => setActiveStudioPin(studio)}
                      style={{ left: studio.coords.x, top: studio.coords.y }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                    >
                      <div className="relative flex items-center justify-center">
                        <span className={`w-4 h-4 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#f05a36] ring-4 ring-[#f05a36]/40 scale-125'
                            : 'bg-white hover:bg-[#f05a36]'
                        }`} />
                        <span className="absolute -bottom-6 font-mono text-[10px] font-bold text-white whitespace-nowrap bg-black/80 px-2 py-0.5 rounded shadow">
                          {studio.city}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Coordinates Footer */}
              <div className="relative z-10 flex items-center justify-between text-gray-400 font-mono text-[10px]">
                <span>LAT / LNG GEODETIC DATUM WGS-84</span>
                <span className="text-[#f05a36] font-bold">ACTIVE: {activeStudioPin.city.toUpperCase()} ATELIER</span>
              </div>
            </div>

            {/* Active Studio Details Card */}
            <div className="lg:col-span-4 bg-[#f8f9fa] border-2 border-[#1f242e] p-6 rounded-sm space-y-4">
              <div className="border-b border-gray-300 pb-3">
                <span className="font-mono text-xs text-[#f05a36] font-bold">
                  STUDIO MONOGRAPH
                </span>
                <h3 className="font-sans text-2xl font-extrabold text-[#1f242e] uppercase mt-0.5">
                  {activeStudioPin.city}, {activeStudioPin.country}
                </h3>
                <span className="text-xs text-gray-500 font-medium block">
                  {activeStudioPin.role}
                </span>
              </div>

              <div className="space-y-3 font-sans text-xs text-gray-700">
                <div>
                  <span className="font-mono text-[10px] uppercase text-gray-400 block">STUDIO ADDRESS:</span>
                  <span className="font-medium text-[#1f242e]">{activeStudioPin.address}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-gray-400 block">DIRECT PHONE:</span>
                  <span className="font-medium text-[#1f242e]">{activeStudioPin.phone}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-gray-400 block">DIRECT INQUIRIES:</span>
                  <span className="font-medium text-[#f05a36]">{activeStudioPin.email}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-gray-400 block">ICONIC BUILT PROJECT:</span>
                  <span className="font-medium text-[#1f242e] font-bold">{activeStudioPin.iconicProject}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="w-full py-2.5 bg-[#f05a36] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm transition shadow flex items-center justify-center space-x-1.5"
                >
                  <span>Connect with {activeStudioPin.city} Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. CLIENT COMMISSION & CONSULTATION BOOKING FORM
      ───────────────────────────────────────────────────────────── */}
      <section id="inquiry" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-12">
        <div className="bg-white rounded-sm shadow-xl border-2 border-[#f05a36] p-6 md:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Form Left Description */}
            <div className="lg:col-span-5 space-y-5">
              <span className="font-mono text-xs text-[#f05a36] tracking-[0.25em] uppercase font-bold">
                COMMISSION AN ARCHITECTURAL MONOGRAPH
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#1f242e] uppercase tracking-tight">
                LET US ENGINEER YOUR NEXT LANDMARK
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed font-sans text-justify">
                Whether you are envisioning a private cliffside residence, an institutional museum, or an urban commercial supertower, our partners review every architectural commission with personalized rigor.
              </p>

              <div className="p-4 bg-[#f8f9fa] border-l-4 border-[#f05a36] rounded-sm space-y-2 text-xs">
                <span className="font-bold text-[#1f242e] block">Our Client Engagement Commitment:</span>
                <ul className="space-y-1 text-gray-600 list-disc list-inside font-sans">
                  <li>Direct partner consultation within 48 business hours</li>
                  <li>Complimentary geodetic & zoning pre-feasibility study</li>
                  <li>LOD-400 parametric BIM budget forecasting</li>
                </ul>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="lg:col-span-7 bg-[#f8f9fa] p-6 sm:p-8 rounded-sm border border-gray-200 shadow-sm">
              {formSubmitted ? (
                <div className="p-8 text-center space-y-3 bg-white rounded-sm border border-emerald-500/40 shadow">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h3 className="font-sans text-xl font-bold text-[#1f242e]">
                    Commission Brief Transmitted
                  </h3>
                  <p className="text-xs text-gray-600 max-w-md mx-auto font-sans leading-relaxed">
                    Thank you, <span className="font-bold">{formName || 'Distinguished Client'}</span>. Henrik Vane and Alexander Van Der Rohe have received your architectural project brief. Our partner office will coordinate your consultation session.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-2 px-4 py-2 bg-[#1f242e] text-white text-xs font-bold uppercase tracking-wider rounded-sm"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-4 text-xs"
                >
                  {/* Typology */}
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold block mb-1.5">
                      PROJECT TYPOLOGY:
                    </label>
                    <select
                      value={formTypology}
                      onChange={(e) => setFormTypology(e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-300 rounded-sm font-sans text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                    >
                      <option>Luxury Residential Villa / Estate</option>
                      <option>Commercial Tower / Mixed-Use</option>
                      <option>Cultural Museum / Pavilion</option>
                      <option>Infrastructure Bridge & Civic Works</option>
                      <option>Urban Masterplan & District Design</option>
                    </select>
                  </div>

                  {/* Budget Scope */}
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold block mb-1.5">
                      ESTIMATED PROJECT BUDGET:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['$500K – $2M', '$2M – $10M', '$10M+ Enterprise'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormBudget(b)}
                          className={`p-2 rounded-sm border text-center font-mono text-[11px] font-semibold transition ${
                            formBudget === b
                              ? 'bg-[#f05a36] text-white border-[#f05a36]'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold block mb-1.5">
                        YOUR NAME / ORGANIZATION:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lorde Harrington"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-sm font-sans text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold block mb-1.5">
                        PROJECT SITE LOCATION:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="City, Country (e.g. Geneva, Switzerland)"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-sm font-sans text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold block mb-1.5">
                        CORPORATE EMAIL:
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="client@domain.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-sm font-sans text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold block mb-1.5">
                        PHONE NUMBER:
                      </label>
                      <input
                        type="tel"
                        placeholder="+41 ..."
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-sm font-sans text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                      />
                    </div>
                  </div>

                  {/* Brief */}
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold block mb-1.5">
                      PROJECT BRIEF & VISION:
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Describe your architectural ambition, timeline, and site constraints..."
                      value={formBrief}
                      onChange={(e) => setFormBrief(e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-300 rounded-sm font-sans text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#f05a36] hover:bg-black text-white font-bold text-xs uppercase tracking-widest rounded-sm transition shadow-lg flex items-center justify-center space-x-2"
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
          9. EDITORIAL MONOGRAPH FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#1f242e] text-white border-t-4 border-[#f05a36] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <span className="text-xl font-mono text-[#f05a36]">∞</span>
              <span className="font-serif text-sm font-bold tracking-widest uppercase">
                ATELIER VANGUARD
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed font-sans">
              Contemporary architectural monographs and structural masterworks. Built to endure across centuries.
            </p>
            <span className="font-mono text-[10px] text-[#f05a36] block">
              ZURICH • MILANO • TOKYO • NEW YORK
            </span>
          </div>

          {/* Col 2 */}
          <div className="space-y-2 font-sans">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#f05a36] font-bold block mb-2">
              EDITORIAL NAVIGATION
            </span>
            <ul className="space-y-1.5 text-gray-300">
              <li><a href="#portfolio" className="hover:text-[#f05a36] transition">Selected Works</a></li>
              <li><a href="#about" className="hover:text-[#f05a36] transition">About Leadership</a></li>
              <li><a href="#studios" className="hover:text-[#f05a36] transition">Global Studios & Map</a></li>
              <li><a href="#inquiry" className="hover:text-[#f05a36] transition">Commission Brief</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2 font-sans">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#f05a36] font-bold block mb-2">
              MONOGRAPH PUBLICATIONS
            </span>
            <ul className="space-y-1.5 text-gray-300 font-mono text-[11px]">
              <li>Volume IV — Cantilevers in Concrete (2026)</li>
              <li>Volume III — Diagrid Towers of Europe (2025)</li>
              <li>Volume II — Timber Sequestration (2024)</li>
              <li>Volume I — Tectonic Truth (2023)</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3 font-sans">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#f05a36] font-bold block mb-1">
              ATELIER NEWSLETTER
            </span>
            <p className="text-gray-400 text-xs leading-relaxed">
              Receive our annual bound architectural monograph and private project releases.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="architect@domain.com"
                className="w-full p-2 bg-[#12141a] border border-gray-700 text-xs text-white rounded-l-sm focus:outline-none focus:border-[#f05a36]"
              />
              <button className="px-3 bg-[#f05a36] text-white text-xs font-bold rounded-r-sm hover:bg-white hover:text-black transition">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-gray-500 font-mono text-[10px]">
          <span>© 2026 ATELIER VANGUARD ARCHITECTS. ALL RIGHTS RESERVED.</span>
          <span>FEATURING 1:1 CORPORATE BUSINESS MAGAZINE EDITORIAL LAYOUT</span>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          MODAL 1: BOOK FREE STRATEGY CALL / CONSULTATION
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isConsultationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-white rounded-sm shadow-2xl border-t-4 border-[#f05a36] p-6 sm:p-8 relative overflow-hidden"
            >
              <button
                onClick={() => {
                  setIsConsultationModalOpen(false);
                  setConsultationSubmitted(false);
                }}
                className="absolute top-4 right-4 p-1.5 rounded text-gray-400 hover:text-black hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {consultationSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h3 className="font-sans text-xl font-bold text-[#1f242e]">
                    Private Strategy Call Reserved
                  </h3>
                  <p className="text-xs text-gray-600 font-sans leading-relaxed max-w-sm mx-auto">
                    Our executive partner concierge will email you private calendar invites and architectural pre-briefing materials.
                  </p>
                  <button
                    onClick={() => {
                      setIsConsultationModalOpen(false);
                      setConsultationSubmitted(false);
                    }}
                    className="mt-3 px-5 py-2 bg-[#f05a36] text-white text-xs font-bold uppercase rounded-sm"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-[10px] text-[#f05a36] uppercase font-bold tracking-widest">
                      EXCLUSIVE CLIENT ENGAGEMENT
                    </span>
                    <h3 className="font-sans text-xl font-extrabold text-[#1f242e] uppercase mt-0.5">
                      Book Private Strategy Consultation
                    </h3>
                    <p className="text-xs text-gray-500 font-sans">
                      30-minute direct video consultation with a Senior Atelier Partner.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setConsultationSubmitted(true);
                    }}
                    className="space-y-3 text-xs font-sans"
                  >
                    <div>
                      <label className="font-mono text-[10px] uppercase text-gray-500 font-bold block mb-1">
                        Preferred Consultation Date:
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase text-gray-500 font-bold block mb-1">
                        Your Full Name:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Lord / Director / Developer Name"
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase text-gray-500 font-bold block mb-1">
                        Direct Email / Phone:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="client@holding.com / +41 ..."
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase text-gray-500 font-bold block mb-1">
                        Primary Topic / Site Interest:
                      </label>
                      <textarea
                        rows="2"
                        placeholder="e.g. Master planning an alpine wellness resort in Gstaad..."
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#f05a36] hover:bg-black text-white font-bold text-xs uppercase tracking-widest rounded-sm transition shadow-lg mt-2 flex items-center justify-center space-x-2"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Confirm Strategy Session Booking</span>
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          MODAL 2: ADD CUSTOM PROJECT (Client Dynamic Control)
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isAddProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-white rounded-sm shadow-2xl border-t-4 border-[#1f242e] p-6 sm:p-8 relative overflow-hidden"
            >
              <button
                onClick={() => setIsAddProjectModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded text-gray-400 hover:text-black hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div>
                  <span className="font-mono text-[10px] text-[#f05a36] uppercase font-bold tracking-widest">
                    CLIENT PORTFOLIO MANAGEMENT
                  </span>
                  <h3 className="font-sans text-xl font-extrabold text-[#1f242e] uppercase mt-0.5">
                    Add New Architectural Project
                  </h3>
                  <p className="text-xs text-gray-500 font-sans">
                    This will insert a live project card directly into your active monograph grid.
                  </p>
                </div>

                <form onSubmit={handleAddNewProject} className="space-y-3 text-xs font-sans">
                  <div>
                    <label className="font-mono text-[10px] uppercase text-gray-500 font-bold block mb-1">
                      Project Title:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alpine Cantilever Villa 09"
                      value={newProjTitle}
                      onChange={(e) => setNewProjTitle(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono text-[10px] uppercase text-gray-500 font-bold block mb-1">
                        Typology Category:
                      </label>
                      <select
                        value={newProjCategory}
                        onChange={(e) => setNewProjCategory(e.target.value)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                      >
                        <option value="residential">Luxury Residential</option>
                        <option value="commercial">Commercial High-Rise</option>
                        <option value="cultural">Cultural & Museum</option>
                        <option value="infrastructure">Infrastructure & Bridge</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase text-gray-500 font-bold block mb-1">
                        Completion Year:
                      </label>
                      <input
                        type="text"
                        value={newProjYear}
                        onChange={(e) => setNewProjYear(e.target.value)}
                        placeholder="2026"
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono text-[10px] uppercase text-gray-500 font-bold block mb-1">
                        Location:
                      </label>
                      <input
                        type="text"
                        placeholder="Zurich, Switzerland"
                        value={newProjLocation}
                        onChange={(e) => setNewProjLocation(e.target.value)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase text-gray-500 font-bold block mb-1">
                        Floor Area (m²):
                      </label>
                      <input
                        type="text"
                        placeholder="4,500 m²"
                        value={newProjArea}
                        onChange={(e) => setNewProjArea(e.target.value)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] uppercase text-gray-500 font-bold block mb-1">
                      Image URL (or Unsplash architectural photo):
                    </label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/... or /images/architecture/..."
                      value={newProjImage}
                      onChange={(e) => setNewProjImage(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] uppercase text-gray-500 font-bold block mb-1">
                      Project Description:
                    </label>
                    <textarea
                      rows="2"
                      placeholder="Structural brief, materials, design ambition..."
                      value={newProjDesc}
                      onChange={(e) => setNewProjDesc(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1f242e] hover:bg-[#f05a36] text-white font-bold text-xs uppercase tracking-widest rounded-sm transition shadow-lg mt-2 flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Project to Monograph Grid</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          MODAL 3: PROJECT DETAIL / BLUEPRINT DRAWER
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-3xl bg-white rounded-sm shadow-2xl border-t-4 border-[#f05a36] p-6 sm:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar relative"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded text-gray-400 hover:text-black hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center space-x-2 font-mono text-xs text-[#f05a36] font-bold">
                    <span>MONOGRAPH #{selectedProject.number}</span>
                    <span>•</span>
                    <span>{selectedProject.category.toUpperCase()}</span>
                  </div>
                  <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1f242e] uppercase mt-1">
                    {selectedProject.title}
                  </h3>
                  <p className="font-mono text-xs text-gray-500 mt-0.5 flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#f05a36]" />
                    <span>{selectedProject.location} • Completed {selectedProject.year}</span>
                  </p>
                </div>

                {/* Hero Image */}
                <div className="h-72 sm:h-96 rounded-sm overflow-hidden shadow-md border border-gray-200 bg-black">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Detailed Specifications Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#f8f9fa] rounded-sm border border-gray-200 font-mono text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px]">GROSS AREA:</span>
                    <span className="font-bold text-[#1f242e]">{selectedProject.area}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">STRUCTURAL ELEVATION:</span>
                    <span className="font-bold text-[#1f242e]">{selectedProject.height}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">COMPLETION:</span>
                    <span className="font-bold text-[#1f242e]">{selectedProject.year}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">LEAD ARCHITECT:</span>
                    <span className="font-bold text-[#f05a36]">{selectedProject.leadArchitect}</span>
                  </div>
                </div>

                {/* Narrative */}
                <div className="space-y-2 text-xs font-sans text-gray-700 leading-relaxed text-justify">
                  <h4 className="font-sans text-sm font-bold text-[#1f242e] uppercase">
                    Architectural Monograph Narrative
                  </h4>
                  <p>{selectedProject.description}</p>
                  <p>
                    Materials: <span className="font-bold text-[#1f242e]">{selectedProject.materials}</span>. Engineered in close collaboration with the local municipality, incorporating regenerative rainwater capture, self-shading double skin facade, and low-embodied carbon construction methods.
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setIsConsultationModalOpen(true);
                    }}
                    className="px-5 py-2.5 bg-[#f05a36] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm transition shadow flex items-center space-x-1.5"
                  >
                    <span>Inquire About Similar Commission</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-600 hover:text-black text-xs font-medium rounded-sm"
                  >
                    Close Monograph
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
