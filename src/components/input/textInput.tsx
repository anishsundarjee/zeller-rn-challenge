import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextField, View } from 'react-native-ui-lib';
import { getValidString } from '@/utils';
import { COLORS, DIMENSIONS, TYPOGRAPHIES } from '@/constants';

type FormInputProps = {
  testID?: string;
  autoFocus?: boolean;
  value: string;
  placeholder: string;
  inputTransformer?: (value?: string) => string | undefined;
  onChangeText: (value: string) => void;
  label: string;
  width?: number;
  height?: number;
};

export const TextInput = ({
  testID = 'text-input',
  autoFocus = false,
  value,
  placeholder,
  inputTransformer = getValidString,
  onChangeText,
  label,
  width = DIMENSIONS.width - 48,
  height = 48,
}: FormInputProps) => {
  const [focus, setFocus] = useState(false);
  const borderColor = focus ? COLORS.blue : COLORS.grey;

  return (
    <View testID="text-input-view">
      <TextField
        testID={testID}
        autoFocus={autoFocus}
        label={label}
        labelColor={COLORS.grey}
        value={value}
        color={COLORS.black}
        labelStyle={TYPOGRAPHIES.small}
        placeholder={placeholder}
        placeholderTextColor={COLORS.grey}
        onChangeText={onChangeText}
        fieldStyle={[styles.fieldStyle, { borderColor: borderColor, width: width, height: height }]}
        formatter={inputTransformer}
        cursorColor={COLORS.blue}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        onSubmitEditing={() => {
          setFocus(false);
        }}
        style={TYPOGRAPHIES.small}
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fieldStyle: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
});
