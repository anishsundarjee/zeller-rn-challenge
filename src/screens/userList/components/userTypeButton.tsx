import React from 'react';
import { StyleSheet } from 'react-native';
import { RadioButton, Text, TouchableOpacity } from 'react-native-ui-lib';
import { TFilterOptions } from '@/types';
import { COLORS } from '@/constants';
import { Padder } from '@/components';

type UserTypeButtonProps = {
  testID?: string;
  option: TFilterOptions;
  handleFilterChange: (value: TFilterOptions) => void;
};

export const UserTypeButton = ({ option, handleFilterChange, testID = 'user-type-btn' }: UserTypeButtonProps) => {
  const backGroundColor = option.isSelected ? COLORS.lightBlue : COLORS.white;
  return (
    <TouchableOpacity
      testID={testID}
      onPress={() => handleFilterChange(option)}
      style={[styles.button, { backgroundColor: backGroundColor }]}
      activeOpacity={0.7}
      disabled={option.isSelected}
    >
      <RadioButton
        testID={'radio-btn'}
        value={undefined}
        selected={option.isSelected}
        size={20}
        color={COLORS.blue}
      />
      <Padder />
      <Text body black testID={`user-type-txt-${option.label}`}>{option.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 4,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  }
})