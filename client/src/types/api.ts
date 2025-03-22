export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  category: Category;
  status: 'ACTIVE' | 'SOLD' | 'EXPIRED' | 'DELETED';
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  parentId?: number;
}

export interface ListingCreateDTO {
  title: string;
  description: string;
  price: number;
  categoryId: number;
  location: string;
} 