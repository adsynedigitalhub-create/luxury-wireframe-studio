import { CURATED_IMAGES } from './assetsLibrary';

// Algorithmic Generator for N-sided Regular Polygons (3 to 32 sides)
export function generatePolygonSvgPath(sides, radius = 48, cx = 50, cy = 50) {
  const points = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
    const x = Math.round((cx + radius * Math.cos(angle)) * 10) / 10;
    const y = Math.round((cy + radius * Math.sin(angle)) * 10) / 10;
    points.push((i === 0 ? 'M' : 'L') + x + ',' + y);
  }
  points.push('Z');
  return points.join(' ');
}

// Algorithmic Generator for N-point Starbursts / Stars (3 to 32 points)
export function generateStarburstSvgPath(pointsCount, outerRadius = 48, innerRadius = 24, cx = 50, cy = 50) {
  const points = [];
  const totalVertices = pointsCount * 2;
  for (let i = 0; i < totalVertices; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i * 2 * Math.PI) / totalVertices - Math.PI / 2;
    const x = Math.round((cx + r * Math.cos(angle)) * 10) / 10;
    const y = Math.round((cy + r * Math.sin(angle)) * 10) / 10;
    points.push((i === 0 ? 'M' : 'L') + x + ',' + y);
  }
  points.push('Z');
  return points.join(' ');
}

