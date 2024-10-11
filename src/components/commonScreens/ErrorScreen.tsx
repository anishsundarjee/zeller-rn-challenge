import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-lib';
import { Padder } from '../spacing';
import { Container } from '../container';
import { CustomButton } from '../button';
import { STRINGS } from '@/constants';

type ErrorScreenProps = {
  onPress: () => void;
  testID: string;
};

export const ErrorScreen = ({ onPress, testID }: ErrorScreenProps) => {
  return (
    <Container testID={testID} containerStyle={styles.container}>
      <Text center h5 body700>
        {STRINGS.common.error}
      </Text>
      <Padder />
      <CustomButton
        testID='error-button'
        onPress={onPress}
        text={STRINGS.common.tryAgain}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});