import { renderHook, act } from '@testing-library/react-native';
import { useSearchStore } from '../searchStore';
import { Airport } from '@/types';

const mockAirport1: Airport = {
  code: 'KUL',
  name: 'Kuala Lumpur International Airport',
  city: 'Kuala Lumpur',
  country: 'Malaysia',
};

const mockAirport2: Airport = {
  code: 'SIN',
  name: 'Singapore Changi Airport',
  city: 'Singapore',
  country: 'Singapore',
};

describe('useSearchStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useSearchStore.setState({
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
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useSearchStore());

      expect(result.current.tripType).toBe('one-way');
      expect(result.current.from).toBeNull();
      expect(result.current.to).toBeNull();
      expect(result.current.departDate).toBeNull();
      expect(result.current.returnDate).toBeNull();
      expect(result.current.passengers).toEqual({
        adults: 1,
        children: 0,
        infants: 0,
      });
      expect(result.current.class).toBe('economy');
      expect(result.current.promoCode).toBe('');
      expect(result.current.airlineOnly).toBe(false);
    });

    it('should provide all required methods', () => {
      const { result } = renderHook(() => useSearchStore());

      expect(typeof result.current.setTripType).toBe('function');
      expect(typeof result.current.setFrom).toBe('function');
      expect(typeof result.current.setTo).toBe('function');
      expect(typeof result.current.setDepartDate).toBe('function');
      expect(typeof result.current.setReturnDate).toBe('function');
      expect(typeof result.current.setPassengers).toBe('function');
      expect(typeof result.current.setClass).toBe('function');
      expect(typeof result.current.setPromoCode).toBe('function');
      expect(typeof result.current.setAirlineOnly).toBe('function');
      expect(typeof result.current.swapLocations).toBe('function');
      expect(typeof result.current.getSearchPayload).toBe('function');
    });
  });

  describe('trip type management', () => {
    it('should set trip type to round-trip', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setTripType('round-trip');
      });

      expect(result.current.tripType).toBe('round-trip');
    });

    it('should set trip type to one-way', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setTripType('round-trip');
      });

      act(() => {
        result.current.setTripType('one-way');
      });

      expect(result.current.tripType).toBe('one-way');
    });
  });

  describe('location management', () => {
    it('should set from airport', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setFrom(mockAirport1);
      });

      expect(result.current.from).toEqual(mockAirport1);
    });

    it('should set to airport', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setTo(mockAirport2);
      });

      expect(result.current.to).toEqual(mockAirport2);
    });

    it('should clear from airport', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setFrom(mockAirport1);
      });

      act(() => {
        result.current.setFrom(null);
      });

      expect(result.current.from).toBeNull();
    });

    it('should clear to airport', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setTo(mockAirport2);
      });

      act(() => {
        result.current.setTo(null);
      });

      expect(result.current.to).toBeNull();
    });
  });

  describe('location swapping', () => {
    it('should swap from and to airports', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setFrom(mockAirport1);
        result.current.setTo(mockAirport2);
      });

      act(() => {
        result.current.swapLocations();
      });

      expect(result.current.from).toEqual(mockAirport2);
      expect(result.current.to).toEqual(mockAirport1);
    });

    it('should handle swapping when one location is null', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setFrom(mockAirport1);
        result.current.setTo(null);
      });

      act(() => {
        result.current.swapLocations();
      });

      expect(result.current.from).toBeNull();
      expect(result.current.to).toEqual(mockAirport1);
    });

    it('should handle swapping when both locations are null', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.swapLocations();
      });

      expect(result.current.from).toBeNull();
      expect(result.current.to).toBeNull();
    });
  });

  describe('date management', () => {
    const testDate = new Date('2024-12-25');
    const returnDate = new Date('2024-12-30');

    it('should set depart date', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setDepartDate(testDate);
      });

      expect(result.current.departDate).toEqual(testDate);
    });

    it('should set return date', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setReturnDate(returnDate);
      });

      expect(result.current.returnDate).toEqual(returnDate);
    });

    it('should clear depart date', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setDepartDate(testDate);
      });

      act(() => {
        result.current.setDepartDate(null);
      });

      expect(result.current.departDate).toBeNull();
    });

    it('should clear return date', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setReturnDate(returnDate);
      });

      act(() => {
        result.current.setReturnDate(null);
      });

      expect(result.current.returnDate).toBeNull();
    });
  });

  describe('passenger management', () => {
    it('should set passenger counts', () => {
      const { result } = renderHook(() => useSearchStore());

      const newPassengers = {
        adults: 2,
        children: 1,
        infants: 1,
      };

      act(() => {
        result.current.setPassengers(newPassengers);
      });

      expect(result.current.passengers).toEqual(newPassengers);
    });

    it('should update individual passenger types', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setPassengers({
          adults: 3,
          children: 2,
          infants: 0,
        });
      });

      expect(result.current.passengers.adults).toBe(3);
      expect(result.current.passengers.children).toBe(2);
      expect(result.current.passengers.infants).toBe(0);
    });

    it('should handle zero passengers for children and infants', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setPassengers({
          adults: 1,
          children: 0,
          infants: 0,
        });
      });

      expect(result.current.passengers.children).toBe(0);
      expect(result.current.passengers.infants).toBe(0);
    });
  });

  describe('class management', () => {
    it('should set economy class', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setClass('economy');
      });

      expect(result.current.class).toBe('economy');
    });

    it('should set premium economy class', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setClass('premium-economy');
      });

      expect(result.current.class).toBe('premium-economy');
    });

    it('should set business class', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setClass('business');
      });

      expect(result.current.class).toBe('business');
    });

    it('should set first class', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setClass('first');
      });

      expect(result.current.class).toBe('first');
    });
  });

  describe('promo code management', () => {
    it('should set promo code', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setPromoCode('SAVE20');
      });

      expect(result.current.promoCode).toBe('SAVE20');
    });

    it('should clear promo code', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setPromoCode('SAVE20');
      });

      act(() => {
        result.current.setPromoCode('');
      });

      expect(result.current.promoCode).toBe('');
    });

    it('should handle special characters in promo code', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setPromoCode('SAVE-20%');
      });

      expect(result.current.promoCode).toBe('SAVE-20%');
    });
  });

  describe('airline only management', () => {
    it('should set airline only to true', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setAirlineOnly(true);
      });

      expect(result.current.airlineOnly).toBe(true);
    });

    it('should set airline only to false', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setAirlineOnly(true);
      });

      act(() => {
        result.current.setAirlineOnly(false);
      });

      expect(result.current.airlineOnly).toBe(false);
    });
  });

  describe('search payload generation', () => {
    it('should generate complete search payload', () => {
      const { result } = renderHook(() => useSearchStore());

      const departDate = new Date('2024-12-25');
      const returnDate = new Date('2024-12-30');

      act(() => {
        result.current.setTripType('round-trip');
        result.current.setFrom(mockAirport1);
        result.current.setTo(mockAirport2);
        result.current.setDepartDate(departDate);
        result.current.setReturnDate(returnDate);
        result.current.setPassengers({
          adults: 2,
          children: 1,
          infants: 0,
        });
        result.current.setClass('business');
        result.current.setPromoCode('SAVE20');
        result.current.setAirlineOnly(true);
      });

      const payload = result.current.getSearchPayload();

      expect(payload).toEqual({
        tripType: 'round-trip',
        from: mockAirport1,
        to: mockAirport2,
        departDate: departDate,
        returnDate: returnDate,
        passengers: {
          adults: 2,
          children: 1,
          infants: 0,
        },
        class: 'business',
        promoCode: 'SAVE20',
        airlineOnly: true,
      });
    });

    it('should generate payload with null values', () => {
      const { result } = renderHook(() => useSearchStore());

      const payload = result.current.getSearchPayload();

      expect(payload).toEqual({
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
      });
    });

    it('should generate payload for one-way trip', () => {
      const { result } = renderHook(() => useSearchStore());

      const departDate = new Date('2024-12-25');

      act(() => {
        result.current.setTripType('one-way');
        result.current.setFrom(mockAirport1);
        result.current.setTo(mockAirport2);
        result.current.setDepartDate(departDate);
      });

      const payload = result.current.getSearchPayload();

      expect(payload.tripType).toBe('one-way');
      expect(payload.returnDate).toBeNull();
      expect(payload.departDate).toEqual(departDate);
    });
  });

  describe('integration tests', () => {
    it('should handle complete search flow', () => {
      const { result } = renderHook(() => useSearchStore());

      // Set up a complete search
      act(() => {
        result.current.setTripType('round-trip');
        result.current.setFrom(mockAirport1);
        result.current.setTo(mockAirport2);
        result.current.setDepartDate(new Date('2024-12-25'));
        result.current.setReturnDate(new Date('2024-12-30'));
        result.current.setPassengers({
          adults: 2,
          children: 1,
          infants: 1,
        });
        result.current.setClass('premium-economy');
        result.current.setPromoCode('HOLIDAY2024');
        result.current.setAirlineOnly(true);
      });

      // Verify all values are set correctly
      expect(result.current.tripType).toBe('round-trip');
      expect(result.current.from).toEqual(mockAirport1);
      expect(result.current.to).toEqual(mockAirport2);
      expect(result.current.passengers.adults).toBe(2);
      expect(result.current.passengers.children).toBe(1);
      expect(result.current.passengers.infants).toBe(1);
      expect(result.current.class).toBe('premium-economy');
      expect(result.current.promoCode).toBe('HOLIDAY2024');
      expect(result.current.airlineOnly).toBe(true);

      // Test location swap
      act(() => {
        result.current.swapLocations();
      });

      expect(result.current.from).toEqual(mockAirport2);
      expect(result.current.to).toEqual(mockAirport1);

      // Generate final payload
      const payload = result.current.getSearchPayload();
      expect(payload.from).toEqual(mockAirport2);
      expect(payload.to).toEqual(mockAirport1);
    });

    it('should maintain state consistency across multiple updates', () => {
      const { result } = renderHook(() => useSearchStore());

      // Multiple rapid updates
      act(() => {
        result.current.setTripType('round-trip');
        result.current.setTripType('one-way');
        result.current.setFrom(mockAirport1);
        result.current.setFrom(mockAirport2);
        result.current.setClass('business');
        result.current.setClass('economy');
      });

      expect(result.current.tripType).toBe('one-way');
      expect(result.current.from).toEqual(mockAirport2);
      expect(result.current.class).toBe('economy');
    });
  });

  describe('edge cases', () => {
    it('should handle undefined airport values', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setFrom(undefined as any);
        result.current.setTo(undefined as any);
      });

      expect(result.current.from).toBeUndefined();
      expect(result.current.to).toBeUndefined();
    });

    it('should handle invalid date objects', () => {
      const { result } = renderHook(() => useSearchStore());

      const invalidDate = new Date('invalid');

      act(() => {
        result.current.setDepartDate(invalidDate);
      });

      expect(result.current.departDate).toEqual(invalidDate);
    });

    it('should handle negative passenger counts', () => {
      const { result } = renderHook(() => useSearchStore());

      act(() => {
        result.current.setPassengers({
          adults: -1,
          children: -2,
          infants: -1,
        });
      });

      expect(result.current.passengers.adults).toBe(-1);
      expect(result.current.passengers.children).toBe(-2);
      expect(result.current.passengers.infants).toBe(-1);
    });
  });
});