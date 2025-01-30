import {MenuItemProps} from '@/types/general';
import clsx from 'clsx';
import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';

export default function MenuItem({title, Icon, value, danger}: MenuItemProps) {
  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(value)}
      className={clsx('px-4 py-3.5 rounded-2xl', {
        'bg-zinc-800': !danger,
        'bg-red': danger,
      })}
      accessibilityRole="button"
      accessibilityLabel={title}>
      <View className="flex-row justify-between items-center">
        <Text className="text-base text-white">{title}</Text>
        <Icon />
      </View>
    </TouchableOpacity>
  );
}
