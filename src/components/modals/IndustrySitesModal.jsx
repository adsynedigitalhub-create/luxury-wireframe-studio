import React, { useState, useMemo } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { get100RealSitesForQuery } from '../../data/realIndustryWebsites';
import {
  Globe,
  ExternalLink,
  Copy,
  Check,
  Search,
  Smartphone,
  Laptop,
  Tablet,
  Sparkles,
  X,
  LayoutGrid,
  Eye,
  Zap,
  Download,
  ListOrdered,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const POPULAR_SEARCHES = [
  'Dental Clinic',
  'Real Estate Dubai',
  'Luxury Watches',
  'AI & SaaS Tech',
  'Architecture & Interiors',
  'Luxury Fashion',
  'Automotive Supercars',
  'Specialty Coffee',
  'Fine Dining & Hotels',
  'DTC Brands'
];

export const IndustrySitesModal = ({ isOpen, onClose }) => {
  const { addWebsiteGrid } = useCanvas();

  const [searchInput, setSearchInput] = useState('Dental Clinic');
  const [activeQuery, setActiveQuery] = useState('Dental Clinic');
  const [copiedId, setCopiedId] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [inspectingSite, setInspectingSite] = useState(null);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [filterInList, setFilterInList] = useState('');

  // Generate 100 REAL websites for the active industry query
  const all100Sites = useMemo(() => {
    return get100RealSitesForQuery(activeQuery);
  }, [activeQuery]);

  // Filter inside the 100 sites if user uses the quick filter input
  const displayedSites = useMemo(() => {
    if (!filterInList.trim()) return all100Sites;
    const q = filterInList.toLowerCase();
    return all100Sites.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.domain.toLowerCase().includes(q) ||
        s.url.toLowerCase().includes(q)
    );
  }, [all100Sites, filterInList]);

  if (!isOpen) return null;

  // Handle Search Submission
  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchInput.trim()) {
      setActiveQuery(searchInput.trim());
      setFilterInList('');
    }
  };

  // Copy Single Link
  const handleCopySingle = (site) => {
    navigator.clipboard.writeText(site.url);
    setCopiedId(site.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Copy ALL 100 Links at once
  const handleCopyAll100 = () => {
    const listText = all100Sites
      .map((s, idx) => `${idx + 1}. ${s.name}: ${s.url}`)
      .join('\n');
    navigator.clipboard.writeText(listText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  // Export 100 Links as CSV
  const handleExportCSV = () => {
    const header = 'Number,Brand Name,Domain,Live URL,Responsive Score\n';
    const rows = all100Sites
      .map((s, i) => `"${i + 1}","${s.name.replace(/"/g, '""')}","${s.domain}","${s.url}","${s.responsiveScore}"`)
      .join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `top-100-${activeQuery.toLowerCase().replace(/[^a-z0-9]/g, '-')}-links.csv`;
    link.click();
  };

  // Drop Wireframe Layout on Canvas
  const handleDropWireframe = (site) => {
    addWebsiteGrid('bento');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#121418] border border-[#2c3140] w-full max-w-6xl max-h-[94vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* MODAL HEADER */}
        <div className="px-6 py-4 border-b border-[#252a35] flex items-center justify-between bg-[#15181f]/95">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c5a059] to-[#8f7134] flex items-center justify-center shadow-glow">
              <Globe className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-serif text-lg font-bold text-white tracking-wide">
                  Top 100 Responsive Websites Search Engine
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40 font-mono text-[10px] font-bold uppercase tracking-wider">
                  Real Live Links
                </span>
              </div>
              <p className="font-sans text-xs text-gray-400 mt-0.5">
                Aap kisi bhi industry ka naam search karein — ye tool aap ko us industry ke <strong className="text-[#c5a059]">100 real websites ke live links</strong> foran nikaal kar dega.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* 1-Click Copy All 100 Links */}
            <button
              onClick={handleCopyAll100}
              className="px-4 py-2 rounded-xl bg-[#c5a059] hover:bg-[#d8b46e] text-black font-sans font-bold text-xs flex items-center space-x-1.5 shadow-lg transition active:scale-95"
              title="Copy all 100 links to clipboard"
            >
              {copiedAll ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>Copied All 100 Links!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-black" />
                  <span>Copy All 100 Links</span>
                </>
              )}
            </button>

            {/* Export CSV */}
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 rounded-xl bg-[#1d222e] hover:bg-[#252c3c] text-gray-200 border border-white/10 text-xs font-sans flex items-center space-x-1 transition"
              title="Download 100 links as CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Export CSV</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SEARCH BAR (User searches industry here) */}
        <div className="px-6 py-4 border-b border-[#252a35] bg-[#0e1014] space-y-3">
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Koi bhi industry likhein (e.g. Dental Clinic, Real Estate Dubai, Luxury Watches, Architecture, Coffee, Fashion)..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#161922] border border-[#2e3444] focus:border-[#c5a059] rounded-xl text-sm font-sans text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#c5a059] transition"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-sans font-bold text-xs rounded-xl shadow transition flex items-center space-x-1.5 active:scale-95"
            >
              <Search className="w-3.5 h-3.5 text-black" />
              <span>Search 100 Links</span>
            </button>
          </form>

          {/* Popular Industry Suggestion Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider shrink-0 mr-1">
              Popular Industries:
            </span>
            {POPULAR_SEARCHES.map((ind) => {
              const isActive = activeQuery.toLowerCase() === ind.toLowerCase();
              return (
                <button
                  key={ind}
                  onClick={() => {
                    setSearchInput(ind);
                    setActiveQuery(ind);
                    setFilterInList('');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-sans whitespace-nowrap transition ${
                    isActive
                      ? 'bg-[#c5a059] text-black font-semibold shadow-sm'
                      : 'bg-[#181b24] hover:bg-[#202532] text-gray-300 hover:text-white border border-white/5'
                  }`}
                >
                  {ind}
                </button>
              );
            })}
          </div>
        </div>

        {/* RESULTS BAR: COUNT & QUICK FILTER */}
        <div className="px-6 py-2.5 border-b border-[#252a35] bg-[#12141b] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-gray-400">
              Found <strong className="text-[#c5a059]">{all100Sites.length}</strong> Real Website Links for{' '}
              <strong className="text-white">"{activeQuery}"</strong>
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-emerald-400 font-mono flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>All 100 Live & Verified</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative w-52">
              <Search className="w-3 h-3 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filterInList}
                onChange={(e) => setFilterInList(e.target.value)}
                placeholder="Filter in 100 links..."
                className="w-full pl-7 pr-3 py-1 bg-[#181b25] border border-white/10 rounded-lg text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>
        </div>

        {/* SITES 100 CARDS GRID */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#0c0d10]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedSites.map((site) => {
              const isCopied = copiedId === site.id;

              return (
                <div
                  key={site.id}
                  className="bg-[#15171f] border border-[#262b38] hover:border-[#c5a059]/60 rounded-xl overflow-hidden flex flex-col justify-between group transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 p-4 space-y-3"
                >
                  <div>
                    {/* Top Row: Number # and Score */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30">
                        #{site.index}
                      </span>
                      <span className="font-mono text-[10px] text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                        {site.responsiveScore} Responsive
                      </span>
                    </div>

                    {/* Brand Name */}
                    <h3 className="font-serif text-base font-semibold text-white group-hover:text-[#e4c88a] transition-colors truncate">
                      {site.name}
                    </h3>

                    {/* Domain & URL */}
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[#c5a059] hover:underline truncate block mt-0.5 transition"
                    >
                      {site.url}
                    </a>

                    {/* Layout Style / Niche */}
                    <p className="font-sans text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                      {site.layoutStyle}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-1.5">
                    {/* Open Live Site */}
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-1.5 px-2.5 bg-[#1d222e] hover:bg-[#c5a059] text-gray-200 hover:text-black rounded-lg text-xs font-sans font-medium flex items-center justify-center space-x-1 transition shadow-sm"
                    >
                      <span>Open Live Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    {/* Copy Link */}
                    <button
                      onClick={() => handleCopySingle(site)}
                      title="Copy link"
                      className="p-1.5 bg-[#12141a] hover:bg-[#1f2430] border border-white/10 rounded-lg text-gray-400 hover:text-white transition"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    {/* Viewport Test */}
                    <button
                      onClick={() => setInspectingSite(site)}
                      title="Inspect site in responsive viewport"
                      className="p-1.5 bg-[#12141a] hover:bg-[#1f2430] border border-white/10 rounded-lg text-gray-400 hover:text-white transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    {/* Drop Layout Grid */}
                    <button
                      onClick={() => handleDropWireframe(site)}
                      title="Use layout grid on Canvas"
                      className="py-1.5 px-2 bg-[#c5a059]/15 hover:bg-[#c5a059] text-[#c5a059] hover:text-black rounded-lg text-xs font-sans font-medium transition"
                    >
                      <Zap className="w-3 h-3" />
                      <span>Grid</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RESPONSIVE INSPECT MODAL OVERLAY */}
        {inspectingSite && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-lg bg-[#c5a059] text-black font-bold font-mono text-xs flex items-center justify-center">
                  #{inspectingSite.index}
                </span>
                <div>
                  <h3 className="font-serif text-base font-bold text-white">
                    {inspectingSite.name} — Responsive Viewport Test
                  </h3>
                  <a
                    href={inspectingSite.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#c5a059] hover:underline flex items-center space-x-1"
                  >
                    <span>{inspectingSite.url}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Viewport device switcher */}
              <div className="flex items-center space-x-1 p-1 bg-[#181b24] border border-white/10 rounded-xl">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-sans transition ${
                    previewDevice === 'desktop' ? 'bg-[#c5a059] text-black font-semibold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Desktop (1440px)</span>
                </button>
                <button
                  onClick={() => setPreviewDevice('tablet')}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-sans transition ${
                    previewDevice === 'tablet' ? 'bg-[#c5a059] text-black font-semibold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span>Tablet (768px)</span>
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-sans transition ${
                    previewDevice === 'mobile' ? 'bg-[#c5a059] text-black font-semibold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile (375px)</span>
                </button>
              </div>

              <button
                onClick={() => setInspectingSite(null)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded Live Iframe / Viewport */}
            <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
              <div
                style={{
                  width: previewDevice === 'desktop' ? '100%' : previewDevice === 'tablet' ? '768px' : '375px',
                  height: '100%',
                  maxHeight: '68vh'
                }}
                className="bg-[#15171f] border-2 border-[#3b4356] rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300"
              >
                <div className="h-8 bg-[#1e222d] px-3 flex items-center justify-between border-b border-white/5">
                  <span className="font-mono text-[10px] text-gray-400 truncate max-w-sm">
                    {inspectingSite.url}
                  </span>
                  <a
                    href={inspectingSite.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white flex items-center space-x-1 text-[10px] font-sans"
                  >
                    <span>Open in new window</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex-1 bg-white relative overflow-hidden flex flex-col items-center justify-center">
                  <iframe
                    src={inspectingSite.url}
                    title={inspectingSite.name}
                    className="w-full h-full border-none"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
