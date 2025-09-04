import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '@/constants/tokens';
import { useSearchStore } from '@/stores/searchStore';

export function TripTypeSelector() {
  const { tripType, setTripType } = useSearchStore();

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.option, tripType === 'one-way' && styles.activeOption]}
        onPress={() => setTripType('one-way')}
        accessibilityRole="button"
        accessibilityLabel="Select one-way trip"
      >
        <Text style={[styles.optionText, tripType === 'one-way' && styles.activeOptionText]}>
          One-way
        </Text>
      </Pressable>
      <Pressable
        style={[styles.option, tripType === 'round-trip' && styles.activeOption]}
        onPress={() => setTripType('round-trip')}
        accessibilityRole="button"
        accessibilityLabel="Select round-trip"
      >
        <Text style={[styles.optionText, tripType === 'round-trip' && styles.activeOptionText]}>
          Round-trip
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.grayLighter,
    borderRadius: borderRadius.md,
    padding: 2,
  },
  option: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 4,
    alignItems: 'center',
  },
  activeOption: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionText: {
    fontSize: typography.sizes.sm,
    color: colors.gray,
    fontWeight: typography.weights.medium,
  },
  activeOptionText: {
    color: colors.grayDarkest,
    fontWeight: typography.weights.semibold,
  },
});