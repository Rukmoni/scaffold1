import { storage } from '../storage';
import { Platform } from 'react-native';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

// Mock localStorage for web
const localStorageMock = {
  setItem: jest.fn(),
  getItem: jest.fn(() => null),
  removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('storage utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setItem', () => {
    it('should use localStorage on web platform', async () => {
      Platform.OS = 'web' as any;
      
      await storage.setItem('test-key', 'test-value');
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', 'test-value');
    });

    it('should use AsyncStorage on native platforms', async () => {
      Platform.OS = 'ios' as any;
      const AsyncStorage = require('@react-native-async-storage/async-storage');
      
      await storage.setItem('test-key', 'test-value');
      
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('test-key', 'test-value');
    });
  });

  describe('getItem', () => {
    it('should use localStorage on web platform', async () => {
      Platform.OS = 'web' as any;
      localStorageMock.getItem.mockReturnValue('test-value');
      
      const result = await storage.getItem('test-key');
      
      expect(localStorageMock.getItem).toHaveBeenCalledWith('test-key');
      expect(result).toBe('test-value');
    });

    it('should use AsyncStorage on native platforms', async () => {
      Platform.OS = 'ios' as any;
      const AsyncStorage = require('@react-native-async-storage/async-storage');
      AsyncStorage.getItem.mockResolvedValue('test-value');
      
      const result = await storage.getItem('test-key');
      
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('test-key');
      expect(result).toBe('test-value');
    });
  });

  describe('removeItem', () => {
    it('should use localStorage on web platform', async () => {
      Platform.OS = 'web' as any;
      
      await storage.removeItem('test-key');
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('test-key');
    });

    it('should use AsyncStorage on native platforms', async () => {
      Platform.OS = 'ios' as any;
      const AsyncStorage = require('@react-native-async-storage/async-storage');
      
      await storage.removeItem('test-key');
      
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('test-key');
    });
  });

  describe('multiRemove', () => {
    it('should remove multiple items from localStorage on web', async () => {
      Platform.OS = 'web' as any;
      const keys = ['key1', 'key2', 'key3'];
      
      await storage.multiRemove(keys);
      
      keys.forEach(key => {
        expect(localStorageMock.removeItem).toHaveBeenCalledWith(key);
      });
    });

    it('should use AsyncStorage multiRemove on native platforms', async () => {
      Platform.OS = 'ios' as any;
      const AsyncStorage = require('@react-native-async-storage/async-storage');
      const keys = ['key1', 'key2', 'key3'];
      
      await storage.multiRemove(keys);
      
      expect(AsyncStorage.multiRemove).toHaveBeenCalledWith(keys);
    });
  });

  describe('error handling', () => {
    it('should handle storage errors gracefully', async () => {
      Platform.OS = 'web' as any;
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      // Suppress expected console.error output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      // Should not throw
      await expect(storage.setItem('test-key', 'test-value')).resolves.toBeUndefined();
      
      // Restore console.error
      consoleSpy.mockRestore();
    });
  });
});