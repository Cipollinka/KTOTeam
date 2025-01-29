import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

interface StatCounterProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function StatCounter({
  label,
  value,
  onIncrement,
  onDecrement,
}: StatCounterProps) {
  return (
    <View className="flex-row justify-between items-center w-full">
      <View className="self-stretch my-auto">
        <Text className="text-base text-white">{label}</Text>
      </View>
      <View className="flex-row gap-4 justify-between items-center self-stretch px-4 py-2.5 my-auto text-3xl text-center border-solid bg-zinc-800 border-[1.333px] border-neutral-500 border-opacity-10 min-h-[40px] rounded-[100px] w-[100px]">
        <TouchableOpacity
          onPress={onDecrement}
          accessibilityLabel={`Decrease ${label}`}>
          <Text className="text-red font-bold text-xl ml-1">-</Text>
        </TouchableOpacity>
        <Text className="text-base font-medium tracking-normal leading-5 text-white">
          {value}
        </Text>
        <TouchableOpacity
          onPress={onIncrement}
          accessibilityLabel={`Increase ${label}`}>
          <Text className="text-primary font-bold text-xl">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
