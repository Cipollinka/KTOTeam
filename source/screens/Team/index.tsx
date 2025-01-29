import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import {PlayerCard} from './Card';
import {RoutesT, Routes, Player} from '@/types/general';
import Tabs from '@/components/Tabs';
import BottomNavigation from '@/components/BottomNavigation';
import {useNavigation} from '@react-navigation/native';
import {useUserStore} from '@/store/userStore';
import EmptyData from '@/components/ui/Empty';
import BottomMenu from '@/components/ActionModal';
import Button from '@/components/ui/Button';

export const TeamScreen: React.FC = () => {
  const nav = useNavigation<RoutesT>();

  const [currentTab, setCurrentTab] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const players = useUserStore(state => state.players);
  const removePlayer = useUserStore(state => state.removePlayer);
  const [playersState, setPlayersState] = useState<Player[]>([]);

  useEffect(() => {
    setPlayersState(
      players.filter(p =>
        currentTab === 0 ? p.state === 'main' : p.state === 'reserve',
      ),
    );
  }, [players, currentTab]);

  const isEmpty = playersState.length < 1;

  return (
    <ScreenWrapper>
      <View className="flex-row gap-10 justify-between items-center my-3 w-full">
        <Text className="text-3xl text-white font-bold">Team</Text>

        <TouchableOpacity
          className="gap-1.5 self-stretch my-auto"
          onPress={() => nav.navigate(Routes.Add_Team)}>
          <Text className="text-base text-emerald-500">Add player</Text>
        </TouchableOpacity>
      </View>

      <Tabs
        tab={currentTab}
        coef={3.45}
        onChangeTab={setCurrentTab}
        tabs={['Main', 'Reserve']}
      />

      {isEmpty && <EmptyData text="There are no players yet, add them now" />}

      {!isEmpty && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mt-5 gap-4">
            {playersState.map(player => (
              <PlayerCard
                key={player.id}
                player={player}
                onEditPress={setSelectedPlayer}
              />
            ))}
          </View>
        </ScrollView>
      )}

      <BottomMenu
        isOpen={!!selectedPlayer}
        onCancel={() => setSelectedPlayer(null)}>
        <View className="gap-2">
          <Button
            title="Edit"
            onPress={() => {
              selectedPlayer &&
                nav.navigate(Routes.Add_Team, {player: selectedPlayer});
              setSelectedPlayer(null);
            }}
          />
          <Button
            variant="danger"
            title="Delete"
            onPress={() => {
              selectedPlayer && removePlayer(selectedPlayer?.id);
              setSelectedPlayer(null);
            }}
          />
          <Button title="Cancel" onPress={() => setSelectedPlayer(null)} />
        </View>
      </BottomMenu>

      <BottomNavigation />
    </ScreenWrapper>
  );
};
