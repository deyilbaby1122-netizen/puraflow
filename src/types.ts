export type RoutePath =
  | { page: 'home' }
  | { page: 'collection'; category?: string }
  | { page: 'product'; slug: string }
  | { page: 'bespoke' }
  | { page: 'engineering' }
  | { page: 'journal'; slug?: string }
  | { page: 'boutiques'; tab?: 'ateliers' | 'orders' };

export type ProductCategory = 'Titanium' | 'Glass' | 'Ceramic' | 'Accessories';

export interface ProductFinish {
  id: string;
  name: string;
  hex: string;
  image: string;
}

export interface ProductCapacityOption {
  ml: number;
  label: string;
  priceDelta: number;
  heightMm: number;
  diameterMm: number;
  weightGrams: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  series: string;
  category: ProductCategory;
  basePrice: number;
  shortDescription: string;
  longDescription: string;
  coldHours: number;
  hotHours: number;
  materialSummary: string;
  availability: 'In Stock' | 'Small Batch' | 'Made to Order';
  finishes: ProductFinish[];
  capacities: ProductCapacityOption[];
  specs: {
    alloy: string;
    seal: string;
    mouthDiameterMm: number;
    origin: string;
    care: string;
  };
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  series: string;
  image: string;
  finishName: string;
  finishHex: string;
  capacityLabel: string;
  unitPrice: number;
  quantity: number;
  monogram?: string;
  isBespoke?: boolean;
  bespokeDetails?: {
    silhouette: string;
    capAlloy: string;
    engravingStyle: string;
  };
}

export interface OrderRecord {
  orderNumber: string;
  createdAt: string;
  status: 'Confirmed' | 'Engraving & Inspection' | 'Dispatched via Courier' | 'Delivered';
  customerName: string;
  email: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  country: string;
  deliveryMethod: 'Express Courier' | 'Private Concierge' | 'Atelier Pickup';
  paymentMethod: 'Card' | 'Concierge Cash on Delivery';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  giftNote?: string;
}

export interface JournalArticle {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  readTime: string;
  author: string;
  authorRole: string;
  coverImage: string;
  excerpt: string;
  pullQuote: string;
  body: string[];
  featuredProductSlug: string;
}

export interface BoutiqueLocation {
  id: string;
  city: string;
  district: string;
  address: string;
  hours: string;
  phone: string;
  architectNote: string;
  services: string[];
}
