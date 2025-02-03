import React, {useState} from 'react';
import {View, Text} from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import FormDateInput from '@/components/FormDateInput';
import BackButton from '@/components/BackButton';
import {FormInput} from '@/components/FormInput';
import Button from '@/components/ui/Button';
import {useUserStore} from '@/store/userStore';
import {RoutesT} from '@/types/general';

import {useNavigation} from '@react-navigation/native';

export default function AddFinance({route}: any) {
  const nav = useNavigation<RoutesT>();
  const isBuy = route?.params?.isBuy;
  const [formData, setFormData] = useState({
    name: '',
    amount: 0,
    date: new Date(),
  });

  const addFinances = useUserStore(state => state.addFinance);

  const isDisabled = !formData.name || !formData.amount || !formData.date;

  const handleSavePress = () => {
    addFinances({
      ...formData,
      date: formData.date.toISOString(),
      isBuy,
      amount: isBuy ? -formData.amount : formData.amount,
    });
    nav.goBack();
  };

  return (
    <ScreenWrapper>
      <BackButton />

      <View className="mt-2 w-full">
        <Text className="self-start text-3xl text-center text-white font-bold">
          New {isBuy ? 'buy' : 'income'}
        </Text>

        <View>
          <FormInput
            label="Name"
            placeholder="Enter name"
            value={formData.name}
            onChange={value => setFormData({...formData, name: value})}
          />
          <FormInput
            label="Amount"
            placeholder="Enter amount"
            type="numeric"
            value={formData.amount + ''}
            onChange={value => setFormData({...formData, amount: +value})}
          />

          <FormDateInput
            label="Date"
            value={formData.date}
            onChange={value => setFormData({...formData, date: value})}
          />
        </View>
      </View>

      <View className="my-4">
        <Button
          title="Save"
          onPress={handleSavePress}
          isDisabled={isDisabled}
        />
      </View>
    </ScreenWrapper>
  );
}
