import React from 'react';
import { Text, TouchableOpacity } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { DefaultAppScreenNavigationProp } from '@navigation/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Padder } from '../spacing';
import { STRINGS } from '@/constants';

export const BackButton = () => {
  const { goBack } = useNavigation<DefaultAppScreenNavigationProp>();
  return (
    <TouchableOpacity testID='back-btn' center onPress={goBack} row activeOpacity={0.7}>
      <Ionicons name="arrow-back" size={24} color="black" />
      <Padder />
      <Text center body>{STRINGS.common.back}</Text>
    </TouchableOpacity>
  )
};