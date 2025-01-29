import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import {Finance, RoutesT, Routes} from '@/types/general';
import BalanceCard from './BalanceCard';
import ActionButtons from './ActionButtons';
import HistoryList from './HistoryList';
import Tabs from '@/components/Tabs';
import BottomNavigation from '@/components/BottomNavigation';
import {useNavigation} from '@react-navigation/native';
import {useUserStore} from '@/store/userStore';
import EmptyData from '@/components/ui/Empty';

const tabs = ['Total', 'Incomes', 'Outcomes'];

export default function FinancesScreen() {
  const nav = useNavigation<RoutesT>();
  const finances = useUserStore(state => state.finances);

  const [currentTab, setCurrentTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [financesState, setFinancesState] = useState<Finance[]>([]);

  useEffect(() => {
    setFinancesState(
      finances.filter(f =>
        currentTab === 0 ? true : currentTab === 1 ? !f.isBuy : f.isBuy,
      ),
    );
  }, [finances, currentTab]);

  const balance = useMemo(
    () => finances.reduce((acc, item) => acc + item.amount, 0),
    [finances],
  );

  const removeFinance = useUserStore(state => state.removeFinance);

  const isEmpty = finances.length < 1;

  const handleDeletePress = () => {
    if (selectedIds.length < 1) return;

    selectedIds.forEach(id => removeFinance(id));
    setSelectedIds([]);
    setIsEditing(false);
  };

  return (
    <ScreenWrapper>
      <View className="flex-row justify-between items-center ">
        <Text className="text-3xl text-white font-extrabold">Finances</Text>
        <TouchableOpacity onPress={() => nav.navigate(Routes.Useful)}>
          <Text className="text-emerald-500">Useful</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <BalanceCard balance={balance} />
        <ActionButtons
          onNewBuy={() => nav.navigate(Routes.Add_Finances, {isBuy: true})}
          onNewIncome={() => nav.navigate(Routes.Add_Finances, {isBuy: false})}
        />
      </View>

      <View className="mt-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-bold text-white">History</Text>
          <View className="flex-row gap-2">
            {!isEditing && (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Text className="text-sm text-emerald-500">Edit</Text>
              </TouchableOpacity>
            )}

            {isEditing && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setIsEditing(false);
                    setSelectedIds([]);
                  }}>
                  <Text className="text-sm text-emerald-500">Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleDeletePress}
                  disabled={selectedIds.length === 0}>
                  <Text className="text-sm text-red">Delete</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        <View className="mt-3">
          <Tabs
            tab={currentTab}
            onChangeTab={setCurrentTab}
            tabs={tabs}
            coef={3.45}
          />
        </View>
      </View>

      {isEmpty && <EmptyData text="There are no finances data yet" />}

      {!isEmpty && (
        <ScrollView showsVerticalScrollIndicator={false} className="mt-2">
          <HistoryList
            items={financesState}
            isEditing={isEditing}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </ScrollView>
      )}

      <BottomNavigation />
    </ScreenWrapper>
  );
}
