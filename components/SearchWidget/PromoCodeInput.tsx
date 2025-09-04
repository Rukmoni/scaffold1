import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from '@/components/ui/Input';
import { colors, spacing, typography } from '@/constants/tokens';
import { useSearchStore } from '@/stores/searchStore';

export function PromoCodeInput() {
  const { promoCode, setPromoCode } = useSearchStore();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Promo code</Text>
      <Input
        value={promoCode}
        onChangeText={setPromoCode}
        placeholder="Enter code"
        style={styles.input}
        containerStyle={styles.inputContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 120,
  },
  label: {
    fontSize: typography.sizes.xs,
    color: colors.gray,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
  },
  input: {
    minHeight: 48,
  },
  inputContainer: {
    marginBottom: 0,
  },
});