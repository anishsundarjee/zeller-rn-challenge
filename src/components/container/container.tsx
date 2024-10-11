import React from 'react';
import { StyleSheet, Animated, ViewStyle, StyleProp } from 'react-native';
import { View } from 'react-native-ui-lib';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/constants';

type TContainerProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>;
  containerStyle?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>;
  testID?: string;
};

export const Container = ({
  children,
  style = {},
  containerStyle = {},
  testID = 'container',
}: TContainerProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        { paddingTop: insets.top },
        containerStyle,
      ]}
    >
      <View
        testID="container-main-view"
        style={[
          styles.main,
          styles.paddingHorizontalNoneFullScreen,
          style,
        ]}
      >
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  main: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  paddingHorizontalNoneFullScreen: {
    paddingHorizontal: 24,
  },
});