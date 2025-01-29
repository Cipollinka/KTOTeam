import {Player} from '@/types/general';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ArrowIcon from '@/media/icons/arrow.svg';
import DotsIcon from '@/media/icons/dots.svg';

interface PlayerCardProps {
  player: Player;
  onEditPress: (player: Player) => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  onEditPress,
}) => {
  const [isStatsExpanded, setIsStatsExpanded] = useState(false);

  return (
    <View className="flex overflow-hidden flex-col p-3 w-full text-sm rounded-xl bg-zinc-800">
      <View className="flex-row gap-10 justify-between items-start w-full text-base text-center">
        <View className="flex-row gap-3 items-center">
          <View className="self-stretch my-auto">
            <Text className="text-white">{player.name}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => onEditPress(player)}>
          <DotsIcon />
        </TouchableOpacity>
      </View>
      <View className="mt-3.5">
        <Text className="text-white">{player.position}</Text>
      </View>
      <TouchableOpacity
        onPress={() => setIsStatsExpanded(!isStatsExpanded)}
        className="flex-row gap-10 justify-between items-center mt-3.5 w-full">
        <View className="self-stretch my-auto">
          <Text className="text-white">Stats</Text>
        </View>
        <ArrowIcon
          color="#fff"
          style={{transform: [{rotate: isStatsExpanded ? '270deg' : '90deg'}]}}
        />
      </TouchableOpacity>

      {isStatsExpanded && (
        <View className="flex flex-col mt-2 w-full">
          <View className="flex-row self-center mt-2 bg-neutral-400 min-h-[1px] w-[63px]" />
          <View className="flex-col mt-2 w-full text-xs">
            {Object.entries(player.stats).map(([key, value]) => (
              <View
                key={key}
                className="flex-row gap-10 justify-between items-center mt-2 w-full">
                <View className="self-stretch my-auto">
                  <Text className="text-white capitalize">{key}</Text>
                </View>
                <View className="self-stretch my-auto">
                  <Text className="text-white">{value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};
