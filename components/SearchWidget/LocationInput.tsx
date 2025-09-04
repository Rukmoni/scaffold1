import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { MapPin, Search } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '@/constants/tokens';
import { Input } from '@/components/ui/Input';
import { useAirports } from '@/hooks/useAirports';
import { Airport } from '@/types';

interface LocationInputProps {
  label: string;
  value: Airport | null;
  onSelect: (airport: Airport) => void;
  placeholder: string;
}

export function LocationInput({ label, value, onSelect, placeholder }: LocationInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { data: airports = [] } = useAirports();

  const filteredAirports = airports.filter(airport =>
    airport.name.toLowerCase().includes(searchText.toLowerCase()) ||
    airport.city.toLowerCase().includes(searchText.toLowerCase()) ||
    airport.code.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (airport: Airport) => {
    onSelect(airport);
    setIsOpen(false);
    setSearchText('');
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Pressable
          style={({ pressed }) => [styles.trigger, pressed && styles.triggerPressed]}
          onPress={() => setIsOpen(true)}
          accessibilityRole="button"
          accessibilityLabel={`Select ${label.toLowerCase()} airport`}
        >
          <MapPin size={16} color={colors.gray} />
          <View style={styles.triggerContent}>
            {value ? (
              <>
                <Text style={styles.triggerText}>{value.city}</Text>
                <Text style={styles.triggerSubtext}>{value.code}</Text>
              </>
            ) : (
              <Text style={styles.placeholderText}>{placeholder}</Text>
            )}
          </View>
        </Pressable>
      </View>

      <Modal
        isVisible={isOpen}
        onBackdropPress={() => setIsOpen(false)}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Select {label}</Text>
          
          <View style={styles.searchContainer}>
            <Search size={16} color={colors.gray} />
            <Input
              placeholder="Search airports..."
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
              containerStyle={styles.searchInputContainer}
            />
          </View>

          <FlatList
            data={filteredAirports}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [styles.airportItem, pressed && styles.airportItemPressed]}
                onPress={() => handleSelect(item)}
                accessibilityRole="button"
                accessibilityLabel={`Select ${item.city} airport`}
              >
                <View style={styles.airportInfo}>
                  <Text style={styles.airportCity}>{item.city}</Text>
                  <Text style={styles.airportName}>{item.name}</Text>
                </View>
                <Text style={styles.airportCode}>{item.code}</Text>
              </Pressable>
            )}
            style={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Modal>
    </>
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
  triggerContent: {
    flex: 1,
  },
  triggerText: {
    fontSize: typography.sizes.base,
    color: colors.grayDarkest,
    fontWeight: typography.weights.medium,
  },
  triggerSubtext: {
    fontSize: typography.sizes.xs,
    color: colors.gray,
  },
  placeholderText: {
    fontSize: typography.sizes.base,
    color: colors.gray,
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
    maxHeight: '80%',
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.grayDarkest,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.grayLight,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    marginBottom: spacing.lg,
  },
  searchInput: {
    flex: 1,
    borderWidth: 0,
    paddingVertical: spacing.md,
  },
  searchInputContainer: {
    marginBottom: 0,
  },
  list: {
    maxHeight: 300,
  },
  airportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  airportItemPressed: {
    backgroundColor: colors.grayLightest,
  },
  airportInfo: {
    flex: 1,
  },
  airportCity: {
    fontSize: typography.sizes.base,
    color: colors.grayDarkest,
    fontWeight: typography.weights.medium,
  },
  airportName: {
    fontSize: typography.sizes.sm,
    color: colors.gray,
  },
  airportCode: {
    fontSize: typography.sizes.base,
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
});