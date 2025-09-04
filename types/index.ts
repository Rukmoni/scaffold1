export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface SearchPayload {
  tripType: 'one-way' | 'round-trip';
  from: Airport | null;
  to: Airport | null;
  departDate: Date | null;
  returnDate: Date | null;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  class: 'economy' | 'premium-economy' | 'business' | 'first';
  promoCode: string;
  airlineOnly: boolean;
}

export interface User {
  name: string;
  avatar: string;
  email: string;
}