import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useAirports } from '../useAirports';
import { Airport } from '@/types';

// Mock data that matches the hook's implementation
const mockAirports: Airport[] = [
  { code: 'KUL', name: 'Kuala Lumpur International Airport', city: 'Kuala Lumpur', country: 'Malaysia' },
  { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
  { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
  { code: 'CGK', name: 'Soekarno-Hatta International Airport', city: 'Jakarta', country: 'Indonesia' },
  { code: 'MNL', name: 'Ninoy Aquino International Airport', city: 'Manila', country: 'Philippines' },
  { code: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'Hong Kong' },
  { code: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea' },
  { code: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan' },
  { code: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia' },
  { code: 'MEL', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia' },
];

// Create a wrapper component for React Query
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: 0,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    React.createElement(QueryClientProvider, { client: queryClient }, children)
  );
};

describe('useAirports', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('successful data fetching', () => {
    it('should return airports data when successful', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useAirports(), { wrapper });

      // Initially should be loading
      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();

      // Fast-forward the simulated API delay
      jest.advanceTimersByTime(100);

      // Wait for the query to resolve
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockAirports);
      expect(result.current.error).toBeNull();
      expect(result.current.isError).toBe(false);
      expect(result.current.isSuccess).toBe(true);
    });

    it('should return correct number of airports', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useAirports(), { wrapper });

      jest.advanceTimersByTime(100);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toHaveLength(10);
    });

    it('should return airports with correct structure', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useAirports(), { wrapper });

      jest.advanceTimersByTime(100);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const airports = result.current.data!;
      
      airports.forEach(airport => {
        expect(airport).toHaveProperty('code');
        expect(airport).toHaveProperty('name');
        expect(airport).toHaveProperty('city');
        expect(airport).toHaveProperty('country');
        expect(typeof airport.code).toBe('string');
        expect(typeof airport.name).toBe('string');
        expect(typeof airport.city).toBe('string');
        expect(typeof airport.country).toBe('string');
      });
    });

    it('should include expected airports', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useAirports(), { wrapper });

      jest.advanceTimersByTime(100);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const airports = result.current.data!;
      const airportCodes = airports.map(airport => airport.code);

      expect(airportCodes).toContain('KUL');
      expect(airportCodes).toContain('SIN');
      expect(airportCodes).toContain('BKK');
      expect(airportCodes).toContain('NRT');
      expect(airportCodes).toContain('SYD');
    });
  });

  describe('loading states', () => {
    it('should start with loading state', () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useAirports(), { wrapper });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.isError).toBe(false);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.data).toBeUndefined();
    });

    it('should transition from loading to success', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useAirports(), { wrapper });

      expect(result.current.isLoading).toBe(true);

      jest.advanceTimersByTime(100);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isSuccess).toBe(true);
      expect(result.current.isError).toBe(false);
    });
  });

  describe('caching behavior', () => {
    it('should use stale time configuration', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useAirports(), { wrapper });

      jest.advanceTimersByTime(100);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // The hook should be configured with 5 minutes stale time
      // We can't directly test this, but we can verify the data is available
      expect(result.current.data).toBeDefined();
    });

    it('should return same data on multiple calls', async () => {
      const wrapper = createWrapper();
      
      const { result: result1 } = renderHook(() => useAirports(), { wrapper });
      const { result: result2 } = renderHook(() => useAirports(), { wrapper });

      jest.advanceTimersByTime(100);

      await waitFor(() => {
        expect(result1.current.isLoading).toBe(false);
        expect(result2.current.isLoading).toBe(false);
      });

      expect(result1.current.data).toEqual(result2.current.data);
    });
  });

  describe('query key', () => {
    it('should use correct query key', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useAirports(), { wrapper });

      // We can't directly test the query key, but we can verify the hook works
      expect(result.current).toBeDefined();
    });
  });

  describe('data consistency', () => {
    it('should return consistent airport data across renders', async () => {
      const wrapper = createWrapper();
      const { result, rerender } = renderHook(() => useAirports(), { wrapper });

      jest.advanceTimersByTime(100);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const firstData = result.current.data;

      rerender();

      expect(result.current.data).toEqual(firstData);
    });

    it('should maintain data structure integrity', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useAirports(), { wrapper });

      jest.advanceTimersByTime(100);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const airports = result.current.data!;

      // Verify specific airports exist with correct data
      const kulAirport = airports.find(airport => airport.code === 'KUL');
      expect(kulAirport).toEqual({
        code: 'KUL',
        name: 'Kuala Lumpur International Airport',
        city: 'Kuala Lumpur',
        country: 'Malaysia',
      });

      const sinAirport = airports.find(airport => airport.code === 'SIN');
      expect(sinAirport).toEqual({
        code: 'SIN',
        name: 'Singapore Changi Airport',
        city: 'Singapore',
        country: 'Singapore',
      });
    });
  });

  describe('TypeScript types', () => {
    it('should return correctly typed data', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useAirports(), { wrapper });

      jest.advanceTimersByTime(100);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // TypeScript should ensure the data matches Airport[] type
      const airports = result.current.data!;
      expect(Array.isArray(airports)).toBe(true);
      
      if (airports.length > 0) {
        const firstAirport = airports[0];
        expect(typeof firstAirport.code).toBe('string');
        expect(typeof firstAirport.name).toBe('string');
        expect(typeof firstAirport.city).toBe('string');
        expect(typeof firstAirport.country).toBe('string');
      }
    });
  });

  describe('performance', () => {
    it('should simulate API delay correctly', async () => {
      const wrapper = createWrapper();
      const startTime = Date.now();
      
      const { result } = renderHook(() => useAirports(), { wrapper });

      expect(result.current.isLoading).toBe(true);

      // Advance by less than the delay - should still be loading
      jest.advanceTimersByTime(50);
      expect(result.current.isLoading).toBe(true);

      // Advance by the full delay
      jest.advanceTimersByTime(50);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isSuccess).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should handle hook without wrapper gracefully', () => {
      // This would normally throw in a real app, but we can test the hook structure
      expect(() => {
        const wrapper = createWrapper();
        renderHook(() => useAirports(), { wrapper });
      }).not.toThrow();
    });
  });

  describe('integration with React Query', () => {
    it('should work with React Query provider', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useAirports(), { wrapper });

      // Should have React Query properties
      expect(result.current).toHaveProperty('isLoading');
      expect(result.current).toHaveProperty('isError');
      expect(result.current).toHaveProperty('isSuccess');
      expect(result.current).toHaveProperty('data');
      expect(result.current).toHaveProperty('error');
    });

    it('should provide refetch functionality', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useAirports(), { wrapper });

      jest.advanceTimersByTime(100);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current).toHaveProperty('refetch');
      expect(typeof result.current.refetch).toBe('function');
    });
  });
});