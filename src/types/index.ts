export interface Variant {
  id: string;
  name: string;
  colorHex?: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  variants: Variant[];
  image: string;
  learnMoreUrl?: string;
}

export interface Category {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  stepIndex: number;
}
