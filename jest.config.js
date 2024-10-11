const { defaults } = require('jest-config');

module.exports = {
  preset: 'jest-expo',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  modulePathIgnorePatterns: ['extras'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  transform: {
    '^.+\\.(js|ts|tsx|jsx)$': 'babel-jest',
  },
  setupFiles: [
    '<rootDir>/jest.setup.js',
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/jest.env.js',
  ],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|@aws-amplify|bs-platform)"
  ],
  moduleNameMapper: {
    '^d3-(.*)$': 'd3-$1/dist/d3-$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  moduleDirectories: ['node_modules', 'src'],
  verbose: true,
  timers: 'fake',
  testEnvironment: 'jsdom',
  testTimeout: 10000,
};
