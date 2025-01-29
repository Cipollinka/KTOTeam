import ScreenWrapper from '@/components/ScreenWrapper';
import Button from '@/components/ui/Button';
import React, {useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, Linking, ScrollView} from 'react-native';

import EmptyData from '@/components/ui/Empty';
import {RoutesT, Routes, Training} from '@/types/general';

import {useNavigation} from '@react-navigation/native';
import {DateGroup} from './DateGroup';
import BottomNavigation from '@/components/BottomNavigation';
import Tabs from '@/components/Tabs';
import BottomMenu from '@/components/ActionModal';
import {useUserStore} from '@/store/userStore';

import groupBy from 'lodash/groupBy';

export default function TrainingsScreen() {
  const nav = useNavigation<RoutesT>();
  const [activeTab, setActiveTab] = useState(0);
  const [currentItem, setCurrentItem] = useState<Training | null>(null);

  const trainings = useUserStore(state => state.trainings);
  const removeTraining = useUserStore(state => state.removeTraining);
  const editTraining = useUserStore(state => state.editTraining);

  const data = useMemo(
    () =>
      Object.entries(
        groupBy(
          trainings.filter(t => t.tabIndex === activeTab),
          'date',
        ),
      ),
    [trainings, activeTab],
  );
  const isEmpty = data.length === 0;

  const handleMapOpen = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
    );
  };

  const onMenuCancel = () => setCurrentItem(null);
  console.log('currentItem', currentItem);

  return (
    <ScreenWrapper>
      <View className="flex-row gap-10 justify-between items-center w-full">
        <View className="self-stretch my-auto">
          <Text className="text-3xl text-white font-bold">Trainings</Text>
        </View>
      </View>

      <View className="my-2">
        <Tabs
          tab={activeTab}
          coef={3.45}
          onChangeTab={setActiveTab}
          tabs={['Future', 'Done', 'Archived']}
        />
      </View>

      {!isEmpty && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-4 mt-2">
            {data.map(([date, trainings]) => (
              <DateGroup
                key={date}
                date={date}
                trainings={trainings}
                onMapOpen={handleMapOpen}
                onMenuPress={setCurrentItem}
              />
            ))}
          </View>
        </ScrollView>
      )}

      {isEmpty && <EmptyData text="There are no trainings, create them now" />}

      {isEmpty && (
        <View className="flex flex-col self-stretch mt-auto w-full">
          <Button
            title="Create Training"
            onPress={() => nav.navigate(Routes.Add_Training)}
          />
        </View>
      )}
      <View className="relative">
        {!isEmpty && (
          <TouchableOpacity
            className="absolute -top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center z-10"
            onPress={() => nav.navigate(Routes.Add_Training)}>
            <Text className="font-bold text-3xl text-primary mb-1 ml-[2px]">
              +
            </Text>
          </TouchableOpacity>
        )}

        <BottomNavigation />
      </View>

      <BottomMenu isOpen={!!currentItem} onCancel={onMenuCancel}>
        <View className="gap-2">
          <Button
            title="Edit"
            onPress={() => {
              currentItem &&
                nav.navigate(Routes.Add_Training, {training: currentItem});
              onMenuCancel();
            }}
          />
          {currentItem?.tabIndex === 0 && (
            <Button
              title="Done"
              onPress={() => {
                currentItem && editTraining({...currentItem, tabIndex: 1});
                onMenuCancel();
              }}
            />
          )}
          <Button
            variant="danger"
            title={currentItem?.tabIndex !== 2 ? 'Archive' : 'Delete'}
            onPress={() => {
              if (currentItem?.tabIndex !== 2) {
                currentItem && editTraining({...currentItem, tabIndex: 2});
              } else {
                currentItem && removeTraining(currentItem?.id);
              }
              onMenuCancel();
            }}
          />
          <Button title="Cancel" onPress={onMenuCancel} />
        </View>
      </BottomMenu>
    </ScreenWrapper>
  );
}
