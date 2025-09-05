import { create } from 'zustand';
import { mockLogin, mockLogout } from './authService';
import { User } from './types';

interface AuthState {
  user: User | null;
  authToken: string | null;
  gaId: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  // Default to logged in state with dummy user
  user: {
    id: '1',
    name: 'Rukmoni',
    email: 'rukmoni@example.com',
    avatar: 'https://i.pravatar.cc/100?img=5',
  },
  authToken: 'mock-auth-token-123',
  gaId: 'mock-ga-id-456',
  isLoggedIn: true,
  isLoading: false,
  isLoading: false,

  login: async () => {
    set({ isLoading: true });
    try {
    set({ isLoading: true });
    try {
      const { user, authToken, gaId } = await mockLogin();
      set({ user, authToken, gaId, isLoggedIn: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
    set({ isLoading: true });
    try {
      await mockLogout();
      set({ user: null, authToken: null, gaId: null, isLoggedIn: false, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));