// Curated Collection of Core Shape Frames
export const CORE_SHAPE_FRAMES = [
  // 1. ARCHES & ARCHITECTURAL
  {
    id: 'frame-arch-classic',
    name: 'Roman Editorial Arch',
    category: 'Arches & Portals',
    path: 'M 0,100 V 45 A 50,45 0 0,1 100,45 V 100 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 280,
    defaultHeight: 380,
    defaultImage: CURATED_IMAGES[3].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: '3:4 Arch'
  },
  {
    id: 'frame-arch-gothic',
    name: 'Gothic Pointed Arch',
    category: 'Arches & Portals',
    path: 'M 0,100 V 50 A 60,60 0 0,1 50,0 A 60,60 0 0,1 100,50 V 100 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 280,
    defaultHeight: 390,
    defaultImage: CURATED_IMAGES[4].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: 'Gothic Arch'
  },
  {
    id: 'frame-arch-trefoil',
    name: 'Trefoil Cathedral Arch',
    category: 'Arches & Portals',
    path: 'M 0,100 V 50 A 25,25 0 0,1 25,25 A 30,30 0 0,1 75,25 A 25,25 0 0,1 100,50 V 100 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 280,
    defaultHeight: 380,
    defaultImage: CURATED_IMAGES[0].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: 'Cathedral'
  },
  {
    id: 'frame-arch-double',
    name: 'Double Arch Portal',
    category: 'Arches & Portals',
    path: 'M 0,100 V 40 A 50,40 0 0,1 100,40 V 60 A 50,40 0 0,1 0,60 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 280,
    defaultHeight: 380,
    defaultImage: CURATED_IMAGES[1].url,
    strokeWidth: 2,
    strokeColor: '#e4c88a',
    aspectRatio: 'Portal'
  },

  // 2. ORGANIC FLUID BLOBS
  {
    id: 'frame-blob-1',
    name: 'Fluid Pebble Blob',
    category: 'Organic Fluid Blobs',
    path: 'M 30,10 C 60,0 95,20 90,60 C 85,95 60,90 30,95 C 5,100 0,60 10,30 C 18,8 20,15 30,10 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 320,
    defaultHeight: 300,
    defaultImage: CURATED_IMAGES[1].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: 'Pebble'
  },
  {
    id: 'frame-blob-2',
    name: 'Aura Cloud Blob',
    category: 'Organic Fluid Blobs',
    path: 'M 40,5 C 75,-2 98,25 95,65 C 92,95 65,98 35,92 C 8,88 2,55 12,28 C 18,12 28,8 40,5 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 320,
    defaultHeight: 310,
    defaultImage: CURATED_IMAGES[2].url,
    strokeWidth: 2,
    strokeColor: '#ffffff',
    aspectRatio: 'Aura'
  },
  {
    id: 'frame-blob-3',
    name: 'Liquid Flow Blob',
    category: 'Organic Fluid Blobs',
    path: 'M 50,5 C 80,8 98,35 90,70 C 82,98 50,92 25,90 C 2,88 5,50 15,25 C 25,5 35,2 50,5 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 310,
    defaultHeight: 310,
    defaultImage: CURATED_IMAGES[3].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: 'Liquid'
  },
  {
    id: 'frame-blob-4',
    name: 'Asymmetric Egg Blob',
    category: 'Organic Fluid Blobs',
    path: 'M 50,0 C 85,0 100,40 95,75 C 90,100 45,100 20,90 C 0,80 5,45 15,20 C 25,2 35,0 50,0 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 300,
    defaultHeight: 320,
    defaultImage: CURATED_IMAGES[4].url,
    strokeWidth: 2,
    strokeColor: '#e4c88a',
    aspectRatio: 'Egg Form'
  },

  // 3. BADGES, CRESTS & SEALS
  {
    id: 'frame-seal-16',
    name: '16-Point Luxury Seal',
    category: 'Badges & Seals',
    path: generateStarburstSvgPath(16, 48, 41),
    viewBox: '0 0 100 100',
    defaultWidth: 300,
    defaultHeight: 300,
    defaultImage: CURATED_IMAGES[0].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: '16-Seal'
  },
  {
    id: 'frame-seal-24',
    name: '24-Point High Watchmaker Seal',
    category: 'Badges & Seals',
    path: generateStarburstSvgPath(24, 48, 44),
    viewBox: '0 0 100 100',
    defaultWidth: 300,
    defaultHeight: 300,
    defaultImage: CURATED_IMAGES[2].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: '24-Seal'
  },
  {
    id: 'frame-shield-crest',
    name: 'Heraldic Crest Shield',
    category: 'Badges & Seals',
    path: 'M 10,10 L 90,10 L 90,55 C 90,82 50,98 50,98 C 50,98 10,82 10,55 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 280,
    defaultHeight: 320,
    defaultImage: CURATED_IMAGES[3].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: 'Crest'
  },
  {
    id: 'frame-badge-ribbon',
    name: 'Notched Banner Badge',
    category: 'Badges & Seals',
    path: 'M 10,10 L 90,10 L 90,85 L 50,70 L 10,85 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 280,
    defaultHeight: 320,
    defaultImage: CURATED_IMAGES[1].url,
    strokeWidth: 2,
    strokeColor: '#ffffff',
    aspectRatio: 'Banner'
  },

  // 4. TICKETS & POSTAGE STAMPS
  {
    id: 'frame-postage-stamp',
    name: 'Vintage Postage Stamp',
    category: 'Stamps & Tickets',
    path: 'M 5,5 Q 10,2 15,5 Q 20,2 25,5 Q 30,2 35,5 Q 40,2 45,5 Q 50,2 55,5 Q 60,2 65,5 Q 70,2 75,5 Q 80,2 85,5 Q 90,2 95,5 L 95,95 Q 90,98 85,95 Q 80,98 75,95 Q 70,98 65,95 Q 60,98 55,95 Q 50,98 45,95 Q 40,98 35,95 Q 30,98 25,95 Q 20,98 15,95 Q 10,98 5,95 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 290,
    defaultHeight: 290,
    defaultImage: CURATED_IMAGES[4].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: 'Postage'
  },
  {
    id: 'frame-cinema-ticket',
    name: 'Admission Ticket Stub',
    category: 'Stamps & Tickets',
    path: 'M 0,0 H 100 V 40 A 10,10 0 0,0 100,60 V 100 H 0 V 60 A 10,10 0 0,0 0,40 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 340,
    defaultHeight: 220,
    defaultImage: CURATED_IMAGES[0].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: 'Ticket'
  },

  // 5. GEOMETRIC & EDITORIAL
  {
    id: 'frame-pill-capsule',
    name: 'Capsule Pill Frame',
    category: 'Geometric & Editorial',
    path: 'M 30,0 L 70,0 A 30,30 0 0,1 100,30 L 100,70 A 30,30 0 0,1 70,100 L 30,100 A 30,30 0 0,1 0,70 L 0,30 A 30,30 0 0,1 30,0 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 340,
    defaultHeight: 200,
    defaultImage: CURATED_IMAGES[1].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: 'Pill'
  },
  {
    id: 'frame-circle',
    name: 'Pure Circular Frame',
    category: 'Geometric & Editorial',
    path: 'M 50,0 A 50,50 0 1,1 50,100 A 50,50 0 1,1 50,0 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 280,
    defaultHeight: 280,
    defaultImage: CURATED_IMAGES[0].url,
    strokeWidth: 2,
    strokeColor: '#ffffff',
    aspectRatio: '1:1 Round'
  },
  {
    id: 'frame-diamond',
    name: 'Diamond Rhombus Frame',
    category: 'Geometric & Editorial',
    path: 'M 50,0 L 100,50 L 50,100 L 0,50 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 300,
    defaultHeight: 300,
    defaultImage: CURATED_IMAGES[3].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: 'Diamond'
  },
  {
    id: 'frame-heart',
    name: 'Heart Frame',
    category: 'Geometric & Editorial',
    path: 'M 50,30 A 20,20 0 0,0 10,50 C 10,75 50,95 50,95 C 50,95 90,75 90,50 A 20,20 0 0,0 50,30 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 290,
    defaultHeight: 290,
    defaultImage: CURATED_IMAGES[2].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: 'Heart'
  },
  {
    id: 'frame-star4',
    name: 'Editorial 4-Point Sparkle',
    category: 'Geometric & Editorial',
    path: 'M 50,0 Q 50,50 100,50 Q 50,50 50,100 Q 50,50 0,50 Q 50,50 50,0 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 290,
    defaultHeight: 290,
    defaultImage: CURATED_IMAGES[3].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: 'Sparkle'
  }
];

