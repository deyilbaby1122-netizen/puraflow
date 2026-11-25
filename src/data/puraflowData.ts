import {
  JourneyStage,
  MineralElement,
  NewsArticle,
  PuraFlowProduct,
  SustainabilityPillar,
} from '../types';

export const PURAFLOW_IMAGES = {
  heroAlps: '/src/assets/images/puraflow_hero_alps_1795601891775.jpg',
  everyday: '/src/assets/images/puraflow_branded_everyday_1795603612925.jpg',
  prestigeGlass: '/src/assets/images/puraflow_branded_glass_1795603614045.jpg',
  sparkling: '/src/assets/images/puraflow_branded_sparkling_1795603614708.jpg',
  limited: '/src/assets/images/puraflow_branded_limited_1795603615322.jpg',
  tennis: '/src/assets/images/puraflow_lifestyle_tennis_1795601894737.jpg',
};

export const MINERAL_COMPOSITION: MineralElement[] = [
  {
    name: 'Bicarbonates',
    symbol: 'HCO₃⁻',
    mgPerLitre: 360,
    role: 'Naturally balances the crisp neutral pH of 7.2 for a clean, silky mouthfeel.',
  },
  {
    name: 'Calcium',
    symbol: 'Ca²⁺',
    mgPerLitre: 80,
    role: 'Essential mineral supporting daily vitality and subtle alpine minerality.',
  },
  {
    name: 'Magnesium',
    symbol: 'Mg²⁺',
    mgPerLitre: 26,
    role: 'Naturally occurring electrolyte aiding muscle recovery and hydration balance.',
  },
  {
    name: 'Silica',
    symbol: 'SiO₂',
    mgPerLitre: 15,
    role: 'Collected slowly from glacial quartz sands to give PuraFlow its soft clarity.',
  },
  {
    name: 'Sulfates',
    symbol: 'SO₄²⁻',
    mgPerLitre: 14,
    role: 'Trace natural mineral signature characteristic of deep alpine moraines.',
  },
  {
    name: 'Chlorides',
    symbol: 'Cl⁻',
    mgPerLitre: 10,
    role: 'Balanced trace electrolytes that preserve pure, refreshing taste.',
  },
  {
    name: 'Sodium',
    symbol: 'Na⁺',
    mgPerLitre: 6.5,
    role: 'Remarkably low natural sodium content suited for everyday wellness.',
  },
  {
    name: 'Nitrates',
    symbol: 'NO₃⁻',
    mgPerLitre: 3.8,
    role: 'Protected high-altitude watershed purity monitored 300+ times daily.',
  },
  {
    name: 'Potassium',
    symbol: 'K⁺',
    mgPerLitre: 1,
    role: 'Micro-trace electrolyte completing PuraFlow’s pristine mineral profile.',
  },
];

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    step: '01',
    title: 'Alpine Rain & Snow',
    subtitle: '2,200m Protected Plateau',
    description:
      'Every drop begins as pure rain and melted snow falling over an unspoiled glacial plateau high in the French Alps.',
    metric: '35 km² watershed',
  },
  {
    step: '02',
    title: '15-Year Natural Filtration',
    subtitle: 'Glacial Moraine Rock Layers',
    description:
      'Water travels slowly through impermeable clay beds and mineral-rich glacial sands, naturally protected from surface impurities.',
    metric: '15 years underground',
  },
  {
    step: '03',
    title: 'Balanced Mineralization',
    subtitle: 'Natural Electrolytes & pH 7.2',
    description:
      'During its subterranean journey, the water acquires its distinctive mineral equilibrium without artificial enhancement.',
    metric: 'pH 7.2 neutral',
  },
  {
    step: '04',
    title: 'Bottled at the Source',
    subtitle: 'Untouched by Human Hands',
    description:
      'Drawn directly from the spring into 100% recyclable bottles at our renewable-energy alpine bottling facility.',
    metric: '300+ daily quality checks',
  },
];

