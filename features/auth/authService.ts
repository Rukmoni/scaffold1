import { User, AuthResponse } from './types';

const dummyUser: User = {
  id: '1',
  name: 'Rukmoni',
  email: 'rukmoni@example.com',
  avatar: 'https://i.pravatar.cc/100?img=5',
};

export async function mockLogin(): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    user: dummyUser,
    authToken: 'mock-auth-token-123',
    gaId: 'mock-ga-id-456',
  };
}

export async function mockLogout(): Promise<boolean> {
  // Simulate API cleanup
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
}