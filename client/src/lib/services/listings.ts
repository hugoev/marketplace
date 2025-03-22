import api from '../api';
import type { Listing, ListingCreateDTO } from '../../types/api';

export const listingsApi = {
  getAll: (page = 0, size = 10) => 
    api.get<Listing[]>(`/listings?page=${page}&size=${size}`),
  
  search: (params: {
    keyword?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    categoryId?: number;
    page?: number;
    size?: number;
  }) => api.get<Listing[]>('/listings/search', { params }),
  
  getById: (id: number) => 
    api.get<Listing>(`/listings/${id}`),
  
  create: (listing: ListingCreateDTO) => 
    api.post<Listing>('/listings', listing),
  
  uploadImage: (listingId: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post<string>(`/listings/${listingId}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}; 