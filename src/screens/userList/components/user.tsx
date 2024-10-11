import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import { TCustomer } from '@/types';
import { UserIcon } from './userIcon';
import { COLORS } from '@/constants';
import { Padder } from '@/components';

type UserProps = {
  item: TCustomer;
  onPress: (item: TCustomer) => void;
};

export const User = ({ item, onPress }: UserProps) => {
  const { name, role } = item;
  return (
    <TouchableOpacity
      testID={`user-btn-${name}`}
      onPress={() => onPress(item)}
      style={styles.button}
      activeOpacity={0.7}
    >
      <UserIcon testID={`user-icon-${name}`} initial={name[0]} />
      <Padder />
      <View>
        <Text body700 black>{name}</Text>
        <Text body black>{role}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingBottom: 8,
    backgroundColor: COLORS.white,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  }
});