import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { it, describe, expect } from '@jest/globals';
import { CustomButton } from '@/components';

describe('CustomButton', () => {
  it('compare snapshot', async () => {
    const tree = renderer.create(
      <CustomButton testID='custom-btn' onPress={jest.fn()} text='mock' />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('renders correctly and press button', async () => {
    const mockPress = jest.fn();
    const tree = renderer.create(
      <CustomButton testID='custom-btn' onPress={mockPress} text='mock' />,
    );

    const button = tree.root.findByProps({ testID: 'custom-btn' }).props;
    expect(button).toBeDefined();

    await renderer.act(async () => {
      await button.onPress();
    });

    expect(mockPress).toHaveBeenCalled();
  });
});