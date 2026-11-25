import { BoutiqueLocation, JournalArticle, OrderRecord, Product } from '../types';

export const IMAGES = {
  hero: '/src/assets/images/hero_pure_flow_monolith_1795600617700.jpg',
  titanium: '/src/assets/images/vessel_titanium_silver_1795600616958.jpg',
  obsidian: '/src/assets/images/vessel_obsidian_matte_1795600618674.jpg',
  glass: '/src/assets/images/vessel_borosilicate_glass_1795600619315.jpg',
  ceramic: '/src/assets/images/vessel_travertine_ceramic_1795600617960.jpg',
  atelier: '/src/assets/images/craft_atelier_stone_1795600619504.jpg',
};

export const PRODUCTS: Product[] = [
  {
    id: 'pf-monolith-ti',
    slug: 'monolith-titanium-01',
    name: 'Monolith Grade-5 Titanium',
    series: 'Series 01 · Flagship',
    category: 'Titanium',
    basePrice: 240,
    shortDescription:
      'CNC-machined from aerospace-grade Ti-6Al-4V with a double-wall copper thermal vacuum and zero metallic taste transfer.',
    longDescription:
      'Engineered in Zurich from solid Grade-5 titanium billet, the Monolith 01 weighs 38% less than stainless steel while delivering 36 hours of cold preservation. An electropolished interior prevents mineral buildup, keeping spring water completely neutral.',
    coldHours: 36,
    hotHours: 18,
    materialSummary: 'Grade-5 Titanium · Copper Shield',
    availability: 'In Stock',
    finishes: [
      { id: 'raw-ti', name: 'Raw Brushed Titanium', hex: '#A9ABA8', image: IMAGES.titanium },
      { id: 'obsidian', name: 'Obsidian Anodized', hex: '#232629', image: IMAGES.obsidian },
      { id: 'travertine', name: 'Limestone Ceramic', hex: '#D8D2C5', image: IMAGES.ceramic },
    ],
    capacities: [
      { ml: 500, label: '500 ml', priceDelta: 0, heightMm: 224, diameterMm: 71, weightGrams: 198 },
      { ml: 750, label: '750 ml', priceDelta: 35, heightMm: 262, diameterMm: 76, weightGrams: 245 },
      { ml: 1000, label: '1000 ml', priceDelta: 65, heightMm: 294, diameterMm: 84, weightGrams: 292 },
    ],
    specs: {
      alloy: 'Ti-6Al-4V Grade-5 Titanium + 99.9% Copper Foil',
      seal: 'Medical-Grade Fluoropolymer Compression Ring',
      mouthDiameterMm: 44,
      origin: 'Machined in Zurich, Switzerland',
      care: 'Rinse with warm water; cap gasket removable for sterilization.',
    },
  },
  {
    id: 'pf-obsidian-nocturne',
    slug: 'nocturne-obsidian-vessel',
    name: 'Nocturne Obsidian Edition',
    series: 'Series 02 · Architectural',
    category: 'Titanium',
    basePrice: 215,
    shortDescription:
      'Micro-blasted obsidian shell paired with a knurled solid bronze closure and acoustic compression seal.',
    longDescription:
      'Finished through a 14-stage diamond-like carbon treatment for scratch immunity, the Nocturne Obsidian Vessel balances deep matte light absorption with a precision-knurled oxidized bronze collar.',
    coldHours: 32,
    hotHours: 16,
    materialSummary: 'DLC Titanium · Knurled Bronze',
    availability: 'In Stock',
    finishes: [
      { id: 'obsidian', name: 'Obsidian Bronze', hex: '#232629', image: IMAGES.obsidian },
      { id: 'raw-ti', name: 'Raw Brushed Titanium', hex: '#A9ABA8', image: IMAGES.titanium },
    ],
    capacities: [
      { ml: 500, label: '500 ml', priceDelta: 0, heightMm: 220, diameterMm: 72, weightGrams: 218 },
      { ml: 750, label: '750 ml', priceDelta: 30, heightMm: 258, diameterMm: 77, weightGrams: 268 },
    ],
    specs: {
      alloy: 'DLC-Coated Titanium Shell / C510 Phosphor Bronze Cap',
      seal: 'Silent Quarter-Turn Acoustic Compression Seal',
      mouthDiameterMm: 42,
      origin: 'Finished in Milan & Zurich',
      care: 'Hand wash only to preserve natural bronze patina.',
    },
  },
  {
    id: 'pf-smoked-borosilicate',
    slug: 'solis-smoked-borosilicate',
    name: 'Solis Smoked Borosilicate',
    series: 'Series 03 · Table & Desk',
    category: 'Glass',
    basePrice: 145,
    shortDescription:
      'Hand-blown 4.2mm smoked laboratory borosilicate glass with a turned stainless steel stopper for pure mineral clarity.',
    longDescription:
      'Designed for architectural workspaces and dining tables, Solis refracts natural daylight through mineral-tinted borosilicate glass. Completely inert and thermal-shock resistant up to 160°C.',
    coldHours: 6,
    hotHours: 4,
    materialSummary: '4.2mm Borosilicate · Turned Steel',
    availability: 'In Stock',
    finishes: [
      { id: 'smoked-glass', name: 'Smoked Quartz Glass', hex: '#747875', image: IMAGES.glass },
      { id: 'travertine', name: 'Fluted Limestone Sleeve', hex: '#D8D2C5', image: IMAGES.ceramic },
    ],
    capacities: [
      { ml: 500, label: '500 ml', priceDelta: 0, heightMm: 205, diameterMm: 78, weightGrams: 310 },
      { ml: 750, label: '750 ml', priceDelta: 25, heightMm: 245, diameterMm: 84, weightGrams: 395 },
      { ml: 1000, label: '1000 ml', priceDelta: 45, heightMm: 278, diameterMm: 90, weightGrams: 465 },
    ],
    specs: {
      alloy: 'Schott Duran 3.3 Borosilicate / 316L Marine Steel Cap',
      seal: 'Inert Platinum-Cured Gasket',
      mouthDiameterMm: 38,
      origin: 'Hand-blown in Bohemia, Czech Republic',
      care: 'Dishwasher safe glass body; wipe steel stopper dry.',
    },
  },
  {
    id: 'pf-fluted-travertine',
    slug: 'atelier-fluted-ceramic',
    name: 'Atelier Fluted Ceramic',
    series: 'Series 04 · Tactile',
    category: 'Ceramic',
    basePrice: 185,
    shortDescription:
      'Sculptural vertical fluting over a vacuum-insulated core, finished in kiln-fired matte limestone ceramic.',
    longDescription:
      'Inspired by classical Doric columns and raw Roman travertine, the Atelier Fluted Ceramic vessel offers warm tactile grip without condensation. Inside sits a pure ceramic-lined chamber so acidic citrus or mineral infusions never alter flavor.',
    coldHours: 28,
    hotHours: 14,
    materialSummary: 'Kiln Ceramic Glaze · Vacuum Core',
    availability: 'Small Batch',
    finishes: [
      { id: 'travertine', name: 'Warm Travertine', hex: '#DDD6C7', image: IMAGES.ceramic },
      { id: 'obsidian', name: 'Basalt Matte', hex: '#282B2E', image: IMAGES.obsidian },
    ],
    capacities: [
      { ml: 500, label: '500 ml', priceDelta: 0, heightMm: 226, diameterMm: 74, weightGrams: 280 },
      { ml: 750, label: '750 ml', priceDelta: 30, heightMm: 264, diameterMm: 79, weightGrams: 336 },
    ],
    specs: {
      alloy: '316L Core with Dual-Fired Mineral Ceramic Outer & Inner Coat',
      seal: 'Flush Ceramic-Inlaid Screw Closure',
      mouthDiameterMm: 44,
      origin: 'Glazed in Kyoto, Japan',
      care: 'Hand wash with soft brush; avoid abrasive pads.',
    },
  },
  {
    id: 'pf-quartz-uvc',
    slug: 'alpine-uvc-purifier',
    name: 'Alpine Quartz UV-C Vessel',
    series: 'Series 05 · Purification',
    category: 'Titanium',
    basePrice: 295,
    shortDescription:
      'Integrated 275nm sapphire-crystal UV-C optical cap neutralizes 99.99% of bio-contaminants in 60 seconds.',
    longDescription:
      'Built for transcontinental travel and alpine expeditions, the Alpine Quartz Vessel houses a concealed USB-C rechargeable UV-C emitter beneath a sapphire optical window—keeping both your water and the vessel interior microbiologically pure.',
    coldHours: 34,
    hotHours: 16,
    materialSummary: 'Grade-5 Titanium · 275nm UV-C Cap',
    availability: 'Made to Order',
    finishes: [
      { id: 'hero-duo', name: 'Brushed Steel & Obsidian Band', hex: '#4A4E52', image: IMAGES.hero },
      { id: 'raw-ti', name: 'Raw Brushed Titanium', hex: '#A9ABA8', image: IMAGES.titanium },
    ],
    capacities: [
      { ml: 500, label: '500 ml', priceDelta: 0, heightMm: 234, diameterMm: 72, weightGrams: 248 },
      { ml: 750, label: '750 ml', priceDelta: 40, heightMm: 270, diameterMm: 77, weightGrams: 295 },
    ],
    specs: {
      alloy: 'Grade-5 Titanium / Sapphire Optical Window / Li-Po 45-Day Cell',
      seal: 'IPX8 Submersible Magnetic Charge Port',
      mouthDiameterMm: 44,
      origin: 'Assembled in Zurich, Switzerland',
      care: 'Cap charges via magnetic USB-C cable; 45 days per charge.',
    },
  },
  {
    id: 'pf-mineral-cap-set',
    slug: 'precision-cap-mineral-kit',
    name: 'Precision Cap & Mineral Kit',
    series: 'Accessories · Hardware',
    category: 'Accessories',
    basePrice: 85,
    shortDescription:
      'Interchangeable machined bronze and titanium closures accompanied by alpine quartz remineralization stones.',
    longDescription:
      'Upgrade any Series 01, 02, or 04 Pure Flow vessel with interchangeable CNC-turned caps and hand-selected Swiss quartz stones engineered to restore balanced alkaline mineral notes.',
    coldHours: 36,
    hotHours: 18,
    materialSummary: 'Phosphor Bronze · Titanium · Quartz',
    availability: 'In Stock',
    finishes: [
      { id: 'bronze-kit', name: 'Bronze & Titanium Pair', hex: '#8A6D4B', image: IMAGES.obsidian },
      { id: 'raw-ti', name: 'Brushed Titanium Solo', hex: '#A9ABA8', image: IMAGES.titanium },
    ],
    capacities: [
      { ml: 44, label: '44mm Universal', priceDelta: 0, heightMm: 28, diameterMm: 48, weightGrams: 72 },
    ],
    specs: {
      alloy: 'C510 Bronze & Ti-6Al-4V + Natural Alpine Quartz',
      seal: 'Dual Spare Compression Rings Included',
      mouthDiameterMm: 44,
      origin: 'Machined in Zurich, Switzerland',
      care: 'Boil quartz stones for 3 minutes every 30 days.',
    },
  },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: 'silence-of-titanium',
    title: 'The Acoustic Silence of Grade-5 Titanium',
    category: 'Materiality',
    publishedAt: 'October 2026',
    readTime: '5 min read',
    author: 'Elena Vance',
    authorRole: 'Head of Metallurgy, Pure Flow Zurich',
    coverImage: IMAGES.titanium,
    excerpt:
      'Why eliminating stainless steel resonance and polymeric coatings transforms the sensory ritual of drinking still water.',
    pullQuote:
      'When metal imparts zero taste and zero metallic ring against stone, the vessel disappears and only water remains.',
    body: [
      'Most insulated vessels are built from 18/8 stainless steel—an alloy originally formulated for industrial kitchens rather than intimate daily contact with unflavored spring water. Over hours of thermal storage, trace iron and nickel ions subtly flatten the crispness of low-mineral water.',
      'During the three-year development of Series 01, our metallurgy lab in Zurich tested fourteen medical and aerospace alloys against neutral alpine water from Vals. Only Ti-6Al-4V Grade-5 titanium, electropolished to a mirror-grade 0.08 Ra internal roughness, demonstrated zero detectable ion migration after 72 continuous hours.',
      'Beyond taste neutrality, wall thickness governs tactile calm. Because Grade-5 titanium offers nearly twice the tensile strength of steel at half the density, we can machine walls to 0.45mm—leaving room for a deep vacuum cavity and a 99.9% pure copper infrared shield without adding bulk to the hand.',
      'Each thread at the neck is single-point turned rather than rolled, eliminating the scraping sound common to stamped bottles. You open and close a Pure Flow vessel in near-complete silence.',
    ],
    featuredProductSlug: 'monolith-titanium-01',
  },
  {
    slug: 'architecture-of-mineral-hydration',
    title: 'Architecture of the Daily Table',
    category: 'Design Notes',
    publishedAt: 'September 2026',
    readTime: '4 min read',
    author: 'Kenji Takahashi',
    authorRole: 'Industrial Design Director',
    coverImage: IMAGES.atelier,
    excerpt:
      'How Roman travertine proportions and Kyoto ceramic fluting informed a bottle meant to live permanently on architectural desks.',
    pullQuote:
      'An object you touch twenty times a day deserves the quiet permanence of carved stone rather than disposable sports plastic.',
    body: [
      'Hydration gear has spent two decades borrowing its visual grammar from mountain bikes and neon gym floors. When placed beside a linen notebook, a fountain pen, or a travertine dining table, bright logos feel jarring.',
      'We approached Pure Flow as architectural table sculpture first and thermal engineering second. Every proportion follows a 1:3.2 cylinder ratio—tall enough to feel poised, low enough in center of gravity to resist tipping on studio worktables.',
      'For the Atelier Fluted Ceramic edition, twenty-four vertical channels are milled before firing a matte mineral glaze. The channels create subtle shadow play as afternoon light moves across a room while naturally increasing surface grip.',
    ],
    featuredProductSlug: 'atelier-fluted-ceramic',
  },
  {
    slug: 'refraction-and-borosilicate',
    title: 'Light, Caustics, and Borosilicate Clarity',
    category: 'Craftsmanship',
    publishedAt: 'August 2026',
    readTime: '6 min read',
    author: 'Dr. Lukas Meyer',
    authorRole: 'Thermal & Optical Advisor',
    coverImage: IMAGES.glass,
    excerpt:
      'Inside our collaboration with third-generation Bohemian glassblowers to achieve 4.2mm wall consistency without internal stress.',
    pullQuote:
      'True clarity is measured not when glass is empty, but when still water bends morning light onto raw stone.',
    body: [
      'Laboratory borosilicate 3.3 is prized for its low coefficient of thermal expansion, allowing a vessel to move from chilled cellar storage directly to boiling herbal infusions without micro-fractures.',
      'In Bohemia, each Solis vessel is mouth-blown into graphite molds, annealed for fourteen hours to release internal tension, and finished with a cold-ground lip. The subtle smoke tint shields delicate water minerals from harsh ultraviolet spectrums while preserving gentle caustics on the table below.',
    ],
    featuredProductSlug: 'solis-smoked-borosilicate',
  },
];

