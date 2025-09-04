import React from 'react';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { TripTypeSelector } from './TripTypeSelector';
import { LocationInput } from './LocationInput';
import { DateInput } from './DateInput';
import { PassengerSelector } from './PassengerSelector';
import { PromoCodeInput } from './PromoCodeInput';
import { AirlineOnlyCheckbox } from './AirlineOnlyCheckbox';
import { SearchButton } from '../SearchButton';
import { LocationSwapButton } from './LocationSwapButton';
import { colors, spacing, borderRadius, typography } from '@/constants/tokens';
import { useSearchStore } from '@/stores/searchStore';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export function SearchWidget() {
  const { tripType, from, to, departDate, returnDate, passengers, class: selectedClass, promoCode, airlineOnly } = useSearchStore();

  const handleSearch = () => {
    const searchPayload = {
      tripType,
      from,
      to,
      departDate,
      returnDate,
      passengers,
      class: selectedClass,
      promoCode,
      airlineOnly,
    };
    console.log('Search payload:', searchPayload);
  };

  if (isMobile) {
    return (
      <View style={styles.mobileContainer}>
        <Text style={styles.title}>Book your flight</Text>
        
        <View style={styles.mobileContent}>
          <TripTypeSelector />
          
          <View style={styles.locationRow}>
            <LocationInput
              label="From"
              value={from}
              onSelect={(airport) => useSearchStore.getState().setFrom(airport)}
              placeholder="Select departure"
            />
            <LocationSwapButton />
            <LocationInput
              label="To"
              value={to}
              onSelect={(airport) => useSearchStore.getState().setTo(airport)}
              placeholder="Select destination"
            />
          </View>

          <View style={styles.dateRow}>
            <DateInput
              label="Depart"
              value={departDate}
              onSelect={(date) => useSearchStore.getState().setDepartDate(date)}
              placeholder="Select date"
              minimumDate={new Date()}
            />
            {tripType === 'round-trip' && (
              <DateInput
                label="Return"
                value={returnDate}
                onSelect={(date) => useSearchStore.getState().setReturnDate(date)}
                placeholder="Select date"
                minimumDate={departDate || new Date()}
              />
            )}
          </View>

          <PassengerSelector />
          
          <View style={styles.promoRow}>
            <PromoCodeInput />
            <AirlineOnlyCheckbox />
          </View>

          <SearchButton onPress={handleSearch} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book your flight</Text>
      
      <View style={styles.content}>
        <View style={styles.topRow}>
          <TripTypeSelector />
          <PassengerSelector />
          <PromoCodeInput />
          <AirlineOnlyCheckbox />
        </View>

        <View style={styles.mainRow}>
          <View style={styles.locationSection}>
            <LocationInput
              label="From"
              value={from}
              onSelect={(airport) => useSearchStore.getState().setFrom(airport)}
              placeholder="Select departure"
            />
            <LocationSwapButton />
            <LocationInput
              label="To"
              value={to}
              onSelect={(airport) => useSearchStore.getState().setTo(airport)}
              placeholder="Select destination"
            />
          </View>

          <View style={styles.dateSection}>
            <DateInput
              label="Depart"
              value={departDate}
              onSelect={(date) => useSearchStore.getState().setDepartDate(date)}
              placeholder="Select date"
              minimumDate={new Date()}
            />
            {tripType === 'round-trip' && (
              <DateInput
                label="Return"
                value={returnDate}
                onSelect={(date) => useSearchStore.getState().setReturnDate(date)}
                placeholder="Select date"
                minimumDate={departDate || new Date()}
              />
            )}
          </View>

          <SearchButton onPress={handleSearch} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  mobileContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.grayDarkest,
    marginBottom: spacing.lg,
  },
  content: {
    gap: spacing.lg,
  },
  mobileContent: {
    gap: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-end',
  },
  mainRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-end',
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    flex: 1,
  },
  dateSection: {
    flexDirection: 'row',
    gap: spacing.sm,
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  dateRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  promoRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-end',
  },
});