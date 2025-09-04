import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '@/constants/tokens';
import { useSearchStore } from '@/stores/searchStore';

export function AirlineOnlyCheckbox() {
  const { airlineOnly, setAirlineOnly } = useSearchStore();

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => setAirlineOnly(!airlineOnly)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: airlineOnly }}
      accessibilityLabel="AirAsia flights only"
    >
      <View style={[styles.checkbox, airlineOnly && styles.checkedCheckbox]}>
        {airlineOnly && <Check size={12} color={colors.white} />}
      </View>
      <Text style={styles.label}>AirAsia flights only</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: 4,
  },
  pressed: {
    backgroundColor: colors.grayLightest,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: colors.grayLight,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  checkedCheckbox: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  label: {
    fontSize: typography.sizes.sm,
    color: colors.grayDark,
    fontWeight: typography.weights.medium,
  },
});