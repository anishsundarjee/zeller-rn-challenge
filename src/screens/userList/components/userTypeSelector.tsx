import React from 'react';
import { View, Text } from 'react-native-ui-lib';
import { Padder } from '@/components';
import { STRINGS, COLORS } from '@/constants';
import { TFilterOptions } from '@/types';
import { UserTypeButton } from './userTypeButton';

type UserTypeSelectorProps = {
  filterOptions: TFilterOptions[];
  handleFilterChange: (value: TFilterOptions) => void;
};

export const UserTypeSelector = ({ filterOptions, handleFilterChange }: UserTypeSelectorProps) => {
  const selectedOption = filterOptions.find((option) => option.isSelected);
  return (
    <View>
      {filterOptions.map((option) => (
        <UserTypeButton
          testID={`user-type-btn-${option.label}`}
          key={option.value}
          option={option}
          handleFilterChange={handleFilterChange}
        />
      ))}
      <Padder h={24} />
      <Padder h={1} bg={COLORS.grey} wide={true} />
      <Padder h={24} />
      <Text h5>
        {`${selectedOption ? selectedOption.label : 'All'} ${STRINGS.userList.users}`}
      </Text>
      <Padder h={16} />
    </View>
  );
};