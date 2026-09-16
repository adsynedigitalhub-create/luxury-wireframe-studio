// Elementor-Style Flexbox Container Presets & Official Web Dimensions

export const STANDARD_SECTION_SIZES = [
  { name: 'Desktop Full Hero', width: 1440, height: 800, badge: '1440 × 800px', desc: 'Standard 1080p/Retina Fullscreen Hero' },
  { name: 'Boxed Container', width: 1200, height: 600, badge: '1200 × 600px', desc: 'Elementor / Bootstrap Standard Max Width' },
  { name: 'Narrow Editorial', width: 960, height: 500, badge: '960 × 500px', desc: 'Vogue / Medium Clean Reading Width' },
  { name: 'Split Screen Half', width: 580, height: 600, badge: '580 × 600px', desc: '50% Half Viewport Section' },
  { name: '3-Column Product Card', width: 380, height: 480, badge: '380 × 480px', desc: 'Standard E-commerce / Portfolio Card' },
  { name: '4-Column Metric Card', width: 280, height: 260, badge: '280 × 260px', desc: 'Feature Pill or Statistic Card' },
  { name: 'Header Navigation Shell', width: 1200, height: 80, badge: '1200 × 80px', desc: 'Desktop Sticky Header' },
  { name: 'Banner / Strip', width: 1200, height: 180, badge: '1200 × 180px', desc: 'Announcement or Press Quote Strip' }
];

export const ELEMENTOR_CONTAINER_GRIDS = [
  {
    id: 'el-1col',
    name: '1 Column (100%)',
    category: 'Elementor Flexbox',
    columns: '100%',
    width: 1200,
    height: 380,
    ratios: [1],
    desc: 'Single full-width container'
  },
  {
    id: 'el-2col-5050',
    name: '2 Columns (50% / 50%)',
    category: 'Elementor Flexbox',
    columns: '50% + 50%',
    width: 1200,
    height: 480,
    ratios: [0.5, 0.5],
    desc: 'Classic equal 50/50 dual flex container'
  },
  {
    id: 'el-3col-equal',
    name: '3 Columns (33.3% × 3)',
    category: 'Elementor Flexbox',
    columns: '33% + 33% + 33%',
    width: 1200,
    height: 440,
    ratios: [0.333, 0.333, 0.334],
    desc: 'Three equal flex containers'
  },
  {
    id: 'el-4col-equal',
    name: '4 Columns (25% × 4)',
    category: 'Elementor Flexbox',
    columns: '25% + 25% + 25% + 25%',
    width: 1200,
    height: 380,
    ratios: [0.25, 0.25, 0.25, 0.25],
    desc: 'Four equal flex columns for features/metrics'
  },
  {
    id: 'el-2col-3367',
    name: '2 Columns (33% / 67%)',
    category: 'Elementor Asymmetric',
    columns: '33% + 67%',
    width: 1200,
    height: 480,
    ratios: [0.33, 0.67],
    desc: 'Narrow sidebar on left + wide content area on right'
  },
  {
    id: 'el-2col-6733',
    name: '2 Columns (67% / 33%)',
    category: 'Elementor Asymmetric',
    columns: '67% + 33%',
    width: 1200,
    height: 480,
    ratios: [0.67, 0.33],
    desc: 'Wide hero on left + sidebar on right'
  },
  {
    id: 'el-2col-2575',
    name: '2 Columns (25% / 75%)',
    category: 'Elementor Asymmetric',
    columns: '25% + 75%',
    width: 1200,
    height: 460,
    ratios: [0.25, 0.75],
    desc: 'Ultra-wide display with navigation spine'
  },
  {
    id: 'el-2col-7525',
    name: '2 Columns (75% / 25%)',
    category: 'Elementor Asymmetric',
    columns: '75% + 25%',
    width: 1200,
    height: 460,
    ratios: [0.75, 0.25],
    desc: '75% Dominant showcase with secondary column'
  },
  {
    id: 'el-3col-255025',
    name: '3 Columns (25% / 50% / 25%)',
    category: 'Elementor Asymmetric',
    columns: '25% + 50% + 25%',
    width: 1200,
    height: 460,
    ratios: [0.25, 0.50, 0.25],
    desc: 'Center dominant column with dual supporting side wings'
  },
  {
    id: 'el-3col-502525',
    name: '3 Columns (50% / 25% / 25%)',
    category: 'Elementor Asymmetric',
    columns: '50% + 25% + 25%',
    width: 1200,
    height: 460,
    ratios: [0.50, 0.25, 0.25],
    desc: 'Left dominant hero + two stacked side columns'
  },
  {
    id: 'el-5col-equal',
    name: '5 Columns (20% × 5)',
    category: 'Elementor Flexbox',
    columns: '20% + 20% + 20% + 20% + 20%',
    width: 1240,
    height: 320,
    ratios: [0.2, 0.2, 0.2, 0.2, 0.2],
    desc: 'Five equal containers for logos or quick links'
  },
  {
    id: 'el-6col-equal',
    name: '6 Columns (16.6% × 6)',
    category: 'Elementor Flexbox',
    columns: '16.6% × 6',
    width: 1260,
    height: 300,
    ratios: [0.166, 0.166, 0.166, 0.166, 0.166, 0.17],
    desc: 'Six micro containers for brands/amenity icons'
  }
];
