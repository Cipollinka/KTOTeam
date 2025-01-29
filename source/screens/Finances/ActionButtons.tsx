import React from 'react';
import {View} from 'react-native';
import Button from '@/components/ui/Button';

interface ActionButtonsProps {
  onNewBuy: () => void;
  onNewIncome: () => void;
}

export default function ActionButtons({
  onNewBuy,
  onNewIncome,
}: ActionButtonsProps) {
  return (
    <View className="flex-row justify-between gap-3 mt-3">
      <Button
        title="New buy"
        onPress={onNewBuy}
        variant="danger"
        className="flex-1"
      />
      <Button
        title="New income"
        onPress={onNewIncome}
        variant="primary"
        className="flex-1"
      />
    </View>
  );
}
