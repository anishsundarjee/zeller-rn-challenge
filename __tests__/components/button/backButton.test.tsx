import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { it, describe, expect } from '@jest/globals';
import { BackButton } from '@/components';

const mockedNavigation = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      goBack: mockedNavigation,
    }),
  };
});

describe('BackButton', () => {
  it('compare snapshot', async () => {
    const tree = renderer.create(
      <BackButton />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('renders correctly and press button', async () => {
    const tree = renderer.create(
      <BackButton />,
    );

    const button = tree.root.findByProps({ testID: 'back-btn' }).props;
    expect(button).toBeDefined();

    await renderer.act(async () => {
      await button.onPress();
    });

    expect(mockedNavigation).toHaveBeenCalled();
  });
});