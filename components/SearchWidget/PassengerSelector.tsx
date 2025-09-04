import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Users, ChevronDown, Plus, Minus } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '@/constants/tokens';
import { useSearchStore } from '@/stores/searchStore';
import { useUIStore } from '@/stores/uiStore';
import { Button } from '@/components/ui/Button';

const classOptions = [
  { value: 'economy', label: 'Economy' },
  { value: 'premium-economy', label: 'Premium Economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First' },
] as const;

export function PassengerSelector() {
  const { passengers, class: selectedClass, setPassengers, setClass } = useSearchStore();
  const { isPassengerPopoverOpen, setPassengerPopoverOpen } = useUIStore();

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  const updatePassengerCount = (type: keyof typeof passengers, delta: number) => {
    const newCount = Math.max(0, passengers[type] + delta);
    if (type === 'adults' && newCount === 0) return; // At least 1 adult required
    
    setPassengers({
      ...passengers,
      [type]: newCount,
    });
  };

  const getPassengerText = () => {
    const classLabel = classOptions.find(opt => opt.value === selectedClass)?.label || 'Economy';
    return `${totalPassengers} Guest ${classLabel}`;
  };

  return (
    <>
      <Pressable
        style={({ pressed }) => [styles.trigger, pressed && styles.triggerPressed]}
        onPress={() => setPassengerPopoverOpen(true)}
        accessibilityRole="button"
        accessibilityLabel="Select passengers and class"
      >
        <Users size={16} color={colors.gray} />
        <Text style={styles.triggerText}>{getPassengerText()}</Text>
        <ChevronDown size={16} color={colors.gray} />
      </Pressable>

      <Modal
        isVisible={isPassengerPopoverOpen}
        onBackdropPress={() => setPassengerPopoverOpen(false)}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Passengers & Class</Text>
          
          {/* Passenger Counters */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Passengers</Text>
            
            <View style={styles.passengerRow}>
              <Text style={styles.passengerLabel}>Adults</Text>
              <View style={styles.counter}>
                <Pressable
                  style={styles.counterButton}
                  onPress={() => updatePassengerCount('adults', -1)}
                  disabled={passengers.adults <= 1}
                >
                  <Minus size={16} color={passengers.adults <= 1 ? colors.gray : colors.gray} />
                </Pressable>
                <Text style={styles.counterText}>{passengers.adults}</Text>
                <Pressable
                  style={styles.counterButton}
                  onPress={() => updatePassengerCount('adults', 1)}
                >
                  <Plus size={16} color={colors.gray} />
                </Pressable>
              </View>
            </View>

            <View style={styles.passengerRow}>
              <Text style={styles.passengerLabel}>Children</Text>
              <View style={styles.counter}>
                <Pressable
                  style={styles.counterButton}
                  onPress={() => updatePassengerCount('children', -1)}
                  disabled={passengers.children <= 0}
                >
                  <Minus size={16} color={passengers.children <= 0 ? colors.gray : colors.gray} />
                </Pressable>
                <Text style={styles.counterText}>{passengers.children}</Text>
                <Pressable
                  style={styles.counterButton}
                  onPress={() => updatePassengerCount('children', 1)}
                >
                  <Plus size={16} color={colors.gray} />
                </Pressable>
              </View>
            </View>

            <View style={styles.passengerRow}>
              <Text style={styles.passengerLabel}>Infants</Text>
              <View style={styles.counter}>
                <Pressable
                  style={styles.counterButton}
                  onPress={() => updatePassengerCount('infants', -1)}
                  disabled={passengers.infants <= 0}
                >
                  <Minus size={16} color={passengers.infants <= 0 ? colors.gray : colors.gray} />
                </Pressable>
                <Text style={styles.counterText}>{passengers.infants}</Text>
                <Pressable
                  style={styles.counterButton}
                  onPress={() => updatePassengerCount('infants', 1)}
                >
                  <Plus size={16} color={colors.gray} />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Class Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Class</Text>
            {classOptions.map((option) => (
              <Pressable
                key={option.value}
                style={[styles.classOption, selectedClass === option.value && styles.activeClassOption]}
                onPress={() => setClass(option.value)}
                accessibilityRole="button"
                accessibilityLabel={`Select ${option.label} class`}
              >
                <Text style={[styles.classText, selectedClass === option.value && styles.activeClassText]}>
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <Button
            title="Done"
            onPress={() => setPassengerPopoverOpen(false)}
            style={styles.doneButton}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
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
  },
  triggerPressed: {
    backgroundColor: colors.grayLightest,
  },
  triggerText: {
    fontSize: typography.sizes.sm,
    color: colors.grayDark,
    fontWeight: typography.weights.medium,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.grayDarkest,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.grayDarkest,
    marginBottom: spacing.md,
  },
  passengerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  passengerLabel: {
    fontSize: typography.sizes.base,
    color: colors.grayDark,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  counterButton: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.grayLighter,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.grayDarkest,
    minWidth: 20,
    textAlign: 'center',
  },
  classOption: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  activeClassOption: {
    backgroundColor: colors.primaryLight,
  },
  classText: {
    fontSize: typography.sizes.base,
    color: colors.grayDark,
  },
  activeClassText: {
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
  doneButton: {
    marginTop: spacing.lg,
  },
});