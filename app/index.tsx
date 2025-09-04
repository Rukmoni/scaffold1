import React from 'react';
import { View, ScrollView, StyleSheet, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from 'expo-router';
import { Header } from '@/components/Header';
import { TabsBar } from '@/components/TabsBar';
import { SearchWidget } from '@/components/SearchWidget/SearchWidget';
import { HeroBanner } from '@/components/HeroBanner';
import { Footer } from '@/components/Footer';
import { colors, spacing } from '@/constants/tokens';

const { width } = Dimensions.get('window');

export default function HomePage() {
  // On mobile platforms, redirect to tabs layout
  if (Platform.OS !== 'web') {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <TabsBar />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <SearchWidget />
          <HeroBanner />
          {Platform.OS === 'web' && <Footer />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayLightest,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
});