import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { it, describe, beforeEach } from '@jest/globals';
import { UserDetailPresenter } from '@/screens';
jest.useFakeTimers();

jest.mock('react-native-safe-area-context', () => {
  return {
    useSafeAreaInsets: () => ({ top: 0, bottom: 0 }),
  };
});

const mockedNavigation = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      goBack: mockedNavigation,
    }),
  };
});

describe('UserDetailPresenter', () => {
  beforeEach(() => {
    mockedNavigation.mockClear();
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <UserDetailPresenter />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('calls goBack when back button is pressed', () => {
    const tree = renderer.create(
      <UserDetailPresenter />
    ).root;
    const backButton = tree.findByProps({ testID: 'back-btn' });
    backButton.props.onPress();
    expect(mockedNavigation).toHaveBeenCalled();
  });
});
