import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Linking, Platform, Dimensions } from 'react-native';
import { colors, spacing, borderRadius, typography } from '@/constants/tokens';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

const footerSections = [
  {
    title: 'Travel Information',
    links: [
      'Flight status',
      'Airports and terminals',
      'Check-in information',
      'Mobile Check-in',
      'Our fares',
      'Fees and Charges',
      'Payment channels',
      'Tax invoice',
      'Ancillary Add-Ons'
    ]
  },
  {
    title: 'Our Products and Services',
    links: [
      'Flights',
      'SNAP',
      'Hotels',
      'Ride/ Airport Transfer',
      'Points exchange',
      'Events & Activities',
      'Duty-free',
      'Asean Pass',
      'Travel Insurance',
      'IKHLAS',
      'Rewards',
      'Gifts',
      'BigPay',
      'Charter',
      'Promotions'
    ]
  },
  {
    title: "Partners' Product",
    links: [
      'Our airline partners',
      'Affiliate Partner',
      'Influencer program',
      'AirAsia Card',
      'CIMB Savers',
      'Luggage delivery',
      'Agent login',
      'Register as trade partner'
    ]
  },
  {
    title: 'About Us',
    links: [
      'About AirAsia MOVE',
      'Advertise With Us',
      'AirAsia Foundation',
      'Careers',
      'AirAsia Corporate',
      'Newsroom',
      'History',
      'Sales office',
      'Investor relations',
      'Teleport Logistics'
    ]
  }
];

export function Footer() {
  const handleLinkPress = (link: string) => {
    console.log(`Navigate to: ${link}`);
  };

  const handleAppStorePress = (store: string) => {
    console.log(`Open ${store}`);
  };

  const handleSocialPress = (platform: string) => {
    console.log(`Open ${platform}`);
  };

  return (
    <View style={styles.container}>
      {/* Main Footer Content */}
      <View style={styles.content}>
        <View style={styles.sectionsContainer}>
          {footerSections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.links.map((link, linkIndex) => (
                <Pressable
                  key={linkIndex}
                  style={({ pressed }) => [styles.link, pressed && styles.linkPressed]}
                  onPress={() => handleLinkPress(link)}
                  accessibilityRole="link"
                  accessibilityLabel={link}
                >
                  <Text style={styles.linkText}>{link}</Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.bottomContent}>
          {/* Left Side - App Store Buttons */}
          <View style={styles.leftSection}>
            <Text style={styles.appSectionTitle}>AirAsia MOVE</Text>
            <View style={styles.appButtons}>
              <Pressable
                style={styles.appButton}
                onPress={() => handleAppStorePress('App Store')}
                accessibilityRole="button"
                accessibilityLabel="Download on App Store"
              >
                <Text style={styles.appButtonText}>📱 App Store</Text>
              </Pressable>
              <Pressable
                style={styles.appButton}
                onPress={() => handleAppStorePress('Google Play')}
                accessibilityRole="button"
                accessibilityLabel="Get it on Google Play"
              >
                <Text style={styles.appButtonText}>🤖 Google Play</Text>
              </Pressable>
              <Pressable
                style={styles.appButton}
                onPress={() => handleAppStorePress('AppGallery')}
                accessibilityRole="button"
                accessibilityLabel="Explore it on AppGallery"
              >
                <Text style={styles.appButtonText}>🏪 AppGallery</Text>
              </Pressable>
            </View>
          </View>

          {/* Right Side - Social Media */}
          <View style={styles.rightSection}>
            <Text style={styles.socialTitle}>Connect with Us</Text>
            <View style={styles.socialIcons}>
              {[
                { name: 'Facebook', icon: 'f' },
                { name: 'TikTok', icon: 'T' },
                { name: 'X', icon: 'X' },
                { name: 'Instagram', icon: 'I' },
                { name: 'YouTube', icon: 'Y' },
                { name: 'LinkedIn', icon: 'L' }
              ].map((social) => (
                <Pressable
                  key={social.name}
                  style={({ pressed }) => [styles.socialIcon, pressed && styles.socialIconPressed]}
                  onPress={() => handleSocialPress(social.name)}
                  accessibilityRole="button"
                  accessibilityLabel={`Follow us on ${social.name}`}
                >
                  <Text style={styles.socialIconText}>{social.icon}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Copyright */}
        <View style={styles.copyrightSection}>
          <Text style={styles.copyrightText}>
            © 2024 AirAsia Berhad (Malaysia). This website is owned and operated by Move Travel Sdn Bhd (formerly known as AirAsia Com Travel Sdn Bhd) (201301020508), a registered travel agency (KPK/LN License No: 8287). Your usage of this website indicates that you agree to be bound by our Terms and Conditions, Terms of Use and Privacy Statement.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grayLightest,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  sectionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.xl,
  },
  section: {
    flex: 1,
    minWidth: 200,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.grayDarkest,
    marginBottom: spacing.md,
  },
  link: {
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  linkPressed: {
    backgroundColor: colors.grayLighter,
  },
  linkText: {
    fontSize: typography.sizes.sm,
    color: colors.grayDark,
    lineHeight: 20,
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  leftSection: {
    flex: 1,
  },
  appSectionTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.grayDarkest,
    marginBottom: spacing.md,
  },
  appButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    flexWrap: 'wrap',
  },
  appButton: {
    backgroundColor: colors.grayDarkest,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    minWidth: 120,
    alignItems: 'center',
  },
  appButtonText: {
    color: colors.white,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  socialTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.grayDarkest,
    marginBottom: spacing.md,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.grayDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconPressed: {
    backgroundColor: colors.grayDarker,
  },
  socialIconText: {
    color: colors.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
  },
  copyrightSection: {
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
  },
  copyrightText: {
    fontSize: typography.sizes.xs,
    color: colors.gray,
    lineHeight: 18,
    textAlign: 'center',
  },
});