import { Platform } from 'react-native';

// Platform-specific footer imports
export { Footer } from Platform.OS === 'web' ? './Footer.web' : './Footer.native';