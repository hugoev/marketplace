export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  createdAt: string;
  imageUrls: string[];
}

export interface ListingDetail extends Listing {
  contactEmail: string;
  contactPhone: string;
  preferredContact: 'email' | 'phone' | 'both';
} 