import { COLORS } from '@/constants';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

type UserIconProps = {
  testID: string;
  initial: string;
};

export const UserIcon = ({ initial, testID }: UserIconProps) => {
  return (
    <View testID={testID} style={styles.container}>
      <Text blue body700>{initial}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
  }
})