import React from 'react';
import {View, Text} from 'react-native';

interface BalanceCardProps {
  balance: number;
}

export default function BalanceCard({balance}: BalanceCardProps) {
  return (
    <View className="overflow-hidden p-4 w-full rounded-3xl bg-zinc-800">
      <View className="items-center">
        <Text className="text-xl text-white">Balance</Text>
        <Text className="mt-5 text-2xl font-bold text-white">
          {balance.toLocaleString()} $
        </Text>
      </View>
    </View>
  );
}
