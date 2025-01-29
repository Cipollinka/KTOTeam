import React, {useLayoutEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import Button from '@/components/ui/Button';
import {RoutesT, PlayerFormData, PlayerStats} from '@/types/general';
import StatCounter from './StatCounter';
import BackButton from '@/components/BackButton';
import {FormInput} from '@/components/FormInput';
import {useNavigation} from '@react-navigation/native';
import {useUserStore} from '@/store/userStore';

const statFields: Array<keyof PlayerStats> = [
  'matches',
  'goals',
  'assists',
  'saves',
  'mistakes',
];

export default function AddPlayerScreen({route}: any) {
  const nav = useNavigation<RoutesT>();

  const [formData, setFormData] = useState<PlayerFormData>({
    name: '',
    position: '',
    state: 'main',
    stats: {
      matches: 0,
      goals: 0,
      assists: 0,
      saves: 0,
      mistakes: 0,
    },
  });

  const addPlayer = useUserStore(state => state.addPlayer);
  const editPlayer = useUserStore(state => state.editPlayer);

  const player = route?.params?.player;
  const isEdit = !!player;
  const isDisabled = !formData.name || !formData.position;

  useLayoutEffect(() => {
    if (isEdit) {
      setFormData(prev => ({
        ...prev,
        name: player.name,
        position: player.position,
        state: player.state,
        stats: player.stats,
      }));
    }
  }, [isEdit]);

  const updateStat = (stat: keyof PlayerStats, increment: boolean) => {
    setFormData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: increment
          ? prev.stats[stat] + 1
          : Math.max(0, prev.stats[stat] - 1),
      },
    }));
  };

  const handleSavePress = () => {
    if (isEdit) {
      editPlayer({
        ...player,
        ...formData,
      });
    } else {
      addPlayer({
        ...formData,
      });
    }

    nav.goBack();
  };

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />

        <Text className="text-3xl text-white font-bold mt-2">
          Add new player
        </Text>

        <View>
          <FormInput
            label="Name and surname"
            value={formData.name}
            onChange={text => setFormData(prev => ({...prev, name: text}))}
            placeholder="Enter name and surname"
          />

          <FormInput
            label="Position"
            value={formData.position}
            onChange={text => setFormData(prev => ({...prev, position: text}))}
            placeholder="Enter position"
          />

          <View className="my-4">
            <Text className="text-base text-white">State</Text>
            <View className="flex-row mt-3 bg-zinc-800 rounded-[100px] p-0.5">
              <TouchableOpacity
                className={`flex-1 py-1 px-2.5 rounded-[100px] ${
                  formData.state === 'main' ? 'bg-white' : ''
                }`}
                onPress={() => setFormData(prev => ({...prev, state: 'main'}))}
                accessibilityLabel="Select main state">
                <Text
                  className={`text-center ${
                    formData.state === 'main' ? 'text-black' : 'text-white'
                  }`}>
                  Main
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-1 px-2.5 rounded-[100px] ${
                  formData.state === 'reserve' ? 'bg-white' : ''
                }`}
                onPress={() =>
                  setFormData(prev => ({...prev, state: 'reserve'}))
                }
                accessibilityLabel="Select reserve state">
                <Text
                  className={`text-center ${
                    formData.state === 'reserve' ? 'text-black' : 'text-white'
                  }`}>
                  Reserve
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="gap-2">
            {statFields.map(stat => (
              <StatCounter
                key={stat}
                label={stat.charAt(0).toUpperCase() + stat.slice(1)}
                value={formData.stats[stat]}
                onIncrement={() => updateStat(stat, true)}
                onDecrement={() => updateStat(stat, false)}
              />
            ))}
          </View>

          <TouchableOpacity
            className="mt-6"
            onPress={() =>
              setFormData(prev => ({
                ...prev,
                stats: {
                  matches: 0,
                  goals: 0,
                  assists: 0,
                  saves: 0,
                  mistakes: 0,
                },
              }))
            }
            accessibilityLabel="Delete all stats">
            <Text className="text-base text-center text-red-600">
              Delete stats
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View className="mt-2">
        <Button
          title="Save"
          onPress={handleSavePress}
          variant="primary"
          isDisabled={isDisabled}
        />
      </View>
    </ScreenWrapper>
  );
}
