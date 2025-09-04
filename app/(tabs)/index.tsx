import React from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { TabsBar } from '@/components/TabsBar';
import { SearchWidget } from '@/components/SearchWidget/SearchWidget';
import { HeroBanner } from '@/components/HeroBanner';
import { colors, spacing } from '@/constants/tokens';

export default function HomeTabScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <TabsBar />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <SearchWidget />
          <HeroBanner />
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