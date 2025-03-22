import axios from 'axios';
import { ListingSearchParams, Listing } from '@/types';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  getListings: (params: ListingSearchParams) => {
    // Convert price range array to min/max parameters
    const { priceRange, ...otherParams } = params;
    const queryParams = {
      ...otherParams,
      minPrice: priceRange?.[0],
      maxPrice: priceRange?.[1],
    };

    return api.get('/public/listings', { 
      params: queryParams,
      paramsSerializer: params => {
        return Object.entries(params)
          .filter(([_, value]) => value !== undefined && value !== null)
          .map(([key, value]) => `${key}=${value}`)
          .join('&');
      }
    });
  },
    
  getListingById: (id: number) => 
    api.get<Listing>(`/public/listings/${id}`),
    
  createListing: async (formData: FormData) => {
    try {
      const response = await api.post('/listings', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Create listing error:', error);
      throw error;
    }
  },

  uploadImage: (listingId: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/listings/${listingId}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  // Auth endpoints
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  register: async (userData: { email: string; password: string; name: string }) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  validate: async () => {
    const response = await api.get('/auth/validate');
    return response.data;
  },

  // Categories
  getCategories: () =>
    api.get('/public/categories'),
};

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  register: async (userData: { email: string; password: string; name: string }) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  validate: async () => {
    const response = await api.get('/auth/validate');
    return response.data;
  },

  logout: async () => {
    localStorage.removeItem('token');
    const response = await api.post('/auth/logout');
    return response.data;
  }
};

export const productsApi = {
  getAll: async (params?: { userId?: string }) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  create: async (productData: any) => {
    const response = await api.post('/products', productData);
    return response.data;
  },
  update: async (id: string, productData: any) => {
    const response = await api.patch(`/products/${id}`, productData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

export const userApi = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (formData: FormData) => {
    const response = await api.put('/users/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export const reviewsApi = {
  getUserReviews: async (userId: string) => {
    const response = await api.get(`/reviews/user/${userId}`);
    return response.data;
  },
  create: async (reviewData: any) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },
};

export const messagesApi = {
  getConversations: async () => {
    const response = await api.get('/messages/conversations');
    return response.data;
  },
  getConversation: async (userId: string) => {
    const response = await api.get(`/messages/conversation/${userId}`);
    return response.data;
  },
  sendMessage: async (messageData: any) => {
    const response = await api.post('/messages', messageData);
    return response.data;
  },
};

export default api; 