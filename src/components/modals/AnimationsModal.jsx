import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  Check,
  CheckCircle2,
  Sliders,
  Layers,
  Zap,
  RotateCcw,
  X,
  Compass,
  ArrowRight,
  Eye,
  MousePointer,
  Film,
  Flame,
  Activity
} from 'lucide-react';

export const MODERN_ANIMATIONS = [
  {
    id: 'tilt-3d',
    name: '3D Magnetic Tilt on Hover',
    category: 'Hover & 3D',
    badge: 'Trending Awwwards',
    desc: 'Cards rotate in 3D based on cursor position with dynamic golden glare reflection',
    tech: 'transform: perspective(1000px) rotateX/Y'
  },
  {
    id: 'trail-draw',
    name: 'Winding Trail Path Drawing',
    category: 'Kinetic & SVG',
    badge: 'Exact Wireframe',
    desc: 'Mountain trail SVG path draws itself continuously with moving glowing dot checkpoints',
    tech: 'stroke-dasharray & stroke-dashoffset'
  },
  {
    id: 'fade-up-stagger',
    name: 'Fade-Up Stagger Wave',
    category: 'Scroll & Reveal',
    badge: 'Apple / Luxury',
    desc: 'Elements glide upward from bottom with cascading delays (100ms, 200ms, 300ms)',
    tech: 'animate-fade-in-up + stagger timing'
  },
  {
    id: 'marquee-loop',
    name: 'Kinetic Text Marquee Ribbon',
    category: 'Kinetic & SVG',
    badge: 'Editorial Modern',
    desc: 'Infinite 60fps horizontal flowing text ticker (ELBRUS • CRIMEA • ALTAI • EXPEDITION 2026)',
    tech: 'translateX(-50%) infinite ticker'
  },
  {
    id: 'magnetic-button',
    name: 'Magnetic Cursor Button Attractor',
    category: 'Hover & 3D',
    badge: 'Interactive UI',
    desc: 'Buttons physically pull toward the cursor as mouse approaches within 50px',
    tech: 'Elastic cursor gravity tracking'
  },
  {
    id: 'glow-pulse',
    name: 'Luxury Golden Glow Pulse',
    category: 'Luxury Polish',
    badge: 'Visual Depth',
    desc: 'Soft ambient gold breathing aura (box-shadow: 0 0 25px rgba(197,160,89,0.35))',
    tech: 'Keyframe pulse with golden alpha'
  },
  {
    id: 'zoom-reveal',
    name: 'Curtain Zoom & Image Reveal',
    category: 'Scroll & Reveal',
    badge: 'Editorial Hero',
    desc: 'Mountain vistas zoom smoothly from scale(1.0) to scale(1.06) on card hover',
    tech: 'transition-transform duration-700'
  },
  {
    id: 'cursor-glow',
    name: 'Ambient Golden Spotlight Tracker',
    category: 'Luxury Polish',
    badge: 'Dark Theme Must',
    desc: 'Radial spotlight follows the cursor illuminating mountain wireframe elements softly',
    tech: 'radial-gradient spotlight tracking'
  }
];

