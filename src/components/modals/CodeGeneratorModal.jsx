import React, { useState, useEffect } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import {
  generateReactTailwind,
  generateHTMLCSS,
  generateElementorJSON,
  generateAdventureSiteReactCode,
  generateAdventureSiteHTMLCode
} from '../../services/codeGeneratorService';
import {
  Code,
  Copy,
  Check,
  Download,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  X,
  FileCode,
  Layers,
  Sparkles,
  ArrowRight,
  Eye,
  Columns,
  Smartphone,
  Tablet,
  Monitor,
  Edit3,
  Compass,
  Phone,
  ArrowDown
} from 'lucide-react';

const INITIAL_ADVENTURE_DATA = {
  heroTagline: '?????? ??? ???? ??????? ?????? ??????',
  heroTitle: '????????? ?? ??????',
  heroDesc: '?????????????? ????????? ?????? ? ??????????? ? ????????????? ????????????????? ?????? ?????.',
  heroBtnText: '??????? ?????',
  brandName: '?????????',
  brandSub: '?????????? ?? ??????',
  phone: '8 (800) 555-35-35',
  filterTitle: '????? ????????',
  filterSub: '????????? ????????? ????????? ??????',
  filterBtnText: '???????? ??????',
  tours: [
    {
      number: '01',
      watermark: 'Elbrus',
      title: '??????????? ?? ???????',
      duration: '????????????????? ?????? ????????: 9 ????',
      dates: '???? ??????: 15 ???????? (???. ??????)',
      length: '????? ????? ????? ????????: ????? 55 ??',
      elevation: '5,642 m',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    },
    {
      number: '02',
      watermark: 'Crimea',
      title: '????? ?? ??????? ?????',
      duration: '????????????????? ?????? ????????: 7 ????',
      dates: '???? ??????: 15-22 ????????',
      length: '????? ????? ????? ????????: ????? 45 ??',
      elevation: '1,545 m',
      image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80'
    },
    {
      number: '03',
      watermark: 'Altai',
      title: '??????????? ?? ?????',
      duration: '????????????????? ?????? ????????: 9 ????',
      dates: '???? ??????: 5-13 ???????',
      length: '????? ????? ????? ????????: ????? 50 ??',
      elevation: '3,200 m',
      image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80'
    }
  ]
};

