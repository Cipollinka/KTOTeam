import {Finance} from '@/types/general';
import dayjs from 'dayjs';
import React from 'react';
import {View, Text} from 'react-native';

import CheckBox from 'react-native-bouncy-checkbox';

interface HistoryListProps {
  items: Finance[];
  isEditing: boolean;
  selectedIds: number[];
  setSelectedIds: any;
}

export default function HistoryList({
  items,
  selectedIds,
  setSelectedIds,
  isEditing,
}: HistoryListProps) {
  console.log('items', items);

  const groupedByDate = items.reduce((acc, item) => {
    const formatterData = dayjs(item.date).format('DD MMM');
    // item.date = formatterData;

    if (!acc[formatterData]) {
      acc[formatterData] = [];
    }
    acc[formatterData].push(item);
    return acc;
  }, {} as Record<string, Finance[]>);

  return (
    <View>
      {Object.entries(groupedByDate).map(([date, dateItems]) => (
        <View key={date} className="mt-6">
          <Text className="text-xs text-neutral-400 text-center">{date}</Text>
          {dateItems.map(item => {
            const isChecked = selectedIds.includes(item.id);
            return (
              <View key={item.id} className="mt-1">
                <View className="flex-row justify-between items-center py-4 border-b border-zinc-800">
                  <View className="flex-row items-center">
                    {isEditing && (
                      <View className="mr-[-10px]">
                        <CheckBox
                          isChecked={isChecked}
                          size={20}
                          onPress={() =>
                            setSelectedIds(prev =>
                              isChecked
                                ? prev.filter(id => id !== item.id)
                                : [...prev, item.id],
                            )
                          }
                          fillColor="#ED0103"
                          innerIconStyle={{
                            borderColor: isChecked ? '#ED0103' : '#fff',
                          }}
                        />
                      </View>
                    )}
                    <Text className="text-sm text-white">{item.name}</Text>
                  </View>

                  <Text className="text-sm text-white">
                    {item.amount > 0 ? '+' : ''}
                    {item.amount}$
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}
