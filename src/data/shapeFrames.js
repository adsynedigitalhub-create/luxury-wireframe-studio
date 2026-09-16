import { CURATED_IMAGES } from './assetsLibrary';

// Canva-style Shape Frames / Shape Mockups
// Drop any shape frame onto the canvas and easily insert or replace images inside the shape mask!
export const SHAPE_FRAMES = [
  {
    id: 'frame-arch',
    name: 'Editorial Roman Arch',
    category: 'Architectural & Luxury',
    path: 'M0,100 V40 A50,50 0 0,1 100,40 V100 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 280,
    defaultHeight: 380,
    defaultImage: CURATED_IMAGES[3].url, // Concrete architecture
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: '3:4 Arch'
  },
  {
    id: 'frame-circle',
    name: 'Circle Frame',
    category: 'Geometric',
    path: 'M50,0 A50,50 0 1,1 50,100 A50,50 0 1,1 50,0 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 280,
    defaultHeight: 280,
    defaultImage: CURATED_IMAGES[0].url, // Portrait silhouette
    strokeWidth: 2,
    strokeColor: '#ffffff',
    aspectRatio: '1:1 Round'
  },
  {
    id: 'frame-blob',
    name: 'Organic Pebble Blob',
    category: 'Organic & Fluid',
    path: 'M30,10 C60,0 95,20 90,60 C85,95 60,90 30,95 C5,100 0,60 10,30 C18,8 20,15 30,10 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 320,
    defaultHeight: 300,
    defaultImage: CURATED_IMAGES[1].url, // Draped silk
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: 'Organic Fluid'
  },
  {
    id: 'frame-hexagon',
    name: 'Hexagon Polygon Frame',
    category: 'Geometric',
    path: 'M25,0 L75,0 L100,50 L75,100 L25,100 L0,50 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 290,
    defaultHeight: 270,
    defaultImage: CURATED_IMAGES[4].url, // Spiral staircase
    strokeWidth: 2,
    strokeColor: '#e4c88a',
    aspectRatio: '6-Sided'
  },
  {
    id: 'frame-octagon',
    name: 'Octagon Faceted Frame',
    category: 'Geometric',
    path: 'M30,0 L70,0 L100,30 L100,70 L70,100 L30,100 L0,70 L0,30 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 280,
    defaultHeight: 280,
    defaultImage: CURATED_IMAGES[2].url, // Noir portrait
    strokeWidth: 2,
    strokeColor: '#ffffff',
    aspectRatio: '8-Sided'
  },
  {
    id: 'frame-diamond',
    name: 'Diamond Rhombus Frame',
    category: 'Geometric',
    path: 'M50,0 L100,50 L50,100 L0,50 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 300,
    defaultHeight: 300,
    defaultImage: CURATED_IMAGES[3].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: 'Diamond'
  },
  {
    id: 'frame-starburst',
    name: '8-Point Starburst Frame',
    category: 'Badges & Stars',
    path: 'M50,0 L62,25 L90,12 L75,38 L100,50 L75,62 L90,88 L62,75 L50,100 L38,75 L10,88 L25,62 L0,50 L25,38 L10,12 L38,25 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 300,
    defaultHeight: 300,
    defaultImage: CURATED_IMAGES[0].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: 'Emblem'
  },
  {
    id: 'frame-scallop',
    name: 'Scalloped Flower Badge',
    category: 'Badges & Stars',
    path: 'M50,5 C60,0 70,5 75,15 C85,15 90,25 90,35 C100,45 100,55 90,65 C90,75 85,85 75,85 C70,95 60,100 50,95 C40,100 30,95 25,85 C15,85 10,75 10,65 C0,55 0,45 10,35 C10,25 15,15 25,15 C30,5 40,0 50,5 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 290,
    defaultHeight: 290,
    defaultImage: CURATED_IMAGES[1].url,
    strokeWidth: 2,
    strokeColor: '#ffffff',
    aspectRatio: 'Badge'
  },
  {
    id: 'frame-shield',
    name: 'Crest Shield Frame',
    category: 'Architectural & Luxury',
    path: 'M10,10 L90,10 L90,55 C90,80 50,98 50,98 C50,98 10,80 10,55 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 270,
    defaultHeight: 320,
    defaultImage: CURATED_IMAGES[2].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: 'Heraldic'
  },
  {
    id: 'frame-pill',
    name: 'Capsule Pill Frame',
    category: 'Geometric',
    path: 'M30,0 L70,0 A30,30 0 0,1 100,30 L100,70 A30,30 0 0,1 70,100 L30,100 A30,30 0 0,1 0,70 L0,30 A30,30 0 0,1 30,0 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 340,
    defaultHeight: 200,
    defaultImage: CURATED_IMAGES[3].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: 'Capsule'
  },
  {
    id: 'frame-triangle',
    name: 'Equilateral Delta Frame',
    category: 'Geometric',
    path: 'M50,5 L95,95 L5,95 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 280,
    defaultHeight: 270,
    defaultImage: CURATED_IMAGES[4].url,
    strokeWidth: 2,
    strokeColor: '#ffffff',
    aspectRatio: 'Triangle'
  },
  {
    id: 'frame-heart',
    name: 'Heart Frame',
    category: 'Badges & Stars',
    path: 'M50,30 A20,20 0 0,0 10,50 C10,75 50,95 50,95 C50,95 90,75 90,50 A20,20 0 0,0 50,30 Z',
    viewBox: '0 0 100 100',
    defaultWidth: 290,
    defaultHeight: 290,
    defaultImage: CURATED_IMAGES[0].url,
    strokeWidth: 2,
    strokeColor: '#c5a059',
    aspectRatio: 'Heart'
  }
];