// Pre-generate standard regular polygon frames (Triangle through 30-gon)
export const POLYGON_FRAMES = [];
for (let n = 3; n <= 30; n++) {
  const names = {
    3: 'Triangle (3-Gon)',
    4: 'Square (4-Gon)',
    5: 'Pentagon (5-Gon)',
    6: 'Hexagon (6-Gon)',
    7: 'Heptagon (7-Gon)',
    8: 'Octagon (8-Gon)',
    9: 'Nonagon (9-Gon)',
    10: 'Decagon (10-Gon)',
    12: 'Dodecagon (12-Gon)',
    16: 'Hexadecagon (16-Gon)',
    20: 'Icosagon (20-Gon)',
    24: 'Icositetragon (24-Gon)',
    30: 'Triacontagon (30-Gon)'
  };
  POLYGON_FRAMES.push({
    id: 'frame-poly-' + n,
    name: names[n] || ('Regular ' + n + '-Sided Polygon'),
    category: 'N-Sided Polygons',
    path: generatePolygonSvgPath(n),
    viewBox: '0 0 100 100',
    defaultWidth: 280,
    defaultHeight: 280,
    defaultImage: CURATED_IMAGES[n % CURATED_IMAGES.length].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: n + '-Gon'
  });
}

// Pre-generate starburst frames (3-point to 32-point stars)
export const STAR_FRAMES = [];
for (let p = 3; p <= 32; p++) {
  const innerR = p > 16 ? 40 : p > 10 ? 32 : 22;
  STAR_FRAMES.push({
    id: 'frame-star-' + p,
    name: p + '-Point Starburst',
    category: 'N-Point Stars',
    path: generateStarburstSvgPath(p, 48, innerR),
    viewBox: '0 0 100 100',
    defaultWidth: 290,
    defaultHeight: 290,
    defaultImage: CURATED_IMAGES[p % CURATED_IMAGES.length].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: p + '-Star'
  });
}

// All combined ready frames
export const ALL_SHAPE_FRAMES = [
  ...CORE_SHAPE_FRAMES,
  ...POLYGON_FRAMES,
  ...STAR_FRAMES
];
