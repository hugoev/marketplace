import api from '../api';
import type { User } from '../../types/api';

export const usersApi = {
  register: (userData: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
  }) => api.post<User>('/users/register', userData),
  
  getCurrentUser: () => 
    api.get<User>('/users/me'),
}; 