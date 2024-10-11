import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-lib';
import { Container } from '../container';
import { STRINGS } from '@/constants';

export const LoadingScreen = ({testID}: {testID: string}) => {
  return (
    <Container testID={testID} containerStyle={styles.container}>
      <Text center h5 body700>
        {STRINGS.common.loading}
      </Text>
    </Container>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});