export const BOUTIQUES: BoutiqueLocation[] = [
  {
    id: 'zurich',
    city: 'Zurich',
    district: 'Paradeplatz',
    address: 'Talstrasse 18, 8001 Zürich, Switzerland',
    hours: 'Mon–Sat · 10:00 – 19:00',
    phone: '+41 44 580 24 10',
    architectNote: 'Monolithic Valser quartzite tasting bar and bespoke laser-engraving atelier.',
    services: ['Bespoke Engraving', 'Mineral Water Tasting', 'Lifetime Seal Servicing'],
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    district: 'Minami-Aoyama',
    address: '5-7-21 Minami-Aoyama, Minato-ku, Tokyo 107-0062',
    hours: 'Daily · 11:00 – 20:00',
    phone: '+81 3 6427 9104',
    architectNote: 'Charred cedar and cast plaster gallery housing the full Kyoto ceramic archive.',
    services: ['Kyoto Glaze Archive', 'Bespoke Engraving', 'Private Consultations'],
  },
  {
    id: 'paris',
    city: 'Paris',
    district: 'Le Marais',
    address: '14 Rue des Francs-Bourgeois, 75003 Paris, France',
    hours: 'Tue–Sun · 10:30 – 19:30',
    phone: '+33 1 42 78 51 20',
    architectNote: 'Restored limestone courtyard with natural skylight and filtered spring bar.',
    services: ['Mineral Water Tasting', 'Monogram Atelier', 'Courier Dispatch'],
  },
  {
    id: 'new-york',
    city: 'New York',
    district: 'SoHo',
    address: '112 Mercer Street, New York, NY 10012',
    hours: 'Mon–Sun · 11:00 – 19:00',
    phone: '+1 212 555 0194',
    architectNote: 'Cast-iron loft space featuring brushed titanium acoustic exhibits.',
    services: ['Bespoke Engraving', 'Same-Day Manhattan Courier', 'Seal Servicing'],
  },
];

export const SAMPLE_ORDERS: OrderRecord[] = [
  {
    orderNumber: 'PF-1042',
    createdAt: 'November 21, 2026',
    status: 'Dispatched via Courier',
    customerName: 'Clara Lindqvist',
    email: 'clara.lindqvist@atelier.se',
    shippingAddress: 'Strandvägen 19',
    city: 'Stockholm',
    postalCode: '114 56',
    country: 'Sweden',
    deliveryMethod: 'Express Courier',
    paymentMethod: 'Card',
    items: [
      {
        cartItemId: 'sample-1',
        productId: 'pf-monolith-ti',
        name: 'Monolith Grade-5 Titanium',
        series: 'Series 01 · Flagship',
        image: IMAGES.titanium,
        finishName: 'Raw Brushed Titanium',
        finishHex: '#A9ABA8',
        capacityLabel: '750 ml',
        unitPrice: 275,
        quantity: 1,
        monogram: 'C.L',
      },
    ],
    subtotal: 275,
    discount: 0,
    shippingFee: 0,
    total: 275,
  },
];
