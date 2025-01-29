import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {TrainingCard} from './Card';
import {Training} from '@/types/general';
import dayjs from 'dayjs';

interface DateGroupProps {
  date: string;
  trainings: Training[];
  onMapOpen: (address: string) => void;
  onMenuPress: (trainings: Training) => void;
}

export const DateGroup: React.FC<DateGroupProps> = ({
  date,
  trainings,
  onMapOpen,
  onMenuPress,
}) => {
  return (
    <View className="flex flex-col w-full">
      <Text className="text-base text-white">
        {dayjs(date).format('DD MMM')}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-2">
        {trainings.map(training => (
          <TrainingCard
            key={training.id}
            training={training}
            onMapOpen={onMapOpen}
            onMenuPress={() => onMenuPress(training)}
          />
        ))}
      </ScrollView>
    </View>
  );
};
