export const ARCHITECTURE_PROJECTS = [
  {
    id: 'proj-monolith-tower',
    number: '01',
    title: 'The Monolith Titan Tower',
    category: 'Commercial High-Rise',
    categoryKey: 'commercial',
    location: 'Zurich, Switzerland',
    year: '2026',
    area: '85,400 m²',
    height: '340 m / 78 Stories',
    materials: 'Reflective Diagrid Titanium & Acoustic Triple Glazing',
    image: '/images/architecture/skyscraper_landmark.jpg',
    description: 'A monument of sustainable vertical density. Featuring faceted aerodynamic wind-relief diagrid cantilevers that reduce structural steel by 34% while providing 360-degree panoramic alpine vistas.',
    leadArchitect: 'Henrik Vane, Lead Principal'
  },
  {
    id: 'proj-cantilever-bridge',
    number: '02',
    title: 'Fjord Cantilever Pavilion & Bridge',
    category: 'Infrastructure & Cultural',
    categoryKey: 'infrastructure',
    location: 'Hardanger Fjord, Norway',
    year: '2025',
    area: '1,280 m Span / 4,200 m² Deck',
    height: '185 m Towers',
    materials: 'Self-Compacting Carbon-Neutral Concrete & Corten Steel',
    image: '/images/architecture/cantilever_bridge.jpg',
    description: 'An architectural gateway suspended across glacial waters. Features a dramatic 45-meter cantilevered concrete public observatory perched over the abyss, blending civic infrastructure with monumental art.',
    leadArchitect: 'Alexander Van Der Rohe, Design Director'
  },
  {
    id: 'proj-villa-obsidian',
    number: '03',
    title: 'Villa Obsidian & Water Reflection',
    category: 'Luxury Residential',
    categoryKey: 'residential',
    location: 'Lake Como, Italy',
    year: '2026',
    area: '1,650 m²',
    height: '3 Terraced Tiers',
    materials: 'Volcanic Basalt, Burnished Brass & Minimalist Glass Walls',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Private residential sanctuary carved into the rocky lakeside cliff. Zero-edge infinity pools reflect the dramatic alpine sky, while motorized 6-meter motorized glass panes disappear entirely into the basalt stone.',
    leadArchitect: 'Elena Rossi, Senior Partner'
  },
  {
    id: 'proj-kyoto-pavilion',
    number: '04',
    title: 'Kyoto Botanical Concrete Pavilion',
    category: 'Cultural & Museum',
    categoryKey: 'cultural',
    location: 'Kyoto, Japan',
    year: '2025',
    area: '4,800 m²',
    height: '14 m Single-Span Vaults',
    materials: 'Board-Formed White Concrete & Hinoki Cypress',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    description: 'A poetic celebration of light, shadow, and nature. Board-formed white concrete vaults filter daylight through bamboo courtyards, creating an ever-changing interplay of natural elements inside museum galleries.',
    leadArchitect: 'Kenzo Takahashi, Partner'
  },
  {
    id: 'proj-nordic-atelier',
    number: '05',
    title: 'Nordic Timber Innovation Campus',
    category: 'Commercial & Institutional',
    categoryKey: 'commercial',
    location: 'Oslo, Norway',
    year: '2024',
    area: '12,200 m²',
    height: '6 Mass-Timber Levels',
    materials: 'Cross-Laminated Timber (CLT) & Zinc Cladding',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    description: 'One of the worlds largest carbon-negative institutional buildings, engineered entirely from locally harvested PEFC-certified Nordic timber with geothermal heating foundations.',
    leadArchitect: 'Henrik Vane, Lead Principal'
  },
  {
    id: 'proj-maritime-terminal',
    number: '06',
    title: 'Rotterdam Maritime Gateway',
    category: 'Infrastructure & Civic',
    categoryKey: 'infrastructure',
    location: 'Rotterdam, Netherlands',
    year: '2026',
    area: '22,400 m²',
    height: '32 m Dynamic Wave Canopy',
    materials: 'Sculptural White Ultra-High Performance Concrete (UHPC)',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80',
    description: 'A fluid, aerodynamic port terminal inspired by nautical hulls. The continuous double-curved concrete canopy cantilevers 35 meters over the North Sea ferry docks without internal columns.',
    leadArchitect: 'Alexander Van Der Rohe, Design Director'
  }
];

export const ARCHITECTURE_CATEGORIES = [
  { key: 'all', label: 'All Works' },
  { key: 'commercial', label: 'Commercial High-Rise' },
  { key: 'residential', label: 'Luxury Villas' },
  { key: 'cultural', label: 'Cultural & Museums' },
  { key: 'infrastructure', label: 'Infrastructure & Bridges' }
];

export const GLOBAL_STUDIOS = [
  {
    id: 'studio-zurich',
    city: 'Zurich',
    country: 'Switzerland',
    role: 'Global Headquarters & Structural Lab',
    address: 'Gotthardstrasse 28, 8002 Zürich',
    phone: '+41 44 288 9000',
    email: 'zurich@vanguard-atelier.com',
    coords: { x: '51%', y: '32%' },
    iconicProject: 'The Monolith Titan Tower'
  },
  {
    id: 'studio-milan',
    city: 'Milano',
    country: 'Italy',
    role: 'Design & Material Atelier',
    address: 'Via Montenapoleone 14, 20121 Milano',
    phone: '+39 02 8901 3340',
    email: 'milano@vanguard-atelier.com',
    coords: { x: '52%', y: '36%' },
    iconicProject: 'Villa Obsidian & Water'
  },
  {
    id: 'studio-tokyo',
    city: 'Tokyo',
    country: 'Japan',
    role: 'BIM & Computational Pavilion Lab',
    address: '5-7-2 Minami-Aoyama, Minato-ku, Tokyo',
    phone: '+81 3 5468 1120',
    email: 'tokyo@vanguard-atelier.com',
    coords: { x: '82%', y: '40%' },
    iconicProject: 'Kyoto Botanical Pavilion'
  },
  {
    id: 'studio-ny',
    city: 'New York',
    country: 'United States',
    role: 'Urban Planning & Megatowers',
    address: '520 Madison Avenue, New York, NY 10022',
    phone: '+1 212 755 8890',
    email: 'newyork@vanguard-atelier.com',
    coords: { x: '24%', y: '35%' },
    iconicProject: 'Hudson Estuary Masterplan'
  }
];
