import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

import ArrowIcon from '@/media/icons/arrow.svg';

import {useNavigation} from '@react-navigation/native';

interface Props {
  onPress?: () => void;
}

export default function BackButton({onPress}: Props) {
  const nav = useNavigation();

  return (
    <TouchableOpacity
      className="flex-row items-center gap-2"
      onPress={onPress || nav.goBack}>
      <ArrowIcon color="#fff" style={{transform: [{rotate: '180deg'}]}} />
      <Text className="text-white">Back</Text>
    </TouchableOpacity>
  );
}
