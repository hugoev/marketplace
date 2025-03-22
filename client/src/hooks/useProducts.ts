import { useState, useEffect } from 'react';
import { productsApi } from '../lib/api';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  location: string;
  images: string[];
  seller: {
    _id: string;
    name: string;
    avatar: string;
    location: string;
    memberSince: string;
    listings: number;
    rating: number;
    responseRate: string;
    responseTime: string;
    phone?: string;
    email?: string;
  };
  status: 'available' | 'sold' | 'pending';
  views: number;
  createdAt: string;
  timeAgo: string;
}

export interface ProductFilters {
  maxPrice?: number;
  category?: string;
  condition?: string | string[];
  search?: string;
  page?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  priceRange?: [number, number];
  minRating?: number;
}

export function useProducts(initialFilters: ProductFilters = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productsApi.getAll(filters);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: Omit<Product, '_id' | 'seller' | 'views' | 'createdAt'>) => {
    try {
      const newProduct = await productsApi.create(productData);
      setProducts(prev => [newProduct, ...prev]);
      return newProduct;
    } catch (err) {
      throw err;
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      const updatedProduct = await productsApi.update(id, productData);
      setProducts(prev =>
        prev.map(product =>
          product._id === id ? updatedProduct : product
        )
      );
      return updatedProduct;
    } catch (err) {
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await productsApi.delete(id);
      setProducts(prev => prev.filter(product => product._id !== id));
    } catch (err) {
      throw err;
    }
  };

  const updateFilters = (newFilters: ProductFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    products,
    loading,
    error,
    filters,
    updateFilters,
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: fetchProducts,
  };
} 