export const PURAFLOW_PRODUCTS: PuraFlowProduct[] = [
  {
    id: 'everyday-range',
    slug: 'puraflow-everyday',
    name: 'PuraFlow Natural Mineral Water',
    range: 'Everyday',
    tagline: 'Pure alpine hydration designed for every moment of your day.',
    description:
      'Our iconic mountain-embossed bottle filled directly at the alpine source. Available from pocket-ready 330 ml formats to 1.5 L family tableside sizes, crafted from 100% recycled rPET (excluding cap and label).',
    image: PURAFLOW_IMAGES.everyday,
    accentColor: '#E41B5B',
    variants: [
      {
        sizeLabel: '330 ml',
        ml: 330,
        material: '100% rPET (excl. cap & label)',
        recycledContent: '100% Recycled',
        idealFor: 'Meetings, travel & compact carry',
      },
      {
        sizeLabel: '500 ml',
        ml: 500,
        material: '100% rPET (excl. cap & label)',
        recycledContent: '100% Recycled',
        idealFor: 'Daily commute & studio desk',
      },
      {
        sizeLabel: '750 ml Sport',
        ml: 750,
        material: '100% rPET + Precision Sport Cap',
        recycledContent: '100% Recycled',
        idealFor: 'Tennis, running & active training',
      },
      {
        sizeLabel: '1.0 L',
        ml: 1000,
        material: '100% rPET (excl. cap & label)',
        recycledContent: '100% Recycled',
        idealFor: 'All-day individual hydration',
      },
      {
        sizeLabel: '1.5 L',
        ml: 1500,
        material: '100% rPET (excl. cap & label)',
        recycledContent: '100% Recycled',
        idealFor: 'Home dining & shared tables',
      },
    ],
    highlights: [
      'Naturally balanced pH 7.2',
      'Zero chemical treatments or additives',
      '100% recyclable circular bottle body',
    ],
  },
  {
    id: 'sparkling-range',
    slug: 'puraflow-sparkling',
    name: 'PuraFlow Sparkling Mineral Water',
    range: 'Sparkling',
    tagline: 'Crisp alpine mineral water lifted by delicate, fine bubbles.',
    description:
      'Infused with fine sparkling effervescence that awakens the palate while preserving PuraFlow’s light, velvety mineral balance. Crafted for aperitif hours, fine dining pairings, and sunlit terraces.',
    image: PURAFLOW_IMAGES.sparkling,
    accentColor: '#3B82F6',
    variants: [
      {
        sizeLabel: '330 ml Glass',
        ml: 330,
        material: 'Infinitely Recyclable Clear Glass',
        recycledContent: '100% Recyclable',
        idealFor: 'Individual dining & café service',
      },
      {
        sizeLabel: '750 ml Glass',
        ml: 750,
        material: 'Infinitely Recyclable Clear Glass',
        recycledContent: '100% Recyclable',
        idealFor: 'Table sharing & culinary pairing',
      },
      {
        sizeLabel: '330 ml Slim Can',
        ml: 330,
        material: 'Lightweight Aluminum',
        recycledContent: '100% Recyclable',
        idealFor: 'Chilled outdoor refreshment',
      },
    ],
    highlights: [
      'Fine pinpoint carbonation for crisp palate lift',
      'Zero calories, zero sweeteners',
      'Pairs effortlessly with delicate seafood & citrus',
    ],
  },
  {
    id: 'prestige-glass',
    slug: 'puraflow-prestige-glass',
    name: 'PuraFlow Prestige & Glass',
    range: 'Prestige Glass',
    tagline: 'Sculptural clear glass reserved for fine dining and hospitality.',
    description:
      'With clean architectural lines that celebrate pure light refraction, the Prestige Glass silhouette elevates tables across Michelin-starred dining rooms, luxury hotels, and private events.',
    image: PURAFLOW_IMAGES.prestigeGlass,
    accentColor: '#0B1F3A',
    variants: [
      {
        sizeLabel: '330 ml Still Glass',
        ml: 330,
        material: 'Crystal-Clear Flint Glass',
        recycledContent: 'Returnable & Recyclable',
        idealFor: 'Private suites & executive dining',
      },
      {
        sizeLabel: '750 ml Still Glass',
        ml: 750,
        material: 'Crystal-Clear Flint Glass',
        recycledContent: 'Returnable & Recyclable',
        idealFor: 'Fine dining tasting menus',
      },
      {
        sizeLabel: '750 ml Reserve Carafe',
        ml: 750,
        material: 'Heavy-Base Atelier Glass',
        recycledContent: 'Reusable Hospitality',
        idealFor: 'Sommelier service & celebratory tables',
      },
    ],
    highlights: [
      'Preferred by world-class sommeliers and chefs',
      'Neutral mineral profile cleanses the palate',
      'Refillable hospitality glass return program',
    ],
  },
  {
    id: 'limited-editions',
    slug: 'puraflow-limited-editions',
    name: 'PuraFlow Limited Editions',
    range: 'Limited Editions',
    tagline: 'Annual collectible glass bottles shaped by visionary designers.',
    description:
      'Since launching our annual designer bottle tradition, PuraFlow collaborates with contemporary architects, couturiers, and visual artists to reinterpret pure alpine movement on collectible glass.',
    image: PURAFLOW_IMAGES.limited,
    accentColor: '#E41B5B',
    variants: [
      {
        sizeLabel: '750 ml 2026 Prism Edition',
        ml: 750,
        material: 'Screen-Printed Collector Glass',
        recycledContent: 'Numbered Run',
        idealFor: 'Collectors & holiday gifting',
      },
      {
        sizeLabel: '750 ml Heritage Archive',
        ml: 750,
        material: 'Faceted Crystal Glass',
        recycledContent: 'Limited Release',
        idealFor: '200+ Years Young Commemoration',
      },
    ],
    highlights: [
      'Numbered annual creative collaboration',
      'Fired mineral pigment geometric motif',
      'Reusable centerpiece carafe after enjoyment',
    ],
  },
];

