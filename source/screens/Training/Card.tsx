import {Training} from '@/types/general';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DotsIcon from '@/media/icons/dots.svg';
import dayjs from 'dayjs';

interface TrainingCardProps {
  training: Training;
  onMapOpen: (address: string) => void;
  onMenuPress: () => void;
}

export const TrainingCard: React.FC<TrainingCardProps> = ({
  training,
  onMapOpen,
  onMenuPress,
}) => {
  const date = dayjs(training.date);
  return (
    <View className="flex overflow-hidden flex-col p-3 rounded-2xl bg-secondary w-[310px] mr-2.5">
      <View className="w-full">
        <View className="gap-2 items-start w-full tracking-wide text-white">
          <View className="flex-row justify-between w-full">
            <Text className="text-base font-bold text-white text-lg">
              {training.name}
            </Text>

            <TouchableOpacity onPress={onMenuPress}>
              <DotsIcon />
            </TouchableOpacity>
          </View>
          <Text className="text-sm text-white">{training.description}</Text>
          <View className="gap-1 items-center w-full text-xs text-neutral-400">
            <Text className="self-stretch my-auto text-white-50">
              {training.address.title}
            </Text>
          </View>
        </View>

        <View className="flex-row gap-10 justify-between items-center mt-4 w-full text-xs text-white">
          <Text className="opacity-50 text-white text-sm">
            {date.format('DD MMMM YYYY')}
          </Text>
          <Text className="opacity-50 text-white text-sm">
            {date.format('hh:mm A')}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => onMapOpen(training.address.id)}
        className="overflow-hidden gap-2.5 self-stretch px-5 py-1.5 mt-4 w-full leading-6 text-center text-white border border-white border-solid min-h-[32px] rounded-[100px] items-center"
        accessibilityLabel={`Open Google Maps for ${training.name}`}
        accessibilityRole="button">
        <Text className="text-white">Open Google Maps</Text>
      </TouchableOpacity>
    </View>
  );
};
