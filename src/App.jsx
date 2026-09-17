import React, { useState } from 'react';
import { CanvasProvider } from './context/CanvasContext';
import { DesignToolbar } from './components/toolbar/DesignToolbar';
import { FreeformCanvas } from './components/canvas/FreeformCanvas';
import { ElementInspector } from './components/inspector/ElementInspector';
import { ShapesAndGridsDrawer } from './components/sidebar/ShapesAndGridsDrawer';
import { TemplatesDrawer } from './components/sidebar/TemplatesDrawer';
import { LinesAndFlourishesDrawer } from './components/sidebar/LinesAndFlourishesDrawer';
import { ImageGalleryDrawer } from './components/sidebar/ImageGalleryDrawer';
import { FontGalleryDrawer } from './components/sidebar/FontGalleryDrawer';
import { ScreenshotGridModal } from './components/modals/ScreenshotGridModal';
import { CodeGeneratorModal } from './components/modals/CodeGeneratorModal';
import { OnboardingModal } from './components/modals/OnboardingModal';
import { AnimationsModal } from './components/modals/AnimationsModal';
import { Typography31Modal } from './components/modals/Typography31Modal';
import { AdventureWireframeSite } from './components/expedition/AdventureWireframeSite';
import { ArchitectureMonographSite } from './components/architecture/ArchitectureMonographSite';
import { VeridanRealEstateSite } from './components/architecture/VeridanRealEstateSite';

