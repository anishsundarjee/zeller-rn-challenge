import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { it, describe, expect } from '@jest/globals';
import { TextInput } from '@/components';

describe('TextInput', () => {
  it('compare snapshot empty state', async () => {
    const tree = renderer.create(
      <TextInput value='' placeholder='placeholder' label='label' onChangeText={jest.fn()} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('compare snapshot focused typing', async () => {
    const tree = renderer.create(
      <TextInput autoFocus={true} value='val' placeholder='placeholder' label='label' onChangeText={jest.fn()} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('render correctly and change text', async () => {
    const mockChangeText = jest.fn();
    const tree = renderer.create(
      <TextInput value='' placeholder='placeholder' label='label' onChangeText={mockChangeText} />,
    );

    const input = tree.root.findByProps({ testID: 'text-input' }).props;
    expect(input).toBeDefined();

    await renderer.act(async () => {
      await input.onChangeText('mock');
    });

    expect(mockChangeText).toHaveBeenCalled();
  });
})