export const AnimationsModal = ({
  isOpen,
  onClose,
  enabledAnimations = {
    'tilt-3d': true,
    'trail-draw': true,
    'fade-up-stagger': true,
    'marquee-loop': true,
    'magnetic-button': true,
    'glow-pulse': true,
    'zoom-reveal': true,
    'cursor-glow': false
  },
  onToggleAnimation,
  onEnableAll,
  onDisableAll
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [interactiveTilt, setInteractiveTilt] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

  const categories = ['all', 'Hover & 3D', 'Kinetic & SVG', 'Scroll & Reveal', 'Luxury Polish'];

  const filtered = selectedCategory === 'all'
    ? MODERN_ANIMATIONS
    : MODERN_ANIMATIONS.filter((a) => a.category === selectedCategory);

  const activeCount = Object.values(enabledAnimations).filter(Boolean).length;

  const handleMouseMoveMiniCard = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setInteractiveTilt({ x: x * 20, y: -y * 20 });
  };

  const handleMouseLeaveMiniCard = () => {
    setInteractiveTilt({ x: 0, y: 0 });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 select-none animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#111319] border border-[#2b3040] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <header className="px-6 py-4 border-b border-[#232735] flex items-center justify-between bg-[#151822]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c5a059] to-[#8c6d32] flex items-center justify-center text-black shadow-glow font-bold">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="font-serif text-base font-semibold text-white flex items-center space-x-2">
                <span>Modern Web Animations 2026</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#c5a059]/20 text-[#e4c88a] border border-[#c5a059]/40">
                  Project 2: Active ({activeCount}/{MODERN_ANIMATIONS.length})
                </span>
              </h2>
              <p className="font-mono text-[10px] text-gray-400">
                Awwwards & Apple standard modern animations for your adventure hiking website
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Action Controls & Interactive Demo Banner */}
        <div className="px-6 py-3 bg-[#131620] border-b border-[#232735] flex flex-wrap items-center justify-between gap-3">
          {/* Category Filter */}
          <div className="flex items-center space-x-1 bg-[#0e1017] p-1 rounded-xl border border-white/5 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg capitalize transition font-sans ${
                  selectedCategory === cat
                    ? 'bg-[#c5a059] text-black font-bold shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Animations' : cat}
              </button>
            ))}
          </div>

          {/* Quick Bulk Toggles */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onEnableAll}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-[#c5a059] to-[#96793f] hover:brightness-110 text-black font-bold text-xs rounded-lg transition shadow-glow"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Enable All ({MODERN_ANIMATIONS.length})</span>
            </button>

            <button
              onClick={onDisableAll}
              className="px-3 py-1.5 bg-[#1e2330] hover:bg-[#282f42] text-gray-300 hover:text-white border border-[#343d52] text-xs rounded-lg transition"
            >
              Turn Off All
            </button>
          </div>
        </div>

        {/* Interactive Live Playground Banner */}
        <div className="px-6 py-3 bg-gradient-to-r from-[#171a26] via-[#1c2030] to-[#171a26] border-b border-[#2b3044] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
              <MousePointer className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                Live Interactive 3D Tilt Demo:
              </span>
              <span className="text-[10px] text-gray-400 font-mono">
                Mouse ko is card par ghumayein aur live 3D jhukao aur reflection dekhein:
              </span>
            </div>
          </div>

          {/* Interactive Mini Tilt Card */}
          <div
            onMouseMove={handleMouseMoveMiniCard}
            onMouseLeave={handleMouseLeaveMiniCard}
            style={{
              transform: `perspective(600px) rotateY(${interactiveTilt.x}deg) rotateX(${interactiveTilt.y}deg)`,
              transition: interactiveTilt.x === 0 ? 'transform 0.4s ease-out' : 'none'
            }}
            className="w-48 h-16 rounded-xl bg-gradient-to-r from-[#202434] to-[#161824] border-2 border-[#c5a059]/60 p-2 flex items-center space-x-2.5 shadow-xl cursor-pointer hover:border-[#c5a059] group"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-[#c5a059]/30">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80"
                alt="Demo"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="overflow-hidden">
              <span className="font-['Oswald'] text-[11px] font-bold text-white block truncate uppercase">
                ELBRUS 3D TILT
              </span>
              <span className="font-mono text-[9px] text-[#c5a059] block">
                5,642 m • Active
              </span>
            </div>
          </div>
        </div>

        {/* Animations List Grid */}
        <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0d0e14]">
          {filtered.map((anim) => {
            const isEnabled = !!enabledAnimations[anim.id];

            return (
              <div
                key={anim.id}
                className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between space-y-3 ${
                  isEnabled
                    ? 'bg-[#151824] border-[#c5a059]/50 shadow-glow'
                    : 'bg-[#12141c] border-white/5 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-sans font-bold text-sm text-white">
                        {anim.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#c5a059]/15 text-[#e4c88a] border border-[#c5a059]/30">
                        {anim.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      {anim.desc}
                    </p>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    onClick={() => onToggleAnimation(anim.id)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 flex-shrink-0 ml-3 ${
                      isEnabled ? 'bg-[#c5a059]' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`bg-black w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                        isEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400">
                  <span className="text-[#c5a059]">{anim.category}</span>
                  <span className="truncate max-w-[220px] text-gray-500">{anim.tech}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Apply Button */}
        <footer className="px-6 py-3.5 bg-[#151822] border-t border-[#232735] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-gray-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-emerald-400 font-medium">
              {activeCount} Animations Active on Site
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-[#c5a059] to-[#96793f] hover:brightness-110 text-black font-bold rounded-lg transition shadow-glow flex items-center space-x-1.5"
          >
            <span>Apply & View Website</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </footer>
      </div>
    </div>
  );
};
