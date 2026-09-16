// Expanded Font Collection & Dynamic Google Font Loader

export const EXPANDED_FONTS = [
  // 1. Luxury Editorial Serif & Couture
  { name: 'Cormorant Garamond', category: 'Luxury Serif', family: '"Cormorant Garamond", serif', weights: ['300', '400', '600'] },
  { name: 'Playfair Display', category: 'Luxury Serif', family: '"Playfair Display", serif', weights: ['400', '600', '700'] },
  { name: 'Cinzel', category: 'Royal Monogram', family: '"Cinzel", serif', weights: ['400', '600', '700'] },
  { name: 'Cinzel Decorative', category: 'Royal Monogram', family: '"Cinzel Decorative", serif', weights: ['700'] },
  { name: 'Bodoni Moda', category: 'High Fashion', family: '"Bodoni Moda", serif', weights: ['400', '600', '800'] },
  { name: 'Prata', category: 'Luxury Serif', family: '"Prata", serif', weights: ['400'] },
  { name: 'Marcellus', category: 'Royal Monogram', family: '"Marcellus", serif', weights: ['400'] },
  { name: 'Italiana', category: 'High Fashion', family: '"Italiana", serif', weights: ['400'] },
  { name: 'DM Serif Display', category: 'Luxury Serif', family: '"DM Serif Display", serif', weights: ['400'] },
  { name: 'Castoro Titling', category: 'Luxury Serif', family: '"Castoro Titling", serif', weights: ['400'] },
  { name: 'Cormorant Infant', category: 'Luxury Serif', family: '"Cormorant Infant", serif', weights: ['300', '500'] },
  { name: 'Cormorant SC', category: 'Royal Monogram', family: '"Cormorant SC", serif', weights: ['400', '600'] },
  { name: 'Bellefair', category: 'Luxury Serif', family: '"Bellefair", serif', weights: ['400'] },
  { name: 'Oranienbaum', category: 'High Fashion', family: '"Oranienbaum", serif', weights: ['400'] },
  { name: 'Spectral', category: 'Luxury Serif', family: '"Spectral", serif', weights: ['300', '400', '600'] },
  { name: 'Cinzel Decorative', category: 'Royal Monogram', family: '"Cinzel Decorative", serif', weights: ['400', '700'] },

  // 2. Ultra-Modern Sans & Tech
  { name: 'Plus Jakarta Sans', category: 'Modern Sans', family: '"Plus Jakarta Sans", sans-serif', weights: ['300', '400', '600', '700'] },
  { name: 'Inter', category: 'Modern Sans', family: '"Inter", sans-serif', weights: ['300', '400', '600', '800'] },
  { name: 'Syne', category: 'Modern Sans', family: '"Syne", sans-serif', weights: ['500', '700', '800'] },
  { name: 'Space Grotesk', category: 'Modern Sans', family: '"Space Grotesk", sans-serif', weights: ['400', '600', '700'] },
  { name: 'Outfit', category: 'Modern Sans', family: '"Outfit", sans-serif', weights: ['300', '400', '600'] },
  { name: 'Manrope', category: 'Modern Sans', family: '"Manrope", sans-serif', weights: ['400', '600', '700'] },
  { name: 'Montserrat', category: 'Modern Sans', family: '"Montserrat", sans-serif', weights: ['300', '500', '700'] },
  { name: 'Urbanist', category: 'Modern Sans', family: '"Urbanist", sans-serif', weights: ['300', '500', '700'] },
  { name: 'Clash Display', category: 'Modern Sans', family: '"Space Grotesk", sans-serif', weights: ['600'] },
  { name: 'Sora', category: 'Modern Sans', family: '"Sora", sans-serif', weights: ['400', '600'] },
  { name: 'Epilogue', category: 'Modern Sans', family: '"Epilogue", sans-serif', weights: ['400', '700'] },
  { name: 'General Sans', category: 'Modern Sans', family: '"Plus Jakarta Sans", sans-serif', weights: ['500'] },

  // 3. Technical & Swiss Monospace
  { name: 'JetBrains Mono', category: 'Monospace', family: '"JetBrains Mono", monospace', weights: ['400', '600'] },
  { name: 'Space Mono', category: 'Monospace', family: '"Space Mono", monospace', weights: ['400', '700'] },
  { name: 'Fira Code', category: 'Monospace', family: '"Fira Code", monospace', weights: ['400', '500'] },
  { name: 'IBM Plex Mono', category: 'Monospace', family: '"IBM Plex Mono", monospace', weights: ['400', '600'] },

  // 4. Elegant Calligraphy & Script
  { name: 'Alex Brush', category: 'Script & Cursive', family: '"Alex Brush", cursive', weights: ['400'] },
  { name: 'Great Vibes', category: 'Script & Cursive', family: '"Great Vibes", cursive', weights: ['400'] },
  { name: 'Pinyon Script', category: 'Script & Cursive', family: '"Pinyon Script", cursive', weights: ['400'] },
  { name: 'Parisienne', category: 'Script & Cursive', family: '"Parisienne", cursive', weights: ['400'] },
  { name: 'Allura', category: 'Script & Cursive', family: '"Allura", cursive', weights: ['400'] },
  { name: 'Monsieur La Doulaise', category: 'Script & Cursive', family: '"Monsieur La Doulaise", cursive', weights: ['400'] }
];

// Helper to dynamically load any Google Font on the fly
export const loadGoogleFont = (fontName) => {
  const cleanName = fontName.replace(/["']/g, '').trim();
  const fontId = `google-font-${cleanName.toLowerCase().replace(/\s+/g, '-')}`;
  if (document.getElementById(fontId)) return;

  const link = document.createElement('link');
  link.id = fontId;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(cleanName)}:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap`;
  document.head.appendChild(link);
};
