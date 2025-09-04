import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '@/constants/tokens';

interface SearchButtonProps {
  onPress: () => void;
}

export function SearchButton({ onPress }: SearchButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Search flights"
    >
      <Search size={20} color={colors.white} />
      <Text style={styles.text}>Search</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.success,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.xl,
    minHeight: 56,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  pressed: {
    backgroundColor: colors.successDark,
    transform: [{ scale: 0.98 }],
  },
  text: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.white,
  },
});