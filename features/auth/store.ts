import { create } from 'zustand';
import { mockLogin, mockLogout } from './authService';
import { User } from './types';
import { storage } from '@/utils/storage';

const AUTH_STORAGE_KEYS = {
  USER: 'auth_user',
  TOKEN: 'auth_token',
  GA_ID: 'auth_ga_id',
} as const;

interface AuthState {
  user: User | null;
  authToken: string | null;
  gaId: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isHydrating: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  rehydrateAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  // Start with empty state - will be hydrated from storage
  user: null,
  authToken: null,
  gaId: null,
  isLoggedIn: false,
  isLoading: false,
  isHydrating: true,

  login: async () => {
    set({ isLoading: true });
    try {
      const { user, authToken, gaId } = await mockLogin();
      
      // Persist to storage
      await Promise.all([
        storage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user)),
        storage.setItem(AUTH_STORAGE_KEYS.TOKEN, authToken),
        storage.setItem(AUTH_STORAGE_KEYS.GA_ID, gaId),
      ]);
      
      set({ user, authToken, gaId, isLoggedIn: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await mockLogout();
      
      // Clear from storage
      await storage.multiRemove([
        AUTH_STORAGE_KEYS.USER,
        AUTH_STORAGE_KEYS.TOKEN,
        AUTH_STORAGE_KEYS.GA_ID,
      ]);
      
      set({ user: null, authToken: null, gaId: null, isLoggedIn: false, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  rehydrateAuth: async () => {
    try {
      const [userJson, authToken, gaId] = await Promise.all([
        storage.getItem(AUTH_STORAGE_KEYS.USER),
        storage.getItem(AUTH_STORAGE_KEYS.TOKEN),
        storage.getItem(AUTH_STORAGE_KEYS.GA_ID),
      ]);

      if (userJson && authToken && gaId) {
        const user = JSON.parse(userJson);
        set({ 
          user, 
          authToken, 
          gaId, 
          isLoggedIn: true, 
          isHydrating: false 
        });
      } else {
        set({ isHydrating: false });
      }
    } catch (error) {
      console.error('Error rehydrating auth state:', error);
      set({ isHydrating: false });
    }
  },
}));