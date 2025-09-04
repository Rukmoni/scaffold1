import { create } from 'zustand';
import { SearchPayload, Airport } from '@/types';

interface SearchState extends SearchPayload {
  setTripType: (type: 'one-way' | 'round-trip') => void;
  setFrom: (airport: Airport | null) => void;
  setTo: (airport: Airport | null) => void;
  setDepartDate: (date: Date | null) => void;
  setReturnDate: (date: Date | null) => void;
  setPassengers: (passengers: SearchPayload['passengers']) => void;
  setClass: (classType: SearchPayload['class']) => void;
  setPromoCode: (code: string) => void;
  setAirlineOnly: (only: boolean) => void;
  swapLocations: () => void;
  getSearchPayload: () => SearchPayload;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  tripType: 'one-way',
  from: null,
  to: null,
  departDate: null,
  returnDate: null,
  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  class: 'economy',
  promoCode: '',
  airlineOnly: false,
  
  setTripType: (type) => set({ tripType: type }),
  setFrom: (airport) => set({ from: airport }),
  setTo: (airport) => set({ to: airport }),
  setDepartDate: (date) => set({ departDate: date }),
  setReturnDate: (date) => set({ returnDate: date }),
  setPassengers: (passengers) => set({ passengers }),
  setClass: (classType) => set({ class: classType }),
  setPromoCode: (code) => set({ promoCode: code }),
  setAirlineOnly: (only) => set({ airlineOnly: only }),
  
  swapLocations: () => {
    const { from, to } = get();
    set({ from: to, to: from });
  },
  
  getSearchPayload: () => {
    const state = get();
    return {
      tripType: state.tripType,
      from: state.from,
      to: state.to,
      departDate: state.departDate,
      returnDate: state.returnDate,
      passengers: state.passengers,
      class: state.class,
      promoCode: state.promoCode,
      airlineOnly: state.airlineOnly,
    };
  },
}));