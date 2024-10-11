import React, { useState } from 'react';
import { TextInput } from '@/components';
import { STRINGS } from '@/constants';
import { TFilterOptions } from '@/types';

type UserFilterInputProps = {
  handleFilterChange: (value: TFilterOptions) => void;
};

export const UserFilterInput = ({ handleFilterChange }: UserFilterInputProps) => {
  const [value, setValue] = useState('');

  const handleValueChange = (value: string) => {
    setValue(value);
    const filterOption: TFilterOptions = {
      label: 'Search',
      value: value,
      type: 'name',
      isSelected: true,
    };

    handleFilterChange(filterOption);
  };

  return (
    <TextInput
      testID='user-filter-input'
      value={value}
      placeholder={STRINGS.userList.searchUsers}
      label={STRINGS.userList.searchUsers}
      onChangeText={handleValueChange}
    />
  );
};