export const CodeGeneratorModal = ({ isOpen, onClose }) => {
  const { elements, canvasDimensions, canvasBg } = useCanvas();

  const [permissionGranted, setPermissionGranted] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState('adventure');
  const [selectedFormat, setSelectedFormat] = useState('react');

  const [adventureData, setAdventureData] = useState(INITIAL_ADVENTURE_DATA);
  const [canvasElementsState, setCanvasElementsState] = useState(elements);
  const [editableCode, setEditableCode] = useState('');
  const [copied, setCopied] = useState(false);

  const [viewMode, setViewMode] = useState('split');
  const [deviceMode, setDeviceMode] = useState('desktop');

  useEffect(() => {
    if (!isOpen) {
      setPermissionGranted(false);
      setCopied(false);
    } else {
      setCanvasElementsState(elements);
    }
  }, [isOpen, elements]);

  useEffect(() => {
    if (!permissionGranted) return;

    if (selectedTarget === 'adventure') {
      if (selectedFormat === 'react') {
        setEditableCode(generateAdventureSiteReactCode());
      } else if (selectedFormat === 'html') {
        setEditableCode(generateAdventureSiteHTMLCode());
      } else {
        setEditableCode(generateElementorJSON([], canvasDimensions));
      }
    } else {
      if (selectedFormat === 'react') {
        setEditableCode(generateReactTailwind(canvasElementsState, canvasDimensions, canvasBg));
      } else if (selectedFormat === 'html') {
        setEditableCode(generateHTMLCSS(canvasElementsState, canvasDimensions, canvasBg));
      } else {
        setEditableCode(generateElementorJSON(canvasElementsState, canvasDimensions));
      }
    }
  }, [permissionGranted, selectedTarget, selectedFormat, elements, canvasDimensions, canvasBg]);

  // BIDIRECTIONAL SYNC: Visual edit in preview updates Code Editor in real-time
  const handleVisualTextChange = (oldText, newText) => {
    if (!oldText || oldText === newText) return;

    if (selectedTarget === 'adventure') {
      setAdventureData((prev) => {
        const next = { ...prev };
        if (next.heroTitle === oldText) next.heroTitle = newText;
        else if (next.heroTagline === oldText) next.heroTagline = newText;
        else if (next.heroDesc === oldText) next.heroDesc = newText;
        else if (next.heroBtnText === oldText) next.heroBtnText = newText;
        else if (next.brandName === oldText) next.brandName = newText;
        else if (next.brandSub === oldText) next.brandSub = newText;
        else if (next.phone === oldText) next.phone = newText;
        else if (next.filterTitle === oldText) next.filterTitle = newText;
        else if (next.filterSub === oldText) next.filterSub = newText;
        else {
          next.tours = next.tours.map((t) => {
            const copy = { ...t };
            if (copy.title === oldText) copy.title = newText;
            if (copy.duration === oldText) copy.duration = newText;
            if (copy.dates === oldText) copy.dates = newText;
            if (copy.length === oldText) copy.length = newText;
            if (copy.elevation === oldText) copy.elevation = newText;
            if (copy.watermark === oldText) copy.watermark = newText;
            return copy;
          });
        }
        return next;
      });
    } else {
      setCanvasElementsState((prev) =>
        prev.map((el) => (el.text === oldText ? { ...el, text: newText } : el))
      );
    }

    setEditableCode((prevCode) => {
      if (prevCode.includes(oldText)) {
        return prevCode.split(oldText).join(newText);
      }
      return prevCode;
    });
  };

  const handleCodeChange = (e) => {
    setEditableCode(e.target.value);
  };

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editableCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleDownload = () => {
    const extensions = { react: 'jsx', html: 'html', elementor: 'json' };
    const ext = extensions[selectedFormat] || 'txt';
    const filename = `${selectedTarget === 'adventure' ? 'adventure-hiking-site' : 'wireframe-export'}.${ext}`;

    const blob = new Blob([editableCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getDeviceWidthClass = () => {
    if (deviceMode === 'mobile') return 'max-w-[375px]';
    if (deviceMode === 'tablet') return 'max-w-[768px]';
    return 'w-full';
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 select-none animate-fadeIn">
      <div className="relative w-full max-w-[98vw] h-[95vh] bg-[#101217] border border-[#2b303d] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <header className="px-5 py-3 border-b border-[#232733] flex items-center justify-between bg-[#141720]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c5a059] to-[#8c6d32] flex items-center justify-center text-black shadow-glow font-bold">
              ?
            </div>
            <div>
              <h2 className="font-serif text-sm font-semibold text-white flex items-center space-x-2">
                <span>React + Tailwind Interactive Live Editor & Preview</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Two-Way Live Sync
                </span>
              </h2>
              <p className="font-mono text-[9px] text-gray-400">
                Preview mein kisi b text par click kar k edit karein ? code automatically update hoga!
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Step 1: Permission Gate */}
        {!permissionGranted ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg animate-pulse">
              <ShieldCheck className="w-9 h-9" />
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Permission Gate / Code Compile Ki Ijazat</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
                Live React + Tailwind Editor & Preview open karein?
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans">
                Aapke mutabiq <strong>code compile krny sy phly permission ly ga</strong>.
                Kya aap abhi live editable playground kholna chahti hain?
              </p>
            </div>

            <div className="flex items-center gap-3 w-full">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-[#1c202a] hover:bg-[#252b39] border border-[#303648] text-gray-300 hover:text-white text-xs font-sans font-medium transition"
              >
                Abhi Changes Karni Hain (Cancel)
              </button>
              <button
                onClick={() => setPermissionGranted(true)}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#96793f] hover:brightness-110 text-black text-xs font-sans font-bold transition shadow-glow flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Haan, Open Live Editor</span>
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Playground */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="px-4 py-2 bg-[#12151d] border-b border-[#232733] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-[#0d0f14] p-0.5 rounded-lg border border-white/10">
                  <button
                    onClick={() => setSelectedTarget('adventure')}
                    className={`px-3 py-1 rounded text-xs transition flex items-center space-x-1.5 ${
                      selectedTarget === 'adventure' ? 'bg-[#c5a059] text-black font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>???</span>
                    <span>Adventure Site</span>
                  </button>
                  <button
                    onClick={() => setSelectedTarget('canvas')}
                    className={`px-3 py-1 rounded text-xs transition flex items-center space-x-1.5 ${
                      selectedTarget === 'canvas' ? 'bg-[#c5a059] text-black font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Canvas Wireframe ({canvasElementsState.length})</span>
                  </button>
                </div>

                <div className="flex items-center bg-[#0d0f14] p-0.5 rounded-lg border border-white/10 font-mono text-[11px]">
                  <button
                    onClick={() => setSelectedFormat('react')}
                    className={`px-2.5 py-1 rounded transition ${
                      selectedFormat === 'react' ? 'bg-blue-500/25 text-blue-300 border border-blue-500/40 font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    React + Tailwind
                  </button>
                  <button
                    onClick={() => setSelectedFormat('html')}
                    className={`px-2.5 py-1 rounded transition ${
                      selectedFormat === 'html' ? 'bg-orange-500/25 text-orange-300 border border-orange-500/40 font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    HTML5 + CSS3
                  </button>
                  <button
                    onClick={() => setSelectedFormat('elementor')}
                    className={`px-2.5 py-1 rounded transition ${
                      selectedFormat === 'elementor' ? 'bg-pink-500/25 text-pink-300 border border-pink-500/40 font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Elementor JSON
                  </button>
                </div>
              </div>

              {/* View Layout & Device Viewport */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-[#0d0f14] p-0.5 rounded-lg border border-white/10 text-xs">
                  <button
                    onClick={() => setViewMode('split')}
                    className={`px-2.5 py-1 rounded transition flex items-center space-x-1 ${
                      viewMode === 'split' ? 'bg-[#c5a059] text-black font-semibold' : 'text-gray-400 hover:text-white'
                    }`}
                    title="Side-by-side Code & Preview"
                  >
                    <Columns className="w-3.5 h-3.5" />
                    <span>Split View</span>
                  </button>
                  <button
                    onClick={() => setViewMode('preview-only')}
                    className={`px-2.5 py-1 rounded transition flex items-center space-x-1 ${
                      viewMode === 'preview-only' ? 'bg-[#c5a059] text-black font-semibold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview Only</span>
                  </button>
                  <button
                    onClick={() => setViewMode('editor-only')}
                    className={`px-2.5 py-1 rounded transition flex items-center space-x-1 ${
                      viewMode === 'editor-only' ? 'bg-[#c5a059] text-black font-semibold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Code Only</span>
                  </button>
                </div>

                {viewMode !== 'editor-only' && (
                  <div className="flex items-center bg-[#0d0f14] p-0.5 rounded-lg border border-white/10 text-xs">
                    <button
                      onClick={() => setDeviceMode('desktop')}
                      className={`p-1.5 rounded transition ${deviceMode === 'desktop' ? 'bg-[#c5a059] text-black' : 'text-gray-400 hover:text-white'}`}
                      title="Desktop"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeviceMode('tablet')}
                      className={`p-1.5 rounded transition ${deviceMode === 'tablet' ? 'bg-[#c5a059] text-black' : 'text-gray-400 hover:text-white'}`}
                      title="Tablet (768px)"
                    >
                      <Tablet className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeviceMode('mobile')}
                      className={`p-1.5 rounded transition ${deviceMode === 'mobile' ? 'bg-[#c5a059] text-black' : 'text-gray-400 hover:text-white'}`}
                      title="Mobile (375px)"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopy}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    copied ? 'bg-emerald-500 text-black' : 'bg-[#1e2330] hover:bg-[#282f42] text-white border border-[#343d52]'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-[#c5a059]" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-[#c5a059] hover:bg-[#d8b46e] text-black rounded-lg text-xs font-bold transition shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setPermissionGranted(false)}
                  title="Lock & Require Permission Again"
                  className="p-1.5 text-gray-400 hover:text-amber-300 hover:bg-white/10 rounded-lg transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Split Workspace */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left: Code Editor */}
              {(viewMode === 'split' || viewMode === 'editor-only') && (
                <div className={`flex flex-col bg-[#0b0c10] border-r border-[#222633] overflow-hidden ${viewMode === 'editor-only' ? 'w-full' : 'w-1/2'}`}>
                  <div className="px-4 py-2 bg-[#0e1016] border-b border-[#202432] flex items-center justify-between text-[11px] font-mono text-gray-400">
                    <div className="flex items-center space-x-2">
                      <FileCode className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span className="text-white font-medium">
                        {selectedFormat === 'react' ? 'AdventureWebsite.jsx' : selectedFormat === 'html' ? 'index.html' : 'template.json'}
                      </span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                        Two-Way Sync Active
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500">
                      Edit code or click preview to live sync
                    </span>
                  </div>

                  <textarea
                    value={editableCode}
                    onChange={handleCodeChange}
                    spellCheck="false"
                    className="flex-1 w-full bg-[#08090c] text-gray-200 p-4 font-mono text-xs leading-relaxed resize-none focus:outline-none selection:bg-[#c5a059] selection:text-black border-none"
                    placeholder="Type or paste code here..."
                  />

                  <div className="px-4 py-1.5 bg-[#0e1016] border-t border-[#1e2230] flex items-center justify-between text-[10px] font-mono text-gray-500">
                    <span>{editableCode.split('\n').length} Lines | {editableCode.length} Chars</span>
                    <span className="text-emerald-400">? Two-Way Realtime Sync</span>
                  </div>
                </div>
              )}

              {/* Right: Native React + Tailwind Interactive Editable Preview */}
              {(viewMode === 'split' || viewMode === 'preview-only') && (
                <div className={`flex flex-col bg-[#14161c] overflow-hidden items-center ${viewMode === 'preview-only' ? 'w-full' : 'w-1/2'}`}>
                  {/* Top Status Notification */}
                  <div className="w-full px-4 py-2 bg-[#181a24] border-b border-[#262b3a] flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center space-x-2 flex-1 max-w-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-white font-medium text-[11px] flex items-center space-x-1.5">
                        <Edit3 className="w-3 h-3 text-[#c5a059]" />
                        <span>Preview is Live Editable: Click ANY text below to edit ? code updates automatically!</span>
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] font-mono text-gray-400">
                      <span>Device: <strong className="text-white capitalize">{deviceMode}</strong></span>
                    </div>
                  </div>

                  {/* Preview Container */}
                  <div className="flex-1 w-full p-2 sm:p-4 overflow-y-auto flex justify-center bg-[#0d0f14]">
                    <div className={`min-h-full transition-all duration-300 rounded-xl overflow-hidden border border-[#2b3040] shadow-2xl bg-[#1c1b18] text-[#f4efe4] font-sans select-text ${getDeviceWidthClass()}`}>
                      {selectedTarget === 'adventure' ? (
                        <div className="w-full flex flex-col">
                          {/* Brand Header */}
                          <header className="px-6 py-4 border-b border-[#2e2b24] flex items-center justify-between bg-[#141311]">
                            <div className="flex items-center space-x-3">
                              <div className="w-9 h-9 rounded-full border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
                                <Compass className="w-5 h-5 animate-spin" />
                              </div>
                              <div>
                                <div
                                  contentEditable
                                  suppressContentEditableWarning
                                  onBlur={(e) => handleVisualTextChange(adventureData.brandName, e.currentTarget.innerText)}
                                  className="font-['Oswald'] tracking-[0.2em] text-base font-bold uppercase text-white hover:outline-dashed hover:outline-1 hover:outline-[#c5a059] rounded px-1 cursor-text"
                                  title="Click to edit brand name"
                                >
                                  {adventureData.brandName}
                                </div>
                                <div
                                  contentEditable
                                  suppressContentEditableWarning
                                  onBlur={(e) => handleVisualTextChange(adventureData.brandSub, e.currentTarget.innerText)}
                                  className="font-mono text-[9px] tracking-widest text-[#c5a059] uppercase hover:outline-dashed hover:outline-1 hover:outline-[#c5a059] rounded px-1 cursor-text"
                                >
                                  {adventureData.brandSub}
                                </div>
                              </div>
                            </div>

                            <a
                              href="tel:+78005553535"
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) => handleVisualTextChange(adventureData.phone, e.currentTarget.innerText)}
                              className="hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#c5a059]/50 hover:bg-[#c5a059] hover:text-black text-xs font-mono text-[#c5a059] transition cursor-text"
                              title="Click to edit phone number"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>{adventureData.phone}</span>
                            </a>
                          </header>

                          {/* Hero */}
                          <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden p-6 sm:p-12 text-center">
                            <div className="absolute inset-0 z-0">
                              <img
                                src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=2000&q=85"
                                alt="Mountain Expedition Vista"
                                className="w-full h-full object-cover brightness-[0.7] contrast-[1.1]"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b18] via-black/40 to-black/70" />
                            </div>

                            <div className="relative z-10 max-w-3xl mx-auto space-y-4">
                              <div
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleVisualTextChange(adventureData.heroTagline, e.currentTarget.innerText)}
                                className="inline-block font-['Caveat'] text-2xl md:text-3xl text-[#e4c88a] hover:outline-dashed hover:outline-1 hover:outline-[#c5a059] rounded px-2 cursor-text"
                                title="Click to edit tagline"
                              >
                                {adventureData.heroTagline}
                              </div>

                              <h1
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleVisualTextChange(adventureData.heroTitle, e.currentTarget.innerText)}
                                className="font-['Oswald'] text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wide leading-tight text-white drop-shadow-lg hover:outline-dashed hover:outline-1 hover:outline-[#c5a059] rounded px-2 cursor-text"
                                title="Click to edit headline"
                              >
                                {adventureData.heroTitle}
                              </h1>

                              <p
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleVisualTextChange(adventureData.heroDesc, e.currentTarget.innerText)}
                                className="max-w-xl mx-auto text-xs sm:text-sm text-gray-300 font-light leading-relaxed hover:outline-dashed hover:outline-1 hover:outline-[#c5a059] rounded px-2 cursor-text"
                                title="Click to edit description"
                              >
                                {adventureData.heroDesc}
                              </p>

                              <div className="pt-2">
                                <button className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-['Oswald'] tracking-widest uppercase font-bold text-xs rounded-full transition shadow-xl">
                                  <span>{adventureData.heroBtnText}</span>
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </section>

                          {/* Torn Paper Edge SVG */}
                          <div className="relative w-full z-10 -mt-1 pointer-events-none">
                            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-8 md:h-12 fill-[#24221e]">
                              <path d="M0,0 L0,35 Q120,55 240,32 Q360,10 480,38 Q600,60 720,28 Q840,8 960,40 Q1080,58 1200,30 Q1320,12 1440,36 L1440,60 L0,60 Z" />
                            </svg>
                          </div>

                          {/* Route Filter */}
                          <section className="bg-[#24221e] border-y border-[#3d3830] py-6 px-6">
                            <div className="max-w-4xl mx-auto">
                              <div className="text-center mb-4">
                                <h2
                                  contentEditable
                                  suppressContentEditableWarning
                                  onBlur={(e) => handleVisualTextChange(adventureData.filterTitle, e.currentTarget.innerText)}
                                  className="font-['Oswald'] text-xl sm:text-2xl font-bold tracking-widest uppercase text-white hover:outline-dashed hover:outline-1 hover:outline-[#c5a059] rounded px-1 cursor-text"
                                >
                                  {adventureData.filterTitle}
                                </h2>
                                <p
                                  contentEditable
                                  suppressContentEditableWarning
                                  onBlur={(e) => handleVisualTextChange(adventureData.filterSub, e.currentTarget.innerText)}
                                  className="font-mono text-xs text-[#c5a059] mt-0.5 hover:outline-dashed hover:outline-1 hover:outline-[#c5a059] rounded px-1 cursor-text"
                                >
                                  {adventureData.filterSub}
                                </p>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-[#181714] border border-[#3a352c]">
                                <div className="space-y-1">
                                  <label className="font-['Oswald'] text-[10px] text-gray-400 tracking-wider uppercase block">???????</label>
                                  <select className="w-full bg-[#24221e] border border-[#3f3a30] text-xs text-white rounded p-1.5">
                                    <option>?????? (???????)</option>
                                    <option>?????? ????</option>
                                    <option>????????? ????</option>
                                  </select>
                                </div>
                                <div className="space-y-1">
                                  <label className="font-['Oswald'] text-[10px] text-gray-400 tracking-wider uppercase block">??? ??????</label>
                                  <select className="w-full bg-[#24221e] border border-[#3f3a30] text-xs text-white rounded p-1.5">
                                    <option>????? ?????</option>
                                    <option>?????? ???????????</option>
                                  </select>
                                </div>
                                <div className="space-y-1">
                                  <label className="font-['Oswald'] text-[10px] text-gray-400 tracking-wider uppercase block">?????</label>
                                  <select className="w-full bg-[#24221e] border border-[#3f3a30] text-xs text-white rounded p-1.5">
                                    <option>????????</option>
                                    <option>???????</option>
                                  </select>
                                </div>
                                <div className="flex items-end">
                                  <button className="w-full py-2 bg-[#c5a059] hover:bg-[#d8b46e] text-black font-['Oswald'] tracking-widest font-bold text-xs uppercase rounded transition">
                                    {adventureData.filterBtnText}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </section>

                          {/* Tour Cards */}
                          <section className="py-12 px-6 max-w-5xl mx-auto space-y-16">
                            {adventureData.tours.map((tour, idx) => (
                              <article
                                key={tour.number}
                                className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-12`}
                              >
                                <div className="relative w-full lg:w-1/2 group">
                                  <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => handleVisualTextChange(tour.watermark, e.currentTarget.innerText)}
                                    className="absolute -top-8 -left-4 z-0 font-['Caveat'] text-6xl sm:text-7xl text-[#c5a059]/20 select-none cursor-text hover:text-[#c5a059]/40"
                                    title="Click to edit watermark script"
                                  >
                                    {tour.watermark}
                                  </div>
                                  <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border border-[#3d372c]">
                                    <img src={tour.image} alt={tour.title} className="w-full h-[280px] sm:h-[340px] object-cover" />
                                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-[#c5a059]/40 text-[#c5a059] font-['Oswald'] text-xs font-bold">
                                      ??????? {tour.number}
                                    </div>
                                    <div
                                      contentEditable
                                      suppressContentEditableWarning
                                      onBlur={(e) => handleVisualTextChange(tour.elevation, e.currentTarget.innerText)}
                                      className="absolute bottom-3 right-3 bg-[#c5a059] text-black font-['Oswald'] text-xs px-2.5 py-0.5 rounded-full font-bold cursor-text hover:bg-white"
                                      title="Click to edit elevation"
                                    >
                                      {tour.elevation}
                                    </div>
                                  </div>
                                </div>

                                <div className="w-full lg:w-1/2 space-y-3">
                                  <div className="font-['Caveat'] text-xl text-[#e4c88a]">??????? #{tour.number}</div>
                                  <h3
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => handleVisualTextChange(tour.title, e.currentTarget.innerText)}
                                    className="font-['Oswald'] text-xl sm:text-2xl font-bold uppercase tracking-wide text-white leading-snug hover:outline-dashed hover:outline-1 hover:outline-[#c5a059] rounded px-1 cursor-text"
                                    title="Click to edit tour title"
                                  >
                                    {tour.title}
                                  </h3>
                                  <div className="space-y-1.5 pt-1 text-xs text-gray-300 font-light">
                                    <div
                                      contentEditable
                                      suppressContentEditableWarning
                                      onBlur={(e) => handleVisualTextChange(tour.duration, e.currentTarget.innerText)}
                                      className="hover:outline-dashed hover:outline-1 hover:outline-[#c5a059] rounded px-1 cursor-text"
                                    >
                                      ? {tour.duration}
                                    </div>
                                    <div
                                      contentEditable
                                      suppressContentEditableWarning
                                      onBlur={(e) => handleVisualTextChange(tour.dates, e.currentTarget.innerText)}
                                      className="hover:outline-dashed hover:outline-1 hover:outline-[#c5a059] rounded px-1 cursor-text"
                                    >
                                      ? {tour.dates}
                                    </div>
                                    <div
                                      contentEditable
                                      suppressContentEditableWarning
                                      onBlur={(e) => handleVisualTextChange(tour.length, e.currentTarget.innerText)}
                                      className="hover:outline-dashed hover:outline-1 hover:outline-[#c5a059] rounded px-1 cursor-text"
                                    >
                                      ? {tour.length}
                                    </div>
                                  </div>
                                  <div className="pt-3">
                                    <button className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-gradient-to-r from-[#c5a059] to-[#96793f] text-black font-['Oswald'] uppercase font-bold text-xs tracking-widest rounded-lg transition shadow-md hover:brightness-110">
                                      <span>????????? ? ????????</span>
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </article>
                            ))}
                          </section>

                          <footer className="border-t border-[#332e25] bg-[#141311] py-6 text-center text-xs font-mono text-gray-500">
                            <p>? 2026 ????????? ?? ??????. ??? ????? ????????.</p>
                          </footer>
                        </div>
                      ) : (
                        /* Canvas Wireframe Preview */
                        <div
                          style={{
                            width: '100%',
                            minHeight: `${canvasDimensions.height}px`,
                            position: 'relative',
                            backgroundColor: canvasBg.solidColor || '#0c0d0e'
                          }}
                          className="overflow-hidden"
                        >
                          {canvasElementsState.map((el, i) => (
                            <div
                              key={el.id}
                              style={{
                                position: 'absolute',
                                left: `${el.x}px`,
                                top: `${el.y}px`,
                                width: `${el.width}px`,
                                height: `${el.height}px`,
                                zIndex: el.zIndex || i + 1,
                                transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined
                              }}
                              className="group"
                            >
                              {el.type === 'text' && (
                                <div
                                  contentEditable
                                  suppressContentEditableWarning
                                  onBlur={(e) => handleVisualTextChange(el.text, e.currentTarget.innerText)}
                                  style={{
                                    fontFamily: el.fontFamily || 'serif',
                                    fontSize: `${el.fontSize || 32}px`,
                                    fontWeight: el.fontWeight || '400',
                                    color: el.textColor || '#f5f2eb',
                                    textAlign: el.textAlign || 'left',
                                    lineHeight: '1.15'
                                  }}
                                  className="w-full h-full hover:outline-dashed hover:outline-1 hover:outline-[#c5a059] rounded px-1 cursor-text"
                                  title="Click to edit text directly"
                                >
                                  {el.text}
                                </div>
                              )}
                              {el.type === 'image' && (
                                <img
                                  src={el.imageUrl || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'}
                                  alt="Asset"
                                  className="w-full h-full object-cover rounded-lg shadow"
                                />
                              )}
                              {el.type === 'shape' && (
                                <div
                                  style={{
                                    backgroundColor: el.bgColor || '#15171d',
                                    borderRadius: el.borderRadius ? `${el.borderRadius}px` : undefined,
                                    border: el.borderWidth ? `${el.borderWidth}px solid ${el.borderColor || '#c5a059'}` : undefined
                                  }}
                                  className="w-full h-full shadow"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
