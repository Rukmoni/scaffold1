export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface AuthResponse {
  user: User;
  authToken: string;
  gaId: string;
}