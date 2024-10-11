import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { STRINGS, DIMENSIONS } from '@/constants';
import { BackButton, Container } from '@/components';

export const UserDetailScreen = () => {
  return (
    <Container testID='user-detail-container'>
      <View style={styles.main}>
        <View style={styles.top}>
          <View row style={styles.header}>
            <BackButton />
            <View flex center>
              <Text marginR-s8 h5>{STRINGS.userDetail.userDetail}</Text>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '100%',
  },
  top: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
  },
  header: {
    alignSelf: 'center',
    alignItems: 'flex-start',
    height: 40,
    width: DIMENSIONS.width - 48,
  },
});