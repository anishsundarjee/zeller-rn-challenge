import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { it, describe, expect } from '@jest/globals';
import { ErrorScreen } from '@/components';

jest.mock('react-native-safe-area-context', () => {
  return {
    useSafeAreaInsets: () => ({ top: 0, bottom: 0 }),
  };
});

describe('ErrorScreen', () => {
  it('compare snapshot', async () => {
    const tree = renderer.create(
      <ErrorScreen onPress={jest.fn()} testID='error-screen' />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('renders correctly and press button', async () => {
    const mockPress = jest.fn();
    const tree = renderer.create(
      <ErrorScreen onPress={mockPress} testID='error-screen'/>,
    );

    expect(tree.root.findByProps({ testID: 'error-screen' }).props).toBeDefined();
    const button = tree.root.findByProps({ testID: 'error-button' }).props;
    expect(button).toBeDefined();

    await renderer.act(async () => {
      await button.onPress();
    });

    expect(mockPress).toHaveBeenCalled();
  });
});