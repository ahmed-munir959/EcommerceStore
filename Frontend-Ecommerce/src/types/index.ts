
export interface Destination {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface BlogPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface AppContextType {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export interface Product {
  _id: string; // MongoDB ID
  id?: string; // Legacy ID if needed
  image: string;
  name: string;
  currentPrice: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  description: string;
  category?: string;
  parentCategory?: string;
  tags: string[];
}