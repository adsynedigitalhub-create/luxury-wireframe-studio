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
import { ThreeArchitecturalVideo } from './ThreeArchitecturalVideo';

export const ArchitectureMonographSite = ({ onBackToCanvas, onOpenCodeModal }) => {
  // Sub-Pages Routing State
  const [currentSubPage, setCurrentSubPage] = useState('home'); // 'home' | 'works' | 'studios' | 'about' | 'inquiry'

  // Portfolio Filters & Project State
  const [activeCategory, setActiveCategory] = useState('all');
  const [projectsList, setProjectsList] = useState(ARCHITECTURE_PROJECTS);
  const [selectedProject, setSelectedProject] = useState(null);

  // Studios State & Live Clocks
  const [activeStudioIndex, setActiveStudioIndex] = useState(0);
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
    <div className="min-h-screen bg-[#fcfbf9] text-[#1f242e] font-sans selection:bg-[#f05a36] selection:text-white relative overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────────────
          1. HAUTE LUXURY EDITORIAL NAVIGATION HEADER
          (Brand Logo + 'ATV' Mark + 5 Sub-Page Tabs + Animated Call Button)
         ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#fcfbf9]/95 backdrop-blur-md border-b border-[#e5e7eb] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Brand with 'ATV' 3-Letter Mark Underneath */}
          <div
            onClick={() => setCurrentSubPage('home')}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="w-11 h-11 bg-[#1f242e] rounded-sm flex items-center justify-center text-white font-bold text-lg shadow-md border border-gray-300 transition group-hover:bg-[#f05a36]">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-serif text-lg font-bold tracking-widest text-[#1f242e] uppercase">
                  ATELIER VANGUARD
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#f05a36]" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-[10px] text-[#f05a36] font-extrabold tracking-[0.45em] uppercase">
                  ATV
                </span>
                <span className="font-mono text-[9px] text-gray-500 tracking-wider">
                  / GLOBAL ARCHITECTURE ATELIER
                </span>
              </div>
            </div>
          </div>

          {/* 5 Dedicated Sub-Page Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-8 font-serif text-xs tracking-widest uppercase font-semibold">
            {[
              { id: 'home', label: '01. Home' },
              { id: 'works', label: '02. Works' },
              { id: 'studios', label: '03. Studios' },
              { id: 'about', label: '04. About' },
              { id: 'inquiry', label: '05. Inquiry' }
            ].map((tab) => {
              const isActive = currentSubPage === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentSubPage(tab.id)}
                  className={`relative py-2 transition ${
                    isActive ? 'text-[#f05a36] font-bold' : 'text-gray-600 hover:text-[#1f242e]'
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f05a36]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTA: Animated Framer Motion Book Free Call Button */}
          <div className="flex items-center space-x-3">
            {onBackToCanvas && (
              <button
                onClick={onBackToCanvas}
                className="hidden lg:flex items-center space-x-1 px-3 py-1.5 rounded-sm border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-mono text-xs transition shadow-sm"
                title="Switch to Studio Canvas"
              >
                <span>🎨 Canvas</span>
              </button>
            )}

            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 4px 20px rgba(240, 90, 54, 0.35)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsConsultationModalOpen(true)}
              className="relative group overflow-hidden px-4 sm:px-5 py-2.5 rounded-sm bg-[#f05a36] text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-md shadow-[#f05a36]/20 border border-[#e04825]"
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
          SUB-PAGE 1: HOME (THE FULL-BLEED UNBOXED 3D VIDEO EXPERIENCE)
         ───────────────────────────────────────────────────────────── */}
      {currentSubPage === 'home' && (
        <main className="relative">
          {/* Full-Bleed 100vw x 100vh Hero: CAD Blueprint ➔ Construction with Crane ➔ Finished Villa */}
          <section className="relative w-full h-[90vh] min-h-[640px] overflow-hidden">
            {/* Automatic Three.js WebGL Video (Zero Buttons, Loops Automatically) */}
            <ThreeArchitecturalVideo />

            {/* Left-Side Floating 3D Chiseled Typography (NO BOXES, DIRECT ON BACKGROUND) */}
            <div className="absolute inset-y-0 left-0 z-30 flex items-center pointer-events-none">
              <div className="max-w-xl pl-6 sm:pl-12 lg:pl-16 space-y-6 pointer-events-auto">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-gray-300 font-mono text-[10px] text-[#f05a36] font-bold tracking-widest uppercase shadow-sm">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>CAD BLUEPRINT • TOWER CRANE • REALITY</span>
                </div>

                <div className="space-y-3">
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-[#1f242e] leading-[1.08] drop-shadow-sm">
                    CONCEIVING <br />
                    <span className="text-[#f05a36]">MONUMENTS</span> <br />
                    FROM DRAFT TO REALITY.
                  </h1>
                  <div className="h-1.5 w-24 bg-[#f05a36] rounded-full" />
                </div>

                <p className="font-sans text-sm sm:text-base text-gray-700 leading-relaxed font-light text-justify max-w-lg">
                  Atelier Vanguard engineers the complete continuum of built architecture: from precision CAD elevations and structural tower crane logistics to finished travertine cantilever residences.
                </p>

                {/* Metric Strip (Floating, No Box) */}
                <div className="grid grid-cols-3 gap-6 pt-2 border-t border-gray-300 font-mono text-xs">
                  <div>
                    <span className="text-2xl lg:text-3xl font-extrabold text-[#f05a36] block font-serif">42+</span>
                    <span className="text-[9px] uppercase tracking-wider text-gray-600 block mt-0.5">BUILT LANDMARKS</span>
                  </div>
                  <div>
                    <span className="text-2xl lg:text-3xl font-extrabold text-[#1f242e] block font-serif">100%</span>
                    <span className="text-[9px] uppercase tracking-wider text-gray-600 block mt-0.5">CARBON NEUTRAL</span>
                  </div>
                  <div>
                    <span className="text-2xl lg:text-3xl font-extrabold text-amber-600 block font-serif">$2.4B</span>
                    <span className="text-[9px] uppercase tracking-wider text-gray-600 block mt-0.5">COMMISSIONS</span>
                  </div>
                </div>

                {/* Floating CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentSubPage('works')}
                    className="px-6 py-3 bg-[#f05a36] hover:bg-[#1f242e] text-white font-bold text-xs uppercase tracking-widest rounded-sm transition shadow-lg shadow-[#f05a36]/25 flex items-center space-x-2"
                  >
                    <span>View Built Works</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentSubPage('studios')}
                    className="px-6 py-3 bg-white/85 hover:bg-white text-[#1f242e] border border-gray-300 font-bold text-xs uppercase tracking-widest rounded-sm transition shadow-sm flex items-center space-x-2 backdrop-blur-md"
                  >
                    <Globe className="w-4 h-4 text-[#f05a36]" />
                    <span>Global Studios</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Architectural Editorial Split (NO BOXES) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Side: Haute Luxury Architecture Narrative */}
              <div className="lg:col-span-5 space-y-6">
                <span className="font-mono text-xs text-[#f05a36] font-bold tracking-[0.25em] uppercase block">
                  THE ATELIER VANGUARD METHODOLOGY
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold uppercase text-[#1f242e] tracking-tight leading-tight">
                  INTEGRATED ENGINEERING: <br />
                  <span className="text-[#f05a36]">FROM SOIL TO SKY.</span>
                </h2>
                <div className="h-1 w-20 bg-[#f05a36]" />

                <p className="text-sm text-gray-600 font-sans leading-relaxed text-justify">
                  Every landmark we construct is treated as an integrated organism. We conduct parametric fluid wind dynamics, structural steel strain optimization, and mass-timber carbon sequestration from day one of drafting.
                </p>

                <div className="space-y-4 pt-2 font-mono text-xs">
                  <div className="border-l-2 border-[#f05a36] pl-4 space-y-1">
                    <span className="text-gray-900 font-bold block">01. COMPUTATIONAL LOD-400 BIM</span>
                    <p className="text-gray-500 font-sans text-xs">Full digital twin modeling before a single shovel enters the construction site.</p>
                  </div>
                  <div className="border-l-2 border-[#f05a36] pl-4 space-y-1">
                    <span className="text-gray-900 font-bold block">02. SEISMIC DIAGRID OPTIMIZATION</span>
                    <p className="text-gray-500 font-sans text-xs">Faceted aerodynamic cantilevers that save 34% structural steel while offering 360-degree vistas.</p>
                  </div>
                  <div className="border-l-2 border-[#f05a36] pl-4 space-y-1">
                    <span className="text-gray-900 font-bold block">03. TIMELESS MATERIAL SELECTION</span>
                    <p className="text-gray-500 font-sans text-xs">Roman travertine, volcanic basalt, carbon-neutral concrete, and acoustic low-iron glass.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setCurrentSubPage('about')}
                    className="text-xs font-mono text-[#f05a36] hover:text-[#1f242e] font-bold flex items-center space-x-1 group"
                  >
                    <span>Read Leadership Manifesto</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </div>

              {/* Right Side: Massive Unboxed Visuals (High-Rise Skyscraper) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-gray-200 shadow-xl group">
                  <img
                    src="/images/architecture/skyscraper_landmark.jpg"
                    alt="Titan Tower Skyscraper"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur-md border border-gray-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono text-[10px] text-[#f05a36] font-bold block">FEATURED SKYSCRAPER</span>
                      <span className="font-serif font-bold text-gray-900">The Monolith Titan Tower — Zurich</span>
                    </div>
                    <span className="font-mono text-[10px] text-gray-600">340m / 78 Stories</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SUB-PAGE 2: WORKS (DEDICATED FULLSCREEN ARCHITECTURAL PORTFOLIO)
         ───────────────────────────────────────────────────────────── */}
      {currentSubPage === 'works' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header & Categories */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-200 pb-6">
            <div>
              <span className="font-mono text-[10px] text-[#f05a36] tracking-[0.3em] uppercase font-bold block mb-1">
                PORTFOLIO MONOGRAPHS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold uppercase text-[#1f242e] tracking-tight">
                SELECTED ARCHITECTURAL WORKS
              </h2>
            </div>

            <button
              onClick={() => setIsAddProjectModalOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-sm bg-[#1f242e] hover:bg-[#f05a36] text-white font-mono text-xs uppercase tracking-wider transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Project</span>
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 font-mono text-xs">
            {ARCHITECTURE_CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-sm whitespace-nowrap transition uppercase tracking-wider font-semibold ${
                  activeCategory === cat.key
                    ? 'bg-[#f05a36] text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:text-black border border-gray-200 hover:border-gray-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Unboxed Fluid Works Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                whileHover={{ y: -6 }}
                onClick={() => setSelectedProject(proj)}
                className="group cursor-pointer space-y-3"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-gray-200 shadow-sm bg-gray-100">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md font-mono text-[10px] text-[#f05a36] font-bold border border-gray-200">
                    #{proj.number}
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-md font-mono text-[9px] text-gray-700 border border-gray-200">
                    {proj.year}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-[#f05a36] uppercase tracking-wider block">
                    {proj.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#1f242e] group-hover:text-[#f05a36] transition">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-sans line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="flex items-center justify-between font-mono text-[10px] text-gray-500 border-t border-gray-200 pt-2">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-[#f05a36]" />
                    <span>{proj.location}</span>
                  </span>
                  <span className="font-semibold text-gray-800">{proj.area}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SUB-PAGE 3: STUDIOS (DEDICATED GLOBAL COMMAND HUB & WORLD CLOCKS)
         ───────────────────────────────────────────────────────────── */}
      {currentSubPage === 'studios' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="font-mono text-xs text-[#f05a36] font-bold tracking-[0.3em] uppercase block">
              GLOBAL COMMAND STUDIOS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold uppercase text-[#1f242e] tracking-tight">
              4 CONTINENTAL ATELIERS & RESEARCH HUBS
            </h2>
            <p className="text-xs text-gray-600 font-sans">
              Operating seamlessly across global time zones from structural engineering headquarters in Zurich to computational robotics in Tokyo.
            </p>
          </div>

          {/* Interactive City Selector with Live World Clocks */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {GLOBAL_STUDIOS.map((studio, idx) => {
              const isActive = activeStudioIndex === idx;
              const liveTime = worldTimes[studio.id] || '12:00:00';
              return (
                <button
                  key={studio.id}
                  onClick={() => setActiveStudioIndex(idx)}
                  className={`p-4 rounded-sm border text-left transition relative ${
                    isActive
                      ? 'bg-white border-[#f05a36] shadow-md'
                      : 'bg-[#f7f7f8] border-gray-200 hover:border-gray-400 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-sm font-bold text-[#1f242e]">
                      {studio.city}
                    </span>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">
                      {studio.flag}
                    </span>
                  </div>

                  <div className="font-mono text-lg font-extrabold text-[#f05a36] tracking-tight flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span>{liveTime}</span>
                  </div>

                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block mt-1">
                    {studio.utcOffset} • {studio.country}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="activeStudioTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-[#f05a36]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Unboxed Studio Detail Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-t border-gray-200 pt-8">
            {/* Studio Photograph */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden border border-gray-200 shadow-md group">
              <img
                src={activeStudio.studioImage}
                alt={activeStudio.city + ' Atelier'}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur-md border border-gray-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#f05a36] font-mono font-bold block text-[10px]">REGIONAL HUB</span>
                  <span className="font-serif font-bold text-gray-900">{activeStudio.city} Atelier</span>
                </div>
                <span className="font-mono text-[10px] text-gray-600">{activeStudio.elevation}</span>
              </div>
            </div>

            {/* Studio Narrative & Contacts */}
            <div className="lg:col-span-6 space-y-5">
              <span className="font-mono text-xs text-[#f05a36] font-bold uppercase tracking-widest block">
                {activeStudio.role}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold uppercase text-[#1f242e]">
                {activeStudio.city} Atelier & Materials Lab
              </h3>
              <p className="text-xs text-gray-600 font-sans leading-relaxed text-justify">
                {activeStudio.focus}. Our {activeStudio.city} office houses computational simulation clusters and rapid prototyping machinery for live architectural testing.
              </p>

              <div className="grid grid-cols-3 gap-3 border-t border-b border-gray-200 py-3 font-mono text-[11px]">
                <div>
                  <span className="text-gray-500 block text-[9px]">COORDINATES:</span>
                  <span className="text-[#1f242e] font-bold">{activeStudio.gpsCoords}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[9px]">TEAM CAPACITY:</span>
                  <span className="text-[#1f242e] font-bold">{activeStudio.teamSize}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[9px]">ACTIVE COMMISSIONS:</span>
                  <span className="text-[#f05a36] font-bold">{activeStudio.activeCommissions} Landmarks</span>
                </div>
              </div>

              <div className="p-4 bg-[#f8f9fa] border-l-4 border-[#f05a36] text-xs space-y-1">
                <span className="font-mono text-[10px] text-gray-500 uppercase block">DIRECTOR IN CHARGE:</span>
                <span className="font-serif font-bold text-gray-900 text-sm block">{activeStudio.leadArchitect}</span>
                <span className="text-gray-600 font-sans block">{activeStudio.address}</span>
                <div className="pt-2 flex items-center space-x-4 font-mono text-xs">
                  <a href={`tel:${activeStudio.phone}`} className="text-[#f05a36] hover:underline font-bold">
                    {activeStudio.phone}
                  </a>
                  <a href={`mailto:${activeStudio.email}`} className="text-gray-600 hover:text-black">
                    {activeStudio.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SUB-PAGE 4: ABOUT (LEADERSHIP & ARCHITECTURAL ETHOS)
         ───────────────────────────────────────────────────────────── */}
      {currentSubPage === 'about' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Different Architect Portrait Image */}
            <div className="lg:col-span-5 relative group">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-gray-300 shadow-xl bg-gray-100">
                <img
                  src="/images/architecture/architect_partner.jpg"
                  alt="Alexander Van Der Rohe, Design Director"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur-md border border-gray-200">
                  <span className="font-mono text-[10px] text-[#f05a36] uppercase font-bold tracking-wider block">
                    DESIGN DIRECTOR & SENIOR PARTNER
                  </span>
                  <h4 className="font-serif text-sm font-bold text-[#1f242e]">Alexander Van Der Rohe</h4>
                  <span className="font-mono text-[9px] text-gray-500 block">M.Arch ETH Zurich • Registered SIA Architect</span>
                </div>
              </div>
            </div>

            {/* Right: Leadership Manifesto */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs text-[#f05a36] uppercase font-bold tracking-widest block">
                ARCHITECTURAL LEADERSHIP & ETHOS
              </span>

              <div className="space-y-2">
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold uppercase text-[#1f242e] tracking-tight leading-tight">
                  YOU ARE WELCOME! <br />
                  <span className="text-[#f05a36]">CRAFTING HUMAN DIGNITY</span> IN STEEL & STONE.
                </h2>
                <div className="h-1 w-20 bg-[#f05a36]" />
              </div>

              <p className="text-sm text-gray-700 font-sans leading-relaxed text-justify font-light">
                &ldquo;True contemporary architecture is neither nostalgic pastiche nor digital exhibitionism. It is the radical orchestration of weight, proportion, daylight, and materiality into structures that elevate human consciousness.&rdquo;
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-sans text-xs">
                <div className="p-4 bg-white border border-gray-200 rounded-sm space-y-1 shadow-sm">
                  <span className="font-bold text-gray-900 block font-serif">Pritzker & Mies Nominee</span>
                  <p className="text-gray-600 leading-relaxed text-[11px]">
                    Recipient of European Civic Architecture Medals and RIBA International Awards.
                  </p>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-sm space-y-1 shadow-sm">
                  <span className="font-bold text-gray-900 block font-serif">LOD-400 BIM Directorship</span>
                  <p className="text-gray-600 leading-relaxed text-[11px]">
                    Pioneering algorithmic structural optimization and mass-timber sequestration.
                  </p>
                </div>
              </div>

              {/* Hand-signed Cursive Signature Simulation */}
              <div className="pt-4 flex items-center justify-between border-t border-gray-200">
                <div>
                  <span className="font-serif text-3xl text-[#f05a36] italic tracking-wide block font-light">
                    Alexander v.d. Rohe
                  </span>
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                    DIRECTOR OF DESIGN COUNCIL
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Principal Signature</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SUB-PAGE 5: INQUIRY (COMMISSION BRIEF & VIDEO CONSULTATION)
         ───────────────────────────────────────────────────────────── */}
      {currentSubPage === 'inquiry' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Brief Manifesto */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs text-[#f05a36] tracking-[0.3em] uppercase font-bold block">
                COMMISSION AN ARCHITECTURAL MONUMENT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1f242e] uppercase tracking-tight">
                LET US ENGINEER YOUR NEXT LANDMARK
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans text-justify">
                Whether you are envisioning a private cliffside estate, an institutional museum, or an urban commercial supertower, our partners review every architectural commission with personalized rigor.
              </p>

              <div className="p-4 bg-white border-l-4 border-[#f05a36] rounded-sm space-y-2 text-xs border border-gray-200 shadow-sm">
                <span className="font-bold text-[#1f242e] block">Our Client Engagement Commitment:</span>
                <ul className="space-y-1.5 text-gray-600 list-disc list-inside font-sans">
                  <li>Direct partner consultation within 48 business hours</li>
                  <li>Complimentary geodetic & zoning pre-feasibility analysis</li>
                  <li>LOD-400 parametric BIM budget forecasting</li>
                </ul>
              </div>

              <div className="p-4 bg-[#f8f9fa] rounded-sm border border-gray-200 text-xs space-y-2">
                <span className="font-mono text-[10px] text-[#f05a36] font-bold uppercase block">
                  SCHEDULE PARTNER CALL DIRECTLY:
                </span>
                <p className="text-gray-600">
                  Prefer an immediate face-to-face video consultation?
                </p>
                <button
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="px-4 py-2 bg-[#1f242e] hover:bg-[#f05a36] text-white font-mono text-xs uppercase tracking-wider rounded-sm transition"
                >
                  Schedule Video Session
                </button>
              </div>
            </div>

            {/* Right Column: Unboxed Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-sm border border-gray-200 shadow-md">
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center space-y-4"
                >
                  <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                  <h3 className="font-serif text-xl font-bold text-[#1f242e]">
                    Commission Brief Successfully Transmitted
                  </h3>
                  <p className="text-xs text-gray-600 max-w-md mx-auto">
                    Thank you. Your project brief has been delivered directly to Henrik Vane and Alexander Van Der Rohe for confidential feasibility review.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-5 py-2.5 rounded-sm bg-[#f05a36] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-sm"
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
                    <label className="font-mono text-[10px] uppercase tracking-wider text-gray-600 font-bold block mb-1.5">
                      PROJECT TYPOLOGY:
                    </label>
                    <select
                      value={formTypology}
                      onChange={(e) => setFormTypology(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm font-sans text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                    >
                      <option>Luxury Residential Villa / Estate</option>
                      <option>Commercial Tower / Mixed-Use</option>
                      <option>Cultural Museum / Pavilion</option>
                      <option>Infrastructure Bridge & Civic Works</option>
                      <option>Urban Masterplan & District Design</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider text-gray-600 font-bold block mb-1.5">
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
                              : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-gray-600 font-bold block mb-1.5">
                        YOUR NAME / ORGANIZATION:
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Lorde Harrington"
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm font-sans text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-gray-600 font-bold block mb-1.5">
                        PROJECT SITE LOCATION:
                      </label>
                      <input
                        type="text"
                        required
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        placeholder="City, Country (e.g. Geneva, Switzerland)"
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm font-sans text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-gray-600 font-bold block mb-1.5">
                        CORPORATE EMAIL:
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="client@domain.com"
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm font-sans text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-gray-600 font-bold block mb-1.5">
                        PHONE NUMBER:
                      </label>
                      <input
                        type="tel"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+41 ..."
                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm font-sans text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider text-gray-600 font-bold block mb-1.5">
                      PROJECT BRIEF & AMBITION:
                    </label>
                    <textarea
                      rows={3}
                      value={formBrief}
                      onChange={(e) => setFormBrief(e.target.value)}
                      placeholder="Describe your architectural ambition, timeline, and site constraints..."
                      className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm font-sans text-xs text-[#1f242e] focus:outline-none focus:border-[#f05a36]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#f05a36] hover:bg-[#1f242e] text-white font-bold text-xs uppercase tracking-widest rounded-sm transition shadow-md shadow-[#f05a36]/20 flex items-center justify-center space-x-2"
                  >
                    <span>Transmit Architectural Commission Brief</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </main>
      )}

      {/* ─────────────────────────────────────────────────────────────
          FOOTER: HAUTE LUXURY MAGAZINE EDITORIAL FOOTER
         ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#1f242e] text-white border-t-4 border-[#f05a36] py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <span className="text-xl font-mono text-[#f05a36] font-bold">ATV</span>
              <span className="font-serif text-sm font-bold tracking-widest uppercase text-white">
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
              SUB-PAGE DIRECTORY
            </span>
            <ul className="space-y-1.5 text-gray-300 font-serif">
              <li><button onClick={() => setCurrentSubPage('home')} className="hover:text-[#f05a36] transition">01. Home & 3D Video Experience</button></li>
              <li><button onClick={() => setCurrentSubPage('works')} className="hover:text-[#f05a36] transition">02. Selected Built Works</button></li>
              <li><button onClick={() => setCurrentSubPage('studios')} className="hover:text-[#f05a36] transition">03. Global Studios & World Clocks</button></li>
              <li><button onClick={() => setCurrentSubPage('about')} className="hover:text-[#f05a36] transition">04. Leadership & Philosophy</button></li>
              <li><button onClick={() => setCurrentSubPage('inquiry')} className="hover:text-[#f05a36] transition">05. Commission Inquiries</button></li>
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
              className="w-full py-2 bg-[#f05a36] hover:bg-white hover:text-black text-white text-xs font-mono font-bold rounded-sm transition"
            >
              Schedule Partner Consultation
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-gray-500 font-mono text-[10px]">
          <span>&copy; 2026 ATELIER VANGUARD ARCHITECTS. ALL RIGHTS RESERVED.</span>
          <span>100% SEO OPTIMIZED • THREE.JS 3D TIMELAPSE • UNBOXED EDITORIAL PLATFORM</span>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          MODAL 1: CONSULTATION / CALL BOOKING MODAL
         ───────────────────────────────────────────────────────────── */}
      {isConsultationModalOpen && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-sm max-w-lg w-full p-6 shadow-2xl space-y-4 relative text-xs">
            <button
              onClick={() => {
                setIsConsultationModalOpen(false);
                setConsultationSubmitted(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-black p-1 rounded-sm bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 text-[#f05a36] font-mono text-[11px] font-bold">
              <Phone className="w-4 h-4" />
              <span>CONFIDENTIAL PARTNER CALL</span>
            </div>

            <h3 className="font-serif text-xl font-bold text-[#1f242e]">
              Schedule a Strategic Architecture Consultation
            </h3>

            {consultationSubmitted ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-gray-900 text-base">Consultation Request Confirmed</h4>
                <p className="text-gray-600 text-xs">
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
                  <label className="font-mono text-[10px] text-gray-600 block mb-1">YOUR FULL NAME:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lorde Harrington"
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-gray-600 block mb-1">EMAIL ADDRESS:</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-gray-600 block mb-1">PREFERRED STUDIO / TIME ZONE:</label>
                  <select className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-gray-900">
                    <option>Zurich HQ (CET / Central European)</option>
                    <option>Milano Atelier (CET)</option>
                    <option>Tokyo Robotics Lab (JST)</option>
                    <option>New York Americas (EST)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#f05a36] hover:bg-[#1f242e] text-white font-bold uppercase tracking-wider rounded-sm transition shadow-md"
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
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-sm max-w-lg w-full p-6 shadow-2xl space-y-4 relative text-xs max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddProjectModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black p-1 rounded-sm bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 text-[#f05a36] font-mono text-[11px] font-bold">
              <Plus className="w-4 h-4" />
              <span>NEW ARCHITECTURAL COMMISSION</span>
            </div>

            <h3 className="font-serif text-xl font-bold text-[#1f242e]">
              Publish Custom Project to Live Portfolio
            </h3>

            <form onSubmit={handleAddNewProject} className="space-y-3.5">
              <div>
                <label className="font-mono text-[10px] text-gray-600 block mb-1">PROJECT TITLE:</label>
                <input
                  type="text"
                  required
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  placeholder="e.g. Alpine Cantilever Research Observatory"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[10px] text-gray-600 block mb-1">TYPOLOGY CATEGORY:</label>
                  <select
                    value={newProjCategory}
                    onChange={(e) => setNewProjCategory(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-gray-900"
                  >
                    <option value="commercial">Commercial High-Rise</option>
                    <option value="residential">Luxury Villas</option>
                    <option value="cultural">Cultural & Museums</option>
                    <option value="infrastructure">Infrastructure & Bridges</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono text-[10px] text-gray-600 block mb-1">LOCATION (CITY, COUNTRY):</label>
                  <input
                    type="text"
                    value={newProjLocation}
                    onChange={(e) => setNewProjLocation(e.target.value)}
                    placeholder="e.g. Reykjavik, Iceland"
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[10px] text-gray-600 block mb-1">COMPLETION YEAR:</label>
                  <input
                    type="text"
                    value={newProjYear}
                    onChange={(e) => setNewProjYear(e.target.value)}
                    placeholder="2026"
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-gray-600 block mb-1">TOTAL AREA (M²):</label>
                  <input
                    type="text"
                    value={newProjArea}
                    onChange={(e) => setNewProjArea(e.target.value)}
                    placeholder="14,500 m²"
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] text-gray-600 block mb-1">IMAGE URL (OR LEAVE BLANK FOR DEFAULT):</label>
                <input
                  type="text"
                  value={newProjImage}
                  onChange={(e) => setNewProjImage(e.target.value)}
                  placeholder="https://... or /images/architecture/..."
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-gray-900"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-gray-600 block mb-1">PROJECT DESCRIPTION:</label>
                <textarea
                  rows={3}
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  placeholder="Describe the architectural thesis, structural feats, and materials..."
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-sm text-gray-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#f05a36] hover:bg-[#1f242e] text-white font-bold uppercase tracking-wider rounded-sm transition shadow-md"
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
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-sm max-w-2xl w-full p-6 shadow-2xl space-y-4 relative text-xs max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black p-1 rounded-sm bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-gray-100">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md font-mono text-[10px] text-[#f05a36] font-bold border border-gray-200">
                PROJECT #{selectedProject.number}
              </div>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] text-[#f05a36] uppercase font-bold tracking-widest block">
                {selectedProject.category} • {selectedProject.year}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1f242e]">
                {selectedProject.title}
              </h3>
              <span className="font-mono text-xs text-gray-600 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-[#f05a36]" />
                <span>{selectedProject.location}</span>
              </span>
            </div>

            <p className="text-xs text-gray-700 font-sans leading-relaxed text-justify">
              {selectedProject.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 border-t border-gray-200 font-mono text-[10px]">
              <div className="p-2.5 bg-gray-50 border border-gray-200">
                <span className="text-gray-500 block">TOTAL AREA:</span>
                <span className="text-[#1f242e] font-bold">{selectedProject.area}</span>
              </div>
              <div className="p-2.5 bg-gray-50 border border-gray-200">
                <span className="text-gray-500 block">STRUCTURAL HEIGHT:</span>
                <span className="text-[#1f242e] font-bold">{selectedProject.height}</span>
              </div>
              <div className="p-2.5 bg-gray-50 border border-gray-200 col-span-2 sm:col-span-1">
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
