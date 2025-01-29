import {MenuItemProps} from '@/types/general';
import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';

export default function MenuItem({title, Icon, value}: MenuItemProps) {
  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(value)}
      className="px-4 py-3.5 rounded-2xl bg-zinc-800"
      accessibilityRole="button"
      accessibilityLabel={title}>
      <View className="flex-row justify-between items-center">
        <Text className="text-base text-white">{title}</Text>
        <Icon />
      </View>
    </TouchableOpacity>
  );
}
