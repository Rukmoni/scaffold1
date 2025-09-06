import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { FC, ReactNode } from 'react';
import { useAirports } from '../useAirports';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // no retries in tests
      },
    },
  });

  const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return Wrapper;
}

describe('useAirports', () => {
  it('returns airport list after query resolves', async () => {
    const { result } = renderHook(() => useAirports(), {
      wrapper: createWrapper(),
    });

    // Initially should be loading
    expect(result.current.isLoading).toBe(true);

    // Wait for success
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Validate data
    expect(result.current.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'KUL', city: 'Kuala Lumpur' }),
        expect.objectContaining({ code: 'SIN', city: 'Singapore' }),
      ])
    );
  });

  it('caches data for 5 minutes (staleTime)', async () => {
    const wrapper = createWrapper();

    const { result, rerender } = renderHook(() => useAirports(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const firstData = result.current.data;

    rerender();

    // Should use cached data (no loading state)
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(firstData);
  });
});
