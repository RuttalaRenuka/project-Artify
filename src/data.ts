import { Product, BlogPost, Testimonial, CustomerShowcase, Coupon } from './types';

export const products: Product[] = [
  {
    id: 'acrylic-masterpiece-24',
    name: 'Artify Masterpiece Acrylic Set (24 Colors x 22ml)',
    category: 'acrylic',
    categoryLabel: 'Acrylic Paints',
    description: 'Ultra-vibrant, highly-pigmented professional-grade acrylic paints with a buttery consistency. Offers outstanding lightfastness and effortless color mixing, drying to a rich satin finish.',
    price: 120.99,
    originalPrice: 180.99,
    rating: 4.8,
    reviewsCount: 142,
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-ACR-24M',
    availability: 'in-stock',
    stockCount: 45,
    specs: {
      materials: 'Highly refined acrylic polymers, premium organic/inorganic pigments',
      dimensions: 'Box: 24cm x 18cm x 3.5cm. Individual tubes: 22ml',
      usage: 'Perfect on stretched canvas, wood, plaster, paper, and metal.'
    },
    artistLevel: 'all',
    isBestSeller: true,
    tags: ['paint', 'acrylic', 'colors', 'tubes', 'professional', 'beginner', 'satin', 'vibrant', 'mix', 'blend']
  },
  {
    id: 'artisanal-oil-classic',
    name: 'Classic Artisanal Oil Painting Tubes (12 Pack)',
    category: 'oil',
    categoryLabel: 'Oil Paints',
    description: 'Slow-drying, rich-texture artist-grade oil paints using pure linseed oils. Excellent color body and buttery viscosity allow traditional impasto or delicate glazing techniques.',
    price: 150,
    originalPrice: 164.99,
    rating: 4.9,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-OIL-12P',
    availability: 'low-stock',
    stockCount: 8,
    specs: {
      materials: 'Cold-pressed linseed oil, highly concentrated pure pigments',
      dimensions: 'Box: 20cm x 15cm x 3cm. Tubes: 37ml each',
      usage: 'Best applied on primed canvas panels, stretched linen, or wooden boards.'
    },
    artistLevel: 'professional',
    isBestSeller: true,
    tags: ['paint', 'oil', 'tubes', 'linen', 'glaze', 'impasto', 'linseed', 'professional', 'advanced', 'slow-drying']
  },
  {
    id: 'velvet-horizon-watercolor',
    name: 'Velvet Horizon Professional Watercolor Palette',
    category: 'watercolor',
    categoryLabel: 'Watercolors',
    description: 'Handcrafted artist-grade watercolors with high dispersion and incredible transparency. Comes in a stunning black metal travel case with index swatch and folding mixing wells.',
    price: 145.00,
    originalPrice: 155.00,
    rating: 4.7,
    reviewsCount: 164,
    images: [
      'https://images.unsplash.com/photo-1525909002-1b05702214d4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-WTR-36P',
    availability: 'in-stock',
    stockCount: 29,
    specs: {
      materials: 'Natural gum arabic binder, premium concentrated pigment cakes',
      dimensions: 'Case: 22cm x 7cm x 2cm. 36 half pans included',
      usage: 'Excellent for wet-on-wet wash, detailed line illustration, and outdoor plener sketching.'
    },
    artistLevel: 'beginner',
    isBestSeller: false,
    isNewArrival: true,
    tags: ['paint', 'watercolor', 'pans', 'palette', 'transparent', 'gum arabic', 'sketchbook', 'illustration', 'beginner', 'wash']
  },
  {
    id: 'fineline-synthetic-brushes',
    name: 'Fineline Series Synthetic Brush Bundle (8 Pcs)',
    category: 'brushes',
    categoryLabel: 'Paint Brushes',
    description: 'Precision-tip ergonomic synthetic hair sable imitation brushes. Holds paint excellently, snaps back beautifully, and maintains sharp edges. Soft beechwood handles reduce wrist strain.',
    price: 124.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviewsCount: 205,
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-BRS-FL8',
    availability: 'in-stock',
    stockCount: 112,
    specs: {
      materials: 'Japanese synthetic nylon fibers, nickel-plated brass ferrules, beechwood handles',
      dimensions: 'Length ranging from 17cm to 21cm. Sizes 000, 0, 1, 2, 4, 6, 8, 10',
      usage: 'Universal bristles ideal for acrylics, watercolor wash, inkwork, and miniature painting.'
    },
    artistLevel: 'all',
    isBestSeller: true,
    tags: ['brush', 'brushes', 'synthetic', 'nylon', 'detail', 'miniature', 'handles', 'watercolor', 'acrylic', 'oil']
  },
  {
    id: 'french-oak-studio-easel',
    name: 'Artify Premium French Oak Studio Easel',
    category: 'canvas',
    categoryLabel: 'Canvas & Easels',
    description: 'Professional, fully-adjustable solid French oak H-frame studio easel. Offers precise master ratchet control to angle canvases from completely flat to fully vertical.',
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviewsCount: 52,
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-ESL-OAK',
    availability: 'in-stock',
    stockCount: 12,
    specs: {
      materials: 'A-grade seasoned oiled French Oak, brass plated gold hardware knobs',
      dimensions: 'Unfolded: 210cm tall x 60cm wide. Supports canvases up to 130cm height.',
      usage: 'Indoor studio application, oil painting stance, display easel or flat tabletop drafting.'
    },
    artistLevel: 'professional',
    isBestSeller: false,
    isNewArrival: true,
    tags: ['easel', 'oak', 'wood', 'furniture', 'studio', 'heavy-duty', 'display', 'canvas', 'professional', 'adjustable']
  },
  {
    id: 'heavyweight-canvas-pack',
    name: 'Ultra-Heavyweight Linen Canvas Box (3 Pack)',
    category: 'canvas',
    categoryLabel: 'Canvas & Easels',
    description: 'Triple-primed archival linen canvases stretched tightly over bevelled kiln-dried pine wood frame stretcher bars. Acid-free structure prevents deterioration for centuries.',
    price: 34.50,
    originalPrice: 42.00,
    rating: 4.8,
    reviewsCount: 97,
    images: [
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-CNV-1620',
    availability: 'in-stock',
    stockCount: 65,
    specs: {
      materials: 'Pure Belgian flax linen fiber, gesso clear primers, Scandinavian pine',
      dimensions: '16 inches x 20 inches (approx. 40cm x 50cm). Profile depth: 1.5 inches',
      usage: 'Excellent texture compatibility for professional heavy body oil and acrylic paint profiles.'
    },
    artistLevel: 'professional',
    isBestSeller: true,
    tags: ['canvas', 'linen', 'stretchers', 'frame', 'primed', 'oil', 'acrylic', 'gesso', 'archival', 'professional']
  },
  {
    id: 'graphite-companion-sketch',
    name: 'Charcoal & Graphite Sketching Companion Kit',
    category: 'drawing',
    categoryLabel: 'Drawing Supplies',
    description: 'Premium sketching compilation featuring fine grade graphite pencils, soft natural compressed willow charcoals, pencil extenders, paper stumps, and an interactive eraser set.',
    price: 18.99,
    originalPrice: 24.99,
    rating: 4.5,
    reviewsCount: 312,
    images: [
      'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-DRW-SKT',
    availability: 'in-stock',
    stockCount: 140,
    specs: {
      materials: 'Cedar wood casing, pure refined graphite, natural carbon charcoal',
      dimensions: 'Eco-leather cylinder roll: 20cm x 8cm',
      usage: 'Optimal for life-study sketches, shadow modeling, and architectural drafting.'
    },
    artistLevel: 'beginner',
    isBestSeller: false,
    tags: ['sketch', 'pencils', 'charcoal', 'graphite', 'shading', 'paper stumps', 'drawing', 'beginner', 'school']
  },
  {
    id: 'everbrush-markers-36',
    name: 'Artify Dual-Tip EverBrush Markers (36 Count)',
    category: 'drawing',
    categoryLabel: 'Drawing Supplies',
    description: 'Professional alcohol-based markers with unique dual tip selection (chisel tip and fine brush tip). Offers smooth, seamless ink gradient blends without streaking or paper bleed.',
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.7,
    reviewsCount: 154,
    images: [
      'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-MRK-ALC',
    availability: 'in-stock',
    stockCount: 50,
    specs: {
      materials: 'Non-toxic, low-odor premium alcohol base dyes, high-impact polymer plastic bodies',
      dimensions: 'Case: 18cm x 15cm x 12cm',
      usage: 'Favored by illustrative colorists, fashion designers, manga artists, and cartoonists.'
    },
    artistLevel: 'all',
    isBestSeller: true,
    isNewArrival: false,
    tags: ['marker', 'markers', 'ink', 'alcohol', 'coloring', 'manga', 'sketching', 'design', 'dual-tip', 'brush']
  },
  {
    id: 'resin-dreamscape-craft',
    name: 'Dreamscape Epoxy Resin Craft Bundle',
    category: 'resin',
    categoryLabel: 'Resin Art Supplies',
    description: 'Ultra-clear, bubble-free slow cures casting resin. Kit contains crystal hardener, epoxy resin base, mixing measures, and an initial set of deep metallic paint powder concentrates.',
    price: 58.00,
    originalPrice: 72.00,
    rating: 4.7,
    reviewsCount: 68,
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-RSN-DSM',
    availability: 'in-stock',
    stockCount: 22,
    specs: {
      materials: 'Low-odor bisphenol-A epoxy resin formulation, amine hardeners, organic mica pigments',
      dimensions: 'Resin: 500ml bottle, Hardener: 500ml bottle. Total 1 Liter volume',
      usage: 'Excellent for deep tabletop casting, geode art boards, customized pendant jewelry, and coasters.'
    },
    artistLevel: 'all',
    isBestSeller: false,
    isNewArrival: true,
    tags: ['resin', 'epoxy', 'molds', 'casting', 'mica', 'jewelry', 'diy', 'craft', 'clear', 'gloss']
  },
  {
    id: 'imperial-calligraphy-set',
    name: 'Imperial Calligraphy Nib & Pigment Set',
    category: 'calligraphy',
    categoryLabel: 'Calligraphy Supplies',
    description: 'Venerable traditional calligraphy kit containing 1 hand-crafted birchwood oblique pen holder, 6 classic bronze-plated metal nib tips, and 3 bottles of deep carbon shimmering pigment ink.',
    price: 36.50,
    originalPrice: 45.00,
    rating: 4.6,
    reviewsCount: 74,
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-CLG-IMP',
    availability: 'low-stock',
    stockCount: 5,
    specs: {
      materials: 'Polished birch handles, stainless brass-spring nibs, carbon-black pigment with gold flecks',
      dimensions: 'Premium velvet storage box: 26cm x 12cm x 4cm',
      usage: 'Perfect choice for Copperplate cursives, gothic invitations, hand lettering typography, and ink line work.'
    },
    artistLevel: 'professional',
    isBestSeller: false,
    isNewArrival: true,
    tags: ['calligraphy', 'ink', 'pen', 'holder', 'nibs', 'lettering', 'gold flecks', 'gothic', 'wedding']
  },
  {
    id: 'custom-palette-curator',
    name: 'Custom Palette Curator (Choose Your 10 Pigments)',
    category: 'customized',
    categoryLabel: 'Customized Paint Sets',
    description: 'Become your own paint formulator! Tailor-make your personal color set by hand-selecting exactly 10 premium 30ml jars. Mix-and-match across neon acrylic, metallic oil, or deep liquid watercolor washes.',
    price: 65.00,
    originalPrice: 79.99,
    rating: 4.9,
    reviewsCount: 55,
    images: [
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-CST-10P',
    availability: 'in-stock',
    stockCount: 15,
    specs: {
      materials: 'Individually poured pigments, eco-conscious timber container rack',
      dimensions: 'Wooden palette rack: 35cm x 10cm x 5cm. 10 jars x 30ml',
      usage: 'Best suited for advanced artists needing precise specific monochromatic or warm/cool palette scales.'
    },
    artistLevel: 'professional',
    isBestSeller: true,
    tags: ['customised', 'personalised', 'custom', 'paint', 'acrylic', 'colors', 'set', 'presents', 'gift']
  },
  {
    id: 'diy-watercolor-botanical',
    name: 'Botanical Watercolor DIY Starter Kit',
    category: 'kits',
    categoryLabel: 'DIY Art Kits',
    description: 'An all-inclusive self-guided workshop kit. Includes 4 step-by-step masterclass botanical outlines on professional cold-press watercolor sheets, 12 half-pans pigment case, and 2 detail brushes.',
    price: 29.99,
    originalPrice: 38.00,
    rating: 4.8,
    reviewsCount: 218,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525909002-1b05702214d4?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-KTS-BOT',
    availability: 'in-stock',
    stockCount: 88,
    specs: {
      materials: '300gsm acid-free watercolor papers, non-toxic pigment cakes, informational tutorial guide',
      dimensions: 'Gift box: 30cm x 22cm x 4cm',
      usage: 'Self-coaching home activity, relaxing craft, perfect creative gift for beginners or teens.'
    },
    artistLevel: 'beginner',
    isBestSeller: true,
    tags: ['kit', 'diy', 'botanical', 'watercolor', 'guide', 'painting', 'beginner', 'gift', 'tutorial']
  },
  {
    id: 'chameleon-fluid-acrylic',
    name: 'Chameleon Fluid Art & Acrylic Pour Kit',
    category: 'kits',
    categoryLabel: 'DIY Art Kits',
    description: 'Immerse into dynamic cell formations with our pre-diluted high-flow acrylic fluid paint package. Contains pouring silicon oil, 4 premium wooden canvases, mixing cups, and a step-by-step guide.',
    price: 42.00,
    originalPrice: 48.00,
    rating: 4.7,
    reviewsCount: 112,
    images: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-KTS-FLM',
    availability: 'in-stock',
    stockCount: 41,
    specs: {
      materials: 'Ready-pour medium formulation, pure silicon cell activator, pre-sealed art panels',
      dimensions: 'Packaging box: 28cm x 28cm x 10cm',
      usage: 'Unleashing abstract colorful cells. Fun for couples, therapeutic team-building, or beginners.'
    },
    artistLevel: 'all',
    isBestSeller: true,
    tags: ['kit', 'diy', 'fluid art', 'acrylic', 'pouring', 'cells', 'abstract', 'beginner', 'therapy', 'gift']
  },
  {
    id: 'coldpress-bound-sketchbook',
    name: 'Zen Artist Cold-Press Sketchbook (A4, 200gsm)',
    category: 'drawing',
    categoryLabel: 'Drawing Supplies',
    description: 'Hardbound luxurious eco-leather bound sketchbook filled with 80 acid-free cream-tinted sheets. Heavy texturing holds dense pencil lines, light watercolor washes, and ink calligraphy.',
    price: 21.99,
    originalPrice: 28.00,
    rating: 4.8,
    reviewsCount: 189,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-SKT-A4CP',
    availability: 'in-stock',
    stockCount: 75,
    specs: {
      materials: 'Vegan polyurethane leather cover, long-fiber cotton cotton blend papers, strong thread spine',
      dimensions: 'A4, 29.7cm x 21cm, 160 pages (80 double-sided sheets)',
      usage: 'Ink studies, charcoal sketchbooks, watercolors on the go, journal keeping and bullet planners.'
    },
    artistLevel: 'all',
    isBestSeller: false,
    tags: ['sketchbook', 'cotton', 'paper', 'cold-press', 'journal', 'book', 'drawing', 'watercolor', 'notes']
  },
  {
    id: 'junior-splash-fun-paints',
    name: 'Artify Junior Splash & Fun Acrylic Kids Set',
    category: 'craft',
    categoryLabel: 'Craft Materials',
    description: 'Totally ultra-washable, fully non-toxic colorful paints specially tuned for children. Features dynamic squeezy easy-dispense bottles and 4 chunky animal stamp accessories.',
    price: 15.99,
    originalPrice: 19.99,
    rating: 4.5,
    reviewsCount: 82,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-KID-SPLS',
    availability: 'in-stock',
    stockCount: 120,
    specs: {
      materials: '100% skin-safe, allergen-tested polymer pigments, washable starches',
      dimensions: 'Dispense bottles: 100ml each, 6 radiant colors',
      usage: 'Childhood projects, hand stamping, cleanable table play, school art nurseries.'
    },
    artistLevel: 'beginner',
    isBestSeller: false,
    tags: ['kids', 'children', 'washable', 'toy', 'school', 'craft', 'acrylic', 'stamp', 'beginner', 'paint']
  },
  {
    id: 'studio-gouache-18',
    name: 'Artify Masterclass Designer Gouache Set (18 Colors)',
    category: 'watercolor',
    categoryLabel: 'Watercolors & Gouache',
    description: 'Opaque, velvety, and matte professional-grade gouache paint in convenient air-tight jelly cups. Boasts intense pigment loading for smooth, non-streaky application. Mixes fluidly with water for beautiful opaque washes.',
    price: 32.50,
    originalPrice: 40.00,
    rating: 4.8,
    reviewsCount: 79,
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-GOU-18J',
    availability: 'in-stock',
    stockCount: 38,
    specs: {
      materials: 'High-density gum arabic base, ultra-fine powdered pigments, pure water compounds',
      dimensions: 'Organized container case: 21cm x 15cm x 6cm. 18 cups x 30ml',
      usage: 'Excellent compatibility with thick cardboards, robust cold-press papers, canvas panels, and illustration boards.'
    },
    artistLevel: 'all',
    isNewArrival: true,
    tags: ['paint', 'gouache', 'matte', 'opaque', 'color', 'jelly', 'watercolor', 'professional', 'wash']
  },
  {
    id: 'iridescent-acrylic-8',
    name: 'Chameleon Iridescent Metallic Acrylic Set (8 Colors)',
    category: 'acrylic',
    categoryLabel: 'Acrylic Paints',
    description: 'Shimmering metallic and color-shifting heavy-body acrylic paints. Pigments shift shades based on light angles, perfect for high-contrast multi-tonal fluid acrylic pour art, accents, and highlights.',
    price: 28.00,
    originalPrice: 35.00,
    rating: 4.9,
    reviewsCount: 63,
    images: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-ACR-IRD8',
    availability: 'in-stock',
    stockCount: 27,
    specs: {
      materials: 'Fine mica powder pigments, iridescent lightfast acrylic emulsions',
      dimensions: 'Outer package: 24cm x 12cm x 5cm. 8 bottles x 60ml',
      usage: 'Unsurpassed glow on dark canvases, wood, textured leather, clay sculptures, and casting resins.'
    },
    artistLevel: 'all',
    isNewArrival: true,
    isBestSeller: true,
    tags: ['paint', 'acrylic', 'metallic', 'shifting', 'iridescent', 'chameleon', 'glow', 'fluid', 'custom']
  },
  {
    id: 'mineral-pigments-jar-6',
    name: 'Fine Art Raw Mineral Organic Dry Pigments (6 Jars Set)',
    category: 'customized',
    categoryLabel: 'Customized Paint Sets',
    description: 'Sourced mineral-pure raw dry pigment powders for self-formulating custom paint. Includes classic Ultramarine, Prussian Blue, Natural Ochre, Cadmium Red, Raw Umber, and Zinc White. Mix with linseed oils, egg tempera, or acrylic paint binders.',
    price: 48.00,
    originalPrice: 59.99,
    rating: 4.9,
    reviewsCount: 34,
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-PIG-RAW6',
    availability: 'low-stock',
    stockCount: 6,
    specs: {
      materials: '100% natural pulverized mineral earth crystals, acid-free pure dry powders',
      dimensions: 'Storage rack: 22cm x 8cm x 7cm. 6 glass jars x 15g',
      usage: 'Self-binding custom paint mixtures, gilding materials, paint texture enhancements, and historical art replicas.'
    },
    artistLevel: 'professional',
    isNewArrival: true,
    tags: ['paint', 'pigment', 'mineral', 'raw', 'dry', 'custom', 'oil', 'acrylic', 'bind', 'authentic']
  },
  {
    id: 'acrylic-slow-extender',
    name: 'Pro-Glide Slow-Dry Acrylic Extender Gel & Medium',
    category: 'acrylic',
    categoryLabel: 'Acrylic Paints',
    description: 'Slows down acrylic drying time by up to 50% while preserving pigment opacity and sheen. Enables fluid blending and wet-on-wet paint techniques on wide-scale studio backdrops without rapid drying frustration.',
    price: 14.99,
    originalPrice: 19.00,
    rating: 4.7,
    reviewsCount: 110,
    images: [
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-MED-EXT',
    availability: 'in-stock',
    stockCount: 82,
    specs: {
      materials: 'Premium humectant polymer retarder gel formulation',
      dimensions: 'Bottle size: 250ml squeezable tube',
      usage: 'Mix 10-25% with acrylic colors to extend blendability time and glide ease without weakening film integrity.'
    },
    artistLevel: 'all',
    tags: ['medium', 'acrylic', 'extender', 'retarder', 'blend', 'gel', 'slow-dry', 'liquitex', 'glazing']
  },
  {
    id: 'hog-bristle-filbert-set',
    name: 'Atelier Pure Hog Bristle Fan & Filbert Brush Set (6 Pcs)',
    category: 'brushes',
    categoryLabel: 'Paint Brushes',
    description: 'Elite, stiff Chinese white hog bristle brushes featuring double-crimped ferrules and long wooden handles. Specially engineered to move thick, heavy-bodied oil paints and acrylic impasto with absolute tactile responsiveness and expressive stroke marks.',
    price: 135.00,
    originalPrice: 155.00,
    rating: 4.9,
    reviewsCount: 41,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-BRS-HOG6',
    availability: 'in-stock',
    stockCount: 34,
    specs: {
      materials: '100% natural bleached Chunking hog bristle, copper ferrules, varnished beechwood long handles',
      dimensions: 'Average length: 28cm. Sizes includes 2, 4, 6, 8 (Filberts) and 3, 6 (Fans)',
      usage: 'Perfect for heavy impasto modeling, wet blending, underpainting, and dragging thick gessos.'
    },
    artistLevel: 'professional',
    isNewArrival: true,
    tags: ['brush', 'brushes', 'hog bristle', 'filbert', 'fan', 'oil', 'acrylic', 'impasto', 'heavy body']
  },
  {
    id: 'watercolor-mop-quill-set',
    name: 'Aura Siberian Squirrel Imitation Wash Mop Quill Set (3 Pcs)',
    category: 'brushes',
    categoryLabel: 'Paint Brushes',
    description: 'Luxuriously absorbent quill-bound mop brushes constructed with highly advanced synthetic fibers mimicking pure squirrel hair. Holds immense volumes of fluid watercolor washes or ink while maintaining a razor-sharp, springy point for fine line-work.',
    price: 110.00,
    originalPrice: 125.00,
    rating: 4.8,
    reviewsCount: 56,
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525909002-1b05702214d4?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-BRS-MOP3',
    availability: 'in-stock',
    stockCount: 42,
    specs: {
      materials: 'High-grade synthetic squirrel filament, brass quill wires, matte black comfort handles',
      dimensions: 'Total length: 19cm. Brush sizes: #1, #4, #8',
      usage: 'Exceptional for broad watercolor washes, background coverage, organic leaves detailing, and oriental calligraphy.'
    },
    artistLevel: 'all',
    isNewArrival: true,
    tags: ['brush', 'brushes', 'watercolor', 'wash', 'mop', 'quill', 'ink', 'calligraphy', 'absorbent']
  },
  {
    id: 'acrylic-portrait-12',
    name: 'Artify Atelier Portrait Heavy-Body Acrylic Set (12 Colors)',
    category: 'acrylic',
    categoryLabel: 'Acrylic Paints',
    description: 'Curated portrait selection of heavy-body artist acrylics. Formulated with ultra-pure pigments to ensure hyper-realistic skin tones, delicate warm ochres, deep burnt umbers, and exquisite cool shadows with a modern satin finish.',
    price: 115.00,
    originalPrice: 140.00,
    rating: 4.9,
    reviewsCount: 28,
    images: [
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-ACR-PT12',
    availability: 'in-stock',
    stockCount: 19,
    specs: {
      materials: '100% fine acrylic emulsion binders, lightfast organic pigments',
      dimensions: 'Box: 22cm x 11cm x 3cm. 12 tubes x 30ml',
      usage: 'Masterful for figurative canvas painting, botanical illustrators, multi-layered realism, and wet-blend portraiture.'
    },
    artistLevel: 'all',
    isBestSeller: true,
    tags: ['paint', 'acrylic', 'portrait', 'earth tones', 'heavy body', 'figurative', 'professional']
  },
  {
    id: 'lapis-lazuli-gold-gilding',
    name: 'Renaissance Lapis Lazuli Oil Base & 24K Gold Leaf Kit',
    category: 'oil',
    categoryLabel: 'Oil Paints',
    description: 'Luxurious historic recreation set. Features handcrafted authentic Lapis Lazuli oil pigment blended in cold-pressed walnut oil, paired with premium gold-leaf gilding sheets and oil adhesive sizing for breathtaking museum-quality highlights.',
    price: 245.00,
    originalPrice: 280.00,
    rating: 4.9,
    reviewsCount: 18,
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-OIL-GLD',
    availability: 'low-stock',
    stockCount: 4,
    specs: {
      materials: 'Authentic crushed Lapis Lazuli stone, Italian walnut oil binder, 15 sheets of genuine 24-karat loose gold leaf',
      dimensions: 'Keepsake timber box: 15cm x 15cm x 5cm',
      usage: 'Intended for historic replication, fine gilding, sacred icon painting, and ultra-premium modern accent highlights.'
    },
    artistLevel: 'professional',
    isNewArrival: true,
    tags: ['oil', 'paint', 'gold leaf', 'gilding', 'lapis-lazuli', 'walnut oil', 'antique', 'authentic', 'luxury']
  },
  {
    id: 'polymer-clay-sculpt-24',
    name: 'Artify Artisanal Oven-Bake Polymer Clay Set (24 Colors)',
    category: 'craft',
    categoryLabel: 'Craft Materials',
    description: 'Soft, easily-moldable, non-sticky polymer craft clay that cures beautifully hard in standard home ovens. Excellent for modeling delicate details on toys, miniatures, or jewelry, complete with 5 stainless sculpting needles.',
    price: 129.00,
    originalPrice: 149.00,
    rating: 4.7,
    reviewsCount: 93,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-CLY-OV24',
    availability: 'in-stock',
    stockCount: 58,
    specs: {
      materials: 'Non-toxic polymer resin compounds, mineral softening oils, eco-friendly vibrant pigments',
      dimensions: 'Individual block: 4.5cm x 3.5cm x 1.2cm. Total weight: 650g',
      usage: 'Safe baking in family ovens at 130°C (266°F) for 15-30 minutes. Ideal for earrings, model rings, figures.'
    },
    artistLevel: 'all',
    isNewArrival: true,
    tags: ['craft', 'clay', 'polymer', 'sculpting', 'baking', 'miniature', 'jewelry', 'toys', 'modelling']
  },
  {
    id: 'glow-luminous-craft-powder',
    name: 'Glow-In-The-Dark Aura Ultra-Luminous Craft Pigment Set',
    category: 'craft',
    categoryLabel: 'Craft Materials',
    description: 'State-of-the-art strontium-aluminate photoluminescent powder set. Charges instantly under sunlight or LED. Mix with epoxy resin, clear glazes, varnishes, or craft mud wrappers to produce a brilliant lasting nocturnal glow.',
    price: 68.00,
    originalPrice: 79.00,
    rating: 4.8,
    reviewsCount: 45,
    images: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-GLO-PWR5',
    availability: 'in-stock',
    stockCount: 31,
    specs: {
      materials: 'High-purity earth-alkalinate strontium aluminate micro-crystals, skin-safe formula',
      dimensions: '5 airtight tubes x 20g. Colors: Cosmic Blue, Aurora Green, Violet Mystic, Sunlit Yellow, Coral Rose',
      usage: 'Mix up to 20% in transparent craft mediums like resin, clay acrylic glaze, glass paint, plastic rubber, or slime.'
    },
    artistLevel: 'all',
    isBestSeller: true,
    tags: ['craft', 'glow', 'luminous', 'pigment', 'resin', 'acrylic', 'fluid', 'phosphorescent', 'sculpture']
  },
  {
    id: 'washi-tapes-spring',
    name: 'Handcrafted Traditional Japanese Washi Tape Box (12 Rolls)',
    category: 'craft',
    categoryLabel: 'Craft Materials',
    description: 'Intricately printed, fibrous washi masking tapes imported from Kyoto. Easy to tear by hand and clean to peel without leaving sticky residues. Beautiful traditional botanical foil patterns ideal for scrapbooks, border framing, and crafts.',
    price: 42.50,
    originalPrice: 49.50,
    rating: 4.8,
    reviewsCount: 118,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525909002-1b05702214d4?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-WSH-KY12',
    availability: 'in-stock',
    stockCount: 88,
    specs: {
      materials: 'Natural mulberry gampi bark paper fibers, acid-free pressure adhesive, metallic gold hot stamping prints',
      dimensions: '12 rolls. Length: 5 meters per roll. Set widths: 4 rolls x 1.0cm, 6 rolls x 1.5cm, 2 rolls x 2.0cm',
      usage: 'Card making, scrapbooking framing, outlining clean painters borders on canvas, masking paper margins.'
    },
    artistLevel: 'all',
    tags: ['craft', 'washi', 'tape', 'masking', 'borders', 'kyoto', 'scrapbook', 'journal', 'botanical']
  },
  {
    id: 'air-dry-ceramic-clay',
    name: 'Artify Eco-Sculpt Air-Dry Terracotta Clay (5kg Bulk Pack)',
    category: 'craft',
    categoryLabel: 'Craft Materials',
    description: 'No kiln-baking or heavy tools required! This premium, ultra-fine air-drying terracotta clay delivers robust, durable hand-sculpted pieces with zero shrinkage cracking. Cures to a high-density stoneware matte-red texture within 24 to 48 hours.',
    price: 95.00,
    originalPrice: 110.00,
    rating: 4.8,
    reviewsCount: 65,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-CLY-AD5K',
    availability: 'in-stock',
    stockCount: 22,
    specs: {
      materials: 'Natural mineral sedimentary clay, organic fiber binders, moisture-retentive formulas',
      dimensions: 'Bespoke vacuum-sealed block: 26cm x 15cm x 10cm. Weight: 5.0 kg',
      usage: 'Fabulous for building high-durability clay pots, handmade garden sculptures, ceramic tea trays, figurines.'
    },
    artistLevel: 'all',
    isNewArrival: true,
    tags: ['craft', 'clay', 'terracotta', 'sculpture', 'air-dry', 'ceramic', 'pottery', 'sculpt', 'non-toxic']
  },
  {
    id: 'french-oak-sketch-box-easel',
    name: 'Imperial French Oak Field Sketching Box Easel',
    category: 'customized',
    categoryLabel: 'Customized Paint Sets',
    description: 'Exquisite multi-compartment painting field desk crafted from oiled French Oakwood. Folds swiftly into a compact carrying suitcase with leather handle straps, integrating durable brass locks, sliding storage compartments, and highly adjustable canvas angle support.',
    price: 195.00,
    originalPrice: 220.00,
    rating: 4.9,
    reviewsCount: 38,
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-ESL-FRN',
    availability: 'low-stock',
    stockCount: 8,
    specs: {
      materials: 'Sustainable shock-resistant French Oak timber, solid brass hardware, genuine leather straps',
      dimensions: 'Folded: 56cm x 42cm x 17.5cm. Extended max height: 185cm. Accommodates canvases up to 85cm',
      usage: 'Exceptional for plein-air traveling artists, outdoor sketching sessions, studio oil works, and watercolor panels.'
    },
    artistLevel: 'professional',
    isBestSeller: true,
    tags: ['easel', 'furniture', 'oak wood', 'classic', 'sketching', 'outdoor', 'studio', 'watercolor', 'oil']
  },
  {
    id: 'handmade-ceramic-palette',
    name: 'Artisanal Studio Glazed Sage Ceramic Paint Palette & Rest',
    category: 'customized',
    categoryLabel: 'Customized Paint Sets',
    description: 'Each piece is individually wheel-thrown and hand-carved. Coated in a brilliant gloss sage glaze that prevents watercolors or gouache from staining and ensures pristine pigment visibility. Integrates 9 mixing wells and a custom resting groove for delicate fine brushes.',
    price: 49.00,
    originalPrice: 59.00,
    rating: 4.9,
    reviewsCount: 47,
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-PAL-CER9',
    availability: 'in-stock',
    stockCount: 15,
    specs: {
      materials: 'High-density natural white stoneware clay, lead-free ceramic food-grade glaze coating',
      dimensions: 'Palette disk diameter: 14.5cm. Height: 1.8cm',
      usage: 'Highly recommended for watercolor wash blenders, opaque designer gouaches, Calligraphy inks, and liquid mediums.'
    },
    artistLevel: 'all',
    isNewArrival: true,
    tags: ['ceramic', 'palette', 'customized', 'handmade', 'artisan', 'watercolors', 'gauoche', 'mixing', 'brush-rest']
  },
  {
    id: 'gold-fluid-pouring-resin',
    name: 'Ocean-Glass Gold-Flecked Epoxy Casting Craft Resin Set',
    category: 'craft',
    categoryLabel: 'Craft Materials',
    description: 'Designed specifically for deep casting and creative pours. Features a crystal-clear, bubble-releasing, self-leveling resin chemistry premixed with ultra-fine shimmering gold foil flakes. Durable high-gloss glass-like cure resists yellowing under UV sunlight.',
    price: 139.00,
    originalPrice: 159.00,
    rating: 4.8,
    reviewsCount: 52,
    images: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-RSN-GF2G',
    availability: 'in-stock',
    stockCount: 36,
    specs: {
      materials: 'Advanced non-toxic epoxy polymer compound, organic hardener, physical gold foil flakes',
      dimensions: 'Dual bottles matching kit: Part A: 500ml + Part B: 500ml. Total: 1.0 Liter casting kit',
      usage: 'Excellent for pouring geode visual canvases, casting botanical flower jewelry pieces, sealing wood tables, and resin moulds.'
    },
    artistLevel: 'all',
    isNewArrival: true,
    tags: ['craft', 'resin', 'epoxy', 'gold flakes', 'casting', 'fluid art', 'woodcoat', 'molds', 'glaze']
  },
  {
    id: 'professional-fineliner-brush-bundle',
    name: 'Fineline Masterclass Synthetic Architectural Detailing Brush Bundle (8 Pcs)',
    category: 'brushes',
    categoryLabel: 'Paint Brushes',
    description: 'The ultimate array of high-precision micro brushes assembled for exquisite, ultra-detailed stroke control. Made of ultra-resilient Japanese synthetic fibers that snap back sharply. Ribbed triangular wooden grips provide long-term ergonomic ease.',
    price: 38.00,
    originalPrice: 48.00,
    rating: 4.9,
    reviewsCount: 84,
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-BRS-DET8',
    availability: 'in-stock',
    stockCount: 45,
    specs: {
      materials: 'Finest Japanese Toray hair, seamless nickel-plated copper ferrules, black matte comfort grips',
      dimensions: 'Brush length: 18cm. Micro liner tip sizes: 10/0, 5/0, 3/0, 2/0, 0, 1, 2, 4',
      usage: 'Sensational for painting model warships, architectural diagrams, fine eyes details, ceramic figurines, and botanical highlights.'
    },
    artistLevel: 'all',
    isBestSeller: true,
    tags: ['brush', 'brushes', 'fineline', 'detail', 'liners', 'miniatures', 'acrylic', 'watercolor', 'watercolors']
  },
  {
    id: 'liquid-metal-leafing-varnish',
    name: 'Artify Sovereign Liquid Leaf Metallic Gold Varnish (75ml)',
    category: 'acrylic',
    categoryLabel: 'Acrylic Paints',
    description: 'Transform surfaces into stunning polished metal! This ultra-dense solvent-based gilding paint flows like liquid mirror gold. Dries securely on any non-porous material within 15 minutes, leaving a sparkling, high-density brilliance.',
    price: 29.00,
    originalPrice: 35.00,
    rating: 4.8,
    reviewsCount: 39,
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-OIL-LLG5',
    availability: 'in-stock',
    stockCount: 50,
    specs: {
      materials: 'Dense leafing powder suspended in high-grade solvent copolymer varnish',
      dimensions: 'Glass pot: 75ml brush-well container',
      usage: 'Outstanding for restoring antique photo frames, highlighting sculptured clay, writing calligraphic script, detailing resin edges.'
    },
    artistLevel: 'all',
    isNewArrival: true,
    tags: ['metal', 'paint', 'gold leaf', 'liquid leaf', 'varnish', 'gilding', 'brilliant', 'frame', 'clay']
  },
  {
    id: 'silicone-wedge-shapers',
    name: 'Aether-Line Ergonomic Silicone Wedge & Craft Blend Shaper Set',
    category: 'brushes',
    categoryLabel: 'Paint Brushes',
    description: 'A gorgeous set of 5 hand-shaped flexible silicone tip brushes. Perfect for molding heavy gesso textures, carving pattern details into wet acrylic layers, smooth pastel blending, and sculpting model clays with pure tactile responsiveness without leaving bristle marks.',
    price: 45.00,
    originalPrice: 55.00,
    rating: 4.8,
    reviewsCount: 37,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-BRS-SIL5',
    availability: 'in-stock',
    stockCount: 40,
    specs: {
      materials: 'Eco-friendly food-grade liquid silicone tips, dual-crimped brass ferrules, satin-matte white Birchwood handles',
      dimensions: 'Wedges range from 0.8cm to 2.2cm. Length: 19cm',
      usage: 'Fabulous for heavy gel manipulation, blending graphite/pastel outlines, and modeling ceramic pottery details.'
    },
    artistLevel: 'all',
    isNewArrival: true,
    tags: ['silicone', 'brush', 'shaper', 'craft', 'acrylic', 'clay', 'modelling']
  },
  {
    id: 'holographic-multi-chrome-watercolor',
    name: 'Aurora Borealis Hand-Crushed Liquid Holographic Watercolor Palette (6 Wells)',
    category: 'watercolor',
    categoryLabel: 'Watercolors',
    description: 'An exquisite, hand-poured multi-chrome pan watercolor array infused with premium ground synthetic crystals. Shifts color dynamically from vibrant celestial violet to peacock teal depending on light angles. Ideal for cosmic skies, starry illustrations, and calligraphy accents.',
    price: 85.00,
    originalPrice: 99.00,
    rating: 4.9,
    reviewsCount: 29,
    images: [
      'https://images.unsplash.com/photo-1525909002-1b05702214d4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-WTR-AUR6',
    availability: 'in-stock',
    stockCount: 16,
    specs: {
      materials: 'Natural Acacia gum binder, high-density optical crystal dust, metal index storage palette',
      dimensions: '6 deep pans in a black aluminum slide-box (12cm x 6cm)',
      usage: 'Use with clean synthetic brush and generous water; layer over black paper substrates for spectacular color-shifting effects.'
    },
    artistLevel: 'all',
    isBestSeller: true,
    tags: ['watercolor', 'shimmer', 'holographic', 'metallic', 'paint', 'pan', 'handmade']
  },
  {
    id: 'botanical-flower-collage-kit',
    name: 'Studio-Vibe Premium Pressed Natural Botanical Flower & Leaf Craft Collage Kit',
    category: 'craft',
    categoryLabel: 'Craft Materials',
    description: 'Featuring 120 meticulously pressed, dried, and color-stabilized organic wildflowers, ferns, and rose petals harvested from chemical-free artisan meadows. Preserved permanently to resist fading, making them pristine for scrapbooking, resin casing, and multi-media canvas crafts.',
    price: 38.00,
    originalPrice: 45.00,
    rating: 4.7,
    reviewsCount: 78,
    images: [
      'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-CRF-BOT12',
    availability: 'in-stock',
    stockCount: 45,
    specs: {
      materials: '100% natural dehydrated meadow petals and leaf skeletons, protective acid-free card wrappers',
      dimensions: 'Set covers approximately 120 diverse botanical elements from 1.5cm to 8cm tall',
      usage: 'Excellent for epoxy resin jewelry pours, embellishing hand-poured candles, scrapbooks, and botanical collages.'
    },
    artistLevel: 'all',
    isNewArrival: true,
    tags: ['craft', 'flower', 'botanical', 'pressed', 'collage', 'resin', 'organic']
  },
  {
    id: 'iridescent-gilding-beeswax-paste',
    name: 'Sovereign Iridescent Oil-Based Gilding Wax & Metallic Bronze Lustre Set',
    category: 'oil',
    categoryLabel: 'Oil Paints',
    description: 'An ultra-refined wax paste formulated with raw organic honeybee wax and high-body bronze micro-pigments. Apply smoothly with a brush or soft cloth onto textures, frames, canvas highlights, or clay models. Buffs within 20 minutes to a permanent mirror lustre.',
    price: 65.00,
    originalPrice: 75.00,
    rating: 4.8,
    reviewsCount: 42,
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-OIL-GWX',
    availability: 'in-stock',
    stockCount: 28,
    specs: {
      materials: 'Hand-rendered beeswax binder, turpentine oil fraction, high-density non-tarnishing bronze powder',
      dimensions: 'Dual glass pots matching set: Antique Bronze (30ml) + Shimmering Gold (30ml)',
      usage: 'Ideal for highlight details on structural relief gessos, framing borders, metal restoration, and sculpture polishing.'
    },
    artistLevel: 'all',
    tags: ['oil', 'wax', 'metallic', 'gilding', 'patina', 'bronze', 'antique', 'gold']
  },
  {
    id: 'dual-chamber-stoneware-brush-washer',
    name: 'The Alchemist Obsidian Dual-Chamber Paint Brush Washer & Cleaner Jar',
    category: 'customized',
    categoryLabel: 'Customized Paint Sets',
    description: 'A handsome, high-grade obsidian black stoneware cleaning basin. Individually thrown on the studio wheel. Features a ribbed spiral bottom to comfortably scrub dried-down paint, dual chambers to separate clean water from muddy pigments, and 8 brush resting slots.',
    price: 75.00,
    originalPrice: 89.00,
    rating: 4.9,
    reviewsCount: 61,
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    sku: 'ART-PAL-BSHW',
    availability: 'in-stock',
    stockCount: 12,
    specs: {
      materials: 'High-density natural black stoneware clay with a non-porous chemical-resistant matte glaze',
      dimensions: 'Diameter: 13cm. Height: 9.5cm',
      usage: 'Fill left side with washing solvent or water, and right side with pure water for second brush rinse. Rest brushes on upper rim slots.'
    },
    artistLevel: 'all',
    isNewArrival: true,
    tags: ['cleaning', 'brush-washer', 'ceramic', 'obsidian', 'customized', 'pottery', 'accessory']
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'acrylic-layering-techniques',
    title: 'Mastering Acrylic Layering: 5 Pro Tips for Deep Textures',
    category: 'Painting Techniques',
    snippet: 'Discover the secrets of building dimension and luminosity in your acrylic artworks through systematic transparent glazes and impasto underpainting.',
    content: 'Acrylic paints are incredibly versatile, drying rapidly to allow fast-paced layer applications. However, many painters struggle with muddy color mixtures and flat surface values. To build rich visual depth, we outline five key techniques: \n\n1. UNDERPAINTING: Establish a strong monochromatic acrylic value map before placing your final colors. This acts as a foundation of shadow and highlight.\n\n2. TRANSPARENT GLAZING: Dilute high-pigment items with clear gloss medium rather than plain water. Water breaks the polymer bonds, while medium locks the pigment in a beautiful transparent sheet that filters light.\n\n3. THERMAL BLOW DRYING: Dry your layer completely before working the next layer to avoid activating dry pigment.\n\n4. IMPASTO STREAKS: Utilize heavy body gel mediums to construct 3D ridges that interact physically with light in your studio.\n\n5. DRY BRUSH OVERLAYS: Drag a partially dried brush loaded with titanium white across a bumpy texture to highlight crests of canvas peaks. Enjoy creative control without limits!',
    author: 'Elena Rostova',
    date: 'June 5, 2026',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
    readTime: '4 min read',
    tags: ['acrylic', 'layering', 'glazing', 'impasto', 'textures', 'tutorials']
  },
  {
    id: 'choosing-the-right-watercolor-paper',
    title: 'Cold-Press vs. Hot-Press: Choosing Your Perfect Watercolor Canvas',
    category: 'Product Guides',
    snippet: 'Struggling to control wet-on-wet watercolor washes? The problem might not be your brush, but your paper choice. Let us break down wood pulp vs cotton structures.',
    content: 'Watercolor paper is the quiet partner in every beautiful wash. It is available in three distinct press formats that yield entirely different results: \n\n- COLD-PRESS (NOT): Features a beautiful textured surface. The microscopic dimples catch pooled fluid water, enabling spectacular granulation and organic washes. Highly recommended for landscape artists and beginner learning guides.\n\n- HOT-PRESS: Smooth as satin. The watercolor stays on top, drying quickly via evaporation. Excellent for extremely fine detail work, botanicals, oblique calligraphy letter detailing, and precision manga lines.\n\n- ROUGH: Heavily textured surfaces that absorb deep saturations of pigments, ideal for high-contrast heavy value brush drag patterns.\n\nAlways prefer 100% cotton paper composites rated at 300gsm (140lb) to prevent buckle warping during wet wash techniques.',
    author: 'Marcus Vance',
    date: 'May 28, 2026',
    image: 'https://images.unsplash.com/photo-1525909002-1b05702214d4?w=600&auto=format&fit=crop&q=80',
    readTime: '6 min read',
    tags: ['watercolor', 'paper', 'cold-press', 'hot-press', 'cotton', 'guides']
  },
  {
    id: 'resin-art-bubble-elimination',
    title: 'Resin Art 101: How to Achieve a Crystal Clear Glass Finish',
    category: 'Art Tutorials',
    snippet: 'Tired of pesky microbubbles breaking your beautiful glossy resin geodes? Learn of optimum temperatures and vacuum tricks to make coatings glass-smooth.',
    content: 'Epoxy resin creates magnificent glossy art, but tiny pockets of trapped air can cloud your masterpiece. Here is the foolproof workflow used by elite resin casting creators: \n\n1. SHIELD WITH WARMTH: Keep your resin workspace and compounding fluids between 22-25°C. Cold resin is highly viscous and traps air fast.\n\n2. THE GENTLE STIR: Fold part A and B slowly in wide circles for 4 full minutes. Whipping details around fast creates a foam of microbubbles.\n\n3. HEAT DE-GAS: Once poured into geode frames, gently glide a small butane torch 10cm above the surface. The rising hot air draws bubbles to pop instantaneously.\n\nWith these steps, your resin castings will dry with a polished crystal look!',
    author: 'Sienna Sterling',
    date: 'April 14, 2026',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80',
    readTime: '5 min read',
    tags: ['resin', 'epoxy', 'craft', 'crystal clear', 'tutorials', 'bubbles']
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'Julianne Wilde',
    role: 'Professional Abstract Painter',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Artify has altered my entire workflow! Their Masterpiece Acrylic pigments offer unmatched brilliance. The colors do not alter as they dry, and shipping to my gallery was fast and pristine.'
  },
  {
    id: 't-2',
    name: 'Aris Thorne',
    role: 'Fine Art Lecturer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Instructing art students requires access to durable, reliable materials that do not break budgets. The DIY Watercolor Kits and brush bundles are standard curriculum additions in my academy now.'
  },
  {
    id: 't-3',
    name: 'Chloe Laurent',
    role: 'Resin Geode Crafter',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Epoxy resin products online are often yellow or low-viscosity. Artify’s Dreamscape bundle is stellar! Totally clear, bubble-free, and cures with a gorgeous glass luster that clients love.'
  }
];

export const communityGallery: CustomerShowcase[] = [
  {
    id: 'sh-1',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=80',
    artist: '@sarah_paints_vibe',
    title: 'Neon Acrylic Pour Study',
    likes: 421
  },
  {
    id: 'sh-2',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=80',
    artist: '@vance_fineart',
    title: 'Morning Light on Oaks - Studio Oil Trial',
    likes: 588
  },
  {
    id: 'sh-3',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=80',
    artist: '@minimalist_mamba',
    title: 'Fineline Japanese Ink Calligraphy Oblique',
    likes: 312
  },
  {
    id: 'sh-4',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop&q=80',
    artist: '@resi_creations_coast',
    title: 'Ocean Geode Shallow Casting Tray',
    likes: 742
  }
];

export const coupons: Coupon[] = [
  {
    id: 'welcome10',
    code: 'CREATIVE10',
    discountPercent: 10,
    description: '10% OFF your first order of premium art supplies!',
    expiryDate: 'Dec 31, 2026'
  },
  {
    id: 'master20',
    code: 'ARTIFYMASTER',
    discountPercent: 20,
    description: '20% OFF orders above ₹100. Upgrade your studio toolkit.',
    expiryDate: 'Oct 15, 2026',
    minSpend: 100
  },
  {
    id: 'brushbogo',
    code: 'DETAILBOGO',
    discountPercent: 15,
    description: '15% OFF synthetic details or brush bundle sets.',
    expiryDate: 'Jul 30, 2026'
  }
];
