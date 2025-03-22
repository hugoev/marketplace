export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string;
  images: string[];
  timeAgo: string;
  category: string;
  condition?: string;
  seller: {
    name: string;
    memberSince: string;
    listings: number;
    rating: number;
    responseRate: string;
    responseTime: string;
    phone?: string;
    email?: string;
  };
}

export interface ListingSearchParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  condition?: string[];
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  page?: number;
  size?: number;
  priceRange?: [number, number];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface ListingDetail extends Listing {
  contactEmail: string;
  contactPhone: string;
  preferredContact: 'email' | 'phone' | 'both';
} 