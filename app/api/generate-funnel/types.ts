export interface Palette {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  surface: string;
  surfaceAlt: string;
  dark: string;
  text: string;
  textMuted: string;
  border: string;
}

export interface ProductInfo {
  title?: string;
  description?: string;
  price?: string | null;
  currency?: string | null;
  imageUrl?: string | null;
  imageUrls?: string[];
  rating?: number | null;
  reviewCount?: number | null;
  features?: string[];
  benefits?: string[];
  summary?: string | null;
}

export interface LayoutPersonality {
  name: string;
  heroVariant: string;
  testimonialVariant: string;
  featuresVariant: string;
  statsVariant: string;
  buttonVariant: string;
  optinVariant: string;
  structureBias: string;
  visualMood: string;
  blockOrderBias: string;
  articleVariant: string;
  pullQuoteVariant: string;
}