// Silence Animated warning & set up RN gesture handler if present
import 'react-native-gesture-handler/jestSetup';

// 👇 Wrap in try/catch so it won’t break on RN 0.79+
try {
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
} catch (e) {
  // No-op: RN 0.79 doesn’t ship this helper anymore
}