import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserListPresenter, UserDetailPresenter } from '@/screens';
import { SCREENS } from '@/constants';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={SCREENS.USER_LIST as keyof RootStackParamList}
          component={UserListPresenter}
        />
        <Stack.Screen
          name={SCREENS.USER_DETAILS as keyof RootStackParamList}
          component={UserDetailPresenter}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};