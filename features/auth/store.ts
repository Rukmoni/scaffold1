import { create } from 'zustand';
import { mockLogin, mockLogout } from './authService';
import { User } from './types';

interface AuthState {
  user: User | null;
  authToken: string | null;
  gaId: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  authToken: null,
  gaId: null,
  isLoggedIn: false,
  isLoading: false,

  login: async () => {
    set({ isLoading: true });
    try {
      const { user, authToken, gaId } = await mockLogin();
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
      set({ user: null, authToken: null, gaId: null, isLoggedIn: false, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));