import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableOpacity } from 'react-native-ui-lib';
import { COLORS } from '@/constants';

type ButtonProps = {
  testID: string;
  onPress: () => void;
  text: string;
};

export const CustomButton = ({ testID, onPress, text }: ButtonProps) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      style={styles.buttonStyle}
      activeOpacity={0.7}
    >
      <Text center button white>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: COLORS.blue,
  },
});