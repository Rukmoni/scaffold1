import { useAuth } from '../store';
import { mockLogin, mockLogout } from '../authService';
import { storage } from '@/utils/storage';
import { act, renderHook } from '@testing-library/react-native';

// Mock the auth service
jest.mock('../authService', () => ({
  mockLogin: jest.fn(),
  mockLogout: jest.fn(),
}));

// Mock the storage utility
jest.mock('@/utils/storage', () => ({
  storage: {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    multiRemove: jest.fn(),
  },
}));

const mockAuthService = {
  mockLogin: mockLogin as jest.MockedFunction<typeof mockLogin>,
  mockLogout: mockLogout as jest.MockedFunction<typeof mockLogout>,
};

const mockStorage = {
  setItem: storage.setItem as jest.MockedFunction<typeof storage.setItem>,
  getItem: storage.getItem as jest.MockedFunction<typeof storage.getItem>,
  removeItem: storage.removeItem as jest.MockedFunction<typeof storage.removeItem>,
  multiRemove: storage.multiRemove as jest.MockedFunction<typeof storage.multiRemove>,
};

const mockUser = {
  id: '1',
  name: 'Rukmoni',
  email: 'rukmoni@example.com',
  avatar: 'https://i.pravatar.cc/100?img=5',
};

const mockAuthResponse = {
  user: mockUser,
  authToken: 'mock-auth-token-123',
  gaId: 'mock-ga-id-456',
};

