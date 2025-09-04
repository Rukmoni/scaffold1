import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Plane, Camera, Building, Car, ArrowRightLeft, Calendar, ShoppingBag, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '@/constants/tokens';

const { width } = Dimensions.get('window');

const tabs = [
  { id: 'flights', label: 'Flights', icon: Plane, active: true },
  { id: 'snap', label: 'SNAP!', icon: Camera, active: false },
  { id: 'hotels', label: 'Hotels', icon: Building, active: false },
  { id: 'ride', label: 'Ride', icon: Car, active: false },
  { id: 'points', label: 'Points exchange', icon: ArrowRightLeft, active: false },
  { id: 'events', label: 'Events', icon: Calendar, active: false },
  { id: 'duty-free', label: 'Duty-free', icon: ShoppingBag, active: false },
  { id: 'show-all', label: 'Show All', icon: MoreHorizontal, active: false },
];

export function TabsBar() {
  const [activeTab, setActiveTab] = React.useState('flights');
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  return (
    <View style={styles.container}>
      <View style={[styles.contentContainer, isMobile && styles.mobileContentContainer]}>
        {isMobile ? (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {tabs.map((tab) => (
              <Pressable
                key={tab.id}
                style={({ pressed }) => [
                  styles.tab,
                  styles.mobileTab,
                  activeTab === tab.id && styles.activeTab,
                  pressed && styles.tabPressed,
                ]}
                onPress={() => setActiveTab(tab.id)}
                accessibilityRole="button"
                accessibilityLabel={`Select ${tab.label} tab`}
              >
                <tab.icon 
                  size={18} 
                  color={activeTab === tab.id ? colors.primary : colors.gray} 
                />
                <Text style={[
                  styles.tabText,
                  styles.mobileTabText,
                  activeTab === tab.id && styles.activeTabText,
                ]}>
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        ) : (
          <View style={[styles.tabsGrid, isTablet && styles.tabsGridTablet]}>
            {tabs.map((tab) => (
              <Pressable
                key={tab.id}
                style={({ pressed }) => [
                  styles.tab,
                  styles.desktopTab,
                  isTablet && styles.tabletTab,
                  activeTab === tab.id && styles.activeTab,
                  pressed && styles.tabPressed,
                ]}
                onPress={() => setActiveTab(tab.id)}
                accessibilityRole="button"
                accessibilityLabel={`Select ${tab.label} tab`}
              >
                <tab.icon 
                  size={isTablet ? 18 : 20} 
                  color={activeTab === tab.id ? colors.primary : colors.gray} 
                />
                <Text style={[
                  styles.tabText,
                  isTablet && styles.tabletTabText,
                  activeTab === tab.id && styles.activeTabText,
                ]}>
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  contentContainer: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  mobileContentContainer: {
    maxWidth: '100%',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.lg,
  },
  tabsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  tabsGridTablet: {
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  tab: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  mobileTab: {
    minWidth: 80,
  },
  desktopTab: {
    minWidth: 100,
    flex: 1,
    maxWidth: 140,
  },
  tabletTab: {
    minWidth: 85,
    maxWidth: 120,
  },
  activeTab: {
    backgroundColor: colors.primaryLight,
  },
  tabPressed: {
    backgroundColor: colors.grayLighter,
  },
  tabText: {
    fontSize: typography.sizes.xs,
    color: colors.gray,
    fontWeight: typography.weights.medium,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  mobileTabText: {
    fontSize: typography.sizes.xs,
  },
  tabletTabText: {
    fontSize: typography.sizes.xs,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
});