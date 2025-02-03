import React, {useLayoutEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import Button from '@/components/ui/Button';
import {FormInput} from '@/components/FormInput';
import {RoutesT, Routes, TrainingFormData} from '@/types/general';
import {NotificationToggle} from '@/components/NotificationToggle';
import BackButton from '@/components/BackButton';
import FormDateInput from '@/components/FormDateInput';
import {useUserStore} from '@/store/userStore';
import {useNavigation} from '@react-navigation/native';
import GooglePlacesSearch from '@/components/PlacesSearch';

export const AddTrainingScreen: React.FC = ({route}: any) => {
  const nav = useNavigation<RoutesT>();
  const [formData, setFormData] = useState<TrainingFormData>({
    name: '',
    description: '',
    address: {id: '', title: ''},
    date: new Date(),
    notifications: false,
  });

  const addTraining = useUserStore(state => state.addTraining);
  const editTraining = useUserStore(state => state.editTraining);

  const training = route?.params?.training;
  const isEdit = !!training;
  const isDisabled =
    !formData.name ||
    !formData.description ||
    !formData.address?.title ||
    !formData.date;

  useLayoutEffect(() => {
    if (isEdit) {
      setFormData(prev => ({
        ...prev,
        name: training.name,
        description: training.description,
        address: training?.address,
        date: new Date(training.date),
        notifications: training.notifications,
      }));
    }
  }, [isEdit]);

  const handleSave = () => {
    if (isEdit) {
      editTraining({
        ...training,
        ...formData,
      });
    } else {
      addTraining({
        ...formData,
        tabIndex: 0,
      });
    }
    nav.navigate(Routes.Training);
  };

  return (
    <ScreenWrapper>
      <BackButton />
      <Text className="self-start text-3xl text-center text-white font-bold mt-2">
        Add new training
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} className="mt-2">
        <FormInput
          label="Name"
          value={formData.name}
          onChange={value => setFormData({...formData, name: value})}
          placeholder="Enter name"
        />

        <FormInput
          label="Description"
          value={formData.description}
          onChange={value => setFormData({...formData, description: value})}
          placeholder="Enter description"
        />

        <GooglePlacesSearch
          apiKey={'AIzaSyBHo-nFVvTGd1LfpdBL4WXNgXJH8LNCWW8'}
          address={formData.address}
          onSelect={address => setFormData({...formData, address})}
        />

        <FormDateInput
          label="Date"
          offset={150}
          value={formData.date}
          onChange={value => setFormData({...formData, date: value})}
        />
        <FormDateInput
          label="Time"
          mode="time"
          offset={150}
          value={formData.date}
          onChange={value => setFormData({...formData, date: value})}
        />

        <NotificationToggle
          value={formData.notifications}
          onToggle={value => setFormData({...formData, notifications: value})}
        />
      </ScrollView>

      <View className="w-full mt-8">
        <Button
          title="Save"
          onPress={handleSave}
          variant="primary"
          isDisabled={isDisabled}
        />
      </View>
    </ScreenWrapper>
  );
};
