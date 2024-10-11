import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { it, describe, expect } from '@jest/globals';
import { LoadingScreen } from '@/components';

jest.mock('react-native-safe-area-context', () => {
  return {
    useSafeAreaInsets: () => ({ top: 0, bottom: 0 }),
  };
});

describe('LoadingScreen', () => {
  it('compare snapshot', async () => {
    const tree = renderer.create(
      <LoadingScreen testID='loading-screen' />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('renders correctly', async () => {
    const tree = renderer.create(
      <LoadingScreen testID='loading-screen'/>,
    );

    expect(tree.root.findByProps({ testID: 'loading-screen' }).props).toBeDefined();
  });
});