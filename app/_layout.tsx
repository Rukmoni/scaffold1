import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { FloatingChatButton } from '@/components/FloatingChatButton';
import { useAuth } from '@/features/auth';
import { colors, spacing, typography } from '@/constants/tokens';

const queryClient = new QueryClient();

export default function RootLayout() {
  useFrameworkReady();
  const { rehydrateAuth, isHydrating } = useAuth();

  useEffect(() => {
    // Rehydrate auth state on app startup
    rehydrateAuth();
  }, [rehydrateAuth]);

  // Show loading screen while hydrating auth state
  if (isHydrating) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <FloatingChatButton />
        <StatusBar style="auto" />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  loadingText: {
    fontSize: typography.sizes.lg,
    color: colors.gray,
    fontWeight: typography.weights.medium,
  },
});