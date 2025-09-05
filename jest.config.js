module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/jest.setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(?:react-native'
      + '|@react-native'
      + '|@react-native-async-storage/async-storage'
      + '|react-native-web'
      + '|react-navigation'
      + '|@react-navigation/.*'
      + '|expo(nent)?'
      + '|@expo(nent)?/.*'
      + '|expo-modules-core'
    + ')/)',
  ],
  moduleNameMapper: {
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testMatch: ['**/?(*.)+(test|spec).[tj]s?(x)'],
};