describe('useAuth store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset store state before each test
    useAuth.setState({
      user: null,
      authToken: null,
      gaId: null,
      isLoggedIn: false,
      isLoading: false,
      isHydrating: false,
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useAuth());
      
      expect(result.current.user).toBeNull();
      expect(result.current.authToken).toBeNull();
      expect(result.current.gaId).toBeNull();
      expect(result.current.isLoggedIn).toBe(false);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isHydrating).toBe(false);
    });

    it('should provide all required methods', () => {
      const { result } = renderHook(() => useAuth());
      
      expect(typeof result.current.login).toBe('function');
      expect(typeof result.current.logout).toBe('function');
      expect(typeof result.current.rehydrateAuth).toBe('function');
    });
  });

  describe('login', () => {
    it('should successfully login and update state', async () => {
      mockAuthService.mockLogin.mockResolvedValue(mockAuthResponse);
      
      const { result } = renderHook(() => useAuth());
      
      await act(async () => {
        await result.current.login();
      });
      
      expect(mockAuthService.mockLogin).toHaveBeenCalledTimes(1);
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.authToken).toBe('mock-auth-token-123');
      expect(result.current.gaId).toBe('mock-ga-id-456');
      expect(result.current.isLoggedIn).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });

    it('should persist auth data to storage on login', async () => {
      mockAuthService.mockLogin.mockResolvedValue(mockAuthResponse);
      
      const { result } = renderHook(() => useAuth());
      
      await act(async () => {
        await result.current.login();
      });
      
      expect(mockStorage.setItem).toHaveBeenCalledWith('auth_user', JSON.stringify(mockUser));
      expect(mockStorage.setItem).toHaveBeenCalledWith('auth_token', 'mock-auth-token-123');
      expect(mockStorage.setItem).toHaveBeenCalledWith('auth_ga_id', 'mock-ga-id-456');
      expect(mockStorage.setItem).toHaveBeenCalledTimes(3);
    });

    it('should set loading state during login', async () => {
      let resolveLogin: (value: any) => void;
      const loginPromise = new Promise(resolve => {
        resolveLogin = resolve;
      });
      mockAuthService.mockLogin.mockReturnValue(loginPromise);
      
      const { result } = renderHook(() => useAuth());
      
      // Start login
      act(() => {
        result.current.login();
      });
      
      // Should be loading
      expect(result.current.isLoading).toBe(true);
      
      // Resolve login
      await act(async () => {
        resolveLogin!(mockAuthResponse);
        await loginPromise;
      });
      
      // Should no longer be loading
      expect(result.current.isLoading).toBe(false);
    });

    it('should handle login errors gracefully', async () => {
      const loginError = new Error('Login failed');
      mockAuthService.mockLogin.mockRejectedValue(loginError);
      
      const { result } = renderHook(() => useAuth());
      
      await act(async () => {
        await expect(result.current.login()).rejects.toThrow('Login failed');
      });
      
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isLoggedIn).toBe(false);
      expect(result.current.user).toBeNull();
    });
  });

  describe('logout', () => {
    beforeEach(async () => {
      // Set up logged in state
      mockAuthService.mockLogin.mockResolvedValue(mockAuthResponse);
      const { result } = renderHook(() => useAuth());
      
      await act(async () => {
        await result.current.login();
      });
    });

    it('should successfully logout and clear state', async () => {
      mockAuthService.mockLogout.mockResolvedValue(true);
      
      const { result } = renderHook(() => useAuth());
      
      await act(async () => {
        await result.current.logout();
      });
      
      expect(mockAuthService.mockLogout).toHaveBeenCalledTimes(1);
      expect(result.current.user).toBeNull();
      expect(result.current.authToken).toBeNull();
      expect(result.current.gaId).toBeNull();
      expect(result.current.isLoggedIn).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });

    it('should clear auth data from storage on logout', async () => {
      mockAuthService.mockLogout.mockResolvedValue(true);
      
      const { result } = renderHook(() => useAuth());
      
      await act(async () => {
        await result.current.logout();
      });
      
      expect(mockStorage.multiRemove).toHaveBeenCalledWith([
        'auth_user',
        'auth_token',
        'auth_ga_id',
      ]);
      expect(mockStorage.multiRemove).toHaveBeenCalledTimes(1);
    });

    it('should set loading state during logout', async () => {
      let resolveLogout: (value: any) => void;
      const logoutPromise = new Promise(resolve => {
        resolveLogout = resolve;
      });
      mockAuthService.mockLogout.mockReturnValue(logoutPromise);
      
      const { result } = renderHook(() => useAuth());
      
      // Start logout
      act(() => {
        result.current.logout();
      });
      
      // Should be loading
      expect(result.current.isLoading).toBe(true);
      
      // Resolve logout
      await act(async () => {
        resolveLogout!(true);
        await logoutPromise;
      });
      
      // Should no longer be loading
      expect(result.current.isLoading).toBe(false);
    });

    it('should handle logout errors gracefully', async () => {
      const logoutError = new Error('Logout failed');
      mockAuthService.mockLogout.mockRejectedValue(logoutError);
      
      const { result } = renderHook(() => useAuth());
      
      await act(async () => {
        await expect(result.current.logout()).rejects.toThrow('Logout failed');
      });
      
      expect(result.current.isLoading).toBe(false);
      // State should remain logged in if logout fails
      expect(result.current.isLoggedIn).toBe(true);
    });
  });

  describe('rehydrateAuth', () => {
    it('should restore auth state from storage when data exists', async () => {
      mockStorage.getItem
        .mockResolvedValueOnce(JSON.stringify(mockUser)) // auth_user
        .mockResolvedValueOnce('mock-auth-token-123') // auth_token
        .mockResolvedValueOnce('mock-ga-id-456'); // auth_ga_id
      
      const { result } = renderHook(() => useAuth());
      
      await act(async () => {
        await result.current.rehydrateAuth();
      });
      
      expect(mockStorage.getItem).toHaveBeenCalledWith('auth_user');
      expect(mockStorage.getItem).toHaveBeenCalledWith('auth_token');
      expect(mockStorage.getItem).toHaveBeenCalledWith('auth_ga_id');
      expect(mockStorage.getItem).toHaveBeenCalledTimes(3);
      
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.authToken).toBe('mock-auth-token-123');
      expect(result.current.gaId).toBe('mock-ga-id-456');
      expect(result.current.isLoggedIn).toBe(true);
      expect(result.current.isHydrating).toBe(false);
    });

    it('should not restore state when no data exists in storage', async () => {
      mockStorage.getItem.mockResolvedValue(null);
      
      const { result } = renderHook(() => useAuth());
      
      await act(async () => {
        await result.current.rehydrateAuth();
      });
      
      expect(result.current.user).toBeNull();
      expect(result.current.authToken).toBeNull();
      expect(result.current.gaId).toBeNull();
      expect(result.current.isLoggedIn).toBe(false);
      expect(result.current.isHydrating).toBe(false);
    });

    it('should not restore state when data is incomplete', async () => {
      mockStorage.getItem
        .mockResolvedValueOnce(JSON.stringify(mockUser)) // auth_user exists
        .mockResolvedValueOnce(null) // auth_token missing
        .mockResolvedValueOnce('mock-ga-id-456'); // auth_ga_id exists
      
      const { result } = renderHook(() => useAuth());
      
      await act(async () => {
        await result.current.rehydrateAuth();
      });
      
      expect(result.current.user).toBeNull();
      expect(result.current.isLoggedIn).toBe(false);
      expect(result.current.isHydrating).toBe(false);
    });

    it('should handle storage errors gracefully', async () => {
      const storageError = new Error('Storage error');
      mockStorage.getItem.mockRejectedValue(storageError);
      
      // Suppress expected console.error output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      const { result } = renderHook(() => useAuth());
      
      // Should not throw error
      await act(async () => {
        await result.current.rehydrateAuth();
      });
      
      // Restore console.error
      consoleSpy.mockRestore();
      
      expect(result.current.isHydrating).toBe(false);
      expect(result.current.isLoggedIn).toBe(false);
    });

    it('should handle invalid JSON in storage', async () => {
      mockStorage.getItem
        .mockResolvedValueOnce('invalid-json') // corrupted user data
        .mockResolvedValueOnce('mock-auth-token-123')
        .mockResolvedValueOnce('mock-ga-id-456');
      
      const { result } = renderHook(() => useAuth());
      
      await act(async () => {
        await result.current.rehydrateAuth();
      });
      
      expect(result.current.isHydrating).toBe(false);
      expect(result.current.isLoggedIn).toBe(false);
    });
  });

  describe('integration tests', () => {
    it('should complete full auth flow with persistence', async () => {
      // Mock successful login
      mockAuthService.mockLogin.mockResolvedValue(mockAuthResponse);
      mockAuthService.mockLogout.mockResolvedValue(true);
      
      const { result } = renderHook(() => useAuth());
      
      // Login
      await act(async () => {
        await result.current.login();
      });
      
      expect(result.current.isLoggedIn).toBe(true);
      expect(mockStorage.setItem).toHaveBeenCalledTimes(3);
      
      // Logout
      await act(async () => {
        await result.current.logout();
      });
      
      expect(result.current.isLoggedIn).toBe(false);
      expect(mockStorage.multiRemove).toHaveBeenCalledTimes(1);
    });
  });
});