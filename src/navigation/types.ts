import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  USER_LIST: undefined;
  USER_DETAILS: { id: string };
};

export type DefaultAppScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type UserDetailRouteProp = RouteProp<RootStackParamList, 'USER_DETAILS'>;