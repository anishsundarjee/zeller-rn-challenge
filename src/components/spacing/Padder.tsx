import React from 'react';
import { StyleProp, ViewStyle, Animated } from 'react-native';
import { View } from 'react-native-ui-lib';
import { DIMENSIONS } from '@/constants';

type TPadderProps = {
  h?: number;
  w?: number;
  bg?: string;
  style?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>;
  wide?: boolean;
};

export const Padder = ({ h = 8, w = 8, bg = 'transparent', style, wide = false }: TPadderProps) => {
  const styles = {
    height: h,
    backgroundColor: bg,
    width: wide ? DIMENSIONS.width : w,
  };
  return <View testID="padder-view" style={[styles, style]} />;
};
