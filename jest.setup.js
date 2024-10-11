import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';

jest.mock('react-native-reanimated', () => jest.requireActual('react-native-reanimated/mock'));
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('aws-amplify', () => {
  return {
    API: {
      graphql: () => jest.fn(),
    },
    graphqlOperation: () => jest.fn(),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  reactNative.NativeModules.StatusBarManager = {getHeight: jest.fn()};
  return reactNative;
});