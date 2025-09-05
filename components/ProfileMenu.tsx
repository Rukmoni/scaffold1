import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { 
  User, 
  ShoppingBag, 
  CreditCard, 
  Headphones, 
  Gift, 
  LogOut,
  Crown
} from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '@/constants/tokens';
import { useUIStore } from '@/stores/uiStore';
import { useAuth } from '@features/auth';

const menuItems = [
  { icon: User, label: 'My account', action: 'account' },
  { icon: ShoppingBag, label: 'Purchases', action: 'purchases' },
  { icon: Crown, label: 'My subscription', action: 'subscription' },
  { icon: CreditCard, label: 'My cards', action: 'cards' },
  { icon: Headphones, label: 'My cases', action: 'cases' },
  { icon: Gift, label: 'Rewards', action: 'rewards' },
  { icon: LogOut, label: 'Logout', action: 'logout' },
];

export function ProfileMenu() {
  const { isProfileMenuOpen, setProfileMenuOpen } = useUIStore();
  const { logout, isLoading } = useAuth();

  const handleMenuAction = async (action: string) => {
    if (action === 'logout') {
      try {
        await logout();
        console.log('User logged out successfully');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    } else {
      console.log(`Profile menu action: ${action}`);
    }
    setProfileMenuOpen(false);
  };

  if (Platform.OS === 'web') {
    return isProfileMenuOpen ? (
      <View style={styles.webDropdown}>
        {menuItems.map((item) => (
          <Pressable
            key={item.action}
            style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
            onPress={() => handleMenuAction(item.action)}
            accessibilityRole="button"
            accessibilityLabel={item.label}
          >
            <item.icon size={16} color={colors.gray} />
            <Text style={styles.menuText}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    ) : null;
  }

  return (
    <Modal
      isVisible={isProfileMenuOpen}
      onBackdropPress={() => setProfileMenuOpen(false)}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.sheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>Profile Menu</Text>
        </View>
        {menuItems.map((item) => (
          <Pressable
            key={item.action}
            style={({ pressed }) => [styles.sheetItem, pressed && styles.menuItemPressed]}
            onPress={() => handleMenuAction(item.action)}
            accessibilityRole="button"
            accessibilityLabel={item.label}
          >
            <item.icon size={20} color={colors.gray} />
            <Text style={styles.sheetItemText}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  webDropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    minWidth: 200,
    zIndex: 9999,
    marginTop: spacing.xs,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    paddingBottom: spacing.xl,
  },
  sheetHeader: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  sheetTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.grayDarkest,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  menuItemPressed: {
    backgroundColor: colors.grayLightest,
  },
  menuText: {
    fontSize: typography.sizes.sm,
    color: colors.grayDark,
    fontWeight: typography.weights.medium,
  },
  sheetItemText: {
    fontSize: typography.sizes.base,
    color: colors.grayDark,
    fontWeight: typography.weights.medium,
  },
});