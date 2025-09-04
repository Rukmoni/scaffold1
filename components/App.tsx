import { View, Text, StyleSheet } from 'react-native';

interface AppProps {
  title?: string;
}

export default function App({ title = 'Hello Expo' }: AppProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="app-title">
        {title}
      </Text>
      <Text style={styles.description} testID="app-description">
        This is a testable Expo component with TypeScript and Jest.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});