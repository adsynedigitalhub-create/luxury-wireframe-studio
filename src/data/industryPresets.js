export const INDUSTRY_PRESETS = [
  {
    id: 'haute-couture',
    name: 'Haute Couture & Atelier',
    category: 'Fashion & Luxury Goods',
    tagline: 'Sculptural silhouettes and timeless Parisian craftsmanship.',
    fonts: {
      display: 'Cormorant Garamond, serif',
      body: 'Plus Jakarta Sans, sans-serif',
      displayWeight: '300',
      heroStyle: 'italic tracking-tight',
    },
    palette: {
      name: 'Noir & Champagne Silk',
      background: '#0c0d0e',
      surface: '#14161a',
      text: '#f5f2eb',
      mutedText: '#9ca3af',
      accent: '#c5a059',
      border: '#282b33',
      contrastScore: '14.8:1 (AAA)',
      secondaryAccent: '#e5d5be'
    },
    pages: {
      home: [
        {
          id: 'sec-nav',
          type: 'navigation',
          title: 'Editorial Monogram Header',
          data: {
            brandName: 'MAISON D’OR',
            tagline: 'PARIS • MILAN • TOKYO',
            links: ['COLLECTIONS', 'ATELIER', 'ARCHIVE', 'PRIVATE CLIENTS'],
            ctaText: 'REQUEST APPOINTMENT'
          }
        },
        {
          id: 'sec-hero',
          type: 'hero',
          title: 'Asymmetric Magazine Hero',
          data: {
            badge: 'EDITION 2026 / VOL. IV',
            headline: 'Poetry in Form & Solitude',
            subheadline: 'Crafted entirely by hand in our Parisian atelier over three hundred meticulous hours of artisanal precision.',
            ctaPrimary: 'EXPLORE THE REPERTOIRE',
            ctaSecondary: 'VIEW RUNWAY FILM',
            metaLeft: 'LIMITED RUN OF 12 PIECES',
            metaRight: 'AUTUMN / WINTER SOLSTICE'
          }
        },
        {
          id: 'sec-lookbook',
          type: 'lookbook',
          title: 'Editorial Lookbook Gallery',
          data: {
            eyebrow: 'CURATED SELECTIONS',
            heading: 'The Architecture of Drape',
            items: [
              { title: 'No. 01 — The Cashmere Opera Coat', subtitle: 'Hand-woven Italian Loro Piana Wool', tag: 'BESPOKE' },
              { title: 'No. 02 — Sculpted Silk Gown', subtitle: 'Midnight Onyx Crepe de Chine', tag: 'LIMITED' },
              { title: 'No. 03 — Tailored Obsidian Blazer', subtitle: 'Architectural Shoulder & Mother of Pearl', tag: 'SIGNATURE' }
            ]
          }
        },
        {
          id: 'sec-heritage',
          type: 'heritage',
          title: 'Heritage & Craft Story',
          data: {
            year: 'EST. 1928',
            title: 'Centuries of Pure Discipline',
            quote: '“True luxury does not clamor for attention. It commands silence through undeniable mastery.”',
            author: 'Hélène de Montmirail, Master Couturier',
            stats: [
              { number: '340+', label: 'Hours per silhouette' },
              { number: '100%', label: 'Traceable ethical silk' },
              { number: '12', label: 'Bespoke commissions / yr' }
            ]
          }
        },
        {
          id: 'sec-quote',
          type: 'quote',
          title: 'Editorial Critique Banner',
          data: {
            magazine: 'VOGUE INTERNATIONAL',
            text: '“A transcendental masterclass in modern restraint. Maison D’Or redefines what it means to be quietly untouchable.”',
            issue: 'September Fall Anthology'
          }
        },
        {
          id: 'sec-footer',
          type: 'footer',
          title: 'Minimalist Boutique Footer',
          data: {
            monogram: 'M•D',
            address: '18 Place Vendôme, 75001 Paris',
            email: 'concierge@maisondor.fr',
            legal: '© 2026 MAISON D’OR. ALL RIGHTS RESERVED. PRIVATE ATELIER.'
          }
        }
      ],
      about: [
        {
          id: 'sec-about-nav',
          type: 'navigation',
          title: 'Navigation Header',
          data: {
            brandName: 'MAISON D’OR',
            tagline: 'ATELIER HERITAGE',
            links: ['COLLECTIONS', 'MANIFESTO', 'CRAFTSMEN', 'CONTACT'],
            ctaText: 'BOOK PRIVATE VIEWING'
          }
        },
        {
          id: 'sec-about-hero',
          type: 'hero',
          title: 'The Manifesto Hero',
          data: {
            badge: 'OUR PHILOSOPHY',
            headline: 'We Reject Mass Production',
            subheadline: 'Every stitch exists as a deliberate testament against the ephemeral rush of modern consumption.',
            ctaPrimary: 'READ THE ARCHIVES',
            ctaSecondary: 'MEET THE ARTISANS',
            metaLeft: 'PRESERVING DYING ARTS',
            metaRight: 'FOUNDED IN 1928'
          }
        },
        {
          id: 'sec-craft-grid',
          type: 'lookbook',
          title: 'Artisanal Pillars',
          data: {
            eyebrow: 'THE THREE PILLARS',
            heading: 'How A Garment Comes Alive',
            items: [
              { title: 'The Pattern Drafting', subtitle: 'Geometric precision on anatomical wood forms', tag: 'STAGE I' },
              { title: 'Raw Material Sourcing', subtitle: 'Uncut mulberry silk and virgin Shetland wool', tag: 'STAGE II' },
              { title: 'Final Hand Finishing', subtitle: 'Invisible blind stitches and gold filigree', tag: 'STAGE III' }
            ]
          }
        },
        {
          id: 'sec-about-footer',
          type: 'footer',
          title: 'Boutique Footer',
          data: {
            monogram: 'M•D',
            address: '18 Place Vendôme, 75001 Paris',
            email: 'press@maisondor.fr',
            legal: 'MAISON D’OR HISTORICAL PRESERVATION'
          }
        }
      ],
      lookbook: [
        {
          id: 'sec-lb-nav',
          type: 'navigation',
          title: 'Navigation Header',
          data: {
            brandName: 'MAISON D’OR',
            tagline: 'THE LOOKBOOK',
            links: ['ALL EDITIONS', 'LOOK 1-12', 'MATERIALS', 'RESERVE'],
            ctaText: 'CLIENT CONCIERGE'
          }
        },
        {
          id: 'sec-lb-hero',
          type: 'hero',
          title: 'Editorial Catalog Header',
          data: {
            badge: 'WINTER SOLSTICE ARCHIVE',
            headline: 'Volume IV: Monolithic Silhouettes',
            subheadline: 'Explorations in weighted cashmere, structured duchess satin, and architectural tailoring.',
            ctaPrimary: 'DOWNLOAD LOOKBOOK PDF',
            ctaSecondary: 'FILTER SILHOUETTES',
            metaLeft: '12 LOOKS REVEALED',
            metaRight: 'EXCLUSIVE PRIVATE ORDERS'
          }
        },
        {
          id: 'sec-lb-items',
          type: 'lookbook',
          title: 'Curated Looks',
          data: {
            eyebrow: 'AUTUMN / WINTER 2026',
            heading: 'The Full Runway Selection',
            items: [
              { title: 'Look 01: The Column Gown', subtitle: 'Midnight Slate / Raw Hand-woven Crepe', tag: 'AVAILABLE' },
              { title: 'Look 02: Draped Tuxedo Cape', subtitle: 'Onyx Barathea Wool with Silk Lapels', tag: 'RESERVED' },
              { title: 'Look 03: Sculpted Hourglass Trench', subtitle: 'Waterproof Fine Gabardine & Horn Buttons', tag: 'AVAILABLE' }
            ]
          }
        }
      ]
    }
  },
  {
    id: 'fine-jewelry',
    name: 'Fine Jewelry & High Horology',
    category: 'Jewelry & Timepieces',
    tagline: 'Rare gemstones, hand-guilloché dials, and master gem-setting.',
    fonts: {
      display: 'Cinzel, serif',
      body: 'Plus Jakarta Sans, sans-serif',
      displayWeight: '400',
      heroStyle: 'tracking-widest uppercase',
    },
    palette: {
      name: 'Onyx & Pale Platinum',
      background: '#0a0a0c',
      surface: '#131418',
      text: '#fafafa',
      mutedText: '#8d929b',
      accent: '#d4af37',
      border: '#252830',
      contrastScore: '16.2:1 (AAA)',
      secondaryAccent: '#e0e7ff'
    },
    pages: {
      home: [
        {
          id: 'sec-fj-nav',
          type: 'navigation',
          title: 'Royal Horology Header',
          data: {
            brandName: 'AURELIA & CIE',
            tagline: 'GENÈVE • PLACE DE LA FUSTERIE',
            links: ['TIMEPIECES', 'HIGH JEWELRY', 'SAVOIR-FAIRE', 'VAULT'],
            ctaText: 'PRIVATE SALON'
          }
        },
        {
          id: 'sec-fj-hero',
          type: 'hero',
          title: 'Monochrome High-Contrast Hero',
          data: {
            badge: 'MASTERPIECE NO. 07',
            headline: 'The Grand Tourbillon Celestial',
            subheadline: 'Featuring a hand-engraved meteorite dial, flying tourbillon cage, and 18-karat honey gold casing.',
            ctaPrimary: 'INQUIRE AVAILABILITY',
            ctaSecondary: 'VIEW MOVEMENT SPECS',
            metaLeft: 'UNIQUE PIECE (1 OF 1)',
            metaRight: '72-HOUR POWER RESERVE'
          }
        },
        {
          id: 'sec-fj-lookbook',
          type: 'lookbook',
          title: 'High Jewelry Creations',
          data: {
            eyebrow: 'THE PERPETUAL COLLECTION',
            heading: 'Rare Earth Minerals & Diamonds',
            items: [
              { title: 'The Solaris Emerald Collier', subtitle: '32-Carat Colombian Emerald with D-Flawless Pave', tag: 'HIGH JEWELRY' },
              { title: 'Chronographe Monopoussoir', subtitle: 'Manual Wind, Enamel Dial, Rose Gold', tag: 'HOROLOGY' },
              { title: 'The Starlight Sapphire Ring', subtitle: 'Unheated Ceylon Sapphire flanked by Baguettes', tag: 'BESPOKE' }
            ]
          }
        },
        {
          id: 'sec-fj-heritage',
          type: 'heritage',
          title: 'Geneva Workshop Heritage',
          data: {
            year: 'SINCE 1884',
            title: 'Every Gear Cut Under a Loupe',
            quote: '“We do not simply build instruments that keep time; we forge heirlooms that outlast empires.”',
            author: 'Léonard Aurelia, Master Watchmaker',
            stats: [
              { number: '482', label: 'Individual movement components' },
              { number: '0.001mm', label: 'Tolerances on hand beveling' },
              { number: '5 Generations', label: 'Independent family ownership' }
            ]
          }
        },
        {
          id: 'sec-fj-footer',
          type: 'footer',
          title: 'Vault Footer',
          data: {
            monogram: 'A•CIE',
            address: '4 Rue du Rhône, 1204 Genève, Switzerland',
            email: 'private@aurelia-cie.ch',
            legal: 'GENEVA SEAL CERTIFIED • SWISS MADE'
          }
        }
      ]
    }
  },
  {
    id: 'luxury-real-estate',
    name: 'Luxury Real Estate & Estates',
    category: 'Architecture & Prime Property',
    tagline: 'Monolithic coastal sanctuaries, alpine chalets, and architectural penthouses.',
    fonts: {
      display: 'Playfair Display, serif',
      body: 'Plus Jakarta Sans, sans-serif',
      displayWeight: '600',
      heroStyle: 'tracking-tight',
    },
    palette: {
      name: 'Espresso, Sandstone & Ecru',
      background: '#0e0d0c',
      surface: '#181614',
      text: '#f7f4ee',
      mutedText: '#a39b91',
      accent: '#c8a268',
      border: '#2e2924',
      contrastScore: '15.4:1 (AAA)',
      secondaryAccent: '#e6ded3'
    },
    pages: {
      home: [
        {
          id: 'sec-re-nav',
          type: 'navigation',
          title: 'Prime Estate Navigation',
          data: {
            brandName: 'VILLA NOSTRA',
            tagline: 'PRIVATE RESIDENCES & SANCTUARIES',
            links: ['ESTATES', 'ARCHITECTS', 'PRIVATE SALES', 'JOURNAL'],
            ctaText: 'SCHEDULE VIEWING'
          }
        },
        {
          id: 'sec-re-hero',
          type: 'hero',
          title: 'Architectural Panorama Hero',
          data: {
            badge: 'COSTA SMERALDA, SARDINIA',
            headline: 'Where Raw Granite Meets The Sea',
            subheadline: 'A 14,000 sq ft subterranean masterpiece designed by Pritzker-winning architects, framed by untouched Mediterranean cliffs.',
            ctaPrimary: 'EXPLORE RESIDENCE',
            ctaSecondary: 'VIRTUAL DRONE TOUR',
            metaLeft: '€38,500,000',
            metaRight: '6 SUITES • HELIPAD • PRIVATE COVE'
          }
        },
        {
          id: 'sec-re-lookbook',
          type: 'lookbook',
          title: 'Prime Portfolio Grid',
          data: {
            eyebrow: 'CURRENT PORTFOLIO',
            heading: 'Curated Architectural Sanctuaries',
            items: [
              { title: 'The Glass Pavilion, Bel Air', subtitle: 'Floor-to-ceiling glass, 80ft cantilever pool', tag: '$42,000,000' },
              { title: 'Chalet Zermatt Peak', subtitle: 'Direct Matterhorn vistas, private spa & cellar', tag: 'CHF 28,000,000' },
              { title: 'Palazzo sull’Arno, Florence', subtitle: '16th-century restored frescoes & private docks', tag: 'PRICE ON INQUIRY' }
            ]
          }
        },
        {
          id: 'sec-re-heritage',
          type: 'heritage',
          title: 'Private Brokerage Standard',
          data: {
            year: 'DISCRETION GUARANTEED',
            title: 'Unlisted & Off-Market Exclusivity',
            quote: '“Eighty percent of the world’s most magnificent residences never appear on public listings. We bridge that invisible divide.”',
            author: 'Marco Bellini, Managing Director',
            stats: [
              { number: '$2.4B+', label: 'Transacted in quiet estates' },
              { number: '100%', label: 'Confidentiality compliance' },
              { number: '48 Hrs', label: 'Average off-market match time' }
            ]
          }
        },
        {
          id: 'sec-re-footer',
          type: 'footer',
          title: 'Discreet Footer',
          data: {
            monogram: 'VN',
            address: 'Mayfair, London • Beverly Hills • Milan',
            email: 'estates@villanostra.com',
            legal: 'VILLA NOSTRA PRIVATE REALTY INTERNATIONAL'
          }
        }
      ]
    }
  },
  {
    id: 'bespoke-perfumery',
    name: 'Bespoke Perfumery & Olfactory',
    category: 'Beauty & Fragrance',
    tagline: 'Artisanal distillations, raw oud, damascena rose, and sensory memories.',
    fonts: {
      display: 'Cormorant Garamond, serif',
      body: 'Plus Jakarta Sans, sans-serif',
      displayWeight: '400',
      heroStyle: 'italic tracking-wide',
    },
    palette: {
      name: 'Olive Grove & Smoked Amber',
      background: '#0d0f0d',
      surface: '#141814',
      text: '#f2f5f1',
      mutedText: '#8fa08e',
      accent: '#9ba870',
      border: '#232c23',
      contrastScore: '14.1:1 (AAA)',
      secondaryAccent: '#e3ebd9'
    },
    pages: {
      home: [
        {
          id: 'sec-pf-nav',
          type: 'navigation',
          title: 'Apothecary Header',
          data: {
            brandName: 'ÉLIXIR BOTANIQUE',
            tagline: 'GRASSE • SOUTHERN FRANCE',
            links: ['EXTRAITS', 'NOSE PROFILES', 'HARVEST 2026', 'CUSTOM BLEND'],
            ctaText: 'SAMPLE FLACON'
          }
        },
        {
          id: 'sec-pf-hero',
          type: 'hero',
          title: 'Olfactory Sensory Hero',
          data: {
            badge: 'BATCH 003 / GRASSE DISTILLATION',
            headline: 'The Memory of Wet Cypress & Amber',
            subheadline: 'Cold-pressed wild orris root, aged Indian sandalwood, and sun-warmed bergamot captured in hand-blown smoked flacons.',
            ctaPrimary: 'ORDER DISCOVERY SET',
            ctaSecondary: 'READ THE SOURCING EXPEDITION',
            metaLeft: 'EXTRACT DE PARFUM 35%',
            metaRight: 'ONLY 250 FLACONS'
          }
        },
        {
          id: 'sec-pf-lookbook',
          type: 'lookbook',
          title: 'The Extraction Repertory',
          data: {
            eyebrow: 'SIGNATURE EXTRACTIONS',
            heading: 'Notes from Forgotten Landscapes',
            items: [
              { title: 'Nuit d’Oran (Nocturnal Jasmine)', subtitle: 'Handpicked at 4 AM before dawn evaporates the nectar', tag: 'RARE' },
              { title: 'Fumée Sacrée (Incense & Cade)', subtitle: 'Smoked cedarwood, frankincense tear, and black pepper', tag: 'INTENSE' },
              { title: 'Santal Impérial (Ancient Woods)', subtitle: '30-year Mysore sandalwood aged in French oak barrels', tag: 'RESERVE' }
            ]
          }
        },
        {
          id: 'sec-pf-footer',
          type: 'footer',
          title: 'Apothecary Footer',
          data: {
            monogram: 'É•B',
            address: '12 Boulevard Fragonard, 06130 Grasse, France',
            email: 'apothecary@elixirbotanique.fr',
            legal: 'SUSTAINABLE HARVEST CERTIFIED'
          }
        }
      ]
    }
  },
  {
    id: 'bespoke-tech-saas',
    name: 'Private Wealth & DeepTech SaaS',
    category: 'Software & FinTech',
    tagline: 'Sovereign computing, family office liquidity algorithms, and zero-knowledge privacy.',
    fonts: {
      display: 'Plus Jakarta Sans, sans-serif',
      body: 'Plus Jakarta Sans, sans-serif',
      displayWeight: '700',
      heroStyle: 'tracking-tight',
    },
    palette: {
      name: 'Cyber Noir & Titanium Gold',
      background: '#090a0c',
      surface: '#111317',
      text: '#f3f4f6',
      mutedText: '#9ca3af',
      accent: '#3b82f6',
      border: '#1f242d',
      contrastScore: '13.9:1 (AAA)',
      secondaryAccent: '#60a5fa'
    },
    pages: {
      home: [
        {
          id: 'sec-st-nav',
          type: 'navigation',
          title: 'DeepTech Platform Header',
          data: {
            brandName: 'VAULT OS',
            tagline: 'PRIVATE ASSET INTELLIGENCE',
            links: ['INFRASTRUCTURE', 'SECURITY', 'MULTI-JURISDICTION', 'ENTERPRISE'],
            ctaText: 'REQUEST ACCESS'
          }
        },
        {
          id: 'sec-st-hero',
          type: 'hero',
          title: 'High-Tech Minimalist Hero',
          data: {
            badge: 'ENTERPRISE PROTOCOL 4.2',
            headline: 'Sovereign Infrastructure for Global Wealth',
            subheadline: 'Multi-signature custody, real-time cross-border settlements, and cryptographic reporting engineered for family offices.',
            ctaPrimary: 'SCHEDULE PRIVATE DEMO',
            ctaSecondary: 'SECURITY WHITEPAPER',
            metaLeft: '$48B+ ASSETS PROTECTED',
            metaRight: 'ZERO-KNOWLEDGE ENCRYPTION'
          }
        },
        {
          id: 'sec-st-lookbook',
          type: 'lookbook',
          title: 'System Architecture Grid',
          data: {
            eyebrow: 'CORE PILLARS',
            heading: 'Engineered Without Compromise',
            items: [
              { title: 'Sub-Millisecond Settlement', subtitle: 'Direct integration with central banks and private liquidity hubs', tag: 'FINTECH' },
              { title: 'Hardware Isolation', subtitle: 'FIPS 140-3 Level 4 HSMs distributed across Swiss alpine vaults', tag: 'SECURITY' },
              { title: 'Autonomous Tax Compliance', subtitle: 'Dynamic jurisdictional simulation across 82 sovereign states', tag: 'AI CORE' }
            ]
          }
        },
        {
          id: 'sec-st-footer',
          type: 'footer',
          title: 'Enterprise Footer',
          data: {
            monogram: 'V-OS',
            address: 'Bahnhofstrasse 10, 8001 Zürich, Switzerland',
            email: 'institutional@vaultos.io',
            legal: 'FINMA REGULATED • SOC2 TYPE II COMPLIANT'
          }
        }
      ]
    }
  }
];

