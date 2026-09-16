// Comprehensive Website Wireframe Grids (Real Estate, AI/Tech, Columns, Rows, Modular, Hierarchic Bento)

export const WEBSITE_GRIDS = [
  // ==========================================
  // 1. REAL ESTATE & ARCHITECTURAL ESTATES
  // ==========================================
  {
    id: 'grid-re-hero-split',
    name: 'Real Estate Prime Estate Hero (50/50)',
    category: 'Real Estate',
    description: 'Left 50% high-res property panorama, right 50% price, specs (beds/baths/sqft) & booking inquiry',
    width: 1320,
    height: 640,
    subElements: [
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 0,
        relY: 0,
        width: 720,
        height: 640,
        bgType: 'gradient',
        bgGradient: { from: '#1a1d24', to: '#0f1116', angle: 135 },
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#2f3442'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 750,
        relY: 0,
        width: 570,
        height: 640,
        bgType: 'solid',
        bgColor: '#12141a',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#282c37'
      },
      {
        type: 'text',
        relX: 790,
        relY: 50,
        width: 480,
        height: 30,
        text: 'COSTA SMERALDA, SARDINIA',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 12,
        fontWeight: '500',
        textColor: '#c5a059',
        letterSpacing: '0.15em'
      },
      {
        type: 'text',
        relX: 790,
        relY: 95,
        width: 490,
        height: 120,
        text: 'Villa Bellissima Sanctuario',
        fontFamily: '"Playfair Display", serif',
        fontSize: 48,
        fontWeight: '600',
        textColor: '#f5f2eb'
      },
      {
        type: 'text',
        relX: 790,
        relY: 230,
        width: 480,
        height: 40,
        text: '€38,500,000 • PRIVATE LISTING',
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 26,
        fontWeight: '400',
        textColor: '#c5a059'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 790,
        relY: 290,
        width: 490,
        height: 100,
        bgType: 'solid',
        bgColor: '#181b22',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#2c3140'
      },
      {
        type: 'text',
        relX: 810,
        relY: 325,
        width: 450,
        height: 30,
        text: '6 BEDROOMS   •   8 BATHS   •   14,200 SQ FT   •   PRIVATE HELIPAD',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 10,
        fontWeight: '500',
        textColor: '#9ca3af',
        textAlign: 'center'
      },
      {
        type: 'shape',
        shapeType: 'pill',
        relX: 790,
        relY: 420,
        width: 240,
        height: 52,
        bgType: 'solid',
        bgColor: '#c5a059',
        borderRadius: 10,
        borderWidth: 0,
        borderColor: 'transparent'
      },
      {
        type: 'text',
        relX: 805,
        relY: 436,
        width: 210,
        height: 24,
        text: 'SCHEDULE PRIVATE VIEWING',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontSize: 11,
        fontWeight: '700',
        textColor: '#0c0d0e',
        textAlign: 'center',
        letterSpacing: '0.1em'
      }
    ]
  },
  {
    id: 'grid-re-gallery-panorama',
    name: 'Real Estate Panorama + 4 Sub-Photos',
    category: 'Real Estate',
    description: '1 Dominant main property photo on top + 4 horizontal sub-gallery photos below (Image 1 style)',
    width: 1280,
    height: 680,
    subElements: [
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 0,
        relY: 0,
        width: 1280,
        height: 460,
        bgType: 'gradient',
        bgGradient: { from: '#1a1d26', to: '#0f1117', angle: 145 },
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#2e3444'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 0,
        relY: 480,
        width: 300,
        height: 200,
        bgType: 'solid',
        bgColor: '#14161e',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#282c38'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 325,
        relY: 480,
        width: 300,
        height: 200,
        bgType: 'solid',
        bgColor: '#14161e',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#282c38'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 650,
        relY: 480,
        width: 300,
        height: 200,
        bgType: 'solid',
        bgColor: '#14161e',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#282c38'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 975,
        relY: 480,
        width: 305,
        height: 200,
        bgType: 'solid',
        bgColor: '#14161e',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#282c38'
      }
    ]
  },
  {
    id: 'grid-re-3cards-listing',
    name: 'Real Estate 3-Property Card Grid',
    category: 'Real Estate',
    description: 'Three high-end property cards with image thumbnail, price tag & details',
    width: 1280,
    height: 520,
    subElements: [
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 0,
        relY: 0,
        width: 400,
        height: 520,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#282c37'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 20,
        relY: 20,
        width: 360,
        height: 280,
        bgType: 'gradient',
        bgGradient: { from: '#232734', to: '#151720', angle: 135 },
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#303646'
      },
      {
        type: 'text',
        relX: 25,
        relY: 320,
        width: 350,
        height: 30,
        text: '$14,500,000 • ASPEN CHALET',
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 20,
        fontWeight: '600',
        textColor: '#c5a059'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 440,
        relY: 0,
        width: 400,
        height: 520,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#282c37'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 460,
        relY: 20,
        width: 360,
        height: 280,
        bgType: 'gradient',
        bgGradient: { from: '#232734', to: '#151720', angle: 135 },
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#303646'
      },
      {
        type: 'text',
        relX: 465,
        relY: 320,
        width: 350,
        height: 30,
        text: '$28,000,000 • BEL AIR RESIDENCE',
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 20,
        fontWeight: '600',
        textColor: '#c5a059'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 880,
        relY: 0,
        width: 400,
        height: 520,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#282c37'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 900,
        relY: 20,
        width: 360,
        height: 280,
        bgType: 'gradient',
        bgGradient: { from: '#232734', to: '#151720', angle: 135 },
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#303646'
      },
      {
        type: 'text',
        relX: 905,
        relY: 320,
        width: 350,
        height: 30,
        text: '€42,000,000 • LAKE COMO PALAZZO',
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 20,
        fontWeight: '600',
        textColor: '#c5a059'
      }
    ]
  },

  // ==========================================
  // 2. AI + DEEPTECH & SAAS COMMERCIAL LAYOUTS
  // ==========================================
  {
    id: 'grid-ai-dashboard-shell',
    name: 'AI / Tech Platform Dashboard Shell',
    category: 'AI & Tech',
    description: 'SaaS layout with vertical navigation sidebar, top analytics metrics bar & central telemetry viewport',
    width: 1320,
    height: 720,
    subElements: [
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 0,
        relY: 0,
        width: 240,
        height: 720,
        bgType: 'solid',
        bgColor: '#0f1115',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#242833'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 260,
        relY: 0,
        width: 1060,
        height: 80,
        bgType: 'solid',
        bgColor: '#12151b',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#252934'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 260,
        relY: 100,
        width: 720,
        height: 400,
        bgType: 'gradient',
        bgGradient: { from: '#171a23', to: '#0e1015', angle: 135 },
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#2c3140'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 1000,
        relY: 100,
        width: 320,
        height: 400,
        bgType: 'solid',
        bgColor: '#13161c',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#282d38'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 260,
        relY: 520,
        width: 520,
        height: 200,
        bgType: 'solid',
        bgColor: '#13161c',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#282d38'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 800,
        relY: 520,
        width: 520,
        height: 200,
        bgType: 'solid',
        bgColor: '#13161c',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#282d38'
      }
    ]
  },
  {
    id: 'grid-ai-bento-tech',
    name: 'AI DeepTech 4-Box Bento Grid',
    category: 'AI & Tech',
    description: 'Cyber noir luxury Bento layout for neural networks, latency & LLM specs',
    width: 1280,
    height: 600,
    subElements: [
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 0,
        relY: 0,
        width: 800,
        height: 380,
        bgType: 'gradient',
        bgGradient: { from: '#181b24', to: '#0d0f14', angle: 145 },
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#2e3544'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 825,
        relY: 0,
        width: 455,
        height: 380,
        bgType: 'solid',
        bgColor: '#13161d',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#292e3a'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 0,
        relY: 405,
        width: 440,
        height: 195,
        bgType: 'solid',
        bgColor: '#13161d',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#292e3a'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 465,
        relY: 405,
        width: 815,
        height: 195,
        bgType: 'gradient',
        bgGradient: { from: '#161922', to: '#0f1117', angle: 125 },
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#2c3240'
      }
    ]
  },

  // ==========================================
  // 3. COLUMNS SYSTEMS (from User Image 1)
  // ==========================================
  {
    id: 'grid-cols-1',
    name: '1 Column (Full Span Container)',
    category: 'Columns',
    description: 'Single full-width structural container for focal statement or cinema hero',
    width: 1200,
    height: 500,
    subElements: [
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 0,
        relY: 0,
        width: 1200,
        height: 500,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#282d38'
      }
    ]
  },
  {
    id: 'grid-cols-2',
    name: '2 Columns (50 / 50 Equal)',
    category: 'Columns',
    description: 'Two vertical equal columns dividing layout into balanced sections',
    width: 1200,
    height: 550,
    subElements: [
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 0,
        relY: 0,
        width: 585,
        height: 550,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#282d38'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 615,
        relY: 0,
        width: 585,
        height: 550,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#282d38'
      }
    ]
  },
  {
    id: 'grid-cols-3',
    name: '3 Columns (33 / 33 / 33 Equal)',
    category: 'Columns',
    description: 'Three vertical columns for balanced trio cards',
    width: 1200,
    height: 520,
    subElements: [
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 0,
        relY: 0,
        width: 380,
        height: 520,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#282d38'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 410,
        relY: 0,
        width: 380,
        height: 520,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#282d38'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 820,
        relY: 0,
        width: 380,
        height: 520,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#282d38'
      }
    ]
  },
  {
    id: 'grid-cols-4',
    name: '4 Columns (25 / 25 / 25 / 25 Equal)',
    category: 'Columns',
    description: 'Four vertical columns for metrics, feature columns or mini galleries',
    width: 1200,
    height: 500,
    subElements: [
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 0,
        relY: 0,
        width: 280,
        height: 500,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#282d38'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 305,
        relY: 0,
        width: 280,
        height: 500,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#282d38'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 610,
        relY: 0,
        width: 280,
        height: 500,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#282d38'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 915,
        relY: 0,
        width: 285,
        height: 500,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#282d38'
      }
    ]
  },

  // ==========================================
  // 4. ROWS SYSTEMS (from User Image 1)
  // ==========================================
  {
    id: 'grid-rows-2',
    name: '2 Horizontal Rows',
    category: 'Rows',
    description: 'Two stacked horizontal bands for split section dividers',
    width: 1200,
    height: 480,
    subElements: [
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 0,
        relY: 0,
        width: 1200,
        height: 225,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#282d38'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 0,
        relY: 255,
        width: 1200,
        height: 225,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#282d38'
      }
    ]
  },
  {
    id: 'grid-rows-3',
    name: '3 Horizontal Rows',
    category: 'Rows',
    description: 'Three stacked horizontal strip bars for process or steps',
    width: 1200,
    height: 540,
    subElements: [
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 0,
        relY: 0,
        width: 1200,
        height: 160,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#282d38'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 0,
        relY: 190,
        width: 1200,
        height: 160,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#282d38'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        relX: 0,
        relY: 380,
        width: 1200,
        height: 160,
        bgType: 'solid',
        bgColor: '#13151b',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#282d38'
      }
    ]
  },
  {
    id: 'grid-rows-4',
    name: '4 Horizontal Rows',
    category: 'Rows',
    description: 'Four stacked slim horizontal rows for FAQs or tabular lists',
    width: 1200,
    height: 520,
    subElements: [
      { type: 'shape', shapeType: 'rectangle', relX: 0, relY: 0, width: 1200, height: 115, bgType: 'solid', bgColor: '#13151b', borderRadius: 10, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 0, relY: 135, width: 1200, height: 115, bgType: 'solid', bgColor: '#13151b', borderRadius: 10, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 0, relY: 270, width: 1200, height: 115, bgType: 'solid', bgColor: '#13151b', borderRadius: 10, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 0, relY: 405, width: 1200, height: 115, bgType: 'solid', bgColor: '#13151b', borderRadius: 10, borderWidth: 1, borderColor: '#282d38' }
    ]
  },

  // ==========================================
  // 5. MODULAR MATRIX (from User Image 1 & 2)
  // ==========================================
  {
    id: 'grid-modular-2x3',
    name: '2 Rows × 3 Columns (6 Equal Cards)',
    category: 'Modular Matrix',
    description: 'Classic 6-cell matrix for catalog showcases, features, or team members',
    width: 1200,
    height: 580,
    subElements: [
      { type: 'shape', shapeType: 'rectangle', relX: 0, relY: 0, width: 380, height: 270, bgType: 'solid', bgColor: '#13151b', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 410, relY: 0, width: 380, height: 270, bgType: 'solid', bgColor: '#13151b', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 820, relY: 0, width: 380, height: 270, bgType: 'solid', bgColor: '#13151b', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 0, relY: 300, width: 380, height: 270, bgType: 'solid', bgColor: '#13151b', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 410, relY: 300, width: 380, height: 270, bgType: 'solid', bgColor: '#13151b', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 820, relY: 300, width: 380, height: 270, bgType: 'solid', bgColor: '#13151b', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' }
    ]
  },
  {
    id: 'grid-modular-hero-top-2bottom',
    name: 'Hero Top (Large) + 2 Sub-Cards Bottom',
    category: 'Modular Matrix',
    description: 'Prominent landscape hero container on top with 2 supporting columns below (from Image 1 & 2)',
    width: 1200,
    height: 640,
    subElements: [
      { type: 'shape', shapeType: 'rectangle', relX: 0, relY: 0, width: 1200, height: 380, bgType: 'gradient', bgGradient: { from: '#181b24', to: '#0d0f14', angle: 135 }, borderRadius: 14, borderWidth: 1, borderColor: '#2c3140' },
      { type: 'shape', shapeType: 'rectangle', relX: 0, relY: 410, width: 585, height: 230, bgType: 'solid', bgColor: '#13151b', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 615, relY: 410, width: 585, height: 230, bgType: 'solid', bgColor: '#13151b', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' }
    ]
  },
  {
    id: 'grid-modular-top2-bottom3',
    name: 'Asymmetric Top 2 Cols + Bottom 3 Cols',
    category: 'Modular Matrix',
    description: 'Top row split 50/50, bottom row split into 3 equal cards (from Image 2)',
    width: 1200,
    height: 600,
    subElements: [
      { type: 'shape', shapeType: 'rectangle', relX: 0, relY: 0, width: 585, height: 280, bgType: 'solid', bgColor: '#13151b', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 615, relY: 0, width: 585, height: 280, bgType: 'solid', bgColor: '#13151b', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 0, relY: 310, width: 380, height: 290, bgType: 'solid', bgColor: '#13151b', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 410, relY: 310, width: 380, height: 290, bgType: 'solid', bgColor: '#13151b', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 820, relY: 310, width: 380, height: 290, bgType: 'solid', bgColor: '#13151b', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' }
    ]
  },

  // ==========================================
  // 6. HIERARCHIC & BENTO LAYOUTS (from Image 2)
  // ==========================================
  {
    id: 'grid-bento-hero-3bottom',
    name: 'Large Hero Left + 2 Stacked Right + 3 Bottom Cards',
    category: 'Hierarchic Bento',
    description: 'Layout 6 from Image 2: Large primary block with 2 right side cards and 3 equal bottom cards',
    width: 1240,
    height: 660,
    subElements: [
      { type: 'shape', shapeType: 'rectangle', relX: 0, relY: 0, width: 800, height: 420, bgType: 'gradient', bgGradient: { from: '#1a1d26', to: '#0f1116', angle: 145 }, borderRadius: 16, borderWidth: 1, borderColor: '#2d3342' },
      { type: 'shape', shapeType: 'rectangle', relX: 830, relY: 0, width: 410, height: 200, bgType: 'solid', bgColor: '#13151c', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 830, relY: 220, width: 410, height: 200, bgType: 'solid', bgColor: '#13151c', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 0, relY: 450, width: 395, height: 210, bgType: 'solid', bgColor: '#13151c', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 422, relY: 450, width: 395, height: 210, bgType: 'solid', bgColor: '#13151c', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 845, relY: 450, width: 395, height: 210, bgType: 'solid', bgColor: '#13151c', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' }
    ]
  },
  {
    id: 'grid-bento-staggered-masonry',
    name: '3-Column Staggered Center Split',
    category: 'Hierarchic Bento',
    description: 'Layout 4 from Image 2: Left column tall, Center column split into 2 horizontal cards, Right column tall',
    width: 1200,
    height: 600,
    subElements: [
      { type: 'shape', shapeType: 'rectangle', relX: 0, relY: 0, width: 380, height: 600, bgType: 'solid', bgColor: '#13151b', borderRadius: 14, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 410, relY: 0, width: 380, height: 285, bgType: 'solid', bgColor: '#13151b', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 410, relY: 315, width: 380, height: 285, bgType: 'solid', bgColor: '#13151b', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 820, relY: 0, width: 380, height: 600, bgType: 'solid', bgColor: '#13151b', borderRadius: 14, borderWidth: 1, borderColor: '#282d38' }
    ]
  },
  {
    id: 'grid-bento-asymmetric-multicell',
    name: '50% Left + Right 1 Top & 2 Micro Bottom',
    category: 'Hierarchic Bento',
    description: 'Layout 7 from Image 2: Left half dominant, Right side split into 1 top card and 2 bottom side-by-side cards',
    width: 1200,
    height: 580,
    subElements: [
      { type: 'shape', shapeType: 'rectangle', relX: 0, relY: 0, width: 580, height: 580, bgType: 'gradient', bgGradient: { from: '#181b24', to: '#0d0f14', angle: 145 }, borderRadius: 16, borderWidth: 1, borderColor: '#2e3444' },
      { type: 'shape', shapeType: 'rectangle', relX: 610, relY: 0, width: 590, height: 320, bgType: 'solid', bgColor: '#13151c', borderRadius: 14, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 610, relY: 350, width: 285, height: 230, bgType: 'solid', bgColor: '#13151c', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 915, relY: 350, width: 285, height: 230, bgType: 'solid', bgColor: '#13151c', borderRadius: 12, borderWidth: 1, borderColor: '#282d38' }
    ]
  },
  {
    id: 'grid-bento-subway-brick',
    name: 'Staggered Brick / Subway Mosaic Grid',
    category: 'Hierarchic Bento',
    description: 'Layout 9 from Image 2: Row 1 has 5 modules, Row 2 has 3 wide cards, Row 3 has 4 modules',
    width: 1240,
    height: 540,
    subElements: [
      // Row 1 (5 modules)
      { type: 'shape', shapeType: 'rectangle', relX: 0, relY: 0, width: 235, height: 160, bgType: 'solid', bgColor: '#13151b', borderRadius: 10, borderWidth: 1, borderColor: '#262a34' },
      { type: 'shape', shapeType: 'rectangle', relX: 250, relY: 0, width: 235, height: 160, bgType: 'solid', bgColor: '#13151b', borderRadius: 10, borderWidth: 1, borderColor: '#262a34' },
      { type: 'shape', shapeType: 'rectangle', relX: 500, relY: 0, width: 240, height: 160, bgType: 'solid', bgColor: '#13151b', borderRadius: 10, borderWidth: 1, borderColor: '#262a34' },
      { type: 'shape', shapeType: 'rectangle', relX: 755, relY: 0, width: 235, height: 160, bgType: 'solid', bgColor: '#13151b', borderRadius: 10, borderWidth: 1, borderColor: '#262a34' },
      { type: 'shape', shapeType: 'rectangle', relX: 1005, relY: 0, width: 235, height: 160, bgType: 'solid', bgColor: '#13151b', borderRadius: 10, borderWidth: 1, borderColor: '#262a34' },
      // Row 2 (3 wide modules)
      { type: 'shape', shapeType: 'rectangle', relX: 0, relY: 185, width: 400, height: 160, bgType: 'solid', bgColor: '#151720', borderRadius: 10, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 420, relY: 185, width: 400, height: 160, bgType: 'solid', bgColor: '#151720', borderRadius: 10, borderWidth: 1, borderColor: '#282d38' },
      { type: 'shape', shapeType: 'rectangle', relX: 840, relY: 185, width: 400, height: 160, bgType: 'solid', bgColor: '#151720', borderRadius: 10, borderWidth: 1, borderColor: '#282d38' },
      // Row 3 (4 modules)
      { type: 'shape', shapeType: 'rectangle', relX: 0, relY: 370, width: 295, height: 170, bgType: 'solid', bgColor: '#13151b', borderRadius: 10, borderWidth: 1, borderColor: '#262a34' },
      { type: 'shape', shapeType: 'rectangle', relX: 315, relY: 370, width: 295, height: 170, bgType: 'solid', bgColor: '#13151b', borderRadius: 10, borderWidth: 1, borderColor: '#262a34' },
      { type: 'shape', shapeType: 'rectangle', relX: 630, relY: 370, width: 295, height: 170, bgType: 'solid', bgColor: '#13151b', borderRadius: 10, borderWidth: 1, borderColor: '#262a34' },
      { type: 'shape', shapeType: 'rectangle', relX: 945, relY: 370, width: 295, height: 170, bgType: 'solid', bgColor: '#13151b', borderRadius: 10, borderWidth: 1, borderColor: '#262a34' }
    ]
  }
];

// 35+ Vector Shapes from user image (Polygons, Triangles, Abstract, Asymmetric, Curves)
export const VECTOR_SHAPES = [
  // 1. Basic Geometry
  { id: 'shape-square', name: 'Square', category: 'Basic', width: 140, height: 140, type: 'svg', path: 'M0,0 H100 V100 H0 Z' },
  { id: 'shape-rectangle', name: 'Rectangle', category: 'Basic', width: 220, height: 140, type: 'svg', path: 'M0,0 H100 V65 H0 Z' },
  { id: 'shape-circle', name: 'Circle', category: 'Basic', width: 140, height: 140, type: 'svg', path: 'M50,0 A50,50 0 1,1 50,100 A50,50 0 1,1 50,0 Z' },
  { id: 'shape-oval', name: 'Oval', category: 'Basic', width: 220, height: 130, type: 'svg', path: 'M50,10 C80,10 100,30 100,50 C100,70 80,90 50,90 C20,90 0,70 0,50 C0,30 20,10 50,10 Z' },

  // 2. Triangles
  { id: 'shape-tri-equilateral', name: 'Equilateral Triangle', category: 'Triangles', width: 140, height: 140, type: 'svg', path: 'M50,0 L100,100 L0,100 Z' },
  { id: 'shape-tri-right', name: 'Right Triangle', category: 'Triangles', width: 140, height: 140, type: 'svg', path: 'M0,0 L100,100 L0,100 Z' },
  { id: 'shape-tri-isosceles', name: 'Isosceles Triangle', category: 'Triangles', width: 120, height: 160, type: 'svg', path: 'M50,0 L100,100 L0,100 Z' },
  { id: 'shape-tri-obtuse', name: 'Obtuse Triangle', category: 'Triangles', width: 180, height: 110, type: 'svg', path: 'M0,100 L100,0 L100,100 Z' },
  { id: 'shape-tri-scalene', name: 'Scalene Triangle', category: 'Triangles', width: 160, height: 130, type: 'svg', path: 'M20,0 L100,80 L0,100 Z' },

  // 3. Polygons
  { id: 'shape-pentagon', name: 'Pentagon', category: 'Polygons', width: 140, height: 140, type: 'svg', path: 'M50,0 L100,38 L81,100 L19,100 L0,38 Z' },
  { id: 'shape-hexagon', name: 'Hexagon', category: 'Polygons', width: 150, height: 130, type: 'svg', path: 'M25,0 L75,0 L100,50 L75,100 L25,100 L0,50 Z' },
  { id: 'shape-heptagon', name: 'Heptagon', category: 'Polygons', width: 140, height: 140, type: 'svg', path: 'M50,0 L89,19 L100,62 L74,97 L26,97 L0,62 L11,19 Z' },
  { id: 'shape-octagon', name: 'Octagon', category: 'Polygons', width: 140, height: 140, type: 'svg', path: 'M30,0 L70,0 L100,30 L100,70 L70,100 L30,100 L0,70 L0,30 Z' },
  { id: 'shape-nonagon', name: 'Nonagon', category: 'Polygons', width: 140, height: 140, type: 'svg', path: 'M50,0 L82,12 L100,41 L94,75 L67,98 L33,98 L6,75 L0,41 L18,12 Z' },
  { id: 'shape-decagon', name: 'Decagon', category: 'Polygons', width: 140, height: 140, type: 'svg', path: 'M50,0 L79,10 L98,35 L98,65 L79,90 L50,100 L21,90 L2,65 L2,35 L21,10 Z' },
  { id: 'shape-dodecagon', name: 'Dodecagon', category: 'Polygons', width: 140, height: 140, type: 'svg', path: 'M50,0 L75,7 L93,25 L100,50 L93,75 L75,93 L50,100 L25,93 L7,75 L0,50 L7,25 L25,7 Z' },

  // 4. Quadrilaterals & Slanted
  { id: 'shape-rhombus', name: 'Rhombus / Diamond', category: 'Quadrilaterals', width: 140, height: 140, type: 'svg', path: 'M50,0 L100,50 L50,100 L0,50 Z' },
  { id: 'shape-parallelogram', name: 'Parallelogram', category: 'Quadrilaterals', width: 180, height: 120, type: 'svg', path: 'M25,0 L100,0 L75,100 L0,100 Z' },
  { id: 'shape-trapezoid', name: 'Trapezoid', category: 'Quadrilaterals', width: 180, height: 120, type: 'svg', path: 'M20,0 L80,0 L100,100 L0,100 Z' },
  { id: 'shape-kite', name: 'Kite', category: 'Quadrilaterals', width: 140, height: 170, type: 'svg', path: 'M50,0 L100,35 L50,100 L0,35 Z' },
  { id: 'shape-rhomboid', name: 'Rhomboid', category: 'Quadrilaterals', width: 170, height: 120, type: 'svg', path: 'M30,0 L100,10 L70,100 L0,90 Z' },

  // 5. Icons, Abstract & Editorial Curvatures
  { id: 'shape-heart', name: 'Heart', category: 'Abstract & Badges', width: 140, height: 140, type: 'svg', path: 'M50,30 A20,20 0 0,0 10,50 C10,75 50,95 50,95 C50,95 90,75 90,50 A20,20 0 0,0 50,30 Z' },
  { id: 'shape-star', name: '5-Point Star', category: 'Abstract & Badges', width: 150, height: 150, type: 'svg', path: 'M50,0 L61,35 L98,35 L68,57 L79,91 L50,70 L21,91 L32,57 L2,35 L39,35 Z' },
  { id: 'shape-star4', name: 'Editorial 4-Point Sparkle', category: 'Abstract & Badges', width: 140, height: 140, type: 'svg', path: 'M50,0 Q50,50 100,50 Q50,50 50,100 Q50,50 0,50 Q50,50 50,0 Z' },
  { id: 'shape-crescent', name: 'Crescent Moon', category: 'Abstract & Badges', width: 130, height: 140, type: 'svg', path: 'M60,10 A45,45 0 1,0 60,90 A35,35 0 0,1 60,10 Z' },
  { id: 'shape-lune', name: 'Lune', category: 'Abstract & Badges', width: 140, height: 140, type: 'svg', path: 'M40,0 C70,25 70,75 40,100 C15,75 15,25 40,0 Z' },
  { id: 'shape-arrow', name: 'Arrow Right', category: 'Abstract & Badges', width: 180, height: 100, type: 'svg', path: 'M0,35 H60 V10 L100,50 L60,90 V65 H0 Z' },
  { id: 'shape-cross', name: 'Cross (X)', category: 'Abstract & Badges', width: 140, height: 140, type: 'svg', path: 'M25,0 L50,25 L75,0 L100,25 L75,50 L100,75 L75,100 L50,75 L25,100 L0,75 L25,50 L0,25 Z' },
  { id: 'shape-triquetra', name: 'Triquetra Trinity', category: 'Abstract & Badges', width: 150, height: 150, type: 'svg', path: 'M50,10 C65,35 65,65 50,90 C35,65 35,35 50,10 M20,60 C45,50 75,50 100,60 M70,80 C60,55 60,25 70,0' },
  { id: 'shape-arch', name: 'Editorial Roman Arch', category: 'Architectural', width: 180, height: 260, type: 'svg', path: 'M0,100 V40 A50,50 0 0,1 100,40 V100 Z' },
  { id: 'shape-annulus', name: 'Annulus / Donut Ring', category: 'Abstract & Badges', width: 140, height: 140, type: 'svg', path: 'M50,0 A50,50 0 1,1 50,100 A50,50 0 1,1 50,0 M50,25 A25,25 0 1,0 50,75 A25,25 0 1,0 50,25 Z' }
];
