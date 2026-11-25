export type PageRoute =
  | { page: 'home' }
  | { page: 'water' }
  | { page: 'products'; category?: ProductRangeCategory }
  | { page: 'sustainability' }
  | { page: 'story' }
  | { page: 'news'; slug?: string };

export type ProductRangeCategory =
  | 'All'
  | 'Everyday'
  | 'Sparkling'
  | 'Prestige Glass'
  | 'Limited Editions';

export interface MineralElement {
  name: string;
  symbol: string;
  mgPerLitre: number;
  role: string;
}

export interface BottleVariant {
  sizeLabel: string;
  ml: number;
  material: string;
  recycledContent: string;
  idealFor: string;
}

export interface PuraFlowProduct {
  id: string;
  slug: string;
  name: string;
  range: Exclude<ProductRangeCategory, 'All'>;
  tagline: string;
  description: string;
  image: string;
  accentColor: string;
  variants: BottleVariant[];
  highlights: string[];
}

export interface JourneyStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
}

export interface SustainabilityPillar {
  id: string;
  title: string;
  metric: string;
  metricLabel: string;
  summary: string;
  details: string[];
}

export interface NewsArticle {
  slug: string;
  title: string;
  category: 'Collaborations' | 'Sports' | 'Sustainability' | 'Fine Dining';
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  body: string[];
}