export const SECTION_TEMPLATES = [
  {
    type: 'hero',
    name: 'Editorial Cover Hero',
    description: 'Magazine-style asymmetric cover with large serif headline, badge, and dual CTAs',
    defaultData: {
      badge: 'VOLUME IV / CURATED',
      headline: 'The Architecture of Modern Distinction',
      subheadline: 'A deliberate composition of geometric precision, elevated textures, and quiet authority.',
      ctaPrimary: 'EXPLORE COLLECTION',
      ctaSecondary: 'READ MANIFESTO',
      metaLeft: 'LIMITED RUN',
      metaRight: 'EXCLUSIVELY CRAFTED'
    }
  },
  {
    type: 'lookbook',
    name: 'Editorial Lookbook Showcase',
    description: 'Asymmetric 3-column curated exhibition cards with tags and metadata',
    defaultData: {
      eyebrow: 'CURATED SELECTION',
      heading: 'Form Follows Restraint',
      items: [
        { title: 'No. 01 — Monolithic Sculpture', subtitle: 'Hand-carved Carrara Marble', tag: 'BESPOKE' },
        { title: 'No. 02 — Architectural Linen', subtitle: 'Woven in Northern Italy', tag: 'EXCLUSIVE' },
        { title: 'No. 03 — Cast Bronze Vessel', subtitle: 'Lost-wax casting technique', tag: 'EDITION OF 5' }
      ]
    }
  },
  {
    type: 'heritage',
    name: 'Heritage Story & Craft Manifesto',
    description: 'Historical brand narrative, master quote, and key numerical metrics',
    defaultData: {
      year: 'ESTABLISHED 1934',
      title: 'Centuries of Pure Discipline',
      quote: '“True luxury does not clamor for attention. It commands silence through undeniable mastery.”',
      author: 'Studio Principal & Master Artisan',
      stats: [
        { number: '100%', label: 'Traceable raw materials' },
        { number: '480+', label: 'Hours of artisan handwork' },
        { number: '24', label: 'Bespoke commissions per year' }
      ]
    }
  },
  {
    type: 'quote',
    name: 'Editorial Critique & Press Banner',
    description: 'Large typographic publication pull-quote and badge',
    defaultData: {
      magazine: 'ARCHITECTURAL DIGEST',
      text: '“A transcendental masterclass in modern restraint. An experience that redefines quiet luxury.”',
      issue: 'The Annual Masters Anthology'
    }
  },
  {
    type: 'pricing',
    name: 'Private Salon Packages / Tiers',
    description: 'Minimalist pricing cards for tiered offerings or memberships',
    defaultData: {
      eyebrow: 'PRIVATE MEMBERSHIP',
      heading: 'Select Your Level of Engagement',
      items: [
        { title: 'Atelier Circle', subtitle: 'Private seasonal preview & concierge', tag: '$2,500 / YR' },
        { title: 'Founder Vault', subtitle: 'Direct artisan access & bespoke commissions', tag: '$10,000 / YR' },
        { title: 'Patron Sovereign', subtitle: 'Unlimited custom pieces & global studio access', tag: 'BY INVITATION' }
      ]
    }
  },
  {
    type: 'faq',
    name: 'Editorial FAQ Accordion',
    description: 'Bespoke question-and-answer layout with clean divider lines',
    defaultData: {
      eyebrow: 'CLIENT CONCIERGE',
      heading: 'Frequently Inquired Details',
      items: [
        { title: 'What is the lead time for bespoke commissions?', subtitle: 'Each bespoke piece requires approximately 8 to 14 weeks depending on the complexity of materials.' },
        { title: 'Can private viewings be arranged internationally?', subtitle: 'Our private salons in Paris, New York, and Tokyo host dedicated client appointments by prior reservation.' },
        { title: 'What certificates of provenance are provided?', subtitle: 'Every commission is accompanied by a hand-signed wax-sealed certificate and traceable blockchain ledger.' }
      ]
    }
  },
  {
    type: 'footer',
    name: 'Minimalist Boutique Footer',
    description: 'Monogram, international salon addresses, direct concierge email, and legal copyright',
    defaultData: {
      monogram: 'EST. 1928',
      address: 'Place Vendôme, Paris • 5th Avenue, New York • Ginza, Tokyo',
      email: 'concierge@luxurybrand.com',
      legal: 'ALL RIGHTS RESERVED • PRIVATE CLIENTELE'
    }
  }
];
