import React from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { SectionPaletteBar } from './SectionPaletteBar';
import { Sparkles, ArrowRight } from 'lucide-react';

export const WireframeBlock = ({ section, isFirst, isLast }) => {
  const {
    currentPalette,
    updateSectionData,
    selectedSectionId,
    setSelectedSectionId
  } = useCanvas();

  const isSelected = selectedSectionId === section.id;

  const handleTextChange = (path, e) => {
    updateSectionData(section.id, path, e.currentTarget.innerText);
  };

  const renderSectionContent = () => {
    const data = section.data || {};

    switch (section.type) {
      case 'navigation':
        return (
          <div className="px-10 py-6 border-b border-[#282c35] flex items-center justify-between">
            <div>
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('brandName', e)}
                className="font-serif text-2xl tracking-[0.25em] font-light uppercase text-[#f5f2eb] cursor-text"
              >
                {data.brandName || 'MAISON D’OR'}
              </div>
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('tagline', e)}
                className="font-mono text-[9px] tracking-widest text-[#9ca3af] uppercase mt-0.5"
              >
                {data.tagline || 'PARIS • MILAN • TOKYO'}
              </div>
            </div>

            <div className="flex items-center space-x-8">
              {(data.links || ['COLLECTIONS', 'ATELIER', 'ARCHIVE', 'PRIVATE CLIENTS']).map((link, idx) => (
                <span
                  key={idx}
                  className="text-xs uppercase tracking-widest text-[#9ca3af] hover:text-[#f5f2eb] font-sans transition cursor-pointer"
                >
                  {link}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('ctaText', e)}
                className="px-5 py-2.5 text-xs font-sans tracking-widest uppercase border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition duration-300"
              >
                {data.ctaText || 'REQUEST APPOINTMENT'}
              </button>
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className="px-12 py-20 border-b border-[#282c35] relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 border border-[#c5a059]/40 bg-[#c5a059]/5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('badge', e)}
                  className="font-mono text-[10px] tracking-widest text-[#c5a059] uppercase"
                >
                  {data.badge || 'EDITION 2026 / VOL. IV'}
                </span>
              </div>

              <h1
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('headline', e)}
                className="font-serif text-6xl md:text-7xl font-light tracking-tight text-[#f5f2eb] leading-[1.1] cursor-text"
              >
                {data.headline || 'Poetry in Form & Solitude'}
              </h1>

              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('subheadline', e)}
                className="font-sans text-base text-[#9ca3af] max-w-2xl mx-auto leading-relaxed font-light"
              >
                {data.subheadline || 'Crafted entirely by hand in our Parisian atelier over three hundred meticulous hours of artisanal precision.'}
              </p>

              <div className="pt-4 flex items-center justify-center space-x-4">
                <button
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('ctaPrimary', e)}
                  className="px-8 py-3.5 text-xs font-sans tracking-widest uppercase bg-[#c5a059] text-black font-semibold hover:bg-[#e4c88a] transition shadow-lg"
                >
                  {data.ctaPrimary || 'EXPLORE REPERTOIRE'}
                </button>
                <button
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('ctaSecondary', e)}
                  className="px-8 py-3.5 text-xs font-sans tracking-widest uppercase border border-[#373d4a] text-[#f5f2eb] hover:border-[#c5a059] transition"
                >
                  {data.ctaSecondary || 'VIEW FILM'}
                </button>
              </div>
            </div>

            {/* Editorial Wireframe Placeholder Container */}
            <div className="mt-14 max-w-5xl mx-auto h-72 border border-dashed border-[#373d4a] bg-[#14171d]/60 flex flex-col items-center justify-center relative group">
              <div className="w-16 h-16 rounded-full border border-[#c5a059]/30 flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-[#c5a059]" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#8e95a5]">
                [ High-Resolution Editorial Hero Media / Video Placeholder ]
              </span>
              <span className="font-mono text-[10px] text-gray-500 mt-1">16:9 Cinema Aspect Ratio</span>
            </div>

            <div className="mt-8 pt-4 border-t border-[#282c35] flex items-center justify-between text-xs font-mono text-[#8e95a5] max-w-5xl mx-auto">
              <span contentEditable suppressContentEditableWarning onBlur={(e) => handleTextChange('metaLeft', e)}>
                {data.metaLeft || 'LIMITED RUN OF 12 PIECES'}
              </span>
              <span contentEditable suppressContentEditableWarning onBlur={(e) => handleTextChange('metaRight', e)}>
                {data.metaRight || 'AUTUMN / WINTER SOLSTICE'}
              </span>
            </div>
          </div>
        );

      case 'lookbook':
        return (
          <div className="px-12 py-16 border-b border-[#282c35]">
            <div className="flex items-end justify-between mb-10 max-w-5xl mx-auto">
              <div>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('eyebrow', e)}
                  className="font-mono text-[10px] tracking-widest text-[#c5a059] uppercase block mb-1"
                >
                  {data.eyebrow || 'CURATED SELECTIONS'}
                </span>
                <h2
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('heading', e)}
                  className="font-serif text-4xl font-light text-[#f5f2eb]"
                >
                  {data.heading || 'The Architecture of Drape'}
                </h2>
              </div>
              <span className="font-mono text-xs text-[#8e95a5] uppercase tracking-wider flex items-center space-x-1 cursor-pointer hover:text-white">
                <span>View Full Index</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {(data.items || [
                { title: 'No. 01 — The Cashmere Opera Coat', subtitle: 'Hand-woven Italian Loro Piana Wool', tag: 'BESPOKE' },
                { title: 'No. 02 — Sculpted Silk Gown', subtitle: 'Midnight Onyx Crepe de Chine', tag: 'LIMITED' },
                { title: 'No. 03 — Tailored Obsidian Blazer', subtitle: 'Architectural Shoulder & Mother of Pearl', tag: 'SIGNATURE' }
              ]).map((item, idx) => (
                <div key={idx} className="border border-[#282c35] bg-[#14171d]/40 p-5 space-y-4 hover:border-[#c5a059]/60 transition group">
                  <div className="h-64 border border-dashed border-[#2d323d] bg-[#181b22] flex flex-col items-center justify-center p-4 text-center">
                    <span className="font-mono text-[11px] text-gray-400 uppercase tracking-widest">
                      [ Editorial Image 0{idx + 1} ]
                    </span>
                    <span className="font-mono text-[9px] text-gray-600 mt-1">4:5 Portrait Ratio</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[9px] text-[#c5a059] uppercase tracking-wider">
                        {item.tag}
                      </span>
                      <span className="font-mono text-[9px] text-gray-500">LOOK 0{idx + 1}</span>
                    </div>
                    <h3 className="font-serif text-lg text-[#f5f2eb] font-normal">{item.title}</h3>
                    <p className="font-sans text-xs text-[#9ca3af] mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'heritage':
        return (
          <div className="px-12 py-16 border-b border-[#282c35] bg-[#101216]/50">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('year', e)}
                  className="font-mono text-[10px] tracking-widest text-[#c5a059] uppercase"
                >
                  {data.year || 'EST. 1928'}
                </span>
                <h2
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('title', e)}
                  className="font-serif text-3xl md:text-4xl text-[#f5f2eb] font-light"
                >
                  {data.title || 'Centuries of Pure Discipline'}
                </h2>
              </div>

              <blockquote className="border-y border-[#282c35] py-8 text-center">
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('quote', e)}
                  className="font-serif italic text-2xl md:text-3xl text-[#f5f2eb]/90 max-w-3xl mx-auto leading-relaxed"
                >
                  {data.quote || '“True luxury does not clamor for attention. It commands silence through undeniable mastery.”'}
                </p>
                <cite
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('author', e)}
                  className="block font-mono text-[11px] uppercase tracking-widest text-[#c5a059] mt-4 not-italic"
                >
                  — {data.author || 'Master Couturier'}
                </cite>
              </blockquote>

              <div className="grid grid-cols-3 gap-6 pt-4 text-center">
                {(data.stats || [
                  { number: '340+', label: 'Hours per silhouette' },
                  { number: '100%', label: 'Traceable ethical silk' },
                  { number: '12', label: 'Bespoke commissions / yr' }
                ]).map((stat, idx) => (
                  <div key={idx} className="p-4 border border-[#282c35] bg-[#14171d]/30">
                    <div className="font-serif text-3xl font-light text-[#c5a059]">{stat.number}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[#8e95a5] mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'quote':
        return (
          <div className="px-12 py-14 border-b border-[#282c35] text-center bg-[#13151b]">
            <div className="max-w-3xl mx-auto space-y-3">
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('magazine', e)}
                className="font-mono text-[11px] tracking-widest text-[#c5a059] uppercase font-bold"
              >
                {data.magazine || 'VOGUE INTERNATIONAL'}
              </span>
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('text', e)}
                className="font-serif text-2xl md:text-3xl font-light italic text-[#f5f2eb]"
              >
                {data.text || '“A transcendental masterclass in modern restraint. Maison D’Or redefines what it means to be quietly untouchable.”'}
              </p>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleTextChange('issue', e)}
                className="font-mono text-[10px] uppercase text-[#8e95a5] block"
              >
                {data.issue || 'September Fall Anthology'}
              </span>
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="px-12 py-16 border-b border-[#282c35]">
            <div className="text-center mb-10 max-w-4xl mx-auto">
              <span className="font-mono text-[10px] tracking-widest text-[#c5a059] uppercase block mb-1">
                {data.eyebrow || 'PRIVATE MEMBERSHIP'}
              </span>
              <h2 className="font-serif text-3xl font-light text-[#f5f2eb]">
                {data.heading || 'Select Your Level of Engagement'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {(data.items || [
                { title: 'Atelier Circle', subtitle: 'Private seasonal preview & concierge', tag: '$2,500 / YR' },
                { title: 'Founder Vault', subtitle: 'Direct artisan access & bespoke commissions', tag: '$10,000 / YR' },
                { title: 'Patron Sovereign', subtitle: 'Unlimited custom pieces & global studio access', tag: 'BY INVITATION' }
              ]).map((item, idx) => (
                <div key={idx} className="border border-[#282c35] p-6 bg-[#14171d] space-y-4 text-center hover:border-[#c5a059] transition">
                  <span className="font-mono text-[10px] text-[#c5a059] uppercase tracking-wider block">
                    TIER 0{idx + 1}
                  </span>
                  <h3 className="font-serif text-xl text-[#f5f2eb]">{item.title}</h3>
                  <div className="font-serif text-2xl text-[#c5a059] font-light">{item.tag}</div>
                  <p className="font-sans text-xs text-[#8e95a5]">{item.subtitle}</p>
                  <button className="w-full py-2.5 text-xs font-sans tracking-widest uppercase border border-[#3b414f] text-[#f5f2eb] hover:border-[#c5a059] transition">
                    APPLY FOR ACCESS
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="px-12 py-16 border-b border-[#282c35] max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="font-mono text-[10px] tracking-widest text-[#c5a059] uppercase block mb-1">
                {data.eyebrow || 'CLIENT CONCIERGE'}
              </span>
              <h2 className="font-serif text-3xl font-light text-[#f5f2eb]">
                {data.heading || 'Frequently Inquired Details'}
              </h2>
            </div>
            <div className="space-y-4">
              {(data.items || [
                { title: 'What is the lead time for bespoke commissions?', subtitle: 'Each bespoke piece requires approximately 8 to 14 weeks depending on the complexity of materials.' },
                { title: 'Can private viewings be arranged internationally?', subtitle: 'Our private salons in Paris, New York, and Tokyo host dedicated client appointments by prior reservation.' }
              ]).map((item, idx) => (
                <div key={idx} className="border border-[#282c35] p-5 bg-[#14171d]/40">
                  <h4 className="font-serif text-lg text-[#f5f2eb] mb-2">{item.title}</h4>
                  <p className="font-sans text-xs text-[#8e95a5] leading-relaxed">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'footer':
        return (
          <div className="px-12 py-14 bg-[#0a0b0d] text-center space-y-6">
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleTextChange('monogram', e)}
              className="font-serif text-2xl tracking-[0.3em] font-light text-[#c5a059]"
            >
              {data.monogram || 'M•D'}
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleTextChange('address', e)}
              className="font-mono text-xs uppercase tracking-widest text-[#8e95a5]"
            >
              {data.address || '18 Place Vendôme, 75001 Paris • Mayfair, London • Ginza, Tokyo'}
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleTextChange('email', e)}
              className="font-mono text-xs text-[#c5a059] underline cursor-pointer"
            >
              {data.email || 'concierge@maisondor.fr'}
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleTextChange('legal', e)}
              className="font-mono text-[9px] uppercase tracking-widest text-gray-600 pt-4 border-t border-[#1e222b] max-w-xl mx-auto"
            >
              {data.legal || '© 2026 MAISON D’OR. ALL RIGHTS RESERVED. PRIVATE ATELIER.'}
            </div>
          </div>
        );

      default:
        return (
          <div className="p-8 text-center text-gray-500 font-mono text-xs">
            Unknown section type: {section.type}
          </div>
        );
    }
  };

  return (
    <div
      onClick={() => setSelectedSectionId(section.id)}
      className={`relative group bg-[#0e1014] transition duration-150 ${
        isSelected ? 'ring-1 ring-[#c5a059]' : 'hover:ring-1 hover:ring-white/20'
      }`}
    >
      <SectionPaletteBar
        section={section}
        isFirst={isFirst}
        isLast={isLast}
      />
      {renderSectionContent()}
    </div>
  );
};
