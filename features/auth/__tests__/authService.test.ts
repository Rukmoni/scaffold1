import { mockLogin, mockLogout } from '../authService';
import { User } from '../types';

// Mock timers for testing delays
jest.useFakeTimers();

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  describe('mockLogin', () => {
    it('should return user data after simulated delay', async () => {
      const loginPromise = mockLogin();
      
      // Fast-forward time to resolve the delay
      jest.advanceTimersByTime(1000);
      
      const result = await loginPromise;
      
      expect(result).toEqual({
        user: {
          id: '1',
          name: 'Rukmoni',
          email: 'rukmoni@example.com',
          avatar: 'https://i.pravatar.cc/100?img=5',
        },
        authToken: 'mock-auth-token-123',
        gaId: 'mock-ga-id-456',
      });
    });

    it('should return correct user type', async () => {
      const loginPromise = mockLogin();
      jest.advanceTimersByTime(1000);
      
      const result = await loginPromise;
      
      expect(result.user).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        avatar: expect.any(String),
      });
    });

    it('should simulate 1 second delay', async () => {
      const startTime = Date.now();
      const loginPromise = mockLogin();
      
      // Advance timers by less than 1000ms - should not resolve yet
      jest.advanceTimersByTime(500);
      
      // Promise should still be pending
      let resolved = false;
      loginPromise.then(() => { resolved = true; });
      
      await Promise.resolve(); // Allow microtasks to run
      expect(resolved).toBe(false);
      
      // Now advance the remaining time
      jest.advanceTimersByTime(500);
      await loginPromise;
      
      expect(resolved).toBe(false); // Still false until we await
      await loginPromise; // This should now resolve
    });

    it('should return consistent data on multiple calls', async () => {
      const loginPromise1 = mockLogin();
      const loginPromise2 = mockLogin();
      
      jest.advanceTimersByTime(1000);
      
      const [result1, result2] = await Promise.all([loginPromise1, loginPromise2]);
      
      expect(result1).toEqual(result2);
    });
  });

  describe('mockLogout', () => {
    it('should return true after simulated delay', async () => {
      const logoutPromise = mockLogout();
      
      // Fast-forward time to resolve the delay
      jest.advanceTimersByTime(500);
      
      const result = await logoutPromise;
      
      expect(result).toBe(true);
    });

    it('should simulate 500ms delay', async () => {
      const logoutPromise = mockLogout();
      
      // Advance timers by less than 500ms - should not resolve yet
      jest.advanceTimersByTime(250);
      
      let resolved = false;
      logoutPromise.then(() => { resolved = true; });
      
      await Promise.resolve(); // Allow microtasks to run
      expect(resolved).toBe(false);
      
      // Now advance the remaining time
      jest.advanceTimersByTime(250);
      await logoutPromise;
    });

    it('should always return boolean true', async () => {
      const logoutPromise = mockLogout();
      jest.advanceTimersByTime(500);
      
      const result = await logoutPromise;
      
      expect(typeof result).toBe('boolean');
      expect(result).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should handle login without throwing errors', async () => {
      const loginPromise = mockLogin();
      jest.advanceTimersByTime(1000);
      
      await expect(loginPromise).resolves.toBeDefined();
    });

    it('should handle logout without throwing errors', async () => {
      const logoutPromise = mockLogout();
      jest.advanceTimersByTime(500);
      
      await expect(logoutPromise).resolves.toBe(true);
    });
  });
});