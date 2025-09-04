import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ArrowLeftRight } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '@/constants/tokens';
import { useSearchStore } from '@/stores/searchStore';

export function LocationSwapButton() {
  const { swapLocations } = useSearchStore();

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={swapLocations}
      accessibilityRole="button"
      accessibilityLabel="Swap departure and destination"
    >
      <ArrowLeftRight size={16} color={colors.gray} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // Align with input fields
  },
  pressed: {
    backgroundColor: colors.grayLightest,
  },
});