function AppContent() {
  const [currentView, setCurrentView] = useState('architecture'); // 'architecture' | 'studio' | 'adventure-site'
  const [isLinesOpen, setIsLinesOpen] = useState(false);
  const [isGridsAndShapesOpen, setIsGridsAndShapesOpen] = useState(false);
  const [initialShapesTab, setInitialShapesTab] = useState('grids');
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);
  const [isFontGalleryOpen, setIsFontGalleryOpen] = useState(false);
  const [isScreenshotGridOpen, setIsScreenshotGridOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isAnimationsModalOpen, setIsAnimationsModalOpen] = useState(false);
  const [isTypographyModalOpen, setIsTypographyModalOpen] = useState(false);
  const [selectedTypographyStyle, setSelectedTypographyStyle] = useState('editorial');

  // Modern Animations State
  const [enabledAnimations, setEnabledAnimations] = useState({
    'tilt-3d': true,
    'trail-draw': true,
    'fade-up-stagger': true,
    'marquee-loop': true,
    'magnetic-button': true,
    'glow-pulse': true,
    'zoom-reveal': true,
    'cursor-glow': false
  });

  const handleToggleAnimation = (animId) => {
    setEnabledAnimations((prev) => ({ ...prev, [animId]: !prev[animId] }));
  };

  const handleEnableAllAnimations = () => {
    setEnabledAnimations({
      'tilt-3d': true,
      'trail-draw': true,
      'fade-up-stagger': true,
      'marquee-loop': true,
      'magnetic-button': true,
      'glow-pulse': true,
      'zoom-reveal': true,
      'cursor-glow': true
    });
  };

  const handleDisableAllAnimations = () => {
    setEnabledAnimations({
      'tilt-3d': false,
      'trail-draw': false,
      'fade-up-stagger': false,
      'marquee-loop': false,
      'magnetic-button': false,
      'glow-pulse': false,
      'zoom-reveal': false,
      'cursor-glow': false
    });
  };

  if (currentView === 'architecture') {
    return (
      <>
        {/* Floating View Switcher Bar */}
        <div className="fixed top-3 right-4 z-[60] flex items-center bg-[#181b24]/90 backdrop-blur-md p-1 rounded-xl border border-[#2c3242] shadow-2xl">
          <div className="flex items-center space-x-1.5 px-3 py-1 bg-[#f05a36] text-white font-bold text-xs rounded-lg shadow-sm">
            <span>🏛️</span>
            <span>Architecture Monograph</span>
          </div>
          <button
            onClick={() => setCurrentView('studio')}
            className="flex items-center space-x-1.5 px-3 py-1 text-gray-300 hover:text-white text-xs font-sans rounded-lg transition"
            title="Switch to Studio Canvas"
          >
            <span>🎨</span>
            <span>Studio</span>
          </button>
          <button
            onClick={() => setCurrentView('adventure-site')}
            className="flex items-center space-x-1.5 px-3 py-1 text-gray-300 hover:text-white text-xs font-sans rounded-lg transition"
            title="Switch to Russian Adventure Site"
          >
            <span>🏔️</span>
            <span>Adventure</span>
          </button>
        </div>

        <VeridanRealEstateSite />

        <CodeGeneratorModal
          isOpen={isCodeModalOpen}
          onClose={() => setIsCodeModalOpen(false)}
        />
      </>
    );
  }

  if (currentView === 'adventure-site') {
    return (
      <>
        <AdventureWireframeSite
          onBackToCanvas={() => setCurrentView('studio')}
          onOpenCodeModal={() => setIsCodeModalOpen(true)}
          onOpenAnimationsModal={() => setIsAnimationsModalOpen(true)}
          onOpenTypographyModal={() => setIsTypographyModalOpen(true)}
          enabledAnimations={enabledAnimations}
          selectedTypographyStyle={selectedTypographyStyle}
          onSelectTypographyStyle={(styleId) => setSelectedTypographyStyle(styleId)}
        />
        <CodeGeneratorModal
          isOpen={isCodeModalOpen}
          onClose={() => setIsCodeModalOpen(false)}
        />
        <AnimationsModal
          isOpen={isAnimationsModalOpen}
          onClose={() => setIsAnimationsModalOpen(false)}
          enabledAnimations={enabledAnimations}
          onToggleAnimation={handleToggleAnimation}
          onEnableAll={handleEnableAllAnimations}
          onDisableAll={handleDisableAllAnimations}
        />
        <Typography31Modal
          isOpen={isTypographyModalOpen}
          onClose={() => setIsTypographyModalOpen(false)}
          activeStyleId={selectedTypographyStyle}
          onSelectStyle={(id) => setSelectedTypographyStyle(id)}
          onApplyStyleToSite={(style) => setSelectedTypographyStyle(style.id)}
        />
      </>
    );
  }

  const closeAllDrawers = () => {
    setIsLinesOpen(false);
    setIsGridsAndShapesOpen(false);
    setIsTemplatesOpen(false);
    setIsImageGalleryOpen(false);
    setIsFontGalleryOpen(false);
  };

  const handleOpenLines = () => {
    closeAllDrawers();
    setIsLinesOpen(true);
  };

  const handleOpenGridsAndShapes = (tab = 'grids') => {
    closeAllDrawers();
    setInitialShapesTab(tab);
    setIsGridsAndShapesOpen(true);
  };

  const handleOpenTemplates = () => {
    closeAllDrawers();
    setIsTemplatesOpen(true);
  };

  const handleOpenImages = () => {
    closeAllDrawers();
    setIsImageGalleryOpen(true);
  };

  const handleOpenFonts = () => {
    closeAllDrawers();
    setIsFontGalleryOpen(true);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#090a0c] text-[#f5f2eb] overflow-hidden">
      {/* Top Design Toolbar */}
      <DesignToolbar
        onOpenLines={handleOpenLines}
        onOpenGridsAndShapes={handleOpenGridsAndShapes}
        onOpenTemplates={handleOpenTemplates}
        onOpenImageGallery={handleOpenImages}
        onOpenFontGallery={handleOpenFonts}
        onOpenScreenshotGrid={() => setIsScreenshotGridOpen(true)}
        onOpenHelpModal={() => setIsHelpOpen(true)}
        onOpenCodeGenerator={() => setIsCodeModalOpen(true)}
        onSwitchToAdventure={() => setCurrentView('adventure-site')}
        onOpenAnimationsModal={() => setIsAnimationsModalOpen(true)}
        onOpenTypographyModal={() => setIsTypographyModalOpen(true)}
      />

      {/* Main Studio Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Infinite Freeform Canvas */}
        <main className="flex-1 relative overflow-hidden">
          <FreeformCanvas />
        </main>

        {/* Right Styling, Scaling & Elementor Inspector */}
        <ElementInspector />
      </div>

      {/* Drawers */}
      <LinesAndFlourishesDrawer
        isOpen={isLinesOpen}
        onClose={() => setIsLinesOpen(false)}
      />

      <ShapesAndGridsDrawer
        isOpen={isGridsAndShapesOpen}
        initialTab={initialShapesTab}
        onClose={() => setIsGridsAndShapesOpen(false)}
      />

      <TemplatesDrawer
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
      />

      <ImageGalleryDrawer
        isOpen={isImageGalleryOpen}
        onClose={() => setIsImageGalleryOpen(false)}
      />

      <FontGalleryDrawer
        isOpen={isFontGalleryOpen}
        onClose={() => setIsFontGalleryOpen(false)}
      />

      {/* Screenshot to Grid Modal */}
      <ScreenshotGridModal
        isOpen={isScreenshotGridOpen}
        onClose={() => setIsScreenshotGridOpen(false)}
      />

      {/* Help Modal */}
      <OnboardingModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* ⚡ Production Clean Code Generator Modal (With Permission Gate) */}
      <CodeGeneratorModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />

      {/* ✨ Modern Animations Selector Popup */}
      <AnimationsModal
        isOpen={isAnimationsModalOpen}
        onClose={() => setIsAnimationsModalOpen(false)}
        enabledAnimations={enabledAnimations}
        onToggleAnimation={handleToggleAnimation}
        onEnableAll={handleEnableAllAnimations}
        onDisableAll={handleDisableAllAnimations}
      />

      {/* ✍️ 31 Typography Styles Suite Modal */}
      <Typography31Modal
        isOpen={isTypographyModalOpen}
        onClose={() => setIsTypographyModalOpen(false)}
        activeStyleId={selectedTypographyStyle}
        onSelectStyle={(id) => setSelectedTypographyStyle(id)}
        onApplyStyleToSite={(style) => setSelectedTypographyStyle(style.id)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CanvasProvider>
      <AppContent />
    </CanvasProvider>
  );
}
