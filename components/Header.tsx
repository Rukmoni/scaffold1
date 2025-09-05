import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { Menu, ChevronDown, Globe, User, X } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '@/constants/tokens';
import { useUIStore } from '@/stores/uiStore';
import { ProfileMenu } from './ProfileMenu';
import { useAuth } from '@features/auth';

const { width } = Dimensions.get('window');

const navItems = ['App', 'Play', 'Purchases', 'Check-in', 'Flight Status', 'FAQ', 'Promotions'];

export function Header() {
  const { isMobileMenuOpen, setMobileMenuOpen, isProfileMenuOpen, setProfileMenuOpen } = useUIStore();
  const { user, isLoggedIn, login, isLoading } = useAuth();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const handleNavItemPress = (item: string) => {
    console.log(`Navigate to ${item}`);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const handleAuthAction = async (action: 'login' | 'signup') => {
    if (action === 'login') {
      try {
        await login();
        console.log('User logged in successfully');
      } catch (error) {
        console.error('Login failed:', error);
      }
    } else {
      console.log('Navigate to signup');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logo}>
          <Text style={styles.logoText}>AirAsia</Text>
          <Text style={styles.logoSubtext}>MOVE</Text>
        </View>

        {/* Desktop Navigation */}
        {!isMobile && (
          <View style={[styles.nav, isTablet && styles.navTablet]}>
            {navItems.map((item) => (
              <Pressable
                key={item}
                style={({ pressed }) => [styles.navItem, pressed && styles.navItemPressed]}
                onPress={() => handleNavItemPress(item)}
                accessibilityRole="button"
                accessibilityLabel={`Navigate to ${item}`}
              >
                <Text style={[styles.navText, isTablet && styles.navTextTablet]}>{item}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Right Section */}
        <View style={styles.rightSection}>
          {/* Locale Selector - Hide on small mobile */}
          {width > 480 && (
            <Pressable
              style={({ pressed }) => [styles.localeButton, pressed && styles.pressed]}
              onPress={() => console.log('Open locale selector')}
              accessibilityRole="button"
              accessibilityLabel="Select language and currency"
            >
              <Globe size={16} color={colors.grayMedium} />
              <Text style={styles.localeText}>EN / MYR</Text>
              <ChevronDown size={16} color={colors.grayMedium} />
            </Pressable>
          )}

          {/* Profile */}
          <View style={styles.profileContainer}>
            {isLoggedIn ? (
              <>
                <Pressable
                  style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}
                  onPress={() => setProfileMenuOpen(!isProfileMenuOpen)}
                  accessibilityRole="button"
                  accessibilityLabel="Open profile menu"
                >
                  <View style={styles.avatar}>
                    <User size={isMobile ? 18 : 20} color={colors.white} />
                  </View>
                  {!isMobile && (
                    <>
                      <Text style={styles.profileText}>{user?.name}</Text>
                      <ChevronDown size={16} color={colors.grayMedium} />
                    </>
                  )}
                </Pressable>
                {/* Profile Menu for Desktop */}
                {!isMobile && <ProfileMenu />}
              </>
            ) : (
              <View style={styles.authButtons}>
                <Pressable
                  style={({ pressed }) => [styles.authButton, styles.loginButton, pressed && styles.pressed]}
                  onPress={() => handleAuthAction('login')}
                  disabled={isLoading}
                  accessibilityRole="button"
                  accessibilityLabel="Login"
                >
                  <Text style={[styles.authButtonText, styles.loginButtonText]}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Text>
                </Pressable>
                {!isMobile && (
                  <Pressable
                    style={({ pressed }) => [styles.authButton, styles.signupButton, pressed && styles.pressed]}
                    onPress={() => handleAuthAction('signup')}
                    accessibilityRole="button"
                    accessibilityLabel="Sign up"
                  >
                    <Text style={[styles.authButtonText, styles.signupButtonText]}>Sign up</Text>
                  </Pressable>
                )}
              </View>
            )}
          </View>

          {/* Mobile Menu Button */}
          {isMobile && (
            <Pressable
              style={({ pressed }) => [styles.menuButton, pressed && styles.pressed]}
              onPress={() => setMobileMenuOpen(!isMobileMenuOpen)}
              accessibilityRole="button"
              accessibilityLabel="Open menu"
            >
              <Menu size={24} color={colors.grayDark} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Mobile Menu Modal */}
      {isMobile && (
        <Modal
          isVisible={isMobileMenuOpen}
          onBackdropPress={() => setMobileMenuOpen(false)}
          style={styles.mobileMenuModal}
          animationIn="slideInRight"
          animationOut="slideOutRight"
        >
          <View style={styles.mobileMenuContainer}>
            {/* Mobile Menu Header */}
            <View style={styles.mobileMenuHeader}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>AirAsia</Text>
                <Text style={styles.logoSubtext}>MOVE</Text>
              </View>
              <Pressable
                style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
                onPress={() => setMobileMenuOpen(false)}
                accessibilityRole="button"
                accessibilityLabel="Close menu"
              >
                <X size={24} color={colors.grayDark} />
              </Pressable>
            </View>

            {/* Mobile Navigation Items */}
            <View style={styles.mobileNavItems}>
              {navItems.map((item) => (
                <Pressable
                  key={item}
                  style={({ pressed }) => [styles.mobileNavItem, pressed && styles.mobileNavItemPressed]}
                  onPress={() => handleNavItemPress(item)}
                  accessibilityRole="button"
                  accessibilityLabel={`Navigate to ${item}`}
                >
                  <Text style={styles.mobileNavText}>{item}</Text>
                </Pressable>
              ))}
            </View>

            {/* Mobile Locale Selector */}
            <View style={styles.mobileLocaleSection}>
              {/* Auth buttons for mobile when not logged in */}
              {!isLoggedIn && (
                <View style={styles.mobileAuthSection}>
                  <Pressable
                    style={({ pressed }) => [styles.mobileAuthButton, styles.loginButton, pressed && styles.pressed]}
                    onPress={() => {
                      handleAuthAction('login');
                      setMobileMenuOpen(false);
                    }}
                    disabled={isLoading}
                    accessibilityRole="button"
                    accessibilityLabel="Login"
                  >
                    <Text style={[styles.authButtonText, styles.loginButtonText]}>
                      {isLoading ? 'Logging in...' : 'Login'}
                    </Text>
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [styles.mobileAuthButton, styles.signupButton, pressed && styles.pressed]}
                    onPress={() => {
                      handleAuthAction('signup');
                      setMobileMenuOpen(false);
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Sign up"
                  >
                    <Text style={[styles.authButtonText, styles.signupButtonText]}>Sign up</Text>
                  </Pressable>
                </View>
              )}
              
              <Pressable
                style={({ pressed }) => [styles.mobileLocaleButton, pressed && styles.pressed]}
                onPress={() => console.log('Open locale selector')}
                accessibilityRole="button"
                accessibilityLabel="Select language and currency"
              >
                <Globe size={20} color={colors.grayMedium} />
                <Text style={styles.mobileLocaleText}>EN / MYR</Text>
                <ChevronDown size={16} color={colors.grayMedium} />
              </Pressable>
            </View>
          </View>
        </Modal>
      )}

      {/* Profile Menu for Mobile */}
      {isMobile && <ProfileMenu />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
    zIndex: 1000,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 60,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  logoText: {
    fontSize: typography.titleLarge,
    fontWeight: typography.weightBold,
    color: colors.red,
  },
  logoSubtext: {
    fontSize: typography.bodyLarge,
    fontWeight: typography.weightBold,
    color: colors.successPrimary,
    marginLeft: spacing.xs,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    flex: 1,
    justifyContent: 'center',
    maxWidth: 600,
  },
  navTablet: {
    gap: spacing.md,
    maxWidth: 500,
  },
  navItem: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
  },
  navItemPressed: {
    backgroundColor: colors.grayLighter,
  },
  navText: {
    fontSize: typography.bodyMedium,
    color: colors.grayDark,
    fontWeight: typography.weightMedium,
  },
  navTextTablet: {
    fontSize: typography.bodySmall,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  profileContainer: {
    position: 'relative',
  },
  localeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
  },
  localeText: {
    fontSize: typography.bodySmall,
    color: colors.grayMedium,
    fontWeight: typography.weightMedium,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.grayMedium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    fontSize: typography.bodyMedium,
    color: colors.grayDark,
    fontWeight: typography.weightMedium,
  },
  menuButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  pressed: {
    backgroundColor: colors.grayLighter,
  },
  
  // Mobile Menu Styles
  mobileMenuModal: {
    margin: 0,
    justifyContent: 'flex-start',
  },
  mobileMenuContainer: {
    backgroundColor: colors.white,
    width: '85%',
    height: '100%',
    paddingTop: spacing.xl,
    shadowColor: colors.black,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  mobileMenuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  closeButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  mobileNavItems: {
    paddingTop: spacing.lg,
  },
  mobileNavItem: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLightest,
  },
  mobileNavItemPressed: {
    backgroundColor: colors.grayLighter,
  },
  mobileNavText: {
    fontSize: typography.bodyLarge,
    color: colors.grayDark,
    fontWeight: typography.weightMedium,
  },
  mobileLocaleSection: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
  },
  mobileLocaleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.grayLightest,
  },
  mobileLocaleText: {
    fontSize: typography.bodyMedium,
    color: colors.grayDark,
    fontWeight: typography.weightMedium,
    flex: 1,
  },
  
  // Auth Button Styles
  authButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  authButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    minWidth: 70,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: colors.primary,
  },
  signupButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  authButtonText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
  loginButtonText: {
    color: colors.white,
  },
  signupButtonText: {
    color: colors.primary,
  },
  mobileAuthSection: {
    gap: spacing.md,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  mobileAuthButton: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
});