export const SUSTAINABILITY_PILLARS: SustainabilityPillar[] = [
  {
    id: 'source-protection',
    title: 'Protecting Our Alpine Source',
    metric: '100%',
    metricLabel: 'Protected Watershed Zone',
    summary:
      'For over three decades, PuraFlow has partnered with local municipalities, farmers, and conservationists to protect the alpine wetlands and recharge plateau.',
    details: [
      'Ramsar-aligned wetland stewardship supporting native biodiversity',
      'Zero industrial intrusion within the 35 km² aquifer impluvium',
      'Continuous real-time hydrological monitoring to never exceed natural spring renewal',
    ],
  },
  {
    id: 'sustainable-operations',
    title: 'Low-Carbon Bottling & Rail',
    metric: '100%',
    metricLabel: 'Renewable Electricity at Source',
    summary:
      'Our alpine bottling site operates on 100% renewable electricity while prioritizing electrified freight rail directly from the mountain valley.',
    details: [
      'Direct private rail spur dispatching over 60% of regional European volume',
      'Closed-loop heat recovery across bottling lines',
      'Independently verified B Corp certified operations',
    ],
  },
  {
    id: 'circular-packaging',
    title: 'Circular Model & Refill Stations',
    metric: '100%',
    metricLabel: 'Recyclable Bottle Portfolio',
    summary:
      'We are accelerating bottle-to-bottle circularity across everyday rPET bottles while expanding refillable glass and sports tournament hydration stations.',
    details: [
      '100% recycled rPET across core Everyday still formats (excluding cap & label)',
      'On-court and concourse refillable glass & fountain initiatives at partner tournaments',
      'Active advocacy for European deposit return systems',
    ],
  },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: 'puraflow-grass-court-championships-refill',
    title: 'PuraFlow Expands Refillable Court Hydration at Summer Grass Championships',
    category: 'Sports',
    date: 'June 2026',
    readTime: '4 min read',
    image: PURAFLOW_IMAGES.tennis,
    excerpt:
      'Introducing reusable players’ glass bottles and spectator refill fountains across all championship courts.',
    body: [
      'As official mineral water partner to premier grass-court tennis, PuraFlow is deepening its circular hydration footprint for athletes and spectators alike.',
      'Across center and outer courts, players hydrate from reusable, chilled PuraFlow glass vessels filled directly via filtered spring stations, cutting single-use court bottles by 74% compared to 2022 baselines.',
      'Spectator concourses now feature thirty alpine-cooled hydration fountains alongside dedicated bottle-to-bottle collection bins ensuring every recovered bottle returns into circular food-grade rPET.',
    ],
  },
  {
    slug: 'alpine-prism-limited-edition-2026',
    title: 'Unveiling the 2026 Alpine Prism Collector Bottle',
    category: 'Collaborations',
    date: 'October 2026',
    readTime: '3 min read',
    image: PURAFLOW_IMAGES.limited,
    excerpt:
      'Geometric pink and glacier-blue lines trace the refraction of morning sun across high-altitude alpine ice.',
    body: [
      'Created in collaboration with Paris-based architectural studio Atelier Lumière, the 2026 PuraFlow Limited Edition transforms the 750 ml glass carafe into a study of light and crystal geometry.',
      'Fired directly onto the exterior glass using lead-free mineral inks, the rose-pink and sky-blue facets shift visually as water levels move—celebrating over two centuries of living young and natural transparency.',
    ],
  },
  {
    slug: 'fine-dining-sommelier-mineral-pairing',
    title: 'Why Sommeliers Pair Neutral pH 7.2 Water with Tasting Menus',
    category: 'Fine Dining',
    date: 'September 2026',
    readTime: '5 min read',
    image: PURAFLOW_IMAGES.prestigeGlass,
    excerpt:
      'Inside Michelin-recognized dining rooms where mineral balance prepares the palate between vintage pours.',
    body: [
      'Water is often the first and last element served at a fine dining table, yet overly mineralized or sharply acidic waters can mask delicate Grand Cru tannins or broth aromatics.',
      'With 360 mg/L bicarbonates and a perfectly neutral pH of 7.2, PuraFlow Prestige Glass refreshes taste receptors gently without lingering bitterness—allowing chefs’ compositions to shine.',
    ],
  },
  {
    slug: 'b-corp-watershed-stewardship-report',
    title: '2026 Alpine Watershed & B Corp Impact Report Released',
    category: 'Sustainability',
    date: 'August 2026',
    readTime: '6 min read',
    image: PURAFLOW_IMAGES.heroAlps,
    excerpt:
      'Reviewing our latest biodiversity surveys, 100% renewable bottling metrics, and rail freight expansion.',
    body: [
      'Our 2026 Impact Report details five years of continuous watershed stewardship alongside local agricultural cooperatives across the alpine plateau.',
      'Key highlights include maintaining 100% renewable electricity at the bottling source, expanding electrified rail dispatch, and achieving 100% recyclability across every still and sparkling format.',
    ],
  },
];

export const REGIONS = [
  { code: 'INT', label: 'International (English)' },
  { code: 'FR', label: 'France (Français)' },
  { code: 'CH', label: 'Suisse (FR / DE)' },
  { code: 'UK', label: 'United Kingdom (English)' },
  { code: 'US', label: 'United States (English)' },
  { code: 'JP', label: 'Japan (日本語)' },
];
