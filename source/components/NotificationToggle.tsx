import React from 'react';
import {View, Text, Switch} from 'react-native';

interface NotificationToggleProps {
  value: boolean;
  onToggle: (value: boolean) => void;
}

export const NotificationToggle: React.FC<NotificationToggleProps> = ({
  value,
  onToggle,
}) => {
  return (
    <View className="flex-row justify-between items-center mt-6 w-full">
      <Text className=" text-zinc-400">Notifications</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{false: '#27272A', true: '#01C574'}}
        thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
        accessibilityLabel="Toggle notifications"
        accessibilityRole="switch"
      />
    </View>
  );
};
