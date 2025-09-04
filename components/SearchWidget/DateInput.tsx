import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '@/constants/tokens';

interface DateInputProps {
  label: string;
  value: Date | null;
  onSelect: (date: Date) => void;
  placeholder: string;
  minimumDate?: Date;
}

export function DateInput({ label, value, onSelect, placeholder, minimumDate }: DateInputProps) {
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatDateWithDay = (date: Date) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    return `${formatDate(date)} (${dayName})`;
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.webInputContainer}>
          <Calendar size={16} color={colors.gray} />
          <input
            type="date"
            value={value ? value.toISOString().split('T')[0] : ''}
            onChange={(e) => {
              if (e.target.value) {
                onSelect(new Date(e.target.value));
              }
            }}
            min={minimumDate ? minimumDate.toISOString().split('T')[0] : undefined}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 16,
              color: colors.grayDarkest,
              flex: 1,
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={({ pressed }) => [styles.trigger, pressed && styles.triggerPressed]}
        onPress={() => setShowPicker(true)}
        accessibilityRole="button"
        accessibilityLabel={`Select ${label.toLowerCase()}`}
      >
        <Calendar size={16} color={colors.gray} />
        <Text style={[styles.triggerText, !value && styles.placeholderText]}>
          {value ? formatDateWithDay(value) : placeholder}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              onSelect(selectedDate);
            }
          }}
          minimumDate={minimumDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: typography.sizes.xs,
    color: colors.gray,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.grayLight,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    minHeight: 48,
  },
  triggerPressed: {
    backgroundColor: colors.grayLightest,
  },
  triggerText: {
    fontSize: typography.sizes.base,
    color: colors.grayDarkest,
    fontWeight: typography.weights.medium,
  },
  placeholderText: {
    color: colors.gray,
  },
  webInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.grayLight,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    minHeight: 48,
  },
});