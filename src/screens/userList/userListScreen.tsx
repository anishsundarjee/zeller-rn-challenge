import React from 'react';
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  KeyboardAvoidingView
} from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { TCustomer, TFilterOptions } from '@/types';
import { Container, Padder, ErrorScreen, LoadingScreen } from '@/components';
import { COLORS, STRINGS } from '@/constants';
import { UserTypeSelector, User, UserFilterInput } from './components';

type UserListScreenProps = {
  data: TCustomer[];
  filterOptions: TFilterOptions[];
  handleFilterChange: (value: TFilterOptions) => void;
  handleUserPress: (item: TCustomer) => void;
  isLoading: boolean;
  isError: boolean;
  refreshData: () => void;
  refreshing: boolean;
  onRefresh: () => void;
  isTyping: boolean;
};

export const UserListScreen = ({
  data,
  isLoading,
  isError,
  refreshData,
  filterOptions,
  handleFilterChange,
  handleUserPress,
  refreshing,
  onRefresh,
  isTyping,
}: UserListScreenProps) => {

  const renderItem = ({item}: {item: TCustomer}) => (
    <User item={item} onPress={handleUserPress}/>
  );

  const renderListHeader = () => (
    <UserTypeSelector filterOptions={filterOptions} handleFilterChange={handleFilterChange} />
  );

  const renderListFooter = () => {
    return data.length > 0 ? (
      <Padder h={1} bg={COLORS.grey} wide={true} style={styles.listFooter} />
    ) : null
  };

  if (isLoading && !isTyping) {
    return <LoadingScreen testID='user-list-screen-loading' />;
  }

  if (isError) {
    return <ErrorScreen testID='user-list-screen-error' onPress={refreshData} />;
  }

  return (
    <Container testID='user-list-container'>
      <View style={styles.main}>
        <View style={styles.top}>
          <Text h5>{STRINGS.userList.userTypes}</Text>
          <Padder h={16} />
          <UserFilterInput handleFilterChange={handleFilterChange} />
          <Padder h={16} />
          <KeyboardAvoidingView behavior={'padding'} >
            <FlatList
              testID='user-list'
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={renderItem}
              ListHeaderComponent={renderListHeader}
              ListFooterComponent={renderListFooter}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            />
          </KeyboardAvoidingView>
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
  listFooter: {
    marginTop: 16,
    marginBottom: 100,
  }
});